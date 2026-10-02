import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { useLocation, useNavigate } from "react-router";
import gsap from "gsap";
import type Lenis from "lenis";

const COLS = 6;

/** Document title per route — crawlers and tabs see the right page name. */
function titleFor(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  switch (seg) {
    case "work":
      return "Selected Work — Segun";
    case "ai":
      return "AI Workflow — Segun";
    case "profile":
      return "Profile — Segun";
    case "contact":
      return "Contact — Segun";
    default:
      return "Segun — Design Engineer";
  }
}

/** Splash wordmark per route: Welcome. / Work. / AI Workflow. / Profile. / Contact. */
function wordmarkFor(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  if (!seg) return "Welcome";
  if (seg === "ai") return "AI Workflow";
  return seg.charAt(0).toUpperCase() + seg.slice(1);
}

type Props = {
  lenisRef: RefObject<Lenis | null>;
  children: ReactNode;
};

/**
 * Pleurat-style navigation transition, GSAP-driven (no new deps).
 * Boot: full-screen splash veil with the route wordmark, lifts once.
 * Every in-app link click is intercepted at document level: the cream
 * lined columns draw DOWN over the OLD page, navigation fires mid-cover,
 * then they draw back UP to reveal the new page. Rapid clicks replace
 * the queued destination (navigation queue of one); back/forward falls
 * back to cover-over-new + lift. Scroll is parked for the whole wipe.
 * Reduced motion: no veil, no curtain, plain instant swap.
 */
export default function RouteTransition({ lenisRef, children }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const [splash, setSplash] = useState(() => !reduced);
  const [bootWord] = useState(() => wordmarkFor(pathname));
  const [coverWord, setCoverWord] = useState(() => wordmarkFor(pathname));
  const curtainRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const coverWordRef = useRef<HTMLParagraphElement>(null);
  const prevPath = useRef(pathname);
  const pathRef = useRef(pathname);
  const navigatingRef = useRef(false);
  const queuedRef = useRef<string | null>(null);
  const phaseRef = useRef<"idle" | "covering" | "revealing">("idle");
  pathRef.current = pathname;

  // Keep the document title in sync with the route (SPA has one index.html).
  useEffect(() => {
    document.title = titleFor(pathname);
  }, [pathname]);

  // Boot splash: wordmark holds briefly, then the veil slides away.
  useEffect(() => {
    if (reduced || !splash) return;
    const veil = veilRef.current;
    const word = wordRef.current;
    if (!veil || !word) {
      setSplash(false);
      return;
    }
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setSplash(false);
      }
    };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(word, { y: -28, opacity: 0, duration: 0.35, ease: "power3.in", delay: 0.55 }).to(
        veil,
        { yPercent: -100, duration: 0.75, ease: "expo.inOut" },
        "-=0.08"
      );
    }, veil);
    const fallback = window.setTimeout(finish, 4000);
    return () => {
      ctx.revert();
      window.clearTimeout(fallback);
    };
  }, [reduced, splash]);

  // Show the curtain, held clear of the page scrollbar so it stays visible.
  const primeCurtain = () => {
    const curtain = curtainRef.current;
    if (!curtain) return null;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    curtain.style.right = sbw > 0 ? `${sbw}px` : "";
    gsap.set(curtain, { display: "flex" });
    return curtain;
  };

  // Scroll reset for a route change.
  //
  // Two things fight a naive reset here:
  //
  // 1. The curtain parks Lenis with stop(), and Lenis's scrollTo() is a no-op
  //    while stopped — so a reset issued during the cover is discarded,
  //    leaving the stale pre-navigation target in place. The later start()
  //    then animates back to the old offset and the reader lands mid-page.
  //    `force: true` bypasses Lenis's stopped/locked guards.
  //
  // 2. `html { scroll-behavior: smooth }` turns a plain scrollTo into a CSS
  //    animation. Lenis cancels that with `.lenis-smooth`, but only while it
  //    is running — and we reset precisely when it is stopped, so the jump
  //    crawls instead of snapping. `behavior: "instant"` overrides the CSS
  //    and keeps the reset a hard jump.
  //
  // The native call also covers the reduced-motion path, where Lenis is never
  // created at all.
  //
  // Called after lenis.start() too: starting is what resumes the animation, so
  // a reset issued before it would just be overwritten.
  const resetScroll = () => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  // Reveal helper shared by intercepted + popstate navigations.
  const playReveal = (onDone: () => void) => {
    const curtain = primeCurtain();
    if (!curtain) {
      onDone();
      return () => {};
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ overwrite: true, onComplete: onDone })
        .to(coverWordRef.current, { opacity: 0, y: -20, duration: 0.3, ease: "power3.in" }, 0)
        .to(
          curtain.querySelectorAll(":scope > .rt-col"),
          {
            scaleY: 0,
            duration: 0.7,
            ease: "expo.inOut",
            stagger: 0.06,
          },
          0.08
        );
    }, curtain);
    return () => ctx.revert();
  };

  // Cover the OLD page, then navigate; the pathname effect reveals.
  const go = (to: string) => {
    if (reduced) {
      navigate(to);
      return;
    }
    if (phaseRef.current !== "idle") {
      queuedRef.current = to;
      return;
    }
    const curtain = primeCurtain();
    const lenis = lenisRef.current;
    if (!curtain) {
      navigate(to);
      return;
    }
    phaseRef.current = "covering";
    lenis?.stop();
    setCoverWord(wordmarkFor(to));
    gsap.context(() => {
      gsap
        .timeline({ overwrite: true })
        .fromTo(
          curtain.querySelectorAll(":scope > .rt-col"),
          { scaleY: 0 },
          { scaleY: 1, duration: 0.45, ease: "expo.inOut", stagger: 0.05 }
        )
        .fromTo(
          coverWordRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          "-=0.2"
        )
        .add(() => {
          navigatingRef.current = true;
          phaseRef.current = "revealing";
          if (lenis) lenis.scrollTo(0, { immediate: true });
          else window.scrollTo(0, 0);
          navigate(to);
        }, "+=0.35");
    }, curtain);
  };

  // Intercept in-app link clicks so the cover plays over the old page.
  useEffect(() => {
    if (reduced) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || a.target === "_blank" || a.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith("/api/")) return;
      const to = url.pathname + url.search + url.hash || "/";
      const current = pathRef.current + window.location.search + window.location.hash;
      e.preventDefault();
      if (to === current || to === "") return;
      go(to);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // Route change: reveal (intercepted) or cover+reveal (popstate/direct).
  useLayoutEffect(() => {
    if (reduced) {
      resetScroll();
      return;
    }
    if (prevPath.current === pathname) return; // mount / StrictMode re-run
    prevPath.current = pathname;
    const lenis = lenisRef.current;
    lenis?.stop();
    // Reset the moment the new route commits, not at the end of the reveal.
    // This effect runs after React mutates the DOM but before paint, so the
    // incoming page is never painted at the outgoing page's offset. Doing it
    // in the reveal's onComplete instead left the page parked at the old
    // position for the length of the curtain animation, which read as the
    // scroll "snapping" a beat after the page appeared.
    resetScroll();
    if (navigatingRef.current) {
      // Cover already played over the old page — just reveal.
      navigatingRef.current = false;
      return playReveal(() => {
        phaseRef.current = "idle";
        lenis?.start();
        resetScroll();
        const next = queuedRef.current;
        queuedRef.current = null;
        if (next && next !== pathRef.current) go(next);
      });
    }
    // Back/forward or untracked entry: quick cover over the new page, then lift.
    const curtain = primeCurtain();
    if (!curtain) {
      lenis?.start();
      resetScroll();
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    setCoverWord(wordmarkFor(pathname));
    phaseRef.current = "revealing";
    const ctx = gsap.context(() => {
      const cols = curtain.querySelectorAll(":scope > .rt-col");
      gsap
        .timeline({
          overwrite: true,
          onComplete: () => {
            gsap.set(curtain, { display: "none" });
            phaseRef.current = "idle";
            lenis?.start();
            resetScroll();
          },
        })
        .fromTo(cols, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: "expo.inOut", stagger: 0.05 })
        .to(cols, { scaleY: 0, duration: 0.7, ease: "expo.inOut", stagger: 0.06 }, "+=0.12");
    }, curtain);
    return () => {
      ctx.revert();
      lenis?.start();
      resetScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, reduced, lenisRef]);

  if (reduced) return <>{children}</>;

  return (
    <>
      {children}
      <div ref={curtainRef} aria-hidden className="rt-curtain">
        {Array.from({ length: COLS }, (_, i) => (
          <span key={i} className="rt-col" />
        ))}
        <p ref={coverWordRef} className="rt-cover-word">
          {coverWord}
          <span className="rt-dot" aria-hidden>
            .
          </span>
        </p>
      </div>
      {splash && (
        <div ref={veilRef} className="rt-veil" role="status" aria-label={`${bootWord} loading`}>
          <h1 ref={wordRef} className="rt-word">
            {bootWord}
            <span className="rt-dot" aria-hidden>
              .
            </span>
          </h1>
        </div>
      )}
    </>
  );
}
