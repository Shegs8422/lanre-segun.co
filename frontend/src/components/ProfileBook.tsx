import { useReveal } from "../hooks/useReveal";
import arrowUrl from "../assets/arrow.svg";
import coverUrl from "../assets/prompt-engineering-for-ux.jpg";
import BookCover3D from "./BookCover3D";

const ITEMS = [
  "Prompting workflows, end to end",
  "Real UX problems, not made-up exercises",
  "Research and synthesis with generative AI",
  "Where AI actually helps, and where it does not",
];

/**
 * Profile e-book — Figma 258:4731 (About).
 * CSS book cover (340×465, spine + cream boards) beside the 42px
 * statement, hairline list with accent squares, and the accent CTA.
 */
export default function ProfileBook() {
  const { ref, inView } = useReveal<HTMLElement>(0.2);

  return (
    <section ref={ref} aria-label="Profile — e-book" className="relative overflow-hidden">
      <div aria-hidden className="h-px bg-line-strong" />
      <span
        aria-hidden
        className="absolute right-0 top-[1px] h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/2px_20px_no-repeat]"
      />
      <span className="absolute left-0 top-[1px] z-10 bg-accent px-[13px] pb-[8px] pt-[9px] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-accent-ink">
        E-book
      </span>

      <div className="px-[24px] pb-[64px] pt-[64px] md:px-[68px] md:pb-[113px] md:pt-[113px]">
        <div className="grid grid-cols-1 gap-x-[96px] gap-y-[48px] lg:grid-cols-[594px_1fr]">
          {/* Book cover — real 3D designer book, Figma size + orientation */}
          <div className={`flex justify-start lg:justify-center ${inView ? "board-in" : "opacity-0"}`}>
            <div>
              <div className="relative h-[411px] w-[300px] md:h-[465px] md:w-[340px]">
                <div className="absolute left-0 top-0 origin-top-left scale-[0.8824] md:scale-100">
                  <BookCover3D
                    cover={coverUrl}
                    title="Prompt Engineering for UX"
                    author="Medavi"
                    color="#f03800"
                  />
                </div>
              </div>
              <div className="mt-5 max-w-[340px]">
                <p className="font-sans text-[15px] font-medium leading-6 text-ink">
                  Prompt Engineering for UX
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[1px] text-faint">
                  Medavi
                </p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="min-w-0">
            <h2
              className={`sv-lines font-sans text-[32px] font-medium leading-[1.26] tracking-[-1.26px] text-ink md:text-[42px] ${
                inView ? "is-in" : ""
              }`}
            >
              <span className="sv-ln">
                <span>Prompt Engineering</span>
              </span>
              <span className="sv-ln">
                <span>
                  for <span className="text-faint">UX.</span>
                </span>
              </span>
            </h2>
            <p
              className={`sv-rv mt-3 max-w-[576px] font-sans text-[17px] font-normal leading-[28px] text-muted md:text-[19px] md:leading-[30.4px] ${
                inView ? "is-in" : ""
              }`}
              style={{ transitionDelay: "0.12s" }}
            >
              A #1 bestselling guide to harnessing generative AI in your
              design process — prompt patterns, research synthesis, and
              workflows that elevate UX work from first sketch to shipped
              product.
            </p>

            <ul className="mt-[38px] max-w-[698px]">
              {ITEMS.map((item, i) => (
                <li
                  key={item}
                  className={`relative border-b border-ink/[0.08] py-[15px] pl-[30px] font-sans text-[17px] font-normal leading-[25.5px] text-ink ${
                    inView ? "board-in-text" : "opacity-0"
                  }`}
                  style={inView ? { animationDelay: `${i * 70}ms` } : undefined}
                >
                  <span aria-hidden className="absolute left-[4px] top-[23px] size-[7px] bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-[34px] flex flex-wrap items-center gap-[18px]">
              <a
                href="https://www.amazon.com/Prompt-Engineering-Mastering-Generative-Excellence/dp/B0H5XGV4X3"
                target="_blank"
                rel="noreferrer"
                className="lift flex h-[50px] items-center gap-[12px] bg-accent px-[22px] py-[13px] font-sans text-[15px] font-medium leading-[23.25px] text-accent-ink transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
              >
                Get the e-book
                <img src={arrowUrl} alt="" width={17} height={17} className="block size-[17px]" />
              </a>
              <p className="font-mono text-[10px] tracking-[1.68px] text-faint">
                KINDLE + PAPERBACK · #1 IN WEB DESIGN
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
