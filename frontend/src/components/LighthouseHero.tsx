import { Link } from "react-router";
import arrowUrl from "../assets/arrow.svg";
import { useHeaderReveal } from "../hooks/useReveal";
import CityWalk from "./CityWalk";

/**
 * Lighthouse hero — desktop. Figma node 195:4175.
 * Grid: 1524 container, px-68, cols 763.59 / 564.41, gap-60.
 * H1 64px/-1.92, body 19px/29.45 text-muted, buttons h-50 px-22.
 * City strip below is the interactive CityWalk (200:7169 / 200:8191).
 * Motion: mount reveal via useHeaderReveal (no scroll observer for LCP),
 * reuses .sv-lines/.sv-rv tokens from index.css.
 */
export default function LighthouseHero() {
  const { ref, inView } = useHeaderReveal<HTMLElement>();

  return (
    <section ref={ref} aria-label="Segun — Design Engineer">
      {/* Top offset: node pt-182 minus 67px nav = 115px */}
      <div className="px-[24px] pt-[64px] md:px-[68px] md:pt-[115px]">
        <div className="grid grid-cols-1 gap-x-[60px] gap-y-[40px] min-[1524px]:grid-cols-[763.59px_564.41px]">
          <h1
            className={`sv-lines font-sans text-[length:var(--fs-h1)] font-medium not-italic leading-[1.04] tracking-[-1.2px] text-ink md:tracking-[-1.92px] min-[1524px]:whitespace-nowrap ${
              inView ? "is-in" : ""
            }`}
          >
            <span className="sv-ln">
              <span>I design apps, websites,</span>
            </span>
            <span className="sv-ln">
              <span>
                and <span className="text-faint">AI-powered systems</span>
              </span>
            </span>
          </h1>

          <div
            className={`sv-rv max-w-[435.33px] pt-0 md:pt-[18px] lg:justify-self-end ${
              inView ? "is-in" : ""
            }`}
            style={{ transitionDelay: "0.12s" }}
          >
            <p className="font-sans text-[19px] font-normal leading-[29.45px] text-muted">
              8 years designing the systems, brands and AI workflows behind
              products people actually use — across Web3, fintech and SaaS.
            </p>
            <div className="flex flex-wrap items-start gap-[12px] pt-[32px]">
              <Link
                to="/work"
                className="lift flex h-[50px] items-center gap-[12px] bg-accent px-[22px] py-[13px] font-sans text-[15px] font-medium leading-[23.25px] text-accent-ink transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
              >
                View selected work
                <img src={arrowUrl} alt="" width={17} height={17} className="block size-[17px]" />
              </Link>
              <Link
                to="/profile"
                className="lift flex h-[50px] items-center gap-[12px] px-[22px] py-[13px] font-sans text-[15px] font-medium leading-[23.25px] text-ink shadow-[inset_0_0_0_1px_var(--line)] transition hover:bg-ink/[0.04] focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
              >
                About me
                <img src={arrowUrl} alt="" width={17} height={17} className="block size-[17px]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Project strip + city walk */}
        <div className="pt-[40px] md:pt-[61.425px]">
          <CityWalk />
        </div>
      </div>
    </section>
  );
}
