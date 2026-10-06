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
- `src/lib/` — content layer. `content.ts` (typed getters returning fallbacks), `types.ts` (explicit singleton types).
- `src/constants/fallbacks.ts` — single source of truth for every singleton; edit fallbacks here, not in pages.
- Path aliases: `@/components/*`, `@/layouts/*`, `@/styles/*`, `@/utils/*`, `@/lib/*`, `@/constants/*`.

## Content collections

Content lives in `src/content/` and schemas are defined in `src/content.config.ts` (Astro 7 glob loaders). Supports `.mdx`.

- `blog/` — frontmatter: title, description (max 200), pubDate, category (default 'General'), tags[], optional heroImage, draft (default false), seo (metaTitle/metaDescription/ogImage).
- `work/` — title, summary (max 160), role, date, tags, cover, url, repo, liveLabel, codeLabel, featured, draft, seo.
- `uses/` — title, category, items[] (name, description).
- `favorites/` — title, category, items[] (name, description, url, featured).

Dynamic routes: `src/pages/blog/[...slug].astro`, `src/pages/work/[id].astro`.

## Content layer & fallbacks

Page copy, site chrome (nav, footer, header, SEO), and all page intros are **singletons** sourced entirely from `src/constants/fallbacks.ts`. Getters in `src/lib/content.ts` return those defaults directly; types live in `src/lib/types.ts`. Entry bodies (blog/work/uses/favorites) use Astro content collections with MDX rendering.

- Add a new editable page/section: add a default in `src/constants/fallbacks.ts`, a type in `src/lib/types.ts`, and a getter in `src/lib/content.ts`.
- With `output: 'static'`, all pages are prerendered by default.

## Theming

Two independent, persisted controls on `<html>`:
- `[data-theme]` = theme family (`serendipity` default | `kanagawa`), persisted as `localStorage['theme-family']`.
- `.dark` class = light/dark mode, persisted as `localStorage['theme']` (`'light'|'dark'`).

- Controls: `src/components/ThemeToggle.astro` (mode), `src/components/ThemeSwitcher.astro` (family). Pre-paint in `src/components/BaseHead.astro` applies both (also on `astro:after-swap`).
- Theme colors: semantic tokens (`--paper`, `--ink`, `--ink-soft`, `--line`, `--surface`, `--accent`, `--accent-soft`) defined per family-light/dark in `src/styles/global.css`. Components use token classes only.

## UI

- Startwind UI initialized (Astro). Owned components live in `src/components/starwind/`. Existing custom components coexist and use semantic theme tokens.
