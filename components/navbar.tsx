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
    <nav className="w-full h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-12 sticky top-0 z-50">
      <div className="flex items-center gap-4 md:gap-12">
        <Link href="/" className="flex flex-col text-[16px] sm:text-[18px] md:text-[22px] font-extrabold leading-[0.9] text-[#c24136] tracking-tight flex-shrink-0">
          <span>Diaspora</span>
          <span>Nusantara</span>
        </Link>
 
        <div className="flex items-center gap-3 md:gap-8 text-xs md:text-sm font-semibold text-gray-700 mt-1">
          <Link href="/discover" className="hover:text-[#c24136] transition-colors">
            Discover
          </Link>
          <Link href="/artikel" className="hover:text-[#c24136] transition-colors">
            Artikel
          </Link>
        </div>
      </div>
 
      <div className="flex items-center gap-2 md:gap-6">
        {!session ? (
          <>
            <Link href="/signup" className="text-xs md:text-sm font-semibold text-gray-700 hover:text-black transition-colors whitespace-nowrap">
              Sign up
            </Link>
            <Button asChild className="rounded-full px-4 md:px-8 bg-[#1a1824] hover:bg-black text-white shadow-lg shadow-black/10 font-bold h-9 md:h-11 text-xs md:text-sm">
              <Link href="/login">
                Log in
              </Link>
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-3 md:gap-6">
            <Button asChild variant="secondary" className="rounded-full px-3 md:px-6 bg-[#f3f4f6] hover:bg-gray-200 text-gray-900 font-bold h-9 md:h-10 border-none shadow-sm text-xs md:text-sm">
              <Link href="/my-projects">
                Terdaftar
              </Link>
            </Button>
            
            <Link href="/my-projects?tab=tersimpan" className="text-gray-700 hover:text-[#c24136] transition-colors flex-shrink-0">
              <Bookmark className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
 
            <UserNav user={user} />
          </div>
        )}
      </div>
    </nav>
  );
}
