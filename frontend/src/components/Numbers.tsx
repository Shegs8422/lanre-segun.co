import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useReveal } from "../hooks/useReveal";

const BARS = [
  { big: "8", pct: 23, label: "Years designing", hot: true },
  { big: "15", pct: 43, label: "Global clients", hot: false },
  { big: "35+", pct: 100, label: "Mobile and Web Shipped", hot: false },
  { big: "10", pct: 29, label: "Industries", hot: false },
];

// Scroll shares proportional to bar values (15 / 35 / 10).
const WEIGHTS = [15, 35, 10];
const WTOTAL = WEIGHTS[0] + WEIGHTS[1] + WEIGHTS[2];

/**
 * By the numbers — reference pin structure. A 265vh track holds a sticky
 * chart stage; headline lines unmask on entry, and the amber lit climbs
 * bar to bar with pin travel (first bar pre-filled on focus).
 */
export default function Numbers() {
  const { ref, inView } = useReveal<HTMLElement>(0.25);
  const trackRef = useRef<HTMLDivElement>(null);
  const litRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll-driven amber across pin travel.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (litRefs.current[0]) litRefs.current[0].style.height = "100%";
      return;
    }
    let raf = 0;
    let queued = false;
    const update = () => {
      queued = false;
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = Math.max(1, r.height - vh);
      const raw = (0 - r.top) / travel;
      const q = Math.min(1, Math.max(0, raw));
      litRefs.current.forEach((el, i) => {
        if (!el) return;
        let local: number;
        if (i === 0) {
          local = raw > 0 ? 1 : 0;
        } else {
          const start = WEIGHTS.slice(0, i - 1).reduce((a, w) => a + w, 0) / WTOTAL;
          const span = WEIGHTS[i - 1] / WTOTAL;
          local = Math.min(1, Math.max(0, (q - start) / span));
        }
        el.style.height = `${(local * 100).toFixed(1)}%`;
      });
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} aria-label="By the numbers" className="sv-chart-sec">
      {/* Frame rule — contained, meets the shell frame; never crosses it */}
      <div aria-hidden className="h-px bg-line-strong" />
      <div ref={trackRef} className="sv-chart-track" style={{ height: "265vh" }}>
        <div className="sv-chart-pin sv-ruled">
          <i className="sv-pin-mark" data-badge="By the numbers" aria-hidden="true" />
          <div className="sv-wrap mx-auto w-full max-w-[1388px] px-[24px] md:px-[48px]" style={{ width: "100%" }}>
            <div className="sv-chart-head">
              <h2 className={`sv-lines font-sans text-[40px] font-medium leading-[1.05] tracking-[-0.8px] text-ink md:text-[47px] ${inView ? "is-in" : ""}`}>
                <span className="sv-ln">
                  <span>Eight years,</span>
                </span>
                <span className="sv-ln">
                  <span className="text-faint">by the numbers.</span>
                </span>
              </h2>
              <div className={`sv-rv flex w-full max-w-[52ch] flex-col items-center gap-[18px] ${inView ? "is-in" : ""}`}>
                <p className="font-sans font-normal text-[17px] leading-[27px] text-muted md:text-[18px] md:leading-[28px]">
                  Products shipped, teams joined, systems maintained — the decade counted rather than described.
                </p>
                <Link to="/profile" className="sv-tlink">
                  Read the full profile
                  <svg className="sv-ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5.5 18.5 L18.5 5.5" />
                    <path d="M9.5 5.5 H18.5 V14.5" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="mt-20 grid w-full grid-cols-2 items-end gap-x-5 gap-y-[26px] text-left md:gap-x-8 lg:grid-cols-4">
              {BARS.map((b, i) => (
                <div key={b.label} className={`sv-bar h-[118px] md:h-[132px] lg:h-[330px] ${b.hot ? "is-hot" : ""}`}>
                  <span className="big">{b.big}</span>
                  <div
                    className="fill"
                    style={{ height: `${b.pct}%`, transitionDelay: `${i * 140}ms` }}
                  >
                    <i
                      ref={(el) => {
                        litRefs.current[i] = el;
                      }}
                      className="lit"
                      style={{ height: 0 }}
                    />
                  </div>
                  <span className="lbl">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
