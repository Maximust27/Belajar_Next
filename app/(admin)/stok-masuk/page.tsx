
import { Suspense } from "react";
import { Heading, Text } from "@/components/ui/typography";

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
    <Card data-motion="pop" data-motion-delay="80" className="max-w-2xl">
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
      <div data-motion="rise">
        <Heading as="h1" size="page">
          Barang Masuk
        </Heading>
          <Text tone="muted">
          Kelola penerimaan stok barang gudang.
        </Text>
      </div>

      <Suspense fallback={<p>Memuat daftar barang...</p>}>
        <FormContent />
      </Suspense>
    </div>
  );
}
