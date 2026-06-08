"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth.actions";

interface SidebarProps {
  role?: string;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "lucide:home",
      roles: ["ADMIN"],
    },
    {
      label: "Kelola Topik",
      href: "/dashboard/topics",
      icon: "lucide:file-text",
      roles: ["ADMIN"],
    },
    {
      label: "Kelola Kontributor",
      href: "/dashboard/contributors",
      icon: "lucide:users",
      roles: ["ADMIN"],
    },
    {
      label: "Kelola Artikel",
      href: "/dashboard/artikel",
      icon: "lucide:book-open",
      roles: ["ADMIN", "ARTICLE_ADMIN"],
    },
    {
      label: "Manajemen User",
      href: "/dashboard/users",
      icon: "lucide:user-cog",
      roles: ["ADMIN"],
      hasChevron: true,
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(role || "USER")
  );

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col py-6">
      <div className="flex-1 px-4 space-y-2">
        {filteredItems.map((item: any) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
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
