export async function getAviationNews() {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log(
    "GNEWS_API_KEY exists:",
    !!process.env.GNEWS_API_KEY
  );

  try {
    const raw = await fetchFromAPI();

    console.log("Raw articles:", raw.length);

    const articles = process_articles(raw);

    console.log("Processed articles:", articles.length);

    return articles;
  } catch (err) {
    console.error("Fetch failed:", err);

    return [];
  }
}