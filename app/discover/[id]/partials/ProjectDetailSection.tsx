"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/app/components/ProjectCard";
import { RegisterDialog } from "@/app/components/RegisterDialog";
import { BookmarkButton } from "@/app/components/BookmarkButton";

interface ProjectDetailProps {
  id: string;
  isLoggedIn?: boolean;
}

const RELATED_PROJECTS = [
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

export function ProjectDetailSection({ id, isLoggedIn = false }: ProjectDetailProps) {
  const router = useRouter();

  return (
    <section className="w-full bg-white px-8 md:px-12 py-8">
      <div className="container mx-auto max-w-7xl">
        <button
          onClick={() => router.back()}
          className="mb-8 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Icon icon="lucide:arrow-left" className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2 rounded-3xl bg-[#fcfce9] p-8 md:p-12 aspect-[4/3] flex items-center justify-center border border-gray-50 shadow-sm transition-all hover:shadow-md">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Akses Pendidikan Digital di Daerah Terpencil
            </h1>
          </div>

          <div className="w-full lg:w-1/2 space-y-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="bg-[#c24136] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  DKI Jakarta, Cakung
                </span>
                <span className="bg-[#cc49af] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Pendidikan
                </span>
              </div>
              <BookmarkButton projectId={id} isLoggedIn={isLoggedIn} size={24} />
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Dictumst sed enim est val putrate accumsan cursus amet. A euismod egestas nulla commodo faucibus. Venenatis ac auctor ut velit id. Vestibulum am elvaus nec pharetea tristique malesuada et. Fermentum sed eu odio velit.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Feugiat quam arcu aliquet felis blandit mauris pharetra ornare. Et neque sit viverra nunc massa arcu dignissim uma et. Sapien elit non pretium in. Hendrerit cura bitur proin ut pulvinar in euismod. Nam ac ultrices eget volutpat. Et donec ligula tempor fusce purus leo.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Arcu nisl sed in nisl at lectus mollis. Egestas aliquet malesuada ipsum es neq ue sit. Sollicitudin ut consectetur uma quam. Id gravida pellentesque a quam. Proin aliquam semper aliquet hna a inet metus faucibus nunc. Condimentum amet habitant isus id faucibus accumsan vitae. Amet at leo a ulamcorper.
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:users" className="w-5 h-5 text-gray-700 font-bold" />
                <span className="text-lg font-bold text-gray-900">12/100</span>
              </div>
              <RegisterDialog
                projectId={id}
                location="DKI Jakarta, Cakung"
                topic="Pendidikan"
                topicColor="#cc49af"
                description="Banyak sekolah di daerah terpencil masih memiliki keterbatasan akses terhadap teknologi pembelajaran digital."
                isLoggedIn={isLoggedIn}
              >
                <Button className="h-12 px-24 rounded-full bg-[#1a1824] hover:bg-black text-white font-bold transition-all shadow-lg shadow-black/10">
                  Daftar
                </Button>
              </RegisterDialog>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More like this</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_PROJECTS.map((project, idx) => (
              <ProjectCard key={idx} {...project} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
