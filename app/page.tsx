import { HeroSection } from "./partials/HeroSection";
import { ProjectSection } from "./partials/ProjectSection";
import { getSession } from "@/lib/session";
import { getAllProjects, getUserProjects } from "@/lib/actions/project.actions";

export default async function Home() {
  const session = await getSession();
  const projects = await getAllProjects();
  const { bookmarks } = await getUserProjects();
  
  const bookmarkedIds = new Set(bookmarks.map(b => b.projectId));

  return (
    <main className="flex-1 w-full bg-white">
      <HeroSection />
      <ProjectSection 
        projects={projects.slice(0, 8)} 
        isLoggedIn={!!session} 
        bookmarkedIds={bookmarkedIds}
      />
    </main>
  );
}
