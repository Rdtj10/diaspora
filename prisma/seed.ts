import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const PROJECTS = [
  {
    title: "Pengelolaan Sampah yang Belum Berkelanjutan",
    description:
      "Banyak sekolah di daerah terpencil masih memiliki keterbatasan akses terhadap teknologi pembelajaran digital.",
    location: "Aceh, Banda Aceh",
    topic: "Lingkungan",
    topicColor: "#a3d139",
    cardColor: "#f4ebfb",
    participantsCount: 12,
    participantsMax: 100,
  },
  {
    title: "Rendahnya Kesadaran Kesehatan Mental di Masyarakat",
    description:
      "Banyak sekolah di daerah terpencil masih memiliki keterbatasan akses terhadap teknologi pembelajaran digital.",
    location: "Banjarmasin",
    topic: "Kesehatan",
    topicColor: "#468cd2",
    cardColor: "#fdf0e6",
    participantsCount: 12,
    participantsMax: 100,
  },
  {
    title:
      "Tantangan ekonomi lokal, pengembangan UMKM, dan pemberdayaan ekonomi masyarakat.",
    description: null,
    location: "Makassar",
    topic: "Ekonomi",
    topicColor: "#bec83b",
    cardColor: "#edfbee",
    participantsCount: 12,
    participantsMax: 100,
  },
  {
    title: "Akses Pendidikan Digital di Daerah Terpencil",
    description:
      "Banyak sekolah di daerah terpencil masih memiliki keterbatasan akses terhadap teknologi pembelajaran digital.",
    location: "DKI Jakarta, Cakung",
    topic: "Pendidikan",
    topicColor: "#cc49af",
    cardColor: "#fcfce9",
    participantsCount: 12,
    participantsMax: 100,
  },
  {
    title:
      "Permasalahan terkait transformasi digital, literasi teknologi, dan pengembangan sistem.",
    description: null,
    location: "Bali, Bali",
    topic: "Teknologi",
    topicColor: "#595e69",
    cardColor: "#eafdfd",
    participantsCount: 12,
    participantsMax: 100,
  },
  {
    title:
      "Permasalahan sosial seperti kesenjangan, pemberdayaan komunitas, dan inklusi sosial.",
    description: null,
    location: "Medan",
    topic: "Sosial",
    topicColor: "#5e6ad2",
    cardColor: "#fbeef4",
    participantsCount: 12,
    participantsMax: 100,
  },
  {
    title:
      "Ketimpangan akses layanan kesehatan di daerah pedesaan dan perkotaan.",
    description:
      "Masyarakat di daerah pedesaan sering kali kesulitan mendapatkan layanan kesehatan yang memadai dibanding perkotaan.",
    location: "Surabaya",
    topic: "Kesehatan",
    topicColor: "#468cd2",
    cardColor: "#fdf0e6",
    participantsCount: 8,
    participantsMax: 100,
  },
  {
    title: "Pengembangan Energi Terbarukan untuk Daerah Terpencil",
    description:
      "Banyak daerah terpencil di Indonesia masih bergantung pada energi fosil karena kurangnya infrastruktur energi terbarukan.",
    location: "NTT, Kupang",
    topic: "Lingkungan",
    topicColor: "#a3d139",
    cardColor: "#f4ebfb",
    participantsCount: 5,
    participantsMax: 100,
  },
];

async function main() {
  console.log("🌱 Seeding projects...");

  for (const project of PROJECTS) {
    const created = await prisma.project.create({
      data: project,
    });
    console.log(`  ✅ ${created.title}`);
  }

  console.log(`\n🎉 Selesai! ${PROJECTS.length} projects berhasil ditambahkan.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
