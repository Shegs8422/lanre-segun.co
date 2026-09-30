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
  projects: `*[_type == "project"] | order(order asc) { "slug": slug.current, title, category, description }`,
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
  siteCopy: `*[_type == "siteCopy"] | order(_createdAt asc)[0]{ contactEmail, location }`,
};
