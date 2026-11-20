
import { Suspense } from "react";
import { Heading, Text } from "@/components/ui/typography";
import { PageShell, PageHeader } from "@/components/ui/page-shell";

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
    <Card data-motion="pop" data-motion-delay="80" className="w-full max-w-(--ds-form-max-width)">
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
    <PageShell>
      <PageHeader data-motion="rise" className="flex-col gap-1">
        <Heading as="h1" size="page">
          Barang Masuk
        </Heading>
          <Text tone="muted">
          Kelola penerimaan stok barang gudang.
        </Text>
      </PageHeader>

      <Suspense fallback={<p>Memuat daftar barang...</p>}>
        <FormContent />
      </Suspense>
    </PageShell>
  );
}
