"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const CreateArticleSchema = z.object({
  title: z.string().min(5, "Judul terlalu pendek (minimal 5 karakter)"),
  excerpt: z.string().min(10, "Ringkasan terlalu pendek (minimal 10 karakter)"),
  content: z.string().min(20, "Isi artikel terlalu pendek (minimal 20 karakter)"),
  coverImage: z.string().url("URL gambar cover tidak valid"),
  category: z.string().min(1, "Kategori harus dipilih"),
  readTime: z.string().min(1, "Estimasi waktu baca harus diisi"),
  authorName: z.string().min(2, "Nama penulis terlalu pendek"),
  authorAvatar: z.string().url("URL gambar avatar penulis tidak valid"),
  authorRole: z.string().min(2, "Peran penulis terlalu pendek"),
});

export async function createArticleAction(formData: FormData) {
  const session = await getSession();

  if (!session || (session.role !== "ADMIN" && session.role !== "ARTICLE_ADMIN")) {
    return { error: { message: ["Anda tidak memiliki izin untuk mengunggah artikel."] } };
  }

  const rawData = {
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    category: formData.get("category"),
    readTime: formData.get("readTime"),
    authorName: formData.get("authorName"),
    authorAvatar: formData.get("authorAvatar"),
    authorRole: formData.get("authorRole"),
  };

  const validated = CreateArticleSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  const { title, ...data } = validated.data;

  // Generate unique slug from title
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    // Check if slug already exists, if so append a timestamp
    const existing = await prisma.article.findUnique({
      where: { slug },
    });

    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Default publishedAt format
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
    const publishedAt = new Date().toLocaleDateString("id-ID", options);

    await prisma.article.create({
      data: {
        slug,
        title,
        publishedAt,
        ...data,
      },
    });

    revalidatePath("/artikel");
    revalidatePath("/dashboard/artikel");

    return { success: true };
  } catch (err) {
    console.error("Create article error:", err);
    return { error: { message: ["Terjadi kesalahan server saat menyimpan artikel."] } };
  }
}

export async function deleteArticleAction(id: string) {
  const session = await getSession();

  if (!session || (session.role !== "ADMIN" && session.role !== "ARTICLE_ADMIN")) {
    return { error: "Anda tidak memiliki izin untuk menghapus artikel." };
  }

  try {
    await prisma.article.delete({
      where: { id },
    });

    revalidatePath("/artikel");
    revalidatePath("/dashboard/artikel");

    return { success: true };
  } catch (err) {
    console.error("Delete article error:", err);
    return { error: "Terjadi kesalahan saat menghapus artikel." };
  }
}
