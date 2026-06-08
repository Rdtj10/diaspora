import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getArticleBySlug, getArticles } from "@/lib/articles";

interface ArtikelDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArtikelDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: `${article.title} | Diaspora Nusantara`,
    description: article.excerpt,
  };
}

export default async function ArtikelDetailPage({ params }: ArtikelDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same category, excluding current one, max 3)
  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Fallback related articles if not enough in the same category
  const finalRelated = relatedArticles.length > 0 
    ? relatedArticles 
    : allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case "pendidikan":
        return "text-pink-600 bg-pink-50 border-pink-100";
      case "karir":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "budaya":
        return "text-orange-600 bg-orange-50 border-orange-100";
      case "komunitas":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  // Helper to parse and render simple markdown string to beautiful React elements
  const renderArticleContent = (text: string) => {
    const blocks = text.trim().split("\n\n");
    return blocks.map((block, i) => {
      const trimmedBlock = block.trim();
      
      if (trimmedBlock.startsWith("### ")) {
        return (
          <h3 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4 tracking-tight">
            {trimmedBlock.replace("### ", "")}
          </h3>
        );
      }
      
      if (trimmedBlock.startsWith("> ")) {
        return (
          <blockquote key={i} className="pl-5 border-l-4 border-[#c24136] italic text-gray-700 bg-gray-50/50 py-4 pr-4 rounded-r-2xl my-6">
            {trimmedBlock.replace("> ", "").replace("**Tips**: ", "")}
          </blockquote>
        );
      }
      
      if (trimmedBlock.startsWith("* ")) {
        const items = trimmedBlock.split("\n").map((line) => line.replace("* ", "").trim());
        return (
          <ul key={i} className="list-disc pl-6 space-y-2.5 my-4 text-gray-600 font-medium">
            {items.map((item, idx) => {
              // Simple check for bold inside list
              if (item.includes("**")) {
                const parts = item.split("**");
                return (
                  <li key={idx}>
                    <strong>{parts[1]}</strong>{parts[2]}
                  </li>
                );
              }
              return <li key={idx}>{item}</li>;
            })}
          </ul>
        );
      }
      
      // Paragraph text
      return (
        <p key={i} className="text-gray-600 font-medium leading-relaxed mb-6 text-[15px] md:text-base">
          {trimmedBlock}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] pb-24">
      {/* Top Header Navigation */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto max-w-4xl px-6 flex items-center justify-between">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
          >
            <Icon icon="lucide:arrow-left" className="w-4 h-4" />
            Kembali ke Artikel
          </Link>
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400">
            <span>Home</span>
            <Icon icon="lucide:chevron-right" className="w-3 h-3" />
            <span>Artikel</span>
            <Icon icon="lucide:chevron-right" className="w-3 h-3" />
            <span className="text-gray-600 truncate max-w-[150px]">{article.category}</span>
          </div>
        </div>
      </div>

      {/* Article Container */}
      <article className="container mx-auto max-w-4xl px-6 mt-10">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Header Info */}
          <div className="p-8 md:p-12 pb-6">
            <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold border mb-6 ${getCategoryStyles(article.category)}`}>
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author and Metadata Info Row */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-100">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    {article.author.name}
                  </p>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">
                    {article.author.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 text-xs font-semibold text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Icon icon="lucide:calendar" className="w-4 h-4" />
                  {article.publishedAt}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                <span className="flex items-center gap-1.5">
                  <Icon icon="lucide:clock" className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="relative aspect-[21/9] w-full bg-gray-100">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Main Text Body */}
          <div className="p-8 md:p-12 md:py-10 text-gray-800">
            {renderArticleContent(article.content)}
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      <section className="container mx-auto max-w-4xl px-6 mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight flex items-center gap-2">
          <Icon icon="lucide:sparkles" className="w-5 h-5 text-[#c24136]" />
          Artikel Terkait Lainnya
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {finalRelated.map((rel) => {
            const styles = getCategoryStyles(rel.category);
            return (
              <div
                key={rel.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
              >
                <Link href={`/artikel/${rel.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${styles}`}>
                    {rel.category}
                  </span>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-semibold text-gray-400 mb-2 block">
                    {rel.publishedAt}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#c24136] transition-colors line-clamp-2 leading-snug mb-3 flex-1">
                    <Link href={`/artikel/${rel.slug}`}>
                      {rel.title}
                    </Link>
                  </h4>
                  <Link
                    href={`/artikel/${rel.slug}`}
                    className="text-xs font-bold text-gray-600 hover:text-[#c24136] inline-flex items-center gap-1.5 transition-colors mt-auto"
                  >
                    Baca Selengkapnya
                    <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
