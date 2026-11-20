
import { Suspense } from "react";

import { getAllBarang } from "@/lib/services/barang.service";
import { StokMasukForm } from "./form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function FormContent() {
  const data = await getAllBarang();

  const barang = data.map((item) => ({
    id: item.id,
    sku: item.sku,
    nama: item.nama,
    satuan: item.satuan,
    stok: item.stok,
  }));

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Form Penerimaan Barang</CardTitle>
        <CardDescription>
          Catat penambahan stok barang gudang.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <StokMasukForm barang={barang} />
      </CardContent>
    </Card>
  );
}

export default function StokMasukPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Barang Masuk
        </h1>
        <p className="text-muted-foreground">
          Kelola penerimaan stok barang gudang.
        </p>
      </div>

      <Suspense fallback={<p>Memuat daftar barang...</p>}>
        <FormContent />
      </Suspense>
    </div>
  );
}
