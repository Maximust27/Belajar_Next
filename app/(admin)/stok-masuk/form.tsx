
"use client";

import { useActionState } from "react";

import { simpanBarangMasuk } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Barang = {
  id: number;
  sku: string;
  nama: string;
  satuan: string;
  stok: number;
};

export function StokMasukForm({
  barang,
}: {
  barang: Barang[];
}) {
  const [state, formAction, pending] = useActionState(
    simpanBarangMasuk,
    { error: "", success: "" }
  );

  return (
    <form action={formAction} className="space-y-app-form">
      {state.error && (
        <p role="alert" className="rounded-app-control bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      {state.success && (
        <p role="status" className="rounded-app-control bg-emerald-50 p-3 text-sm text-emerald-700">
          {state.success}
        </p>
      )}

      <div className="space-y-app-inline">
        <Label>Pilih Barang</Label>

        <Select name="barangId" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih barang gudang" />
          </SelectTrigger>

          <SelectContent>
            {barang.map((item) => (
              <SelectItem
                key={item.id}
                value={String(item.id)}
              >
                {item.sku} - {item.nama}
                {" "}({item.stok} {item.satuan})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-app-inline">
        <Label htmlFor="jumlah">Jumlah Masuk</Label>
        <Input
          id="jumlah"
          name="jumlah"
          type="number"
          min="1"
          step="1"
          required
          placeholder="Contoh: 20"
        />
      </div>

      <div className="space-y-app-inline">
        <Label htmlFor="keterangan">Keterangan</Label>
        <Input
          id="keterangan"
          name="keterangan"
          maxLength={255}
          placeholder="Contoh: Restock dari supplier"
        />
      </div>

      <Button
        type="submit"
        disabled={pending || barang.length === 0}
        className="w-full"
      >
        {pending ? "Menyimpan..." : "Simpan Barang Masuk"}
      </Button>
    </form>
  );
}
