import { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";

const TABS = [
  { id: "apps", label: "Apps", count: 33 },
  { id: "websites", label: "Websites", count: 36 },
] as const;

type TabId = (typeof TABS)[number]["id"];

const PER_PAGE = 20;

function itemsFor(tab: TabId, page: number): { code: string; title: string }[] {
  const total = TABS.find((t) => t.id === tab)!.count;
  const start = (page - 1) * PER_PAGE;
  const n = Math.max(0, Math.min(PER_PAGE, total - start));
  const prefix = tab === "apps" ? "A" : "W";
  return Array.from({ length: n }, (_, i) => {
    const idx = start + i + 1;
    return {
      code: `${prefix}-${String(idx).padStart(2, "0")}`,
      title: tab === "apps" ? `App screen ${idx}` : `Website screen ${idx}`,
    };
  });
}

/**
 * Screenshots — tabbed gallery (Apps 33 / Websites 36) with pagination and
 * a lightbox. Thumbnails are placeholders until real screens land.
 */
export default function WorkShots() {
  const [tab, setTab] = useState<TabId>("apps");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<number | null>(null);

  const total = TABS.find((t) => t.id === tab)!.count;
  const pages = Math.ceil(total / PER_PAGE);
  const items = itemsFor(tab, page);
  const { ref, inView } = useReveal<HTMLElement>(0.15);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const pick = (t: TabId) => {
    setTab(t);
    setPage(1);
  };

  return (
    <section ref={ref} aria-label="Screenshots" id="screenshots" className="relative">
      <div aria-hidden className="h-px bg-line-strong" />
      <span className="absolute left-0 top-[1px] bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        SCREENSHOTS
      </span>

      <div className="px-[24px] pb-20 pt-16 md:px-[68px] md:pt-[126px]">
        <h2
          className={`sv-lines font-sans text-[32px] font-medium leading-[1.05] tracking-[-0.8px] text-ink md:text-[47px] ${
            inView ? "is-in" : ""
          }`}
        >
          <span className="sv-ln">
            <span>Everything,</span>
          </span>
          <span className="sv-ln">
            <span className="text-faint">up close.</span>
          </span>
        </h2>
        <p
          className={`sv-rv mt-3 max-w-[566px] font-sans text-[15px] leading-[24px] text-muted ${
            inView ? "is-in" : ""
          }`}
          style={{ transitionDelay: "0.12s" }}
        >
          Screens from shipped work — marketing sites on one tab, product and app interfaces on the other. Click
          any of them to open it full size.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex gap-8 border-b border-line" role="tablist" aria-label="Screenshot categories">
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => pick(t.id)}
                className={`relative pb-3 font-mono text-[12px] tracking-[1.5px] transition-colors focus-visible:outline-2 focus-visible:outline-accent-deep ${
                  active ? "text-ink" : "text-faint hover:text-ink"
                }`}
              >
                {t.label.toUpperCase()}{" "}
                <span className={active ? "text-accent-deep" : ""}>{t.count}</span>
                {active && <span aria-hidden className="absolute inset-x-0 -bottom-px h-[2px] bg-accent" />}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 gap-[14px] md:grid-cols-4">
          {items.map((it, i) => (
            <button
              key={it.code}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open ${it.title} full size`}
              className="group border border-line bg-bg-soft p-3 text-left transition focus-visible:outline-2 focus-visible:outline-accent-deep"
            >
              <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-ink/25 bg-bg/60 transition group-hover:bg-bg-sunk">
                <span className="font-mono text-[11px] tracking-[1.68px] text-faint">{it.code}</span>
              </div>
              <p className="mt-2 truncate font-sans text-[13px] text-muted">{it.title}</p>
            </button>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex size-[34px] items-center justify-center border border-ink/25 font-mono text-[14px] text-ink transition hover:bg-ink/[0.05] disabled:cursor-pointer disabled:opacity-30"
          >
            ‹
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page}
              className={`flex h-[34px] min-w-[34px] items-center justify-center border px-2 font-mono text-[13px] transition focus-visible:outline-2 focus-visible:outline-accent-deep ${
                p === page
                  ? "border-accent-deep bg-accent text-accent-ink"
                  : "border-ink/25 text-muted hover:bg-ink/[0.05]"
              }`}
            >
              {String(p).padStart(2, "0")}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            aria-label="Next page"
            className="flex size-[34px] items-center justify-center border border-ink/25 font-mono text-[14px] text-ink transition hover:bg-ink/[0.05] disabled:cursor-pointer disabled:opacity-30"
          >
            ›
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && items[open] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[open].title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-[900px] border border-ink/30 bg-bg-soft p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex aspect-video items-center justify-center border border-dashed border-ink/30 bg-bg/60">
              <span className="font-mono text-[13px] tracking-[1.68px] text-faint">{items[open].code}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-sans text-[16px] font-medium text-ink">{items[open].title}</p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                autoFocus
                className="border border-ink/25 px-4 py-2 font-mono text-[11px] tracking-[1.5px] text-ink transition hover:bg-ink/[0.05] focus-visible:outline-2 focus-visible:outline-accent-deep"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
