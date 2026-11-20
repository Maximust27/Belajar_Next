import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, ClipboardList, History, Package, PackageMinus, PackagePlus, ScanLine } from "lucide-react";
import { HeroArtwork } from "./hero-artwork";
import { FlowArtwork } from "./flow-artwork";
import { SunsetStripe } from "./sunset-stripe";
import { SectionNav } from "./section-nav";

const features = [
  {
    number: "01",
    category: "MASTER DATA",
    title: "Semua barang, satu tempat.",
    description:
      "Kelola informasi barang dan temukan data yang dibutuhkan tanpa berpindah-pindah catatan.",
    href: "/barang",
    label: "Kelola barang",
    icon: Package,
  },
  {
    number: "02",
    category: "INBOUND",
    title: "Barang masuk, langsung tercatat.",
    description:
      "Catat penambahan persediaan agar pergerakan barang dapat ditelusuri dengan mudah.",
    href: "/stok-masuk",
    label: "Catat stok masuk",
    icon: PackagePlus,
  },
  {
    number: "03",
    category: "OUTBOUND",
    title: "Pengeluaran yang lebih terkontrol.",
    description:
      "Pantau setiap stok keluar untuk membantu menjaga ketersediaan barang sehari-hari.",
    href: "/stok-keluar",
    label: "Catat stok keluar",
    icon: PackageMinus,
  },
  {
    number: "04",
    category: "ACTIVITY LOG",
    title: "Riwayat yang mudah ditelusuri.",
    description:
      "Lihat catatan aktivitas inventaris sebagai bahan pengecekan dan evaluasi operasional.",
    href: "/riwayat",
    label: "Lihat riwayat",
    icon: History,
  },
] as const;

function Brand() {
  return (
    <Link
      href="/"
      aria-label="Inventra, kembali ke beranda"
      className="inline-flex items-center gap-2.5 text-[18px] font-extrabold tracking-[-0.055em] text-neutral-950"
    >
      <span
        aria-hidden="true"
        className="relative grid size-9 place-items-center rounded-sm bg-neutral-950 text-white"
      >
        <Boxes size={19} strokeWidth={1.8} />
        <span className="absolute inset-x-0 bottom-0 h-1 bg-orange-500" />
      </span>
      inventra<span className="-ml-2 text-orange-600">.</span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div data-landing-page className="min-h-screen bg-[#faf9f6] text-neutral-950">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Lewati ke konten utama
      </a>

      <header className="sticky top-0 z-50 border-b border-neutral-900/10 bg-[#faf9f6]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-[1200px] flex-wrap items-center justify-between gap-x-5 px-5 sm:px-8 lg:px-10">
          <Brand />
          <SectionNav />
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-neutral-950 px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 sm:px-5"
          >
            <span className="hidden sm:inline">Buka</span> Dashboard
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main id="konten">
        <section aria-labelledby="hero-title" className="relative overflow-hidden">
          <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 pb-16 pt-16 sm:px-8 md:gap-10 md:pb-20 md:pt-24 lg:grid-cols-[1fr_1.08fr] lg:px-10 lg:pt-28">
            <div data-motion="hero" data-motion-delay="70" className="relative z-10 max-w-[600px]">
              <p className="mb-7 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.19em] text-orange-700">
                <span className="h-[2px] w-7 bg-orange-600" aria-hidden="true" />
                Inventory management system
              </p>
              <h1
                id="hero-title"
                className="max-w-[600px] font-serif text-[clamp(3.2rem,5.6vw,6rem)] leading-[0.99] tracking-[-0.065em] text-neutral-950"
              >
                Stok teratur.
                <span className="block">Kerja lebih</span>
                <span className="block italic">lancar.</span>
              </h1>
              <p className="mt-7 max-w-[470px] text-[15px] leading-7 text-neutral-600 sm:text-[16px]">
                Satu tempat untuk mengelola data barang, mencatat stok masuk dan keluar,
                serta meninjau riwayat inventaris tanpa alur yang rumit.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard"
                  className="group inline-flex min-h-12 items-center gap-3 bg-neutral-950 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
                >
                  Mulai kelola inventaris
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
                <a
                  href="#fitur"
                  className="inline-flex min-h-12 items-center gap-2 border border-neutral-300 bg-white px-5 text-[13px] font-semibold transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Jelajahi fitur <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-12 flex items-center gap-3 border-t border-neutral-300 pt-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                <ScanLine className="size-4" strokeWidth={1.5} aria-hidden="true" />
                From stock in to stock out
              </div>
            </div>
            <HeroArtwork />
          </div>
          <SunsetStripe />
        </section>

        <section aria-label="Nilai utama Inventra" className="bg-neutral-950 text-white">
          <div className="mx-auto grid max-w-[1200px] gap-0 px-5 py-7 sm:px-8 md:grid-cols-3 lg:px-10">
            <div data-motion="rise" className="border-b border-white/20 py-4 md:border-b-0 md:border-r md:pr-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange-300">01 / Rapi</p>
              <p className="mt-2 text-sm font-semibold">Data barang terpusat</p>
            </div>
            <div data-motion="rise" data-motion-delay="90" className="border-b border-white/20 py-4 md:border-b-0 md:px-8 md:border-r">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange-300">02 / Praktis</p>
              <p className="mt-2 text-sm font-semibold">Pencatatan stok lebih mudah</p>
            </div>
            <div data-motion="rise" data-motion-delay="180" className="py-4 md:pl-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange-300">03 / Jelas</p>
              <p className="mt-2 text-sm font-semibold">Riwayat aktivitas dapat ditelusuri</p>
            </div>
          </div>
        </section>

        <section id="tentang" aria-labelledby="about-title" className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-32">
          <FlowArtwork />
          <div data-motion="rise" data-motion-delay="130">
            <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700">/ Kenapa Inventra</p>
            <h2 id="about-title" className="max-w-[530px] font-serif text-[clamp(2.4rem,4.2vw,4.6rem)] leading-[1.04] tracking-[-0.055em]">
              Barang bergerak. Catatannya harus mengikuti.
            </h2>
            <p className="mt-6 max-w-[500px] text-[15px] leading-8 text-neutral-600">
              Informasi barang, transaksi stok masuk, dan stok keluar saling berkaitan.
              Inventra menyatukan alur tersebut dalam tampilan yang sederhana agar
              proses operasional lebih mudah dipantau.
            </p>
            <Link
              href="/barang"
              className="group mt-8 inline-flex items-center gap-3 border-b border-neutral-950 pb-2 text-[13px] font-bold transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Lihat pengelolaan barang
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <SunsetStripe />

        <section id="fitur" aria-labelledby="features-title" className="bg-white px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1200px]">
            <div data-motion="pop" className="mx-auto max-w-[750px] text-center">
              <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700">/ Modul utama</p>
              <h2 id="features-title" className="font-serif text-[clamp(2.6rem,4.5vw,4.8rem)] leading-[1.06] tracking-[-0.055em]">
                Satu sistem untuk seluruh alur inventaris.
              </h2>
              <p className="mx-auto mt-6 max-w-[570px] text-[15px] leading-7 text-neutral-600">
                Dari data barang hingga riwayat pergerakan stok, semuanya bisa diakses dari satu dashboard.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={feature.number}
                    href={feature.href}
                    data-motion="rise"
                    data-motion-delay={Number(feature.number) * 90}
                    className="group flex min-h-[300px] flex-col justify-between border border-dashed border-neutral-300 bg-[#faf9f6] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-orange-600 hover:shadow-[7px_7px_0_#fed7aa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 sm:p-9 motion-reduce:transform-none"
                    aria-label={feature.label}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-orange-700">{feature.number} / {feature.category}</p>
                        <h3 className="mt-7 max-w-[380px] font-serif text-[clamp(1.85rem,3vw,2.65rem)] leading-[1.08] tracking-[-0.045em]">
                          {feature.title}
                        </h3>
                        <p className="mt-4 max-w-[390px] text-[14px] leading-7 text-neutral-600">
                          {feature.description}
                        </p>
                      </div>
                      <div className="grid size-12 shrink-0 place-items-center border border-neutral-300 bg-white">
                        <Icon className="size-6" strokeWidth={1.4} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-neutral-300 pt-4 text-[12px] font-bold">
                      <span>{feature.label}</span>
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="alur" aria-labelledby="workflow-title" className="border-t border-neutral-200 bg-[#faf9f6] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div data-motion="rise">
              <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700">/ Alur sederhana</p>
              <h2 id="workflow-title" className="font-serif text-[clamp(2.5rem,4vw,4.3rem)] leading-[1.07] tracking-[-0.05em]">
                Dari barang datang sampai tercatat.
              </h2>
              <p className="mt-6 max-w-[450px] text-[15px] leading-8 text-neutral-600">
                Alur inventaris tidak harus rumit. Mulai dari mencatat barang, memperbarui stok,
                lalu mengecek riwayat transaksi saat diperlukan.
              </p>
            </div>
            <ol className="border-t border-neutral-300">
              {[
                { step: "01", title: "Daftarkan barang", detail: "Siapkan informasi barang sebagai dasar pencatatan.", icon: Package },
                { step: "02", title: "Catat stok masuk dan keluar", detail: "Perbarui persediaan setiap kali ada pergerakan barang.", icon: ClipboardList },
                { step: "03", title: "Tinjau riwayat", detail: "Lihat kembali aktivitas untuk membantu pengecekan.", icon: History },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.step} data-motion="rise" data-motion-delay={Number(item.step) * 110} className="grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-neutral-300 py-7 sm:gap-8">
                    <span className="pt-1 font-mono text-xs font-bold text-orange-700">{item.step}</span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">{item.detail}</p>
                    </div>
                    <Icon className="size-6" strokeWidth={1.4} aria-hidden="true" />
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section aria-labelledby="cta-title" className="bg-neutral-950 px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div data-motion="pop">
              <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-orange-300">/ Siap mulai</p>
              <h2 id="cta-title" className="max-w-[730px] font-serif text-[clamp(2.6rem,4.7vw,5rem)] leading-[1.05] tracking-[-0.055em]">
                Inventaris yang rapi dimulai dari sini.
              </h2>
            </div>
            <Link
              href="/dashboard"
              data-motion="rise"
              data-motion-delay="140"
              className="group inline-flex min-h-12 shrink-0 items-center gap-4 bg-white px-6 text-[13px] font-bold text-neutral-950 transition-colors hover:bg-orange-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Buka Dashboard
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </Link>
          </div>
        </section>
        <SunsetStripe />
      </main>

      <footer className="bg-[#faf9f6] px-5 py-10 sm:px-8 lg:px-10">
        <div data-motion="rise" className="mx-auto flex max-w-[1200px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Brand />
            <p className="mt-3 text-xs text-neutral-500">Inventory Management System</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-neutral-600">
            <a href="#tentang" className="hover:text-orange-700">Tentang</a>
            <a href="#fitur" className="hover:text-orange-700">Fitur</a>
            <Link href="/dashboard" className="hover:text-orange-700">Dashboard</Link>
          </div>
          <p className="font-mono text-[11px] text-neutral-500">Inventra / Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
