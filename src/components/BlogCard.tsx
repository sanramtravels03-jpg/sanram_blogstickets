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
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/20"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(min-width:1024px)33vw,(min-width:640px)50vw,100vw"
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Blue Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

        {/* Shine */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        {/* Category */}
        <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow-lg transition-all duration-300 group-hover:scale-105">
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          {blog.title}
        </h2>

        <p className="mb-5 line-clamp-3 leading-7 text-slate-600">
          {blog.excerpt}
        </p>

        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar
              size={15}
              className="text-blue-600"
            />
            {blog.publishedAt}
          </div>

          {blog.readTime && (
            <div className="flex items-center gap-1">
              <Clock
                size={15}
                className="text-blue-600"
              />
              {blog.readTime}
            </div>
          )}
        </div>

        {/* Animated Button */}
        <div className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 group-hover:bg-blue-700 group-hover:shadow-blue-600/40">
          <span>Read Full Guide</span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-2"
          />
        </div>
      </div>

      {/* Bottom Border Animation */}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full"></span>
    </Link>
  );
}