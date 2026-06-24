import { TrendingUp } from "lucide-react";

interface NewsArticle {
  title: string;
  url: string;
  source: {
    name: string;
  };
}

interface Props {
  articles: NewsArticle[];
}

export default function NewsSidebar({
  articles,
}: Props) {
  return (
    <aside className="sticky top-24">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="text-red-500" />
          <h3 className="text-xl font-bold">
            Trending Aviation News
          </h3>
        </div>

        <div className="space-y-5">
          {articles.slice(0, 6).map(
            (article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-slate-100 pb-4 last:border-none hover:text-blue-600 transition"
              >
                <div className="mb-1 text-xs font-semibold text-blue-600">
                  {article.source.name}
                </div>

                <h4 className="line-clamp-3 font-medium">
                  {article.title}
                </h4>
              </a>
            )
          )}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold">
          Categories
        </h3>

        <ul className="space-y-3">
          <li>
            <a
              href="/categories/airlines"
              className="hover:text-blue-600"
            >
              Airlines
            </a>
          </li>

          <li>
            <a
              href="/categories/airport-guides"
              className="hover:text-blue-600"
            >
              Airports
            </a>
          </li>

          <li>
            <a
              href="/categories/airspace"
              className="hover:text-blue-600"
            >
              Airspace
            </a>
          </li>

          <li>
            <a
              href="/categories/tickets"
              className="hover:text-blue-600"
            >
              Tickets
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}