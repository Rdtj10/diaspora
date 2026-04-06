import type { Metadata } from "next";
import { ProjectDetailSection } from "./partials/ProjectDetailSection";
import { getSession } from "@/lib/session";
import { getProjectById, getUserProjects, getAllProjects } from "@/lib/actions/project.actions";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  
  if (!project) {
    return {
      title: "Project Not Found | Diaspora Nusantara",
    };
  }

  return {
    title: `${project.title} | Diaspora Nusantara`,
    description: project.description || "Pelajari lebih lanjut mengenai proyek ini.",
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const { bookmarks } = await getUserProjects();
  const isBookmarked = bookmarks.some(b => b.projectId === project.id);
  
  // Fetch some other projects as "related"
  const allProjects = await getAllProjects();
  const relatedProjects = allProjects
    .filter(p => p.id !== project.id)
    .slice(0, 4);

  const bookmarkedIds = new Set(bookmarks.map(b => b.projectId));

  return (
    <main className="min-h-screen bg-white">
      <ProjectDetailSection 
        project={project} 
        isLoggedIn={!!session} 
        isBookmarked={isBookmarked}
        relatedProjects={relatedProjects}
        bookmarkedIds={bookmarkedIds}
      />
    </main>
  );
}
