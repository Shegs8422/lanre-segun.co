import { CornerDownRight } from "lucide-react";
import type { CaseShipped as CaseShippedData } from "../data/caseStudies";

/**
 * What shipped — Figma 287:2444.
 * Small uppercase heading over full-width rows divided by hairlines, each
 * led by the ↳ glyph. Reads as a closing summary, so it sits flush against the
 * section's bottom edge rather than getting the chapter's top spacing.
 */
export default function CaseShipped({
  shipped,
  inView,
}: {
  shipped: CaseShippedData;
  inView: boolean;
}) {
  return (
    <div className={`sv-rv mt-[42px] ${inView ? "is-in" : ""}`}>
      <h3 className="font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint">
        {shipped.heading}
      </h3>
      <ul className="mt-[26px] border-t border-line-strong">
        {shipped.items.map((item) => (
          <li
            key={item}
            className="flex items-baseline gap-[16px] border-b border-line-strong py-[16px] font-sans text-[17px] leading-[1.5] text-ink md:text-[19px]"
          >
            <CornerDownRight
              aria-hidden
              className="size-[15px] shrink-0 translate-y-[3px] text-outcome"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
