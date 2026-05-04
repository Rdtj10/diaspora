import { HeroSection } from "./partials/HeroSection";
import { ProjectSection } from "./partials/ProjectSection";
import { getSession } from "@/lib/session";
import { getAllProjects, getUserProjects, getFilterOptions } from "@/lib/actions/project.actions";

export default async function Home() {
  const session = await getSession();
  const projects = await getAllProjects();
  const { bookmarks } = await getUserProjects();
  const filterOptions = await getFilterOptions();
  
  const bookmarkedIds = new Set<string>(bookmarks.map((b: any) => b.projectId));

  return (
    <main className="flex-1 w-full bg-white">
      <HeroSection />
      <ProjectSection 
        projects={projects} 
        filterOptions={filterOptions}
        isLoggedIn={!!session} 
        bookmarkedIds={bookmarkedIds}
      />
    </main>
  );
}
