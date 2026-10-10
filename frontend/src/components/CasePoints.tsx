import type { CasePoint } from "../data/caseStudies";

/**
 * Labelled sub-points — a chapter's list of named problems, each a short
 * label over its detail. Sits inside the chapter's body column at the same
 * 594px measure as the prose above it, divided by hairlines so the labels
 * read as a set rather than as more paragraphs.
 *
 * Kept separate from `body` because these are scannable pairs, not prose:
 * collapsing them into one string per item loses the label/detail rhythm
 * that makes the list skimmable.
 */
export default function CasePoints({
  points,
  inView,
}: {
  points: CasePoint[];
  inView: boolean;
}) {
  return (
    <dl
      className={`sv-rv mt-[30px] max-w-[594px] border-t border-line-strong ${
        inView ? "is-in" : ""
      }`}
    >
      {points.map((point) => (
        <div
          key={point.label}
          className="grid gap-y-[6px] border-b border-line-strong py-[18px] md:grid-cols-[190px_1fr] md:gap-x-[24px]"
        >
          <dt className="font-sans text-[15px] font-medium leading-[24px] text-ink">
            {point.label}
          </dt>
          <dd className="font-sans text-[15px] leading-[24px] text-muted">{point.text}</dd>
        </div>
      ))}
    </dl>
  );
}