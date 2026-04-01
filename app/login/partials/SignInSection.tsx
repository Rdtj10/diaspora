import Image from "next/image";
import { SignInForm } from "../components/SignInForm";

export function SignInSection() {
  return (
    <section className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-[#F9FAFB]">
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center bg-white/50 border-r border-gray-100 relative overflow-hidden">
        <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl z-10 select-none transform hover:scale-[1.02] transition-transform duration-700">
          <Image
            src="/assets/shared-card.webp"
            alt="Diaspora Nusantara Showcase"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="absolute bottom-8 text-center w-full">
          <span className="text-[#c24136] font-bold text-sm tracking-widest uppercase">
            Diaspora Nusantara
          </span>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center bg-white">
        <SignInForm />
      </div>
    </section>
  );
}
