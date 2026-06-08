import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function createAdmin() {
  const email = process.argv[2] || "admin@diaspora.com";
  const fullName = "Admin Diaspora";
  
  // Generate a secure 16-character password
  const rawPassword = crypto.randomBytes(12).toString("base64");
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  console.log(`🚀 Sedang membuat user ADMIN baru...`);
  
  try {
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        role: "ADMIN",
        password: hashedPassword,
      },
      create: {
        email,
        fullName,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("==========================================");
    console.log("✅ BERHASIL MEMBUAT/UPDATE ADMIN");
    console.log("==========================================");
    console.log(`Email    : ${admin.email}`);
    console.log(`Password : ${rawPassword}`);
    console.log("==========================================");
    console.log("⚠️  SIMPAN PASSWORD INI DI TEMPAT AMAN!");
  } catch (err) {
    console.error("❌ Terjadi kesalahan:", err);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
