import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function createArticleAdmin() {
  const email = process.argv[2] || "writer@diaspora.com";
  const passwordInput = process.argv[3] || "artikeladmin123";
  const fullName = "Admin Artikel Diaspora";

  const hashedPassword = await bcrypt.hash(passwordInput, 10);

  console.log(`🚀 Sedang membuat user ARTICLE_ADMIN baru...`);

  try {
    const writer = await prisma.user.upsert({
      where: { email },
      update: {
        role: "ARTICLE_ADMIN",
        password: hashedPassword,
      },
      create: {
        email,
        fullName,
        password: hashedPassword,
        role: "ARTICLE_ADMIN",
      },
    });

    console.log("==========================================");
    console.log("✅ BERHASIL MEMBUAT/UPDATE ARTICLE_ADMIN");
    console.log("==========================================");
    console.log(`Email    : ${writer.email}`);
    console.log(`Password : ${passwordInput}`);
    console.log(`Role     : ${writer.role}`);
    console.log("==========================================");
  } catch (err) {
    console.error("❌ Terjadi kesalahan:", err);
  } finally {
    await prisma.$disconnect();
  }
}

createArticleAdmin();
