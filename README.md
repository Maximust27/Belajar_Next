# Inventra

Sistem manajemen inventaris berbasis **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, dan **MariaDB/MySQL**.

## Fitur

- Landing page publik di `/`.
- Dashboard stok di `/dashboard`.
- Pengelolaan data barang di `/barang`.
- Pencatatan stok masuk dan stok keluar di `/stok-masuk` dan `/stok-keluar`.
- Riwayat transaksi di `/riwayat`.

## Menjalankan secara lokal

Persyaratan: Node.js yang kompatibel dengan Next.js 16, npm, serta database MySQL/MariaDB.

1. Install dependensi: `npm ci`.
2. Buat file `.env.local` di root project dan isi konfigurasi database sesuai lingkungan lokal.
3. Pastikan tabel database `barang` dan `stock_movements` tersedia. Repositori ini **belum menyertakan migrasi/schema SQL**.
4. Jalankan `npm run dev` dan buka http://localhost:3000.

Contoh nama variabel lingkungan (isi nilainya sendiri; jangan commit kredensial):

```dotenv
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## Kualitas kode

- `npm run lint` — pemeriksaan ESLint.
- `npx tsc --noEmit` — pemeriksaan tipe TypeScript.
- `npm run build` — build production. Halaman yang membaca database membutuhkan konfigurasi dan data database yang benar.

## Struktur utama

- `app/page.tsx` — pintu masuk landing page, metadata SEO.
- `components/landing/` — UI landing page dan ilustrasi.
- `app/(admin)/` — halaman dashboard dan transaksi, dilengkapi sidebar.
- `lib/services/` — query dan logika akses database.
- `app/(admin)/**/actions.ts` — Server Actions dan validasi input dengan Zod.
- `app/globals.css`, `app/shadcn-utilities.css`, dan `postcss.config.mjs` — Tailwind CSS v4 dan utilitas shadcn/ui (di-vendor dari versi 4.23.0 agar CLI `shadcn` tidak ikut terpasang).

**Catatan keamanan:** area admin belum dilindungi autentikasi/otorisasi. Tambahkan akses pengguna dan pengujian transaksi sebelum digunakan di production publik.

## Animasi dan interaksi

- Navbar: smooth scrolling, scroll progress, dan highlight section aktif.
- Hero: fade + pop; tiga kartu inventory flow masuk berurutan kiri, tengah, kanan.
- Dashboard: penghitung angka, animasi chart, stagger statistik, dan hover feedback.
- Halaman tabel, form, dan riwayat: animasi masuk ringan.
- Menggunakan native Web Animations API + IntersectionObserver di `components/motion/motion-observer.tsx`; tidak ada dependency GSAP/Motion baru.
- Konten tetap terlihat saat JavaScript nonaktif; `prefers-reduced-motion` dihormati.

Tambahkan `data-motion="rise"`, `"pop"`, `"fade"`, atau `"left"` pada elemen HTML dan gunakan `data-motion-delay={100}` untuk jeda opsional (milidetik). Hindari animasi setiap baris tabel besar.

## Typography / design system

Skala font untuk dashboard Inventra dipusatkan di **`app/globals.css`**, pada token `--type-*`.
Default: sidebar 280px; menu 15px dengan tinggi 40px; body 14px; judul halaman 24px; judul kartu 16px; caption 12px; metrik 30px.

Gunakan komponen reusable `components/ui/typography.tsx`:

```tsx
import { Heading, Text, Caption } from "@/components/ui/typography";

<Heading as="h1" size="page">Dashboard</Heading>
<Text tone="muted">Deskripsi halaman</Text>
<Heading as="h2" size="section">Ringkasan</Heading>
<Caption>Terakhir diperbarui</Caption>
```

Semua class `text-app-*` membaca token yang sama. Landing page mempertahankan tipografi display editorialnya sendiri.

## Inventra UI design system

Fondasi desain dashboard Inventra berada di:
- `app/design-tokens.css` — **single source of truth** untuk spacing, ukuran kontrol, lebar form, radius, sidebar, shadow, warna semantik, fokus keyboard, dan micro-motion.
- `app/globals.css` — mapping Tailwind CSS v4 `@theme inline` ke class `gap-app-grid`, `px-app-page`, `rounded-app-card`, `h-app-control`, `shadow-app-card`, dll.
- `components/ui/page-shell.tsx` — komponen `PageShell` dan `PageHeader` untuk konsistensi layout delapan halaman admin.
- `components/ui/card.tsx`, `button.tsx`, `input.tsx`, `select.tsx`, `table.tsx`, `sidebar.tsx` — ukuran mengikuti token, bukan angka berulang.

**Prinsip visual:** spacing 4/8px, hirarki radius (kontrol 10px, card 14px, panel 18px), permukaan netral dengan elevasi halus, dan layout responsif. Ukuran standar: tombol/input/select 40px (minimum 44px pada perangkat sentuh), baris tabel 44px, padding card 20px, grid gap 16px, page gap 24px, lebar form maksimal 672px. Teks tetap dikendalikan melalui `--type-*` dan komponen `Heading`/`Text`.

**Cara mengganti global:** ubah token `--ds-card-padding`, `--ds-radius-card`, `--ds-section-gap`, `--ds-control-height`, dan sebagainya di `app/design-tokens.css`; seluruh komponen yang memakai token tersebut akan mengikuti. Landing page sengaja mempertahankan tata visual editorialnya.

Referensi prinsip: [Carbon Spacing](https://carbondesignsystem.com/building-blocks/foundations/spacing/overview), [Atlassian Design Tokens](https://atlassian.design/foundations/tokens/design-tokens), dan [WCAG 2.2 Target Size](https://www.w3.org/TR/WCAG22/#target-size-minimum). Penerapan token membantu konsistensi; kepatuhan WCAG tetap perlu diuji secara manual dan otomatis.
