import { useRef, useState } from "react";
import { DEFAULT_NIM_MODEL, NIM_ROSTER, resolveNimModel } from "../data/nim";

type ChatMsg = { role: "user" | "assistant"; content: string };

export type AiAskResult =
  | { ok: true; text: string; model: string; fallback: boolean; tokens: number | null; rpm: { used: number; limit: number } | null }
  | { ok: false; error: string; status?: number; cancelled?: boolean };

export type AiStreamEvents = {
  onMeta?: (m: { model: string; fallback: boolean; rpm: { used: number; limit: number } | null }) => void;
  onToken?: (fullText: string) => void;
};

export function shortModel(id: string) {
  const found = NIM_ROSTER.find((m) => m.id === id);
  if (found) return found.short;
  const slash = id.indexOf("/");
  return slash >= 0 ? id.slice(slash + 1) : id;
}

/** Strip a leading slash so `/models` and `models` behave alike. */
export function stripSlash(raw: string) {
  return raw.trim().replace(/^\//, "");
}

const THREAD_KEY = "sv-threads";
const NIM_DIRECT = "https://integrate.api.nvidia.com/v1/chat/completions";
const ENV_KEY = (import.meta.env.VITE_NIM_API_KEY as string | undefined) || "";

type SavedThread = { model: string; history: ChatMsg[]; at: number };

function readThreads(): Record<string, SavedThread> {
  try {
    return JSON.parse(sessionStorage.getItem(THREAD_KEY) ?? localStorage.getItem(THREAD_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/**
 * Console AI playground — NVIDIA NIM via the same-origin proxy (40 RPM
 * governor + model fallbacks server-side), browser-direct last resort.
 * Model choice persists per session; the last turns ride along for context.
 */
export function useAiChat(reduced = false) {
  const [model, setModel] = useState<string>(() => {
    const saved = sessionStorage.getItem("nim-model") ?? "";
    return NIM_ROSTER.some((m) => m.id === saved) || /.+\/.+/.test(saved) ? saved : DEFAULT_NIM_MODEL;
  });
  const [busy, setBusy] = useState(false);
  const [quota, setQuota] = useState<{ used: number; limit: number } | null>(null);
  const historyRef = useRef<ChatMsg[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const switchModel = (raw: string): { line: string; ok: boolean } => {
    const needle = raw.trim();
    const asNum = Number(needle);
    const found =
      Number.isInteger(asNum) && asNum >= 1
        ? NIM_ROSTER[asNum - 1]
        : (resolveNimModel(needle) ??
          (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(needle)
            ? { id: needle, short: needle.split("/")[1], label: needle, blurb: "custom endpoint id", ctx: 128000 }
            : undefined));
    if (!found) {
      return { ok: false, line: "· unknown model — `/models` lists every option" };
    }
    setModel(found.id);
    sessionStorage.setItem("nim-model", found.id);
    return { ok: true, line: `✓ model → ${found.short} · ${found.blurb} from here` };
  };

  const askDirect = async (question: string, history: ChatMsg[], useModel: string, signal: AbortSignal) => {
    const res = await fetch(NIM_DIRECT, {
      method: "POST",
      signal,
      headers: {
        Authorization: `Bearer ${ENV_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: useModel,
        messages: [...history, { role: "user", content: question }],
        temperature: 0.6,
        max_tokens: 1024,
      }),
    });
    if (!res.ok) {
      const err: Error & { status?: number } = new Error(`NIM ${res.status}`);
      err.status = res.status;
      throw err;
    }
    const data = await res.json();
    const text = (data?.choices?.[0]?.message?.content ?? "").trim();
    if (!text) throw new Error("NIM empty response");
    return { text, model: useModel, fallback: false, tokens: data?.usage?.total_tokens ?? null };
  };

  const ask = async (question: string, opts?: { model?: string; events?: AiStreamEvents }): Promise<AiAskResult> => {
    if (busy) return { ok: false, error: "· still thinking — one question at a time" };
    const useModel = opts?.model ?? model;
    const events = opts?.events;
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setBusy(true);
    try {
      const history: ChatMsg[] = historyRef.current.slice(-6);
      // Streaming proxy first; browser-direct last resort (NVIDIA blocks preflights).
      let res: Response;
      try {
        res = await fetch("/api/nim-chat", {
          method: "POST",
          signal: ctrl.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question, model: useModel, history }),
        });
      } catch (proxyErr) {
        if (proxyErr instanceof DOMException || !ENV_KEY) throw proxyErr;
        const out = await askDirect(question, history, useModel, ctrl.signal);
        return finish(out.text, { ...out, rpm: null });
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        const err: Error & { status?: number } = new Error(
          (data as { statusMessage?: string }).statusMessage || "AI request failed"
        );
        err.status = res.status;
        throw err;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let full = "";
      let meta: { model: string; fallback: boolean; rpm: { used: number; limit: number } | null } | null = null;
      let usage: number | null = null;
      let flushAt = 0;
      const flush = (force: boolean) => {
        const now = Date.now();
        if ((force || now - flushAt > 60) && events?.onToken) {
          flushAt = now;
          events.onToken(full);
        }
      };
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop() ?? "";
        for (const part of parts) {
          for (const line of part.split("\n")) {
            const payload = line.startsWith("data:") ? line.slice(5).trim() : "";
            if (!payload || payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload);
              if (json.meta) {
                meta = { model: json.meta.model ?? useModel, fallback: !!json.meta.fallback, rpm: json.meta.rpm ?? null };
                if (meta.rpm) setQuota(meta.rpm);
                events?.onMeta?.(meta);
              } else if (typeof json.token === "string") {
                full += json.token;
                if (!reduced) flush(false);
              } else if (json.usage && typeof json.usage.total_tokens === "number") {
                usage = json.usage.total_tokens;
              } else if (typeof json.error === "string") {
                throw new Error(json.error);
              }
            } catch (e) {
              if (e instanceof Error && e.message !== "Unexpected end of JSON input" && !(e instanceof SyntaxError)) throw e;
              /* partial chunk — wait for more */
            }
          }
        }
      }
      flush(true);
      return finish(full.trim() ? full : "(empty reply — retry)", {
        text: "",
        model: meta?.model ?? useModel,
        fallback: meta?.fallback ?? false,
        tokens: usage,
        rpm: meta?.rpm ?? null,
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        return { ok: false, error: "· cancelled", cancelled: true };
      }
      const status = (e as { status?: number })?.status;
      if (status === 401 || status === 403) {
        return { ok: false, error: "! key rejected — check the NIM API key", status };
      }
      if (status === 502 || status === 503) {
        return { ok: false, error: "! proxy unreachable — is `nuxt dev` running on :3000?", status };
      }
      if (e instanceof TypeError) {
        return {
          ok: false,
          error: "! console offline — run the site server (`nuxt dev` + `new` dev) so /api resolves",
        };
      }
      return { ok: false, error: `! ${(e as Error).message || "AI request failed"}${status ? ` (${status})` : ""}`, status };
    } finally {
      abortRef.current = null;
      setBusy(false);
    }

    function finish(
      text: string,
      out: { text: string; model: string; fallback: boolean; tokens: number | null; rpm: { used: number; limit: number } | null }
    ): AiAskResult {
      historyRef.current = [
        ...historyRef.current,
        { role: "user", content: question } as ChatMsg,
        { role: "assistant", content: text } as ChatMsg,
      ].slice(-12);
      return { ok: true, text, model: out.model, fallback: out.fallback, tokens: out.tokens, rpm: out.rpm };
    }
  };

  const cancel = () => abortRef.current?.abort();

  const turns = () => historyRef.current.length / 2;

  const estTokens = () =>
    Math.round(historyRef.current.reduce((n, m) => n + m.content.length, 0) / 4);

  const saveThread = (name: string) => {
    const all = readThreads();
    all[name] = { model, history: historyRef.current, at: Date.now() };
    try {
      localStorage.setItem(THREAD_KEY, JSON.stringify(all));
    } catch {
      sessionStorage.setItem(THREAD_KEY, JSON.stringify(all));
    }
  };

  const listThreads = () => {
    const all = readThreads();
    return Object.entries(all).map(([name, t]) => ({
      name,
      turns: Math.round(t.history.length / 2),
      model: shortModel(t.model),
    }));
  };

  const loadThread = (name: string): boolean => {
    const t = readThreads()[name];
    if (!t) return false;
    historyRef.current = t.history.slice(-12);
    setModel(t.model);
    sessionStorage.setItem("nim-model", t.model);
    return true;
  };

  return { model, busy, quota, switchModel, ask, cancel, turns, estTokens, saveThread, listThreads, loadThread };
}

/** Arms `/models` picking — the next plain reply selects, Enter confirms. */
export function useModelPicker(switchModel: (raw: string) => { line: string; ok: boolean }) {
  const [armed, setArmed] = useState(false);
  return {
    armed,
    arm: () => setArmed(true),
    pick: (raw: string) => {
      setArmed(false);
      return switchModel(raw);
    },
  };
}
