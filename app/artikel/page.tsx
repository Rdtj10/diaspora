import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getArticles, getCategories } from "@/lib/articles";
import { ArtikelFilter } from "./components/ArtikelFilter";

export const metadata: Metadata = {
  title: "Artikel & Wawasan | Diaspora Nusantara",
  description: "Dapatkan tips studi, panduan karir global, dan cerita inspiratif langsung dari jaringan mahasiswa dan profesional Indonesia di luar negeri.",
};

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; query?: string }>;
}) {
  const filters = await searchParams;
  const activeCategory = filters.category || "Semua";
  const activeQuery = filters.query || "";

  const articles = await getArticles({
    category: activeCategory,
    query: activeQuery,
  });

  const categories = await getCategories();

  // Helper to get category colors
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

  return (
    <main className="min-h-screen bg-[#F9FAFB] pb-24">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100 py-16 md:py-24">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-100/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100/20 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto max-w-7xl px-8 md:px-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c24136]/10 text-[#c24136] text-xs font-bold mb-4 uppercase tracking-wider">
            <Icon icon="lucide:book-open" className="w-3.5 h-3.5" />
            Wawasan & Artikel
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-3xl leading-tight">
            Cerita & Panduan Dari <span className="text-[#c24136]">Seluruh Dunia</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
            Dapatkan wawasan berharga, tips praktis studi, panduan karir global, dan kisah inspiratif adaptasi langsung dari sesama diaspora Indonesia.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto max-w-7xl px-8 md:px-12 mt-12">
        {/* Interactive Search and Filter */}
        <ArtikelFilter
          categories={categories}
          activeCategory={activeCategory}
          activeQuery={activeQuery}
        />

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const categoryStyles = getCategoryStyles(article.category);
              return (
                <article
                  key={article.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                >
                  {/* Cover Image Container */}
                  <Link href={`/artikel/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Floating Category Badge */}
                    <span className={`absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${categoryStyles}`}>
                      {article.category}
                    </span>
                  </Link>

                  {/* Card Content Body */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    {/* Date and Read Time Row */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:calendar" className="w-3.5 h-3.5" />
                        {article.publishedAt}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                      <span className="flex items-center gap-1">
                        <Icon icon="lucide:clock" className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#c24136] transition-colors line-clamp-2 leading-snug mb-3">
                      <Link href={`/artikel/${article.slug}`} className="hover:underline focus:outline-none">
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 font-medium line-clamp-3 leading-relaxed mb-6 flex-1">
                      {article.excerpt}
                    </p>

                    {/* Divider line */}
                    <div className="w-full h-[1px] bg-gray-50 mb-6"></div>

                    {/* Author & Read Link Row */}
                    <div className="flex items-center justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">
                            {article.author.name}
                          </p>
                          <p className="text-[10px] font-semibold text-gray-400 truncate">
                            {article.author.role}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/artikel/${article.slug}`}
                        className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-[#c24136]/10 text-gray-600 group-hover:text-[#c24136] flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
                        title="Baca artikel"
                      >
                        <Icon icon="lucide:arrow-right" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 text-center px-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
              <Icon icon="lucide:search-x" className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h3>
            <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed mb-8">
              Kami tidak dapat menemukan artikel yang cocok dengan kata kunci atau filter kategori Anda. Coba kata kunci lain.
            </p>
            <Link
              href="/artikel"
              className="px-8 py-3 bg-[#1a1824] hover:bg-black text-white text-sm font-bold rounded-full transition-all shadow-md cursor-pointer"
            >
              Lihat Semua Artikel
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
