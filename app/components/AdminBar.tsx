"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminBarProps {
  role?: string;
}

export function AdminBar({ role }: AdminBarProps) {
  const pathname = usePathname();

  // Only show if user is an ADMIN
  if (role !== "ADMIN") return null;

  // Don't show the bar while on the dashboard pages itself to avoid redundancy
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <div className="w-full bg-[#1a1824] text-white py-2 px-4 md:px-12 flex items-center justify-between sticky top-0 z-[60] border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
          Admin Preview Mode
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-500">
          <Icon icon="lucide:info" className="w-3 h-3" />
          <span>Kamu melihat tampilan publik sebagai Administrator</span>
        </div>
        
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-1.5 bg-[#c24136] hover:bg-[#a1352c] rounded-full text-xs font-bold transition-all shadow-lg shadow-black/20"
        >
          <Icon icon="lucide:layout-dashboard" className="w-3.5 h-3.5" />
          Dashboard
        </Link>
      </div>
    </div>
  );
}
