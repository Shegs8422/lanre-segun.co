import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const COPY =
  "I've led design teams and mentored juniors, solved real-world problems, and shipped complex work for global clients — Santander UK, MindPath, Hoopit AI, FourTwoThree and more.";

/**
 * Profile credo — Figma 254:4491 (About, `section#credo`).
 * Asymmetric grid (520px sticky aside + fluid main), 56px lead split
 * word-for-word by GSAP SplitText and unblurred in scroll order via a
 * scrubbed ScrollTrigger. Sub paragraph + tab per node.
 */
export default function ProfileCredo() {
  const sectionRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lead = leadRef.current;
    if (!section || !lead) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const split = new SplitText(lead, { type: "words", wordsClass: "w" });
      gsap.fromTo(
        split.words,
        { filter: "blur(3.5px)", opacity: 0.14, y: "0.2em" },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: "0em",
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: lead,
            start: "top 82%",
            end: "bottom 40%",
            scrub: 0.6,
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="credo" aria-label="Profile — credo" className="relative overflow-hidden">
      <div aria-hidden className="h-px bg-line-strong" />
      <span
        aria-hidden
        className="absolute right-0 top-[1px] h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/2px_20px_no-repeat]"
      />
      <span className="absolute left-0 top-[1px] z-10 bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        How I work
      </span>

      <div className="sv-credo-grid px-[24px] pb-[64px] pt-[64px] md:px-[68px] md:pb-[113px] md:pt-[113px]">
        <div className="grid grid-cols-1 gap-x-[120px] gap-y-[48px] lg:grid-cols-[520px_1fr]">
          <aside className="aside self-start lg:sticky lg:top-[172px]">
            <h2 className="max-w-[365px] font-sans text-[32px] font-medium leading-[47px] tracking-[-0.96px] text-ink">
              Long story short,
              <br />
              I&apos;ve been designing
              <br />
              for over 10 years
            </h2>
            <p className="mt-3 font-mono text-[10px] tracking-[1.68px] text-faint">
              2015 — NOW · PRISTINA, CET
            </p>
          </aside>

          <div className="main min-w-0">
            <p ref={leadRef} className="lead max-w-[736px] font-sans text-[36px] font-medium leading-[1.25] tracking-[-1.12px] text-ink md:text-[56px] md:leading-[75.04px]">
              {COPY}
            </p>
            <p className="mt-[38px] max-w-[487px] font-sans text-[19px] font-normal leading-[30.78px] text-muted">
              And yes — I&apos;m still deep in UX/UI and Figma every day.{" "}
              <span className="text-accent-deep">That&apos;s the fun part.</span>
            </p>
            <ul aria-label="What I do" className="mt-[47px] flex max-w-[748px] flex-wrap gap-[10px]">
              {["Lead / Product", "Design systems", "Brand", "AI workflows", "UX / UI", "Figma"].map((chip) => (
                <li key={chip}>
                  <span className="sv-chip">{chip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
