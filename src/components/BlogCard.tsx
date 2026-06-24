import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Blog } from "@/types/blog";

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {blog.category}
        </span>

        <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>

        <p className="text-slate-600 line-clamp-3 mb-4">
          {blog.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {blog.publishedAt}
          </div>

          {blog.readTime && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {blog.readTime}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-blue-600 font-semibold">
          Read Full Guide
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
