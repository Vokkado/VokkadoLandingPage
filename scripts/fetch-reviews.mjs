// Fetches recent App Store + Google Play reviews and writes public/reviews.json.
// Run manually with: node scripts/fetch-reviews.mjs
// In CI this runs on a schedule (see .github/workflows/update-reviews.yml).

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'reviews.json');

const APPLE_APP_ID = process.env.APPLE_APP_ID || '6761864995';
const APPLE_COUNTRIES = (process.env.APPLE_COUNTRIES || 'uy,us').split(',').map((c) => c.trim());

const GOOGLE_PLAY_PACKAGE_NAME = process.env.GOOGLE_PLAY_PACKAGE_NAME || 'com.scantoeat.app';
const GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_B64 = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_B64;

const MIN_RATING = Number(process.env.MIN_RATING || 4);
const MAX_REVIEWS = Number(process.env.MAX_REVIEWS || 9);

/** "Maria Gonzalez" -> "Maria G."  |  "Foodie23" -> "Foodie23" */
function anonymizeName(rawName) {
  if (!rawName) return 'Usuario Vokkado';
  const parts = rawName.trim().split(/\s+/);
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
      console.warn(`[apple] Failed to fetch reviews for country "${country}":`, err.message);
    }
  }
  return all;
}

async function getGoogleAccessToken(serviceAccount) {
  const { default: jwt } = await import('jsonwebtoken');
  const now = Math.floor(Date.now() / 1000);
  const assertion = jwt.sign(
    {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/androidpublisher',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    },
    serviceAccount.private_key,
    { algorithm: 'RS256' }
  );

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`OAuth token exchange failed: ${res.status} ${await res.text()}`);
  const { access_token } = await res.json();
  return access_token;
}

async function fetchGooglePlayReviews() {
  if (!GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_B64) {
    console.warn('[google-play] GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_B64 not set, skipping.');
    return [];
  }
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_B64, 'base64').toString('utf-8')
    );
    const accessToken = await getGoogleAccessToken(serviceAccount);

    const url = `https://www.googleapis.com/androidpublisher/v3/applications/${GOOGLE_PLAY_PACKAGE_NAME}/reviews?maxResults=50`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!res.ok) throw new Error(`Reviews list failed: ${res.status} ${await res.text()}`);
    const data = await res.json();

    return (data.reviews || []).map((review) => {
      const comment = review.comments?.[0]?.userComment;
      return {
        id: `google-${review.reviewId}`,
        source: 'google_play',
        author: anonymizeName(review.authorName),
        rating: comment?.starRating ?? 0,
        title: null,
        text: stripHtml(comment?.text),
        date: comment?.lastModified?.seconds
          ? new Date(Number(comment.lastModified.seconds) * 1000).toISOString()
          : null,
      };
    });
  } catch (err) {
    console.warn('[google-play] Failed to fetch reviews:', err.message);
    return [];
  }
}

async function main() {
  const [appleReviews, googleReviews] = await Promise.all([
    fetchAppleReviews(),
    fetchGooglePlayReviews(),
  ]);

  const reviews = [...appleReviews, ...googleReviews]
    .filter((r) => r.rating >= MIN_RATING && r.text)
    .sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0))
    .slice(0, MAX_REVIEWS);

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify({ updatedAt: new Date().toISOString(), reviews }, null, 2)
  );

  console.log(`Wrote ${reviews.length} reviews to ${OUTPUT_PATH}`);
}

main();
