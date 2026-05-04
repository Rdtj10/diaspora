"use client";

import { Icon } from "@iconify/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface FilterOptions {
  topics: string[];
  provinces: string[];
}

export default function ContributorFilters({ options }: { options: FilterOptions }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [topic, setTopic] = useState(searchParams.get("topic") || "Semua");
  const [location, setLocation] = useState(searchParams.get("location") || "Semua");
  const [status, setStatus] = useState(searchParams.get("status") || "Semua");
  const [date, setDate] = useState(searchParams.get("date") || "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "Semua" || !value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString("search", search));
  };

  const handleFilterChange = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Top Bar: Search & Main Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full lg:max-w-md">
          <Icon icon="lucide:search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari nama, email, atau project..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 pr-4 py-3 w-full bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#c24136]/5 focus:border-[#c24136] transition-all shadow-sm placeholder:text-gray-400"
          />
        </form>

        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#c24136] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#c24136]/20 transition-all hover:bg-[#a1352c] active:scale-[0.98] whitespace-nowrap">
          <Icon icon="lucide:check-circle" className="w-4 h-4" />
          Kelola Persetujuan
        </button>
      </div>

      {/* Bottom Bar: Filters & Reset */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 bg-gray-50/50 rounded-[24px] border border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          {/* Topic Filter */}
          <div className="relative min-w-[140px]">
             <select 
              value={topic}
              onChange={(e) => {
                  setTopic(e.target.value);
                  handleFilterChange("topic", e.target.value);
              }}
              className="w-full appearance-none px-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:border-gray-300 transition-colors cursor-pointer focus:outline-none"
            >
              <option value="Semua">Semua Kategori</option>
              {options.topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <Icon icon="lucide:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Province Filter */}
          <div className="relative min-w-[140px]">
            <select 
              value={location}
              onChange={(e) => {
                  setLocation(e.target.value);
                  handleFilterChange("location", e.target.value);
              }}
              className="w-full appearance-none px-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:border-gray-300 transition-colors cursor-pointer focus:outline-none"
            >
              <option value="Semua">Semua Lokasi</option>
              {options.provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Icon icon="lucide:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Status Filter */}
          <div className="relative min-w-[130px]">
            <select 
              value={status}
              onChange={(e) => {
                  setStatus(e.target.value);
                  handleFilterChange("status", e.target.value);
              }}
              className="w-full appearance-none px-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:border-gray-300 transition-colors cursor-pointer focus:outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="WAITING">Waiting</option>
              <option value="APPROVED">Approved</option>
              <option value="CANCELLED">Decline</option>
            </select>
            <Icon icon="lucide:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <input 
              type="date" 
              value={date}
              onChange={(e) => {
                  setDate(e.target.value);
                  handleFilterChange("date", e.target.value);
              }}
              className="pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:border-gray-300 transition-all cursor-pointer focus:outline-none accent-[#c24136]"
            />
            <Icon icon="lucide:calendar" className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Reset Action */}
        {(search || topic !== "Semua" || location !== "Semua" || status !== "Semua" || date) && (
            <button 
                onClick={() => {
                    setSearch("");
                    setTopic("Semua");
                    setLocation("Semua");
                    setStatus("Semua");
                    setDate("");
                    router.push(pathname);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold text-[#c24136] hover:bg-red-50 rounded-xl transition-colors"
            >
                <Icon icon="lucide:rotate-ccw" className="w-3.5 h-3.5" />
                Reset Filter
            </button>
        )}
      </div>
    </div>
  );
}
