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
    <section className="group relative overflow-hidden rounded-3xl shadow-2xl">
      {/* Image */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[520px] overflow-hidden contain-content">
        <Image
          src={
            article.urlToImage ||
            "https://placehold.co/1600x900?text=Aviation+News"
          }
          alt={article.title || "Featured Aviation News"}
          fill
          priority
          unoptimized
          className="
          object-cover
          transition-transform
          duration-[8000ms]
          ease-linear
          group-hover:scale-110
          "
        />

        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-transparent animate-pulse" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-14">
          <div
            className="
            max-w-4xl
            rounded-3xl
            border
            border-white/20
            bg-black/30
            backdrop-blur-md
            p-6
            md:p-8
            shadow-2xl
            transition-all
            duration-500
            group-hover:bg-black/40
            "
          >
            {/* Source */}
            <span
              className="
              inline-flex
              items-center
              rounded-full
              bg-blue-600
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:bg-blue-500
              "
            >
              ✈ {article.source?.name || "Aviation News"}
            </span>

            {/* Title */}
            <h1
              className="
              mt-6
              text-2xl
              font-extrabold
              leading-tight
              text-white
              md:text-4xl
              lg:text-5xl
              transition-all
              duration-500
              group-hover:translate-x-2
              "
            >
              {article.title || "Untitled Article"}
            </h1>

            {/* Description */}
            <p
              className="
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-slate-200
              line-clamp-3
              "
            >
              {article.description || "No description available."}
            </p>

            {/* Date */}
            <div
              className="
              mt-6
              flex
              items-center
              gap-3
              text-slate-300
              transition-all
              duration-300
              group-hover:text-white
              "
            >
              <Calendar
                size={18}
                className="transition-transform duration-300 group-hover:rotate-12"
              />

              {publishedDate}
            </div>

            {/* CTA */}
            <a
              href={article.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-blue-600
              px-7
              py-4
              font-semibold
              text-white
              shadow-xl
              transition-all
              duration-300
              hover:bg-blue-700
              hover:scale-105
              hover:shadow-blue-500/40
              active:scale-95
              "
            >
              Read Full Story
              <ExternalLink
                size={20}
                className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
                "
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
