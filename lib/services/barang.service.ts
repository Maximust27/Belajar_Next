import "server-only";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
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
