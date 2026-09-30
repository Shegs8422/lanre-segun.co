import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { to: "/", label: "Welcome", end: true },
  { to: "/work", label: "Work", end: false },
  { to: "/ai", label: "AI", end: false },
  { to: "/profile", label: "Profile", end: false },
  { to: "/contact", label: "Contact", end: false },
];

type Props = {
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
};

/**
 * Lighthouse nav — desktop (Figma 195:5246) + mobile (Figma 199:6789,
 * open menu 260:7503 active / 260:8078 idle).
 * Mobile: 425x62 bar, px-25 py-11, hamburger 56x40 with 22/15/22 lines.
 * Open menu: numbered 38px rows (accent number, accent = active),
 * hairline dividers, email + location footer.
 * Frame rhyme: no own verticals — the App shell's line-strong frame runs
 * uninterrupted. Dividers are contained line-strong rules that meet the
 * frame at the corners; no line ever crosses the verticals.
 */
export default function LighthouseNav({ theme = "light", onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Collapse the mobile menu on navigation (incl. back/forward) via
  // render-phase reset — no effect needed. Link clicks close it directly.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  // Lock page scroll while the full-viewport menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  return (
    <header className="w-full bg-bg text-ink">
      {/* Desktop — no border-x: the shell frame is the only vertical.
          Bottom divider is a contained line-strong rule, like all sections. */}
      <div className="hidden md:block">
        <div className="mx-auto flex h-[67px] w-full max-w-[1524px] items-center gap-[30px] px-[68px]">
          <NavLink to="/" end aria-label="Segun — home" className="shrink-0 focus-visible:outline-2 focus-visible:outline-accent-deep">
            <span aria-hidden className="block font-sans text-[22px] font-medium leading-[28px] tracking-[-0.5px] text-ink">
              segun
            </span>
          </NavLink>

          <nav aria-label="Primary" className="ml-auto flex items-start gap-[24px]">
            {LINKS.slice(0, 4).map(({ to, label, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className="relative flex flex-col items-start self-stretch focus-visible:outline-2 focus-visible:outline-accent-deep"
              >
                {({ isActive }) => (
                  <>
                    <span className="font-sans text-[16px] font-medium leading-[24.8px] text-ink">
                      {label}
                    </span>
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-[24.8px] size-[6px] -translate-x-1/2 rounded-[3px] bg-accent"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-[30px]">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <NavLink
              to="/contact"
              className="lift flex items-center bg-accent px-[13px] py-[6px] font-sans text-[16px] font-medium leading-[24.8px] text-accent-ink transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
            >
              Contact
            </NavLink>
          </div>
        </div>
        <div aria-hidden className="h-px bg-line-strong" />
      </div>

      {/* Mobile — same frame rhyme: no own verticals, contained rule
          under the bar (this also gives mobile the divider it lacked). */}
      <div
        className={`md:hidden ${
          open ? "flex min-h-[100svh] flex-col [@supports(height:100dvh)]:min-h-[100dvh]" : ""
        }`}
      >
        <div className="flex items-center gap-[12px] px-[25px] py-[11px]">
          <NavLink to="/" end aria-label="Segun — home" className="shrink-0" onClick={() => setOpen(false)}>
            <span aria-hidden className="block font-sans text-[22px] font-medium leading-[28px] tracking-[-0.5px] text-ink">
              segun
            </span>
          </NavLink>

          <div className="flex min-w-0 flex-1 items-start justify-end">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-[40px] w-[56px] shrink-0 flex-col items-center justify-center gap-[4px] pl-[16px] focus-visible:outline-2 focus-visible:outline-accent-deep"
          >
            <span
              aria-hidden
              className={`h-[2px] w-[22px] rounded-[2px] bg-ink transition-transform duration-300 ease-out ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-[2px] w-[15px] rounded-[2px] bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-[2px] w-[22px] rounded-[2px] bg-ink transition-transform duration-300 ease-out ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
        <div aria-hidden className="h-px bg-line-strong" />

        {open && (
          // No border-t: the full-bleed rule above already divides bar from menu.
          <nav aria-label="Mobile" className="flex flex-1 flex-col px-[25px] pb-6 pt-[10px]">
            <ul className="flex flex-col">
              {LINKS.map(({ to, label, end }, i) => (
                <li
                  key={label}
                  className="board-in-text border-b border-line"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <NavLink
                    to={to}
                    end={end}
                    onClick={() => setOpen(false)}
                    className="relative block py-[20px] pl-[29px] focus-visible:outline-2 focus-visible:outline-accent-deep"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          aria-hidden
                          className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[10.5px] leading-[16.275px] tracking-[1.68px] text-accent-deep"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`block font-sans text-[38px] font-medium leading-[40.5px] tracking-[-1.15px] ${
                            isActive ? "text-accent-deep" : "text-ink"
                          }`}
                        >
                          {label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div
              className="board-in-text mt-auto flex items-center justify-between pt-5"
              style={{ animationDelay: "320ms" }}
            >
              <a
                href="mailto:hello@pleurat.com"
                className="font-mono text-[10.5px] leading-[16.275px] tracking-[1px] text-ink transition hover:text-accent-deep"
              >
                hello@pleurat.com
              </a>
              <p className="font-mono text-[10.5px] leading-[16.275px] tracking-[1px] text-faint">
                Pristina · CET
              </p>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
