
import { Suspense } from "react";
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
    <Card className="max-w-2xl">
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
    <div className="space-y-6 px-4 py-6 lg:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Edit Barang
        </h1>
        <p className="text-muted-foreground">
          Ubah informasi barang tanpa memengaruhi stok.
        </p>
      </div>

      <Suspense fallback={<p>Memuat barang...</p>}>
        <EditContent params={params} />
      </Suspense>
    </div>
  );
}
