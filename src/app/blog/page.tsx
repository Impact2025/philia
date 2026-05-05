import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Stichting Philia",
  description:
    "Nieuws, verhalen en inzichten van Stichting Philia over verbinding, vrijwilligerswerk en sociale impact.",
};

async function getBlogData(category?: string, page = 1) {
  const limit = 9;
  const skip = (page - 1) * limit;

  const where = {
    status: "published",
    ...(category ? { category: { slug: category } } : {}),
  };

  try {
    const [posts, postCount, categories] = await Promise.all([
      prisma.post.findMany({
        where,
        include: { category: true },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
      prisma.category.findMany({ orderBy: { name: "asc" } }),
    ]);

    return { posts, total: postCount, categories, pages: Math.ceil(postCount / limit) };
  } catch {
    return { posts: [], total: 0, categories: [], pages: 0 };
  }
}

interface BlogPageProps {
  searchParams: { category?: string; page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || "1");
  const { posts, categories, pages } = await getBlogData(
    searchParams.category,
    page
  );

  return (
    <>
      <main className="pt-[72px]">
        {/* Header */}
        <section className="py-20 bg-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-purple-600 text-sm font-semibold uppercase tracking-wider">
              Kennis &amp; verhalen
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-dark">Blog</h1>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Nieuws, inzichten en verhalen over verbinding, vrijwilligerswerk en sociale impact.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !searchParams.category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                Alle artikelen
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    searchParams.category === cat.slug
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Posts grid */}
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/blog?${searchParams.category ? `category=${searchParams.category}&` : ""}page=${p}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          p === page
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-2xl">P</span>
                </div>
                <p className="text-gray-500 text-lg">Nog geen artikelen gepubliceerd.</p>
                <p className="text-gray-400 text-sm mt-2">Kom later terug!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
