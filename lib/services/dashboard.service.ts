
import "server-only";
import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";

interface StatistikRow extends RowDataPacket {
  total: number;
  aman: number | string | null;
  menipis: number | string | null;
  habis: number | string | null;
}

export interface BarangTerbaru extends RowDataPacket {
  id: number;
  sku: string;
  nama: string;
  satuan: string;
  stok: number;
}

export async function getDashboardData() {
  // Jalankan kedua query secara bersamaan
  const [[statRows], [barangTerbaru]] = await Promise.all([
    db.query<StatistikRow[]>(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN stok > 10 THEN 1 ELSE 0 END) AS aman,
        SUM(CASE WHEN stok BETWEEN 1 AND 10 THEN 1 ELSE 0 END) AS menipis,
        SUM(CASE WHEN stok = 0 THEN 1 ELSE 0 END) AS habis
      FROM barang
    `),

    db.query<BarangTerbaru[]>(`
      SELECT id, sku, nama, satuan, stok
      FROM barang
      ORDER BY created_at DESC, id DESC
      LIMIT 8
    `),
  ]);

  const statistik = statRows[0];

  return {
    statistik: {
      total: Number(statistik?.total ?? 0),
      aman: Number(statistik?.aman ?? 0),
      menipis: Number(statistik?.menipis ?? 0),
      habis: Number(statistik?.habis ?? 0),
    },
    barangTerbaru,
  };
}
