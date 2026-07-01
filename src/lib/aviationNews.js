import { redis } from "./redis";

const EXCLUDED = [
  "fighter jet",
  "fighter",
  "military",
  "war",
  "warplane",
  "missile",
  "drone",
  "air strike",
  "combat",
  "army",
  "navy",
  "air force",
  "defense",
  "defence",
  "ukraine",
  "russia",
  "israel",
  "gaza",
  "nato",
  "terror",
  "terrorist",
  "bomb",
  "explosion",
  "stock",
  "stocks",
  "share price",
  "earnings",
  "investor",
  "bitcoin",
  "cryptocurrency",
  "football",
  "cricket",
  "celebrity",
  "movie",
  "politics",
  "election",
  "crime",
  "murder",
  "assault",
  "shooting",
  "police",
];

function normalize(article) {
  return {
    source: {
      name: article.source?.name || "Aviation News",
    },
    title: article.title || "",
    description: article.description || "",
    url: article.url || "#",
    urlToImage: article.image || article.urlToImage || null,
    publishedAt: article.publishedAt || new Date().toISOString(),
    content: article.content || "",
  };
}

function isClean(article) {
  const text = `
    ${article.title}
    ${article.description}
    ${article.content}
  `.toLowerCase();

  return !EXCLUDED.some((keyword) => text.includes(keyword));
}

function dedupe(articles) {
  const seen = new Set();

  return articles.filter((article) => {
    const key = article.url || article.title?.trim().toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function processArticles(raw) {
  return dedupe(raw.map(normalize).filter(isClean))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 100);
}

async function fetchFromAPI() {
  const query =
    'aviation OR airline OR airport OR "Air India" OR IndiGo OR Akasa OR Boeing OR Airbus';

  const url = new URL("https://gnews.io/api/v4/search");

  url.searchParams.set("q", query);
  url.searchParams.set("lang", "en");
  url.searchParams.set("max", "10");
  url.searchParams.set("apikey", process.env.GNEWS_API_KEY);

  const res = await fetch(url.toString(), {
    next: {
      revalidate: 43200,
    },
  });

  if (!res.ok) {
    throw new Error(`GNews API: ${res.status}`);
  }

  const data = await res.json();

  return data.articles || [];
}

export async function getAviationNews() {
  try {
    // Check Redis first
    const cache = await redis.get("aviation-news");

    if (cache?.articles) {
      console.log("Serving Aviation News from Redis");
      return cache.articles;
    }

    console.log("Fetching fresh Aviation News...");

    const raw = await fetchFromAPI();

    const articles = processArticles(raw);

    await redis.set(
      "aviation-news",
      {
        articles,
      },
      {
        ex: 43200, // 12 Hours
      }
    );

    console.log(`Stored ${articles.length} articles in Redis`);

    return articles;
  } catch (error) {
    console.error("GNews Error:", error);

    // Return stale cache if available
    const stale = await redis.get("aviation-news");

    if (stale?.articles) {
      console.log("Serving stale Redis cache");
      return stale.articles;
    }

    return [];
  }
}