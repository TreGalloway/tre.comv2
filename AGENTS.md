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

- `astro.config.mjs` — site URL defaults to `https://tregalloway.com` (env-driven via `SITE_URL`); has sitemap, prefetch, React/Markdoc for Keystatic, Keystatic integration, Tailwind v4 via Vite plugin. Uses the **Node adapter in dev** and the **Cloudflare adapter for production builds** (`NODE_ENV`), because Keystatic local storage needs Node `fs` while Cloudflare's workerd dev runtime breaks the Keystatic API route.
- `src/lib/` — content layer. `keystatic.ts` (Keystatic `createReader`), `content.ts` (typed getters with fallbacks), `types.ts` (reader-derived types), `merge.ts` (`withFallback`).
- `src/constants/fallbacks.ts` — default values for every singleton; edit fallbacks here, not in pages.
- Path aliases: `@/components/*`, `@/layouts/*`, `@/styles/*`, `@/utils/*`, `@/lib/*`, `@/constants/*`.

## Content collections

Content lives in `src/content/` and schemas are defined in `src/content.config.ts` (Astro 7 glob loaders). Supports `.md` and `.mdoc`.

- `blog/` — frontmatter: title, description (max 200), pubDate, category (default 'General'), tags[], optional heroImage, draft (default false), seo (metaTitle/metaDescription/ogImage).
- `work/` — title, summary (max 160), role, date, tags, cover, url, repo, liveLabel, codeLabel, featured, draft, seo.
- `uses/` — title, category, items[] (name, description).
- `favorites/` — title, category, items[] (name, description, url, featured).

Dynamic routes: `src/pages/blog/[...slug].astro`, `src/pages/work/[id].astro`.

## Content layer & fallbacks

Page copy, site chrome (nav, footer, header, SEO), and all page intros are Keystatic **singletons** under `src/content/singletons/*/index.yaml`, read via the Keystatic Reader API (`src/lib/keystatic.ts`). Getters in `src/lib/content.ts` merge reader data over defaults in `src/constants/fallbacks.ts` using `withFallback` (only `null`/`undefined` fall back; empty strings/arrays are intentional). Entry bodies (blog/work/uses/favorites) stay on Astro content collections for Markdoc rendering.

- Add a new editable page/section: add a singleton in `keystatic.config.ts`, a default in `src/constants/fallbacks.ts`, a type in `src/lib/types.ts`, and a getter in `src/lib/content.ts`.
- The reader uses Node `fs`, so it only runs at build time — keep reader-using pages `prerender = true`.

## Keystatic CMS

Keystatic is configured in `keystatic.config.ts` with **local storage in dev** and **GitHub storage in production** (repo: `TreGalloway/tre.comv2`, branchPrefix `keystatic/`). Dev saves write directly to `src/content/*` so pages update immediately; production edits are committed to GitHub and require a rebuild.
- Admin UI: `/keystatic` (when dev server running)
- Content format: Markdoc (`fields.markdoc`) written to `src/content/*/*.mdoc` (also compatible with MD)
- Env vars: see `.env.example` (`KEYSTATIC_GITHUB_OWNER`, `KEYSTATIC_GITHUB_REPO`, plus OAuth vars for production)

## Theming

Two independent, persisted controls on `<html>`:
- `[data-theme]` = theme family (`serendipity` default | `kanagawa`), persisted as `localStorage['theme-family']`.
- `.dark` class = light/dark mode, persisted as `localStorage['theme']` (`'light'|'dark'`).

- Controls: `src/components/ThemeToggle.astro` (mode), `src/components/ThemeSwitcher.astro` (family). Pre-paint in `src/components/BaseHead.astro` applies both (also on `astro:after-swap`).
- Theme colors: semantic tokens (`--paper`, `--ink`, `--ink-soft`, `--line`, `--surface`, `--accent`, `--accent-soft`) defined per family-light/dark in `src/styles/global.css`. Components use token classes only.

## UI

- Startwind UI initialized (Astro). Owned components live in `src/components/starwind/`. Existing custom components coexist and use semantic theme tokens.
