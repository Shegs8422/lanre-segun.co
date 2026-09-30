import type { CaseStat } from "../data/caseStudies";

/**
 * Outcome stats — Figma 287:2442 (MindPath) and 289:4041 (Otee).
 * Three even columns of a large value over an uppercase mono label, divided by
 * vertical hairlines. The value may be a metric ("10+") or a word ("Apps") —
 * Otee uses the latter — so `tabular-nums` is the only numeric assumption made.
 * Accent colour comes from the per-project `--outcome` token, not a hard-coded
 * green, because the two case studies resolve to green and indigo respectively.
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
