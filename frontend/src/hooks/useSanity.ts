import { useEffect, useState } from "react";
import { sanity, sanityConfigured, caseStudyQuery } from "../lib/sanity";
import { CASE_STUDIES, type CaseStudy } from "../data/caseStudies";

/**
 * Collection hook with static fallback — Sanity is the source of truth
 * when configured; otherwise (or on fetch failure) the bundled data
 * renders, so no section ever goes blank.
 */
export function useSanityCollection<T>(groq: string, fallback: T[]): T[] {
  const [data, setData] = useState<T[]>(fallback);

  useEffect(() => {
    if (!sanityConfigured) return;
    let live = true;
    sanity
      .fetch<T[]>(groq)
      .then((rows) => {
        if (live && Array.isArray(rows) && rows.length > 0) setData(rows);
      })
      .catch(() => {
        /* keep static fallback */
      });
    return () => {
      live = false;
    };
  }, [groq]);

  return data;
}

/** Singleton hook (site copy) with static fallback object. */
export function useSanityDoc<T extends object>(groq: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    if (!sanityConfigured) return;
    let live = true;
    sanity
      .fetch<T | null>(groq)
      .then((doc) => {
        if (live && doc) setData(doc);
      })
      .catch(() => {
        /* keep static fallback */
      });
    return () => {
      live = false;
    };
  }, [groq]);

  return data;
}

/**
 * Case study for one slug. The bundled study for that slug is the fallback, so
 * a slug with no CMS entry still renders its own content rather than
 * blanking. A CMS miss (null) is treated as not-found, not as a reason to
 * show the fallback, so an unpublished study stays hidden.
 */
export function useCaseStudy(slug: string | undefined): CaseStudy | null {
  const fallback = slug ? (CASE_STUDIES[slug] ?? null) : null;
  const [data, setData] = useState<CaseStudy | null>(fallback);
  const groq = slug ? caseStudyQuery(slug) : "";

  useEffect(() => {
    if (!sanityConfigured || !slug) return;
    let live = true;
    sanity
      .fetch<CaseStudy | null>(groq, { slug })
      .then((doc) => {
        if (live) setData(doc ?? null);
      })
      .catch(() => {
        /* keep static fallback */
      });
    return () => {
      live = false;
    };
  }, [groq, slug]);

  return data;
}
