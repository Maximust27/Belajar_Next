
import { Suspense } from "react";
import { Heading, Text } from "@/components/ui/typography";
import { PageShell, PageHeader } from "@/components/ui/page-shell";
import { notFound } from "next/navigation";

import { getBarangById } from "@/lib/services/barang.service";
import EditBarangForm from "./form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type Props = {
  params: Promise<{ id: string }>;
};

async function EditContent({ params }: Props) {
  const { id } = await params;

  const barangId = Number(id);

  if (
    !/^[1-9]\d*$/.test(id) ||
    !Number.isSafeInteger(barangId) ||
    barangId > 4294967295
  ) {
    notFound();
  }

  const barang = await getBarangById(barangId);

  if (!barang) {
    notFound();
  }

  return (
    <Card data-motion="pop" data-motion-delay="80" className="w-full max-w-(--ds-form-max-width)">
      <CardHeader>
        <CardTitle>Edit Informasi Barang</CardTitle>
        <CardDescription>
          Perbarui master data barang gudang.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <EditBarangForm
          barang={{
            id: barang.id,
            sku: barang.sku,
            nama: barang.nama,
            satuan: barang.satuan,
          }}
        />
      </CardContent>
    </Card>
  );
}

export default function EditBarangPage({
  params,
}: Props) {
  return (
    <PageShell>
      <PageHeader data-motion="rise" className="flex-col gap-1">
        <Heading as="h1" size="page">
          Edit Barang
        </Heading>
          <Text tone="muted">
          Ubah informasi barang tanpa memengaruhi stok.
        </Text>
      </PageHeader>

      <Suspense fallback={<p>Memuat barang...</p>}>
        <EditContent params={params} />
      </Suspense>
    </PageShell>
  );
}
