import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error("❌ Mohon masukkan email user: bun run prisma/promote-admin.ts user@example.com");
    process.exit(1);
  }

  console.log(`🚀 Mempromosikan ${email} menjadi ADMIN...`);

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });

    console.log(`✅ Berhasil! ${user.fullName} sekarang adalah ADMIN.`);
  } catch (err) {
    console.error("❌ Error: User tidak ditemukan atau terjadi kesalahan database.");
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
