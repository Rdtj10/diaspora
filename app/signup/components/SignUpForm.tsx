"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/actions/auth.actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info, ExternalLink, FileText, ChevronRight } from "lucide-react";

export function SignUpForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

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
    studyPeriod: "",
    cvLink: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function goToStep(target: number) {
    setStep(target);
  }

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

  const inputClass =
    "h-12 bg-gray-50/50 border-gray-100 rounded-xl px-4 focus-visible:ring-[#c24136]/20";

  return (
    <div className="max-w-[520px] w-full space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Selamat Datang di,
          <br />
          <span className="text-[#c24136]">Diaspora Nusantara</span>
        </h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (s < step) goToStep(s);
              }}
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                s === step
                  ? "bg-[#c24136] text-white scale-110 shadow-md shadow-[#c24136]/30"
                  : s < step
                    ? "bg-[#1a1824] text-white cursor-pointer hover:scale-105"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {s}
            </button>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 rounded-full transition-all duration-500 ${
                  s < step ? "bg-[#1a1824]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ==================== STEP 1 ==================== */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Nama Lengkap
              </label>
              <Input
                name="fullName"
                required
                value={formValues.fullName}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                className={inputClass}
              />
              {error?.fullName && (
                <p className="text-red-500 text-[10px] ml-1">
                  {error.fullName[0]}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Email
              </label>
              <Input
                name="email"
                type="email"
                required
                value={formValues.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputClass}
              />
              {error?.email && (
                <p className="text-red-500 text-[10px] ml-1">
                  {error.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Password
              </label>
              <Input
                name="password"
                type="password"
                required
                value={formValues.password}
                onChange={handleChange}
                placeholder="Password (min. 6 karakter)"
                className={inputClass}
              />
              {error?.password && (
                <p className="text-red-500 text-[10px] ml-1">
                  {error.password[0]}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                No Handphone
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                  +62
                </span>
                <Input
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  placeholder="xxx"
                  className={`${inputClass} pl-12`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Umur
              </label>
              <Input
                name="age"
                value={formValues.age}
                onChange={handleChange}
                placeholder="Umur"
                type="number"
                className={inputClass}
              />
            </div>

            <div className="col-span-1 md:col-span-2 pt-4">
              <Button
                type="button"
                onClick={() => goToStep(2)}
                className="w-full h-12 bg-[#1a1824] hover:bg-black text-white rounded-full font-bold transition-all transform hover:scale-[1.01]"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        )}

        {/* ==================== STEP 2 ==================== */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Negara Tinggal Saat Ini
              </label>
              <Input
                name="country"
                value={formValues.country}
                onChange={handleChange}
                placeholder="example: Korea"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Kota Tinggal Saat Ini
              </label>
              <Input
                name="city"
                value={formValues.city}
                onChange={handleChange}
                placeholder="example: Soyang"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Asal Kota/Provinsi
              </label>
              <Input
                name="originCity"
                value={formValues.originCity}
                onChange={handleChange}
                placeholder="example: Aceh, Banda Aceh"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Status Saat Ini
              </label>
              <Input
                name="status"
                value={formValues.status}
                onChange={handleChange}
                placeholder="example: Mahasiswa"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Program Beasiswa (optional)
              </label>
              <Input
                name="scholarship"
                value={formValues.scholarship}
                onChange={handleChange}
                placeholder="example: LPDP 2024"
                className={inputClass}
              />
            </div>

            <div className="col-span-1 md:col-span-2 pt-4">
              <Button
                type="button"
                onClick={() => goToStep(3)}
                className="w-full h-12 bg-[#1a1824] hover:bg-black text-white rounded-full font-bold transition-all transform hover:scale-[1.01]"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        )}

        {/* ==================== STEP 3 ==================== */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Institut/ Universitas
              </label>
              <Input
                name="university"
                value={formValues.university}
                onChange={handleChange}
                placeholder="example: Korea University"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Bidang Keahlian
              </label>
              <Input
                name="expertise"
                value={formValues.expertise}
                onChange={handleChange}
                placeholder="example: Teknologi, Ekonomi"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 ml-1">
                Periode Tinggal / Studi di Luar Negeri
              </label>
              <Input
                name="studyPeriod"
                value={formValues.studyPeriod}
                onChange={handleChange}
                placeholder="example: 2023-2026"
                className={inputClass}
              />
            </div>

            {/* CV Link Field + Info Icon */}
            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-semibold text-gray-500 ml-1">
                  Upload/Kirim Dokumen Pendukung
                </label>
                <button
                  type="button"
                  onClick={() => setShowInfoDialog(true)}
                  className="group relative flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 hover:bg-[#c24136] transition-colors cursor-pointer"
                  title="Cara mendapatkan link dokumen"
                >
                  <Info className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 ml-1 -mt-0.5">
                Masukkan link menuju CV atau dokumen pendukung kamu agar
                tim kami bisa mengenal kamu lebih baik.
              </p>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  name="cvLink"
                  value={formValues.cvLink}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            {error?.message && (
              <p className="col-span-2 text-red-500 text-center text-xs">
                {error.message[0]}
              </p>
            )}

            <div className="col-span-1 md:col-span-2 flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => goToStep(2)}
                disabled={isLoading}
                className="flex-1 h-12 border-2 border-gray-100 rounded-full font-bold hover:bg-gray-50 transition-all"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-2 h-12 bg-[#c24136] hover:bg-[#a83229] text-white rounded-full font-bold transition-all shadow-lg shadow-[#c24136]/20"
              >
                {isLoading ? "Memproses..." : "Sign up"}
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

      {/* ==================== INFO DIALOG ==================== */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl p-0 overflow-hidden gap-0">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#c24136] to-[#992e25] px-6 pt-6 pb-5 text-white">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="text-lg font-bold text-white">
                  Cara Upload Dokumen
                </DialogTitle>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Mohon maaf, saat ini kami belum menyediakan layanan cloud
                storage untuk mengunggah file secara langsung. Sebagai
                gantinya, kamu bisa menyertakan <strong>link publik</strong>{" "}
                menuju dokumenmu.
              </p>
            </DialogHeader>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Panduan Mendapatkan Link
            </p>

            {/* Google Drive */}
            <div className="group rounded-xl border border-gray-100 p-4 hover:border-[#c24136]/20 hover:bg-[#fdf0e6]/30 transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#4285F4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.433 22l-3.397-5.89L8.5 3h6.799l-7.464 12.927L4.433 22z"
                      fill="#0066DA"
                    />
                    <path
                      d="M15.3 3l-7.465 12.927 3.403 5.891H21.5l3.397-5.89L15.299 3z"
                      fill="#00AC47"
                      opacity="0.7"
                    />
                    <path
                      d="M1.036 16.11L4.433 22H11.238l3.399-5.89H1.036z"
                      fill="#EA4335"
                      opacity="0.7"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5">
                    Google Drive
                  </h4>
                  <ol className="space-y-1.5 text-xs text-gray-600 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Upload file CV ke{" "}
                        <a
                          href="https://drive.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4285F4] font-medium hover:underline inline-flex items-center gap-0.5"
                        >
                          Google Drive
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Klik kanan file → <strong>Bagikan</strong> (Share)
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        Ubah akses menjadi{" "}
                        <strong>&quot;Siapa saja yang memiliki link&quot;</strong>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        4
                      </span>
                      <span>
                        Klik <strong>Salin link</strong> → paste di form
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Dropbox */}
            <div className="group rounded-xl border border-gray-100 p-4 hover:border-[#c24136]/20 hover:bg-[#fdf0e6]/30 transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0061FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="#0061FF"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 2l6 3.75L6 9.5 0 5.75zM18 2l6 3.75-6 3.75-6-3.75zM0 13.25L6 9.5l6 3.75L6 17zM18 9.5l6 3.75L18 17l-6-3.75zM6 18.25l6-3.75 6 3.75-6 3.75z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5">
                    Dropbox / OneDrive
                  </h4>
                  <ol className="space-y-1.5 text-xs text-gray-600 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <span>Upload file CV ke Dropbox / OneDrive</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Klik <strong>Share</strong> → pilih{" "}
                        <strong>&quot;Anyone with the link&quot;</strong>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        <strong>Copy link</strong> → paste di form
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Tip */}
            <div className="flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 p-3">
              <span className="text-amber-500 text-sm mt-px">💡</span>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                <strong>Tips:</strong> Pastikan link-nya bisa diakses publik
                (bukan private). Kamu juga bisa gunakan{" "}
                <strong>LinkedIn PDF export</strong> atau layanan cloud
                lainnya!
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5">
            <Button
              onClick={() => setShowInfoDialog(false)}
              className="w-full h-11 bg-[#1a1824] hover:bg-black text-white rounded-full font-bold transition-all"
            >
              Saya Mengerti
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
