import type { CaseStat } from "../data/caseStudies";

/**
 * Outcome stats — Figma 287:2442, the three-column band from the case study
 * reference design. Three even columns of a large value over an uppercase
 * label, divided by vertical hairlines.
 *
 * `value` is free text, not a number: projects use both metrics ("10+",
 * "~70") and words where the metric is a count of surfaces. `tabular-nums` is
 * therefore the only numeric assumption made, and it costs nothing when the
 * value is alphabetical.
 *
 * Accent colour comes from the per-project `--outcome` token rather than a
 * hard-coded green, because projects resolve to different tones — green for
 * Lighthouse, indigo for Prooval, matching each brand's primary.
 */
export default function CaseStats({
  stats,
  inView,
}: {
  stats: CaseStat[];
  inView: boolean;
}) {
  if (stats.length === 0) return null;

  return (
    <dl
      className={`sv-rv mt-[42px] grid grid-cols-1 gap-y-[32px] sm:grid-cols-2 sm:gap-x-[24px] md:grid-cols-3 ${
        inView ? "is-in" : ""
      }`}
    >
      {stats.map((stat, i) => (
        <div
          key={`${stat.label}-${i}`}
          className="sm:border-l sm:border-line-strong sm:pl-[24px] sm:first:border-l-0 sm:first:pl-0"
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block font-sans text-[38px] font-medium leading-[1] tracking-[-1.52px] text-outcome tabular-nums md:text-[47px]">
              {stat.value}
            </span>
            <span className="mt-[14px] block font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-muted">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
