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
      coverGif: z.string().optional(),
      gallery: z.array(image()).default([]),
      youtubeId: z.string().optional(),
      audio: z.string().optional(),
      repo: z.url().optional(),
      external: z.url().optional(),
      private: z.boolean().default(false),
      featured: z.boolean().default(false),
      displayStars: z.boolean().default(false),
      startYear: z.number(),
      endYear: z.number().optional(),
      // Lowest rank sorts first (podium-style: 1 is 1st place; 0 is the best
      // possible rank). Unranked entries sort after every ranked one,
      // regardless of rank value. Ties (including among unranked entries)
      // break by star count, then alphabetically by title
      // - see sortProjectsByRank in src/lib/sort-projects.ts.
      rank: z.number().optional(),
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
    socials: z
      .array(
        z.object({
          platform: z.string(),
          url: z.url(),
        }),
      )
      .optional(),
    languages: z
      .array(
        z.object({
          name: z.string(),
          level: z.string(),
        }),
      )
      .optional(),
    tooltips: z
      .array(
        z.object({
          tag: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { projects, pages };
