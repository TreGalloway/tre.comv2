// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare'
import wrangler from '@astrojs/cloudflare'

const SITE_URL = process.env.SITE_URL || 'https://tregalloway.com';


export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [sitemap(), react(), markdoc(), keystatic(), cloudflare(), wrangler()],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
