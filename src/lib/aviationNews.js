function normalize(article) {
  return {
    source: {
      name: article.source?.name || "Aviation News",
    },
    title: article.title || "",
    description: article.description || "",
    url: article.url || "#",
    urlToImage: article.image || article.urlToImage || null,
    publishedAt: article.publishedAt || null,
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

export async function getAviationNews() {
  try {
    console.log(
      "GNEWS API KEY AVAILABLE:",
      !!process.env.GNEWS_API_KEY
    );

    /*
      INDIAN AVIATION NEWS
    */

   const indianQuery =
  '"Air India" OR IndiGo OR "Air India Express" OR Akasa OR SpiceJet OR DGCA OR AAI';

    /*
      INTERNATIONAL AVIATION NEWS
    */

    const internationalQuery = `
      (
       'Airbus OR Boeing';
      )
    `;

    const [
      indianResponse,
      internationalResponse,
    ] = await Promise.all([
      fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          indianQuery
        )}&lang=en&country=in&max=7&apikey=${process.env.GNEWS_API_KEY}`,
        {
          cache: "no-store",
        }
      ),

      fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          internationalQuery
        )}&lang=en&max=3&apikey=${process.env.GNEWS_API_KEY}`,
        {
          cache: "no-store",
        }
      ),
    ]);

    const indianData =
      await indianResponse.json();

    const internationalData =
      await internationalResponse.json();

    console.log(
      "Indian GNews:",
      indianData
    );

    console.log(
      "International GNews:",
      internationalData
    );

    let articles = [
      ...(indianData.articles || []),
      ...(internationalData.articles || []),
    ].map(normalize);

    console.log(
      "Before filtering:",
      articles.length
    );

    /*
      REMOVE UNWANTED NEWS
    */

    articles = articles.filter(
      (article) => {
        const text = `
          ${article.title}
          ${article.description}
          ${article.content}
        `.toLowerCase();

        const hasExcluded =
          excludedKeywords.some(
            (keyword) =>
              text.includes(
                keyword.toLowerCase()
              )
          );

        return !hasExcluded;
      }
    );

    console.log(
      "After filtering:",
      articles.length
    );

    /*
      REMOVE DUPLICATES
    */

    articles = articles.filter(
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

    /*
      LATEST FIRST
    */

    articles.sort(
      (a, b) =>
        new Date(
          b.publishedAt || 0
        ).getTime() -
        new Date(
          a.publishedAt || 0
        ).getTime()
    );

    console.log(
      "Final articles:",
      articles.length
    );

    return articles.slice(0, 10);
  } catch (err) {
    console.error(
      "GNews failed:",
      err
    );

    return [];
  }
}