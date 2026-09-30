export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "mindpath",
    title: "MindPath",
    category: "Website and Web App",
    description:
      "MindPath is an online mental-health service in Ireland for adult ADHD & autism assessment — built from a name and a mission.",
  },
  {
    slug: "otee",
    title: "Otee",
    category: "Web and Mobile apps",
    description:
      "Otee is an online laundry service platform covering every part of the workflow — customer ordering, driver pickups, kiosk POS and full admin operations.",
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
