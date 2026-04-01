"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/actions/auth.actions";

export function SignUpForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    country: "",
    city: "",
    originCity: "",
    status: "",
    scholarship: "",
    university: "",
    expertise: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await signUp(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-[500px] w-full space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Selamat Datang di,<br />
          <span className="text-[#c24136]">Diaspora Nusantara</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-1.5 col-span-1 md:col-span-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">Nama Lengkap</label>
              <Input name="fullName" required value={formValues.fullName} onChange={handleChange} placeholder="Nama Lengkap" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
              {error?.fullName && <p className="text-red-500 text-[10px] ml-1">{error.fullName[0]}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Email</label>
              <Input name="email" type="email" required value={formValues.email} onChange={handleChange} placeholder="Email" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
              {error?.email && <p className="text-red-500 text-[10px] ml-1">{error.email[0]}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Password</label>
              <Input name="password" type="password" required value={formValues.password} onChange={handleChange} placeholder="Password (min. 6 karakter)" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
              {error?.password && <p className="text-red-500 text-[10px] ml-1">{error.password[0]}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">No Handphone</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">+62</span>
                <Input name="phone" value={formValues.phone} onChange={handleChange} placeholder="xxx" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl pl-12 pr-4 focus-visible:ring-[#c24136]/20" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Umur</label>
              <Input name="age" value={formValues.age} onChange={handleChange} placeholder="Umur" type="number" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
            </div>
            
            <div className="col-span-1 md:col-span-2 pt-4">
              <Button 
                type="button"
                onClick={nextStep}
                className="w-full h-12 bg-[#1a1824] hover:bg-black text-white rounded-full font-bold transition-all transform hover:scale-[1.01]"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Negara Tinggal Saat Ini</label>
              <Input name="country" value={formValues.country} onChange={handleChange} placeholder="example: Korea" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Kota Tinggal Saat Ini</label>
              <Input name="city" value={formValues.city} onChange={handleChange} placeholder="example: Soyang" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Asal Kota/Provinsi</label>
              <Input name="originCity" value={formValues.originCity} onChange={handleChange} placeholder="example: Aceh, Banda Aceh" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Status Saat Ini</label>
              <Input name="status" value={formValues.status} onChange={handleChange} placeholder="example: Mahasiswa" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Program Beasiswa (optional)</label>
              <Input name="scholarship" value={formValues.scholarship} onChange={handleChange} placeholder="example: LPDP 2024" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">Institut/ Universitas</label>
              <Input name="university" value={formValues.university} onChange={handleChange} placeholder="example: Korea University" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
            </div>
            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 ml-1">Bidang Keahlian</label>
              <Input name="expertise" value={formValues.expertise} onChange={handleChange} placeholder="example: Teknologi, Ekonomi" className="h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20" />
            </div>

            {error?.message && <p className="col-span-2 text-red-500 text-center text-xs">{error.message[0]}</p>}

            <div className="col-span-1 md:col-span-2 flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
                className="flex-1 h-12 border-2 border-gray-100 rounded-full font-bold hover:bg-gray-50 transition-all"
              >
                Kembali
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
                className="flex-2 h-12 bg-[#1a1824] hover:bg-black text-white rounded-full font-bold transition-all shadow-lg shadow-black/10"
              >
                {isLoading ? "Memproses..." : "Sign Up"}
              </Button>
            </div>
          </div>
        )}
      </form>

      <div className="text-center">
        <p className="text-sm font-medium text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-black font-bold hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
