
"use client";

import { useActionState, useState } from "react";
import { PackageMinus, AlertTriangle } from "lucide-react";

import { simpanBarangKeluar } from "./actions";

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

export function StokKeluarForm({
  barang,
}: {
  barang: Barang[];
}) {
  const [state, formAction, pending] = useActionState(
    simpanBarangKeluar,
    { error: "", success: "" }
  );

  const [selectedId, setSelectedId] = useState("");

  const selectedBarang = barang.find(
    (item) => String(item.id) === selectedId
  );

  return (
    <form action={formAction} className="space-y-app-form">

      {/* Notifikasi */}
      {state.error && (
        <div
          role="alert"
          className="flex gap-3 rounded-app-control border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertTriangle className="size-5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {state.success && (
        <div
          role="status"
          className="rounded-app-control border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
        >
          {state.success}
        </div>
      )}

      {/* Pilih barang */}
      <div className="space-y-app-inline">
        <Label>Pilih Barang</Label>

        <Select
          name="barangId"
          value={selectedId}
          onValueChange={setSelectedId}
          required
          disabled={pending}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih barang yang akan dikeluarkan" />
          </SelectTrigger>

          <SelectContent>
            {barang.map((item) => (
              <SelectItem
                key={item.id}
                value={String(item.id)}
                disabled={item.stok === 0}
              >
                {item.sku} - {item.nama}
                {" "}({item.stok} {item.satuan})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Informasi stok tersedia */}
      {selectedBarang && (
        <div data-motion="pop" className="flex items-center justify-between rounded-app-card border bg-muted/40 p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Stok Tersedia
            </p>
            <p className="text-2xl font-bold">
              {selectedBarang.stok} {selectedBarang.satuan}
            </p>
          </div>

          <PackageMinus className="size-8 text-muted-foreground" />
        </div>
      )}

      {/* Jumlah barang keluar */}
      <div className="space-y-app-inline">
        <Label htmlFor="jumlah">Jumlah Keluar</Label>

        <Input
          id="jumlah"
          name="jumlah"
          type="number"
          min="1"
          max={selectedBarang?.stok}
          step="1"
          placeholder="Masukkan jumlah barang"
          required
          disabled={pending || !selectedBarang}
        />

        <p className="text-xs text-muted-foreground">
          Jumlah tidak boleh melebihi stok tersedia.
        </p>
      </div>

      {/* Keterangan */}
      <div className="space-y-app-inline">
        <Label htmlFor="keterangan">Keterangan</Label>

        <Input
          id="keterangan"
          name="keterangan"
          maxLength={255}
          placeholder="Contoh: Pengiriman ke pelanggan"
          disabled={pending}
        />
      </div>

      {/* Tombol simpan */}
      <Button
        type="submit"
        className="w-full"
        disabled={
          pending ||
          !selectedBarang ||
          selectedBarang.stok <= 0
        }
      >
        {pending ? "Memproses..." : "Simpan Barang Keluar"}
      </Button>
    </form>
  );
}
