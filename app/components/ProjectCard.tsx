"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { RegisterDialog } from "./RegisterDialog";
import { BookmarkButton } from "./BookmarkButton";
import Link from "next/link";

interface ProjectCardProps {
  id?: string;
  location: string;
  topic: string;
  title: string;
  desc?: string;
  participantsCount: number;
  participantsMax: number;
  topicColor: string;
  cardColor: string;
  isLoggedIn?: boolean;
  initialBookmarked?: boolean;
}

export function ProjectCard({
  id,
  location,
  topic,
  title,
  desc,
  participantsCount,
  participantsMax,
  topicColor,
  cardColor,
  isLoggedIn = false,
  initialBookmarked = false,
}: ProjectCardProps) {
  return (
    <Card className="p-2 sm:p-3 overflow-hidden rounded-2xl flex flex-col h-full border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <div
        className="flex-1 rounded-xl p-4 flex flex-col relative"
        style={{ backgroundColor: cardColor }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white bg-[#c24136]">
              {location}
            </span>
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white"
              style={{ backgroundColor: topicColor }}
            >
              {topic}
            </span>
          </div>
          <BookmarkButton 
            projectId={id} 
            isLoggedIn={isLoggedIn} 
            initialBookmarked={initialBookmarked}
            size={18} 
            className="mt-0.5" 
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">
            {title}
          </h3>
          {desc && (
            <p className="mt-2 text-xs text-gray-400 leading-relaxed font-light">
              {desc}
            </p>
          )}
        </div>
      </div>

      <div className="px-2 pt-3 pb-1 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-gray-700">
          <Icon icon="lucide:users" width="16" height="16" />
          <span className="text-sm font-bold">
            {participantsCount}/{participantsMax}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={id ? `/discover/${id}` : "#"}
            className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
          >
            Detail
          </Link>
          <RegisterDialog
            projectId={id}
            location={location}
            topic={topic}
            topicColor={topicColor}
            description={desc || title}
            isLoggedIn={isLoggedIn}
          >
            <Button
              className="h-8 rounded-full px-5 text-xs font-medium bg-[#1a1824] hover:bg-black text-white cursor-pointer"
            >
              Daftar
            </Button>
          </RegisterDialog>
        </div>
      </div>
    </Card>
  );
}
