"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toggleBookmark } from "@/lib/actions/bookmark.actions";

interface BookmarkButtonProps {
  projectId?: string;
  isLoggedIn: boolean;
  initialBookmarked?: boolean;
  size?: number;
  className?: string;
}

export function BookmarkButton({
  projectId,
  isLoggedIn,
  initialBookmarked = false,
  size = 18,
  className = "",
}: BookmarkButtonProps) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }

    if (!projectId || isLoading) return;

    setIsLoading(true);
    const result = await toggleBookmark(projectId);

    if (result?.error === "unauthorized") {
      setShowLoginDialog(true);
    } else if (result?.bookmarked !== undefined) {
      setBookmarked(result.bookmarked);
    }

    setIsLoading(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={`relative z-10 cursor-pointer p-1 rounded-full transition-all duration-200 ${
          bookmarked
            ? "text-[#c24136] scale-110"
            : "text-gray-600 hover:text-black"
        } ${isLoading ? "opacity-50" : ""} ${className}`}
      >
        <Icon
          icon={bookmarked ? "lucide:bookmark-check" : "lucide:bookmark"}
          width={size}
          height={size}
          className={bookmarked ? "fill-[#c24136]" : ""}
        />
      </button>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[380px] rounded-2xl p-6 text-center">
          <DialogHeader className="items-center pb-2">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Icon
                icon="lucide:bookmark"
                width={28}
                height={28}
                className="text-gray-400"
              />
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Simpan Proyek Ini?
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-500 leading-relaxed pb-4">
            Kamu perlu login terlebih dahulu untuk menyimpan proyek ke bookmark.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowLoginDialog(false)}
              className="text-sm font-medium text-gray-500 hover:text-black px-6"
            >
              Nanti Saja
            </Button>
            <Button
              onClick={() => router.push("/login")}
              className="h-10 px-8 rounded-full bg-[#1a1824] hover:bg-black text-white text-sm font-bold shadow-lg shadow-black/10"
            >
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
