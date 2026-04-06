import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopicBadge } from "../components/TopicBadge";

const TOPICS = [
  { label: "Lingkungan", colorClass: "bg-[#a3d139]" },
  { label: "Pendidikan", colorClass: "bg-[#cc49af]" },
  { label: "Sosial", colorClass: "bg-[#5e6ad2]" },
  { label: "Kesehatan", colorClass: "bg-[#468cd2]" },
  { label: "Teknologi", colorClass: "bg-[#595e69]" },
  { label: "Ekonomi", colorClass: "bg-[#bec83b]" },
];

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white/50 pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container px-8 md:px-12 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#111827] leading-[1.15]">
              <strong>Dari</strong> Luar Negeri,<br />
              <strong>Untuk Indonesia</strong>
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
              Diaspora Nusantara menghubungkan pelajar dan profesional Indonesia di seluruh dunia untuk berkontribusi nyata dalam menyelesaikan berbagai permasalahan di tanah air.
            </p>

            <div className="mt-10 mb-6">
              <p className="text-sm font-medium text-gray-900 mb-3">
                <strong>Explore</strong> <span className="text-gray-500 font-normal">berbagai topik di Indonesia</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic: any) => (
                  <TopicBadge key={topic.label} label={topic.label} colorClass={topic.colorClass} />
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-xl mt-4">
              <div className="relative flex items-center w-full h-16 rounded-full bg-gray-100 overflow-hidden shadow-sm border border-transparent focus-within:ring-2 focus-within:ring-[#c24136]/20 transition-all">
                <input
                  type="text"
                  placeholder="Cari permasalahan, bidang, atau lokasi..."
                  className="w-full h-full bg-transparent pl-8 pr-16 text-gray-700 placeholder-gray-400 outline-none"
                />
                <Button 
                  size="icon"
                  className="absolute right-2 top-2 bottom-2 h-12 w-12 rounded-full bg-[#c24136] hover:bg-[#c24136]/90 text-white shadow-none"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              <Image 
                src="/assets/shared-card.webp" 
                alt="Diaspora Nusantara Showcase" 
                width={800} 
                height={600} 
                className="w-full h-auto object-contain object-right"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
