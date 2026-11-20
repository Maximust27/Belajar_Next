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
- `app/globals.css` dan `postcss.config.mjs` — Tailwind CSS v4 dan shadcn/ui.

**Catatan keamanan:** area admin belum dilindungi autentikasi/otorisasi. Tambahkan akses pengguna dan pengujian transaksi sebelum digunakan di production publik.
