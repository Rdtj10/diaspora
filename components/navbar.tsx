import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="w-full h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 md:px-12">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex flex-col text-[22px] font-extrabold leading-tight text-[#c24136]">
          <span>Diaspora</span>
          <span>Nusantara</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 mt-1">
          <Link href="/discover" className="hover:text-black transition-colors">
            Discover
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/signup" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
          Sign up
        </Link>
        <Button asChild className="rounded-full px-6 bg-[#1a1824] hover:bg-[#1a1824]/90 text-white shadow-sm font-medium h-10">
          <Link href="/login">
            Log in
          </Link>
        </Button>
      </div>
    </nav>
  );
}
