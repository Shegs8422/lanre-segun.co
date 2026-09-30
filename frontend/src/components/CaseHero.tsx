import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useHeaderReveal } from "../hooks/useReveal";
import type { CaseMeta } from "../data/caseStudies";

/**
 * Case study hero — Figma 287:2132.
 * `← All work` → H1 → deck (max 728px) → a four-cell meta grid drawn as one
 * bordered table (outer rule + per-cell rules) rather than four cards.
 * A meta cell with an `href` renders as an external link with the ↗ glyph,
 * matching the "Live" cell in the design.
 * Above the fold, so reveal is mount-based (useHeaderReveal), not scroll-based.
 */
function MetaCell({ item }: { item: CaseMeta }) {
  return (
    <div className="border-b border-r border-line-strong px-[22px] py-[20px]">
      <p className="font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint">
        {item.label}
      </p>
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-[7px] inline-flex items-center gap-[6px] font-sans text-[17px] font-normal leading-[1.3] text-ink underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-accent-deep hover:decoration-accent md:text-[19px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep"
        >
          {item.value}
          <ArrowUpRight
            aria-hidden
            className="size-[15px] shrink-0 transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
          />
        </a>
      ) : (
        <p className="mt-[7px] font-sans text-[17px] leading-[1.3] text-ink md:text-[19px]">
          {item.value}
        </p>
      )}
    </div>
  );
}

export default function CaseHero({
  title,
  description,
  meta,
}: {
  title: string;
  description: string;
  meta?: CaseMeta[];
}) {
  const { ref, inView } = useHeaderReveal<HTMLElement>();

  return (
    <section ref={ref} aria-label="Case study" className="px-[24px] pt-[42px] md:px-[68px] md:pt-[104px]">
      <Link
        to="/work"
        className={`sv-rv inline-flex items-center gap-[8px] font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-ink transition-colors hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep ${
          inView ? "is-in" : ""
        }`}
      >
        <ArrowLeft aria-hidden className="size-[13px] transition-transform duration-300 ease-[var(--ease)]" />
        All work
      </Link>

      <h1
        className={`sv-lines mt-[26px] font-sans text-[length:var(--fs-h1)] font-medium leading-[1.05] tracking-[-1.92px] text-ink ${
          inView ? "is-in" : ""
        }`}
      >
        <span className="sv-ln">
          <span>{title}</span>
        </span>
      </h1>

      <p
        className={`sv-rv mt-[14px] max-w-[728px] font-sans text-[length:var(--fs-md)] leading-[24px] text-muted ${
          inView ? "is-in" : ""
        }`}
        style={{ transitionDelay: "0.1s" }}
      >
        {description}
      </p>

      {meta && meta.length > 0 && (
        <div
          className={`sv-rv mt-[52px] grid grid-cols-1 border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-4 ${
            inView ? "is-in" : ""
          }`}
          style={{ transitionDelay: "0.18s" }}
        >
          {meta.map((item) => (
            <MetaCell key={item.label} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
