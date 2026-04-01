import { getUserProjects } from "@/lib/actions/project.actions";
import { MyProjectsContent } from "./partials/MyProjectsContent";
import { Suspense } from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Projects | Diaspora Nusantara",
  description: "Lihat daftar proyek yang Anda ikuti dan simpan.",
};

export default async function MyProjectsPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const { registrations, bookmarks } = await getUserProjects();

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="flex justify-center items-center h-96">Loading...</div>}>
        <MyProjectsContent 
          registrations={registrations} 
          bookmarks={bookmarks} 
        />
      </Suspense>
    </main>
  );
}
