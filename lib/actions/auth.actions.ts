"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { login, logout } from "@/lib/session";

const SignUpSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap terlalu pendek"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  phone: z.string().optional(),
  age: z.coerce.number().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  originCity: z.string().optional(),
  status: z.string().optional(),
  university: z.string().optional(),
  scholarship: z.string().optional(),
  expertise: z.string().optional(),
});

export async function signUp(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = SignUpSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  const { email, password, fullName, ...rest } = validated.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: { email: ["Email sudah terdaftar"] } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        ...rest,
      },
    });

    await login(user.id);
  } catch (err) {
    console.error("Sign up error:", err);
    return { error: { message: ["Terjadi kesalahan server"] } };
  }

  redirect("/login");
}

const SignInSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export async function signIn(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = SignInSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: { message: ["Email atau password salah"] } };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { error: { message: ["Email atau password salah"] } };
    }

    await login(user.id);
  } catch (err) {
    console.error("Sign in error:", err);
    return { error: { message: ["Terjadi kesalahan server"] } };
  }

  redirect("/");
}

export async function logoutAction() {
  await logout();
  redirect("/");
}
