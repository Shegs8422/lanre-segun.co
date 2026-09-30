import { defineField, defineType } from "sanity";

const cardLine = defineField({
  name: "line",
  title: "Line",
  type: "object",
  fields: [
    defineField({
      name: "t",
      type: "string",
      options: { list: ["title", "cmd", "dot", "plain", "ok", "dim"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sub", type: "string" }),
  ],
  preview: { select: { title: "text", subtitle: "t" } },
});

export const board = defineType({
  name: "board",
  title: "Board",
  type: "document",
  fields: [
    defineField({ name: "boardId", type: "string", validation: (r) => r.required() }),
    defineField({ name: "crumb", type: "string", validation: (r) => r.required() }),
    defineField({ name: "canvasTag", type: "string" }),
    defineField({ name: "canvasMeta", type: "string" }),
    defineField({ name: "sidebarTitle", type: "string" }),
    defineField({ name: "sidebarSub", type: "string" }),
    defineField({ name: "tools", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "flow",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "kind", type: "string", options: { list: ["step", "diamond", "cta"] } },
            { name: "x", type: "number" },
            { name: "y", type: "number" },
            { name: "w", type: "number" },
            { name: "h", type: "number" },
            { name: "text", type: "string" },
            { name: "drift", type: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "edges",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "from", type: "string" },
            { name: "to", type: "string" },
            { name: "via", type: "string", options: { list: ["line", "elbow", "drop"] } },
            { name: "label", type: "string" },
            { name: "labelAt", type: "string", options: { list: ["start", "end"] } },
          ],
        },
      ],
    }),
    defineField({
      name: "cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "tag", type: "string" },
            { name: "x", type: "number" },
            { name: "y", type: "number" },
            { name: "w", type: "number" },
            { name: "lines", type: "array", of: [cardLine] },
            {
              name: "variants",
              title: "Alternate content sets",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "variantSet",
                  title: "Variant set",
                  fields: [{ name: "lines", type: "array", of: [cardLine] }],
                },
              ],
            },
            { name: "loopLines", type: "boolean", initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: "stickies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "x", type: "number" },
            { name: "y", type: "number" },
            { name: "w", type: "number" },
            { name: "text", type: "text" },
            { name: "tone", type: "string", options: { list: ["purple", "blue", "green"] } },
            { name: "tilt", type: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "stageLabels",
      type: "array",
      of: [{ type: "object", fields: [{ name: "x", type: "number" }, { name: "text", type: "string" }] }],
    }),
    defineField({ name: "terminal", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tryCmd", type: "string" }),
    defineField({ name: "opened", type: "string" }),
    defineField({ name: "stub", type: "string" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "boardId", subtitle: "crumb" } },
});

export const aiBuild = defineType({
  name: "aiBuild",
  title: "AI Build",
  type: "document",
  fields: [
    defineField({ name: "buildId", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "meta", type: "string" }),
    defineField({ name: "crumb", type: "string" }),
    defineField({ name: "canvasTitle", type: "string" }),
    defineField({ name: "canvasMeta", type: "string" }),
    defineField({ name: "purpose", type: "text", rows: 3 }),
    defineField({ name: "stack", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "num", type: "string" },
            { name: "title", type: "string" },
            { name: "desc", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [{ name: "big", type: "string" }, { name: "label", type: "string" }],
        },
      ],
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "terminal", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tryCmd", type: "string" }),
    defineField({ name: "aliases", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "tagGroups",
      type: "object",
      fields: [
        { name: "heading", type: "string" },
        {
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", type: "string" },
                { name: "count", type: "number" },
                { name: "unit", type: "string" },
              ],
            },
          ],
        },
        { name: "closer", type: "string" },
      ],
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "buildId" } },
});

export const siteCopy = defineType({
  name: "siteCopy",
  title: "Site Copy",
  type: "document",
  fields: [
    defineField({ name: "contactEmail", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "menuEmail", type: "string" }),
    defineField({
      name: "heroes",
      type: "object",
      fields: [
        { name: "homeTitleA", type: "string" },
        { name: "homeTitleB", type: "string" },
        { name: "homeSub", type: "text" },
        { name: "workTitleA", type: "string" },
        { name: "workTitleB", type: "string" },
        { name: "workSub", type: "text" },
        { name: "aiTitleA", type: "string" },
        { name: "aiTitleB", type: "string" },
        { name: "aiSub", type: "text" },
      ],
    }),
  ],
  preview: { select: { title: "contactEmail" } },
});
