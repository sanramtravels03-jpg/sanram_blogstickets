// src/lib/aviationNews.js
// ─────────────────────────────────────────────────────────────
//  DEV:  reads from src/cache/aviationNews.json (no API calls)
//  PROD: uses Next.js fetch cache (revalidates every 12 hours)
//  Run `node scripts/fetchNews.mjs` once to populate the cache
// ─────────────────────────────────────────────────────────────

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
    title:       article.title        || "",
    description: article.description  || "",
    url:         article.url          || "#",
    urlToImage:  article.image || article.urlToImage || null,
    publishedAt: article.publishedAt  || new Date().toISOString(),
    content:     article.content      || "",
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

async function fetchFromAPI() {
  const indianQuery =
    '"Air India" OR IndiGo OR "Air India Express" OR Akasa OR SpiceJet OR DGCA OR AAI';
  const internationalQuery = '"Airbus" OR Boeing';

  const makeURL = (q, country) => {
    const url = new URL("https://gnews.io/api/v4/search");
    url.searchParams.set("q",      q);
    url.searchParams.set("lang",   "en");
    url.searchParams.set("max",    country ? "10" : "5");
    url.searchParams.set("apikey", process.env.GNEWS_API_KEY);
    if (country) url.searchParams.set("country", country);
    return url.toString();
  };

  const [r1, r2] = await Promise.all([
    fetch(makeURL(indianQuery, "in"), {
      next: { revalidate: 43200, tags: ["aviation-news"] },
    }),
    fetch(makeURL(internationalQuery), {
      next: { revalidate: 43200, tags: ["aviation-news"] },
    }),
  ]);

  if (!r1.ok) throw new Error(`GNews error ${r1.status}`);
  if (!r2.ok) throw new Error(`GNews error ${r2.status}`);

  const [d1, d2] = await Promise.all([r1.json(), r2.json()]);
  return [...(d1.articles || []), ...(d2.articles || [])];
}

async function readDevCache() {
  // Dynamic import so `fs` is never bundled for the browser / edge
  const fs   = await import("fs/promises");
  const path = await import("path");
  const file = path.join(process.cwd(), "src", "cache", "aviationNews.json");
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null; // cache file missing — fall through to API
  }
}

export async function getAviationNews() {
  try {
    let raw = [];

    if (process.env.NODE_ENV === "development") {
      // ── DEV: serve from local JSON so we never hit the API rate limit ──
      const cached = await readDevCache();
      if (cached && cached.length > 0) {
        console.log(`[news] dev cache hit — ${cached.length} articles`);
        return cached;
      }
      // Cache file missing: fetch once and remind the developer
      console.warn(
        "[news] dev cache empty — fetching from API once.\n" +
        "       Run `node scripts/fetchNews.mjs` to refresh the cache file."
      );
      raw = await fetchFromAPI();
    } else {
      // ── PROD: Next.js handles caching via fetch() revalidate ──
      raw = await fetchFromAPI();
    }

    const articles = dedupe(
      raw.map(normalize).filter(isClean)
    ).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

    const result = articles.slice(0, 100);
    console.log(`[news] returning ${result.length} articles`);
    return result;

  } catch (err) {
    console.error("[news] fetch failed:", err.message);
    // Last resort in prod: try to return whatever is in the cache file
    if (process.env.NODE_ENV !== "development") {
      try {
        const cached = await readDevCache();
        if (cached?.length) return cached;
      } catch { /* ignore */ }
    }
    return [];
  }
}