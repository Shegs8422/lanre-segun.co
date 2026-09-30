import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Shared scroll-reveal hook — used by all sections.
 * Elements are visible by default; .js-anim gates the hidden initial state.
 * Reduced-motion is derived during render (initial state), so the effect
 * only synchronizes the IntersectionObserver external system.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const [inView, setInView] = useState(prefersReducedMotion);
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// Note: useStagger's baseDelay param shifts the first tick (stagger offset).

/**
 * Stagger cascade — reveals items one by one with a delay step.
 * Attach the returned `ref` to the section. Do NOT call alongside a
 * separate `useReveal` on the same element (discarded ref = dead observer).
 * For heading + stagger in one section, use this hook's `inView` for both.
 * Reduced-motion derives `shown` during render; the effect only drives timers.
 */
export function useStagger(count: number, baseDelay = 0, step = 80, threshold = 0.2) {
  const { ref, inView } = useReveal(threshold);
  const [reduced] = useState(prefersReducedMotion);
  const [shown, setShown] = useState(() => (reduced ? count : 0));

  useEffect(() => {
    if (!inView) return;
    if (reduced) return;
    let i = 0;
    let timer = 0;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        i++;
        setShown(i);
        if (i >= count) window.clearInterval(timer);
      }, step);
    }, baseDelay);
    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
    };
  }, [inView, count, baseDelay, step, reduced]);

  return { ref, shown: reduced ? count : shown, inView };
}

/**
 * Header reveal — for above-the-fold heroes.
 * No IntersectionObserver: headers are visible on load, so reveal on mount
 * via rAF. This avoids LCP delays from scroll thresholds and works with the
 * existing `.sv-lines` / `.sv-rv` CSS system (`.js-anim` gating in index.css).
 * StrictMode-safe: single rAF + cleanup, reduced-motion returns true immediately.
 */
export function useHeaderReveal<T extends HTMLElement>() {
  const [inView, setInView] = useState(prefersReducedMotion);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    // Double rAF ensures first paint applies `.js-anim` hidden state,
    // then `is-in` triggers the CSS transition (line mask + fade).
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setInView(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return { ref, inView };
}
