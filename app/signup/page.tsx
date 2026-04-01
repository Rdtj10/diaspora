import type { Metadata } from "next";
import { SignUpSection } from "./partials/SignUpSection";

export const metadata: Metadata = {
  title: "Sign Up | Diaspora Nusantara",
  description: "Daftar dan bergabunglah dengan jaringan diaspora Indonesia di seluruh dunia.",
};

export default function SignUpPage() {
  return <SignUpSection />;
}
