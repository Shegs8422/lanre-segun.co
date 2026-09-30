import { useEffect, useRef } from "react";
import { useReveal } from "../hooks/useReveal";

const LINES = [
  "Started back in 2015 as a developer,",
  "discovered UX/UI along the way,",
  "worked on apps used by millions,",
];

type StripPhoto = { width: number; label: string; src?: string; alt: string };

const PHOTOS: StripPhoto[] = [
  { width: 294, label: "PHOTO 01", alt: "Portrait" },
  { width: 199, label: "PHOTO 02", alt: "Desk setup" },
  { width: 423, label: "PHOTO 03", alt: "Laptop work" },
  { width: 199, label: "PHOTO 04", alt: "With family" },
  { width: 182, label: "PHOTO 05", alt: "Book" },
  { width: 243, label: "PHOTO 06", alt: "Portrait outdoors" },
];

/**
 * Profile story — Figma 253:4436 + strip 253:4470 (About, one section).
 * 42px/52.92 statement in masked lines (last line accent) beside a
 * bottom-aligned 436px paragraph, then the scrub-driven photo rail
 * (294/199/423/199/182/243 × 265, 10px gaps, right-to-left on scroll).
 * Frames without a `src` render labeled placeholders until photos land.
 */
export default function ProfileStory() {
  const { ref, inView } = useReveal<HTMLElement>(0.25);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    const rail = railRef.current;
    const track = trackRef.current;
    if (!section || !rail || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let ticking = false;

    const render = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const travelled = window.innerHeight - rect.top;
      const p = Math.min(1, Math.max(0, travelled / total));
      const max = Math.max(0, track.scrollWidth - rail.clientWidth);
      track.style.transform = `translateX(${(-max * p).toFixed(1)}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(render);
      }
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return (
    <section ref={ref} aria-label="Profile — how it started" className="relative overflow-hidden">
      <div aria-hidden className="h-px bg-line-strong" />
      <span
        aria-hidden
        className="absolute right-0 top-[1px] h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/2px_20px_no-repeat]"
      />
      <span className="absolute left-0 top-[1px] z-10 bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        Profile
      </span>

      <div className="px-[24px] pt-[64px] md:px-[68px] md:pt-[113px]">
        <div className="grid grid-cols-1 gap-x-[96px] gap-y-[40px] lg:grid-cols-[1fr_452px]">
          <h2
            className={`sv-lines max-w-[652px] font-sans text-[32px] font-medium leading-[1.26] tracking-[-1.26px] text-ink md:text-[42px] ${
              inView ? "is-in" : ""
            }`}
          >
            {LINES.map((line) => (
              <span key={line} className="sv-ln">
                <span>{line}</span>
              </span>
            ))}
            <span className="sv-ln">
              <span className="text-faint">and never looked back.</span>
            </span>
          </h2>

          <div
            className={`sv-rv max-w-[452px] self-start lg:self-end ${inView ? "is-in" : ""}`}
            style={{ transitionDelay: "0.12s" }}
          >
            <p className="max-w-[436px] pt-0 font-sans text-[17px] font-normal leading-[28.9px] text-muted lg:pt-[18px]">
              Across SaaS, fintech, publishing, and care-tech, I design
              products from idea to launch. I turn early ideas into shipped
              products through research, branding, design systems, UX/UI and
              now AI.
            </p>
          </div>
        </div>
      </div>

      <div ref={railRef} className="mt-12 overflow-hidden pb-[64px] md:mt-[72px] md:pb-[96px]">
        <div ref={trackRef} className="flex w-max gap-[10px] px-[24px] will-change-transform md:px-[68px]">
          {PHOTOS.map((photo) => (
            <figure
              key={photo.label}
              style={{ width: photo.width }}
              className="relative h-[200px] shrink-0 overflow-hidden border border-line bg-bg-sunk md:h-[265px]"
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 block h-full w-full select-none object-cover"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[1.68px] text-faint">
                  {photo.label}
                </span>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
