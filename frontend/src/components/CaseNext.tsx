import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import arrowUrl from "../assets/arrow.svg";
import type { CaseNext as CaseNextData } from "../data/caseStudies";

/**
 * Next case study — Figma 287:2475.
 * A single hairline-bordered link panel: kicker, oversized next title with a
 * trailing arrow, the one-line description, and the "Explore project" CTA on
 * the left with the preview image on the right. The whole panel is the link,
 * so the CTA arrow is decorative and the accessible name comes from the title.
 */
export default function CaseNext({ next }: { next?: CaseNextData }) {
  const { ref, inView } = useReveal<HTMLElement>(0.15);
  if (!next) return null;

  return (
    <section ref={ref} aria-label="Next case study" className="pt-[56px] md:pt-[120px]">
      <Link
        to={`/work/${next.slug}`}
        className={`lift group grid grid-cols-1 gap-[32px] border border-line-strong p-[45px] transition-colors duration-200 hover:border-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep md:grid-cols-[1fr_502px] md:items-center md:gap-[84px] ${
          inView ? "sv-rv is-in" : "sv-rv"
        }`}
      >
        <div>
          <p className="font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint">
            Next case study
          </p>
          <h2 className="mt-[16px] flex items-center gap-[22px] font-sans text-[clamp(40px,5vw,72px)] font-medium leading-[1.05] tracking-[-1.92px] text-ink">
            {next.title}
            <ArrowRight
              aria-hidden
              className="size-[37px] shrink-0 text-accent-deep transition-transform duration-[400ms] ease-[var(--ease)] group-hover:translate-x-[10px]"
            />
          </h2>
          <p className="mt-[22px] max-w-[420px] font-sans text-[17px] leading-[24px] text-muted">
            {next.description}
          </p>
          <span className="sv-tlink mt-[36px]">
            Explore project
            <img
              src={arrowUrl}
              alt=""
              width={17}
              height={17}
              aria-hidden
              className="sv-ar block size-[17px]"
            />
          </span>
        </div>

        {next.cover ? (
          <img
            src={next.cover}
            alt=""
            width={502}
            height={314}
            loading="lazy"
            decoding="async"
            // Aspect-locked to the design's 502x314 so the panel height is
            // stable before the image loads, and so wider source art crops
            // rather than stretching the panel.
            className="block aspect-[502/314] w-full border border-line-strong object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex aspect-[502/314] w-full items-center justify-center border border-dashed border-ink/25 bg-bg-soft"
          />
        )}
      </Link>
    </section>
  );
}
