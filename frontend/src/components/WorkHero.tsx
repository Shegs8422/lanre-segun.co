import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { PROJECTS, type Project } from "../data/projects";
import { useHeaderReveal } from "../hooks/useReveal";
import { useSanityCollection } from "../hooks/useSanity";
import { QUERIES } from "../lib/sanity";
import gsap from "gsap";

/**
 * Work hero — Figma 237:52. Six project columns + floating cursor preview.
 * Reference (.sv-wx): flex items expand via flex-grow on hover; `.sv-wx-pop`
 * follows the cursor (GSAP quickTo, transform-only); `.sv-wx-pop-card`
 * pops in with scale/translate; preview layers cross-fade by index.
 * Header copy uses mount reveal (useHeaderReveal). Touch + reduced-motion
 * fall back to static columns with no cursor card.
 */
/**
 * Card thumbnail — used by the mobile accordion, the inline column frame and
 * the desktop floating hover card.
 *
 * Renders the project's CMS `cover` when it exists, and falls back to the
 * labelled dashed placeholder it replaced, so projects without imagery keep
 * their slot rather than collapsing. The source art is ~1.95:1 while these
 * frames are 21/9 and 16/9, so `object-cover` crops rather than distorts.
 * Decorative: every card already carries the project title as text, so the
 * image is empty-alt to avoid announcing it twice.
 */
function WorkThumb({
  project,
  shots,
  aspect,
  eager = false,
}: {
  project: Project;
  shots: boolean;
  aspect: string;
  eager?: boolean;
}) {
  if (project.cover) {
    return (
      <div className={`${aspect} w-full overflow-hidden bg-bg-soft`}>
        <img
          src={project.cover}
          alt=""
          width={2032}
          height={1040}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${aspect} w-full items-center justify-center border border-dashed border-ink/25 bg-bg-soft`}
    >
      <span className="font-mono text-[10px] tracking-[1.68px] text-faint">
        {shots ? project.title.toUpperCase() : "SCREENSHOT"}
      </span>
    </div>
  );
}

export default function WorkHero() {
  const { ref: headerRef, inView: headerIn } = useHeaderReveal<HTMLElement>();
  const projects = useSanityCollection(QUERIES.projects, PROJECTS);
  const [shots, setShots] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  // Mobile/tablet accordion — independent from the desktop cursor card.
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor tracking on the container (not window): gsap.quickTo smooth-follow,
  // transform-only. The card stays centred on the cursor but clamped inside
  // the column bounds (small bleed allowed, like the reference) so it can
  // never pan entirely outside the card area.
  useLayoutEffect(() => {
    const card = cardRef.current;
    const section = sectionRef.current;
    if (!card || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const BLEED_X = 16;
    const BLEED_TOP = 64;
    const BLEED_BOTTOM = 32;

    const ctx = gsap.context(() => {
      gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
      const xTo = gsap.quickTo(card, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(card, "y", { duration: 0.35, ease: "power3" });

      const place = (rawX: number, rawY: number) => {
        const rect = section.getBoundingClientRect();
        const cw = card.offsetWidth || 360;
        const ch = card.offsetHeight || 420;
        const x = Math.min(
          Math.max(rawX, cw / 2 - BLEED_X),
          Math.max(cw / 2 - BLEED_X, rect.width - cw / 2 + BLEED_X)
        );
        const y = Math.min(
          Math.max(rawY, ch / 2 - BLEED_TOP),
          Math.max(ch / 2 - BLEED_TOP, rect.height - ch / 2 + BLEED_BOTTOM)
        );
        return { x, y };
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const { x, y } = place(e.clientX - rect.left, e.clientY - rect.top);
        xTo(x);
        yTo(y);
      };

      const handleMouseEnter = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const { x, y } = place(e.clientX - rect.left, e.clientY - rect.top);
        gsap.set(card, { x, y });
      };

      // Keyboard focus: centre the card on the focused column.
      const handleFocusIn = (e: FocusEvent) => {
        const target = (e.target as HTMLElement).closest?.(".sv-wx-p");
        if (!target || !(target instanceof HTMLElement)) return;
        const rect = section.getBoundingClientRect();
        const col = target.getBoundingClientRect();
        const { x, y } = place(
          col.left - rect.left + col.width / 2,
          col.top - rect.top + col.height * 0.4
        );
        gsap.set(card, { x, y });
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("focusin", handleFocusIn);
      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("focusin", handleFocusIn);
      };
    });
    return () => ctx.revert();
  }, []);

  return (
    <main ref={headerRef} className="sv-wrap">
      <div className="px-[24px] pt-[64px] md:px-[68px] md:pt-[136px]">
        <div className="sv-rail-head grid grid-cols-1 gap-x-[60px] gap-y-[40px] lg:grid-cols-[678px_1fr]">
          <h1
            className={`sv-lines font-sans text-[length:var(--fs-h1)] font-medium not-italic leading-[1.04] tracking-[-1.2px] text-ink md:tracking-[-1.92px] ${
              headerIn ? "is-in" : ""
            }`}
          >
            <span className="sv-ln">
              <span>Explore my work,</span>
            </span>
            <span className="sv-ln">
              <span>
                process <span className="text-faint">and more.</span>
              </span>
            </span>
          </h1>
          <div
            className={`sv-rv max-w-[509px] lg:justify-self-end ${headerIn ? "is-in" : ""}`}
            style={{ transitionDelay: "0.12s" }}
          >
            <p className="font-sans text-[17px] font-normal leading-[28px] text-muted md:text-[19px] md:leading-[29px]">
              Case studies and side explorations across web, SaaS, and apps. Keep exploring, there's more than
              just UI design.
            </p>
            <div className="flex flex-wrap items-center gap-[12px] pt-[22px]">
              <button
                type="button"
                onClick={() => setShots((s) => !s)}
                aria-pressed={shots}
                className="lift flex h-[50px] items-center gap-[12px] bg-accent px-[22px] py-[13px] font-sans text-[15px] font-medium leading-[23.25px] text-accent-ink focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
              >
                Screenshots Instead
              </button>
              <Link
                to="/ai"
                className="lift inline-flex h-[50px] items-center gap-[12px] px-[22px] py-[13px] font-sans text-[15px] font-medium leading-[23.25px] text-ink transition hover:bg-ink/[0.04] focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
              >
                Explore AI Work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet accordion list (pleurat reference) — title,
          category, plus toggles the description. Desktop keeps columns. */}
      <div className="mt-14 border-y border-ink/[0.14] md:mt-[32px] lg:hidden">
        {projects.map((p, i) => {
          const open = openIdx === i;
          return (
            <div key={p.slug} className="border-b border-ink/[0.14] last:border-b-0">
              <div
                className={`grid motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
                }`}
                inert={open}
              >
                <div className="min-h-0 overflow-hidden">
                  <button
                    type="button"
                    id={`work-tab-${p.slug}`}
                    onClick={() => setOpenIdx(i)}
                    aria-expanded={false}
                    className="flex w-full items-start justify-between gap-4 py-5 pl-[20px] pr-[18px] text-left focus-visible:outline-2 focus-visible:outline-accent-deep md:py-[17px]"
                  >
                    <span>
                      <span className="block font-sans text-[20px] font-medium tracking-[-0.2px] text-ink md:text-[24px] md:leading-[37.2px] md:tracking-[-0.432px]">
                        {p.title}
                      </span>
                      <span className="mt-1 block font-sans text-[13px] text-faint md:text-[14.5px] md:leading-[19.575px]">
                        {p.category}
                      </span>
                    </span>
                    <Plus
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden
                      className="mt-1 shrink-0 text-faint"
                    />
                  </button>
                </div>
              </div>
              <div
                className={`grid motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
                inert={!open}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="relative mb-5 w-full overflow-hidden border border-dashed border-ink/25 bg-bg-soft">
                    <WorkThumb project={p} shots={shots} aspect="aspect-[21/9]" eager={i < 2} />
                    <button
                      type="button"
                      onClick={() => {
                        setOpenIdx(null);
                        requestAnimationFrame(() => {
                          document.getElementById(`work-tab-${p.slug}`)?.focus();
                        });
                      }}
                      aria-label={`Close ${p.title}`}
                      className="absolute right-4 top-4 flex size-[32px] items-center justify-center focus-visible:outline-2 focus-visible:outline-accent-deep"
                    >
                      <Plus
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden
                        className="rotate-45 text-accent-deep"
                      />
                    </button>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-sans text-[20px] font-medium tracking-[-0.2px] text-ink">
                        {p.title}
                      </p>
                      <Link
                        to={`/work/${p.slug}`}
                        className="mt-1 inline-flex items-center gap-1 font-sans text-[13.5px] font-medium text-ink"
                      >
                        Open project <span aria-hidden>↗</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project columns — desktop only (flex via .sv-wx); the list above covers < lg */}
      <div
        ref={sectionRef}
        onMouseLeave={() => setActiveProject(null)}
        className="sv-wx relative mt-14 hidden gap-px border-y border-ink/[0.14] bg-ink/[0.14] lg:flex"
      >
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            to={`/work/${p.slug}`}
            onMouseEnter={() => setActiveProject(i)}
            onFocus={() => setActiveProject(i)}
            onBlur={() => setActiveProject(null)}
            aria-label={`${p.title} — ${p.category}`}
            className={`sv-wx-p group relative flex min-h-[280px] cursor-pointer flex-col border-b border-ink/[0.14] bg-bg p-5 md:min-h-[320px] lg:min-h-0 lg:border-b-0 lg:p-6 ${
              activeProject === i ? "is-active" : ""
            }`}
          >
            {/* Plus icon — fades up on hover via CSS (.sv-plus) */}
            <span aria-hidden className="sv-plus absolute left-1/2 top-4">
              <Plus size={20} strokeWidth={1.5} className="text-faint transition-colors group-hover:text-ink" />
            </span>

            {/* Card frame — cover image when the project has one, otherwise
                the labelled placeholder. Hidden on lg, where the floating
                hover card takes over. */}
            <div className="mt-12 overflow-hidden border border-dashed border-ink/25 bg-bg-soft transition-colors group-hover:border-ink/40 group-hover:bg-bg-sunk lg:hidden">
              <WorkThumb project={p} shots={shots} aspect="aspect-video" />
            </div>

            <div className="sv-ttl mt-auto pt-6">
              <h2 className="font-sans text-[20px] font-medium tracking-[-0.2px] text-ink md:text-[24px]">
                {p.title}
              </h2>
              <p className="mt-1 font-sans text-[13px] text-faint">{p.category}</p>
            </div>
          </Link>
        ))}

        {/* Floating hover card — cursor-positioned outer, pop-animated inner,
            opacity-stacked layers (no height measuring, no slide tween) */}
        <div
          ref={cardRef}
          aria-hidden="true"
          className={`sv-wx-pop ${activeProject !== null ? "is-on" : ""}`}
        >
          <div className="sv-wx-pop-card overflow-hidden border border-ink/[0.12] bg-bg shadow-[0_24px_60px_-12px_rgba(22,20,14,0.28),0_8px_20px_rgba(22,20,14,0.12)]">
            <div className="sv-wx-layers">
              {projects.map((p, i) => (
                <div key={p.slug} className={`sv-wx-layer ${activeProject === i ? "is-active" : ""}`}>
                  <div className="overflow-hidden border-b border-line-strong">
                    <WorkThumb project={p} shots={shots} aspect="aspect-video" />
                  </div>
                  <div className="p-4">
                    <h3 className="nm font-sans text-[18px] font-medium text-ink">{p.title}</h3>
                    <p className="ld mt-1 line-clamp-2 font-sans text-[13px] leading-[20px] text-muted">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
