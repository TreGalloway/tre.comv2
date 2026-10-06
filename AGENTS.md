# AGENTS.md

Personal portfolio site (Astro) for Tre' Galloway. Uses pnpm (not npm). Requires Node >= 22.12.0.

## Development server

Use the background dev server, then manage it with subcommands — the server does not stay attached to the shell:

```
astro dev --background
astro dev status   # is it running?
astro dev logs     # follow output (add --follow)
astro dev stop
```

Forced full rebuild of the content cache: `astro dev --force`.

## Commands

There is **no lint or test setup** — verification is a production build:

```
pnpm build        # compiles to ./dist/
pnpm astro check  # typecheck
pnpm preview      # preview built site
```

Package scripts: `dev`, `build`, `preview`, `astro`.

## Layout

- `astro.config.mjs` — site URL defaults to `https://tregalloway.com` (env-driven via `SITE_URL`); uses `output: 'static'` with the sitemap and MDX integrations, prefetch, and Tailwind v4 via a Vite plugin.
- `src/site.config.ts` — site chrome: name, logo, tagline, description, status, url, social, nav (with `visible`), footer.
- `src/seo.config.ts` — SEO defaults: titleTemplate, defaultDescription, defaultOgImage, twitterHandle, keywords.
- Path aliases: `@/components/*`, `@/layouts/*`, `@/styles/*`, `@/utils/*` (plus `@/*` → `src/*`).

## Content collections

Content lives in `src/content/` and schemas are defined in `src/content.config.ts` (Astro 7 glob loaders). Supports `.mdx`.

- `blog/` — frontmatter: title, description (max 200), pubDate, category (default 'General'), tags[], optional heroImage, draft (default false), seo (metaTitle/metaDescription/ogImage).
- `work/` — title, summary (max 160), role, date, tags, cover, url, repo, liveLabel, codeLabel, featured, draft, seo.
- `uses/` — title, category, items[] (name, description).
- `favorites/` — title, category, items[] (name, description, url, featured).
- `pages/` — page copy singletons (`home`, `about`, `contact`, `not-found`, and the four `*-index` files). Frontmatter is a discriminated union on `kind` (`home` | `about` | `contact` | `not-found` | `index`); read with `getEntry('pages', '<id>')` and narrow on `entry.data.kind`.

Dynamic routes: `src/pages/blog/[...slug].astro`, `src/pages/work/[id].astro`.

## Site & SEO config

Site chrome comes from `src/site.config.ts` (`SITE`, with `SiteContent = typeof SITE`) and SEO defaults from `src/seo.config.ts` (`SEO`). `Layout.astro`, `Header.astro`, and `Footer.astro` import them directly; there is no reader/getter layer.

- Page copy lives in the `pages` MDX collection (`src/content/pages/*.mdx`), not in TS constants.
- To add a page: add `src/content/pages/<id>.mdx`, extend the `pages` schema in `src/content.config.ts`, and read it with `getEntry`.
- With `output: 'static'`, all pages are prerendered by default.

## Theming

Two independent, persisted controls on `<html>`:
- `[data-theme]` = theme family (`serendipity` default | `kanagawa`), persisted as `localStorage['theme-family']`.
- `.dark` class = light/dark mode, persisted as `localStorage['theme']` (`'light'|'dark'`).

- Controls: `src/components/ThemeToggle.astro` (mode), `src/components/ThemeSwitcher.astro` (family). Pre-paint in `src/components/BaseHead.astro` applies both (also on `astro:after-swap`).
- Theme colors: semantic tokens (`--paper`, `--ink`, `--ink-soft`, `--line`, `--surface`, `--accent`, `--accent-soft`) defined per family-light/dark in `src/styles/global.css`. Components use token classes only.

## UI

- Startwind UI initialized (Astro). Owned components live in `src/components/starwind/`. Existing custom components coexist and use semantic theme tokens.
