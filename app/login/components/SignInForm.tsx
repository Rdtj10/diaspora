"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/actions/auth.actions";

export function SignInForm() {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-[400px] w-full space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Selamat Datang Kembali di,<br />
          <span className="text-[#c24136]">Diaspora Nusantara</span>
        </h1>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 ml-1">Email</label>
          <Input 
            name="email"
            required
            placeholder="Email" 
            type="email" 
            className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" 
          />
          {error?.email && <p className="text-red-500 text-[10px] ml-1">{error.email[0]}</p>}
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 ml-1">Password</label>
          <Input 
            name="password"
            required
            placeholder="Password" 
            type="password" 
            className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" 
          />
          {error?.password && <p className="text-red-500 text-[10px] ml-1">{error.password[0]}</p>}
        </div>

        {error?.message && <p className="text-red-500 text-center text-xs">{error.message[0]}</p>}

        <div className="pt-2">
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#1a1824] hover:bg-black text-white rounded-full font-bold transition-all shadow-lg shadow-black/5"
          >
            {isLoading ? "Memproses..." : "Login"}
          </Button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm font-medium text-gray-500">
          Belum punya akun?{" "}
          <Link href="/signup" className="text-black font-bold hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
