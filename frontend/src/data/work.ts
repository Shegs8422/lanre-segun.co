/** Verified work history, newest → current order reversed: latest first. */
export type Job = {
  team: string;
  role: string;
  body: string;
};

export const JOBS: Job[] = [
  {
    team: "Eureka",
    role: "Senior Product Designer",
    body: "Leading design for Sorplos — an insurance aggregator in Nigeria, built in London.",
  },
  {
    team: "Lighthouse Academy",
    role: "Design Engineer",
    body: "Online tech learning platform connecting students with Africa's top mentors.",
  },
  {
    team: "KETA App",
    role: "Web3 Product Designer",
    body: "High-compliance P2P exchange interface; shipped a full mobile UI pack in a 4-week sprint.",
  },
  {
    team: "Grazac",
    role: "Product Design Intern",
    body: "Design systems and accessible dashboards; UX roadmaps for C-suite stakeholders.",
  },
  {
    team: "Konfera",
    role: "Product Designer",
    body: "Eventy8 — end-to-end product design for an event management platform, from research through to handoff.",
  },
  {
    team: "Freelancing",
    role: "Lead Freelance Product Designer",
    body: "15+ global clients — e-commerce, SaaS and native mobile apps.",
  },
];
