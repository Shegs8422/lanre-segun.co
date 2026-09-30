/**
 * NVIDIA NIM chat proxy (Vercel serverless) — keeps the API key server-side.
 *
 * Always streams (SSE): `{"meta"}` → `{"token"}`* → `{"usage"}` → `[DONE]`.
 *
 * RPM governor: NVIDIA allows 40 req/min per key. A sliding window caps
 * dispatches at 40/min; excess requests queue (up to 25s) instead of
 * burning the budget, else 429 + Retry-After. NOTE: serverless instances
 * don't share memory — this governor is per-instance. For strict global
 * accounting, back it with Upstash Redis.
 *
 * Fallbacks: the requested model goes first, then the roster order.
 * 404/429/5xx/network errors advance the chain; 400/401/403 fail fast.
 */

const NIM_BASE = "https://integrate.api.nvidia.com/v1";

const ROSTER = [
  "nvidia/nemotron-3-super-120b-a12b",
  "deepseek-ai/deepseek-v4.1-flash",
  "z-ai/glm-5-3",
  "moonshotai/kimi-k3",
  "nvidia/nemotron-3.5-lightning-30b-a3b",
  "meta/muse-glimmer-30b",
  "nvidia/nemotron-3-ultra-550b-a55b",
  "z-ai/glm-5-3-flash",
  "openai/gpt-oss-20b",
];

const SITE_CONTEXT = [
  "You are the AI playground inside Segun's portfolio console.",
  "Owner: Segun, Design Engineer — systems, brands and AI workflows across Web3, fintech and SaaS.",
  "AI builds: Sena (design system an agent builds against — 11 agents, 38 components, 4 brand modes),",
  "AI Realtime Renamer (Figma plugin naming layers live — local rules + Claude Haiku, ~40ms a rename),",
  "AI Journey (marketing analytics agent — PostHog + Claude, one fix per problem, verdict in 7 days).",
  "Workspace tracks: Workspace, AI Workflow, Design System, Product Design.",
  "Keep answers short (120 words max), plain text, no markdown headings. Answer portfolio questions from these facts.",
].join(" ");

const RPM_LIMIT = 40;
const WINDOW_MS = 60_000;
const MAX_QUEUE_WAIT_MS = 25_000;
const IP_LIMIT = 10;

type ChatMsg = { role: string; content: string };

const dispatchTimes: number[] = [];
const ipCache = new Map<string, { count: number; reset: number }>();

function pruneWindow(now: number) {
  while (dispatchTimes.length > 0 && dispatchTimes[0] <= now - WINDOW_MS) {
    dispatchTimes.shift();
  }
}

function rpm() {
  pruneWindow(Date.now());
  return { used: dispatchTimes.length, limit: RPM_LIMIT };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function jsonError(status: number, statusMessage: string, extra?: Record<string, unknown>) {
  return new Response(JSON.stringify({ statusCode: status, statusMessage, ...extra }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError(405, "Method not allowed.");
  }

  // Per-IP guard: 10/min protects the shared 40 RPM budget.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const now = Date.now();
  const entry = ipCache.get(ip) || { count: 0, reset: now + 60000 };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + 60000;
  }
  if (entry.count >= IP_LIMIT) {
    return jsonError(429, "Too many requests. Please try again in a minute.");
  }
  entry.count++;
  ipCache.set(ip, entry);

  const apiKey = process.env.NIM_API_KEY || "";
  if (!apiKey) {
    return jsonError(500, "NIM API key missing. Set NIM_API_KEY in project env.");
  }

  let body: { message?: unknown; model?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Invalid JSON body.");
  }
  const { message, model: requestedModel, history = [] } = body ?? {};
  if (!message || typeof message !== "string" || !message.trim()) {
    return jsonError(400, "Message is required.");
  }

  const messages: ChatMsg[] = [
    { role: "system", content: SITE_CONTEXT },
    ...(Array.isArray(history)
      ? history.filter(
          (m): m is ChatMsg => !!m && typeof m === "object" && typeof (m as { content?: unknown }).content === "string"
        )
      : []
    ).slice(-6),
    { role: "user", content: message.trim().slice(0, 2000) },
  ];

  // Global RPM governor: queue while the window is full.
  const queuedAt = Date.now();
  pruneWindow(Date.now());
  while (dispatchTimes.length >= RPM_LIMIT) {
    if (Date.now() - queuedAt > MAX_QUEUE_WAIT_MS) {
      const retryAfter = Math.ceil((dispatchTimes[0] + WINDOW_MS - Date.now()) / 1000);
      return jsonError(429, `AI budget busy — retry in ${retryAfter}s.`, { retryAfter });
    }
    await sleep(500);
    pruneWindow(Date.now());
  }
  dispatchTimes.push(Date.now());

  const chain =
    typeof requestedModel === "string" && requestedModel
      ? [requestedModel, ...ROSTER.filter((m) => m !== requestedModel)]
      : [...ROSTER];

  let upstream: Response | null = null;
  let usedModel = chain[0];
  let lastError: unknown = null;
  for (const model of chain) {
    try {
      const res = await fetch(`${NIM_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.6,
          max_tokens: 1024,
          stream: true,
          stream_options: { include_usage: true },
        }),
      });
      if (!res.ok || !res.body) {
        const err: Error & { status?: number } = new Error(`NIM ${res.status}`);
        err.status = res.status;
        throw err;
      }
      upstream = res;
      usedModel = model;
      break;
    } catch (e: unknown) {
      lastError = e;
      const status = (e as { status?: number })?.status;
      if (status === 400 || status === 401 || status === 403) break;
    }
  }

  if (!upstream?.body) {
    console.error("All NIM fallback models failed.", lastError);
    return jsonError(502, "All AI models are busy right now — try again shortly.");
  }

  const fallback = usedModel !== chain[0];
  const source = upstream.body;
  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      const send = (obj: unknown) => controller.enqueue(enc.encode(`data: ${JSON.stringify(obj)}\n\n`));
      send({ meta: { model: usedModel, fallback, rpm: rpm() } });
      const reader = source.getReader();
      const dec = new TextDecoder();
      let buf = "";
      try {
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
                const parsed = JSON.parse(payload);
                const token = parsed?.choices?.[0]?.delta?.content;
                if (typeof token === "string" && token) send({ token });
                const usage = parsed?.usage;
                if (usage && typeof usage.total_tokens === "number") send({ usage });
              } catch {
                /* partial chunk — wait for more */
              }
            }
          }
        }
      } catch (e) {
        send({ error: (e as Error).message || "stream interrupted" });
      } finally {
        try {
          reader.releaseLock();
        } catch {
          /* already closed */
        }
        send("[DONE]");
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
