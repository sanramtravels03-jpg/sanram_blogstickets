import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  const relatedBlogs =
    blog.relatedBlogs?.length
      ? blogs.filter((b) =>
          blog.relatedBlogs?.includes(b.slug)
        )
      : [];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[550px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl text-center text-white px-6">
            <span className="inline-block bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {blog.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {blog.title}
            </h1>

            <div className="mt-6 flex justify-center gap-6 text-sm">
              <span>{blog.publishedAt}</span>

              {blog.readTime && (
                <span>{blog.readTime}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-6 py-12">

        {/* Quick Answer */}
        {blog.quickAnswer && (
          <section className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-3">
              {blog.quickAnswer.title}
            </h2>

            <p className="text-gray-700 leading-8">
              {blog.quickAnswer.answer}
            </p>
          </section>
        )}

        {/* Introduction */}
        {blog.introduction?.length ? (
          <section className="mb-16">
            {blog.introduction.map((item, index) => (
              <p
                key={index}
                className="text-lg text-gray-700 leading-9 mb-6"
              >
                {item}
              </p>
            ))}
          </section>
        ) : null}

        {/* Highlights */}
        {blog.highlights?.length ? (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">
              Key Highlights
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {blog.highlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm border"
                >
                  ✅ {item}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Travel Tips */}
        {blog.travelTips?.length ? (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">
              Travel Tips
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {blog.travelTips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-600"
                >
                  {tip}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Content Sections */}
        {blog.sections?.map((section, index) => (
          <section
            key={index}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {section.title}
                </h2>

                <p className="text-gray-700 leading-8 mb-6">
                  {section.content}
                </p>

                {section.points?.length && (
                  <ul className="space-y-3">
                    {section.points.map((point, i) => (
                      <li key={i}>
                        ✅ {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {section.image && (
                <div className="relative h-[350px] rounded-2xl overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Quote */}
        {blog.quote && (
          <blockquote className="bg-blue-50 rounded-2xl p-8 text-center italic text-2xl text-gray-700 mb-16">
            &quot;{blog.quote}&quot;
          </blockquote>
        )}

        {/* Features */}
        {blog.features?.length ? (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">
              Is It Worth It?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {blog.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md"
                >
                  <h3 className="font-bold text-xl mb-3">
                    {feature.title}
                  </h3>

                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Final Thoughts */}
        {blog.finalThoughts && (
          <section className="bg-blue-600 text-white rounded-3xl p-10 mb-20">
            <h2 className="text-3xl font-bold mb-4">
              Final Thoughts
            </h2>

            <p className="leading-8">
              {blog.finalThoughts}
            </p>
          </section>
        )}

        {/* FAQs */}
        {blog.faqs?.length ? (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {blog.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm"
                >
                  <summary className="cursor-pointer font-semibold">
                    {faq.question}
                  </summary>

                  <p className="mt-4 text-gray-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blogs/${item.slug}`}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition"
                >
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
