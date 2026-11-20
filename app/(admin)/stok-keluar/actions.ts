
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import {
  catatBarangKeluar,
  StokKeluarError,
} from "@/lib/services/stok.service";

const angkaPositif = z
  .string()
  .regex(/^[1-9]\d*$/, "Harus berupa angka bulat positif")
  .transform(Number)
  .pipe(z.number().int().positive().max(4294967295));

const schema = z.object({
  barangId: angkaPositif,
  jumlah: angkaPositif,
  keterangan: z.string().trim().max(255),
});

type ActionState = {
  error: string;
  success: string;
};

export async function simpanBarangKeluar(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Validasi input menggunakan Zod
  const parsed = schema.safeParse({
    barangId: formData.get("barangId"),
    jumlah: formData.get("jumlah"),
    keterangan: formData.get("keterangan") ?? "",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Data tidak valid.",
      success: "",
    };
  }

  try {
    // Proses transaksi pengurangan stok
    const hasil = await catatBarangKeluar(parsed.data);

    // Perbarui halaman terkait
    revalidatePath("/dashboard");
    revalidatePath("/barang");
    revalidatePath("/stok-masuk");
    revalidatePath("/stok-keluar");

    return {
      error: "",
      success:
        `Barang berhasil dikeluarkan! ` +
        `Stok berubah dari ${hasil.stokSebelum} ` +
        `menjadi ${hasil.stokSesudah}.`,
    };
  } catch (error) {
    if (error instanceof StokKeluarError) {
      return {
        error: error.message,
        success: "",
      };
    }
  
    console.error("Gagal mencatat barang keluar:", error);
  
    return {
      error: "Terjadi kesalahan saat menyimpan transaksi.",
      success: "",
    };
  }
}
