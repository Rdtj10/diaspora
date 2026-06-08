"use client";

import { Icon } from "@iconify/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

interface ArtikelFilterProps {
  categories: string[];
  activeCategory: string;
  activeQuery: string;
}

export function ArtikelFilter({
  categories,
  activeCategory = "Semua",
  activeQuery = "",
}: ArtikelFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(activeQuery);

  // Sync search input state with URL parameter if it changes externally
  useEffect(() => {
    setSearch(activeQuery);
  }, [activeQuery]);

  const updateFilters = (category: string, query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category && category !== "Semua") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    startTransition(() => {
      router.push(pathname + "?" + params.toString(), { scroll: false });
    });
  };

  // Debounced/delayed search trigger on submit or Enter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(activeCategory, search);
  };

  const handleCategoryClick = (category: string) => {
    updateFilters(category, search);
  };

  const handleClear = () => {
    setSearch("");
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const isFiltered = activeCategory !== "Semua" || activeQuery !== "";

  return (
    <div className="w-full flex flex-col gap-6 mb-12">
      {/* Category Tabs & Search Bar Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Categories list */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => handleCategoryClick("Semua")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === "Semua"
                ? "bg-[#c24136] text-white shadow-md shadow-[#c24136]/15"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#c24136] text-white shadow-md shadow-[#c24136]/15"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearchSubmit} className="relative flex-grow md:max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c24136]/20 focus:border-[#c24136] transition-all bg-white text-black placeholder-gray-400 shadow-sm"
            />
            <Icon
              icon="lucide:search"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  updateFilters(activeCategory, "");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
              >
                <Icon icon="lucide:x" className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Loading state indicator and clear filters button */}
      <div className="flex items-center justify-between min-h-[28px]">
        <div>
          {isPending && (
            <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 animate-pulse">
              <Icon icon="lucide:loader-2" className="w-3.5 h-3.5 animate-spin" />
              Memuat data...
            </span>
          )}
        </div>
        {isFiltered && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs font-bold text-[#c24136] hover:underline cursor-pointer"
          >
            <Icon icon="lucide:rotate-ccw" className="w-3.5 h-3.5" />
            Atur Ulang Filter & Pencarian
          </button>
        )}
      </div>
    </div>
  );
}
