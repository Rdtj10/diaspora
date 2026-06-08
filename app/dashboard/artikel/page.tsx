import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import { ArtikelDashboardClient } from "./components/ArtikelDashboardClient";

export const metadata: Metadata = {
  title: "Kelola Artikel | Dashboard Admin",
  description: "Kelola dan publikasikan artikel/wawasan baru bagi diaspora Indonesia.",
};

export default async function KelolaArtikelDashboardPage() {
  const articles = await getArticles();

  return (
    <div className="p-8 md:p-12 pb-20">
      <ArtikelDashboardClient initialArticles={articles} />
    </div>
  );
}
