// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

const SITE_URL = process.env.SITE_URL || 'https://tregalloway.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [sitemap(), react(), markdoc()],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
