import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** One string for every language, or one per language (en required = fallback). Keys match src/i18n/ui.ts. */
const localized = z.union([
  z.string(),
  z.object({ en: z.string(), zh: z.string().optional(), fr: z.string().optional() }),
]);

/** Label → URL, e.g. { PDF: 'https://…', Code: 'https://…' }. */
const links = z.record(z.string(), z.string()).optional();

/** src/content/about/<lang>.md: the bio on the About page. */
const about = defineCollection({
  loader: glob({ base: './src/content/about', pattern: '*.md' }),
  schema: z.object({
    role: z.string(),
    affiliation: z.string().optional(),
  }),
});

/** src/content/articles/<lang>/<slug>.md: same slug in several languages = translations. */
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.int(),
    note: localized.optional(),
    links,
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: z.object({
    title: localized,
    description: localized,
    period: z.string().optional(),
    links,
  }),
});

export const collections = { about, articles, publications, projects };
