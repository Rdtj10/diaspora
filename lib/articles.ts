import prisma from "@/lib/prisma";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

export const DUMMY_ARTICLES: Omit<Article, "id">[] = [
  {
    slug: "kolaborasi-strategis-indonesia-thailand",
    title: "DIASPORA NUSANTARA JAJAKI KOLABORASI STRATEGIS INDONESIA–THAILAND UNTUK PENGUATAN INVESTASI, PENDIDIKAN, DAN JEJARING DIASPORA ASEAN",
    excerpt: "Jakarta, 8 Juni 2026 – Diaspora Nusantara menjajaki peluang kolaborasi strategis dengan Thailand Chamber of Commerce sebagai bagian dari upaya memperkuat hubungan masyarakat, investasi, pendidikan, pengembangan sumber daya manusia, dan jejaring diaspora di kawasan ASEAN.",
    coverImage: "/artikel/artikel-1.jpeg",
    category: "Komunitas",
    readTime: "5 min baca",
    publishedAt: "8 Jun 2026",
    author: {
      name: "Arjun Roy, B.C.A.",
      avatar: "https://github.com/shadcn.png",
      role: "Founder & Chairman Diaspora Nusantara"
    },
    content: `
Jakarta, 8 Juni 2026 – Diaspora Nusantara menjajaki peluang kolaborasi strategis dengan Thailand Chamber of Commerce sebagai bagian dari upaya memperkuat hubungan masyarakat, investasi, pendidikan, pengembangan sumber daya manusia, dan jejaring diaspora di kawasan ASEAN.

Dalam pertemuan yang berlangsung bersama Ms. Pathama Sirikul, President of Thailand Chamber of Commerce, kedua pihak membahas berbagai peluang kerja sama yang dapat dikembangkan antara Indonesia dan Thailand, khususnya pada bidang perdagangan, investasi, pendidikan, pengembangan talenta muda, pariwisata, serta kolaborasi antar komunitas dan pemangku kepentingan kedua negara.

Pada kesempatan tersebut, Ms. Pathama Sirikul menyampaikan komitmen Thailand Chamber of Commerce untuk terus membuka ruang kolaborasi yang saling menguntungkan.

> "For Thailand Chamber of Commerce, we have been building for the past one and a half years, and we are open to any kind of collaboration because we believe collaboration can help one another. Therefore, we are open to all forms of collaboration. Thank you very much."
> — Ms. Pathama Sirikul
> President, Thailand Chamber of Commerce

Menanggapi hal tersebut, Arjun Roy, B.C.A., Founder & Chairman Diaspora Nusantara, menyampaikan bahwa Thailand merupakan salah satu mitra strategis Indonesia di kawasan ASEAN yang memiliki potensi besar untuk dikembangkan melalui berbagai bentuk kerja sama konkret yang melibatkan sektor swasta, institusi pendidikan, komunitas diaspora, dan generasi muda.

> "Kami menyambut baik keterbukaan Thailand Chamber of Commerce dalam membangun kolaborasi dengan Indonesia. Diaspora Nusantara percaya bahwa hubungan antarbangsa yang kuat tidak hanya dibangun oleh pemerintah, tetapi juga oleh masyarakat, pelaku usaha, akademisi, dan diaspora yang memiliki visi bersama untuk menciptakan kemajuan di kawasan ASEAN."
> "Melalui jejaring Diaspora Nusantara, kami siap menjadi jembatan kolaborasi yang menghubungkan potensi Indonesia dengan berbagai mitra internasional guna menciptakan manfaat yang nyata bagi masyarakat kedua negara."

Beberapa peluang kerja sama yang sedang dijajaki meliputi:

* **Business Matching Indonesia–Thailand** bagi pelaku usaha kedua negara.
* **Promosi investasi** dan pengembangan ekonomi daerah di Indonesia.
* **Program pertukaran mahasiswa**, pemuda, akademisi, dan profesional.
* **Kolaborasi pendidikan**, pelatihan keterampilan, dan pengembangan sumber daya manusia.
* **Penguatan jaringan diaspora** Indonesia dan Thailand di kawasan ASEAN.
* **Kerja sama sektor pariwisata**, ekonomi kreatif, UMKM, dan industri jasa.
* **Kolaborasi di bidang pertanian**, ketahanan pangan, dan teknologi agroindustri.
* **Pengembangan forum dialog** dan jejaring kepemudaan ASEAN.

Sebagai tindak lanjut dari komunikasi awal tersebut, Diaspora Nusantara membuka peluang penyelenggaraan Indonesia–Thailand Economic, Education & Diaspora Forum yang diharapkan dapat mempertemukan pelaku usaha, investor, akademisi, pemerintah daerah, organisasi kepemudaan, komunitas diaspora, dan berbagai pemangku kepentingan strategis dari kedua negara.

Diaspora Nusantara meyakini bahwa penguatan hubungan Indonesia dan Thailand tidak hanya akan memberikan manfaat ekonomi, tetapi juga memperkuat persahabatan antarbangsa, meningkatkan mobilitas talenta muda, serta memperkokoh kolaborasi masyarakat ASEAN dalam menghadapi tantangan global di masa depan.
    `
  },
  {
    slug: "arjun-roy-gagas-diaspora-nusantara-apresiasi-jokowi",
    title: "ARJUN ROY GAGAS DIASPORA NUSANTARA, DAPAT APRESIASI DARI PRESIDEN KE-7 RI JOKO WIDODO",
    excerpt: "Solo, Jawa Tengah – Berangkat dari pengalaman bertahun-tahun berinteraksi dengan masyarakat Indonesia di luar negeri, Arjun Roy, B.C.A., menggagas sebuah inisiatif bernama Diaspora Nusantara, sebuah platform yang bertujuan menghubungkan talenta diaspora Indonesia.",
    coverImage: "/artikel/artikel-2.jpeg",
    category: "Komunitas",
    readTime: "6 min baca",
    publishedAt: "12 Mar 2026",
    author: {
      name: "Arjun Roy, B.C.A.",
      avatar: "https://github.com/shadcn.png",
      role: "Pendiri & Chairman Diaspora Nusantara"
    },
    content: `
Solo, Jawa Tengah – Berangkat dari pengalaman bertahun-tahun berinteraksi dengan masyarakat Indonesia di luar negeri, Arjun Roy, B.C.A., menggagas sebuah inisiatif bernama Diaspora Nusantara, sebuah platform yang bertujuan menghubungkan talenta diaspora Indonesia di seluruh dunia dengan kebutuhan pembangunan daerah dan nasional di Indonesia.

Gagasan tersebut disampaikan langsung oleh Arjun Roy kepada Presiden ke-7 Republik Indonesia, Joko Widodo, dalam pertemuan yang berlangsung di Kota Solo. Dalam kesempatan tersebut, Arjun memaparkan pentingnya membangun sistem pemetaan dan konektivitas diaspora Indonesia secara terstruktur agar keahlian, pengalaman, serta jejaring global yang dimiliki diaspora dapat berkontribusi secara nyata bagi pembangunan Indonesia.

### Menghubungkan Potensi dengan Kebutuhan Daerah

Menurut Arjun, setiap daerah di Indonesia memiliki tantangan yang berbeda-beda. Sebagian daerah membutuhkan dukungan investasi, sebagian membutuhkan penguatan pendidikan dan kesehatan, sementara daerah lainnya memerlukan transfer teknologi, pengembangan sumber daya manusia, atau penguatan sektor pertanian dan industri.

Melalui Diaspora Nusantara, kebutuhan-kebutuhan tersebut diharapkan dapat dipertemukan dengan diaspora Indonesia yang memiliki kompetensi relevan di berbagai negara.

> "Indonesia memiliki begitu banyak putra-putri terbaik yang saat ini berkiprah di luar negeri sebagai akademisi, peneliti, dokter, insinyur, profesional, pengusaha, diplomat, maupun praktisi di berbagai bidang. Saya percaya mereka memiliki semangat untuk turut berkontribusi bagi tanah air apabila tersedia wadah yang mampu menghubungkan mereka dengan kebutuhan nyata di Indonesia."
> — Arjun Roy, B.C.A.

### Rekam Jejak dan Pengalaman Konstruktif

Arjun Roy sendiri dikenal sebagai aktivis diaspora dan profesional muda yang memiliki pengalaman dalam pengembangan jejaring internasional, diplomasi pendidikan, perlindungan WNI di luar negeri, serta penguatan hubungan antar-lembaga Indonesia dengan berbagai mitra internasional. Ia merupakan lulusan Bangalore City University, India, serta pernah terpilih sebagai Top 100 Nasional Sekolah Staf Presiden dari lebih dari 66 ribu peserta lintas profesi.

Selain itu, ia pernah menjabat sebagai Ketua Perhimpunan Pelajar Indonesia (PPI) India, aktif dalam Ikatan Alumni Pelajar Indonesia di India (IKAI), serta terlibat dalam berbagai inisiatif perlindungan WNI dan pengembangan kerja sama pendidikan internasional.

Selama beberapa tahun terakhir, Arjun terlibat dalam berbagai kegiatan yang berkaitan dengan diaspora Indonesia, mulai dari pendampingan dan koordinasi perlindungan WNI di berbagai negara seperti Jerman, Hungaria, Malaysia, Mesir, Kamboja, hingga India, hingga fasilitasi kerja sama pendidikan dan pengembangan sumber daya manusia antara Indonesia dengan berbagai mitra internasional.

Pengalaman tersebut membuatnya melihat secara langsung besarnya potensi diaspora Indonesia yang tersebar di berbagai negara. Menurutnya, diaspora Indonesia bukan hanya aset sosial, tetapi juga aset strategis bangsa yang dapat membantu mempercepat pembangunan daerah melalui transfer pengetahuan, investasi, teknologi, serta jejaring global.

### Apresiasi dari Presiden Ke-7 RI

Dalam pertemuan di Solo, Presiden ke-7 Republik Indonesia, Joko Widodo, menyampaikan apresiasi atas gagasan Diaspora Nusantara dan mendukung upaya untuk memperkuat kontribusi diaspora Indonesia terhadap pembangunan nasional.

Bagi Arjun, dukungan tersebut menjadi motivasi untuk terus mengembangkan Diaspora Nusantara sebagai platform kolaborasi yang mampu menghubungkan pemerintah daerah, perguruan tinggi, pelaku usaha, komunitas, dan masyarakat Indonesia dengan talenta-talenta diaspora yang tersebar di seluruh dunia.

### Arah Pengembangan ke Depan

Ke depan, Diaspora Nusantara akan berfokus pada pemetaan talenta diaspora Indonesia secara global, pembangunan database keahlian diaspora, program mentoring, transfer pengetahuan, pengembangan investasi daerah, penguatan kerja sama pendidikan, serta fasilitasi kolaborasi antara diaspora dan pemerintah daerah.

> "Diaspora Nusantara bukan sekadar jaringan diaspora. Ini adalah upaya untuk menghadirkan solusi bagi Indonesia dengan memanfaatkan kekuatan anak bangsa yang telah berkiprah di berbagai penjuru dunia. Kami ingin membangun jembatan antara talenta global Indonesia dengan kebutuhan pembangunan nasional."
> — Arjun Roy, B.C.A.

### Tentang Diaspora Nusantara

Diaspora Nusantara adalah platform kolaborasi yang menghubungkan diaspora Indonesia di seluruh dunia dengan kebutuhan pembangunan daerah dan nasional melalui pendidikan, investasi, teknologi, pengembangan sumber daya manusia, kewirausahaan, serta kerja sama internasional. Platform ini didirikan oleh Arjun Roy sebagai bagian dari upaya memperkuat kontribusi diaspora Indonesia dalam mewujudkan Indonesia Emas 2045.
    `
  }
];

async function seedArticlesIfNeeded() {
  try {
    const count = await prisma.article.count();
    if (count === 0) {
      console.log("[SEED] Auto-seeding database with dummy articles...");
      for (const a of DUMMY_ARTICLES) {
        await prisma.article.create({
          data: {
            slug: a.slug,
            title: a.title,
            excerpt: a.excerpt,
            content: a.content.trim(),
            coverImage: a.coverImage,
            category: a.category,
            readTime: a.readTime,
            publishedAt: a.publishedAt,
            authorName: a.author.name,
            authorAvatar: a.author.avatar,
            authorRole: a.author.role,
          },
        });
      }
      console.log("[SEED] Auto-seed articles complete!");
    }
  } catch (err) {
    console.error("[SEED] Auto-seeding failed. Note: Ensure you have run 'npx prisma db push'.", err);
  }
}

export async function getArticles(filters?: { category?: string; query?: string }): Promise<Article[]> {
  await seedArticlesIfNeeded();

  try {
    const where: any = {};

    if (filters?.category && filters.category !== "Semua") {
      where.category = {
        equals: filters.category,
        mode: "insensitive",
      };
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
      ];
    }

    const dbArticles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return dbArticles.map((a: any) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      coverImage: a.coverImage,
      category: a.category,
      readTime: a.readTime,
      publishedAt: a.publishedAt,
      author: {
        name: a.authorName,
        avatar: a.authorAvatar,
        role: a.authorRole,
      },
    }));
  } catch (err) {
    console.error("Fetch articles from database error:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await seedArticlesIfNeeded();

  try {
    const a = await prisma.article.findUnique({
      where: { slug },
    });

    if (!a) return null;

    return {
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      coverImage: a.coverImage,
      category: a.category,
      readTime: a.readTime,
      publishedAt: a.publishedAt,
      author: {
        name: a.authorName,
        avatar: a.authorAvatar,
        role: a.authorRole,
      },
    };
  } catch (err) {
    console.error("Fetch article by slug error:", err);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  await seedArticlesIfNeeded();

  try {
    const articles = await prisma.article.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return articles.map((a: any) => a.category);
  } catch (err) {
    console.error("Fetch categories error:", err);
    return [
      "Pendidikan",
      "Karir",
      "Budaya",
      "Komunitas",
      "Diaspora",
      "Internasional",
      "Nasional",
      "Politik",
      "Berita Nasional",
      "Berita Internasional"
    ];
  }
}
