import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import * as yaml from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_FILE = resolve(__dirname, '../src/content/favorites/books.mdx');

// The API key is restricted by HTTP referer, so requests must send the site origin.
const REFERER = 'https://www.tregalloway.com/';
let API_KEY = process.env.GOOGLE_BOOKS_API_KEY || '';
const DELAY_MS = 500;
const MAX_ATTEMPTS = 3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, '../.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*GOOGLE_BOOKS_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* no .env */
  }
  return '';
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error('No frontmatter found in books.mdx');
  return { data: yaml.parse(match[1]), body: match[2] };
}

function toCoverThumb(url) {
  if (!url) return '';
  return url.replace(/^http:/, 'https:').replace(/zoom=\d/, 'zoom=3');
}

function normalizeTitle(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function pickBestMatch(items, title, author) {
  const targetTitle = normalizeTitle(title);
  const targetAuthor = normalizeTitle(author);

  const scored = items.map((item) => {
    const info = item.volumeInfo || {};
    const primary = normalizeTitle(info.title);
    const full = normalizeTitle([info.title, info.subtitle].filter(Boolean).join(' '));
    const byline = normalizeTitle((info.authors || []).join(' '));

    const titleScore =
      primary === targetTitle || full === targetTitle
        ? 2
        : primary.startsWith(targetTitle) || full.startsWith(targetTitle)
          ? 1
          : 0;
    const authorScore = targetAuthor && byline.includes(targetAuthor) ? 1 : 0;

    return { item, score: titleScore * 2 + authorScore };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].score > 0 ? scored[0].item : items[0];
}

async function searchBook({ name, author }) {
  const query = [name, author].filter(Boolean).join(' ');
  const params = new URLSearchParams({ q: query, maxResults: '5' });
  if (API_KEY) params.set('key', API_KEY);
  const url = `https://www.googleapis.com/books/v1/volumes?${params}`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await fetch(url, { headers: { Referer: REFERER } });

    if (res.ok) {
      const json = await res.json();
      const items = json.items || [];
      if (items.length === 0) return { status: 'not-found' };

      const info = pickBestMatch(items, name, author).volumeInfo || {};
      return {
        status: 'found',
        imageUrl: toCoverThumb((info.imageLinks || {}).thumbnail || ''),
        author: (info.authors || []).join(', '),
        url: (info.infoLink || '').replace(/^http:/, 'https:'),
      };
    }

    if (res.status === 429 && attempt === MAX_ATTEMPTS) return { status: 'rate-limited' };
    if (res.status !== 429 && res.status < 500) return { status: 'error' };

    await sleep(1000 * attempt);
  }

  return { status: 'error' };
}

function stringifyFrontmatter(data) {
  return yaml.stringify(data, { lineWidth: 0 });
}

async function main() {
  API_KEY = API_KEY || loadEnv();
  const content = readFileSync(BOOKS_FILE, 'utf8');
  const { data, body } = parseFrontmatter(content);

  const books = data.items?.filter((i) => /book/i.test(i.group || '')) ?? [];
  if (books.length === 0) {
    console.log('No book items (group contains "book") found — nothing to do.');
    return;
  }

  console.log(`Enriching ${books.length} book items${API_KEY ? ' (with API key)' : ' (keyless)'}...`);

  let matched = 0;
  for (const book of books) {
    // Keep any user-authored fields; don't clobber existing manual data unless found anew.
    const result = await searchBook(book);
    if (result.status === 'found') {
      book.url = result.url || book.url;
      if (result.imageUrl && (!book.imageUrl || /books\.google\.com\/books\/content/.test(book.imageUrl))) {
        book.imageUrl = result.imageUrl;
      }
      if (result.author) book.author = result.author;
      matched++;
      console.log(`  ✓ ${book.name}`);
    } else if (result.status === 'rate-limited') {
      console.log(`  ⚠ ${book.name} — 429 rate limited (try again later or set GOOGLE_BOOKS_API_KEY)`);
    } else {
      console.log(`  ✗ ${book.name} — ${result.status}`);
    }
    await sleep(DELAY_MS);
  }

  const next = '---\n' + stringifyFrontmatter(data) + '---\n' + body.replace(/^\n+/, '');
  writeFileSync(BOOKS_FILE, next);
  console.log(`\nDone. Matched ${matched}/${books.length}. Updated ${BOOKS_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
