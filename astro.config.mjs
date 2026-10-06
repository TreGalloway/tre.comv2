// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

const SITE_URL = process.env.SITE_URL || 'https://tregalloway.com';

// Keystatic's local storage mode (used in dev) needs Node APIs (fs). The
// Cloudflare adapter runs SSR routes in workerd even during `astro dev`, which
// breaks Keystatic's API route, so dev uses the Node adapter instead.
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: SITE_URL,
  output: 'server',
  adapter: isProd ? cloudflare() : node({ mode: 'standalone' }),
  integrations: [sitemap(), react(), markdoc(), keystatic()],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
