import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import * as yaml from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(__dirname, '../src/content/favorites/movies-shows.mdx');

const API_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';
const WEB_BASE = 'https://www.themoviedb.org';
const DELAY_MS = 300;
const MAX_ATTEMPTS = 3;

let API_KEY = process.env.TMDB_API_KEY || '';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, '../.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*TMDB_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* no .env */
  }
  return '';
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error('No frontmatter found in movies-shows.mdx');
  return { data: yaml.parse(match[1]), body: match[2] };
}

function stringifyFrontmatter(data) {
  return yaml.stringify(data, { lineWidth: 0 });
}

function normalizeTitle(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function mediaTypeFor(group) {
  if (/movie/i.test(group || '')) return 'movie';
  if (/show|tv|series/i.test(group || '')) return 'tv';
  return null;
}

function titleOf(volume, type) {
  return type === 'movie' ? volume.title : volume.name;
}

function originalTitleOf(volume, type) {
  return type === 'movie' ? volume.original_title : volume.original_name;
}

function pickBestMatch(results, name, type) {
  const target = normalizeTitle(name);

  const scored = results.map((volume) => {
    const primary = normalizeTitle(titleOf(volume, type));
    const original = normalizeTitle(originalTitleOf(volume, type));
    const titleScore =
      primary === target || original === target
        ? 2
        : primary.startsWith(target) || original.startsWith(target)
          ? 1
          : 0;

    return { volume, score: titleScore * 1000 + (volume.popularity || 0) };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.volume || null;
}

async function api(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  url.searchParams.set('api_key', API_KEY);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await fetch(url);

    if (res.ok) return res.json();
    if (res.status === 429 && attempt === MAX_ATTEMPTS) throw new Error('rate limited');
    if (res.status !== 429 && res.status < 500) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }

    await sleep(1000 * attempt);
  }

  throw new Error('request failed');
}

async function resolveItem(item) {
  const type = mediaTypeFor(item.group);
  if (!type) return { status: 'skipped' };

  let id = item.tmdbId;

  if (!id) {
    const query = item.searchQuery || item.name;
    const json = await api(`/search/${type}`, {
      query,
      include_adult: 'false',
      language: 'en-US',
    });
    const match = pickBestMatch(json.results || [], item.name, type);
    if (!match) return { status: 'not-found' };
    id = match.id;
  }

  const details = await api(`/${type}/${id}`, {
    language: 'en-US',
    append_to_response: 'credits',
  });

  const posterPath = details.poster_path;
  const people =
    type === 'movie'
      ? (details.credits?.crew || []).filter((p) => p.job === 'Director').map((p) => p.name)
      : [
          ...new Set([
            ...(details.created_by || []).map((p) => p.name),
            ...(details.credits?.crew || [])
              .filter(
                (p) =>
                  p.department === 'Writing' &&
                  /^(original story|author|novel|comic book|original series creator|creator|book)$/i.test(
                    p.job || '',
                  ),
              )
              .map((p) => p.name),
          ]),
        ];

  const role = type === 'movie' ? 'Directed by' : 'Created by';

  return {
    status: 'found',
    imageUrl: posterPath ? `${IMAGE_BASE}${posterPath}` : '',
    author: people.length ? `${role} ${people.join(', ')}` : '',
    url: `${WEB_BASE}/${type}/${id}`,
  };
}

async function main() {
  API_KEY = API_KEY || loadEnv();
  if (!API_KEY) {
    console.error(
      'Missing TMDB_API_KEY. Add it to .env — https://www.themoviedb.org/settings/api',
    );
    process.exit(1);
  }

  const content = readFileSync(FILE, 'utf8');
  const { data, body } = parseFrontmatter(content);

  const items = data.items ?? [];
  if (items.length === 0) {
    console.log('No movie/show items found — nothing to do.');
    return;
  }

  console.log(`Enriching ${items.length} movie/show items...`);

  let matched = 0;
  for (const item of items) {
    try {
      const result = await resolveItem(item);
      if (result.status === 'found') {
        // Keep manually curated images and links.
        if (!item.imageUrl || /image\.tmdb\.org/.test(item.imageUrl)) {
          item.imageUrl = result.imageUrl || item.imageUrl;
        }
        if (!item.url || /themoviedb\.org/.test(item.url)) {
          item.url = result.url || item.url;
        }
        if (result.author) item.author = result.author;
        item.linkLabel = 'View on TMDB';
        matched++;
        console.log(`  ✓ ${item.name}`);
      } else {
        console.log(`  ✗ ${item.name} — ${result.status}`);
      }
    } catch (err) {
      console.log(`  ✗ ${item.name} — ${err.message}`);
    }
    await sleep(DELAY_MS);
  }

  const next = '---\n' + stringifyFrontmatter(data) + '---\n' + body.replace(/^\n+/, '');
  writeFileSync(FILE, next);
  console.log(`\nDone. Matched ${matched}/${items.length}. Updated ${FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
