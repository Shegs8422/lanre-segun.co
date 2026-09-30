import { useReveal } from "../hooks/useReveal";

const NAMES = ["Santander UK", "Hoopit AI", "FourTwoThree", "Toyota", "DHFPG"];

/**
 * Non-disclosure — centered note plus an infinite client-name marquee
 * with orange separators. Note fades via .sv-rv; marquee stays CSS-only.
 */
export default function WorkNda() {
  const { ref, inView } = useReveal<HTMLElement>(0.3);

  return (
    <section ref={ref} aria-label="Non-disclosure" className="relative">
      <div aria-hidden className="h-px bg-line-strong" />
      <span className="absolute left-0 top-[1px] bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        NON-DISCLOSURE
      </span>
      <div className="px-[24px] pb-14 pt-16 text-center md:px-[68px] md:pt-[126px]">
        <p
          className={`sv-rv mx-auto max-w-[396px] font-sans text-[15px] leading-[26px] text-muted ${
            inView ? "is-in" : ""
          }`}
        >
          Plus many other projects I can&apos;t publicly share, but they&apos;re some of my favorite work.
        </p>
      </div>
      <div className="overflow-hidden pb-16 md:pb-[126px]" role="presentation">
        <div className="rail-scroll flex w-[200%] will-change-transform" style={{ animationDuration: "30s" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex w-1/2 shrink-0 items-center justify-around" aria-hidden={copy === 1}>
              {NAMES.map((n) => (
                <span key={`${copy}-${n}`} className="flex shrink-0 items-center">
                  <span className="font-sans text-[18px] text-muted md:text-[20px]">{n}</span>
                  <span aria-hidden className="mx-8 size-[5px] shrink-0 bg-accent md:mx-[38px]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
