"use client";

import { useState } from "react";
import { RegisteredProjectCard } from "@/app/components/RegisteredProjectCard";
import { ProjectCard } from "@/app/components/ProjectCard";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface MyProjectsContentProps {
  registrations: any[];
  bookmarks: any[];
}

export function MyProjectsContent({ registrations, bookmarks }: MyProjectsContentProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "tersimpan" ? "tersimpan" : "terdaftar";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="w-full max-w-7xl mx-auto px-8 md:px-12 py-12">
      {/* Premium Tab Toggle */}
      <div className="flex justify-center mb-16">
        <div className="grid grid-cols-2 p-1 bg-gray-50/50 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm relative overflow-hidden min-w-[240px]">
          <button
            onClick={() => setActiveTab("terdaftar")}
            className={cn(
              "px-8 py-2 text-sm font-bold rounded-full transition-all duration-300 relative z-10",
              activeTab === "terdaftar" ? "text-white" : "text-gray-500 hover:text-gray-900"
            )}
          >
            Terdaftar
          </button>
          <button
            onClick={() => setActiveTab("tersimpan")}
            className={cn(
              "px-8 py-2 text-sm font-bold rounded-full transition-all duration-300 relative z-10",
              activeTab === "tersimpan" ? "text-white" : "text-gray-500 hover:text-gray-900"
            )}
          >
            Tersimpan
          </button>
          
          {/* Animated Background Slider */}
          <div 
            className={cn(
              "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#1a1824] rounded-full transition-all duration-300 ease-in-out shadow-lg shadow-black/10",
              activeTab === "terdaftar" ? "left-1 translate-x-0" : "left-1 translate-x-full"
            )} 
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 capitalize">
          {activeTab}
        </h2>
        
        {activeTab === "terdaftar" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {registrations.length > 0 ? (
              registrations.map((reg) => (
                <RegisteredProjectCard
                  key={reg.id}
                  id={reg.project.id}
                  location={reg.project.location}
                  topic={reg.project.topic}
                  title={reg.project.title}
                  desc={reg.project.description}
                  participantsCount={reg.project.participantsCount}
                  participantsMax={reg.project.participantsMax}
                  topicColor={reg.project.topicColor}
                  cardColor={reg.project.cardColor}
                  status={reg.status}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">Anda belum mendaftar di proyek apapun.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookmarks.length > 0 ? (
              bookmarks.map((bookmark) => (
                <ProjectCard
                  key={bookmark.id}
                  id={bookmark.project.id}
                  location={bookmark.project.location}
                  topic={bookmark.project.topic}
                  title={bookmark.project.title}
                  desc={bookmark.project.description}
                  participantsCount={bookmark.project.participantsCount}
                  participantsMax={bookmark.project.participantsMax}
                  topicColor={bookmark.project.topicColor}
                  cardColor={bookmark.project.cardColor}
                  isLoggedIn={true}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">Anda belum menyimpan proyek apapun.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
