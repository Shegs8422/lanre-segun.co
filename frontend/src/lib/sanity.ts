import { createClient, type ClientConfig } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

/**
 * Sanity content lake — single source of truth for site content.
 * Requires VITE_SANITY_PROJECT_ID (see .env); sections render empty
 * until their queries resolve, so every consumer must handle [] / null.
 */

const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined) || "";
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";
const apiVersion = "2025-01-01";

export const sanityConfigured = projectId.length > 0;

const config: ClientConfig = {
  projectId: projectId || "missing",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
};

export const sanity = createClient(config);

const builder = createImageUrlBuilder(sanity);

export function sanityImage(src: SanityImageSource | undefined, width = 240) {
  if (!src) return undefined;
  try {
    return builder.image(src).width(width).auto("format").url();
  } catch {
    return undefined;
  }
}

export const QUERIES = {
  projects: `*[_type == "project"] | order(order asc) {
    "slug": slug.current, title, category, description, "cover": cover.image.asset->url
  }`,
  jobs: `*[_type == "job"] | order(order asc) { team, role, body }`,
  tracks: `*[_type == "track"] | order(order asc) { "id": trackId, title, years, body }`,
  tools: `*[_type == "tool"] | order(order asc) { name, "src": logo.asset->url }`,
  certs: `*[_type == "cert"] | order(order asc) { name, "src": logo.asset->url }`,
  boards: `*[_type == "board"] | order(order asc) {
    "id": boardId, crumb, canvasTag, canvasMeta, sidebarTitle, sidebarSub, tools,
    flow, edges, cards, stickies, stageLabels, terminal, tryCmd, opened, stub
  }`,
  aiBuilds: `*[_type == "aiBuild"] | order(order asc) {
    "id": buildId, buildId, name, meta, crumb, canvasTitle, canvasMeta, purpose, stack,
    steps, stats, tags, terminal, tryCmd, aliases, tagGroups
  }`,
  photos: `*[_type == "profilePhoto"] | order(order asc) { label, alt, "src": image.asset->url }`,
  siteCopy: `*[_type == "siteCopy"] | order(_createdAt asc)[0]{ contactEmail, location }`,
};

/**
 * Full case study for one project. Figure variants are normalised onto a
 * single `images[]` array with a `layout` discriminator, so the renderer can
 * treat full / pair / triptych uniformly instead of branching on _type.
 *
 * `caseStudyFigureFull` stores a singular `image`, not an array, so it needs
 * `[image]{...}` to wrap that one value into `images[]`. Without the brackets
 * the projection resolves to null and CaseFigure drops the figure entirely.
 */
export function caseStudyQuery(_slug: string) {
  const image = `{ "src": image.asset->url, alt, caption }`;
  return `*[_type == "project" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    category,
    description,
    cover{ "src": image.asset->url, alt, caption },
    meta[]{ label, value, href },
    sections[]{
      kicker,
      heading,
      body,
      chips,
      figures[]{
        _type == "caseStudyFigureFull" => { "layout": "full", caption, "images": [image]${image} },
        _type == "caseStudyFigurePair" => { "layout": "pair", caption, "images": images[]${image} },
        _type == "caseStudyFigureTriptych" => { "layout": "triptych", "images": images[]${image} }
      },
      stats[]{ value, label },
      quote{ text, cite }
    },
    shipped{ heading, items },
    "tone": outcomeTone.tone,
    "next": nextProject->{
      "slug": slug.current, title, category, description,
      "cover": cover.image.asset->url
    }
  }`;
}
