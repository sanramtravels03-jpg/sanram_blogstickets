import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";

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
  article: NewsArticle;
}

export default function NewsCard({ article }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={
            article.urlToImage ||
            "https://placehold.co/800x600?text=Aviation+News"
          }
          alt={article.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-6">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
          {article.source.name}
        </span>

        <h2 className="mb-3 line-clamp-2 text-xl font-bold group-hover:text-blue-600 transition-colors">
          {article.title}
        </h2>

        <p className="mb-4 line-clamp-3 text-slate-600">
          {article.description}
        </p>

        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={14} />
          {new Date(article.publishedAt).toLocaleDateString()}
        </div>

        <a
          href={article.url}
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