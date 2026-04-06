import type { Metadata } from "next";
import { DiscoverSection } from "./partials/DiscoverSection";
import { getSession } from "@/lib/session";
import { getAllProjects, getUserProjects, getFilterOptions } from "@/lib/actions/project.actions";

export const metadata: Metadata = {
  title: "Discover Projects | Diaspora Nusantara",
  description: "Temukan berbagai proyek dan inisiatif diaspora Indonesia untuk berkontribusi bagi negeri.",
};

export default async function DiscoverPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ topic?: string; province?: string; city?: string }> 
}) {
  const session = await getSession();
  const filters = await searchParams;
  
  const projects = await getAllProjects(filters);
  const { bookmarks } = await getUserProjects();
  const filterOptions = await getFilterOptions();

  const bookmarkedIds = new Set(bookmarks.map(b => b.projectId));

  return (
    <main className="min-h-screen bg-white">
      <DiscoverSection 
        projects={projects} 
        isLoggedIn={!!session} 
        bookmarkedIds={bookmarkedIds}
        filterOptions={filterOptions}
        activeFilters={filters}
      />
    </main>
  );
}
