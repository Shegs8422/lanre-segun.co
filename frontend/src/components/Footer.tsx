import { Link } from "react-router";
import { CERTS } from "../data/certs";
import { useSanityCollection, useSanityDoc } from "../hooks/useSanity";
import { QUERIES } from "../lib/sanity";
import arrowUrl from "../assets/arrow.svg";

/**
 * Footer — certification marquee (endless, seamless), then contact columns.
 * McKinsey ships text-only until a real vector lands.
 */
export default function Footer() {
  const certs = useSanityCollection(QUERIES.certs, CERTS);
  const copy = useSanityDoc(QUERIES.siteCopy, {
    contactEmail: "olanrewajuoluwasegun51@gmail.com",
    location: "Abeokuta — WAT, Nigeria",
  });
  return (
    <footer className="relative">
      <div aria-hidden className="h-px bg-line-strong" />

      <div className="px-[24px] pt-14 md:px-[68px]">
        <div className="flex justify-center">
          <Link
            to="/work"
            className="lift inline-flex h-[50px] items-center gap-[12px] bg-accent px-[22px] font-sans text-[15px] font-medium text-accent-ink focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
          >
            Explore portfolio
            <img src={arrowUrl} alt="" width={17} height={17} className="block size-[17px]" />
          </Link>
        </div>
      </div>

      {/* Certification marquee */}
      <div className="mt-10 px-[24px] md:px-[68px]">
        <p className="font-mono text-[10px] tracking-[1.68px] text-faint">CERTIFICATIONS</p>
      </div>
      <div className="mt-4 overflow-hidden py-8" role="img" aria-label="Certifications from Microsoft, Google Cloud, Nvidia, IBM, Google, ALX, Mckinsey, Coursera and AMD">
        <div className="rail-scroll flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-[14px] pr-[14px]" aria-hidden={copy === 1}>
              {certs.map((c) => (
                // Paper tile: fixed light in both themes so third-party
                // brand marks (IBM, McKinsey, Vercel…) stay readable.
                <div
                  key={`${copy}-${c.name}`}
                  className="w-[150px] shrink-0 border border-[rgba(22,20,14,0.22)] bg-[#fbf7e6] p-3 text-center md:w-[180px]"
                >
                  {c.src ? (
                    <img src={c.src} alt="" width={120} height={44} loading="lazy" className="mx-auto block h-[44px] w-full object-contain" />
                  ) : (
                    <span aria-hidden className="mx-auto block h-[44px] w-full" />
                  )}
                  <p className="mt-2 truncate font-mono text-[9px] uppercase tracking-[1px] text-[#16140e]">
                    {c.name}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 px-[24px] py-12 md:grid-cols-4 md:px-[68px]">
        <div>
          <p className="font-mono text-[10px] tracking-[1.68px] text-faint">CONTACT</p>
          <a href={`mailto:${copy.contactEmail}`} className="mt-3 block break-all font-sans text-[15px] font-medium text-ink underline-offset-4 hover:underline">
            {copy.contactEmail}
          </a>
          <p className="mt-2 font-sans text-[14px] text-muted">Lets get in touch!</p>
          <p className="font-sans text-[14px] text-muted">Response within 24 hours</p>
        </div>
        <nav aria-label="Sitemap">
          <p className="font-mono text-[10px] tracking-[1.68px] text-faint">SITEMAP</p>
          <ul className="mt-3 space-y-2">
            {[
              { to: "/", label: "Welcome" },
              { to: "/work", label: "Work" },
              { to: "/ai", label: "AI" },
              { to: "/profile", label: "Profile" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="font-sans text-[14px] text-muted transition hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[10px] tracking-[1.68px] text-faint">ELSEWHERE</p>
          <ul className="mt-3 space-y-2">
            {[
              { label: "Awwwards", href: "https://www.awwwards.com/oluwasegun-olanrewaju/" },
              { label: "Dribbble", href: "https://dribbble.com/lanre_segun" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/oluwasegun-olanrewaju-b847bb188/" },
              { label: "X", href: "https://x.com/Olusegun51" },
              { label: "Instagram", href: "https://www.instagram.com/lanre.s.i" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 font-sans text-[14px] text-muted transition hover:text-ink">
                  {l.label}
                  <span aria-hidden className="text-[11px] transition-transform group-hover:-translate-y-px group-hover:translate-x-px">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[1.68px] text-faint">STUDIO</p>
          <p className="mt-3 font-sans text-[14px] text-muted">{copy.location}</p>
          <p className="mt-2 font-sans text-[14px] text-muted">Design Engineer — Systems — AI</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-[24px] pb-8 md:px-[68px]">
        <p className="font-mono text-[10px] tracking-[1.5px] text-faint">
          © 2026 LANRE SEGUN — ALL RIGHTS RESERVED
        </p>
        <p className="font-mono text-[10px] tracking-[1.5px] text-faint">PRIVACY</p>
      </div>
      <span aria-hidden className="absolute bottom-0 left-0 h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_0_100%/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_0_100%/2px_20px_no-repeat]" />
      <span aria-hidden className="absolute bottom-0 right-0 h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_100%_100%/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_100%_100%/2px_20px_no-repeat]" />
    </footer>
  );
}
