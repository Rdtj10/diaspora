import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { AdminBar } from "@/app/components/AdminBar";
import { getSession } from "@/lib/session";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diaspora Nusantara",
  description: "Menghubungkan pelajar dan profesional Indonesia di seluruh dunia.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const role = session?.role;

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9FAFB] text-black">
        <AdminBar role={role} />
        <Navbar />
        {children}
        <Toaster position="top-center" richColors />
        <Footer />
      </body>
    </html>
  );
}
