"use client";

import { Icon } from "@iconify/react";
import { ProjectCard } from "../components/ProjectCard";

interface ProjectSectionProps {
  projects: any[];
  isLoggedIn?: boolean;
  bookmarkedIds?: Set<string>;
}

export function ProjectSection({ 
  projects, 
  isLoggedIn = false,
  bookmarkedIds = new Set()
}: ProjectSectionProps) {
  const FILTER_OPTIONS = [
    { label: "Bidang" },
    { label: "Provinsi" },
    { label: "Kota" },
  ];

  return (
    <section className="w-full py-16 bg-white px-8 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
            Populer
            <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="flex items-center rounded-full border border-gray-200 overflow-hidden bg-white p-1">
            <span className="px-5 text-sm font-bold border-r border-gray-200">
              Discover
            </span>

            {FILTER_OPTIONS.map((filter) => (
              <button 
                key={filter.label} 
                className="flex items-center gap-1.5 px-4 lg:px-6 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors border-r border-gray-200 last:border-0"
              >
                {filter.label}
                <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              id={project.id}
              location={project.location}
              topic={project.topic}
              title={project.title}
              desc={project.description}
              participantsCount={project.participantsCount}
              participantsMax={project.participantsMax}
              topicColor={project.topicColor}
              cardColor={project.cardColor}
              isLoggedIn={isLoggedIn} 
              initialBookmarked={bookmarkedIds.has(project.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
