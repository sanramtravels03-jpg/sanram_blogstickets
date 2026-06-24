import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";

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
  article?: NewsArticle;
}

export default function NewsCard({ article }: Props) {
  if (!article) return null;

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : "Recently published";

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={
            article.urlToImage ||
            "https://placehold.co/800x600?text=Aviation+News"
          }
          alt={article.title || "Aviation News"}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {article.source?.name || "Aviation News"}
        </span>

        <h2 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-blue-600">
          {article.title || "Untitled Article"}
        </h2>

        <p className="mb-4 line-clamp-3 text-slate-600">
          {article.description || "No description available."}
        </p>

        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={14} />
          {publishedDate}
        </div>

        <a
          href={article.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-blue-600"
        >
          Read Original Article
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}