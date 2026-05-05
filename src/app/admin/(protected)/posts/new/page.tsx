import { prisma } from "@/lib/prisma";
import PostEditor from "@/components/admin/PostEditor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export default async function NewPostPage() {
  const categories = await getCategories();

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
        <h1 className="text-2xl font-bold text-dark">Nieuw artikel</h1>
      </div>

      <PostEditor categories={categories} />
    </div>
  );
}
