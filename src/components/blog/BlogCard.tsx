import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    publishedAt?: Date | null;
    category?: { name: string; slug: string } | null;
    tags?: string | null;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col">
      {/* Image placeholder */}
      <div className="aspect-video bg-purple-50 flex items-center justify-center border-b border-border flex-shrink-0">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <span className="text-purple-600 font-bold text-xl">P</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <Link
              href={`/blog?category=${post.category.slug}`}
              className="inline-block px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full hover:bg-purple-100 transition-colors"
            >
              {post.category.name}
            </Link>
          )}
          {post.publishedAt && (
            <div className="flex items-center space-x-1 text-gray-400 text-xs">
              <Calendar size={11} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          )}
        </div>

        <h2 className="font-bold text-dark text-lg mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors flex-1">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {post.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">
            {post.excerpt}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center space-x-1 text-purple-600 text-sm font-medium hover:text-purple-700 mt-auto"
        >
          <span>Lees artikel</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
