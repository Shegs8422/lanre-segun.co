import { defineField, defineType } from "sanity";

/* ── Case study building blocks ────────────────────────────────────────────
   One project document = one case study. `sections` is an ordered array:
   each chapter owns the figures that follow it, so the page renders as a
   single top-to-bottom loop with conditionals. Figures come in exactly the
   three layouts the design uses — full width, pair, triptych — and each
   pins `layout` so the GROQ side can discriminate on _type unambiguously.
   Everything below `cover`/`meta` is optional, so existing project
   documents keep validating untouched. */

export const caseStudyImage = defineType({
  name: "caseStudyImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: { select: { title: "alt", media: "image" } },
});

export const caseStudyFigureFull = defineType({
  name: "caseStudyFigureFull",
  title: "Figure — Full width",
  type: "object",
  fields: [
    defineField({
      name: "layout", type: "string", readOnly: true,
      initialValue: "full", validation: (r) => r.required(),
    }),
    defineField({ name: "image", type: "caseStudyImage", validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: { select: { title: "image.alt", media: "image.image" } },
});

export const caseStudyFigurePair = defineType({
  name: "caseStudyFigurePair",
  title: "Figure — Pair",
  type: "object",
  fields: [
    defineField({
      name: "layout", type: "string", readOnly: true,
      initialValue: "pair", validation: (r) => r.required(),
    }),
    defineField({
      name: "images", title: "Images", type: "array",
      of: [{ type: "caseStudyImage" }],
      validation: (r) => r.required().min(2).max(2),
    }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: {
    select: { title: "caption", media: "images.0.image" },
    prepare: ({ title, media }) => ({ title: title || "Pair", subtitle: "2 images", media }),
  },
});

export const caseStudyFigureTriptych = defineType({
  name: "caseStudyFigureTriptych",
  title: "Figure — Triptych",
  type: "object",
  fields: [
    defineField({
      name: "layout", type: "string", readOnly: true,
      initialValue: "triptych", validation: (r) => r.required(),
    }),
    defineField({
      name: "images", title: "Images", type: "array",
      of: [{ type: "caseStudyImage" }],
      validation: (r) => r.required().min(3).max(3),
    }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: {
    select: { title: "caption", media: "images.0.image" },
    prepare: ({ title, media }) => ({ title: title || "Triptych", subtitle: "3 images", media }),
  },
});

export const caseStudyMeta = defineType({
  name: "caseStudyMeta",
  title: "Meta item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link (optional)", type: "url" }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const caseStudyStat = defineType({
  name: "caseStudyStat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const caseStudyQuote = defineType({
  name: "caseStudyQuote",
  title: "Quote",
  type: "object",
  fields: [
    defineField({ name: "text", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "cite", type: "string" }),
  ],
  preview: { select: { title: "cite", subtitle: "text" } },
});

export const caseStudyShipped = defineType({
  name: "caseStudyShipped",
  title: "What shipped",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "items", title: "Items", type: "array",
      of: [{ type: "string" }], validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { title: "heading" } },
});

/**
 * Per-project accent for the outcome blocks (stat values and the ↳ glyph).
 * Each project picks this up to match its brand primary — green for Lighthouse
 * Academy, indigo for Prooval. Kept as a token reference rather than a free
 * colour so the palette stays closed.
 */
export const caseStudyTone = defineType({
  name: "caseStudyTone",
  title: "Outcome tone",
  type: "object",
  fields: [
    defineField({
      name: "tone", type: "string",
      options: {
        list: [
          { title: "Green", value: "green" },
          { title: "Indigo", value: "indigo" },
        ],
        layout: "radio",
      },
      initialValue: "green",
      validation: (r) => r.required(),
    }),
  ],
});

export const caseStudySection = defineType({
  name: "caseStudySection",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "kicker", title: "Kicker", type: "string",
      description: 'e.g. "01 · Overview"',
      validation: (r) => r.required(),
    }),
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "body", title: "Body", type: "array",
      description: "One item per paragraph.",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "chips", title: "Tags", type: "array",
      description: "Optional pill list under the body.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "figures", title: "Figures", type: "array",
      of: [
        { type: "caseStudyFigureFull" },
        { type: "caseStudyFigurePair" },
        { type: "caseStudyFigureTriptych" },
      ],
    }),
    defineField({
      name: "stats", title: "Stats", type: "array",
      of: [{ type: "caseStudyStat" }],
    }),
    defineField({ name: "quote", type: "caseStudyQuote" }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "kicker",
      media: "figures.0.image.image",
      pairMedia: "figures.0.images.0.image",
    },
    prepare: ({ title, subtitle, media, pairMedia }) => ({
      title, subtitle, media: media ?? pairMedia,
    }),
  },
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required(), group: "overview" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required(), group: "overview" }),
    defineField({ name: "category", type: "string", validation: (r) => r.required(), group: "overview" }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required(), group: "overview" }),
    defineField({ name: "order", type: "number", initialValue: 0, group: "overview" }),

    defineField({
      name: "cover", type: "caseStudyImage",
      description: "Hero image, full-bleed under the title block.",
      group: "hero",
    }),
    defineField({
      name: "meta", title: "Meta strip", type: "array",
      description: "Role · Tools · Year · Live. Add a link to render it as an external URL.",
      of: [{ type: "caseStudyMeta" }], group: "hero",
    }),

    defineField({
      name: "sections", title: "Sections", type: "array",
      description: "Top-to-bottom case study flow: chapter, then the figures that follow it.",
      of: [{ type: "caseStudySection" }], group: "caseStudy",
    }),
    defineField({
      name: "shipped", title: "What shipped", type: "caseStudyShipped",
      description: "Closing summary. Sits below the last section, full width.",
      group: "caseStudy",
    }),
    defineField({
      name: "outcomeTone", title: "Outcome tone", type: "caseStudyTone",
      description: "Accent colour for the stat values and the ↳ glyph.",
      group: "caseStudy",
    }),
    defineField({
      name: "nextProject", title: "Next case study", type: "reference",
      to: [{ type: "project" }],
      group: "caseStudy",
      validation: (r, context) =>
        r.custom((value) =>
          value?._ref === context?.document?._id
            ? "A project cannot be its own next case study."
            : true,
        ),
    }),
  ],
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "hero", title: "Hero" },
    { name: "caseStudy", title: "Case study" },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "cover.image" } },
});

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    defineField({ name: "team", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "team", subtitle: "role" } },
});

export const track = defineType({
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    defineField({ name: "trackId", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "years", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "title", subtitle: "years" } },
});

export const tool = defineType({
  name: "tool",
  title: "Tool",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

export const cert = defineType({
  name: "cert",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

export const profilePhoto = defineType({
  name: "profilePhoto",
  title: "Profile Photo",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "alt", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "label", media: "image" } },
});
