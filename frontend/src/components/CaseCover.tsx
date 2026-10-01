import type { CaseImage } from "../data/caseStudies";

/**
 * Cover image — Figma 287:2497.
 * Sits 54px below the hero block and breaks the content gutter to sit 44px
 * from the shell edge on desktop (`-mx-[24px]` against the 68px gutter).
 * Until the asset is uploaded, an aspect-locked dashed frame carries the alt
 * text so the page keeps its rhythm instead of collapsing to zero height.
 *
 * The intrinsic size is the uploaded asset's real 2032x1040 (1.954:1), not the
 * 1436x806 frame in the design — declaring the true ratio keeps the browser
 * from reserving the wrong box and shifting the page once the image decodes.
 * `object-cover` only bites if a future asset needs cropping.
 */
export default function CaseCover({ cover }: { cover?: CaseImage }) {
  if (!cover) return null;

  return (
    <figure className="mt-[54px] md:-mx-[24px]">
      {cover.src ? (
        <img
          src={cover.src}
          alt={cover.alt}
          width={2032}
          height={1040}
          loading="eager"
          decoding="async"
          className="block w-full border border-line-strong object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={cover.alt}
          className="flex aspect-[2032/1040] w-full items-center justify-center border border-dashed border-ink/25 bg-bg-soft p-[24px] text-center"
        >
          <span className="max-w-[52ch] font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint">
            {cover.alt}
          </span>
        </div>
      )}
      {cover.caption && (
        <figcaption className="mt-[10px] font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint md:-mx-[24px] md:px-0">
          {cover.caption}
        </figcaption>
      )}
    </figure>
  );
}
