import { useStagger } from "../hooks/useReveal";
import { useSanityCollection } from "../hooks/useSanity";
import { QUERIES } from "../lib/sanity";
import { TOOLS } from "../data/tools";

type Variant = "welcome" | "ai";

type Segment = { text: string; accent?: boolean };

const COPY: Record<Variant, { lines: Segment[]; sub: string }> = {
  welcome: {
    lines: [
      { text: "AI is part of how" },
      { text: "I design & build,", accent: true },
      { text: "every day." },
    ],
    sub: "Not a novelty — a daily practice. These are the tools I reach for to move from a rough idea to a shipped, working product.",
  },
  ai: {
    lines: [{ text: "The stack," }, { text: "and what each is for.", accent: true }],
    sub: "Reached for daily. Short on purpose — a tool used once a quarter is a tool you are bad at.",
  },
};

/**
 * AI Tools — heading, practice paragraph, ten tiles (Meta intentionally
 * empty, per Figma). Tiles cascade in once on scroll into view.
 * Variant prop switches copy between Welcome and AI pages.
 */
export default function Tools({ variant = "welcome" }: { variant?: Variant }) {
  const tools = useSanityCollection(QUERIES.tools, TOOLS);
  const { ref, shown, inView } = useStagger(tools.length, 0, 70);
  const copy = COPY[variant];

  return (
    <section ref={ref} aria-label="AI tools" className="relative bg-bg">
      <div aria-hidden className="h-px bg-line-strong" />
      <span className="absolute left-0 top-[1px] bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        AI TOOLS
      </span>

      <div className="px-[24px] pb-20 pt-16 md:px-[68px] md:pb-[100px] md:pt-[110px]">
        <h2
          className={`sv-lines max-w-[673px] font-sans text-[32px] font-medium leading-[1.08] tracking-[-0.8px] text-ink md:text-[47px] ${
            inView ? "is-in" : ""
          }`}
        >
          {copy.lines.map((line) => (
            <span key={line.text} className="sv-ln">
              <span className={line.accent ? "text-faint" : undefined}>{line.text}</span>
            </span>
          ))}
        </h2>
        <p
          className={`sv-rv mt-3 max-w-[566px] font-sans text-[15px] leading-[24px] text-muted md:text-[17px] md:leading-[28px] ${
            inView ? "is-in" : ""
          }`}
          style={{ transitionDelay: "0.12s" }}
        >
          {copy.sub}
        </p>

        <ul className="mt-12 grid grid-cols-5 gap-x-[8px] gap-y-8 md:mt-[60px] md:grid-cols-10 md:gap-x-[14px]">
          {tools.map((t, i) => (
            <li
              key={t.name}
              className={i < shown ? "board-in-text is-in" : ""}
              style={i < shown ? { animationDelay: `${i * 70}ms` } : undefined}
            >
              {/* Paper tile: fixed light in both themes so third-party
                  logos (Vercel, GitHub…) stay readable in dark mode. */}
              <div className="flex aspect-square w-full items-center justify-center border border-[rgba(22,20,14,0.12)] bg-[#f4edd9] transition-colors duration-200 hover:border-accent-deep">
                {t.src ? (
                  <img src={t.src} alt={`${t.name} logo`} width={69} height={69} loading="lazy" className="h-[55%] w-[55%] object-contain" />
                ) : (
                  <span aria-hidden className="h-[55%] w-[55%]" />
                )}
              </div>
              <p className="mt-2 text-center font-sans text-[10px] uppercase tracking-[1px] text-muted md:text-[10.5px]">
                {t.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
