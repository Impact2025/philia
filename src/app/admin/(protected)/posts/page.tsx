import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Pencil, Eye } from "lucide-react";
import DeletePostButton from "./DeletePostButton";

async function getPosts() {
  try {
    return await prisma.post.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark">Artikelen</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} artikelen totaal</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center space-x-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          <PlusCircle size={16} />
          <span>Nieuw artikel</span>
        </Link>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <PlusCircle className="text-purple-400" size={20} />
            </div>
            <p className="text-gray-500 text-sm">Nog geen artikelen. Maak je eerste aan!</p>
            <Link
              href="/admin/posts/new"
              className="mt-4 inline-block text-purple-600 font-medium text-sm hover:text-purple-700"
            >
              Nieuw artikel →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Titel
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                  Categorie
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">
                  Datum
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-dark text-sm line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5 hidden sm:block">
                      /{post.slug}
                    </p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-gray-500 text-sm">
                      {post.category?.name || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.status === "published" ? "Gepubliceerd" : "Concept"}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-gray-400 text-xs">
                      {new Date(post.createdAt).toLocaleDateString("nl-NL")}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      {post.status === "published" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Bekijk"
                        >
                          <Eye size={15} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Bewerken"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeletePostButton postId={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
