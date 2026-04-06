import prisma from "@/lib/prisma";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default async function AdminDashboardPage() {
  // Fetch some stats for the dashboard
  const [userCount, projectCount, registrationCount] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.registration.count(),
  ]);

  const stats = [
    { label: "Total Pengguna", value: userCount, icon: "lucide:users", color: "bg-blue-50 text-blue-600" },
    { label: "Total Project", value: projectCount, icon: "lucide:briefcase", color: "bg-orange-50 text-orange-600" },
    { label: "Pendaftaran", value: registrationCount, icon: "lucide:clipboard-check", color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="pb-12">
      {/* Header Dashboard */}
      <div className="bg-white border-b border-gray-100 px-8 md:px-12 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data dan pantau aktivitas diaspora nusantara.</p>
        </div>
        <div className="flex items-center gap-3">
           <Link 
            href="/"
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            Lihat Situs
          </Link>
          <button className="px-6 py-2 bg-[#c24136] text-white rounded-full text-sm font-bold shadow-lg shadow-[#c24136]/20 flex items-center gap-2 transition-all hover:scale-[1.02]">
            <Icon icon="lucide:plus" className="w-4 h-4" />
            Project Baru
          </button>
        </div>
      </div>

      <div className="px-8 md:px-12 mt-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center`}>
                <Icon icon={stat.icon} className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[300px]">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Aktivitas Terbaru</h3>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Icon icon="lucide:calendar-clock" className="w-12 h-12 text-gray-200 mb-4" />
              <p className="text-sm text-gray-400">Belum ada aktivitas terbaru untuk ditampilkan.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[300px]">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Project Terpopuler</h3>
             <div className="flex flex-col items-center justify-center py-10 text-center">
              <Icon icon="lucide:trending-up" className="w-12 h-12 text-gray-200 mb-4" />
              <p className="text-sm text-gray-400">Statistik project belum tersedia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
