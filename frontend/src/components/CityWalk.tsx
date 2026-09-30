import { useEffect, useMemo, useRef, useState } from "react";
import skylineUrl from "../assets/city-bg.svg";
import { JOBS } from "../data/work";
import { useSanityCollection } from "../hooks/useSanity";
import { QUERIES } from "../lib/sanity";

/** Full journey loop duration, per reference timeframe. */
const LOOP_SECS = 18;

/**
 * Skyline treadmill — Lagos silhouette scrolls right-to-left in a continuous
 * loop while the project row traces the path 01→10 on the same timeline.
 * Motion: one rAF loop, transform-only; static under prefers-reduced-motion.
 */
export default function CityWalk() {
  const jobs = useSanityCollection(QUERIES.jobs, JOBS);
  /** Journey stops — Segun's path, oldest to newest. */
  const TEAMS = useMemo(() => jobs.map((j) => j.team), [jobs]);
  const TEAM_ROLES = useMemo(() => jobs.map((j) => j.role), [jobs]);
  const teamCount = TEAMS.length;
  const [selected, setSelected] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const stateRef = useRef({ inView: false, reduced: false });
  const selRef = useRef(0);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [nameW, setNameW] = useState(0);

  useEffect(() => {
    setNameW(nameRef.current?.offsetWidth ?? 0);
  }, [selected]);

  // Reduced motion + visibility.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    stateRef.current.reduced = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      stateRef.current.reduced = e.matches;
    };
    mq.addEventListener("change", onChange);
    const el = viewportRef.current;
    let io: IntersectionObserver | null = null;
    if (el) {
      io = new IntersectionObserver(
        ([entry]) => {
          stateRef.current.inView = entry.isIntersecting;
        },
        { threshold: 0.15 }
      );
      io.observe(el);
    }
    return () => {
      mq.removeEventListener("change", onChange);
      io?.disconnect();
    };
  }, []);

  // Loop: advance progress, scroll track, derive team from timeline.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const track = viewportRef.current?.querySelector<HTMLElement>("[data-track]");
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const st = stateRef.current;
      if (!track || !st.inView || st.reduced || document.hidden) return;
      const p = (progressRef.current + dt / LOOP_SECS) % 1;
      progressRef.current = p;
      const w = track.parentElement?.clientWidth ?? 0;
      track.style.transform = `translateX(${(-p * w).toFixed(1)}px)`;
      const idx = Math.min(teamCount - 1, Math.floor(p * teamCount));
      if (idx !== selRef.current) {
        selRef.current = idx;
        setSelected(idx);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [teamCount]);

  /** Jump the world forward one team. */
  const nextTeam = () => {
    const p = (progressRef.current + 1 / teamCount) % 1;
    progressRef.current = p;
    const w = viewportRef.current?.clientWidth ?? 0;
    viewportRef.current
      ?.querySelector<HTMLElement>("[data-track]")
      ?.style.setProperty("transform", `translateX(${(-p * w).toFixed(1)}px)`);
    const idx = Math.min(teamCount - 1, Math.floor(p * teamCount));
    selRef.current = idx;
    setSelected(idx);
  };

  const safeSelected = Math.min(selected, TEAMS.length - 1);
  const name = TEAMS[safeSelected];
  const role = TEAM_ROLES[safeSelected];
  const num = String(safeSelected + 1).padStart(2, "0");

  return (
    <div>
      {/* Project row — pixel values from 195:4207 */}
      <div className="relative h-[37.188px] min-h-[30px]">
        <p className="absolute left-0 top-[15px] font-sans text-[10.5px] font-normal leading-[16.275px] tracking-[1.68px] text-accent-deep">
          {num}
        </p>
        <p ref={nameRef} className="absolute left-[26.63px] top-[0.09px] max-w-[52%] truncate font-sans text-[24px] font-medium leading-[37.2px] tracking-[-0.48px] text-ink sm:max-w-none">
          {name}
        </p>
        {role && (
          <p
            className="absolute top-[10.13px] hidden font-sans text-[15px] font-normal leading-[23.25px] text-faint sm:block"
            style={{ left: Math.max(140.83, 26.63 + nameW + 14) }}
          >
            {role}
          </p>
        )}
        <div className="absolute right-0 top-[15px] flex items-center gap-4">
          <button
            type="button"
            onClick={nextTeam}
            className="font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint transition hover:text-ink focus-visible:outline-2 focus-visible:outline-accent-deep"
          >
            Next projects
          </button>
        </div>
      </div>

      {/* Skyline treadmill */}
      <div className="overflow-hidden pt-[12px]">
        <div
          ref={viewportRef}
          className="relative"
        >
          <div data-track className="flex w-[200%] will-change-transform">
            {[0, 1].map((copy) => (
              <img
                key={copy}
                src={skylineUrl}
                alt={copy === 0 ? "Lagos skyline silhouette" : ""}
                aria-hidden={copy === 1}
                width={515}
                height={90}
                draggable={false}
                className="block h-auto w-1/2 select-none"
              />
            ))}
          </div>
        </div>
      </div>
      <p className="sr-only">
        Animated Lagos skyline scrolling past while the project path advances from Hoopit AI to AI Journey.
      </p>
    </div>
  );
}
