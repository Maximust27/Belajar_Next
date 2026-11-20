
import "server-only";

import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";

export interface RiwayatItem extends RowDataPacket {
  id: number;
  barang_id: number;
  sku: string;
  nama: string;
  tipe: "MASUK" | "KELUAR";
  jumlah: number;
  stok_sebelum: number;
  stok_sesudah: number;
  keterangan: string | null;
  waktu: string;
}

// Riwayat transaksi untuk satu barang
export async function getRiwayatBarang(barangId: number) {
  const [rows] = await db.execute<RiwayatItem[]>(
    `SELECT
       sm.id,
       sm.barang_id,
       b.sku,
       b.nama,
       sm.tipe,
       sm.jumlah,
       sm.stok_sebelum,
       sm.stok_sesudah,
       sm.keterangan,
       DATE_FORMAT(sm.created_at, '%d/%m/%Y %H:%i') AS waktu
     FROM stock_movements sm
     JOIN barang b ON b.id = sm.barang_id
     WHERE sm.barang_id = ?
     ORDER BY sm.id DESC
     LIMIT 10`,
    [barangId]
  );

  return rows;
}

// Riwayat seluruh gudang dengan filter
export async function getRiwayatTransaksi(filters: {
  q?: string;
  tipe?: string;
  tanggal?: string;
}) {
  const where: string[] = [];
  const values: string[] = [];

  if (filters.q) {
    where.push("(b.nama LIKE ? OR b.sku LIKE ?)");
    values.push(`%${filters.q}%`, `%${filters.q}%`);
  }

  if (filters.tipe === "MASUK" || filters.tipe === "KELUAR") {
    where.push("sm.tipe = ?");
    values.push(filters.tipe);
  }

  if (filters.tanggal) {
    where.push(
      "sm.created_at >= ? AND sm.created_at < DATE_ADD(?, INTERVAL 1 DAY)"
    );
    values.push(filters.tanggal, filters.tanggal);
  }

  const condition = where.length
    ? `WHERE ${where.join(" AND ")}`
    : "";

  const [rows] = await db.execute<RiwayatItem[]>(
    `SELECT
       sm.id,
       sm.barang_id,
       b.sku,
       b.nama,
       sm.tipe,
       sm.jumlah,
       sm.stok_sebelum,
       sm.stok_sesudah,
       sm.keterangan,
       DATE_FORMAT(sm.created_at, '%d/%m/%Y %H:%i') AS waktu
     FROM stock_movements sm
     JOIN barang b ON b.id = sm.barang_id
     ${condition}
     ORDER BY sm.id DESC
     LIMIT 100`,
    values
  );

  return rows;
}
