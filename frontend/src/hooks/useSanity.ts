import { useEffect, useState } from "react";
import { sanity, sanityConfigured } from "../lib/sanity";

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
