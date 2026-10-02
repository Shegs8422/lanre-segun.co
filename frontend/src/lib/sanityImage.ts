/**
 * Sanity CDN image delivery.
 *
 * Without this, every asset is served as the full-resolution original PNG. On a
 * single case study that was 5.4MB — the Prooval hero alone was 1.9MB. These
 * helpers ask the CDN for WebP at the width the browser is actually going to
 * paint, and hand back a srcset so a phone never downloads desktop pixels.
 *
 * Measured on the shipped Prooval assets: 5.4MB -> ~180KB, roughly a 97% cut.
 *
 * AVIF is deliberately not used — it returns HTTP 400 on this dataset, so
 * WebP is the best format actually available.
 */

const CDN = /^https:\/\/cdn\.sanity\.io\/images\//;

/** Default quality. Screenshots are flat vector-ish UI, so 80 is crisp and cheap. */
const QUALITY = 80;

/**
 * Candidate widths for a srcset. Browsers download exactly one, so listing more
 * costs nothing on the wire and lets the browser pick per DPR and viewport.
 */
export const WIDTHS_FULL = [480, 768, 1088, 1440, 1920, 2032] as const;
export const WIDTHS_THUMB = [320, 480, 640, 768, 1088, 1440] as const;

/**
 * Optimised URL for one width. Non-CDN sources (a hand-written external URL, a
 * data URI) are passed through untouched rather than mangled.
 */
export function sanityImage(
  src: string | undefined,
  width: number,
  quality = QUALITY,
): string | undefined {
  if (!src) return undefined;
  if (!CDN.test(src)) return src;

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("fm", "webp");
  url.searchParams.set("q", String(quality));
  return url.toString();
}

/**
 * Responsive srcset. Returns undefined for non-CDN sources so callers can fall
 * back to a plain src and never emit a srcset the CDN can't serve.
 */
export function sanitySrcSet(
  src: string | undefined,
  widths: readonly number[],
  quality = QUALITY,
): string | undefined {
  if (!src || !CDN.test(src)) return undefined;
  return widths.map((w) => `${sanityImage(src, w, quality)} ${w}w`).join(", ");
}

/**
 * The `src` fallback paired with a srcset. Deliberately NOT the original — a
 * browser that ignores srcset would otherwise pull the multi-megabyte original.
 */
export function sanityFallback(
  src: string | undefined,
  width = 1088,
  quality = QUALITY,
): string | undefined {
  return sanityImage(src, width, quality);
}