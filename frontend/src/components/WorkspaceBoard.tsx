import { useEffect, useRef, useState } from "react";
import { BOARDS, SIDEBAR, type Board, type CardLine } from "../data/boards";
import { copyLogSelection, useCommandHistory, useTerminalLog } from "../hooks/useTerminal";
import { shortModel, stripSlash, useAiChat, useModelPicker } from "../hooks/useAiChat";
import SlashMenu from "./SlashMenu";
import { slashMatches } from "../data/terminal";
import { NIM_ROSTER, modelListLines } from "../data/nim";
import { lineColor, slashOptionLines } from "../data/terminal";

const W = 1200;
const H = 640;

const TONE: Record<string, string> = {
  purple: "bg-tone-purple-bg text-tone-purple-ink",
  blue: "bg-tone-blue-bg text-tone-blue-ink",
  green: "bg-tone-green-bg text-tone-green-ink",
};

type Center = { x: number; y: number; w: number; h: number };

/** Straight / elbow connector precomputed from static node geometry. */
function edgePath(via: string, a: Center, c: Center): string {
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = c.x;
  const y2 = c.y + c.h / 2;
  if (via === "line") return `M ${x1} ${y1} L ${x2} ${y2}`;
  if (via === "elbow") {
    const mx = x2 - 14;
    return `M ${x1} ${y1} L ${mx} ${y1} L ${mx} ${y2} L ${x2} ${y2}`;
  }
  const sx = a.x + a.w / 2;
  const sy = a.y + a.h;
  const tx = c.x + c.w / 2;
  const ty = c.y;
  return `M ${sx} ${sy} L ${sx} ${ty} L ${tx} ${ty}`;
}

const HELP_LINES = [
  "· open <project> put it on the canvas",
  "· list every project in the index",
  "· tags what the work has in common",
  "· ask <question> query the AI playground",
  "· model [name] list or switch AI models",
  "· retry re-run last question, next model",
  "· save/load <name> keep + resume threads",
  "· export copy the log · context/quota stats",
  "· next the one after this",
  "· clear wipe the log",
  "· ↑/↓ recall — ctrl+c cancels input, clears log",
];

/** Types its sets in a self-driven loop: type → hold → wipe → next variant. */
function TypedLines({ sets, period, onActive }: { sets: CardLine[][]; period: number; onActive: () => void }) {
  const [prefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [vi, setVi] = useState(0);
  const [count, setCount] = useState(0);
  const [clearing, setClearing] = useState(false);
  const [ready, setReady] = useState(prefersReduced);
  // Bumped on tab-visibility return so a loop parked while hidden resumes.
  const [pulse, setPulse] = useState(0);
  const lines = sets[vi % sets.length];
  const lens = lines.map((l) => l.text.length + ("sub" in l && l.sub ? l.sub.length + 1 : 0));
  const total = lens.reduce((a, b) => a + b, 0);
  // Reduced-motion renders the full set without typing timers.
  const effectiveCount = prefersReduced ? total : count;
  const activeRef = useRef(onActive);

  // Sync callback ref in effect, not during render (Rules of Hooks safe)
  useEffect(() => {
    activeRef.current = onActive;
  }, [onActive]);

  useEffect(() => {
    if (prefersReduced) return;
    const t = window.setTimeout(() => setReady(true), 450);
    return () => window.clearTimeout(t);
  }, [prefersReduced]);

  useEffect(() => {
    const onVis = () => {
      if (!document.hidden) setPulse((p) => p + 1);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!ready || prefersReduced) return;
    if (document.hidden) return;
    if (count < total) {
      const t = window.setTimeout(() => setCount((c) => c + 1), 30);
      return () => window.clearTimeout(t);
    }
    const hold = window.setTimeout(() => setClearing(true), Math.max(900, period - total * 30 - 700));
    return () => window.clearTimeout(hold);
  }, [count, total, ready, vi, period, prefersReduced, pulse]);

  useEffect(() => {
    if (!clearing) return;
    const t = window.setTimeout(() => {
      setVi((v) => v + 1);
      setCount(0);
      setClearing(false);
      activeRef.current();
    }, 280);
    return () => window.clearTimeout(t);
  }, [clearing]);

  // Pure slice math: chars shown per line derived from prefix offsets,
  // no render-phase mutation. Caret goes on the first partially-typed line.
  const offsets: number[] = [];
  lens.reduce((acc, len, idx) => {
    offsets[idx] = acc;
    return acc + len;
  }, 0);
  const takes = lines.map((_, i) => Math.max(0, Math.min(lens[i], effectiveCount - offsets[i])));
  const caretIndex = lines.findIndex((_, i) => ready && takes[i] > 0 && takes[i] < lens[i]);
  return (
    <div className={`transition-opacity duration-200 ${clearing ? "opacity-0" : "opacity-100"}`}>
      {lines.map((l, i) => {
        const take = takes[i];
        const showCaret = i === caretIndex;
        const main = l.text.slice(0, take);
        const sub = "sub" in l && l.sub ? l.sub.slice(0, Math.max(0, take - l.text.length - 1)) : "";
        const started = take > 0;
        const caret = showCaret ? (
          <span className="caret-blink ml-0.5 inline-block h-[13px] w-[7px] translate-y-[2px] bg-faint" />
        ) : null;
        const hide = started ? "" : "invisible";
        if (l.t === "cmd") {
          return (
            <p key={i} className={`bg-ink/[0.06] px-2 py-1 font-sans text-[11px] text-muted ${hide}`}>
              {main}
              {caret}
            </p>
          );
        }
        if (l.t === "dot") {
          return (
            <div key={i} className={`flex gap-2 ${hide}`}>
              <span className="mt-[5px] size-[8px] shrink-0 rounded-full bg-ink" />
              <div>
                <p className="font-sans text-[12px] leading-5 text-muted">
                  {main}
                  {!sub && caret}
                </p>
                {sub && (
                  <p className="font-sans text-[10px] text-faint">
                    {sub}
                    {caret}
                  </p>
                )}
              </div>
            </div>
          );
        }
        if (l.t === "ok") {
          return (
            <p key={i} className={`bg-success-bg px-2 py-0.5 font-sans text-[11px] text-success ${hide}`}>
              {take > 0 ? "✓ " : ""}
              {main}
              {caret}
            </p>
          );
        }
        if (l.t === "dim") {
          return (
            <p key={i} className={`font-sans text-[10px] tracking-[1px] text-faint ${hide}`}>
              {main}
              {caret}
            </p>
          );
        }
        if (l.t === "title") {
          return (
            <p key={i} className={`font-sans text-[13px] font-medium text-ink ${hide}`}>
              {main}
              {caret}
            </p>
          );
        }
        return (
          <p key={i} className={`font-sans text-[11px] text-muted ${hide}`}>
            {main}
            {caret}
          </p>
        );
      })}
    </div>
  );
}

export default function WorkspaceBoard() {
  const [prefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [idx, setIdx] = useState(0);
  const [focusId, setFocusId] = useState<string | null>("chat");
  const boards = BOARDS;
  const safeIdx = Math.min(idx, boards.length - 1);
  const sidebar = boards.length > 0 ? boards.map((b) => ({ id: b.id, title: b.sidebarTitle, sub: b.sidebarSub })) : SIDEBAR;
  const { lines, appendLines, clear, startStream, pushStream } = useTerminalLog(BOARDS[0].terminal, prefersReduced);
  const { record, travel } = useCommandHistory();
  const { model: aiModel, busy: aiBusy, quota: aiQuota, switchModel, ask, cancel: cancelAi, turns, estTokens, saveThread, listThreads, loadThread } = useAiChat(prefersReduced);
  const picker = useModelPicker(switchModel);
  const lastQ = useRef<string | null>(null);
  const [cmd, setCmd] = useState("");
  const [menuIdx, setMenuIdx] = useState(0);
  const [ops, setOps] = useState(142);
  const [watchers, setWatchers] = useState(3);
  const board: Board = boards[safeIdx];
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const select = (i: number) => {
    if (i === idx) return;
    setIdx(i);
    setFocusId(boards[i].cards.find((c) => c.variants?.length)?.id ?? null);
    appendLines([`> open ${boards[i].id}`, ...boards[i].terminal]);
  };

  const runCmd = (raw: string) => {
    const c = stripSlash(raw).toLowerCase();
    if (!c) {
      // Bare `/` + Enter opens the option menu.
      if (raw.trim() === "/") appendLines(["> /", ...slashOptionLines("")]);
      return;
    }
    record(raw.trim());
    // Picker armed by `/models` — a plain reply selects, Enter confirms.
    if (picker.armed && !raw.trim().startsWith("/")) {
      const res = picker.pick(c);
      appendLines([`> ${raw.trim()}`, res.line]);
      return;
    }
    const modelMatch = c.match(/^models?(?:\s+(.+))?$/);
    if (modelMatch) {
      const arg = (modelMatch[1] ?? "").trim();
      if (!arg) {
        appendLines([
          `> ${raw.trim()}`,
          ...modelListLines(aiModel),
          "· reply with a number or name — Enter confirms",
        ]);
        picker.arm();
        fetch("/api/nim-models")
          .then((r) => r.json())
          .then((d) => {
            const ids = Array.isArray((d as { models?: unknown }).models)
              ? ((d as { models: string[] }).models ?? [])
              : [];
            const extra = ids.filter((id) => !NIM_ROSTER.some((m) => m.id === id)).length;
            if (extra > 0) appendLines([`· +${extra} more live — model <org/name> to use`]);
          })
          .catch(() => {});
        return;
      }
      const res = switchModel(arg);
      appendLines([`> ${raw.trim()}`, res.line]);
      return;
    }
    const askMatch = c.match(/^(ask|ai)\s+(.+)/);
    const runAsk = (question: string, modelOverride?: string) => {
      lastQ.current = question;
      const short = shortModel(modelOverride ?? aiModel);
      appendLines([`> ${raw.trim()}`, `· thinking · ${short}…`]);
      let sid = 0;
      void ask(question, {
        model: modelOverride,
        events: {
          onMeta: () => {
            sid = startStream();
          },
          onToken: (fullText) => {
            if (sid) pushStream(sid, `» ${fullText}`);
          },
        },
      }).then((res) => {
        if (!res.ok) {
          appendLines([res.error]);
          return;
        }
        const used = shortModel(res.model);
        const paras = res.text
          .split("\n")
          .map((t) => t.trim())
          .filter(Boolean);
        if (sid) pushStream(sid, `» ${paras[0] ?? ""}`);
        const reply = paras.map((t, i) => (i === 0 ? `» ${t}` : t));
        appendLines([
          ...reply.slice(sid ? 1 : 0),
          `✓ done · ${used}${res.fallback ? ` · fallback from ${short}` : ""}${res.tokens ? ` · ${res.tokens} tokens` : ""}${res.rpm ? ` · ${res.rpm.used}/${res.rpm.limit} rpm` : ""}`,
        ]);
      });
    };
    if (askMatch) {
      runAsk(askMatch[2].trim());
      return;
    }
    if (c === "next") {
      select((safeIdx + 1) % boards.length);
      return;
    }
    if (c === "clear") {
      clear();
      return;
    }
    if (c === "help") {
      appendLines([`> ${raw.trim()}`, ...HELP_LINES]);
      return;
    }
    if (c === "list") {
      appendLines([
        `> ${raw.trim()}`,
        ...boards.map((b, i) => `${i === safeIdx ? "●" : "·"} ${b.id} — ${b.sidebarSub.toLowerCase()}`),
      ]);
      return;
    }
    if (c === "tags") {
      appendLines([`> ${raw.trim()}`, "· systems · ai · craft — every track ships"]);
      return;
    }
    if (c === "retry") {
      if (!lastQ.current) {
        appendLines([`> ${raw.trim()}`, "· nothing to retry — ask something first"]);
        return;
      }
      const ni = NIM_ROSTER.findIndex((m) => m.id === aiModel);
      const nxt = NIM_ROSTER[(ni + 1) % NIM_ROSTER.length];
      appendLines([`> ${raw.trim()}`, `· retrying on ${nxt.short}…`]);
      runAsk(lastQ.current, nxt.id);
      return;
    }
    const saveMatch = c.match(/^save\s+(.+)/);
    if (saveMatch) {
      const name = saveMatch[1].trim().slice(0, 40);
      saveThread(name);
      appendLines([`> ${raw.trim()}`, `✓ saved “${name}” · ${turns()} turns`]);
      return;
    }
    const loadMatch = c.match(/^load\s+(.+)/);
    if (loadMatch) {
      const name = loadMatch[1].trim();
      if (loadThread(name)) {
        appendLines([`> ${raw.trim()}`, `✓ resumed “${name}” · ${turns()} turns · ${shortModel(aiModel)}`]);
      } else {
        appendLines([`> ${raw.trim()}`, `· no thread “${name}” — \`threads\` lists saved ones`]);
      }
      return;
    }
    if (c === "threads") {
      const all = listThreads();
      appendLines([
        `> ${raw.trim()}`,
        ...(all.length > 0
          ? all.map((t) => `· ${t.name} — ${t.turns} turns · ${t.model}`)
          : ["· no saved threads — `save <name>` keeps this one"]),
      ]);
      return;
    }
    if (c === "export") {
      const md = lines.map((l) => l.text).join("\n");
      try {
        void navigator.clipboard?.writeText(md)?.then(
          () => appendLines([`> ${raw.trim()}`, `✓ exported ${lines.length} lines — paste anywhere`]),
          () => appendLines([`> ${raw.trim()}`, "! clipboard blocked — select + right-click instead"])
        );
      } catch {
        appendLines([`> ${raw.trim()}`, "! clipboard blocked — select + right-click instead"]);
      }
      return;
    }
    if (c === "context") {
      const entry = NIM_ROSTER.find((m) => m.id === aiModel);
      const ctx = entry?.ctx ?? 128000;
      const pct = Math.min(99, Math.round((estTokens() / ctx) * 100));
      appendLines([
        `> ${raw.trim()}`,
        `· ctx — ${shortModel(aiModel)} · ${turns()} turns · ~${estTokens()} tokens (~${pct}% of ${(ctx / 1000).toFixed(0)}k)`,
      ]);
      return;
    }
    if (c === "quota") {
      appendLines([
        `> ${raw.trim()}`,
        aiQuota
          ? `· rpm budget — ${aiQuota.used}/${aiQuota.limit} used this minute`
          : "· quota unknown yet — ask something first",
      ]);
      return;
    }
    const m = c.match(/^open\s+(.+)/);
    if (m) {
      const q = m[1].trim().replace(/\s+/g, "");
      const i = boards.findIndex(
        (b) => b.id === q || b.sidebarTitle.toLowerCase().replace(/\s+/g, "") === q
      );
      if (i >= 0) {
        if (i === safeIdx) appendLines([`> ${raw.trim()}`, `· already on ${boards[i].id}`]);
        else select(i);
        return;
      }
      appendLines([`> ${raw.trim()}`, "· unknown project — `list` shows every project"]);
      return;
    }
    // Bare verbs with nothing to act on get usage; anything else is chat.
    // A lone or partial slash never reaches the AI — it opens the menu.
    if (raw.trim().startsWith("/")) {
      appendLines([`> ${raw.trim()}`, ...slashOptionLines(c)]);
      return;
    }
    const usage: Record<string, string> = {
      open: "open <project> — try: open ai",
      list: "list needs no arguments — it just runs",
      tags: "tags needs no arguments — it just runs",
      next: "next needs no arguments — it just runs",
      clear: "clear needs no arguments — it just runs",
      help: "help needs no arguments — it just runs",
      model: "model [name] — `/models` lists every option",
      models: "models needs no arguments — it just runs",
      ask: "ask <question> — try: ask what do you do",
      ai: "ai <question> — try: ai what do you do",
      retry: "retry re-runs the last question — on the next model",
      save: "save <name> — keep this thread",
      load: "load <name> — resume a thread",
      threads: "threads lists saved threads",
      export: "export copies the log as markdown",
      context: "context shows model, turns, budget",
      quota: "quota shows the rpm budget",
    };
    const verb = c.split(/\s+/)[0];
    if (usage[verb]) {
      appendLines([`> ${raw.trim()}`, `· usage — ${usage[verb]}`]);
      return;
    }
    runAsk(c);
  };

  // Live ops ticker.
  useEffect(() => {
    const t = window.setInterval(() => {
      if (document.hidden) return;
      if (Math.random() < 0.7) setOps((o) => o + 1 + Math.floor(Math.random() * 3));
      if (Math.random() < 0.2) setWatchers(2 + Math.floor(Math.random() * 3));
    }, 4000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    termRef.current?.scrollTo({ top: termRef.current.scrollHeight });
  }, [lines]);

  // Entrance order: left to right, top to bottom.
  const orderOf = (x: number, y: number) => x * 1000 + y;
  const flowOrder = [...board.flow].sort((a, b) => orderOf(a.x, a.y) - orderOf(b.x, b.y));
  const cardOrder = [...board.cards].sort((a, b) => orderOf(a.x, a.y) - orderOf(b.x, b.y));
  const stickyOrder = [...board.stickies].sort((a, b) => orderOf(a.x, a.y) - orderOf(b.x, b.y));
  const step = 350;
  const textAfter = 400;
  const flowDelay = new Map(flowOrder.map((n, i) => [n.id, i * step]));
  const cardDelay = new Map(cardOrder.map((n, i) => [n.id, (flowOrder.length + i) * step]));
  const stickyDelay = new Map(
    stickyOrder.map((n, i) => [n.id, (flowOrder.length + cardOrder.length + i) * step])
  );

  const centers = new Map<string, Center>();
  [...board.flow, ...board.cards].forEach((n) => {
    const w = "w" in n ? n.w : 200;
    centers.set(n.id, { x: n.x, y: n.y, w, h: "h" in n ? (n.h as number) : 190 });
  });

  // Selection ring + intent cursor follow the card being typed.
  const focusCard = board.cards.find((c) => c.id === focusId);

  return (
    <section aria-label="Interactive workspace board" className="hidden md:block">
      {/* Inset frame — bar + body share one bordered console box
          (Figma 265:2). No top spacing: the box top border is the divider;
          side + bottom insets only. */}
      <div aria-hidden className="h-px bg-line-strong" />
      <div className="px-4 pb-6 md:px-7">
      {/* Tablet tab strip — horizontal expertises */}
      <div className="grid grid-cols-2 border border-b-0 border-t-0 border-line md:grid-cols-4 lg:hidden">
        {sidebar.map((s, i) => {
          const active = s.id === board.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => select(i)}
              aria-current={active}
              className={`flex items-start gap-2 border-l-2 px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-[-2px] ${
                active ? "border-ink bg-bg-sunk" : "border-transparent hover:bg-ink/[0.04]"
              }`}
            >
              <span className={`mt-[7px] size-[7px] shrink-0 ${active ? "bg-ink" : "bg-ink/25"}`} />
              <span className="min-w-0">
                <span className="block truncate font-sans text-[15px] font-medium leading-6 text-ink">{s.title}</span>
                <span className="block truncate font-sans text-[10px] tracking-[1px] text-faint">{s.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="border border-t-0 border-line">
      {/* Top bar — first child of the box, sits ON the console (Figma 265:3) */}
      <div className="sv-cn-bar border-b border-accent-deep bg-accent">
        <p className="min-w-0 truncate font-sans text-[10px] tracking-[1.5px] text-accent-ink md:text-[11px]">
          <span className="mr-3 inline-flex gap-1 align-middle">
            <span className="inline-block size-[8px] bg-accent-ink" />
            <span className="inline-block size-[8px] bg-accent-ink/30" />
            <span className="inline-block size-[8px] bg-accent-ink/30" />
          </span>
          {board.crumb}
        </p>
        <p className="shrink-0 font-sans text-[10px] tracking-[1.5px] text-accent-ink md:text-[11px]">
          <span className="mr-2 inline-block size-[8px] bg-accent-ink" />
          READY
        </p>
      </div>
      <div className="grid lg:grid-cols-[clamp(184px,24%,216px)_1fr] lg:min-h-[clamp(560px,75svh,680px)]">
        {/* Sidebar rail — desktop only: soft pane (#fbf7e6 light),
            progression pinned below via flex + mt-auto */}
        <aside className="hidden border-r border-line bg-bg-soft lg:row-span-2 lg:flex lg:flex-col">
          <p className="px-4 pt-4 font-sans text-[10px] tracking-[1.68px] text-faint">EXPERTISE</p>
          <ul className="mt-2">
            {sidebar.map((s, i) => {
              const active = s.id === board.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={active}
                    className={`flex w-full items-start gap-2 border-l-2 px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-[-2px] ${
                      active
                        ? "border-ink bg-bg-sunk"
                        : "border-transparent hover:bg-ink/[0.04]"
                    }`}
                  >
                    <span className={`mt-[7px] size-[7px] shrink-0 ${active ? "bg-ink" : "bg-ink/25"}`} />
                    <span>
                      <span className="block font-sans text-[15px] font-medium leading-6 text-ink">{s.title}</span>
                      <span className="block font-sans text-[10px] tracking-[1px] text-faint">{s.sub}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto border-t border-line px-4 py-6">
            <p className="font-sans text-[10px] tracking-[1.5px] text-faint">{board.opened}</p>
            <div className="mt-2 h-[2px] bg-ink/[0.12]">
              <div
                className="h-full bg-ink transition-all duration-500"
                style={{ width: `${((safeIdx + 1) / boards.length) * 100}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Canvas */}
        <div className="relative">
          <div
            key={board.id}
            className="relative aspect-[1200/820] w-full overflow-hidden lg:aspect-[1200/640]"
            style={{ backgroundImage: "radial-gradient(color-mix(in srgb, var(--ink) 18%, transparent) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          >
            <div
              aria-hidden
              className="grid-breathe absolute inset-0"
              style={{ backgroundImage: "radial-gradient(color-mix(in srgb, var(--ink) 22%, transparent) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
            />
            <p className="absolute left-[2%] top-[3%] font-sans text-[10px] tracking-[1.68px] text-faint">{board.canvasTag}</p>
            <p className="absolute right-[2%] top-[3%] font-sans text-[10px] tracking-[1.68px] text-faint">{board.canvasMeta}</p>

            {board.stub && (
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                <path d={board.stub} fill="none" stroke="var(--faint)" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.6" />
              </svg>
            )}

            {/* Edges — straight, precomputed, drawn after source node */}
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="var(--faint)" strokeWidth="1.4" />
                </marker>
              </defs>
              {board.edges.map((e) => {
                const a = centers.get(e.from)!;
                const c = centers.get(e.to)!;
                const fromIdx = flowOrder.findIndex((n) => n.id === e.from);
                const lx =
                  e.via === "drop"
                    ? (a.x + a.w / 2 + c.x + c.w / 2) / 2 + 14
                    : (a.x + a.w + c.x) / 2;
                const ly =
                  e.via === "drop"
                    ? (a.y + a.h + c.y) / 2
                    : (a.y + a.h / 2 + c.y + c.h / 2) / 2 - 16;
                return (
                  <g key={e.id}>
                    <path
                      d={edgePath(e.via, a, c)}
                      pathLength={100}
                      fill="none"
                      stroke="var(--faint)"
                      strokeWidth="1.2"
                      markerEnd="url(#arr)"
                      className="edge-draw"
                      style={{ animationDelay: `${(fromIdx + 1) * step + 450}ms` }}
                    />
                    {e.label && (
                      <text
                        x={lx}
                        y={ly}
                        fontSize="13"
                        fill="var(--accent-deep)"
                        fontFamily="General Sans, ui-sans-serif, system-ui, sans-serif"
                        textAnchor="middle"
                        className="board-in-text"
                        style={{ animationDelay: `${(fromIdx + 1) * step + 1150}ms` }}
                      >
                        {e.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Flow nodes — shell first, text follows */}
            {board.flow.map((n) =>
              n.kind === "diamond" ? (
                <div
                  key={n.id}
                  className="board-in absolute"
                  style={{
                    left: `${(n.x / W) * 100}%`,
                    top: `${(n.y / H) * 100}%`,
                    width: `${(n.w / W) * 100}%`,
                    height: `${(n.h / H) * 100}%`,
                    animationDelay: `${flowDelay.get(n.id)}ms`,
                  }}
                >
                  <div
                    className="flex h-full items-center justify-center border border-ink/30 bg-bg-soft px-8 text-center font-sans text-[10px] leading-[14px] text-muted"
                    style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
                  >
                    <span className="board-in-text" style={{ animationDelay: `${(flowDelay.get(n.id) ?? 0) + textAfter}ms` }}>
                      {n.text}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={n.id}
                  className={`board-in absolute flex items-center justify-center font-sans text-[12px] tracking-[1px] ${
                    n.kind === "cta"
                      ? "bg-accent text-accent-ink shadow-[inset_0_0_0_1px_var(--accent-deep)]"
                      : "border border-ink/30 bg-bg-soft text-muted"
                  }`}
                  style={{
                    left: `${(n.x / W) * 100}%`,
                    top: `${(n.y / H) * 100}%`,
                    width: `${(n.w / W) * 100}%`,
                    height: `${(n.h / H) * 100}%`,
                    animationDelay: `${flowDelay.get(n.id)}ms`,
                  }}
                >
                  <span className="board-in-text" style={{ animationDelay: `${(flowDelay.get(n.id) ?? 0) + textAfter}ms` }}>
                    {n.text}
                  </span>
                </div>
              )
            )}

            {/* Cards — shell first, typed lines follow */}
            {board.cards.map((c) => {
              const focused = c.id === focusId;
              return (
              <div
                key={c.id}
                className={`board-in absolute border border-ink/[0.22] bg-bg-soft p-3 transition-shadow duration-500 ${
                  focused
                    ? "shadow-[0_0_0_2px_#0b99ff,4px_8px_0_rgba(22,20,14,0.16)]"
                    : "shadow-[2px_2px_0_rgba(22,20,14,0.12)]"
                }`}
                style={{
                  left: `${(c.x / W) * 100}%`,
                  top: `${(c.y / H) * 100}%`,
                  width: `${(c.w / W) * 100}%`,
                  animationDelay: `${cardDelay.get(c.id)}ms`,
                }}
              >
                {focused && (
                  <>
                    <span aria-hidden className="absolute -left-1 -top-1 size-2 border border-[#0b99ff] bg-bg" />
                    <span aria-hidden className="absolute -right-1 -top-1 size-2 border border-[#0b99ff] bg-bg" />
                    <span aria-hidden className="absolute -bottom-1 -left-1 size-2 border border-[#0b99ff] bg-bg" />
                    <span aria-hidden className="absolute -bottom-1 -right-1 size-2 border border-[#0b99ff] bg-bg" />
                  </>
                )}
                <p className="board-in-text font-sans text-[10px] tracking-[1.68px] text-faint" style={{ animationDelay: `${(cardDelay.get(c.id) ?? 0) + textAfter}ms` }}>
                  {c.tag}
                </p>
                <div className="mt-2 space-y-1.5">
                  {c.variants?.length ? (
                    <TypedLines
                      sets={[c.lines, ...(c.variants ?? []).map((v) => v.lines)]}
                      period={6200 + cardOrder.findIndex((k) => k.id === c.id) * 1400}
                      onActive={() => setFocusId(c.id)}
                    />
                  ) : c.loopLines ? (
                    <LoopLines lines={c.lines} startDelay={(cardDelay.get(c.id) ?? 0) + 460} />
                  ) : (
                    c.lines.map((l, i) => (
                      <StaticLine key={i} l={l} delay={`${(cardDelay.get(c.id) ?? 0) + 460 + i * 160}ms`} />
                    ))
                  )}
                </div>
              </div>
              );
            })}

            {/* Stickies */}
            {board.stickies.map((s) => (
              <div
                key={s.id}
                className={`board-in absolute p-3 shadow-[2px_3px_0_rgba(22,20,14,0.12)] ${TONE[s.tone]}`}
                style={{
                  left: `${(s.x / W) * 100}%`,
                  top: `${(s.y / H) * 100}%`,
                  width: `${(s.w / W) * 100}%`,
                  rotate: `${s.tilt}deg`,
                  animationDelay: `${stickyDelay.get(s.id)}ms`,
                }}
              >
                <p className="board-in-text font-sans text-[12.5px] leading-5" style={{ animationDelay: `${(stickyDelay.get(s.id) ?? 0) + textAfter}ms` }}>
                  {s.text}
                </p>
              </div>
            ))}

            {/* Stage labels */}
            {board.stageLabels.map((l, i) => (
              <p
                key={l.text}
                className="board-in-text absolute top-[62%] -translate-x-1/2 font-sans text-[15px] text-ink"
                style={{ left: `${(l.x / W) * 100}%`, animationDelay: `${(flowOrder.length + cardOrder.length) * step + i * 120}ms` }}
              >
                {l.text}
              </p>
            ))}

            {/* Intent cursor — glides to the card being typed */}
            <div
              className="absolute z-10 transition-[left,top] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: focusCard ? `${((focusCard.x + focusCard.w / 2) / W) * 100}%` : "11%",
                top: focusCard ? `${(focusCard.y / H) * 100}%` : "13%",
              }}
              aria-hidden
            >
              <div className="cursor-idle -translate-x-[2px] -translate-y-[18px]">
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M2 1 L12 7 L7 8 L5.5 12 Z" fill="var(--ink)" />
                </svg>
                <span className="ml-3 bg-ink px-1.5 py-0.5 font-sans text-[9px] text-bg">Segun</span>
              </div>
            </div>

            {/* Tool chips + live note */}
            <div className="absolute bottom-[3%] left-[2%] flex gap-2">
              {board.tools.map((t) => (
                <span key={t} className="border border-ink/20 px-2 py-1 font-sans text-[9px] tracking-[1px] text-faint">
                  {t}
                </span>
              ))}
            </div>
            <p className="absolute bottom-[3%] right-[2%] font-sans text-[9px] tracking-[1.5px] text-faint">
              LIVE · NEVER FINISHED
            </p>
          </div>

          {/* Terminal */}
          <div className="border-t border-line bg-[#14120e]" onClick={() => inputRef.current?.focus()}>
            <p className="border-b border-white/10 px-4 py-1.5 font-mono text-[10px] tracking-[1.5px] text-[#5a5648]">
              <span className="mr-2 inline-block size-[7px] rounded-full bg-[#8fce7e]" />
              LIVE · {watchers} watching · {ops} ops
            </p>
            <div
              ref={termRef}
              className="h-[clamp(132px,24svh,176px)] cursor-text overflow-y-auto px-4 py-3 font-mono text-[12px] leading-6 select-text"
              aria-live="polite"
              onContextMenu={copyLogSelection}
            >
              {lines.map((l, i) => (
                <p
                  key={`${l.batch}-${i}`}
                  className={`${lineColor(l.text)} ${l.batch > 0 ? "term-in" : ""}`}
                >
                  <span className="mr-2 text-[#5a5648]">{l.time}</span>
                  {l.text}
                </p>
              ))}
            </div>
            <div className="relative flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2">
              {cmd.startsWith("/") && (
                <SlashMenu
                  frag={cmd.slice(1)}
                  active={menuIdx}
                  onPick={(name) => {
                    setCmd(`/${name} `);
                    setMenuIdx(0);
                    inputRef.current?.focus();
                  }}
                />
              )}
              <p className="flex min-w-0 flex-1 items-center font-mono text-[12px] text-faint">
                <span className="mr-2 shrink-0 text-accent">›</span>
                <input
                  ref={inputRef}
                  value={cmd}
                  onChange={(e) => {
                    setCmd(e.target.value);
                    setMenuIdx(0);
                  }}
                  onKeyDown={(e) => {
                    const menuOpen = cmd.startsWith("/") && slashMatches(cmd.slice(1)).length > 0;
                    if (menuOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
                      e.preventDefault();
                      const n = slashMatches(cmd.slice(1)).length;
                      setMenuIdx((i) => (e.key === "ArrowDown" ? (i + 1) % n : (i - 1 + n) % n));
                      return;
                    }
                    if (menuOpen && e.key === "Tab") {
                      e.preventDefault();
                      const hits = slashMatches(cmd.slice(1));
                      const pick = hits[menuIdx] ?? hits[0];
                      if (pick) {
                        setCmd(`/${pick.name} `);
                        setMenuIdx(0);
                      }
                      return;
                    }
                    if (e.key === "Escape" && cmd.startsWith("/")) {
                      e.preventDefault();
                      setCmd("");
                      setMenuIdx(0);
                      return;
                    }
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
                      e.preventDefault();
                      clear();
                      return;
                    }
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
                      e.preventDefault();
                      if (aiBusy) {
                        cancelAi();
                        appendLines(["· cancelled"]);
                      } else if (cmd) {
                        setCmd("");
                      } else {
                        clear();
                      }
                      return;
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      const prev = travel(-1);
                      if (prev !== undefined) setCmd(prev);
                      return;
                    }
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = travel(1);
                      if (next !== undefined) setCmd(next);
                      return;
                    }
                    if (e.key === "Enter") {
                      // Menu open + partial slash → complete the highlighted
                      // option instead of running a fragment.
                      if (menuOpen) {
                        const frag = cmd.slice(1).trim().toLowerCase();
                        const hits = slashMatches(cmd.slice(1));
                        const exact = hits.some((h) => h.name === frag);
                        if (!exact && hits.length > 0) {
                          e.preventDefault();
                          const pick = hits[menuIdx] ?? hits[0];
                          if (pick) setCmd(`/${pick.name} `);
                          setMenuIdx(0);
                          return;
                        }
                      }
                      runCmd(cmd);
                      setCmd("");
                      setMenuIdx(0);
                    }
                  }}
                  placeholder={board.tryCmd}
                  aria-label="Board command input"
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full bg-transparent text-[#d8d2c2] caret-accent outline-none placeholder:text-[#5a5648] focus-visible:bg-white/5"
                />
              </p>
              <div className="flex shrink-0 gap-2">
                {["NEXT", "HELP", "CLEAR"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      if (b === "NEXT") select((safeIdx + 1) % boards.length);
                      else if (b === "CLEAR") clear();
                      else appendLines(["> help", ...HELP_LINES]);
                    }}
                    className="lift border border-white/20 px-3 py-1 font-mono text-[10px] tracking-[1.5px] text-[#d8d2c2] transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Figure caption — bridge from terminal to Tracks */}
      <div className="sv-cn-foot gap-4 border-t border-line bg-bg-soft">
        <p className="shrink-0 font-sans text-[10px] tracking-[1.5px] text-faint">
          FIG. 004 — FOUR TRACKS, ONE BENCH
        </p>
        <p className="hidden truncate font-sans text-[10px] tracking-[1.5px] text-faint sm:block">
          WORKSPACE, AI, SYSTEMS, PRODUCT — OPEN ONE ON THE LEFT
        </p>
      </div>
      </div>
      </div>
    </section>
  );
}

/** Squad list loop: lines appear top-down, hold, erase bottom-up, repeat. */
function LoopLines({ lines, startDelay }: { lines: CardLine[]; startDelay: number }) {
  const [prefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [shown, setShown] = useState(() => (prefersReduced ? lines.length : 0));
  const [phase, setPhase] = useState<"in" | "holdFull" | "out" | "holdEmpty">("in");

  useEffect(() => {
    if (prefersReduced) return;
    let t: number;
    if (phase === "in") {
      if (shown < lines.length) t = window.setTimeout(() => setShown((s) => s + 1), shown === 0 ? startDelay : 320);
      else t = window.setTimeout(() => setPhase("holdFull"), 320);
    } else if (phase === "holdFull") {
      t = window.setTimeout(() => setPhase("out"), 2300);
    } else if (phase === "out") {
      if (shown > 0) t = window.setTimeout(() => setShown((s) => s - 1), 280);
      else t = window.setTimeout(() => setPhase("holdEmpty"), 280);
    } else {
      t = window.setTimeout(() => setPhase("in"), 750);
    }
    return () => window.clearTimeout(t);
  }, [phase, shown, lines.length, startDelay, prefersReduced]);

  return (
    <>
      {lines.slice(0, prefersReduced ? lines.length : shown).map((l, i) => (
        <StaticLine key={`${l.text}-${i}`} l={l} delay="0ms" />
      ))}
    </>
  );
}

/** Static card line with entrance delay (cards without variants). */
function StaticLine({ l, delay }: { l: CardLine; delay: string }) {
  const cls = "board-in-text";
  if (l.t === "cmd") {
    return (
      <p className={`${cls} bg-ink/[0.06] px-2 py-1 font-sans text-[11px] text-muted`} style={{ animationDelay: delay }}>
        {l.text}
      </p>
    );
  }
  if (l.t === "dot") {
    return (
      <div className={`${cls} flex gap-2`} style={{ animationDelay: delay }}>
        <span className="mt-[5px] size-[8px] shrink-0 rounded-full bg-ink" />
        <div>
          <p className="font-sans text-[12px] leading-5 text-muted">{l.text}</p>
          {l.sub && <p className="font-sans text-[10px] text-faint">{l.sub}</p>}
        </div>
      </div>
    );
  }
  if (l.t === "ok") {
    return (
      <p className={`${cls} bg-success-bg px-2 py-0.5 font-sans text-[11px] text-success`} style={{ animationDelay: delay }}>
        ✓ {l.text}
      </p>
    );
  }
  if (l.t === "dim") {
    return (
      <p className={`${cls} font-sans text-[10px] tracking-[1px] text-faint`} style={{ animationDelay: delay }}>
        {l.text}
      </p>
    );
  }
  if (l.t === "title") {
    return (
      <p className={`${cls} font-sans text-[13px] font-medium text-ink`} style={{ animationDelay: delay }}>
        {l.text}
      </p>
    );
  }
  return (
    <p className={`${cls} font-sans text-[11px] text-muted`} style={{ animationDelay: delay }}>
      {l.text}
    </p>
  );
}
