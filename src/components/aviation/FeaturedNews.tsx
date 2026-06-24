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

export default function FeaturedNews({ article }: Props) {
  if (!article) return null;

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : "Recently published";

  return (
    <section className="relative overflow-hidden rounded-3xl">
      <div className="relative h-[500px] w-full">
        <Image
          src={
            article.urlToImage ||
            "https://placehold.co/1600x900?text=Aviation+News"
          }
          alt={article.title || "Featured Aviation News"}
          fill
          priority
          unoptimized
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 max-w-4xl p-8 text-white md:p-12">
          <span className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
            {article.source?.name || "Aviation News"}
          </span>

          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            {article.title || "Untitled Article"}
          </h1>

          <p className="mb-6 line-clamp-3 text-lg text-slate-200">
            {article.description || "No description available."}
          </p>

          <div className="mb-6 flex items-center gap-2 text-sm text-slate-300">
            <Calendar size={16} />
            {publishedDate}
          </div>

          <a
            href={article.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-slate-100"
          >
            Read Full Story
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}