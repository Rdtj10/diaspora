"use client";

import { Icon } from "@iconify/react";
import { ProjectCard } from "../../components/ProjectCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface DiscoverSectionProps {
  projects: any[];
  isLoggedIn?: boolean;
  bookmarkedIds?: Set<string>;
  filterOptions: {
    topics: string[];
    provinces: string[];
    cities: string[];
  };
  activeFilters: {
    topic?: string;
    province?: string;
    city?: string;
  };
}

export function DiscoverSection({ 
  projects, 
  isLoggedIn = false,
  bookmarkedIds = new Set(),
  filterOptions,
  activeFilters
}: DiscoverSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create query string for URL update
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value), { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const isFilterActive = !!(activeFilters.topic || activeFilters.province || activeFilters.city);

  const FILTER_CONFIG = [
    { key: "topic", label: "Bidang", current: activeFilters.topic, options: filterOptions.topics },
    { key: "province", label: "Provinsi", current: activeFilters.province, options: filterOptions.provinces },
    { key: "city", label: "Kota", current: activeFilters.city, options: filterOptions.cities },
  ];

  return (
    <section className="w-full py-12 bg-white px-8 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm bg-white">
              Populer
              <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
            </button>
            
            {isFilterActive && (
              <button 
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#c24136] hover:bg-[#c24136]/5 rounded-full transition-colors"
              >
                <Icon icon="lucide:x" className="w-3.5 h-3.5" />
                Hapus Filter
              </button>
            )}
          </div>
          
          <div className="flex items-center rounded-full border border-gray-200 overflow-hidden bg-white p-1 shadow-sm">
            <span className="px-5 text-sm font-bold border-r border-gray-200 text-gray-900 hidden sm:inline">
              Discover
            </span>

            {FILTER_CONFIG.map((filter: any) => (
              <DropdownMenu key={filter.key}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className={`flex items-center gap-1.5 px-4 lg:px-6 py-2 text-sm font-medium hover:bg-gray-50 transition-colors border-r border-gray-200 last:border-0 outline-none ${
                        filter.current ? "text-[#c24136] bg-gray-50/50" : "text-gray-600"
                    }`}
                  >
                    <span className="truncate max-w-[80px] lg:max-w-[120px]">
                      {filter.current || filter.label}
                    </span>
                    <Icon icon="lucide:chevron-down" className={`w-4 h-4 transition-transform ${filter.current ? "text-[#c24136]" : "text-gray-400"}`} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="rounded-xl p-1 min-w-[200px] shadow-xl border-gray-100">
                  <DropdownMenuItem 
                    onClick={() => handleFilterChange(filter.key, "")}
                    className="rounded-lg text-xs font-semibold text-gray-400"
                  >
                    Semua {filter.label}
                  </DropdownMenuItem>
                  {filter.options.map((opt: any) => (
                    <DropdownMenuItem 
                      key={opt}
                      onClick={() => handleFilterChange(filter.key, opt)}
                      className={`rounded-lg cursor-pointer ${filter.current === opt ? "bg-[#c24136]/10 text-[#c24136] font-bold" : "text-gray-700"}`}
                    >
                      {opt}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          <div className="w-[120px] hidden md:block"></div>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project: any) => (
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
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
              <Icon icon="lucide:search-x" className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Project Tidak Ditemukan</h3>
            <p className="text-gray-500 max-w-xs mx-auto text-sm">
              Maaf, kami tidak menemukan project yang sesuai dengan filter kamu. Coba ganti filter atau hapus semua filter.
            </p>
            <button 
              onClick={clearFilters}
              className="mt-8 px-8 py-2.5 bg-[#1a1824] text-white rounded-full text-sm font-bold hover:bg-black transition-all"
            >
              Hapus Semua Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
