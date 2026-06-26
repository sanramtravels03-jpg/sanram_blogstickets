import fs from "fs/promises";
import path from "path";

const CACHE_FILE = path.join(
  process.cwd(),
  "src",
  "cache",
  "aviationNews.json"
);

function normalize(article) {
  return {
    source: {
      name: article.source?.name || "Aviation News",
    },
    title: article.title || "",
    description: article.description || "",
    url: article.url || "#",
    urlToImage:
      article.image ||
      article.urlToImage ||
      null,
    publishedAt:
      article.publishedAt ||
      new Date().toISOString(),
    content: article.content || "",
  };
}

const excludedKeywords = [
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

async function readCache() {
  try {
    const data = await fs.readFile(
      CACHE_FILE,
      "utf-8"
    );

    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeCache(data) {
  await fs.writeFile(
    CACHE_FILE,
    JSON.stringify(data, null, 2)
  );
}

export async function getAviationNews() {
  try {
    console.log("Fetching Latest Aviation News...");

    const indianQuery =
      '"Air India" OR IndiGo OR "Air India Express" OR Akasa OR SpiceJet OR DGCA OR AAI';

    const internationalQuery =
      '"Airbus" OR Boeing';

    const [
      indianResponse,
      internationalResponse,
    ] = await Promise.all([
      fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          indianQuery
        )}&lang=en&country=in&max=10&apikey=${process.env.GNEWS_API_KEY}`,
        {
          next: {
            revalidate: 43200,
          },
        }
      ),

      fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          internationalQuery
        )}&lang=en&max=5&apikey=${process.env.GNEWS_API_KEY}`,
        {
          next: {
            revalidate: 43200,
          },
        }
      ),
    ]);

    const indianData =
      await indianResponse.json();

    const internationalData =
      await internationalResponse.json();

    let freshArticles = [
      ...(indianData.articles || []),
      ...(internationalData.articles || []),
    ].map(normalize);

    freshArticles = freshArticles.filter(
      (article) => {
        const text = `
          ${article.title}
          ${article.description}
          ${article.content}
        `.toLowerCase();

        return !excludedKeywords.some(
          (keyword) =>
            text.includes(keyword)
        );
      }
    );

    const cachedArticles =
      await readCache();

    let merged = [
      ...freshArticles,
      ...cachedArticles,
    ];

    merged = merged.filter(
      (article, index, self) =>
        index ===
        self.findIndex(
          (a) =>
            a.url === article.url ||
            a.title
              ?.trim()
              .toLowerCase() ===
              article.title
                ?.trim()
                .toLowerCase()
        )
    );

    merged.sort(
      (a, b) =>
        new Date(
          b.publishedAt
        ).getTime() -
        new Date(
          a.publishedAt
        ).getTime()
    );

    merged = merged.slice(0, 100);

    await writeCache(merged);

    console.log(
      "Returning",
      merged.length,
      "cached articles"
    );

    return merged;
  } catch (err) {
    console.error(err);

    const cachedArticles =
      await readCache();

    console.log(
      "Using cached news:",
      cachedArticles.length
    );

    return cachedArticles;
  }
}