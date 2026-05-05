"use client";

import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import CharacterCount from "@tiptap/extension-character-count";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  List, ListOrdered, Quote, Minus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon,
  Undo, Redo, Loader2, Sparkles, Save, ChevronDown, Check, X,
  Eye, EyeOff,
} from "lucide-react";
import { slugifyText } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface AiSeoResult {
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  focusKeyword?: string;
  suggestedTags?: string[];
  slugSuggestion?: string;
  readabilityScore?: number;
  contentTips?: string[];
}

interface PostEditorProps {
  postId?: string;
  initialData?: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    status: string;
    categoryId?: string;
    tags?: string;
    metaTitle?: string;
    metaDescription?: string;
  };
  categories: Category[];
}

const HEADING_OPTIONS = [
  { label: "Alinea", value: "paragraph" },
  { label: "H1", value: "h1" },
  { label: "H2", value: "h2" },
  { label: "H3", value: "h3" },
  { label: "H4", value: "h4" },
];

function readingTime(wordCount: number) {
  const mins = Math.ceil(wordCount / 200);
  return mins === 1 ? "1 min leestijd" : `${mins} min leestijd`;
}

function ReadabilityBadge({ score }: { score: number }) {
  const color = score >= 7 ? "text-green-600 bg-green-50" : score >= 4 ? "text-amber-600 bg-amber-50" : "text-red-600 bg-red-50";
  const label = score >= 7 ? "Goed leesbaar" : score >= 4 ? "Matig leesbaar" : "Moeilijk leesbaar";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {score}/10 — {label}
    </span>
  );
}

export default function PostEditor({ postId, initialData, categories }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "");
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [tags, setTags] = useState(initialData?.tags || "");
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [headingOpen, setHeadingOpen] = useState(false);
  const [aiResult, setAiResult] = useState<AiSeoResult | null>(null);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Begin met schrijven..." }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      CharacterCount,
    ],
    content: initialData?.content || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[500px] outline-none prose prose-sm max-w-none prose-headings:text-dark prose-p:text-gray-600 prose-p:leading-relaxed",
      },
    },
  });

  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(slugifyText(title));
    }
  }, [title, slugManuallyEdited]);

  const wordCount = editor?.storage.characterCount?.words() ?? 0;
  const charCount = editor?.storage.characterCount?.characters() ?? 0;

  const activeHeading = () => {
    if (!editor) return "Alinea";
    for (let i = 1; i <= 4; i++) {
      if (editor.isActive("heading", { level: i })) return `H${i}`;
    }
    return "Alinea";
  };

  const setHeading = (value: string) => {
    if (!editor) return;
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace("h", "")) as 1 | 2 | 3 | 4;
      editor.chain().focus().toggleHeading({ level }).run();
    }
    setHeadingOpen(false);
  };

  const handleSave = async () => {
    if (!title || !editor?.getHTML()) {
      toast.error("Titel en inhoud zijn verplicht");
      return;
    }
    setIsSaving(true);
    try {
      const url = postId ? `/api/posts/${postId}` : "/api/posts";
      const method = postId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, slug, content: editor.getHTML(), excerpt,
          featuredImage, status, categoryId: categoryId || undefined,
          tags, metaTitle, metaDescription,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Opslaan mislukt");
      }
      toast.success(postId ? "Artikel bijgewerkt!" : "Artikel aangemaakt!");
      router.push("/admin/posts");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Er ging iets mis");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAiSeo = async () => {
    if (!title) {
      toast.error("Vul eerst een titel in");
      return;
    }
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: editor?.getHTML() || "",
          excerpt,
        }),
      });
      if (!response.ok) throw new Error("AI request mislukt");
      const data: AiSeoResult = await response.json();
      setAiResult(data);
      setShowAiPanel(true);
      toast.success("Gemini analyse klaar!");
    } catch {
      toast.error("AI SEO niet beschikbaar. Controleer je API-sleutel.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const applyAiField = (field: keyof AiSeoResult) => {
    if (!aiResult) return;
    switch (field) {
      case "metaTitle":
        if (aiResult.metaTitle) setMetaTitle(aiResult.metaTitle);
        break;
      case "metaDescription":
        if (aiResult.metaDescription) setMetaDescription(aiResult.metaDescription);
        break;
      case "excerpt":
        if (aiResult.excerpt) setExcerpt(aiResult.excerpt);
        break;
      case "slugSuggestion":
        if (aiResult.slugSuggestion) { setSlug(aiResult.slugSuggestion); setSlugManuallyEdited(true); }
        break;
      case "suggestedTags":
        if (aiResult.suggestedTags?.length) setTags(aiResult.suggestedTags.join(", "));
        break;
    }
    toast.success("Toegepast!");
  };

  const addLink = useCallback(() => {
    const url = window.prompt("URL:");
    if (url && editor) editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Afbeelding URL:");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  const metaTitleOk = metaTitle.length > 0 && metaTitle.length <= 60;
  const metaDescOk = metaDescription.length > 0 && metaDescription.length <= 160;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main editor */}
      <div className="flex-1 space-y-4">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Artikeltitel..."
          className="w-full text-2xl font-bold text-dark placeholder-gray-300 outline-none border-b border-border pb-3 focus:border-purple-400 transition-colors"
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 p-2 bg-gray-50 border border-border rounded-xl">
          {/* Heading dropdown */}
          <div className="relative mr-1">
            <button
              onClick={() => setHeadingOpen(!headingOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-white hover:text-dark transition-colors"
            >
              {activeHeading()}
              <ChevronDown size={12} />
            </button>
            {headingOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-xl shadow-lg z-20 min-w-[120px] py-1">
                {HEADING_OPTIONS.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setHeading(value)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Text formatting */}
          {[
            { action: () => editor.chain().focus().toggleBold().run(), icon: Bold, label: "Vet", active: editor.isActive("bold") },
            { action: () => editor.chain().focus().toggleItalic().run(), icon: Italic, label: "Cursief", active: editor.isActive("italic") },
            { action: () => editor.chain().focus().toggleUnderline().run(), icon: UnderlineIcon, label: "Onderstrepen", active: editor.isActive("underline") },
            { action: () => editor.chain().focus().toggleStrike().run(), icon: Strikethrough, label: "Doorhalen", active: editor.isActive("strike") },
            { action: () => editor.chain().focus().toggleCode().run(), icon: Code, label: "Code", active: editor.isActive("code") },
          ].map(({ action, icon: Icon, label, active }) => (
            <ToolbarBtn key={label} onClick={action} active={active} title={label}>
              <Icon size={15} />
            </ToolbarBtn>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          {/* Lists & blocks */}
          {[
            { action: () => editor.chain().focus().toggleBulletList().run(), icon: List, label: "Lijst", active: editor.isActive("bulletList") },
            { action: () => editor.chain().focus().toggleOrderedList().run(), icon: ListOrdered, label: "Genummerd", active: editor.isActive("orderedList") },
            { action: () => editor.chain().focus().toggleBlockquote().run(), icon: Quote, label: "Citaat", active: editor.isActive("blockquote") },
            { action: () => editor.chain().focus().setHorizontalRule().run(), icon: Minus, label: "Horizontale lijn", active: false },
          ].map(({ action, icon: Icon, label, active }) => (
            <ToolbarBtn key={label} onClick={action} active={active} title={label}>
              <Icon size={15} />
            </ToolbarBtn>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          {/* Alignment */}
          {[
            { action: () => editor.chain().focus().setTextAlign("left").run(), icon: AlignLeft, label: "Links", active: editor.isActive({ textAlign: "left" }) },
            { action: () => editor.chain().focus().setTextAlign("center").run(), icon: AlignCenter, label: "Midden", active: editor.isActive({ textAlign: "center" }) },
            { action: () => editor.chain().focus().setTextAlign("right").run(), icon: AlignRight, label: "Rechts", active: editor.isActive({ textAlign: "right" }) },
            { action: () => editor.chain().focus().setTextAlign("justify").run(), icon: AlignJustify, label: "Uitvullen", active: editor.isActive({ textAlign: "justify" }) },
          ].map(({ action, icon: Icon, label, active }) => (
            <ToolbarBtn key={label} onClick={action} active={active} title={label}>
              <Icon size={15} />
            </ToolbarBtn>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          {/* Media & history */}
          {[
            { action: addLink, icon: LinkIcon, label: "Link", active: editor.isActive("link") },
            { action: addImage, icon: ImageIcon, label: "Afbeelding", active: false },
          ].map(({ action, icon: Icon, label, active }) => (
            <ToolbarBtn key={label} onClick={action} active={active} title={label}>
              <Icon size={15} />
            </ToolbarBtn>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Ongedaan">
            <Undo size={15} />
          </ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Opnieuw">
            <Redo size={15} />
          </ToolbarBtn>
        </div>

        {/* Editor area */}
        <div className="border border-border rounded-xl p-5 min-h-[500px] focus-within:border-purple-300 transition-colors">
          <EditorContent editor={editor} />
        </div>

        {/* Word count bar */}
        <div className="flex items-center gap-4 text-xs text-gray-400 px-1">
          <span>{wordCount} woorden</span>
          <span>{charCount} tekens</span>
          <span>{readingTime(wordCount)}</span>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-4 flex-shrink-0">
        {/* Publish */}
        <div className="bg-white border border-border rounded-xl p-5">
          <h3 className="font-semibold text-dark mb-4 text-sm">Publiceren</h3>
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-purple-400"
            >
              <option value="draft">Concept</option>
              <option value="published">Gepubliceerd</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-60 transition-colors"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{isSaving ? "Opslaan..." : "Opslaan"}</span>
          </button>
        </div>

        {/* Article meta */}
        <div className="bg-white border border-border rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-dark text-sm">Gegevens</h3>

          <div>
            <label className="block text-xs text-gray-500 mb-1">URL-slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Categorie</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-purple-400"
            >
              <option value="">Geen categorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Tags (komma-gescheiden)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="vrijwilligers,impact,verbinding"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Afbeelding URL</label>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Samenvatting</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Korte introductie..."
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white border border-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-dark text-sm">SEO</h3>
            <button
              onClick={handleAiSeo}
              disabled={isAiLoading}
              className="flex items-center space-x-1.5 text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 font-medium px-2.5 py-1.5 rounded-lg disabled:opacity-60 transition-colors"
            >
              {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              <span>{isAiLoading ? "Analyseren..." : "Optimaliseer met Gemini"}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Meta-titel{" "}
              <span className={metaTitle.length > 60 ? "text-red-400" : metaTitle.length > 50 ? "text-amber-400" : "text-gray-300"}>
                ({metaTitle.length}/60)
              </span>
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors ${
                metaTitle.length > 60 ? "border-red-300 focus:border-red-400" : "border-border focus:border-purple-400"
              }`}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Meta-beschrijving{" "}
              <span className={metaDescription.length > 160 ? "text-red-400" : metaDescription.length > 140 ? "text-amber-400" : "text-gray-300"}>
                ({metaDescription.length}/160)
              </span>
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors resize-none ${
                metaDescription.length > 160 ? "border-red-300 focus:border-red-400" : "border-border focus:border-purple-400"
              }`}
            />
          </div>

          {/* Google preview */}
          {(metaTitle || title) && (
            <div className="border border-border rounded-lg p-3 bg-gray-50">
              <p className="text-xs text-gray-400 mb-2">Google preview</p>
              <p className={`text-sm font-medium truncate ${metaTitleOk ? "text-blue-600" : "text-blue-400"}`}>
                {metaTitle || title}
              </p>
              <p className="text-green-700 text-xs">stichtingphilia.nl/blog/{slug}</p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                {metaDescription || excerpt || "Geen beschrijving"}
              </p>
            </div>
          )}
        </div>

        {/* Gemini AI panel */}
        {showAiPanel && aiResult && (
          <div className="bg-white border border-purple-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-purple-500" />
                <h3 className="font-semibold text-dark text-sm">Gemini suggesties</h3>
              </div>
              <button onClick={() => setShowAiPanel(false)} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            </div>

            {/* Readability */}
            {aiResult.readabilityScore !== undefined && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Leesbaarheid</p>
                <ReadabilityBadge score={aiResult.readabilityScore} />
              </div>
            )}

            {/* AI fields with apply buttons */}
            {[
              { label: "Meta-titel", field: "metaTitle" as const, value: aiResult.metaTitle },
              { label: "Meta-beschrijving", field: "metaDescription" as const, value: aiResult.metaDescription },
              { label: "Samenvatting", field: "excerpt" as const, value: aiResult.excerpt },
              { label: "Focus keyword", field: "focusKeyword" as const, value: aiResult.focusKeyword },
              { label: "Slug suggestie", field: "slugSuggestion" as const, value: aiResult.slugSuggestion },
            ]
              .filter(({ value }) => Boolean(value))
              .map(({ label, field, value }) => (
                <div key={field} className="space-y-1">
                  <p className="text-xs text-gray-500">{label}</p>
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-xs text-gray-700 bg-purple-50 rounded-lg px-2.5 py-2 leading-relaxed">
                      {value}
                    </p>
                    {field !== "focusKeyword" && (
                      <button
                        onClick={() => applyAiField(field)}
                        className="flex-shrink-0 mt-0.5 p-1.5 bg-purple-100 text-purple-600 hover:bg-purple-200 rounded-lg transition-colors"
                        title="Toepassen"
                      >
                        <Check size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

            {/* Suggested tags */}
            {aiResult.suggestedTags && aiResult.suggestedTags.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-gray-500">Aanbevolen tags</p>
                  <button
                    onClick={() => applyAiField("suggestedTags")}
                    className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
                  >
                    <Check size={11} /> Alles toepassen
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiResult.suggestedTags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content tips */}
            {aiResult.contentTips && aiResult.contentTips.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Verbeterpunten</p>
                <ul className="space-y-1.5">
                  {aiResult.contentTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ToolbarBtn({
  onClick, active, title, children,
}: {
  onClick: () => void;
  active: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-colors ${
        active ? "bg-purple-100 text-purple-600" : "text-gray-500 hover:bg-white hover:text-dark"
      }`}
    >
      {children}
    </button>
  );
}
