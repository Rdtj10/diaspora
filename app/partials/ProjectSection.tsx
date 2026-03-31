"use client";

import { Icon } from "@iconify/react";
import { ProjectCard } from "../components/ProjectCard";

const FILTER_OPTIONS = [
  { label: "Bidang" },
  { label: "Provinsi" },
  { label: "Kota" },
];

const PROJECTS = [
  {
    location: "Aceh, Banda Aceh",
    topic: "Lingkungan",
    title: "Pengelolaan Sampah yang Belum Berkelanjutan",
    desc: "Banyak sekolah di daerah terpencil masih memiliki keterbatasan akses terhadap teknologi pembelajaran digital.",
    participantsCount: 12,
    participantsMax: 100,
    topicColor: "#a3d139",
    cardColor: "#f4ebfb",
  },
  {
    location: "Banjarmasin",
    topic: "Kesehatan",
    title: "Rendahnya Kesadaran Kesehatan Mental di Masyarakat",
    desc: "Banyak sekolah di daerah terpencil masih memiliki keterbatasan akses terhadap teknologi pembelajaran digital.",
    participantsCount: 12,
    participantsMax: 100,
    topicColor: "#468cd2",
    cardColor: "#fdf0e6",
  },
  {
    location: "Makassar",
    topic: "Ekonomi",
    title: "Tantangan ekonomi lokal, pengembangan UMKM, dan pemberdayaan ekonomi masyarakat.",
    participantsCount: 12,
    participantsMax: 100,
    topicColor: "#bec83b",
    cardColor: "#edfbee",
  },
  {
    location: "DKI Jakarta, Cakung",
    topic: "Pendidikan",
    title: "Akses Pendidikan Digital di Daerah Terpencil",
    desc: "Banyak sekolah di daerah terpencil masih memiliki keterbatasan akses terhadap teknologi pembelajaran digital.",
    participantsCount: 12,
    participantsMax: 100,
    topicColor: "#cc49af",
    cardColor: "#fcfce9",
  },
  {
    location: "Bali, Bali",
    topic: "Teknologi",
    title: "Permasalahan terkait transformasi digital, literasi teknologi, dan pengembangan sistem.",
    participantsCount: 12,
    participantsMax: 100,
    topicColor: "#595e69",
    cardColor: "#eafdfd",
  },
  {
    location: "Medan",
    topic: "Sosial",
    title: "Permasalahan sosial seperti kesenjangan, pemberdayaan komunitas, dan inklusi sosial.",
    participantsCount: 12,
    participantsMax: 100,
    topicColor: "#5e6ad2",
    cardColor: "#fbeef4",
  },
  {
    location: "Makassar",
    topic: "Ekonomi",
    title: "Tantangan ekonomi lokal, pengembangan UMKM, dan pemberdayaan ekonomi masyarakat.",
    participantsCount: 12,
    participantsMax: 100,
    topicColor: "#bec83b",
    cardColor: "#edfbee",
  },
  {
    location: "DKI Jakarta, Cakung",
    topic: "Pendidikan",
    title: "Akses Pendidikan Digital di Daerah Terpencil",
    desc: "Banyak sekolah di daerah terpencil masih memiliki keterbatasan akses terhadap teknologi pembelajaran digital.",
    participantsCount: 12,
    participantsMax: 100,
    topicColor: "#cc49af",
    cardColor: "#fcfce9",
  },
];

export function ProjectSection() {
  return (
    <section className="w-full py-16 bg-white px-8 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
            Populer
            <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="flex items-center rounded-full border border-gray-200 overflow-hidden bg-white p-1">
            <span className="px-5 text-sm font-bold border-r border-gray-200">
              Discover
            </span>

            {FILTER_OPTIONS.map((filter) => (
              <button 
                key={filter.label} 
                className="flex items-center gap-1.5 px-4 lg:px-6 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors border-r border-gray-200 last:border-0"
              >
                {filter.label}
                <Icon icon="lucide:chevron-down" className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>

      </div>
    </section>
  );
}
