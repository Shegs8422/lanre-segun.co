export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "sorplos",
    title: "Sorplos",
    category: "Insurance Aggregator",
    description:
      "Sorplos is Nigeria's compare-and-buy insurance aggregator — taken from spec documents to a working three-portal prototype.",
  },
  {
    slug: "lighthouse-academy",
    title: "Lighthouse Academy",
    category: "Learning Platform",
    description:
      "Lighthouse Academy is a full-stack learning platform for the interactive age — student portal, facilitator dashboard and admin back office.",
  },
  {
    slug: "prooval",
    title: "Prooval",
    category: "Creator Platform",
    description:
      "Prooval is an all-in-one creator store and monetization platform — one storefront link for sessions, digital products, priority messaging and memberships.",
  },
  {
    slug: "appello",
    title: "Appello",
    category: "Mobile App",
    description:
      "Appello is a mobile app, designed to enable field-based responders to provide assistance wherever it is needed, primarily for people who live alone.",
  },
  {
    slug: "valuehut",
    title: "ValueHut",
    category: "Website",
    description:
      "ValueHut is an agile management consultancy that is helping organisations transform into a network of interdependent product teams across business units.",
  },
  {
    slug: "codex",
    title: "Codex",
    category: "SaaS",
    description:
      "A fully headless CMS built for publishers with a focus on rapid content creation and simplified publisher workflows.",
  },
  {
    slug: "ai-journey",
    title: "AI Journey",
    category: "AI SaaS",
    description:
      "An AI analyst for marketing teams — it explains in plain language why visitors leave, suggests one fix, and checks whether the fix worked. Built solo, with AI as the engineering team.",
  },
];
