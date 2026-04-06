"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth.actions";

const MENU_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "lucide:home",
  },
  {
    label: "Kelola Topik",
    href: "/dashboard/topics",
    icon: "lucide:file-text",
  },
  {
    label: "Kelola Kontributor",
    href: "/dashboard/contributors",
    icon: "lucide:users",
  },
  {
    label: "Manajemen User",
    href: "/dashboard/users",
    icon: "lucide:user-cog",
    hasChevron: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col py-6">
      <div className="flex-1 px-4 space-y-2">
        {MENU_ITEMS.map((item: any) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gray-50 text-gray-900 font-semibold shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon icon={item.icon} className={`w-5 h-5 ${isActive ? "text-gray-900" : "text-gray-400"}`} />
                <span className="text-[13px]">{item.label}</span>
              </div>
              {item.hasChevron && (
                <Icon icon="lucide:chevron-right" className="w-4 h-4 text-gray-400" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="px-4 mt-auto">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
          >
            <Icon icon="lucide:log-out" className="w-5 h-5" />
            <span className="text-[13px]">Log out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
