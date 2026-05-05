import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostEditor from "@/components/admin/PostEditor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getPost(id: string) {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const [post, categories] = await Promise.all([
    getPost(params.id),
    getCategories(),
  ]);

  if (!post) notFound();

  return (
    <div className="max-w-6xl">
      <div className="flex items-center space-x-4 mb-8">
        <Link
          href="/admin/posts"
          className="flex items-center space-x-2 text-gray-500 hover:text-dark text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Terug</span>
        </Link>
        <h1 className="text-2xl font-bold text-dark">Artikel bewerken</h1>
      </div>

      <PostEditor
        postId={post.id}
        categories={categories}
        initialData={{
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt || "",
          featuredImage: post.featuredImage || "",
          status: post.status,
          categoryId: post.categoryId || "",
          tags: post.tags || "",
          metaTitle: post.metaTitle || "",
          metaDescription: post.metaDescription || "",
        }}
      />
    </div>
  );
}
