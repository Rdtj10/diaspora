import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#16161c] py-12 px-8 md:px-12 mt-auto">
      <div className="container mx-auto max-w-7xl flex items-center">
        <Link href="/" className="flex flex-col text-5xl font-bold leading-none text-[#c24136]">
          <span>Diaspora</span>
          <span>Nusantara</span>
        </Link>
      </div>
    </footer>
  );
}
