// scripts/fetchNews.mjs
// ─────────────────────────────────────────────────────────────
//  Run this ONCE to populate the dev cache:
//    node scripts/fetchNews.mjs
//
//  It hits the GNews API and writes src/cache/aviationNews.json
//  After that, `npm run dev` reads from the file — no more 429s.
// ─────────────────────────────────────────────────────────────

import fs   from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

// Load .env.local
config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR  = path.join(__dirname, "..", "src", "cache");
const CACHE_FILE = path.join(CACHE_DIR, "aviationNews.json");

const EXCLUDED = [
  "fighter jet", "fighter", "military", "war", "warplane", "missile",
  "drone", "air strike", "combat", "army", "navy", "air force",
  "defense", "defence", "ukraine", "russia", "israel", "gaza", "nato",
  "terror", "terrorist", "bomb", "explosion", "stock", "stocks",
  "share price", "earnings", "investor", "bitcoin", "cryptocurrency",
  "football", "cricket", "celebrity", "movie", "politics", "election",
  "crime", "murder", "assault", "shooting", "police",
];

function normalize(article) {
  return {
    source:      { name: article.source?.name || "Aviation News" },
    title:       article.title       || "",
    description: article.description || "",
    url:         article.url         || "#",
    urlToImage:  article.image || article.urlToImage || null,
    publishedAt: article.publishedAt || new Date().toISOString(),
    content:     article.content     || "",
  };
}

function isClean(article) {
  const text = `${article.title} ${article.description} ${article.content}`.toLowerCase();
  return !EXCLUDED.some((kw) => text.includes(kw));
}

function dedupe(articles) {
  const seen = new Set();
  return articles.filter((a) => {
    const key = a.url || a.title?.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function main() {
  const key = process.env.GNEWS_API_KEY;
  if (!key) {
    console.error("❌  GNEWS_API_KEY not found in .env.local");
    process.exit(1);
  }

  console.log("📡  Fetching aviation news from GNews...");

  const makeURL = (q, country, max) => {
    const url = new URL("https://gnews.io/api/v4/search");
    url.searchParams.set("q",      q);
    url.searchParams.set("lang",   "en");
    url.searchParams.set("max",    max);
    url.searchParams.set("apikey", key);
    if (country) url.searchParams.set("country", country);
    return url.toString();
  };

  const [r1, r2] = await Promise.all([
    fetch(makeURL(
      '"Air India" OR IndiGo OR "Air India Express" OR Akasa OR SpiceJet OR DGCA OR AAI',
      "in", "10"
    )),
    fetch(makeURL('"Airbus" OR Boeing', null, "5")),
  ]);

  if (!r1.ok) throw new Error(`Indian news: ${r1.status} ${await r1.text()}`);
  if (!r2.ok) throw new Error(`International news: ${r2.status} ${await r2.text()}`);

  const [d1, d2] = await Promise.all([r1.json(), r2.json()]);
  const raw = [...(d1.articles || []), ...(d2.articles || [])];

  const articles = dedupe(
    raw.map(normalize).filter(isClean)
  ).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  ).slice(0, 100);

  // Ensure cache directory exists
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(articles, null, 2));

  console.log(`✅  Wrote ${articles.length} articles to ${CACHE_FILE}`);
  console.log("    Run `npm run dev` — no more 429 errors in development.");
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
