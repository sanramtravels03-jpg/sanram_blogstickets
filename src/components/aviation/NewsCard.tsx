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
    <article
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-gradient-to-b
      from-white
      to-slate-50
      shadow-lg
      shadow-blue-100/40
      transition-all
      duration-500
      hover:-translate-y-3
      hover:shadow-2xl
      hover:shadow-blue-300/30
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">

        <Image
          src={
            article.urlToImage ||
            "https://placehold.co/800x600?text=Aviation+News"
          }
          alt={article.title || "Aviation News"}
          fill
          unoptimized
          className="
          object-cover
          object-center
          transition-all
          duration-700
          group-hover:scale-110
          "
        />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hover Overlay */}
        <div
          className="
          absolute
          inset-0
          bg-blue-900/20
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          "
        />

        {/* Source Badge */}
        <div className="absolute left-4 top-4">
          <span
            className="
            rounded-full
            border
            border-white/20
            bg-white/90
            backdrop-blur-md
            px-4
            py-2
            text-xs
            font-semibold
            text-blue-700
            shadow-lg
            transition-all
            duration-300
            group-hover:scale-105
            "
          >
            ✈ {article.source?.name || "Aviation News"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* TITLE */}
        <h2
          className="
          text-xl
          font-extrabold
          leading-tight
          tracking-tight
          text-slate-900
          line-clamp-2
          transition-all
          duration-300
          group-hover:text-blue-600
          "
        >
          {article.title || "Untitled Article"}
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
          mt-4
          text-[15px]
          leading-7
          text-slate-600
          line-clamp-3
          "
        >
          {article.description || "No description available."}
        </p>

        {/* DATE */}
        <div
          className="
          mt-5
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-slate-100
          px-4
          py-2
          text-xs
          font-medium
          text-slate-600
          transition-all
          duration-300
          group-hover:bg-blue-50
          group-hover:text-blue-700
          "
        >
          <Calendar
            size={15}
            className="
            transition-transform
            duration-300
            group-hover:rotate-12
            "
          />

          {publishedDate}
        </div>

        {/* BUTTON */}
        <a
          href={article.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="
          group/button
          relative
          mt-6
          inline-flex
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:bg-blue-700
          hover:shadow-blue-500/40
          hover:shadow-xl
          active:scale-95
          "
        >
          {/* Shine */}
          <span
            className="
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/30
            to-transparent
            transition-transform
            duration-700
            group-hover/button:translate-x-full
            "
          />

          <span className="relative z-10">
            Read Full Story
          </span>

          <ExternalLink
            size={17}
            className="
            relative
            z-10
            transition-transform
            duration-300
            group-hover/button:translate-x-1
            group-hover/button:-translate-y-1
            "
          />
        </a>
      </div>

      {/* Bottom Progress Bar */}
      <div
        className="
        h-1
        w-0
        bg-gradient-to-r
        from-blue-500
        to-cyan-400
        transition-all
        duration-500
        group-hover:w-full
        "
      />
    </article>
  );
}