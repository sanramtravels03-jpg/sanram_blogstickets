import FeaturedNews from "./aviation/FeaturedNews";
import NewsGrid from "./aviation/NewsGrid";
import NewsSidebar from "./aviation/NewsSidebar";
import { NewsArticle } from "@/types/news";
import { getAviationNews } from "@/lib/aviationNews";

export default async function LatestNews() {
  const articles = await getAviationNews();

  /*
    Remove invalid articles
  */
  const validArticles: NewsArticle[] = articles.filter(
    (article) =>
      article &&
      article.title &&
      article.url &&
      article.url !== "#"
  );

  /*
    Remove duplicates
  */
  const uniqueArticles = validArticles.filter(
    (article, index, self) =>
      index ===
      self.findIndex(
        (a) =>
          a.title?.trim().toLowerCase() ===
          article.title?.trim().toLowerCase()
      )
  );

  console.log("Unique articles:", uniqueArticles.length);

  /*
    No news fallback
  */
  if (uniqueArticles.length === 0) {
    return (
      <section className="container mx-auto py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold">
            Aviation News
          </h2>

          <p className="mt-3 text-slate-600">
            No aviation news available right now.
          </p>
        </div>
      </section>
    );
  }

  /*
    Safe article distribution
  */
  const featuredArticle =
    uniqueArticles.length > 0
      ? uniqueArticles[0]
      : null;

  const latestNews =
    uniqueArticles.length > 1
      ? uniqueArticles.slice(1, 7)
      : [];

  const moreUpdates =
    uniqueArticles.length > 7
      ? uniqueArticles.slice(7, 15)
      : [];

  const sidebarArticles =
    uniqueArticles.length > 15
      ? uniqueArticles.slice(15, 25)
      : uniqueArticles.slice(1, 6);

  console.log(
    "Featured:",
    featuredArticle?.title
  );

  console.log(
    "Latest:",
    latestNews.length
  );

  console.log(
    "More:",
    moreUpdates.length
  );

  console.log(
    "Sidebar:",
    sidebarArticles.length
  );

  return (
    <section className="container mx-auto py-14">
      {/* Featured */}
      {featuredArticle && (
        <div className="mb-12">
          <FeaturedNews
            article={featuredArticle}
          />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="space-y-12 lg:col-span-3">
          {latestNews.length > 0 && (
            <div>
              <h2 className="mb-6 text-3xl font-bold">
                Latest Aviation News
              </h2>

              <NewsGrid
                articles={latestNews}
              />
            </div>
          )}

          {moreUpdates.length > 0 && (
            <div>
              <h2 className="mb-6 text-3xl font-bold">
                More Aviation Updates
              </h2>

              <NewsGrid
                articles={moreUpdates}
              />
            </div>
          )}
        </div>

        {sidebarArticles.length > 0 && (
          <div>
            <NewsSidebar
              articles={sidebarArticles}
            />
          </div>
        )}
      </div>
    </section>
  );
}