import type { Metadata } from "next";
import { SignInSection } from "./partials/SignInSection";

export const metadata: Metadata = {
  title: "Login | Diaspora Nusantara",
  description: "Masuk kembali ke akun Diaspora Nusantara kamu.",
};

export default function LoginPage() {
  return <SignInSection />;
}
