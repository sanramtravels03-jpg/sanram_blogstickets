import NewsCard from "@/components/aviation/NewsCard";
import { NewsArticle } from "@/types/news";
import { headers } from "next/headers";

async function getNews() {
  try {
    const headersList = await headers();

    const host = headersList.get("host");

    if (!host) {
      return { articles: [] };
    }

    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const res = await fetch(`${protocol}://${host}/api/aviation-news`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("News API returned:", res.status);

      return {
        articles: [],
      };
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch news:", error);

    return {
      articles: [],
    };
  }
}

export default async function NewsPage() {
  const data = await getNews();

  const articles: NewsArticle[] = data?.articles || [];

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">Aviation News</h1>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <NewsCard key={`${article.url}-${index}`} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">
            No Aviation News Available
          </h2>

          <p className="text-slate-600">
            We&apos;re unable to fetch the latest aviation updates right now.
            Please check back later.
          </p>
        </div>
      )}
    </main>
  );
}
