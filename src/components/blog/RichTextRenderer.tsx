interface RichTextRendererProps {
  content: string;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-dark
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-5
        prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-dark prose-strong:font-semibold
        prose-blockquote:border-l-4 prose-blockquote:border-purple-300
        prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-500
        prose-ul:my-4 prose-ul:space-y-2
        prose-ol:my-4 prose-ol:space-y-2
        prose-li:text-gray-600
        prose-img:rounded-xl prose-img:shadow-md"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
