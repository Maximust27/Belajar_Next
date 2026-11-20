
import "server-only";

import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";

type StokInput = {
  barangId: number;
  jumlah: number;
  keterangan: string;
};

interface StokRow extends RowDataPacket {
  stok: number;
}

export async function catatBarangMasuk(data: StokInput) {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // Kunci baris barang selama transaksi
    const [rows] = await conn.query<StokRow[]>(
      "SELECT stok FROM barang WHERE id = ? FOR UPDATE",
      [data.barangId]
    );

    if (rows.length === 0) {
      throw new Error("Barang tidak ditemukan");
    }

    const stokSebelum = Number(rows[0].stok);
    const stokSesudah = stokSebelum + data.jumlah;

    if (stokSesudah > 4294967295) {
      throw new Error("Jumlah stok melebihi batas database");
    }

    // Update stok barang
    await conn.execute(
      "UPDATE barang SET stok = ? WHERE id = ?",
      [stokSesudah, data.barangId]
    );

    // Simpan riwayat
    await conn.execute(
      `INSERT INTO stock_movements
       (barang_id, tipe, jumlah, stok_sebelum, stok_sesudah, keterangan)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.barangId,
        "MASUK",
        data.jumlah,
        stokSebelum,
        stokSesudah,
        data.keterangan || null,
      ]
    );

    await conn.commit();

    return { stokSebelum, stokSesudah };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}


export class StokKeluarError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StokKeluarError";
  }
}

export async function catatBarangKeluar(data: StokInput) {
  // Validasi data sebelum transaksi
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

    // 2. Ambil dan kunci stok barang
    const [rows] = await conn.query<StokRow[]>(
      "SELECT stok FROM barang WHERE id = ? FOR UPDATE",
      [data.barangId]
    );

    if (rows.length === 0) {
      throw new StokKeluarError("Barang tidak ditemukan.");
    }

    const stokSebelum = Number(rows[0].stok);

    // 3. Validasi stok tersedia
    if (data.jumlah > stokSebelum) {
      throw new StokKeluarError(
        `Stok tidak cukup! Tersedia ${stokSebelum}.`
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
       (barang_id, tipe, jumlah, stok_sebelum,
        stok_sesudah, keterangan)
       VALUES (?, 'KELUAR', ?, ?, ?, ?)`,
      [
        data.barangId,
        data.jumlah,
        stokSebelum,
        stokSesudah,
        data.keterangan.trim() || null,
      ]
    );

    // 6. Simpan transaksi
    await conn.commit();

    return {
      stokSebelum,
      stokSesudah,
    };

  } catch (error) {
    await conn.rollback();
    throw error;

  } finally {
    conn.release();
  }
}
