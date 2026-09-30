export type Track = {
  id: string;
  title: string;
  years: string;
  body: string;
};

export const TRACKS: Track[] = [
  {
    id: "product",
    title: "Product Design",
    years: "5+ YEARS",
    body: "Most aspects of design and business, end-to-end, while shipping a product.",
  },
  {
    id: "ai",
    title: "AI Workflow",
    years: "3+ YEARS",
    body: "The loop between people and agents — prompts, tools and guardrails that ship.",
  },
  {
    id: "system",
    title: "Design Systems",
    years: "5+ YEARS",
    body: "Systems that grow with the team and the product — tokens, components, docs.",
  },
];
