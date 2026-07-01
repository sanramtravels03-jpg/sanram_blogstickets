// app/news/page.tsx

import NewsCard from "@/components/aviation/NewsCard";
import { NewsArticle } from "@/types/news";
import { getAviationNews } from "@/lib/aviationNews";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const articles: NewsArticle[] = await getAviationNews();

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