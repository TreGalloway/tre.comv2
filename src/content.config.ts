import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdoc}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200),
      pubDate: z.coerce.date(),
      category: z.string().default('General'),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdoc}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(160),
      role: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      url: z.url().optional(),
      repo: z.url().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const uses = defineCollection({
  loader: glob({ base: './src/content/uses', pattern: '**/*.{md,mdoc}' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    ),
  }),
});

const favorites = defineCollection({
  loader: glob({ base: './src/content/favorites', pattern: '**/*.{md,mdoc}' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        url: z.string().optional(),
        featured: z.boolean().default(false),
      }),
    ),
  }),
});

export const collections = { blog, work, uses, favorites };
