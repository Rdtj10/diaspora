"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { BookmarkButton } from "./BookmarkButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RegisteredProjectCardProps {
  id: string;
  location: string;
  topic: string;
  title: string;
  desc?: string;
  participantsCount: number;
  participantsMax: number;
  topicColor: string;
  cardColor: string;
  status: string; // WAITING, APPROVED, CANCELLED
  isLoggedIn?: boolean;
}

export function RegisteredProjectCard({
  id,
  location,
  topic,
  title,
  desc,
  participantsCount,
  participantsMax,
  topicColor,
  cardColor,
  status,
  isLoggedIn = true,
}: RegisteredProjectCardProps) {
  const getStatusDisplay = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return {
          label: "Approve",
          className: "bg-[#71bc45] hover:bg-[#63a43c] text-white cursor-default",
        };
      case "CANCELLED":
        return {
          label: "Dibatalkan",
          className: "bg-[#c24136] hover:bg-[#a6372e] text-white cursor-default",
        };
      default:
        return {
          label: "Waiting",
          className: "bg-[#1a1824] hover:bg-black text-white cursor-default",
        };
    }
  };

  const statusInfo = getStatusDisplay(status);

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
          <BookmarkButton projectId={id} isLoggedIn={isLoggedIn} size={18} className="mt-0.5" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">
            {title}
          </h3>
          {desc && (
            <p className="mt-2 text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
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

        <div className="flex gap-2">
          <Link
            href={`/discover/${id}`}
            className="text-xs font-semibold text-gray-500 hover:text-black transition-colors self-center px-2"
          >
            Detail
          </Link>
          <Button
            className={cn(
              "h-8 rounded-full px-8 text-xs font-bold border-none shadow-sm transition-all",
              statusInfo.className
            )}
          >
            {statusInfo.label}
          </Button>
        </div>
      </div>
    </Card>
  );
}
