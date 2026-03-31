import { HeroSection } from "./partials/HeroSection";
import { ProjectSection } from "./partials/ProjectSection";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white">
      <HeroSection />
      <ProjectSection />
    </main>
  );
}
