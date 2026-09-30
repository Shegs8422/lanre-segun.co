import { slashMatches } from "../data/terminal";

/**
 * Live slash-option popup — appears the moment the prompt starts with `/`,
 * filters as you type. ↑/↓ moves, Tab or click fills, Enter still runs.
 */
export default function SlashMenu({
  frag,
  active,
  onPick,
}: {
  frag: string;
  active: number;
  onPick: (name: string) => void;
}) {
  const hits = slashMatches(frag);
  if (hits.length === 0) return null;
  return (
    <div
      role="listbox"
      aria-label="Slash command options"
      className="absolute inset-x-0 bottom-full z-10 mb-1 max-h-[240px] overflow-y-auto border border-white/15 bg-[#201c14] py-1 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
    >
      {hits.map((h, i) => (
        <button
          key={h.name}
          type="button"
          role="option"
          aria-selected={i === active}
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(h.name);
          }}
          className={`flex w-full items-baseline gap-2 px-3 py-1.5 text-left font-mono text-[12px] transition-colors ${
            i === active ? "bg-bg/10" : ""
          }`}
        >
          <span className="shrink-0 text-accent">/{h.name}</span>
          <span className="truncate text-faint">{h.hint.slice(h.name.length + 1).replace(/^ — /, "")}</span>
        </button>
      ))}
    </div>
  );
}
