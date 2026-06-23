// Fetches recent App Store + Google Play reviews and writes public/reviews.json.
// Run manually with: node scripts/fetch-reviews.mjs
// In CI this runs on a schedule (see .github/workflows/update-reviews.yml).

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'reviews.json');

const APPLE_APP_ID     = process.env.APPLE_APP_ID     || '6761864995';
const APPLE_COUNTRIES  = (process.env.APPLE_COUNTRIES || 'uy,us').split(',').map((c) => c.trim());
const GOOGLE_PACKAGE   = process.env.GOOGLE_PLAY_PACKAGE_NAME || 'com.scantoeat.app';
const GOOGLE_LANG      = process.env.GOOGLE_PLAY_LANG || 'es';
const GOOGLE_COUNTRIES = (process.env.GOOGLE_PLAY_COUNTRIES || 'uy,ar,us').split(',').map(c => c.trim());
const MIN_RATING       = Number(process.env.MIN_RATING  || 4);
const MAX_REVIEWS      = Number(process.env.MAX_REVIEWS || 9);

/** "Maria Gonzalez" → "Maria G."  |  "Foodie23" → "Foodie23" */
function anonymizeName(raw) {
  if (!raw) return 'Usuario Vokkado';
  const parts = raw.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1][0].toUpperCase()}.`;
}

function stripHtml(text) {
  return (text || '').replace(/<[^>]*>/g, '').trim();
}

async function fetchAppleReviews() {
  const all = [];
  for (const country of APPLE_COUNTRIES) {
    try {
      const url = `https://itunes.apple.com/${country}/rss/customerreviews/page=1/id=${APPLE_APP_ID}/sortby=mostrecent/json`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const entries = (data.feed?.entry || []).filter((e) => e['im:rating']);
      for (const entry of entries) {
        all.push({
          id: `apple-${country}-${entry.id?.label ?? Math.random()}`,
          source: 'app_store',
          author: anonymizeName(entry.author?.name?.label),
          rating: Number(entry['im:rating']?.label ?? 0),
          title: stripHtml(entry.title?.label),
          text: stripHtml(entry.content?.label),
          date: entry.updated?.label ?? null,
        });
      }
    } catch (err) {
      console.warn(`[apple] Error al traer reseñas para "${country}":`, err.message);
    }
  }
  return all;
}

async function fetchGooglePlayReviews() {
  const seen = new Set();
  const all = [];
  try {
    const gplay = await import('google-play-scraper');
    const scraper = gplay.default ?? gplay;
    for (const country of GOOGLE_COUNTRIES) {
      try {
        const results = await scraper.reviews({
          appId: GOOGLE_PACKAGE,
          lang: GOOGLE_LANG,
          country,
          sort: scraper.sort?.NEWEST ?? 2,
          num: 30,
        });
        const list = Array.isArray(results) ? results : (results?.data ?? []);
        for (const r of list) {
          if (!seen.has(r.id)) {
            seen.add(r.id);
            all.push({
              id: `google-${r.id}`,
              source: 'google_play',
              author: anonymizeName(r.userName),
              rating: r.score ?? 0,
              title: null,
              text: stripHtml(r.text),
              date: r.date ? new Date(r.date).toISOString() : null,
            });
          }
        }
      } catch (err) {
        console.warn(`[google-play] Error en país "${country}":`, err.message);
      }
    }
  } catch (err) {
    console.warn('[google-play] Error al importar scraper:', err.message);
  }
  return all;
}

async function main() {
  console.log('Trayendo reseñas de App Store y Google Play...');
  const [appleReviews, googleReviews] = await Promise.all([
    fetchAppleReviews(),
    fetchGooglePlayReviews(),
  ]);

  console.log(`  App Store:   ${appleReviews.length} reseñas`);
  console.log(`  Google Play: ${googleReviews.length} reseñas`);

  const reviews = [...appleReviews, ...googleReviews]
    .filter((r) => r.rating >= MIN_RATING && r.text)
    .sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0))
    .slice(0, MAX_REVIEWS);

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify({ updatedAt: new Date().toISOString(), reviews }, null, 2)
  );

  console.log(`Listo — ${reviews.length} reseñas guardadas en ${OUTPUT_PATH}`);
}

main();
