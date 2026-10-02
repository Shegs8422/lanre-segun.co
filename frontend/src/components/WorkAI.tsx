import { useState } from "react";
import { Link } from "react-router";
import { useReveal } from "../hooks/useReveal";

const PROJECTS = [
  {
    num: "01",
    title: "Sena",
    desc: "Building a design system completely with AI and turning it into a production-ready ReactJS component library and documentation hub.",
    label: "FIG. 001 — Sena · Active",
  },
  {
    num: "02",
    title: "AI Realtime Renamer",
    desc: "A Figma plugin that renames layers in real-time using AI, keeping your design files organized as you work.",
    label: "FIG. 002 — AI Realtime Renamer · Active",
  },
  {
    num: "03",
    title: "AI Journey",
    desc: "An AI-powered journey planner that creates personalized itineraries based on your preferences and budget.",
    label: "FIG. 003 — AI Journey · Active",
  },
];

/**
 * Preview artwork for the panel on the right. Undefined until real assets are
 * supplied — the dashed frame below stands in its place so the panel keeps its
 * height instead of collapsing.
 */
const PREVIEW_ARTWORK: string | undefined = undefined;

/**
 * Working with AI — Figma node 237:467.
 * "Here's what I built with AI." heading + interactive project list
 * with preview panel. Clicking a row expands it and updates the preview.
 *
 * The preview artwork was previously a hardcoded `http://localhost:3845/...`
 * URL — Sanity Studio's dev server. On the HTTPS production domain Chrome
 * blocked it as mixed content and it 500'd, so no preview ever rendered.
 * Artwork has not been supplied yet, so it now falls back to the same
 * aspect-locked dashed frame used by CaseFigure. Set PREVIEW_ARTWORK to a
 * deployed CDN URL (or a file in src/assets) to restore it.
 */
export default function WorkAI() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];
  const { ref, inView } = useReveal<HTMLElement>(0.2);

  return (
    <section ref={ref} aria-label="Working with AI" className="relative">
      {/* Frame rule (contained) + corner mark — separates from Screenshots */}
      <div aria-hidden className="h-px bg-line-strong" />
      <span
        aria-hidden
        className="absolute right-0 top-[1px] h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/2px_20px_no-repeat]"
      />

      {/* WORKING WITH AI tab — same single-span badge as every section */}
      <span className="absolute left-0 top-[1px] bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        Working with AI
      </span>

      <div className="px-[24px] pb-[96px] pt-[126px] md:px-[68px] md:pb-[126px]">
        {/* Heading — grouped paragraph reveal */}
        <h2
          className={`sv-lines max-w-[673px] font-sans text-[clamp(32px,4.5vw,47px)] font-medium leading-[1.1] tracking-[-1.41px] text-ink ${
            inView ? "is-in" : ""
          }`}
        >
          <span className="sv-ln">
            <span>
              Here&apos;s what I built with <span className="text-faint">AI.</span>
            </span>
          </span>
        </h2>
        <p
          className={`sv-rv mt-3 font-sans text-[18px] leading-[27.9px] text-muted ${
            inView ? "is-in" : ""
          }`}
          style={{ transitionDelay: "0.12s" }}
        >
          A running log of the agents, workflows and tools behind each build.
        </p>

        {/* Content area */}
        <div className="mt-[63px] grid gap-8 lg:grid-cols-[634px_1fr]">
          {/* Left: project list */}
          <div>
            {PROJECTS.map((p, i) => (
              <button
                key={p.num}
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={i === active}
                className={`block w-full border-b border-ink/[0.08] py-[26px] pl-[18px] pr-[22px] text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent-deep ${
                  i === active ? "border-t border-accent" : ""
                }`}
              >
                <div className="flex gap-x-[20px]">
                  <span
                    className={`pt-[7px] font-sans text-[10.5px] tracking-[1.47px] ${
                      i === active ? "text-accent-deep" : "text-faint"
                    }`}
                  >
                    {p.num}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`font-sans text-[21px] font-medium leading-[32.55px] tracking-[-0.42px] ${
                        i === active ? "text-ink" : "text-faint"
                      }`}
                    >
                      {p.title}
                    </p>
                    {i === active && (
                      <div className="pt-[12px]">
                        <p className="max-w-[402px] font-sans text-[15px] leading-[23.25px] text-muted">
                          {p.desc}
                        </p>
                        <Link
                          to={`/work/${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-[14px] inline-flex items-center gap-2 font-sans text-[10.5px] font-medium uppercase tracking-[1.365px] text-accent-deep transition hover:text-ink"
                        >
                          Read the report
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                            <path
                              d="M3 11L11 3M11 3H4M11 3V10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {/* CTA */}
            <div className="pt-[37.8px]">
              <Link
                to="/contact"
                className="lift inline-flex items-center gap-[12px] px-[22px] py-[13px] font-sans text-[15px] font-medium text-ink shadow-[inset_0_0_0_1px_var(--line)] transition hover:bg-ink/[0.04] focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
              >
                Let's build with AI
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
                  <path
                    d="M4 13L13 4M13 4H5M13 4V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: preview */}
          <div className="relative hidden border border-line bg-[#efe9d2] lg:block">
            {PREVIEW_ARTWORK ? (
              <img
                src={PREVIEW_ARTWORK}
                alt={project.label}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={`${project.label} — preview artwork pending`}
                className="absolute inset-0 flex items-center justify-center border border-dashed border-ink/20 p-[24px] text-center"
              >
                <span className="max-w-[30ch] font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint">
                  Preview pending
                </span>
              </div>
            )}
            <p className="absolute left-[16px] top-[14px] font-sans text-[10.5px] uppercase tracking-[1.68px] text-[#fbf7e6]">
              {project.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
