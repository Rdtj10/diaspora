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

    await prisma.$transaction([
      prisma.registration.create({
        data: {
          userId,
          projectId,
          note: note || null,
        },
      }),
      prisma.project.update({
        where: { id: projectId },
        data: {
          participantsCount: {
            increment: 1,
          },
        },
      }),
    ]);

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

export async function getAllProjects(filters?: { topic?: string; province?: string; city?: string }) {
  try {
    const where: any = {};

    if (filters?.topic) {
      where.topic = filters.topic;
    }

    if (filters?.province) {
      where.location = {
        contains: filters.province,
        mode: "insensitive",
      };
    }

    if (filters?.city) {
      where.location = {
        contains: filters.city,
        mode: "insensitive",
      };
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return projects;
  } catch (err) {
    console.error("Fetch all projects error:", err);
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return project;
  } catch (err) {
    console.error("Fetch project by id error:", err);
    return null;
  }
}

export async function getFilterOptions() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        topic: true,
        location: true,
      },
    });

    const topics = Array.from(new Set(projects.map((p) => p.topic).filter(Boolean)));
    const provinces = new Set<string>();
    const cities = new Set<string>();

    projects.forEach((p) => {
      if (p.location) {
        const parts = p.location.split(",").map((s) => s.trim());
        if (parts.length >= 1) provinces.add(parts[0]);
        if (parts.length >= 2) cities.add(parts[1]);
        else if (parts.length === 1) cities.add(parts[0]); // If only one part, treat as both
      }
    });

    return {
      topics: topics as string[],
      provinces: Array.from(provinces),
      cities: Array.from(cities),
    };
  } catch (err) {
    console.error("Fetch filter options error:", err);
    return { topics: [], provinces: [], cities: [] };
  }
}

export async function getRegistrations() {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        user: true,
        project: true,
      },
      orderBy: { registeredAt: "desc" },
    });
    return registrations;
  } catch (err) {
    console.error("Fetch registrations error:", err);
    return [];
  }
}

export async function getRegistrationStats() {
  try {
    const [total, waiting, approved, cancelled] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: "WAITING" } }),
      prisma.registration.count({ where: { status: "APPROVED" } }),
      prisma.registration.count({ where: { status: "CANCELLED" } }),
    ]);

    return {
      total,
      waiting,
      approved,
      cancelled,
    };
  } catch (err) {
    console.error("Fetch registration stats error:", err);
    return { total: 0, waiting: 0, approved: 0, cancelled: 0 };
  }
}
