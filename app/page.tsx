import { HeroSection } from "./partials/HeroSection";
import { ProjectSection } from "./partials/ProjectSection";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex-1 w-full bg-white">
      <HeroSection />
      <ProjectSection isLoggedIn={!!session} />
    </main>
  );
}
