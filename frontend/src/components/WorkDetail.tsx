import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import Footer from "./Footer";
import CaseCover from "./CaseCover";
import CaseHero from "./CaseHero";
import CaseNext from "./CaseNext";
import CaseSection from "./CaseSection";
import CaseShipped from "./CaseShipped";
import { useCaseStudy } from "../hooks/useSanity";

/**
 * Work detail — Figma 287:2071 (MindPath).
 * A thin assembler: hero, cover, then the CMS-supplied chapter sequence, the
 * "next case study" panel and the site footer. All layout lives in the
 * children so the data contract (a project document) stays the only coupling.
 *
 * The whole body sits in a 1280 column inset 54px from the 68px gutter,
 * matching the reference; the cover deliberately breaks out of it.
 */
export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = useCaseStudy(slug);

  // RouteTransition sets a generic per-segment title; a case study needs its
  // own project name for tabs and crawlers.
  useEffect(() => {
    if (study) document.title = `${study.title} — Case Study — Segun`;
  }, [study]);

  if (!study) {
    return (
      <main className="px-[24px] py-16 md:px-[68px]">
        <p className="font-sans text-[10.5px] font-normal uppercase leading-[16.275px] tracking-[1.68px] text-accent-deep">Not found</p>
        <h1 className="mt-2 font-sans text-4xl font-medium tracking-tight text-ink">Case study</h1>
        <p className="mt-3 max-w-xl font-sans text-[17px] leading-7 text-muted">
          We couldn’t find that project.
        </p>
        <Link
          to="/work"
          className="mt-6 inline-block font-sans text-[15px] font-medium text-accent-deep underline underline-offset-4"
        >
          Back to all work
        </Link>
      </main>
    );
  }

  return (
    <main>
      <CaseHero title={study.title} description={study.description} meta={study.meta} />

      <div className="px-[24px] md:px-[68px]">
        <div className="md:mx-[54px]" data-tone={study.tone ?? "green"}>
          <CaseCover cover={study.cover} />
          {study.sections.map((section, i) => (
            <CaseSection key={`${section.kicker}-${i}`} section={section} />
          ))}
          {study.shipped && (
            <div className="pt-[56px] md:pt-[120px]">
              <CaseShipped shipped={study.shipped} inView />
            </div>
          )}
          <CaseNext next={study.next} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
