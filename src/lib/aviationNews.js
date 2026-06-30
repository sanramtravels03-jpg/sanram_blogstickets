// src/lib/aviationNews.js

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

function process_articles(raw) {
  return dedupe(raw.map(normalize).filter(isClean))
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
    )
    .slice(0, 100);
}

// ── PROD only — no fs, no dynamic imports ──────────────────────
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

// ── DEV only — reads local JSON, no API calls ──────────────────
// This function is only ever called when NODE_ENV === "development"
// so Next.js build (NODE_ENV === "production") never touches fs
async function fetchFromDevCache() {
  const { readFile } = await import("fs/promises");
  const { join }     = await import("path");
  const file = join(process.cwd(), "src", "cache", "aviationNews.json");
  const raw  = await readFile(file, "utf-8");
  return JSON.parse(raw);
}

// ── Main export ────────────────────────────────────────────────
export async function getAviationNews() {
  // DEV — read from local cache file, never call the API
  if (process.env.NODE_ENV === "development") {
    try {
      const cached = await fetchFromDevCache();
      console.log(`[news] dev cache — ${cached.length} articles`);
      return cached;
    } catch {
      console.warn(
        "[news] cache file missing.\n" +
        "       Run: node scripts/fetchNews.mjs"
      );
      return [];
    }
  }

  // PROD — fetch from GNews with Next.js ISR cache
  try {
    const raw = await fetchFromAPI();
    const articles = process_articles(raw);
    console.log(`[news] ${articles.length} articles`);
    return articles;
  } catch (err) {
    console.error("[news] fetch failed:", err.message);
    return [];
  }
} 