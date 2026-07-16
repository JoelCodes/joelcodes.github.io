import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featuredImage: z.string(), // Required per CONTEXT.md
    tags: z.array(z.string()).default([]), // Open-ended tags, multiple allowed
    draft: z.boolean().default(false),
  }),
});

// NOTE: 'id' is the file() loader key — Astro exposes as entry.id, NOT entry.data.id.
// Do not declare 'id' in the schema (Pitfall 7 — 36-RESEARCH.md).
// Phase 38 uses entry.data.slug for URL construction.
const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    slug: z.string(),
    section: z.enum(['client-work', 'craft-experiments']),
    eyebrow: z.string().optional(),
    title: z.string(),
    outcome: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    problem: z.string().optional(),
    built: z.string().optional(),
    result: z.string().optional(),
    thumbLabel: z.string().optional(),
  }),
});

export const collections = { blog, projects };
