import { getRegistrations, getRegistrationStats } from "@/lib/actions/project.actions";
import { Icon } from "@iconify/react";

export default async function KelolaKontributorPage() {
  const registrations = await getRegistrations();
  const stats = await getRegistrationStats();

  const statCards = [
    { label: "Total Kontributor", value: stats.total, sub: "kontributor", color: "text-gray-900" },
    { label: "Waiting", value: stats.waiting, sub: "kontributor", color: "text-gray-900" },
    { label: "Approve", value: stats.approved, sub: "kontributor", color: "text-gray-900" },
    { label: "Dibatalkan", value: stats.cancelled, sub: "kontributor", color: "text-gray-900" },
  ];

  return (
    <div className="p-8 md:p-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <span>Dashboard</span>
        <Icon icon="lucide:chevron-right" className="w-3 h-3" />
        <span className="text-gray-600 font-medium">Kelola Kontributor</span>
      </div>

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Kontributor</h1>
        <p className="text-sm text-gray-500 mt-1">Lihat dan kelola diaspora yang mendaftar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 mb-2">{card.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${card.color}`}>{card.value}</span>
              <span className="text-xs text-gray-400 font-medium">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Action Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Icon icon="lucide:search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-11 pr-4 py-2.5 w-full md:w-[320px] bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c24136]/5 focus:border-[#c24136] transition-all"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Kategori
            <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Provinsi
            <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Status
            <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Date
            <Icon icon="lucide:calendar" className="w-4 h-4 text-gray-400 ml-2" />
          </button>
        </div>

        <button className="px-6 py-2.5 bg-[#c24136] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#c24136]/20 transition-all hover:bg-[#a1352c]">
          Kelola Status Persetujuan
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Topik</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Provinsi/Kota</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Note</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.length > 0 ? (
                registrations.map((reg: any) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{reg.user.fullName}</span>
                        <span className="text-[11px] text-gray-400 mt-0.5">{reg.user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600 line-clamp-1 max-w-[200px]">{reg.project.title}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600">{reg.project.topic}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600">{reg.project.location}</span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-600 line-clamp-1 max-w-[200px] italic">
                        {reg.note || "-"}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {reg.status === "APPROVED" && (
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100 uppercase tracking-wide">
                          Approved
                        </span>
                      )}
                      {reg.status === "WAITING" && (
                        <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full border border-gray-100 uppercase tracking-wide">
                          Waiting
                        </span>
                      )}
                      {reg.status === "CANCELLED" && (
                        <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full border border-red-100 uppercase tracking-wide">
                          Decline
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-95">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 italic text-sm">
                    Belum ada kontributor yang mendaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-center gap-2">
            <button className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors">
                <Icon icon="lucide:chevron-left" className="w-3.5 h-3.5" />
                Sebelumnya
            </button>
            <div className="flex items-center gap-1 mx-4">
                {[1, 2, 3, "...", 7].map((n, i) => (
                    <button 
                        key={i} 
                        className={`w-7 h-7 rounded-md text-[11px] font-bold flex items-center justify-center transition-all ${
                            n === 1 ? "bg-[#c24136] text-white shadow-md shadow-[#c24136]/20" : "text-gray-400 hover:bg-gray-200/50"
                        }`}
                    >
                        {n}
                    </button>
                ))}
            </div>
            <button className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors">
                Selanjutnya
                <Icon icon="lucide:chevron-right" className="w-3.5 h-3.5" />
            </button>
        </div>
      </div>
    </div>
  );
}
