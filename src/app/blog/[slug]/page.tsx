import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import RichTextRenderer from "@/components/blog/RichTextRenderer";
import BlogCard from "@/components/blog/BlogCard";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

interface BlogPostPageProps {
  params: { slug: string };
}

async function getPost(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug, status: "published" },
      include: { category: true },
    });
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryId: string | null, currentSlug: string) {
  try {
    return await prisma.post.findMany({
      where: {
        status: "published",
        slug: { not: currentSlug },
        ...(categoryId ? { categoryId } : {}),
      },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Artikel niet gevonden" };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || "",
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.categoryId, post.slug);

  return (
    <>
      <main className="pt-[72px]">
        {/* Header */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-purple-600 text-sm font-medium mb-6 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Terug naar blog</span>
            </Link>

            <div className="flex flex-wrap gap-3 mb-4">
              {post.category && (
                <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full">
                  {post.category.name}
                </span>
              )}
              {post.publishedAt && (
                <div className="flex items-center space-x-1 text-gray-400 text-xs">
                  <Calendar size={12} />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-500 leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </section>

        {/* Featured image placeholder */}
        <div className="w-full aspect-video max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="w-full h-full bg-purple-50 rounded-2xl border border-border flex items-center justify-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
              <span className="text-purple-600 font-bold text-2xl">P</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <RichTextRenderer content={post.content} />

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={14} className="text-gray-400" />
                {post.tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-16 bg-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-dark mb-8">Meer artikelen</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
