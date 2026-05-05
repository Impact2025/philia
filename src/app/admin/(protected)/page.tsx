import { prisma } from "@/lib/prisma";
import { FileText, Tag, Eye, PlusCircle } from "lucide-react";
import Link from "next/link";

async function getDashboardStats() {
  try {
    const [totalPosts, publishedPosts, draftPosts, categories] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "published" } }),
      prisma.post.count({ where: { status: "draft" } }),
      prisma.category.count(),
    ]);

    const recentPosts = await prisma.post.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return { totalPosts, publishedPosts, draftPosts, categories, recentPosts };
  } catch {
    return {
      totalPosts: 0,
      publishedPosts: 0,
      draftPosts: 0,
      categories: 0,
      recentPosts: [],
    };
  }
}

export default async function AdminDashboard() {
  const { totalPosts, publishedPosts, draftPosts, categories, recentPosts } =
    await getDashboardStats();

  const stats = [
    { label: "Totaal artikelen", value: totalPosts, icon: FileText, color: "purple" },
    { label: "Gepubliceerd", value: publishedPosts, icon: Eye, color: "green" },
    { label: "Concepten", value: draftPosts, icon: FileText, color: "amber" },
    { label: "Categorieën", value: categories, icon: Tag, color: "blue" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welkom terug bij het admin panel van Stichting Philia.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-border rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Icon className="text-purple-600" size={16} />
                </div>
              </div>
              <p className="text-3xl font-bold text-dark">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link
          href="/admin/posts/new"
          className="bg-purple-600 text-white rounded-2xl p-6 flex items-center space-x-4 hover:bg-purple-700 transition-colors group"
        >
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <PlusCircle size={22} />
          </div>
          <div>
            <p className="font-semibold">Nieuw artikel</p>
            <p className="text-purple-200 text-sm">Schrijf en publiceer een blogpost</p>
          </div>
        </Link>

        <Link
          href="/admin/categories"
          className="bg-white border border-border rounded-2xl p-6 flex items-center space-x-4 hover:border-purple-300 transition-colors"
        >
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Tag className="text-purple-600" size={22} />
          </div>
          <div>
            <p className="font-semibold text-dark">Categorieën beheren</p>
            <p className="text-gray-500 text-sm">Voeg categorieën toe of bewerk ze</p>
          </div>
        </Link>
      </div>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-dark">Recente artikelen</h2>
            <Link
              href="/admin/posts"
              className="text-purple-600 text-sm font-medium hover:text-purple-700"
            >
              Alle artikelen →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-medium text-dark text-sm truncate">{post.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {post.category?.name || "Geen categorie"} ·{" "}
                    {new Date(post.createdAt).toLocaleDateString("nl-NL")}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {post.status === "published" ? "Gepubliceerd" : "Concept"}
                  </span>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-purple-600 text-xs font-medium hover:text-purple-700"
                  >
                    Bewerken
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
