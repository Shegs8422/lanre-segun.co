import { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { copyLogSelection, useCommandHistory, useTerminalLog } from "../hooks/useTerminal";
import { shortModel, stripSlash, useAiChat, useModelPicker } from "../hooks/useAiChat";
import SlashMenu from "./SlashMenu";
import { slashMatches } from "../data/terminal";
import { NIM_ROSTER, modelListLines } from "../data/nim";
import { formatTagGroup, lineColor, slashOptionLines, type TagGroup } from "../data/terminal";

type Build = {
  id: string;
  name: string;
  meta: string;
  crumb: string;
  canvasTitle: string;
  canvasMeta: string;
  purpose: string;
  stack: string[];
  steps: { num: string; title: string; desc: string }[];
  stats: { big: string; label: string }[];
  tags: string[];
  terminal: string[];
  tryCmd: string;
  aliases?: string[];
  tagGroups: TagGroup;
};

const BUILDS: Build[] = [
  {
    id: "sena",
    name: "Sena",
    meta: "ACTIVE · Q1 2026",
    crumb: "PORTFOLIO / WORK / SENA",
    canvasTitle: "SENA",
    canvasMeta: "ACTIVE · Q1 2026",
    purpose:
      "A design system that an agent can build against — so a component request becomes a component, not a ticket.",
    stack: ["Figma Variables", "Claude", "MCP", "React + TS", "Style Dictionary", "npm"],
    steps: [
      { num: "01", title: "Tokens", desc: "Figma variables · 3 collections, 4 modes" },
      { num: "02", title: "Contract", desc: "CLAUDE.md · AGENTS.md · docs/" },
      { num: "03", title: "Squad", desc: "11 agents · build, audit, docs, sync" },
      { num: "04", title: "Library", desc: "typed React · multi-brand · published" },
    ],
    stats: [
      { big: "11", label: "AGENTS" },
      { big: "38", label: "COMPONENTS" },
      { big: "4", label: "BRAND MODES" },
      { big: "1.4s", label: "PER BUILD" },
    ],
    tags: ["DESIGN SYSTEM", "AI AGENTS"],
    terminal: [
      "· reading tokens.json · 214 variables",
      "· routing + build · audit · docs",
      '✓ badge.tsx + badge.css · 142 loc',
      "✓ axe · contrast 4.9:1 — AA",
      "! 1 token alias unresolved — pinned",
      "✓ registry +1 · docs hub synced",
      "· 11 agents · exit 0 · 1.4s",
    ],
    tryCmd: "try: open sena",
    tagGroups: {
      heading: "grouping the system by what it ships",
      items: [
        { label: "tokens", count: 3, unit: "collections" },
        { label: "components", count: 38, unit: "parts" },
        { label: "modes", count: 4, unit: "brands" },
        { label: "agents", count: 11, unit: "runners" },
      ],
      closer: "eleven agents, one registry",
    },
  },
  {
    id: "renamer",
    name: "AI Realtime Renamer",
    meta: "PLUGIN · 2026",
    crumb: "PORTFOLIO / WORK / RENAMER",
    canvasTitle: "AI REALTIME RENAMER",
    canvasMeta: "PLUGIN · 2026",
    purpose:
      "Layer names that are already right when you hand off — because the file names itself while you work, not afterwards.",
    stack: ["Figma Plugin API", "Claude Haiku", "Local rules", "TypeScript"],
    steps: [
      { num: "01", title: "Watch", desc: "document change events · debounced" },
      { num: "02", title: "Read", desc: "children, text, geometry, siblings" },
      { num: "03", title: "Decide", desc: "local rule first · model as fallback" },
      { num: "04", title: "Rename", desc: "batched · never blocks the canvas" },
    ],
    stats: [
      { big: "38", label: "layers a session" },
      { big: "0", label: "interruptions" },
      { big: "~40ms", label: "per rename" },
      { big: "2", label: "modes" },
    ],
    tags: ["FIGMA PLUGIN", "CLAUDE"],
    terminal: [
      "> renamer watch --mode=ai",
      "· listening · document change events",
      "· Frame 12 → reading children · 6 nodes",
      '✓ renamed → "Pricing / tier card"',
      '✓ Group 5 → "Nav / mobile"',
      "! rate limited — batched 4 renames",
      "· 38 layers · 0 interruptions",
    ],
    tryCmd: "try: open renamer",
    tagGroups: {
      heading: "grouping the work by what it actually was",
      items: [
        { label: "webdesign", count: 2, unit: "projects" },
        { label: "adhd", count: 1, unit: "projects" },
        { label: "autism", count: 1, unit: "projects" },
        { label: "ux/ui", count: 1, unit: "projects" },
        { label: "platform", count: 1, unit: "projects" },
        { label: "webapp", count: 1, unit: "projects" },
      ],
      closer: "ten years, and they all rhyme",
    },
  },
  {
    id: "ai-journey",
    name: "AI Journey",
    meta: "ACTIVE · 2026",
    crumb: "PORTFOLIO / WORK / AI-JOURNEY",
    canvasTitle: "AI JOURNEY",
    canvasMeta: "ACTIVE · 2026",
    purpose:
      "Analytics that says why, not just what — one specific fix per problem, then a verdict on whether it worked.",
    stack: ["PostHog", "Claude", "Next.js", "Supabase", "Vercel"],
    steps: [
      { num: "01", title: "Ingest", desc: "sessions · events · rage + dead clicks" },
      { num: "02", title: "Cluster", desc: "group by surface, not by user" },
      { num: "03", title: "Explain", desc: "plain language · one cause" },
      { num: "04", title: "Verify", desc: "re-measure the same funnel in 7d" },
    ],
    stats: [
      { big: "7", label: "AI FEATURES" },
      { big: "~$0.02", label: "PER ACTION" },
      { big: "6", label: "WEEKS SOLO" },
      { big: "1", label: "DESIGNER" },
    ],
    tags: ["SAAS", "SOLO BUILD"],
    terminal: [
      "> journey analyse --last=7d",
      "· posthog · 39 sessions · 214 events",
      "· clustering rage + dead clicks",
      "✓ p.entry-project-description · 1 visitor",
      "✓ fix proposed → make it interactive",
      "! OFFSET rejected — cursor paging",
      "· verdict in 7d · exit 0",
    ],
    tryCmd: "try: open ai-journey",
    aliases: ["journey"],
    tagGroups: {
      heading: "grouping the run by what it measured",
      items: [
        { label: "sessions", count: 39, unit: "captured" },
        { label: "events", count: 214, unit: "clustered" },
        { label: "visitors", count: 1, unit: "profiled" },
        { label: "fixes", count: 1, unit: "shipped" },
      ],
      closer: "one fix per problem, then a verdict",
    },
  },
];

const HELP_LINES = [
  "· open <build> put it on the canvas",
  "· list every build in the index",
  "· tags what the builds have in common",
  "· ask <question> query the AI playground",
  "· model [name] list or switch AI models",
  "· retry re-run last question, next model",
  "· save/load <name> keep + resume threads",
  "· export copy the log · context/quota stats",
  "· next the one after this",
  "· clear wipe the log",
  "· ↑/↓ recall — ctrl+c cancels input, clears log",
];

/**
 * AI Works — Figma node 238:2454.
 * "Built this way, and running." heading + an interactive build board:
 * pick a build on the left, the canvas draws its shape and the terminal
 * streams its run — same functionality as the Welcome WorkspaceBoard.
 */
export default function AIWorks() {
  const { ref, inView } = useReveal<HTMLElement>(0.2);
  const [prefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [idx, setIdx] = useState(1);
  const builds = BUILDS;
  const safeIdx = Math.min(idx, builds.length - 1);
  const [activeStep, setActiveStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const tickRef = useRef(0);
  const { lines, appendLines, clear, startStream, pushStream } = useTerminalLog(BUILDS[1].terminal, prefersReduced);
  const { record, travel } = useCommandHistory();
  const { model: aiModel, busy: aiBusy, quota: aiQuota, switchModel, ask, cancel: cancelAi, turns, estTokens, saveThread, listThreads, loadThread } = useAiChat(prefersReduced);
  const picker = useModelPicker(switchModel);
  const lastQ = useRef<string | null>(null);
  const [cmd, setCmd] = useState("");
  const [menuIdx, setMenuIdx] = useState(0);
  const build = builds[safeIdx];
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const select = (i: number) => {
    if (i === idx) return;
    setIdx(i);
    setActiveStep(0);
    tickRef.current = 0;
    appendLines([`> open ${builds[i].id}`, ...builds[i].terminal]);
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
      select((safeIdx + 1) % builds.length);
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
        ...builds.map((b, i) => `${i === safeIdx ? "●" : "·"} ${b.id} — ${b.name.toLowerCase()}`),
      ]);
      return;
    }
    if (c === "tags") {
      appendLines([`> ${raw.trim()}`, ...formatTagGroup(build.tagGroups)]);
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
      const i = builds.findIndex(
        (b) =>
          b.id === q ||
          b.aliases?.includes(q) ||
          b.name.toLowerCase().replace(/\s+/g, "") === q
      );
      if (i >= 0) {
        if (i === safeIdx) appendLines([`> ${raw.trim()}`, `· already on ${builds[i].id}`]);
        else select(i);
        return;
      }
      appendLines([`> ${raw.trim()}`, "· unknown build — `list` shows every build"]);
      return;
    }
    // Bare verbs with nothing to act on get usage; anything else is chat.
    // A lone or partial slash never reaches the AI — it opens the menu.
    if (raw.trim().startsWith("/")) {
      appendLines([`> ${raw.trim()}`, ...slashOptionLines(c)]);
      return;
    }
    const usage: Record<string, string> = {
      open: "open <build> — try: open sena",
      list: "list needs no arguments — it just runs",
      tags: "tags needs no arguments — it just runs",
      next: "next needs no arguments — it just runs",
      clear: "clear needs no arguments — it just runs",
      help: "help needs no arguments — it just runs",
      model: "model [name] — `/models` lists every option",
      models: "models needs no arguments — it just runs",
      ask: "ask <question> — try: ask what is sena",
      ai: "ai <question> — try: ai what is sena",
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

  useEffect(() => {
    if (prefersReduced) return;
    const t = window.setInterval(() => {
      if (document.hidden) return;
      tickRef.current += 1;
      const n = tickRef.current % build.steps.length;
      if (n === 0) setCycle((c) => c + 1);
      setActiveStep(n);
    }, 1900);
    return () => window.clearInterval(t);
  }, [prefersReduced, build.steps.length]);

  useEffect(() => {
    termRef.current?.scrollTo({ top: termRef.current.scrollHeight });
  }, [lines]);

  const opened = `${safeIdx + 1} / ${builds.length} OPENED`;

  return (
    <section ref={ref} aria-label="AI works — built and running" className="relative">
      {/* Frame rule (contained) + corner mark */}
      <div aria-hidden className="h-px bg-line-strong" />
      <span
        aria-hidden
        className="absolute right-0 top-[1px] h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/2px_20px_no-repeat]"
      />

      {/* AI WORK tab — same single-span badge as every section */}
      <span className="absolute left-0 top-[1px] z-10 bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        AI work
      </span>

      <div className="px-[24px] pb-[96px] pt-[126px] md:px-[68px] md:pb-[126px]">
        {/* Heading */}
        <h2 className={`sv-lines font-sans text-[clamp(32px,4.5vw,47px)] font-medium leading-[1.1] tracking-[-1.41px] text-ink ${inView ? "is-in" : ""}`}>
          <span className="sv-ln">
            <span>Built this way,</span>
          </span>
          <span className="sv-ln">
            <span className="text-faint">and running.</span>
          </span>
        </h2>
        <p className={`sv-rv mt-3 max-w-[566px] font-sans text-[18px] leading-[27.9px] text-muted ${inView ? "is-in" : ""}`}>
          Not experiments. Each of these is in production, in a store, or in
          somebody else&apos;s package.json.
        </p>

        {/* Board */}
        <div className={`sv-console mt-[63px] border border-line ${inView ? "board-in" : "opacity-0"}`}>
          {/* Top bar */}
          <div className="sv-cn-bar bg-accent">
            <p className="flex items-center gap-4 font-sans text-[10px] tracking-[1.5px] text-accent-ink">
              <span className="inline-flex gap-1">
                <span className="inline-block size-[8px] bg-accent-ink" />
                <span className="inline-block size-[8px] bg-accent-ink/30" />
                <span className="inline-block size-[8px] bg-accent-ink/30" />
              </span>
              {build.crumb}
            </p>
            <p className="flex items-center gap-2 font-sans text-[10px] tracking-[1.5px] text-accent-ink">
              <span className="inline-block size-[8px] bg-accent-ink" />
              READY
            </p>
          </div>

          {/* Content area */}
          <div className="sv-cn-body md:grid-cols-[216px_1fr]">
            {/* Sidebar — desktop rail: soft pane (#fbf7e6 light), progression pinned below */}
            <aside className="hidden border-r border-line bg-bg-soft md:flex md:flex-col">
              <p className="px-4 pb-[13px] pt-4 font-sans text-[10px] tracking-[1.68px] text-faint">
                PROJECTS
              </p>
              <ul className="mt-2">
                {builds.map((b, i) => {
                  const active = i === safeIdx;
                  return (
                    <li key={b.id}>
                      <button
                        type="button"
                        onClick={() => select(i)}
                        aria-current={active}
                        className={`flex w-full items-start gap-2 border-l-2 px-4 py-[11px] text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-[-2px] ${
                          active ? "border-ink bg-bg-sunk" : "border-transparent hover:bg-ink/[0.04]"
                        }`}
                      >
                        <span
                          className={`mt-2 size-[6px] shrink-0 ${
                            active ? "bg-ink" : "bg-ink/25"
                          }`}
                        />
                        <span>
                          <span className="block font-sans text-[15px] font-medium leading-6 text-ink">
                            {b.name}
                          </span>
                          <span className="block font-sans text-[10px] tracking-[1px] text-faint">
                            {b.meta}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto px-4 py-6">
                <p className="font-sans text-[10px] tracking-[1.5px] text-faint">
                  {opened}
                </p>
                <div className="mt-2 h-[2px] bg-ink/[0.12]">
                  <div
                    className="h-full bg-ink transition-all duration-500"
                    style={{ width: `${((safeIdx + 1) / builds.length) * 100}%` }}
                  />
                </div>
              </div>
            </aside>

            {/* Canvas — dotted like the Welcome workspace board */}
            <div
              key={build.id}
              className="relative [&>*]:relative"
              style={{
                backgroundImage: "radial-gradient(color-mix(in srgb, var(--ink) 10%, transparent) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            >
              <span
                aria-hidden
                className="grid-breathe pointer-events-none inset-0"
                style={{
                  position: "absolute",
                  backgroundImage: "radial-gradient(color-mix(in srgb, var(--ink) 13%, transparent) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              {/* Mobile build switcher */}
              <div className="flex gap-2 overflow-x-auto border-b border-ink/[0.08] px-4 py-3 md:hidden">
                {builds.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => select(i)}
                    aria-current={i === safeIdx}
                    className={`shrink-0 border px-3 py-1.5 font-sans text-[10px] tracking-[1px] transition focus-visible:outline-2 focus-visible:outline-accent-deep ${
                      i === safeIdx
                        ? "border-ink bg-bg-sunk text-ink"
                        : "border-line text-muted"
                    }`}
                  >
                    {b.name.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Title row */}
              <div className="flex items-start justify-between px-4 pt-[18px] md:px-[22px]">
                <p className="font-sans text-[10px] tracking-[1.68px] text-faint">
                  {build.canvasTitle}
                </p>
                <p className="font-sans text-[10px] tracking-[1.68px] text-faint">
                  {build.canvasMeta}
                </p>
              </div>

              {/* Purpose + Stack */}
              <div className="grid gap-6 px-4 pt-6 md:grid-cols-2 md:px-[34px]">
                <div>
                  <p className="font-sans text-[10px] tracking-[1.68px] text-faint">
                    PURPOSE
                  </p>
                  <p className="mt-2 max-w-[465px] font-sans text-[15px] leading-[24.3px] text-muted">
                    {build.purpose}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[1.68px] text-faint">
                    STACK
                  </p>
                  <div className="mt-2 flex flex-wrap gap-[6px]">
                    {build.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-line px-[10px] py-[6px] font-sans text-[10px] tracking-[1px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step cards — inset box, white fill, continuous linear loaders */}
              <div className="px-4 md:px-[34px]">
                <div className="bd-flow relative mt-6 grid grid-cols-2 gap-px border border-ink/[0.08] bg-ink/[0.08] md:grid-cols-4">
                {build.steps.map((s, i) => {
                  const done = prefersReduced || i < activeStep;
                  const current = !prefersReduced && i === activeStep;
                  return (
                    <div
                      key={s.num}
                      className={`bd-step border-r border-ink/[0.08] bg-bg px-[14px] pb-4 pt-[14px] last:border-r-0 ${
                        done || current ? "is-on" : ""
                      }`}
                    >
                      <p
                        className={`font-sans text-[10px] tracking-[1.68px] transition-colors duration-300 ${
                          done || current ? "text-accent-deep" : "text-ink/25"
                        }`}
                      >
                        {s.num}
                      </p>
                      <p className="mt-1 font-sans text-[15px] font-medium leading-6 text-ink">
                        {s.title}
                      </p>
                      <p className="mt-0.5 font-sans text-[10px] leading-[16px] text-faint">
                        {s.desc}
                      </p>
                      <span className="bar" aria-hidden>
                        {done ? (
                          <i style={{ width: "100%" }} />
                        ) : current ? (
                          <i key={`${build.id}-${cycle}-${i}`} className="bd-fill" />
                        ) : (
                          <i style={{ width: 0 }} />
                        )}
                      </span>
                    </div>
                  );
                })}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-6 border-t border-ink/[0.08] px-4 py-4 md:grid-cols-4 md:px-[34px]">
                {build.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-sans text-[40px] font-medium leading-none tracking-[-0.03em] text-ink">
                      {s.big}
                    </p>
                    <p className="mt-1 font-sans text-[10px] tracking-[1.68px] text-faint">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex gap-2 border-t border-ink/[0.08] px-4 pt-3 md:px-[22px]">
                {build.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-line px-2 py-1 font-sans text-[10px] tracking-[1px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Terminal */}
              <div
                className="mx-4 mb-4 mt-3 bg-[#14120e] font-mono text-[12px] leading-[24px] md:mx-6 md:mb-6"
                onClick={() => inputRef.current?.focus()}
              >
                <div
                  ref={termRef}
                  className="max-h-[186px] cursor-text overflow-y-auto px-[22px] py-3 select-text"
                  aria-live="polite"
                  onContextMenu={copyLogSelection}
                >
                  {lines.map((l, i) => (
                    <p
                      key={`${l.batch}-${i}`}
                      className={`flex items-baseline gap-2 ${lineColor(l.text)} ${l.batch > 0 ? "term-in" : ""}`}
                    >
                      <span aria-hidden className="w-4 shrink-0">
                        {l.text.charAt(0)}
                      </span>
                      <span>{l.text.slice(1).trimStart()}</span>
                    </p>
                  ))}
                </div>
                <div className="relative flex min-h-[52px] items-center justify-between gap-3 border-t border-white/10 px-[22px] py-2">
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
                  <p className="flex min-w-0 flex-1 items-center text-[12px] text-faint">
                    <span className="mr-2 w-4 shrink-0 text-accent">❯</span>
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
                      placeholder={build.tryCmd}
                      aria-label="Build log command input"
                      spellCheck={false}
                      autoComplete="off"
                      className="w-full bg-transparent text-[#d8d2c2] caret-accent outline-none placeholder:text-[#5a5648] focus-visible:bg-white/5"
                    />
                  </p>
                  <div className="flex shrink-0 gap-2">
                    {(["LIST", "NEXT", "TAGS", "HELP"] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          if (b === "NEXT") select((safeIdx + 1) % builds.length);
                          else if (b === "LIST")
                            appendLines([
                              "> list",
                              ...builds.map(
                                (x, xi) => `${xi === safeIdx ? "●" : "·"} ${x.id} — ${x.name.toLowerCase()}`
                              ),
                            ]);
                          else if (b === "TAGS") appendLines(["> tags", ...formatTagGroup(build.tagGroups)]);
                          else appendLines(["> help", ...HELP_LINES]);
                        }}
                        className="lift h-[31px] border border-white/20 px-[11px] font-mono text-[10px] tracking-[1.5px] text-[#d8d2c2] transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="sv-cn-foot border-t border-line bg-bg-soft px-4 md:px-6">
            <p className="shrink-0 font-mono text-[10px] tracking-[1.5px] text-faint">
              THREE BUILDS, AND THE RUN EACH ONE PERFORMS.
            </p>
            <p className="hidden font-mono text-[10px] tracking-[1.5px] text-faint sm:block">
              PICK A BUILD ON THE LEFT — THE CANVAS DRAWS ITS SHAPE, THE LOG PRINTS ITS RUN.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
