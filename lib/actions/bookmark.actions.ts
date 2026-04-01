"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function toggleBookmark(projectId: string) {
  const session = await getSession();

  if (!session) {
    return { error: "unauthorized" };
  }

  const userId = session.userId;

  try {
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_projectId: { userId, projectId },
      },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
      return { bookmarked: false };
    }

    await prisma.bookmark.create({
      data: { userId, projectId },
    });

    return { bookmarked: true };
  } catch (err) {
    console.error("Bookmark error:", err);
    return { error: "Terjadi kesalahan saat menyimpan bookmark." };
  }
}
