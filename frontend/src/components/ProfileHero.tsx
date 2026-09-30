import { Fragment, useEffect, useRef } from "react";
import WorkspaceArt from "./WorkspaceArt";

const LEAD_A = "Over the last decade, I’ve worked across startups";
const LEAD_B =
  "and global companies, designing everything from websites to large-scale digital products. Along the way, I’ve built brands, design systems, and AI workflows that help teams move faster and";
const TAIL = "deliver better experiences to millions of users.";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Profile hero — Figma 248:2 (About), reference hero motion
 * (`section#top` 280vh track, `.sv-ab-hero-pin` sticky, rAF driver).
 * One shared viewport: statement docked top, workspace strip docked bottom.
 * Scroll progress drives: word rewind + ignite → text fade/slide →
 * desk zoom into its center. GPU-only (transform/opacity).
 */
export default function ProfileHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pin = section.querySelector<HTMLElement>(".sv-ab-hero-pin");
    const inner = section.querySelector<HTMLElement>(".sv-ab-hero-inner");
    const art = section.querySelector<HTMLElement>(".sv-desk-view svg");
    const words = Array.from(section.querySelectorAll<HTMLElement>(".pf-word"));
    if (!pin || !inner || !art || words.length === 0) return;

    const n = words.length;
    // First visual line leads: measured at runtime so wrapping stays correct.
    const firstCount = { current: 0 };
    const measureFirstLine = () => {
      const top = words[0]?.offsetTop ?? 0;
      let k = 0;
      while (k < n && words[k] && Math.abs((words[k]?.offsetTop ?? 0) - top) <= 2) k++;
      firstCount.current = Math.max(1, k);
    };
    measureFirstLine();
    let raf = 0;
    let ticking = false;

    const render = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp01(-rect.top / total) : 0;

      // Act 1 — first line loads black, the rest gray; scroll ignites
      // from the first line to the end, in reading order.
      const k = firstCount.current;
      const span = Math.max(1, n - k);
      for (let i = 0; i < n; i++) {
        const w = words[i];
        if (!w) continue;
        if (i < k) {
          w.style.opacity = "1";
          continue;
        }
        const start = 0.06 + (0.39 * (i - k)) / span;
        const local = clamp01((p - start) / (0.39 / span + 0.06));
        w.style.opacity = (0.14 + 0.86 * local).toFixed(3);
      }

      // Act 2 — statement fades up and out (0.52 → 0.68).
      const f = clamp01((p - 0.52) / 0.16);
      inner.style.transform = `translateY(${(-60 * f).toFixed(1)}px)`;
      inner.style.opacity = (1 - f).toFixed(3);

      // Act 3 — desk pushes into its center (0.58 → 1).
      // viewBox zoom (not CSS scale) so vectors re-raster every frame:
      // standard clarity at any zoom, never a stretched bitmap.
      // Final window sized so the whole desk subject stays in frame.
      const z = clamp01((p - 0.58) / 0.42);
      const eased = z * z * (3 - 2 * z);
      const scale = 1 + 0.9 * eased;
      const vw = 1590 / scale;
      const vh = 325 / scale;
      art.setAttribute(
        "viewBox",
        `${(843 - vw / 2).toFixed(1)} ${(201 - vh / 2).toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`
      );
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(render);
      }
    };

    render();
    if (document.fonts) {
      void document.fonts.ready.then(() => {
        measureFirstLine();
        render();
      });
    }
    const onResize = () => {
      measureFirstLine();
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const renderWords = (text: string, accent: boolean) =>
    text.split(" ").map((w, i) => (
      <Fragment key={`${accent ? "a" : "b"}-${i}`}>
        {i > 0 ? " " : null}
        <span className={`pf-word ${accent ? "text-faint" : ""}`}>{w}</span>
      </Fragment>
    ));

  return (
    <section ref={sectionRef} id="top" aria-label="About — Lanre Segun" className="relative">
      <div className="sv-ab-hero-pin">
        <div className="sv-ab-hero-inner">
          <p className="lead pf-copy pf-lead">
            <span>
              {renderWords(LEAD_A, false)}
              <br />
              {renderWords(LEAD_B, false)} <span className="sv-dim pf-tail">{renderWords(TAIL, true)}</span>
            </span>
          </p>
        </div>

        <div className="sv-desk-wrap">
          <div className="sv-desk-view" role="img" aria-label="A corner of a room: a desk under a window, a laptop, somebody working at it, a sofa bed and a cat.">
            <WorkspaceArt className="sv-desk-art" />
          </div>
        </div>
      </div>
    </section>
  );
}
