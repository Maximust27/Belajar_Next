
"use client";

import { useActionState } from "react";
import Link from "next/link";

import { editBarang } from "../../actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BarangForm = {
  id: number;
  sku: string;
  nama: string;
  satuan: string;
};

export default function EditBarangForm({
  barang,
}: {
  barang: BarangForm;
}) {
  const [state, formAction, pending] = useActionState(
    editBarang,
    { error: "" }
  );

  return (
    <form action={formAction} className="space-y-app-form">
      <input
        type="hidden"
        name="id"
        value={barang.id}
      />

      {state.error && (
        <div
          role="alert"
          className="rounded-app-control bg-red-50 p-3 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      <div className="space-y-app-inline">
        <Label htmlFor="sku">Kode Barang / SKU</Label>
        <Input
          id="sku"
          name="sku"
          defaultValue={barang.sku}
          maxLength={50}
          required
        />
      </div>

      <div className="space-y-app-inline">
        <Label htmlFor="nama">Nama Barang</Label>
        <Input
          id="nama"
          name="nama"
          defaultValue={barang.nama}
          maxLength={150}
          required
        />
      </div>

      <div className="space-y-app-inline">
        <Label htmlFor="satuan">Satuan</Label>
        <Input
          id="satuan"
          name="satuan"
          defaultValue={barang.satuan}
          maxLength={20}
          required
        />
        <p className="text-xs text-muted-foreground">
          Jangan mengubah satuan jika barang sudah
          memiliki stok atau riwayat transaksi.
        </p>
      </div>

      <div className="rounded-app-control border bg-muted/40 p-4">
        <p className="text-sm font-medium">
          Informasi Stok
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Jumlah stok tidak dapat diubah melalui form ini.
          Gunakan menu Barang Masuk atau Barang Keluar.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href={`/barang/${barang.id}`}>
            Batal
          </Link>
        </Button>

        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}
