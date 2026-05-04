"use client";

import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { ProjectCard } from "../components/ProjectCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectSectionProps {
  projects: any[];
  filterOptions: {
    topics: string[];
    provinces: string[];
    cities: string[];
  };
  isLoggedIn?: boolean;
  bookmarkedIds?: Set<string>;
}

export function ProjectSection({ 
  projects, 
  filterOptions,
  isLoggedIn = false,
  bookmarkedIds = new Set<string>()
}: ProjectSectionProps) {
  const [sortBy, setSortBy] = useState("Populer");
  const [filters, setFilters] = useState({
    topic: "Semua Bidang",
    province: "Semua Provinsi",
    city: "Semua Kota"
  });

  const sortedAndFilteredProjects = useMemo(() => {
    let result = [...projects];

    // Apply Filters
    if (filters.topic !== "Semua Bidang") {
      result = result.filter(p => p.topic === filters.topic);
    }
    if (filters.province !== "Semua Provinsi") {
      result = result.filter(p => p.location?.includes(filters.province));
    }
    if (filters.city !== "Semua Kota") {
      result = result.filter(p => p.location?.includes(filters.city));
    }

    // Apply Sorting
    if (sortBy === "Terbaru") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "Lama") {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      // Default: Populer (by participants count)
      result.sort((a, b) => b.participantsCount - a.participantsCount);
    }

    return result;
  }, [projects, filters, sortBy]);

  const FILTER_CATEGORIES = [
    { label: "Bidang", key: "topic", options: ["Semua Bidang", ...filterOptions.topics] },
    { label: "Provinsi", key: "province", options: ["Semua Provinsi", ...filterOptions.provinces] },
    { label: "Kota", key: "city", options: ["Semua Kota", ...filterOptions.cities] },
  ];

  const SORT_OPTIONS = ["Populer", "Terbaru", "Lama"];

  return (
    <section className="w-full py-16 bg-white px-8 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
                {sortBy}
                <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-2xl min-w-[160px]">
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem 
                  key={option} 
                  onClick={() => setSortBy(option)}
                  className="cursor-pointer"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center rounded-full border border-gray-200 overflow-hidden bg-white p-1">
            <span className="px-5 text-sm font-bold border-r border-gray-200">
              Discover
            </span>

            {FILTER_CATEGORIES.map((category) => (
              <DropdownMenu key={category.key}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 px-4 lg:px-6 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors border-r border-gray-200 last:border-0">
                    <span className="max-w-[80px] lg:max-w-[120px] truncate text-gray-600">
                      {filters[category.key as keyof typeof filters].split(" ")[1] || filters[category.key as keyof typeof filters]}
                    </span>
                    <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="rounded-2xl max-h-[300px] overflow-y-auto min-w-[160px]">
                  {category.options.map((option) => (
                    <DropdownMenuItem 
                      key={option} 
                      onClick={() => setFilters(prev => ({ ...prev, [category.key]: option }))}
                      className="cursor-pointer"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        {sortedAndFilteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedAndFilteredProjects.map((project: any) => (
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
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500">Tidak ada proyek yang sesuai dengan kriteria.</p>
            <button 
              onClick={() => setFilters({ topic: "Semua Bidang", province: "Semua Provinsi", city: "Semua Kota" })}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
