import { NextResponse } from "next/server";

function normalizeArticle(article) {
  return {
    source: {
      id: null,
      name: article.source?.name || "Aviation News",
    },
    author: article.source?.name || null,
    title: article.title || "Untitled Aviation News",
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

export async function GET() {
  try {
    const queries = [
      '"Air India" OR IndiGo',
      '"India airport" OR DGCA',
      'baggage OR refund OR cancellation',
      'aviation OR airline',
      'passenger OR boarding',
    ];

    const query =
      queries[
        Math.floor(Date.now() / 43200000) %
          queries.length
      ];

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        query
      )}&lang=en&country=in&max=10&apikey=${process.env.GNEWS_API_KEY}`,
      {
        next: {
          revalidate: 43200,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || data.errors) {
      console.error("GNews Error:", data);

      return NextResponse.json({
        status: "ok",
        totalResults: 0,
        articles: [],
      });
    }

    const articles = data.articles || [];

    const excludedKeywords = [
      "fighter jet",
      "military",
      "war",
      "warplane",
      "missile",
      "drone strike",
      "air strike",
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
      "army",
      "navy",
      "air force",
      "defense",
      "defence",
      "politics",
      "election",
      "shooting",
      "murder",
      "assault",
      "police",
      "crime",
    ];

    const aviationArticles =
      articles.filter((article) => {
        const text = `
          ${article.title || ""}
          ${article.description || ""}
          ${article.content || ""}
        `.toLowerCase();

        return !excludedKeywords.some(
          (keyword) =>
            text.includes(keyword)
        );
      });

    const uniqueArticles =
      aviationArticles.filter(
        (article, index, self) =>
          index ===
          self.findIndex(
            (a) =>
              a.title
                ?.trim()
                .toLowerCase() ===
              article.title
                ?.trim()
                .toLowerCase()
          )
      );

    uniqueArticles.sort(
      (a, b) =>
        new Date(
          b.publishedAt
        ).getTime() -
        new Date(
          a.publishedAt
        ).getTime()
    );

    const normalizedArticles =
      uniqueArticles
        .map(normalizeArticle)
        .filter(
          (article) =>
            article.title &&
            article.url !== "#"
        );

    return NextResponse.json({
      status: "ok",
      totalResults:
        normalizedArticles.length,
      articles: normalizedArticles,
    });
  } catch (error) {
    console.error(
      "Aviation News Error:",
      error
    );

    return NextResponse.json({
      status: "ok",
      totalResults: 0,
      articles: [],
    });
  }
} 