
import { Suspense } from "react";
import { Heading, Text } from "@/components/ui/typography";

import { getAllBarang } from "@/lib/services/barang.service";
import { StokKeluarForm } from "./form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function FormContent() {
  const data = await getAllBarang();

  // Ubah hasil query menjadi plain object
  // sebelum dikirim ke Client Component
  const barang = data.map((item) => ({
    id: item.id,
    sku: item.sku,
    nama: item.nama,
    satuan: item.satuan,
    stok: item.stok,
  }));

  return (
    <Card data-motion="pop" data-motion-delay="80" className="max-w-2xl">
      <CardHeader>
        <CardTitle>Form Pengeluaran Barang</CardTitle>

        <CardDescription>
          Catat pengurangan stok dan riwayat
          transaksi barang gudang.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <StokKeluarForm barang={barang} />
      </CardContent>
    </Card>
  );
}

export default function StokKeluarPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-6">
      <div data-motion="rise">
        <Heading as="h1" size="page">
          Barang Keluar
        </Heading>
          <Text tone="muted">
          Kelola pengeluaran stok barang gudang.
        </Text>
      </div>

      <Suspense
        fallback={
          <div className="h-80 max-w-2xl animate-pulse rounded-xl bg-muted" />
        }
      >
        <FormContent />
      </Suspense>
    </div>
  );
}
