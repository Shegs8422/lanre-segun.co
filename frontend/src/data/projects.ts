export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** Card image on the work index (hover preview + mobile). Falls back to a
   *  labelled placeholder when the project has no cover in the CMS. */
  cover?: string;
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
    cover:
      "https://cdn.sanity.io/images/80wu0o5s/production/9577129669b983f1b6543bacf66e9c8f74aca667-2032x1040.png",
  },
  {
    slug: "prooval",
    title: "Prooval",
    category: "Creator Platform",
    description:
      "Prooval is an all-in-one creator store and monetization platform — one storefront link for sessions, digital products, priority messaging and memberships.",
    cover:
      "https://cdn.sanity.io/images/80wu0o5s/production/43a9a0aa38aae663b243ce5eb66a11427c84c3b8-2032x1040.png",
  },
  {
    slug: "eventy8",
    title: "Eventy8 by Konfera",
    category: "Event Platform",
    description:
      "Eventy8 is Konfera's event management platform. I joined as the product designer and took it end to end — research, flows, interface and handoff.",
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
