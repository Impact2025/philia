"use client";

import { useState, useEffect } from "react";
import { Tag, PlusCircle, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Categorieën konden niet worden geladen");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsCreating(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error("Failed");
      setNewName("");
      toast.success("Categorie aangemaakt");
      fetchCategories();
    } catch {
      toast.error("Aanmaken mislukt");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Weet je zeker dat je "${name}" wilt verwijderen?`)) return;

    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast.success("Categorie verwijderd");
      fetchCategories();
    } catch {
      toast.error("Verwijderen mislukt");
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Categorieën</h1>
        <p className="text-gray-500 text-sm mt-1">
          Beheer de categorieën voor je blogartikelen.
        </p>
      </div>

      {/* Create form */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-dark mb-4 text-base">Nieuwe categorie</h2>
        <form onSubmit={handleCreate} className="flex items-center space-x-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Categorienaam..."
            className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors"
          />
          <button
            type="submit"
            disabled={isCreating || !newName.trim()}
            className="flex items-center space-x-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 disabled:opacity-60 transition-colors"
          >
            {isCreating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <PlusCircle size={16} />
            )}
            <span>Toevoegen</span>
          </button>
        </form>
      </div>

      {/* Categories list */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="text-purple-400 animate-spin" size={24} />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="text-gray-300 mx-auto mb-3" size={32} />
            <p className="text-gray-500 text-sm">Nog geen categorieën aangemaakt.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Tag className="text-purple-600" size={14} />
                  </div>
                  <div>
                    <p className="font-medium text-dark text-sm">{cat.name}</p>
                    <p className="text-gray-400 text-xs">
                      /{cat.slug} · {cat._count?.posts || 0} artikelen
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
