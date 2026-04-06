"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { registerForProject } from "@/lib/actions/project.actions";
import { toast } from "sonner";

interface RegisterDialogProps {
  projectId?: string;
  location: string;
  topic: string;
  topicColor: string;
  description?: string;
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export function RegisterDialog({
  projectId,
  location,
  topic,
  topicColor,
  description,
  isLoggedIn,
  children,
}: RegisterDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTriggerClick() {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    setOpen(true);
  }

  async function handleSubmit() {
    if (!projectId) return;
    setIsLoading(true);
    setError(null);

    const result = await registerForProject(projectId, note);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setOpen(false);
      setNote("");
      setIsLoading(false);
      toast.success("Berhasil mendaftar ke proyek ini!");
      router.refresh();
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div onClick={handleTriggerClick} className="cursor-pointer">
          {children}
        </div>
        <DialogContent className="sm:max-w-[420px] rounded-2xl p-6 gap-0">
          <DialogHeader className="pb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold text-white bg-[#c24136] uppercase">
                {location}
              </span>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase"
                style={{ backgroundColor: topicColor }}
              >
                {topic}
              </span>
            </div>
            <DialogTitle className="text-[15px] font-medium text-gray-800 leading-relaxed">
              {description || "Deskripsi proyek ini belum tersedia."}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-semibold text-gray-900">Note</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Sampaikan sedikit tentang ketertarikan atau kontribusi yang ingin kamu berikan pada topik ini..."
              className="min-h-[100px] resize-none rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus-visible:ring-[#c24136]/20"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center mt-3">{error}</p>
          )}

          <div className="flex items-center justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="text-sm font-medium text-gray-500 hover:text-black px-4"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="h-10 px-6 rounded-full bg-[#1a1824] hover:bg-black text-white text-sm font-bold shadow-lg shadow-black/10"
            >
              {isLoading ? "Mendaftar..." : "Daftar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[380px] rounded-2xl p-6 text-center">
          <DialogHeader className="items-center pb-2">
            <div className="w-16 h-16 rounded-full bg-[#fdf0e6] flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c24136" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Daftar ke Proyek Ini?
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-500 leading-relaxed pb-4">
            Kamu perlu login terlebih dahulu untuk mendaftar ke proyek ini.
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
