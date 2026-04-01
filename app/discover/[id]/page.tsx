import type { Metadata } from "next";
import { ProjectDetailSection } from "./partials/ProjectDetailSection";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Project Detail | Diaspora Nusantara",
  description: "Pelajari lebih lanjut mengenai proyek ini dan bagaimana Anda bisa berkontribusi.",
};

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-white">
      <ProjectDetailSection id={params.id} isLoggedIn={!!session} />
    </main>
  );
}
