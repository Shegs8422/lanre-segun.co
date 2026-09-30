import { useReveal } from "../hooks/useReveal";
import CaseFigure from "./CaseFigure";
import CaseQuote from "./CaseQuote";
import CaseStats from "./CaseStats";
import type { CaseSection as CaseSectionData } from "../data/caseStudies";

/**
 * Chapter — Figma 287:2416 … 287:2441.
 * One repeatable two-column band: kicker + heading pinned left at 490px,
 * body paragraphs right at 705px with a 84px gutter, wrapping at 594px to
 * match the reference. Every figure, stat band, quote and summary that
 * follows belongs to the chapter above it, so a section renders as a single
 * vertical flow rather than the page being split into unrelated components.
 *
 * Reveal is per-section (IntersectionObserver) so chapters animate in as
 * they scroll; the hero above uses mount reveal because it is above the fold.
 */
export default function CaseSection({ section }: { section: CaseSectionData }) {
  const { ref, inView } = useReveal<HTMLElement>(0.08);

  return (
    <section ref={ref} aria-label={section.heading} className="pt-[56px] md:pt-[120px]">
      <div className="grid grid-cols-1 gap-y-[24px] md:grid-cols-[490px_1fr] md:gap-x-[84px]">
        <div>
          <p
            className={`sv-rv font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint ${
              inView ? "is-in" : ""
            }`}
          >
            {section.kicker}
          </p>
          <h2
            className={`sv-lines mt-[10px] max-w-[442px] font-sans text-[length:var(--fs-h2)] font-medium leading-[1.05] tracking-[-0.8px] text-ink ${
              inView ? "is-in" : ""
            }`}
          >
            <span className="sv-ln">
              <span>{section.heading}</span>
            </span>
          </h2>
        </div>

        <div className="max-w-[705px] md:max-w-none">
          {section.body.map((paragraph, i) => (
            <p
              key={i}
              className={`sv-rv max-w-[594px] font-sans text-[15px] leading-[24px] text-muted ${
                i > 0 ? "mt-[24px]" : ""
              } ${inView ? "is-in" : ""}`}
              style={{ transitionDelay: `${0.08 + i * 0.06}s` }}
            >
              {paragraph}
            </p>
          ))}

          {section.chips && section.chips.length > 0 && (
            <ul
              className={`sv-rv mt-[26px] flex flex-wrap gap-[6px] ${inView ? "is-in" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              {section.chips.map((chip) => (
                <li
                  key={chip}
                  className="border border-line-strong px-[13px] py-[8px] font-sans text-[13px] leading-none text-muted"
                >
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {section.figures?.map((figure, i) => (
        <CaseFigure key={`${section.kicker}-fig-${i}`} figure={figure} inView={inView} />
      ))}

      {section.stats && section.stats.length > 0 && (
        <CaseStats stats={section.stats} inView={inView} />
      )}

      {section.quote && <CaseQuote quote={section.quote} inView={inView} />}
    </section>
  );
}
