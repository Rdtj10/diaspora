"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/app/components/ProjectCard";
import { RegisterDialog } from "@/app/components/RegisterDialog";
import { BookmarkButton } from "@/app/components/BookmarkButton";

interface ProjectDetailProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    location: string | null;
    topic: string | null;
    topicColor: string | null;
    cardColor: string | null;
    participantsCount: number;
    participantsMax: number;
  };
  isLoggedIn?: boolean;
  isBookmarked?: boolean;
  relatedProjects?: any[];
  bookmarkedIds?: Set<string>;
}

export function ProjectDetailSection({ 
  project, 
  isLoggedIn = false, 
  isBookmarked = false,
  relatedProjects = [],
  bookmarkedIds = new Set<string>()
}: ProjectDetailProps) {
  const router = useRouter();

  return (
    <section className="w-full bg-white px-8 md:px-12 py-8">
      <div className="container mx-auto max-w-7xl">
        <button
          onClick={() => router.back()}
          className="mb-8 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Icon icon="lucide:arrow-left" className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div 
            className="w-full lg:w-1/2 rounded-3xl p-8 md:p-12 aspect-[4/3] flex items-center justify-center border border-gray-50 shadow-sm transition-all hover:shadow-md"
            style={{ backgroundColor: project.cardColor || "#fcfce9" }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight text-center">
              {project.title}
            </h1>
          </div>

          <div className="w-full lg:w-1/2 space-y-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="bg-[#c24136] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {project.location || "N/A"}
                </span>
                <span 
                  className="text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase"
                  style={{ backgroundColor: project.topicColor || "#cc49af" }}
                >
                  {project.topic || "General"}
                </span>
              </div>
              <BookmarkButton 
                projectId={project.id} 
                isLoggedIn={isLoggedIn} 
                initialBookmarked={isBookmarked}
                size={24} 
              />
            </div>

            <div className="space-y-6">
              {project.description ? (
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">No description available for this project.</p>
              )}
              
              {/* Added standard Lorem Ipsum for visual content if short */}
              <p className="text-gray-600 text-sm leading-relaxed opacity-60">
                Project ini merupakan inisiatif kolaborasi untuk memberikan dampak positif berkelanjutan bagi masyarakat setempat. Partisipasi kamu sangat berharga dalam mewujudkan visi bersama.
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:users" className="w-5 h-5 text-gray-700 font-bold" />
                <span className="text-lg font-bold text-gray-900">
                  {project.participantsCount}/{project.participantsMax}
                </span>
              </div>
              <RegisterDialog
                projectId={project.id}
                location={project.location || ""}
                topic={project.topic || ""}
                topicColor={project.topicColor || ""}
                description={project.title}
                isLoggedIn={isLoggedIn}
              >
                <Button className="h-12 px-24 rounded-full bg-[#1a1824] hover:bg-black text-white font-bold transition-all shadow-lg shadow-black/10">
                  Daftar
                </Button>
              </RegisterDialog>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More like this</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProjects.map((p: any, idx: number) => (
              <ProjectCard 
                key={p.id} 
                id={p.id}
                location={p.location}
                topic={p.topic}
                title={p.title}
                desc={p.description}
                participantsCount={p.participantsCount}
                participantsMax={p.participantsMax}
                topicColor={p.topicColor}
                cardColor={p.cardColor}
                isLoggedIn={isLoggedIn} 
                initialBookmarked={bookmarkedIds.has(p.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
