import "server-only";
import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";

// Mendefinisikan tipe data barang
export interface Barang extends RowDataPacket {
  id: number;
  sku: string;
  nama: string;
  satuan: string;
  stok: number;
}

// Mengambil semua data barang
export async function getAllBarang(): Promise<Barang[]> {
  const [rows] = await db.query<Barang[]>(
    `SELECT id, sku, nama, satuan, stok
     FROM barang
     ORDER BY id DESC`
  );

  return rows;
}

// Membuat data barang baru
export async function createBarang(data: {
  sku: string;
  nama: string;
  satuan: string;
}) {
  await db.execute(
    `INSERT INTO barang (sku, nama, satuan, stok)
     VALUES (?, ?, ?, 0)`,
    [data.sku, data.nama, data.satuan]
  );
}

export interface StokInput {
  barangId: number;
  jumlah: number;
  keterangan?: string | null;
}

export interface StokRow extends RowDataPacket {
  stok: number;
}

export class StokKeluarError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StokKeluarError";
  }
}

export async function catatBarangKeluar(data: StokInput) {
  // Validasi tambahan di service
  if (
    !Number.isSafeInteger(data.barangId) ||
    data.barangId <= 0 ||
    !Number.isSafeInteger(data.jumlah) ||
    data.jumlah <= 0 ||
    data.jumlah > 4294967295
  ) {
    throw new StokKeluarError("Data transaksi tidak valid.");
  }

  const conn = await db.getConnection();

  try {
    // 1. Mulai transaksi
    await conn.beginTransaction();

    // 2. Kunci stok barang yang akan diubah
    const [rows] = await conn.query<StokRow[]>(
      "SELECT stok FROM barang WHERE id = ? FOR UPDATE",
      [data.barangId]
    );

    if (rows.length === 0) {
      throw new StokKeluarError("Barang tidak ditemukan.");
    }

    const stokSebelum = Number(rows[0].stok);

    // 3. Pastikan stok mencukupi
    if (data.jumlah > stokSebelum) {
      throw new StokKeluarError(
        `Stok tidak cukup! Stok tersedia hanya ${stokSebelum}.`
      );
    }

    const stokSesudah = stokSebelum - data.jumlah;

    // 4. Kurangi stok barang
    await conn.execute(
      "UPDATE barang SET stok = ? WHERE id = ?",
      [stokSesudah, data.barangId]
    );

    // 5. Simpan riwayat barang keluar
    await conn.execute(
      `INSERT INTO stock_movements
       (
         barang_id,
         tipe,
         jumlah,
         stok_sebelum,
         stok_sesudah,
         keterangan
       )
       VALUES (?, 'KELUAR', ?, ?, ?, ?)`,
      [
        data.barangId,
        data.jumlah,
        stokSebelum,
        stokSesudah,
        data.keterangan?.trim() || null,
      ]
    );

    // 6. Simpan kedua perubahan sekaligus
    await conn.commit();

    return {
      stokSebelum,
      stokSesudah,
    };
  } catch (error) {
    // Jika salah satu operasi gagal,
    // batalkan seluruh transaksi
    await conn.rollback();
    throw error;
  } finally {
    // Kembalikan koneksi ke pool
    conn.release();
  }
}


import type { ResultSetHeader } from "mysql2";

// Mengambil satu barang berdasarkan ID
export async function getBarangById(id: number) {
  const [rows] = await db.execute<Barang[]>(
    `SELECT id, sku, nama, satuan, stok, created_at
     FROM barang
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  return rows[0] ?? null;
}

// Mengubah master data, tanpa mengubah stok
export async function updateBarang(data: {
  id: number;
  sku: string;
  nama: string;
  satuan: string;
}) {
  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE barang
     SET sku = ?, nama = ?, satuan = ?
     WHERE id = ?`,
    [data.sku, data.nama, data.satuan, data.id]
  );

  return result.affectedRows > 0;
}
