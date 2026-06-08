import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function clearArticles() {
  console.log("🧹 Clearing all articles from database...");
  try {
    const result = await prisma.article.deleteMany({});
    console.log(`✅ Cleared successfully. Deleted ${result.count} articles.`);
  } catch (err) {
    console.error("❌ Failed to clear articles:", err);
  } finally {
    await prisma.$disconnect();
  }
}

clearArticles();
