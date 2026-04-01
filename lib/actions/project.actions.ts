"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function registerForProject(projectId: string, note?: string) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const userId = session.userId;

  try {
    const existing = await prisma.registration.findUnique({
      where: {
        userId_projectId: { userId, projectId },
      },
    });

    if (existing) {
      return { error: "Kamu sudah terdaftar di proyek ini." };
    }

    await prisma.registration.create({
      data: {
        userId,
        projectId,
        note: note || null,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Register project error:", err);
    return { error: "Terjadi kesalahan saat mendaftar." };
  }
}

export async function getUserProjects() {
  const session = await getSession();
  if (!session) return { registrations: [], bookmarks: [] };

  const userId = session.userId;

  try {
    const registrations = await prisma.registration.findMany({
      where: { userId },
      include: {
        project: true,
      },
      orderBy: { registeredAt: "desc" },
    });

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        project: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { registrations, bookmarks };
  } catch (err) {
    console.error("Fetch user projects error:", err);
    return { registrations: [], bookmarks: [] };
  }
}
