import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";

export default function BlogsPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Blogs
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </main>
  );
}