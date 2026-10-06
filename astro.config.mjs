// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

const SITE_URL = process.env.SITE_URL || 'https://tregalloway.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [sitemap(), mdx()],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
