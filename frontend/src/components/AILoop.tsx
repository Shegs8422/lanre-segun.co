import { useStagger } from "../hooks/useReveal";

const LOOP_ITEMS = [
  {
    num: "01",
    cat: "Automation",
    title: "Task Automation",
    desc: "Component generation, documentation, release notes, design tokens. The repetitive half of the job, off my plate.",
  },
  {
    num: "02",
    cat: "Research",
    title: "Research",
    desc: "Competitor analysis, interview synthesis, UX patterns — the groundwork, in a fraction of the usual time.",
  },
  {
    num: "03",
    cat: "Analysis",
    title: "Analysis & Decision Making",
    desc: "Breaking down requirements, mapping flows, finding edge cases and challenging assumptions before design starts.",
  },
  {
    num: "04",
    cat: "Development",
    title: "Code & Development",
    desc: "React, Tailwind, production-ready components. Shortens the gap between design and implementation.",
  },
  {
    num: "05",
    cat: "Prototyping",
    title: "Fast Prototyping",
    desc: "Interactive prototypes and lightweight MVPs instead of static mockups — validated before engineering time is spent.",
  },
  {
    num: "06",
    cat: "Testing",
    title: "Testing & Validation",
    desc: "Accessibility reviews, UX audits, visual consistency and design QA, before issues reach users.",
  },
  {
    num: "07",
    cat: "Agents",
    title: "MCPs & AI Agents",
    desc: "Figma, Claude, Cursor, GitHub and custom MCP servers in one loop, sharing context instead of working in isolation.",
  },
  {
    num: "08",
    cat: "Apps",
    title: "Building real world apps",
    desc: "It's not just vibe coding. It's systems thinking, architecture, and scalability.",
  },
];

/**
 * The Loop — Figma node 238:2320.
 * "AI as part of my everyday workflow" heading + 8-row capability table.
 * Each row: accent number, category label, title, description.
 * Hairline separators, "THE LOOP" accent tab at top-left.
 */
export default function AILoop() {
  // Single hook: `inView` drives the heading, `shown` cascades the rows.
  // Do not add a second useReveal here — its ref would be discarded.
  const { ref, shown, inView } = useStagger(LOOP_ITEMS.length, 0, 80, 0.15);

  return (
    <section ref={ref} aria-label="The loop — AI in the workflow" className="relative">
      {/* Frame rule (contained) + corner mark */}
      <div aria-hidden className="h-px bg-line-strong" />
      <span
        aria-hidden
        className="absolute right-0 top-[1px] h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/2px_20px_no-repeat]"
      />

      {/* THE LOOP tab — same single-span badge as every section */}
      <span className="absolute left-0 top-[1px] z-10 bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        The loop
      </span>

      <div className="px-[24px] pb-[96px] pt-[126px] md:px-[68px] md:pb-[126px]">
        {/* Heading — grouped paragraph: lines mask first, sub fades after */}
        <h2 className={`sv-lines max-w-[673px] font-sans text-[clamp(32px,4.5vw,47px)] font-medium leading-[1.1] tracking-[-1.41px] text-ink ${inView ? "is-in" : ""}`}>
          <span className="sv-ln">
            <span>AI as part of my</span>
          </span>
          <span className="sv-ln">
            <span className="text-faint">everyday workflow.</span>
          </span>
        </h2>
        <p
          className={`sv-rv mt-3 max-w-[566px] font-sans text-[18px] leading-[27.9px] text-muted ${inView ? "is-in" : ""}`}
          style={{ transitionDelay: "0.12s" }}
        >
          I use AI throughout the product design process to move faster, think
          deeper, and deliver better products, without replacing design thinking
          or human judgment.
        </p>

        {/* Capability table */}
        <div className="mt-[63px] border-t border-line">
          {LOOP_ITEMS.map((item, i) => (
            <div
              key={item.num}
              className={`grid grid-cols-[40px_1fr] items-baseline gap-x-[20px] gap-y-[4px] border-b border-ink/[0.08] py-[24px] transition-colors duration-200 hover:bg-bg-soft md:grid-cols-[40px_100px_220px_1fr] md:gap-x-[32px] md:gap-y-0 md:py-0 md:h-[113px] lg:grid-cols-[40px_120px_280px_1fr] lg:gap-x-[40px] ${i < shown ? "board-in-text is-in" : ""}`}
              style={i < shown ? { animationDelay: `${i * 80}ms` } : undefined}
            >
              {/* Number */}
              <span className="font-sans text-[10.5px] font-normal leading-[16.275px] tracking-[1.68px] text-accent-deep">
                {item.num}
              </span>
              {/* Category — hidden on mobile, shown as small label above title */}
              <span className="hidden font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint md:block">
                {item.cat}
              </span>
              {/* Title */}
              <span className="font-sans text-[24px] font-medium leading-[37.2px] tracking-[-0.36px] text-ink">
                {item.title}
              </span>
              {/* Description */}
              <span className="col-span-2 font-sans text-[15px] leading-[24.3px] text-muted md:col-span-1">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
