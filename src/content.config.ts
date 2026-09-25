import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: new URL('../data/projects', import.meta.url),
    generateId: ({ entry }) => entry.replace(/[/\\]index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      stack: z.array(z.string()),
      cover: image(),
      gallery: z.array(image()).default([]),
      youtubeId: z.string().optional(),
      audio: z.string().optional(),
      repo: z.url().optional(),
      external: z.url().optional(),
      private: z.boolean().default(false),
      featured: z.boolean().default(false),
      date: z.coerce.date(),
    }),
});

const pages = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: new URL('../data/pages', import.meta.url),
  }),
  schema: z.object({
    heading: z.string().optional(),
    github: z.url().optional(),
    interests: z.array(z.string()).optional(),
    stack: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
  }),
});

export const collections = { projects, pages };
