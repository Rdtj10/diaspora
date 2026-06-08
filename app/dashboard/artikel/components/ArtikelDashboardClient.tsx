"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { toast } from "sonner";
import { createArticleAction, deleteArticleAction } from "@/lib/actions/article.actions";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

interface ArtikelDashboardClientProps {
  initialArticles: Article[];
}

export function ArtikelDashboardClient({ initialArticles }: ArtikelDashboardClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  // Form states
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    category: "Pendidikan",
    readTime: "5 min baca",
    authorName: "",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
    authorRole: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      const result = await createArticleAction(formData);

      if (result.error) {
        setErrors(result.error);
        toast.error("Gagal mengunggah artikel. Periksa kembali form isian.");
      } else {
        toast.success("Artikel berhasil dipublikasikan!");
        setIsModalOpen(false);
        // Reset form
        setForm({
          title: "",
          excerpt: "",
          content: "",
          coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
          category: "Pendidikan",
          readTime: "5 min baca",
          authorName: "",
          authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
          authorRole: "",
        });
        
        // Refresh local state by simulating fetch or mapping values
        // Generate temporary slug and date for optimistic local updates
        const tempSlug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const newArt: Article = {
          id: Math.random().toString(),
          slug: tempSlug,
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          coverImage: form.coverImage,
          category: form.category,
          readTime: form.readTime,
          publishedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
          author: {
            name: form.authorName,
            avatar: form.authorAvatar,
            role: form.authorRole,
          }
        };
        setArticles([newArt, ...articles]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan koneksi server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) return;

    try {
      const result = await deleteArticleAction(id);
      if (result.success) {
        toast.success("Artikel berhasil dihapus.");
        setArticles(articles.filter((a) => a.id !== id));
      } else {
        toast.error(result.error || "Gagal menghapus artikel.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menghubungi server.");
    }
  };

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Title & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Artikel</h1>
          <p className="text-sm text-gray-500 mt-1">
            Unggah wawasan baru, tips karir, atau cerita inspiratif untuk dibaca oleh seluruh diaspora.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#c24136] text-white rounded-full text-sm font-bold shadow-lg shadow-[#c24136]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Icon icon="lucide:plus" className="w-4 h-4" />
          Tulis Artikel Baru
        </button>
      </div>

      {/* Search Bar & Stats */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Local Search input */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Cari judul, kategori, penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#c24136]/20 focus:border-[#c24136] transition-all bg-white text-black placeholder-gray-400"
          />
          <Icon icon="lucide:search" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Short Summary Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="text-gray-400 font-medium">
            Total Artikel: <span className="font-bold text-gray-900 ml-1">{articles.length}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
          <div className="text-gray-400 font-medium">
            Terfilter: <span className="font-bold text-gray-900 ml-1">{filteredArticles.length}</span>
          </div>
        </div>
      </div>

      {/* Main Table Listing */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Artikel</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Penulis</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal Rilis</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-gray-50/30 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                          <img
                            src={art.coverImage}
                            alt={art.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-sm">
                          <p className="text-sm font-bold text-gray-900 truncate" title={art.title}>
                            {art.title}
                          </p>
                          <p className="text-[11px] text-gray-400 font-semibold truncate mt-0.5">
                            {art.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="px-6 py-5">
                      <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryStyles(art.category)}`}>
                        {art.category}
                      </span>
                    </td>

                    {/* Author information */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                          <img
                            src={art.author.avatar}
                            alt={art.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-950 truncate">
                            {art.author.name}
                          </p>
                          <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">
                            {art.author.role}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-800">{art.publishedAt}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5 font-medium">{art.readTime}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2.5">
                        <Link
                          href={`/artikel/${art.slug}`}
                          target="_blank"
                          className="px-3.5 py-1.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-black transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Icon icon="lucide:external-link" className="w-3.5 h-3.5" />
                          Buka
                        </Link>
                        <button
                          onClick={() => handleDelete(art.id, art.title)}
                          className="px-3.5 py-1.5 border border-red-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Icon icon="lucide:trash-2" className="w-3.5 h-3.5" />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-gray-400 font-medium italic text-xs">
                    Belum ada artikel yang sesuai atau terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden transform animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:book-open" className="w-5 h-5 text-[#c24136]" />
                <h3 className="text-base font-bold text-gray-900">Tulis & Publikasikan Artikel Baru</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:shadow-sm transition-all cursor-pointer"
              >
                <Icon icon="lucide:x" className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Column 1: Article Metadata */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-50 pb-1.5 mb-2">
                    1. Metadata Artikel
                  </h4>
                  
                  {/* Category select */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 ml-1">Kategori</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className="w-full h-11 px-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-xs font-semibold"
                    >
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Karir">Karir</option>
                      <option value="Budaya">Budaya</option>
                      <option value="Komunitas">Komunitas</option>
                    </select>
                    {errors?.category && <p className="text-red-500 text-[10px] ml-1">{errors.category[0]}</p>}
                  </div>

                  {/* Read Time estimate */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 ml-1">Estimasi Waktu Baca</label>
                    <input
                      type="text"
                      name="readTime"
                      placeholder="Contoh: 5 min baca"
                      value={form.readTime}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-xs font-semibold"
                    />
                    {errors?.readTime && <p className="text-red-500 text-[10px] ml-1">{errors.readTime[0]}</p>}
                  </div>

                  {/* Cover image url */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 ml-1">URL Gambar Cover</label>
                    <input
                      type="text"
                      name="coverImage"
                      placeholder="Masukkan URL gambar cover Unsplash"
                      value={form.coverImage}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-xs font-semibold"
                    />
                    {errors?.coverImage && <p className="text-red-500 text-[10px] ml-1">{errors.coverImage[0]}</p>}
                  </div>
                </div>

                {/* Column 2: Author Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-50 pb-1.5 mb-2">
                    2. Detail Penulis
                  </h4>
                  
                  {/* Author Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 ml-1">Nama Penulis</label>
                    <input
                      type="text"
                      name="authorName"
                      placeholder="Contoh: Rian Aditya"
                      required
                      value={form.authorName}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-xs font-semibold"
                    />
                    {errors?.authorName && <p className="text-red-500 text-[10px] ml-1">{errors.authorName[0]}</p>}
                  </div>

                  {/* Author Role */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 ml-1">Peran/Instansi Penulis</label>
                    <input
                      type="text"
                      name="authorRole"
                      placeholder="Contoh: Alumni Tokyo Tech"
                      required
                      value={form.authorRole}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-xs font-semibold"
                    />
                    {errors?.authorRole && <p className="text-red-500 text-[10px] ml-1">{errors.authorRole[0]}</p>}
                  </div>

                  {/* Author Avatar url */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 ml-1">URL Avatar Penulis</label>
                    <input
                      type="text"
                      name="authorAvatar"
                      placeholder="Masukkan URL foto profil penulis"
                      value={form.authorAvatar}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-xs font-semibold"
                    />
                    {errors?.authorAvatar && <p className="text-red-500 text-[10px] ml-1">{errors.authorAvatar[0]}</p>}
                  </div>
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-50 pb-1.5 mb-2">
                  3. Konten Utama
                </h4>

                {/* Article Title */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 ml-1">Judul Artikel</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Masukkan judul artikel yang menarik..."
                    required
                    value={form.title}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-sm font-bold"
                  />
                  {errors?.title && <p className="text-red-500 text-[10px] ml-1">{errors.title[0]}</p>}
                </div>

                {/* Article Excerpt */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 ml-1">Ringkasan Singkat (Excerpt)</label>
                  <textarea
                    name="excerpt"
                    placeholder="Tuliskan ringkasan singkat artikel dalam 1-2 kalimat..."
                    required
                    rows={2}
                    value={form.excerpt}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-xs font-semibold leading-relaxed resize-none"
                  />
                  {errors?.excerpt && <p className="text-red-500 text-[10px] ml-1">{errors.excerpt[0]}</p>}
                </div>

                {/* Article Content */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between pr-2">
                    <label className="text-[11px] font-bold text-gray-500 ml-1">Isi Konten Artikel</label>
                    <span className="text-[9px] text-gray-400 font-semibold">
                      {"Mendukung markdown dasar: `###` untuk Subjudul, `*` untuk Poin, dan `>` untuk Kutipan"}
                    </span>
                  </div>
                  <textarea
                    name="content"
                    placeholder="Tuliskan isi artikel Anda di sini..."
                    required
                    rows={10}
                    value={form.content}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c24136] text-sm font-medium leading-relaxed"
                  />
                  {errors?.content && <p className="text-red-500 text-[10px] ml-1">{errors.content[0]}</p>}
                </div>
              </div>

              {/* General errors */}
              {errors?.message && (
                <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl text-center">
                  <p className="text-red-600 text-xs font-bold">{errors.message[0]}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-200 hover:bg-gray-50 hover:text-black rounded-full text-xs font-bold text-gray-600 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-2.5 bg-[#c24136] hover:bg-[#a1352c] text-white rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Icon icon="lucide:loader-2" className="w-3.5 h-3.5 animate-spin" />
                      Memposting...
                    </>
                  ) : (
                    <>
                      <Icon icon="lucide:send" className="w-3.5 h-3.5" />
                      Publikasikan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
