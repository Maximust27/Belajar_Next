
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";

import { tambahBarang } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TambahBarangForm() {
  const [state, formAction, pending] = useActionState(
    tambahBarang,
    { error: "" }
  );

  const [form, setForm] = useState({
    sku: "",
    nama: "",
    satuan: "pcs",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
        >
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="sku">Kode Barang / SKU</Label>
        <Input
          id="sku"
          name="sku"
          placeholder="Contoh: BRG-005"
          value={form.sku}
          onChange={(e) => update("sku", e.target.value)}
          maxLength={50}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nama">Nama Barang</Label>
        <Input
          id="nama"
          name="nama"
          placeholder="Contoh: Keyboard Logitech"
          value={form.nama}
          onChange={(e) => update("nama", e.target.value)}
          maxLength={150}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="satuan">Satuan Barang</Label>
        <Input
          id="satuan"
          name="satuan"
          placeholder="pcs, box, roll"
          value={form.satuan}
          onChange={(e) => update("satuan", e.target.value)}
          maxLength={20}
          required
        />
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm font-medium">
          Informasi Stok Awal
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Barang baru otomatis memiliki stok 0.
          Untuk menambahkan stok, gunakan menu Barang Masuk.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" asChild>
          <Link href="/barang">Batal</Link>
        </Button>

        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Barang"}
        </Button>
      </div>
    </form>
  );
}
