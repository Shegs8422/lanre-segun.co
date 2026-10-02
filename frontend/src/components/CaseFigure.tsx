import type { CaseFigure as CaseFigureData, CaseImage } from "../data/caseStudies";
import { sanityFallback, sanitySrcSet, WIDTHS_FULL } from "../lib/sanityImage";

/**
 * Case study figure — Figma 287:2419 … 287:2367.
 * Three layouts only, matching the design: `full` (one image on the 1280
 * column), `pair` (two, 26px gutter) and `triptych` (three, 26px gutter).
 * GROQ normalises all three onto `images[]`, so this never branches on _type.
 * Figures keep their natural aspect ratio — the design varies wildly between
 * them (446px to 1942px tall) so nothing here is cropped or forced.
 */

const GRID: Record<CaseFigureData["layout"], string> = {
  full: "grid-cols-1",
  pair: "grid-cols-1 md:grid-cols-2",
  triptych: "grid-cols-1 md:grid-cols-3",
};

function Shot({ image }: { image: CaseImage }) {
  if (!image.src) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className="flex aspect-[16/10] w-full items-center justify-center border border-dashed border-ink/25 bg-bg-soft p-[24px] text-center"
      >
        <span className="max-w-[34ch] font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint">
          {image.alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={sanityFallback(image.src)}
      srcSet={sanitySrcSet(image.src, WIDTHS_FULL)}
      sizes="(min-width: 1024px) 1011px, (min-width: 768px) 90vw, 100vw"
      alt={image.alt}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full border border-line-strong"
    />
  );
}

export default function CaseFigure({
  figure,
  inView,
}: {
  figure: CaseFigureData;
  inView: boolean;
}) {
  const images = figure.images ?? [];
  if (images.length === 0) return null;

  return (
    <figure
      className={`sv-rv mt-[42px] ${inView ? "is-in" : ""}`}
      style={{ transitionDelay: "0.1s" }}
    >
      <div className={`grid gap-[16px] md:gap-[26px] ${GRID[figure.layout]}`}>
        {images.map((image, i) => (
          <Shot key={`${image.alt}-${i}`} image={image} />
        ))}
      </div>
      {(figure.caption || images.some((i) => i.caption)) && (
        <figcaption className="mt-[12px] font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint">
          {figure.caption ?? images.map((i) => i.caption).filter(Boolean).join(" · ")}
        </figcaption>
      )}
    </figure>
  );
}
