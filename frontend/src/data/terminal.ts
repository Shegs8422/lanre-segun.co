/** Shared terminal engine — used by the AI build board and the Welcome workspace board. */

export type TermLine = { text: string; batch: number; time: string; sid?: number };

export const timeNow = () => {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":");
};

/**
 * Deterministic stream pacing (no Math.random in render).
 * Echoes print fast, status lines mid-tempo, results linger.
 */
export function delayForLine(text: string, batch: number, queueLen: number) {
  const marker = text.charAt(0);
  const base = marker === ">" || marker === "❯" ? 60 : marker === "✓" || marker === "!" ? 220 : 140;
  return base + ((batch + queueLen) % 4) * 30;
}

/** Marker-derived color — never stored per line. */
export function lineColor(text: string) {
  const marker = text.charAt(0);
  if (marker === "✓") return "text-[#8fce7e]";
  if (marker === ">" || marker === "❯" || marker === "●") return "text-[#f3b44a]";
  if (marker === "!") return "text-[#e8a33d]";
  if (marker === "·") return "text-[#8b8577]";
  if (marker === "»") return "text-[#d8d2c2]";
  return "text-[#d8d2c2]";
}

export type TagItem = { label: string; count: number; unit: string };
export type TagGroup = { heading: string; items: TagItem[]; closer: string };

/** Grouped `tags` run: heading, ↳ rows with counts, ✓ closer. */
export function formatTagGroup(g: TagGroup): string[] {
  return [
    `· ${g.heading}`,
    ...g.items.map(
      (item) => `↳ ${item.label} ${item.count} ${item.count === 1 ? item.unit.replace(/s$/, "") : item.unit}`
    ),
    `✓ ${g.closer}`,
  ];
}

/** Slash-command menu — `/` lists everything, `/<frag>` filters. */
export const SLASH_CMDS = [
  { name: "ask", hint: "/ask <question> — chat with the AI" },
  { name: "models", hint: "/models — list + pick AI models" },
  { name: "open", hint: "/open <name> — put it on the canvas" },
  { name: "list", hint: "/list — every entry in the index" },
  { name: "tags", hint: "/tags — grouped run for this board" },
  { name: "retry", hint: "/retry — re-run last question, next model" },
  { name: "save", hint: "/save <name> — keep this thread" },
  { name: "load", hint: "/load <name> — resume a thread" },
  { name: "threads", hint: "/threads — saved threads" },
  { name: "export", hint: "/export — copy the log as markdown" },
  { name: "context", hint: "/context — model, turns, budget" },
  { name: "quota", hint: "/quota — rpm budget readout" },
  { name: "next", hint: "/next — the one after this" },
  { name: "help", hint: "/help — every command" },
  { name: "clear", hint: "/clear — wipe the log" },
];

export function slashOptionLines(frag: string): string[] {
  const hits = SLASH_CMDS.filter((s) => s.name.startsWith(frag));
  const shown = hits.length > 0 ? hits : SLASH_CMDS;
  return ["· slash options —", ...shown.map((s) => `· ${s.hint}`)];
}

/** Live menu matches for the `/` popup. */
export function slashMatches(frag: string) {
  return SLASH_CMDS.filter((s) => s.name.startsWith(frag.toLowerCase()));
}
