import type { CaseQuote as CaseQuoteData } from "../data/caseStudies";

/**
 * Pull quote — Figma 287:2408.
 * Near-full-width display line-height-1.16 quote with a hairline above the
 * cite, which runs the full 1280 column rather than tracking the text.
 */
export default function CaseQuote({
  quote,
  inView,
}: {
  quote: CaseQuoteData;
  inView: boolean;
}) {
  return (
    <figure className={`sv-rv mt-[42px] ${inView ? "is-in" : ""}`}>
      <blockquote className="max-w-[1003px] font-sans text-[30px] font-normal leading-[1.16] tracking-[-1.1px] text-ink md:text-[47px]">
        <p>“{quote.text}”</p>
      </blockquote>
      {quote.cite && (
        <figcaption className="mt-[42px] border-t border-line-strong pt-[20px] font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-faint">
          {quote.cite}
        </figcaption>
      )}
    </figure>
  );
}
