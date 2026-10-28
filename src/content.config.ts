import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.mdx' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200),
      pubDate: z.coerce.date(),
      category: z.string().default('General'),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
      seo: z
        .object({
          metaTitle: z.string().nullish(),
          metaDescription: z.string().nullish(),
          ogImage: z.string().nullish(),
        })
        .nullish(),
    }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.mdx' }),
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
      liveLabel: z.string().default('Live site'),
      codeLabel: z.string().default('View code'),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      problem: z.string().optional(),
      stack: z.string().optional(),
      impact: z.string().optional(),
      seo: z
        .object({
          metaTitle: z.string().nullish(),
          metaDescription: z.string().nullish(),
          ogImage: z.string().nullish(),
        })
        .nullish(),
    }),
});

const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.mdx' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      valueProp: z.string(),
      image: image().optional(),
      demoUrl: z.url().optional(),
      appUrl: z.url().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const uses = defineCollection({
  loader: glob({ base: './src/content/uses', pattern: '**/*.mdx' }),
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
  loader: glob({ base: './src/content/favorites', pattern: '**/*.mdx' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          thoughts: z.string().optional(),
          url: z.string().optional(),
          linkLabel: z.string().optional(),
          tmdbId: z.number().optional(),
          searchQuery: z.string().optional(),
          featured: z.boolean().default(false),
          image: image().optional(),
          imageUrl: z.string().optional(),
          author: z.string().optional(),
          group: z.string().optional(),
          status: z.string().optional(),
        }),
      ),
    }),
});

const cta = z.object({
  label: z.string(),
  href: z.string(),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.mdx' }),
  schema: z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('home'),
      hero: z.object({
        eyebrow: z.string(),
        heading: z.string(),
        subheading: z.string(),
        primaryCta: cta,
        secondaryCta: cta.optional(),
      }),
      pillars: z.object({
        eyebrow: z.string(),
        heading: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            href: z.string(),
            ctaLabel: z.string(),
          }),
        ),
      }),
    }),
    z.object({
      kind: z.literal('about'),
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      education: z.object({
        heading: z.string(),
        items: z.array(
          z.object({
            institution: z.string(),
            detail: z.string(),
            status: z.string(),
          }),
        ),
      }),
      focusAreas: z.object({
        heading: z.string(),
        items: z.array(z.object({ label: z.string() })),
      }),
      location: z.object({
        heading: z.string(),
        text: z.string(),
      }),
      cta,
    }),
    z.object({
      kind: z.literal('contact'),
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      cta,
    }),
    z.object({
      kind: z.literal('not-found'),
      eyebrow: z.string(),
      heading: z.string(),
      message: z.string(),
      cta,
    }),
    z.object({
      kind: z.literal('index'),
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      emptyText: z.string(),
    }),
  ]),
});

export const collections = { blog, work, products, uses, favorites, pages };
