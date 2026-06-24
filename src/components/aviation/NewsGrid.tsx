import NewsCard from "./NewsCard";

interface NewsArticle {
  source?: {
    name?: string;
  };
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string | null;
  publishedAt?: string | null;
}

interface Props {
  articles?: NewsArticle[];
}

export default function NewsGrid({ articles = [] }: Props) {
  const validArticles = articles.filter(Boolean);

  if (validArticles.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-semibold">
          No News Available
        </h3>

        <p className="mt-2 text-slate-500">
          Please check again later.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {validArticles.map((article, index) => (
          <NewsCard
            key={`${article.title || "article"}-${index}`}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}