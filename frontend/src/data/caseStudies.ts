/**
 * Static case-study fallback. Mirrors the `project` document shape exactly so
 * the page renders identically whether Sanity is configured or not — swap in
 * the CMS and only the copy/images change. Copy transcribed from the MindPath
 * design (Figma 287:2071).
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

export type CaseSection = {
  kicker: string;
  heading: string;
  body: string[];
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
 * documents to a working three-portal prototype. Replaces MindPath as the
 * first project.
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
    alt: "Lighthouse Academy — a full-stack learning platform spanning a student portal, a facilitator dashboard and an admin back office.",
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
    slug: "otee",
    title: "Otee",
    category: "Web and Mobile apps",
    description: "A complete online laundry platform — five surfaces, one design system.",
  },
};
/**
 * Otee — Figma 289:3780. Structurally identical to MindPath (same hero, same
 * chapter band, same figure layouts) but with three differences worth noting,
 * because they are why the schema is shaped the way it is:
 *   1. No quote block at all — every outcome field is optional.
 *   2. Stat values are words ("Apps", "Web", "Kiosk"), not metrics, and the
 *      accent is indigo rather than green — hence `tone`.
 *   3. "What shipped" is document-level, not part of the last section.
 *   4. The fourth meta cell is "Type" with no link, vs MindPath's "Live".
 * Eight chapters instead of ten, and repeated kicker labels ("Discovery phase"
 * twice), so the kicker stays free text rather than a phase enum.
 */
export const OTEE: CaseStudy = {
  slug: "otee",
  title: "Otee",
  category: "Web and Mobile apps",
  description: "A complete online laundry platform — five surfaces, one design system.",
  cover: {
    alt: "Otee — a complete online laundry platform — five surfaces, one design system.",
  },
  meta: [
    { label: "Role", value: "Sole UX/UI Designer" },
    { label: "Tools", value: "Figma & FigJam" },
    { label: "Type", value: "Web · App · Kiosk" },
    { label: "Year", value: "2025 — 26" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "The whole product, first sketch to system",
      body: [
        "My role covered the whole product, from the first sketches to the bigger system thinking. I shaped the flows, built the component library, and made sure everything worked together. I was the only designer on the project, handling everything from UX to UI for the web app, mobile apps, and the dashboard.",
      ],
    },
    {
      kicker: "02 · Challenges",
      heading: "Five platforms, five audiences, one service",
      body: [
        "Design a multi-system online laundry platform while staying true to the brand identity and keeping the whole experience smooth. The main challenge was creating a seamless flow for different types of users, since we had to design five separate platforms for five different user groups.",
      ],
      chips: [
        "Design System",
        "Discovery phase and research",
        "Three mobile apps",
        "E-commerce website",
        "Official Dashboard",
        "Seamless handoff",
      ],
    },
    {
      kicker: "03 · Discovery phase",
      heading: "Research and sitemap",
      body: [
        "We started by studying the market and key competitors, just to understand where the real gaps were. From there, we shaped the first ideas and began outlining the requirements, the product structure, and all the pages the system would need.",
      ],
      figures: [{ layout: "full", images: [shot("Sitemap and product structure")] }],
    },
    {
      kicker: "04 · Discovery phase",
      heading: "The complete user flow",
      body: [
        "With the structure agreed, I mapped the complete flow across every surface — how an order moves from a customer booking it, to a driver collecting it, to a station processing it, and back again. Getting that end-to-end picture right is what keeps five separate products feeling like one service.",
      ],
      figures: [
        { layout: "full", images: [shot("The complete user flow, across all five surfaces")] },
      ],
    },
    {
      kicker: "05 · UX/UI design",
      heading: "Design exploration",
      body: [
        "We had to explore different directions, since each audience had different needs. We started by following the brand identity rules, then used that as a base to explore ideas for the website, the mobile app, and the dashboard.",
      ],
      figures: [
        { layout: "full", images: [shot("Design exploration across web, app and dashboard")] },
      ],
    },
    {
      kicker: "06 · Collaboration",
      heading: "Figma structure and collaboration",
      body: [
        "On projects like this, having a solid Figma structure is key. We had to collaborate with multiple developers, the product team, and stakeholders. To keep everything organized, we split the files by project and connected them through one unified design system.",
      ],
      figures: [
        {
          layout: "full",
          images: [shot("One file per surface, all connected through a single design system")],
        },
      ],
    },
    {
      kicker: "07 · Results",
      heading: "The final design",
      body: [
        "Three mobile apps, an e-commerce website, a kiosk POS and an operations dashboard — every surface drawn from the same system.",
      ],
      figures: [
        { layout: "full", images: [shot("The customer app in hand")] },
        {
          layout: "pair",
          images: [
            shot("Driver app — assigned tasks and routes"),
            shot("Account settings, light and dark"),
          ],
        },
        {
          layout: "pair",
          images: [
            shot("Driver app — earnings and payouts"),
            shot("Customer app — home, orders and order detail"),
          ],
        },
        { layout: "full", images: [shot("Station app — shift management and check-in")] },
        { layout: "full", images: [shot("QR handover at collection")] },
        { layout: "full", images: [shot("Website — “Otee laundry made simple, quick and easy”")] },
        { layout: "full", images: [shot("Website — a service page")] },
        {
          layout: "pair",
          images: [
            shot("Website — the customer landing page"),
            shot("Website — laundry services in three easy steps"),
          ],
        },
        { layout: "full", images: [shot("Otee for business — the B2B site")] },
        { layout: "full", images: [shot("The driver app on shift")] },
        {
          layout: "pair",
          images: [shot("Dashboard — the operations overview"), shot("Dashboard — stations")],
        },
        {
          layout: "pair",
          images: [
            shot("Dashboard — kiosk management"),
            shot("Dashboard — product inventory and support"),
          ],
        },
        { layout: "full", images: [shot("Kiosk — the POS order screen")] },
      ],
    },
    {
      kicker: "08 · Project results",
      heading: "A whole ecosystem, shipped",
      body: [
        "We’ve successfully designed the whole ecosystem for an online laundry platform, including three parts. The mobile apps, the website, and the dashboard for managing all services.",
      ],
      stats: [
        { value: "Apps", label: "Three mobile apps, each built for a different user" },
        { value: "Web", label: "Website with full marketing features and integrated e-commerce" },
        { value: "Kiosk", label: "POS-style interface design for every device" },
      ],
    },
  ],
  tone: "indigo",
  shipped: {
    heading: "What shipped",
    items: [
      "Three mobile apps for three users.",
      "Marketing site with e-commerce.",
      "POS-grade kiosk for every device.",
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
 * The remaining four projects. These are DRAFTS — same structure and tone as
 * the two designed case studies, written from the one-line descriptions in
 * `data/projects.ts` and the track record in `my-resume.md`. Copy is meant to
 * be edited in Studio once real imagery and outcomes land. Figures are
 * placeholders with alt text only.
 */

export const APPELLO: CaseStudy = {
  slug: "appello",
  title: "Appello",
  category: "Mobile App",
  description:
    "A mobile app, designed to enable field-based responders to provide assistance wherever it is needed, primarily for people who live alone.",
  cover: {
    alt: "Appello — a mobile app that lets field-based responders provide assistance wherever it is needed.",
  },
  meta: [
    { label: "Role", value: "UX/UI + Research" },
    { label: "Tools", value: "Figma & FigJam" },
    { label: "Platform", value: "iOS & Android" },
    { label: "Year", value: "2023 — 24" },
  ],
  sections: [
    {
      kicker: "01 · Overview",
      heading: "Help that arrives when it matters most",
      body: [
        "I designed Appello end-to-end — research, flows, interface and handoff. The result is a calm, fast mobile app built for responders in the field and the people who depend on them.",
      ],
    },
    {
      kicker: "02 · The problem",
      heading: "Built around the hardest moment",
      body: [
        "Appello is used primarily by people who live alone. When something goes wrong, the person is very often alone too, and the responder is on their own, without reliable context or a signal to work from.",
        "My job was to make that moment as simple as possible: fewer taps, clearer state, and a design that stays readable in bad light, low battery and high stress.",
      ],
      chips: [
        "Field-ready UX",
        "Fast under pressure",
        "Offline-tolerant",
        "Clear for older users",
        "Accessible by default",
      ],
    },
    {
      kicker: "03 · Discovery",
      heading: "Talking to the people in the field",
      body: [
        "I started with the responders, not the screens. Shadowing a few shifts showed where the existing process broke down and which details actually mattered versus which were noise.",
        "From that we shaped the structure: what a responder needs to know first, what can wait, and what must never be ambiguous.",
      ],
      figures: [{ layout: "full", images: [shot("Discovery — responder interviews and journey mapping")] }],
    },
    {
      kicker: "04 · The user",
      heading: "Two sides of the same call",
      body: [
        "There are two users in every interaction: the person who needs help, and the responder travelling to them. Both are on a phone, often moving, often under time pressure.",
        "I mapped both journeys together so the handoff between them stays consistent — the same names, the same status language, the same sense of what happens next.",
      ],
      figures: [
        { layout: "full", images: [shot("User types and the journeys between them")] },
      ],
    },
    {
      kicker: "05 · Product",
      heading: "Fast, legible, one-handed",
      body: [
        "The interface is designed to be used one-handed while moving. Large targets, a single clear action per screen, and status that can be understood at a glance rather than read.",
        "Accessibility was a requirement rather than a pass at the end: contrast, type size and focus order were all resolved against WCAG 2.2 AA as the flows were built.",
      ],
      figures: [
        { layout: "full", images: [shot("The responder app — the core call flow")] },
        {
          layout: "pair",
          images: [shot("Job list and live status"), shot("Visit detail and notes")],
        },
      ],
    },
    {
      kicker: "06 · Craft",
      heading: "Design system and handoff",
      body: [
        "Every screen was drawn from one shared component library, so behaviour stayed consistent across the app and the work was straightforward for engineering to pick up.",
        "I documented the system as I built it, which is what turned a set of screens into something the team could keep extending after handover.",
      ],
      figures: [
        { layout: "full", images: [shot("One component library, documented")] },
      ],
    },
    {
      kicker: "07 · Outcome",
      heading: "Ready for the field",
      body: [
        "Appello shipped as a complete, native-feeling mobile app on both platforms, with a design system the engineering team could build on.",
      ],
      stats: [
        { value: "2", label: "Platforms shipped — iOS and Android" },
        { value: "AA", label: "WCAG 2.2 AA contrast and focus order" },
        { value: "1", label: "Shared component library, documented" },
      ],
    },
  ],
  tone: "green",
  shipped: {
    heading: "What shipped",
    items: [
      "Research, flows and interface for the full responder journey.",
      "Native-quality app on iOS and Android.",
      "A documented design system for ongoing work.",
    ],
  },
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
    slug: "sorplos",
    title: "Sorplos",
    category: "Insurance Aggregator",
    description:
      "Nigeria's compare-and-buy insurance aggregator — from spec documents to a working three-portal prototype.",
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
};

/** Static fallbacks keyed by slug. */
export const CASE_STUDIES: Record<string, CaseStudy> = {
  [SORPLOS.slug]: SORPLOS,
  [LIGHTHOUSE.slug]: LIGHTHOUSE,
  [OTEE.slug]: OTEE,
  [APPELLO.slug]: APPELLO,
  [VALUEHUT.slug]: VALUEHUT,
  [CODEX.slug]: CODEX,
  [AI_JOURNEY.slug]: AI_JOURNEY,
};
