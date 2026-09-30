import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Lenis from "lenis";
import LighthouseNav from "./components/LighthouseNav";
import RouteTransition from "./components/RouteTransition";
import { useTheme } from "./hooks/useTheme";
import LighthouseHero from "./components/LighthouseHero";
import WorkspaceBoard from "./components/WorkspaceBoard";
import Tracks from "./components/Tracks";
import Numbers from "./components/Numbers";
import Tools from "./components/Tools";
import Teams from "./components/Teams";
import Footer from "./components/Footer";
import WorkHero from "./components/WorkHero";
import AIHero from "./components/AIHero";
import AILoop from "./components/AILoop";
import AIWorks from "./components/AIWorks";
import WorkAI from "./components/WorkAI";
import WorkNda from "./components/WorkNda";
import WorkShots from "./components/WorkShots";
import ProfileHero from "./components/ProfileHero";
import ProfileStory from "./components/ProfileStory";
import ProfileCredo from "./components/ProfileCredo";
import ProfileBook from "./components/ProfileBook";

function Placeholder({ title, body }: { title: string; body: string }) {
  return (
    <main className="px-[24px] py-16 md:px-[68px]">
      <p className="font-mono text-[10px] tracking-[1.68px] text-accent-deep">NEXT UP</p>
      <h1 className="mt-2 font-sans text-4xl font-medium tracking-tight text-ink">{title}</h1>
      <p className="mt-3 max-w-xl font-sans text-[17px] leading-7 text-muted">{body}</p>
    </main>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const lenisRef = useRef<Lenis | null>(null);
  // Enable JS-gated animations (progressive enhancement)
  useEffect(() => {
    document.documentElement.classList.add("js-anim");
  }, []);

  // Lenis smooth scroll — off under reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Body background image slot: user to provide. Grid shell below
          mirrors Figma's 1524 centered column with side border lines.
          Light: cream + ink hairline. Dark (Figma 260:8162): #13120d
          page with rgba(241,238,230,0.24) frame.
          Frame is capped top (border-t) and verticals run intact —
          section dividers are contained and meet the frame, never cross it. */}
      <div className="sv-shell-lines min-h-screen text-ink">
        <div className="mx-auto w-[min(1524px,calc(100%-clamp(48px,12vw,220px)))] border-x border-t border-line-strong bg-bg">
          <LighthouseNav theme={theme} onToggleTheme={toggleTheme} />
          <RouteTransition lenisRef={lenisRef}>
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <LighthouseHero />
                  <WorkspaceBoard />
                  <Tracks />
                  <Numbers />
                  <Tools />
                  <Teams />
                  <Footer />
                </main>
              }
            />
            <Route
              path="/work"
              element={
                <main>
                  <WorkHero />
                  <WorkNda />
                  <WorkShots />
                  <WorkAI />
                  <Footer />
                </main>
              }
            />
            <Route path="/work/:slug" element={<Placeholder title="Case study" body="Case studies are being rebuilt here — meanwhile the workspace board on Welcome is live." />} />
            <Route
              path="/ai"
              element={
                <main>
                  <AIHero />
                  <AILoop />
                  <AIWorks />
                  <Tools variant="ai" />
                  <Footer />
                </main>
              }
            />
            <Route
              path="/profile"
              element={
                <main>
                  <ProfileHero />
                  <ProfileStory />
                  <ProfileCredo />
                  <Teams />
                  <ProfileBook />
                  <Footer />
                </main>
              }
            />
            <Route path="/contact" element={<Placeholder title="Contact" body="Contact page coming next — reach Segun directly at olanrewajuoluwasegun51@gmail.com." />} />
          </Routes>
          </RouteTransition>
        </div>
      </div>
    </BrowserRouter>
  );
}
