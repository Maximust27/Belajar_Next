
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createBarang,
  getBarangById,
  updateBarang,
} from "@/lib/services/barang.service";

const barangSchema = z.object({
  sku: z.string().trim().min(1, "SKU wajib diisi").max(50),
  nama: z.string().trim().min(2, "Nama minimal 2 karakter").max(150),
  satuan: z.string().trim().min(1, "Satuan wajib diisi").max(20),
});

type FormState = {
  error: string;
};

export async function tambahBarang(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = barangSchema.safeParse({
    sku: formData.get("sku"),
    nama: formData.get("nama"),
    satuan: formData.get("satuan"),
  });

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message ?? "Data tidak valid",
    };
  }

  try {
    await createBarang(result.data);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ER_DUP_ENTRY"
    ) {
      return { error: "SKU sudah digunakan." };
    }

    console.error(error);
    return { error: "Gagal menyimpan barang." };
  }

  revalidatePath("/barang");
  revalidatePath("/dashboard");
  revalidatePath("/stok-masuk");

  redirect("/barang");
}


const editBarangSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/, "ID barang tidak valid")
    .transform(Number)
    .pipe(z.number().int().positive().max(4294967295)),
  sku: z.string().trim().min(1).max(50),
  nama: z.string().trim().min(2).max(150),
  satuan: z.string().trim().min(1).max(20),
});

export async function editBarang(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const result = editBarangSchema.safeParse({
    id: formData.get("id"),
    sku: formData.get("sku"),
    nama: formData.get("nama"),
    satuan: formData.get("satuan"),
  });

  if (!result.success) {
    return {
      error:
        result.error.issues[0]?.message ??
        "Data tidak valid.",
    };
  }

  const data = result.data;

  try {
    const existing = await getBarangById(data.id);

    if (!existing) {
      return { error: "Barang tidak ditemukan." };
    }

    await updateBarang(data);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ER_DUP_ENTRY"
    ) {
      return { error: "SKU sudah digunakan barang lain." };
    }

    console.error("Gagal mengedit barang:", error);

    return { error: "Gagal memperbarui barang." };
  }

  revalidatePath("/barang");
  revalidatePath(`/barang/${data.id}`);
  revalidatePath("/dashboard");
  revalidatePath("/stok-masuk");
  revalidatePath("/stok-keluar");
  revalidatePath("/riwayat");

  redirect(`/barang/${data.id}`);
}
