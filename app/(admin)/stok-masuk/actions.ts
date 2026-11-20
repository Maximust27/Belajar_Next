
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { catatBarangMasuk } from "@/lib/services/stok.service";

const schema = z.object({
  barangId: z.coerce.number().int().positive(),
  jumlah: z.coerce
    .number()
    .int()
    .min(1, "Jumlah minimal 1")
    .max(4294967295),
  keterangan: z.string().trim().max(255),
});

type ActionState = {
  error: string;
  success: string;
};

export async function simpanBarangMasuk(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = schema.safeParse({
    barangId: formData.get("barangId"),
    jumlah: formData.get("jumlah"),
    keterangan: formData.get("keterangan") ?? "",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Data tidak valid",
      success: "",
    };
  }

  try {
    const hasil = await catatBarangMasuk(parsed.data);

    revalidatePath("/barang");
    revalidatePath("/dashboard");
    revalidatePath("/stok-masuk");

    return {
      error: "",
      success: `Berhasil! Stok berubah dari ${hasil.stokSebelum} menjadi ${hasil.stokSesudah}.`,
    };
  } catch (error) {
    console.error("Transaksi stok gagal:", error);

    return {
      error: "Gagal menyimpan transaksi. Periksa data dan coba lagi.",
      success: "",
    };
  }
}
