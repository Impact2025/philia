import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: Date | null;
  category?: { name: string; slug: string } | null;
}

interface BlogPreviewSectionProps {
  posts: Post[];
}

export default function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-20 px-8 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-20">
          <h2 className="font-serif text-5xl text-primary">Nieuwe verhalen</h2>
          <Link
            href="/blog"
            className="text-primary hover:text-accent underline underline-offset-8 transition-colors text-sm"
          >
            Bekijk alle posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {posts.slice(0, 2).map((post) => (
            <article key={post.id} className="group cursor-pointer">
              {/* Image */}
              <div className="mb-6 overflow-hidden aspect-video bg-[#F3EFFE] flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-widest text-accent/30 font-label">Blog foto volgt</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                {post.category && (
                  <span className="bg-accent/10 text-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {post.category.name}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="text-outline text-xs uppercase tracking-wide">
                    {formatDate(post.publishedAt)}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-3xl group-hover:text-accent transition-colors mb-4">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              {post.excerpt && (
                <p className="text-secondary leading-relaxed line-clamp-2">{post.excerpt}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
