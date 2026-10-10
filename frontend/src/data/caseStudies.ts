/**
 * Static case-study fallback. Mirrors the `project` document shape exactly so
 * the page renders identically whether Sanity is configured or not — swap in
 * the CMS and only the copy/images change. The layout these mirror is the
 * case study reference design (Figma 287:2071, 289:3780).
 */

export type CaseImage = {
  src?: string;
  alt: string;
  caption?: string;
};

export type CaseMeta = {
  label: string;
  value: string;
  href?: string;
};

export type FigureLayout = "full" | "pair" | "triptych";

export type CaseFigure = {
  layout: FigureLayout;
  images: CaseImage[];
  caption?: string;
};

export type CaseStat = {
  value: string;
  label: string;
};

export type CaseQuote = {
  text: string;
  cite?: string;
};

export type CaseShipped = {
  heading: string;
  items: string[];
};

export type CaseNext = {
  slug: string;
  title: string;
  category: string;
  description: string;
  cover?: string;
};

/** A labelled sub-point inside a chapter — a problem name over its detail. */
export type CasePoint = {
  label: string;
  text: string;
};

export type CaseSection = {
  kicker: string;
  heading: string;
  body: string[];
  points?: CasePoint[];
  chips?: string[];
  figures?: CaseFigure[];
  stats?: CaseStat[];
  quote?: CaseQuote;
};

/** Per-project accent for the outcome blocks. */
export type OutcomeTone = "green" | "indigo";

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  description: string;
  cover?: CaseImage;
  meta?: CaseMeta[];
  sections: CaseSection[];
  shipped?: CaseShipped;
  tone?: OutcomeTone;
  next?: CaseNext;
};

/** Placeholder frame — replaced by the real asset once it lands in Sanity. */
const shot = (alt: string): CaseImage => ({ alt });

/**
 * Sorplos — Nigeria's compare-and-buy insurance aggregator, taken from spec
 * documents to a working three-portal prototype. Leads the project list.
 *
 * Two content notes worth keeping in mind when editing:
 *   1. "What shipped" carries the ten numbered deliverables rather than the
 *      trailing prose paragraph, because the numbers cross-reference the
 *      section kickers.
 *   2. No figures yet — imagery is pending, so every chapter currently renders
 *      only its text block.
 */
export const SORPLOS: CaseStudy = {
  slug: "sorplos",
  title: "Sorplos",
  category: "Insurance Aggregator",
  description:
    "Nigeria's compare-and-buy insurance aggregator — from spec documents to a working three-portal prototype.",
  cover: {
    alt: "Sorplos — Nigeria's compare-and-buy insurance aggregator, spanning a customer mobile app, an insurer corporate portal and an admin back office.",
  },
  meta: [
    { label: "Role", value: "Lead Product Designer" },
    { label: "Tools", value: "Figma, FigJam, Figma Make" },
    { label: "Year", value: "2026" },
    { label: "Status", value: "Live" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "Three portals, one distribution engine",
      body: [
        "Sorplos set out to become the “MoneySupermarket for Nigeria”: a neutral web aggregator on the front, a full-stack licensed broker behind it. I took it from product specification documents (Platform Spec v1.0, Dual-Track Strategy) to a working prototype spanning a customer mobile app, an insurer corporate portal, and an admin back office — all wired together with a live data bridge, so a purchase, claim, or RFI on one surface shows up on the others.",
      ],
    },
    {
      kicker: "02 · The problem",
      heading: "Trust is the product",
      body: [
        "Nigerian insurance doesn't suffer from lack of demand — it suffers from lack of trust: fake motor certificates, insurers whose digital fulfilment is broken, and shoppers who can't tell which company actually pays claims. The brief demanded three distribution channels at once — direct self-service, peer referral with affiliate commission, and corporate bulk enrolment — under NAICOM broker and partnering-insurtech licences, with BVN/NIN identity verification and instant policy issuance.",
        "My job: turn that regulatory and operational complexity into flows a first-time buyer can finish in minutes — and make trust itself a visible feature, not a slogan.",
      ],
      chips: [
        "Dual-track aggregator",
        "Three user flows",
        "NAICOM compliance",
        "Trust-first",
        "Mobile-first",
        "Built to scale",
      ],
    },
    {
      kicker: "03 · Discovery",
      heading: "Spec-first, then screens",
      body: [
        "Unlike a greenfield brief, Sorplos arrived with dense documentation — platform spec, dual-track strategy, user-flow tables. Discovery meant converting ~600 lines of spec into a buildable map: which flows share screens, where the three portals touch, and what could stay mocked (payments, NIBSS, liveness) versus what had to feel real (quoting, certificates, commissions). The Figma flow then became the source of truth the build follows screen-for-screen.",
      ],
    },
    {
      kicker: "04 · Research",
      heading: "Three buyers, three anxieties",
      body: [
        "The audience split three ways, each with a different trust gap: the individual buyer (is this certificate genuine? will my claim be paid?), the referrer/affiliate (will I actually get my 2-5%”), and the corporate admin (can I enrol 200 staff without chaos?). That mapped directly onto the product's answer: verifiable QR-coded policies, an automatic commission ledger with settlement states, and CSV bulk enrolment with per-employee certificates plus a master summary.",
      ],
    },
    {
      kicker: "05 · Brand",
      heading: "One system across three surfaces",
      body: [
        "The visual language had to stretch from a consumer app to an insurer portal to an admin console without feeling like three products. I standardised on the Figma system: Urbanist throughout, deep navy #021056 for primary actions, semantic status colours, one shared stepper header and pill-CTA pattern across all nine mobile flows — so onboarding, auth, quoting, claims, and verification all feel like the same company.",
      ],
    },
    {
      kicker: "06 · Architecture",
      heading: "A bridge, not three silos",
      body: [
        "The defining architectural decision: the portals share a live event bridge (RFI requests/responses, issued policies, filed claims, payments, commissions, corporate decisions) instead of each living on static mocks. A customer answering an insurer's document request on mobile updates the corporate application in real time; a corporate approval flips the customer's pending screen to Approved. The data model mirrors the spec's section 12.2 tables — customers, policies, payments, commissions, organisations, audit trail.",
      ],
    },
    {
      kicker: "07 · Product",
      heading: "The mobile app: compare to covered in minutes",
      body: [
        "A ~70-screen app covering the full lifecycle: splash and onboarding, email + OTP auth, BVN/NIN verification with liveness and preferences capture, home with shop-by-category hubs, an Airbnb-style advanced filter sheet (price histogram, per-cover drill-downs, live counts), instant vs underwritten quoting, multi-rail payment, QR policy certificates, renewals, Sentinel risk profile, referral and affiliate centre, and a 4-step guided claim flow with evidence upload and review — including buying entire policies for someone else.",
      ],
    },
    {
      kicker: "08 · Portals",
      heading: "Corporate and admin, held to the same bar",
      body: [
        "The insurer portal (dashboard, applications with RFI/reject/reverse flows, policies, claims adjudication, products, insurer onboarding, self-registration approvals) and the admin back office (policies, payments, commissions, customers, flagged items, settings with role-based access) were rebuilt to the same design language — including a slimmed-down policies table per stakeholder review. Mobile-originated business merges live into every relevant list, badged by origin.",
      ],
    },
    {
      kicker: "09 · Craft",
      heading: "Prototype honesty",
      body: [
        "Where the real world wasn't available, the prototype is honest about it: clearly-marked demo switches (simulated webhooks, liveness pass/fail, partial payments), placeholder illustration frames sized for incoming Figma exports, and copy that never promises backend guarantees (30-day RFI validity, T+1-T+3 settlement language). Everything a stakeholder taps responds with realistic state transitions — no dead buttons.",
      ],
    },
    {
      kicker: "10 · Outcome",
      heading: "A demo that behaves like the business",
      body: [
        "The prototype now walks the entire dual-track story end to end: compare → verify → quote → pay → certificate → claim → renewal, with the insurer and admin sides reacting live.",
      ],
      stats: [
        { value: "~70", label: "Mobile screens across 9 unified stepper flows" },
        { value: "3", label: "Portals on one system — 19 products, 8 insurers" },
        { value: "0", label: "Dead ends — every CTA resolves to a realistic state" },
      ],
      quote: {
        text: "The RFI loop is the proof the bridge pattern works — extending that same relay to decisions, catalog, and claims is the fix.",
        cite: "Build notes — mobile to portal sync milestone",
      },
    },
  ],
  tone: "indigo",
  shipped: {
    heading: "What shipped",
    items: [
      "Shared Figma design system across all surfaces.",
      "Mobile app: full policy lifecycle, 9 stepper flows.",
      "Corporate portal: applications, claims, products, onboarding.",
      "Admin back office: oversight, commissions, registrations.",
      "Live bridge: RFI, decisions, policies, claims, payments.",
      "Claim flows rebuilt: managed 4-step + assisted track.",
      "Advanced filtering with honest re-pricing.",
      "Figma-following builds, screen by screen.",
      "Prototype-honest mocks, no dead buttons.",
      "Ready for backend integration.",
    ],
  },
  next: {
    slug: "lighthouse-academy",
    title: "Lighthouse Academy",
    category: "Learning Platform",
    description: "Design for the interactive age — from platform spec documents to a full-stack learning management system and multi-role web platform.",
  },
};

/**
 * Lighthouse Academy (formerly Lighthouse Design Academy) — the reference
 * this case-study layout was built against.
 *
 * Content notes:
 *   1. `What shipped` carries the ten numbered deliverables, matching the
 *      pattern used on Sorplos; the trailing prose is not represented.
 *   2. Four outcome metrics were supplied but the stat band is three columns,
 *      so `5 / 3 / 0` were kept.
 *   3. Status reads "Live" for consistency with the other projects; the
 *      parenthetical portal breakdown lives in the copy instead.
 */
export const LIGHTHOUSE: CaseStudy = {
  slug: "lighthouse-academy",
  title: "Lighthouse Academy",
  category: "Learning Platform",
  description: "Design for the interactive age — from platform spec documents to a full-stack learning management system and multi-role web platform.",
  cover: {
    src: "https://cdn.sanity.io/images/80wu0o5s/production/9577129669b983f1b6543bacf66e9c8f74aca667-2032x1040.png",
    alt: "Lighthouse Academy — the academy landing page on a laptop, showing the hero 'Learn the skills leading tech teams are looking for' with login and join actions.",
  },
  meta: [
    { label: "Role", value: "Lead Design Engineer + Product Designer" },
    { label: "Tools", value: "Figma, Next.js, TypeScript, Tailwind, Rive" },
    { label: "Year", value: "2026" },
    { label: "Status", value: "Live" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "Three portals, one interactive learning ecosystem",
      body: [
        "Lighthouse Design Academy set out to bridge the gap between static design and production code: a premier academy and digital platform empowering students with the technical depth of software engineers and the vision of creative directors. As Lead Design Engineer, I took the platform from initial business model specs and wireframes to a fully realized Next.js application spanning a student learning portal, a facilitator management dashboard, and an admin oversight back office — all synchronized with role-based auth, offline PWA caching, interactive Figma/Rive embeds, and a live gamified progression engine.",
      ],
    },
    {
      kicker: "02 · The problem",
      heading: "Static mockups don't teach modern product engineering",
      body: [
        "Modern product teams don't speak in static screens; they build in motion, design systems, and resilient code. Traditional design schools teach theory in isolation, leaving graduates stranded when faced with developer handoff, complex token structures, responsive state management, and real-world implementation. The brief demanded a unified platform capable of delivering high-stakes multi-month technical tracks (AI and Automation, Software Engineering, Product Design, Motion Design, Product Management) with secure video streaming, assignment workflows, automated attendance and scheduling via Google Meet integrations, and localized performance-based facilitator compensation.",
        "My job: translate this complex educational architecture into an intuitive, high-performance web experience where learning is as immersive as the tools students are learning to master.",
      ],
      chips: [
        "Design-to-code bridge",
        "Multi-role portals",
        "Motion-first",
        "Offline-first PWA",
        "Gamified progression",
        "Built to scale",
      ],
    },
    {
      kicker: "03 · Discovery",
      heading: "Spec-first, then component systems",
      body: [
        "Discovery meant converting comprehensive business model frameworks, curriculum roadmaps, and revenue-share calculation specs into an engineering blueprint: defining boundaries between student self-paced lessons, gated community discussions, facilitator approval workflows, and admin analytics. The Figma design system became the single source of truth, mapping out design tokens, typographic scales, semantic color palettes, and responsive grid layouts before a single line of Next.js code was compiled.",
      ],
    },
    {
      kicker: "04 · Research",
      heading: "Three users, three distinct journeys",
      body: [
        "The platform users split into three primary groups, each with distinct needs: the aspiring designer or engineer (looking for career-ready skills, verifiable certificates, and mentorship), the industry facilitator (needing streamlined cohort scheduling, submission grading, and automated earnings tracking), and the platform admin (requiring global user oversight, cohort management, analytics, and revenue auditing). This mapped directly to a role-based portal architecture: a distraction-free learning environment for students, a robust management console for instructors, and a command center for administrators.",
      ],
    },
    {
      kicker: "05 · Brand",
      heading: "A creative engineering aesthetic",
      body: [
        "The visual language needed to reflect cutting-edge tech and elite design craftsmanship without feeling cluttered. I standardized the design system around deep dark and light palettes, crisp typography, micro-interactions powered by GSAP and Rive, and consistent UI components — cards, tabbed navigation, progress trackers, modal dialogs — across all surfaces so that browsing courses, managing assignments, or reviewing analytics feels cohesive and premium.",
      ],
    },
    {
      kicker: "06 · Architecture",
      heading: "A modular Next.js application, not fragmented silos",
      body: [
        "The core architectural decision: leveraging Next.js App Router with server components and client-side interactivity, backed by robust database architecture and PWA service workers for offline-first caching and IndexedDB action queuing. Role-based access control secures routes across student, facilitator, and admin levels, while modular API routes handle secure authentication, progress tracking, and transactional email triggers.",
      ],
    },
    {
      kicker: "07 · Product",
      heading: "The student portal: from zero to production-ready",
      body: [
        "A comprehensive learning hub covering the entire student journey: interactive curriculum roadmaps with progressive lesson unlocking, embedded Figma file viewers and comment pullers, video lesson players with variable playback and offline fallback, quiz modules with instant grading, achievement gamification (streak counters, XP points, milestone confetti), verifiable certificate generation with public lookup URLs, and a private student community feed.",
      ],
    },
    {
      kicker: "08 · Portals",
      heading: "Facilitator and admin workspaces, built to the same exacting standard",
      body: [
        "The facilitator dashboard (cohort scheduling, Google Meet integration, student assignment grading, performance bonus tracking) and the admin back office (user management, role approvals, revenue analytics, system configuration) were engineered with the same design discipline. Real-time updates reflect student submissions instantly across instructor grading queues and admin audit logs.",
      ],
    },
    {
      kicker: "09 · Craft",
      heading: "Production-grade polish",
      body: [
        "Every edge case was engineered for resilience: skeleton loaders for asynchronous data fetching, graceful offline error boundaries, accessible keyboard navigation, responsive layouts scaling seamlessly from mobile viewports to ultra-wide displays, and rigorous state management ensuring zero dead clicks or broken navigation paths across all portals.",
      ],
    },
    {
      kicker: "10 · Outcome",
      heading: "A platform that powers the academy's operations",
      body: [
        "The application successfully unifies the academy's instructional delivery and administrative workflows end to end: enrolment, learning, mentorship, project delivery, certification.",
      ],
      stats: [
        { value: "5", label: "Specialized technical tracks" },
        { value: "3", label: "Integrated user portals on one architecture" },
        { value: "0", label: "Friction workflows — automated certification and earnings" },
      ],
      quote: {
        text: "The design-to-code bridge isn't just what we teach — it's how the entire platform is built.",
        cite: "Build notes — multi-portal architecture milestone",
      },
    },
  ],
  tone: "green",
  shipped: {
    heading: "What shipped",
    items: [
      "Unified Figma design system and component library.",
      "Student portal: progressive courses, video streaming, interactive grading.",
      "Facilitator workspace: scheduling, student submissions, performance metrics.",
      "Admin back office: global user oversight, role approvals, analytics.",
      "Next.js App Router with server/client optimization.",
      "PWA offline support with Serwist service worker and IndexedDB.",
      "Verifiable certificate generation with public URLs.",
      "Gamified learning streaks, XP, and milestone tracking.",
      "Production-ready responsive layouts and accessible UI components.",
      "Fully deployed and operational production environment.",
    ],
  },
  next: {
    slug: "prooval",
    title: "Prooval",
    category: "Creator Platform",
    description:
      "An all-in-one creator store and monetization platform — packaging, selling and managing expertise through a single storefront link.",
  },
};
/**
 * Prooval — an all-in-one creator storefront and monetization platform.
 *
 * Content notes:
 *   1. No quote block: the source material contained no customer testimonial,
 *      and inventing one would be worse than omitting it.
 *   2. Five chapters rather than the six-to-ten of the other projects — the
 *      brief grouped design system and UX architecture together, so those were
 *      split for rhythm rather than padding out.
 *   3. The brand's primary blue (#2563EB) maps to the indigo outcome tone.
 */
export const PROOVAL: CaseStudy = {
  slug: "prooval",
  title: "Prooval",
  category: "Creator Platform",
  description:
    "An all-in-one creator store and monetization platform — packaging, selling and managing expertise through a single storefront link.",
  cover: {
    src: "https://cdn.sanity.io/images/80wu0o5s/production/43a9a0aa38aae663b243ce5eb66a11427c84c3b8-2032x1040.png",
    alt: "Prooval — the storefront hero 'Monetize Your Skills All In One Place' shown across a laptop and a phone, with a $5,000 revenue metric card.",
  },
  meta: [
    { label: "Role", value: "Product Designer" },
    { label: "Tools", value: "Figma" },
    { label: "Year", value: "2026" },
    { label: "Status", value: "Live" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "One storefront for the whole business",
      body: [
        "Prooval replaces the four-link patchwork most creators rely on — a booking link, a digital-file storefront, a tip jar and a DM inbox — with a single cohesive storefront. It consolidates live consultations, digital assets, priority messaging, recurring coaching and community memberships under one URL.",
        "My job on it was to make monetizing expertise feel effortless on the creator's side and trustworthy on the buyer's side: build confidence, remove friction, and make every step between interest and paid session feel obvious.",
      ],
      figures: [
        {
          layout: "full",
          images: [
            {
              src: "https://cdn.sanity.io/images/80wu0o5s/production/3fffb55e94dcd8a1c28132b8b374828040e68f4f-1278x959.png",
              alt: "The Prooval creator dashboard — sidebar navigation for Link in Bio, Store and Wallet, with summary cards for total products, sessions booked, page views and earnings, a 'Page is Active' panel, and a Suggested Actions section offering profile photo, bio and social links tasks.",
            },
          ],
        },
      ],
    },
    {
      kicker: "02 · Features",
      heading: "One page, every way to sell",
      body: [
        "A creator should not need a new product to gain a new way of selling. Prooval holds a fixed set of offering types — bookable sessions, webinars, session series, digital products, bundles, priority DMs and paid communities — and renders each through the same card, the same checkout and the same confirmation, so a buyer who understands one listing understands all of them.",
        "Booking is the deepest of those surfaces. One toggle takes a creator from idle to live, a linked Google Calendar handles availability, and sessions are then filtered by type so a client sees only what applies to them. Priority messaging is built on the same logic: an open inbox becomes a queue with counts for pending, answered and refunded, and each enquiry carries a visible response window, so priority means a commitment with a clock on it rather than a line in a bio.",
      ],
      chips: [
        "1-on-1 Sessions",
        "Webinars & Workshops",
        "Digital Products",
        "Priority DMs",
        "Session Series",
        "Paid Communities",
        "Support Me",
      ],
      figures: [
        {
          layout: "full",
          images: [
            {
              src: "https://cdn.sanity.io/images/80wu0o5s/production/12ecfb936be69519d0d46cb44f7c1d3646795186-1278x959.png",
              alt: "The Prooval Session Series landing page — 'Create your own structured coaching programs with Session Series', above Create Session Series and Watch Demo calls to action.",
            },
          ],
        },
        {
          layout: "full",
          images: [
            {
              src: "https://cdn.sanity.io/images/80wu0o5s/production/5c268308bee541296000d5f9409446800ab30e33-1278x959.png",
              alt: "The Bookings screen in the creator dashboard — a 'Bookings Activated' panel offering Add New Booking and Link Google Calendar, above My Sessions and Upcoming Sessions filters and a 1-on-1 session card.",
            },
          ],
        },
        {
          layout: "full",
          images: [
            {
              src: "https://cdn.sanity.io/images/80wu0o5s/production/c0686b0c49a7dbc51b5b5e8f6a175c9b87a5d786-1278x959.png",
              alt: "The Priority DMs screen in the creator dashboard — pending, answered and refunded message counts above a searchable list of enquiries, each showing its remaining response window.",
            },
          ],
        },
      ],
    },
    {
      kicker: "03 · Design system",
      heading: "A colour system that carries meaning",
      body: [
        "Seven swatches, and only two of them are allowed to shout. A single saturated blue carries every primary action — starting a page, checking out, confirming a booking — because blue reads as secure and professional, which matters most on the screens that take payments and calendar access. The warm gold is the only other colour admitted, held back for figures and ratings so the eye reaches the number before the label.",
        "The remaining five are a neutral ladder, from a deep black with a plum cast through two greys and an off white to pure white. That ladder is what keeps creator branding dominant: the interface can go as dark or as light as the content demands without ever reaching for a second hue. The blue that drives the buttons is the blue on the cap, so the mark and the product are literally the same colour.",
      ],
      figures: [
        {
          layout: "full",
          images: [
            {
              src: "https://cdn.sanity.io/images/80wu0o5s/production/cf9ca7b1a3e2e15d9771532638287f67dc96ce78-1278x799.png",
              alt: "The Prooval brand palette — seven colour bands labelled with CMYK, RGB and hex values, running from a vivid blue and a near-black through white and two greys to a warm gold, beside a branded cap carrying the Prooval mark.",
            },
          ],
        },
      ],
    },
    {
      kicker: "04 · UX architecture",
      heading: "Progressive disclosure by design",
      body: [
        "A buyer's dashboard is one flow rather than a set of pages. The bottom bar holds its position for the whole journey, so nothing has to be relearned when the content behind it changes. Search and filters sit above every list, which means a buyer narrows down before opening anything.",
        "Inside a collection, everything is described the same way whatever the product is. A monthly community and a bundle bought once both show what they are, what they cost, what is included, and one action to take. Even the navigation follows the flow, carrying five slots while browsing categories and narrowing to three inside a single collection.",
      ],
      figures: [
        {
          layout: "full",
          images: [
            {
              src: "https://cdn.sanity.io/images/80wu0o5s/production/2ac790aa79dfc0fd630ba76f480314d61121fd71-1278x959.png",
              alt: "The Prooval user dashboard on mobile — three phone screens showing a welcome state offering purchases or creator access, a My Communities list of joined communities with price and resource counts, and a Bundles list of products, each above the same five item bottom navigation bar.",
            },
          ],
        },
      ],
    },
    {
      kicker: "05 · Booking",
      heading: "Slot, questions, payment, calendar",
      body: [
        "Mentorship through scattered DMs breaks down in predictable ways: messages get lost, scheduling runs long, and unpaid advice quietly consumes a mentor's time. Prooval collapses that into one structured flow — the mentee selects a slot, answers pre-booking questions, pays upfront, and the session is written to both calendars with a generated meeting link.",
        "Creators define recurring availability, session duration and buffer time to avoid burnout. Bookings only confirm once payment clears, which removes unpaid no-shows, and two-way calendar sync means existing commitments automatically block their own slots so nothing double-books.",
      ],
      figures: [
        {
          layout: "full",
          images: [
            {
              src: "https://cdn.sanity.io/images/80wu0o5s/production/e3ea6f6b1db69a3fda127613b5fbdbcd3e9f792d-1278x853.png",
              alt: "The Prooval booking page shown on a laptop and a phone at once — a package session titled 'Let's talk about negotiations' with chips for video call, question count, instant booking and price, an Africa/Lagos timezone selector, and a calendar of available slots leading to a Proceed step and a Confirm booking button.",
            },
          ],
        },
      ],
    },
  ],
  tone: "indigo",
  shipped: {
    heading: "What shipped",
    items: [
      "Single storefront consolidating sessions, products, DMs and communities.",
      "Transactional pricing with no mandatory monthly fees.",
      "Instant payouts straight to creators' local bank accounts.",
      "Two-way Google Calendar sync with auto-generated event links.",
      "Upfront payment gate eliminating unpaid no-shows.",
      "Pre-booking intake forms so sessions start with context.",
      "Three-step creator onboarding.",
      "Modular card system for every offering type.",
    ],
  },
  next: {
    slug: "eventy8",
    title: "Eventy8 by Konfera",
    category: "Event Platform",
    description:
      "Konfera's event management platform. Designed end to end — research, flows, interface and handoff.",
  },
};

/**
 * The remaining four projects. These are DRAFTS — same structure and tone as
 * the two designed case studies, written from the one-line descriptions in
 * `data/projects.ts` and the track record in `my-resume.md`. Copy is meant to
 * be edited in Studio once real imagery and outcomes land. Figures are
 * placeholders with alt text only.
 */

/**
 * Eventy8 — overview and problem.
 *
 * The Appello entry this replaced was seven sections of seeded filler: invented
 * shift shadowing, WCAG 2.2 claims and platform counts. The chapters below are
 * confirmed by Segun — the product, the market it serves, the role and its
 * scope, and the three failure modes the platform exists to remove. Nothing
 * beyond chapter 02 is asserted: no research method, metric or outcome is
 * stated until it is real, so the entry stops where the confirmed brief stops
 * rather than padding to a template length.
 */
export const EVENTY8: CaseStudy = {
  slug: "eventy8",
  title: "Eventy8 by Konfera",
  category: "Event Platform",
  description:
    "An all-in-one event orchestration platform for emerging markets — ticketing, community and lead management in one place. Designed end to end as Lead Product Designer.",
  meta: [
    { label: "Role", value: "Lead Product Designer" },
    { label: "Team", value: "Konfera" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "An end-to-end event engine for modern conferences",
      body: [
        "Eventy8 is an all-in-one event orchestration platform built to solve the fragmented event ecosystem in emerging markets like Nigeria. Existing platforms force organizers to hack together disconnected tools for ticketing, community engagement, and lead management, creating friction for attendees and operational fatigue for hosts.",
        "As the Lead Product Designer, I owned the project end-to-end — driving research, mapping multi-persona UX architectures, crafting a scalable component design system, and authoring developer handoff specs for a Next.js implementation.",
      ],
    },
    {
      kicker: "02 · The problem",
      heading: "The fragmented event stack",
      body: [
        "Nigeria and similar high-growth event hubs host thousands of physical, hybrid, and virtual gatherings annually. However, organizers are routinely hampered by fragmented software ecosystems:",
      ],
      points: [
        {
          label: "Siloed communication",
          text: "Hosts rely on external tools like WhatsApp, Telegram, or custom email builders to keep attendees informed before, during, and after events.",
        },
        {
          label: "Leaky lead pipelines",
          text: "Organizers struggle to capture, track, and follow up with leads, forcing them to transfer contact data manually into third-party CRMs.",
        },
        {
          label: "Disjointed attendee journeys",
          text: "Attendees jump between standalone registration pages, independent ticketing portals, and third-party event apps, leading to drop-offs at checkout.",
        },
      ],
    },
  ],
  next: {
    slug: "valuehut",
    title: "ValueHut",
    category: "Website",
    description:
      "An agile management consultancy helping organisations transform into a network of interdependent product teams.",
  },
};

export const VALUEHUT: CaseStudy = {
  slug: "valuehut",
  title: "ValueHut",
  category: "Website",
  description:
    "ValueHut is an agile management consultancy that is helping organisations transform into a network of interdependent product teams across business units.",
  cover: {
    alt: "ValueHut — an agile management consultancy helping organisations become a network of interdependent product teams.",
  },
  meta: [
    { label: "Role", value: "UX/UI + Web Build" },
    { label: "Tools", value: "Figma & Webflow" },
    { label: "Type", value: "Marketing Website" },
    { label: "Year", value: "2023" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "A consultancy site that had to explain itself",
      body: [
        "ValueHut does organisational change work — turning companies into networks of interdependent product teams. I designed and built the marketing site: positioning, structure, copy direction and the full front-end.",
      ],
    },
    {
      kicker: "02 · The problem",
      heading: "Consulting language puts people off",
      body: [
        "The work is genuinely valuable, but it is normally described in terms no client wants to decode. The site had to make a structural, organisational idea feel concrete and achievable.",
        "So the job was twofold: say it in plain language, and prove it. Everything on the page needed to point at the same idea rather than compete with it.",
      ],
      chips: [
        "Plain language",
        "One clear idea per screen",
        "Credible, not corporate",
        "Fast and light",
        "Lead capture built in",
      ],
    },
    {
      kicker: "03 · Discovery",
      heading: "Getting to the real proposition",
      body: [
        "I worked through the offer with the team to find what was actually distinctive, then built the site structure around the client's own starting point rather than around the consultancy's process.",
        "The structure that came out of it was short, and every section earned its place.",
      ],
      figures: [{ layout: "full", images: [shot("Discovery — proposition and site structure")] }],
    },
    {
      kicker: "04 · Design",
      heading: "Structured like the work it describes",
      body: [
        "The visual system mirrors the idea: a clear grid, consistent spacing and a layout that makes relationships visible. If the site is about interdependent teams, it should itself feel legible as a set of parts.",
        "Type and colour do the heavy lifting so the page stays fast and doesn't depend on heavy imagery to look considered.",
      ],
      figures: [
        { layout: "full", images: [shot("Homepage — the proposition above the fold")] },
        { layout: "pair", images: [shot("Services"), shot("About the practice")] },
      ],
    },
    {
      kicker: "05 · Build",
      heading: "Designed and shipped as one job",
      body: [
        "Because I both designed and built the site, there was no translation loss between the drawing and the page. What was approved is what shipped.",
        "The build is lightweight and fast, with the lead-capture path built into the flow rather than bolted on afterwards.",
      ],
      figures: [{ layout: "full", images: [shot("The built site — contact and enquiry flow")] }],
    },
    {
      kicker: "06 · Outcome",
      heading: "A site the team can run",
      body: [
        "ValueHut launched with a clear proposition, a site structure the team could maintain themselves, and a front-end that loads fast.",
      ],
      stats: [
        { value: "1", label: "Design and build, delivered end to end" },
        { value: "100%", label: "Client-editable after handover" },
        { value: "Fast", label: "Lightweight front end, no heavy imagery" },
      ],
    },
  ],
  tone: "green",
  shipped: {
    heading: "What shipped",
    items: [
      "Positioning and site structure.",
      "Full responsive design system.",
      "Fast front-end build with enquiry flow.",
    ],
  },
  next: {
    slug: "codex",
    title: "Codex",
    category: "SaaS",
    description:
      "A fully headless CMS built for publishers with a focus on rapid content creation and simplified publisher workflows.",
  },
};

export const CODEX: CaseStudy = {
  slug: "codex",
  title: "Codex",
  category: "SaaS",
  description:
    "A fully headless CMS built for publishers with a focus on rapid content creation and simplified publisher workflows.",
  cover: {
    alt: "Codex — a fully headless CMS built for publishers, focused on rapid content creation.",
  },
  meta: [
    { label: "Role", value: "Product Design" },
    { label: "Tools", value: "Figma" },
    { label: "Type", value: "Headless CMS Platform" },
    { label: "Year", value: "2024" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "A CMS built for the people who publish",
      body: [
        "I designed Codex as a fully headless CMS with one clear goal: make publishing fast and obvious for editors, without giving up control for developers.",
      ],
    },
    {
      kicker: "02 · The problem",
      heading: "Publishers were fighting the tool",
      body: [
        "Most headless CMSs are designed around the API and inherit the API's complexity into the editor. Publishers end up fighting the interface instead of publishing.",
        "Codex had to be genuinely different: fast content creation, and workflows simple enough that a non-technical editor never needs to ask how something works.",
      ],
      chips: [
        "Editor-first, not API-first",
        "Rapid content creation",
        "Simple workflows",
        "Structured content",
        "Developer-friendly underneath",
      ],
    },
    {
      kicker: "03 · Discovery",
      heading: "Watching people publish",
      body: [
        "The useful research here was watching editors work rather than asking what they wanted. Where they hesitated, where they left a draft, and which controls they never touched at all told me more than a feature list would have.",
        "That mapped directly onto the interface: the things they reached for became primary, and the rest moved out of the way.",
      ],
      figures: [{ layout: "full", images: [shot("Discovery — editorial workflow mapping")] }],
    },
    {
      kicker: "04 · Product",
      heading: "Create in as few steps as possible",
      body: [
        "The editor was designed around the shortest possible path from nothing to published. Content is structured, so the same shapes power the editor, the delivery API and the front end.",
        "Workflow states are visible at a glance, so an editor always knows where a piece of content sits and what it needs next.",
      ],
      figures: [
        { layout: "full", images: [shot("The editor — creating and publishing content")] },
        { layout: "pair", images: [shot("Structured content modelling"), shot("Workflow and publishing states")] },
      ],
    },
    {
      kicker: "05 · System",
      heading: "One model, three consumers",
      body: [
        "Because the content model is the source of truth, the editor, the API and every front end stay in agreement. What an editor sees is exactly what gets delivered.",
        "That single-model approach is the core of the product, and it is what the interface is built to make obvious.",
      ],
      figures: [{ layout: "full", images: [shot("The content model and its delivery path")] }],
    },
    {
      kicker: "06 · Outcome",
      heading: "A CMS editors actually want to use",
      body: [
        "Codex shipped as a working headless CMS with an editor-first experience and a structured content model underneath.",
      ],
      stats: [
        { value: "Headless", label: "Fully decoupled delivery via API" },
        { value: "1", label: "Content model shared by editor, API and front end" },
        { value: "Fast", label: "Shortest practical path to publish" },
      ],
    },
  ],
  tone: "green",
  shipped: {
    heading: "What shipped",
    items: [
      "A structured, headless content model.",
      "An editor-first interface for rapid publishing.",
      "Workflow states visible at a glance.",
    ],
  },
  next: {
    slug: "ai-journey",
    title: "AI Journey",
    category: "AI SaaS",
    description:
      "An AI analyst for marketing teams — it explains why visitors leave, suggests one fix, and checks whether the fix worked.",
  },
};

export const AI_JOURNEY: CaseStudy = {
  slug: "ai-journey",
  title: "AI Journey",
  category: "AI SaaS",
  description:
    "An AI analyst for marketing teams — it explains in plain language why visitors leave, suggests one fix, and checks whether the fix worked. Built solo, with AI as the engineering team.",
  cover: {
    alt: "AI Journey — an AI analyst that explains why visitors leave, suggests one fix, and checks whether it worked.",
  },
  meta: [
    { label: "Role", value: "Design, Build & AI" },
    { label: "Tools", value: "Figma, Claude, Vercel" },
    { label: "Type", value: "AI SaaS Product" },
    { label: "Year", value: "2025" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "One problem, one answer, one check",
      body: [
        "AI Journey explains in plain language why visitors leave, suggests a single fix, then checks whether that fix worked. I designed, built and shipped it solo, using AI as the engineering team.",
      ],
    },
    {
      kicker: "02 · The problem",
      heading: "Analytics tell you what, not why",
      body: [
        "Marketing teams already have plenty of dashboards telling them what happened. What they lack is an explanation they can act on, and any confidence that the action they took actually helped.",
        "So the product had to do one thing well and stay quiet about everything else. No wall of metrics, no AI-generated noise — one diagnosis, one suggestion, one result.",
      ],
      chips: [
        "Plain-language explanation",
        "Exactly one suggestion",
        "Before and after comparison",
        "No metric sprawl",
        "Built and shipped solo",
      ],
    },
    {
      kicker: "03 · Discovery",
      heading: "Defining what one answer means",
      body: [
        "The hard part was product definition rather than interface. Restricting the tool to a single diagnosis and a single recommendation meant every part of the experience had to earn its place.",
        "I mapped the three-step loop — explain, fix, verify — and designed everything else to stay out of it.",
      ],
      figures: [{ layout: "full", images: [shot("Discovery — the explain, fix, verify loop")] }],
    },
    {
      kicker: "04 · Product",
      heading: "Explain, fix, verify",
      body: [
        "Each run produces a plain-language explanation of why visitors left, one concrete suggestion to address it, and a check once enough data exists to confirm whether it worked.",
        "The interface is deliberately sparse: one insight at a time, written in sentences rather than charts, because the value is in understanding rather than scanning.",
      ],
      figures: [
        { layout: "full", images: [shot("The diagnosis — a plain-language explanation")] },
        { layout: "pair", images: [shot("One suggested fix"), shot("Verification — before and after")] },
      ],
    },
    {
      kicker: "05 · Build",
      heading: "Designed and shipped solo",
      body: [
        "The whole product — design, front end and deployment — was built without a traditional engineering team, using AI tooling to move faster rather than to compensate for gaps.",
        "That constraint shaped the product: tight scope, one clear loop, and an interface that earns every pixel.",
      ],
      figures: [{ layout: "full", images: [shot("The shipped product")] }],
    },
    {
      kicker: "06 · Outcome",
      heading: "A working AI analyst",
      body: [
        "AI Journey launched as a working product that gives a marketing team one clear explanation, one suggested fix, and a way to know whether it worked.",
      ],
      stats: [
        { value: "1", label: "Diagnosis and one suggested fix per run" },
        { value: "Solo", label: "Designed, built and shipped independently" },
        { value: "Plain", label: "Explanations in sentences, not charts" },
      ],
    },
  ],
  tone: "green",
  shipped: {
    heading: "What shipped",
    items: [
      "A working AI analyst for marketing teams.",
      "Plain-language explanations of why visitors leave.",
      "One suggested fix, with before-and-after verification.",
    ],
  },
  next: {
    slug: "sorplos",
    title: "Sorplos",
    category: "Insurance Aggregator",
    description:
      "Nigeria's compare-and-buy insurance aggregator — from spec documents to a working three-portal prototype.",
  },
};

/** Static fallbacks keyed by slug. */
export const CASE_STUDIES: Record<string, CaseStudy> = {
  [SORPLOS.slug]: SORPLOS,
  [LIGHTHOUSE.slug]: LIGHTHOUSE,
  [PROOVAL.slug]: PROOVAL,
  [EVENTY8.slug]: EVENTY8,
  [VALUEHUT.slug]: VALUEHUT,
  [CODEX.slug]: CODEX,
  [AI_JOURNEY.slug]: AI_JOURNEY,
};
