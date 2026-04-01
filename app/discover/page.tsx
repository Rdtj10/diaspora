import type { Metadata } from "next";
import { DiscoverSection } from "./partials/DiscoverSection";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Discover Projects | Diaspora Nusantara",
  description: "Temukan berbagai proyek dan inisiatif diaspora Indonesia untuk berkontribusi bagi negeri.",
};

export default async function DiscoverPage() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-white">
      <DiscoverSection isLoggedIn={!!session} />
    </main>
  );
}
