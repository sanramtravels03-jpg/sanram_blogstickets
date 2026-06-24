import NewsCard from "./NewsCard";

interface NewsArticle {
  source: {
    name: string;
  };
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

interface Props {
  articles: NewsArticle[];
}

export default function NewsGrid({ articles }: Props) {
  if (!articles?.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-semibold">No News Available</h3>

        <p className="mt-2 text-slate-500">Please check again later.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        {/* <h2 className="text-3xl font-bold">
          Latest Aviation News
        </h2> */}

        <div className="mb-4">
          <p>Articles received: {articles.length}</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, index) => (
          <NewsCard key={`${article.title}-${index}`} article={article} />
        ))}
      </div>
    </section>
  );
}
