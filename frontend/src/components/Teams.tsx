import { useReveal } from "../hooks/useReveal";
import { useSanityCollection } from "../hooks/useSanity";
import { QUERIES } from "../lib/sanity";
import { JOBS } from "../data/work";

/**
 * Where I've worked — hairline grid of ten entries, cascading in once
 * on scroll into view. Heading uses grouped paragraph reveal
 * (.sv-lines + .sv-rv); cards cascade via animationDelay.
 */
export default function Teams() {
  const { ref, inView } = useReveal<HTMLElement>(0.15);
  const jobs = useSanityCollection(QUERIES.jobs, JOBS);

  return (
    <section ref={ref} aria-label="Where I've worked" className="relative bg-bg">
      <div aria-hidden className="h-px bg-line-strong" />
      <span className="absolute left-0 top-[1px] bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        TEAMS
      </span>

      <div className="px-[24px] pb-20 pt-16 md:px-[68px] md:pb-[100px] md:pt-[96px]">
        <h2
          className={`sv-lines max-w-[673px] font-sans text-[32px] font-medium leading-[1.08] tracking-[-0.8px] text-ink md:text-[47px] ${
            inView ? "is-in" : ""
          }`}
        >
          <span className="sv-ln">
            <span>
              Where I&apos;ve <span className="text-faint">worked</span>
            </span>
          </span>
        </h2>
        <p
          className={`sv-rv mt-3 max-w-[566px] font-sans text-[15px] leading-[24px] text-muted md:text-[17px] md:leading-[28px] ${
            inView ? "is-in" : ""
          }`}
          style={{ transitionDelay: "0.12s" }}
        >
          From global banks to independent apps — product, brand and systems for teams of every size.
        </p>

        <div className="-mx-[24px] mt-12 grid grid-cols-1 gap-px border-y border-ink/[0.14] bg-ink/[0.14] md:-mx-[68px] md:mt-[57px] md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j, i) => (
            <article
              key={`${j.team}-${i}`}
              className={`bg-bg p-5 transition-colors duration-200 hover:bg-bg-sunk md:p-6 ${inView ? "board-in-text" : "opacity-0"}`}
              style={inView ? { animationDelay: `${i * 70}ms` } : undefined}
            >
              <p className={`font-mono text-[10px] tracking-[1.68px] ${i === 0 ? "text-accent-deep" : "text-faint"}`}>
                A{i + 1}
              </p>
              <h3 className="mt-3 font-sans text-[18px] font-medium tracking-[-0.2px] text-ink">
                {j.team}
              </h3>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[1px] text-faint">{j.role}</p>
              <p className="mt-3 font-sans text-[14px] leading-[21px] text-muted">{j.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
