import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/session";
import { Bookmark } from "lucide-react";
import prisma from "@/lib/prisma";
import { UserNav } from "@/app/components/UserNav";

export async function Navbar() {
  const session = await getSession();
  let user = null;

  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { fullName: true }
    });
  }

  return (
    <nav className="w-full h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 md:px-12 sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex flex-col text-[22px] font-extrabold leading-[0.9] text-[#c24136] tracking-tight">
          <span>Diaspora</span>
          <span>Nusantara</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700 mt-1">
          <Link href="/discover" className="hover:text-[#c24136] transition-colors">
            Discover
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {!session ? (
          <>
            <Link href="/signup" className="text-sm font-semibold text-gray-700 hover:text-black transition-colors">
              Sign up
            </Link>
            <Button asChild className="rounded-full px-8 bg-[#1a1824] hover:bg-black text-white shadow-lg shadow-black/10 font-bold h-11">
              <Link href="/login">
                Log in
              </Link>
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-6">
            <Button asChild variant="secondary" className="rounded-full px-6 bg-[#f3f4f6] hover:bg-gray-200 text-gray-900 font-bold h-10 border-none shadow-sm">
              <Link href="/my-projects">
                Terdaftar
              </Link>
            </Button>
            
            <Link href="/my-projects?tab=tersimpan" className="text-gray-700 hover:text-[#c24136] transition-colors">
              <Bookmark className="w-6 h-6" />
            </Link>

            <UserNav user={user} />
          </div>
        )}
      </div>
    </nav>
  );
}
