
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Pencil } from "lucide-react";

import { getBarangById } from "@/lib/services/barang.service";
import { getRiwayatBarang } from "@/lib/services/riwayat.service";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  params: Promise<{ id: string }>;
};

async function DetailContent({ params }: Props) {
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

  const riwayat = await getRiwayatBarang(barangId);

  const status =
    barang.stok === 0
      ? "Habis"
      : barang.stok <= 10
        ? "Menipis"
        : "Aman";

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" asChild>
          <Link href="/barang">
            <ArrowLeft className="mr-2 size-4" />
            Kembali
          </Link>
        </Button>

        <Button asChild>
          <Link href={`/barang/${barang.id}/edit`}>
            <Pencil className="mr-2 size-4" />
            Edit Barang
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card data-motion="rise" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Barang</CardTitle>
            <CardDescription>
              Detail master data inventaris
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Kode Barang
              </p>
              <p className="font-mono font-semibold">
                {barang.sku}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Nama Barang
              </p>
              <p className="font-semibold">
                {barang.nama}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Satuan
              </p>
              <p>{barang.satuan}</p>
            </div>
          </CardContent>
        </Card>

        <Card data-motion="pop" data-motion-delay="120">
          <CardHeader>
            <CardTitle>Stok Tersedia</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-4xl font-bold tabular-nums">
              {barang.stok}
              <span className="ml-2 text-base font-normal text-muted-foreground">
                {barang.satuan}
              </span>
            </p>

            <Badge
              variant={
                barang.stok === 0
                  ? "destructive"
                  : barang.stok <= 10
                    ? "outline"
                    : "secondary"
              }
            >
              {status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card data-motion="rise" data-motion-delay="180">
        <CardHeader>
          <CardTitle>Riwayat Stok Barang</CardTitle>
          <CardDescription>
            Sepuluh transaksi terakhir
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Stok Akhir</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {riwayat.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    Belum ada transaksi.
                  </TableCell>
                </TableRow>
              ) : (
                riwayat.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.waktu}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          item.tipe === "MASUK"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {item.tipe}
                      </Badge>
                    </TableCell>

                    <TableCell
                      className={
                        item.tipe === "MASUK"
                          ? "font-semibold text-emerald-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {item.tipe === "MASUK" ? "+" : "-"}
                      {item.jumlah}
                    </TableCell>

                    <TableCell>
                      {item.stok_sesudah}
                    </TableCell>

                    <TableCell>
                      {item.keterangan || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DetailBarangPage({
  params,
}: Props) {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-6">
      <div data-motion="rise">
        <h1 className="text-2xl font-bold tracking-tight">
          Detail Barang
        </h1>
        <p className="text-muted-foreground">
          Informasi dan aktivitas stok barang.
        </p>
      </div>

      <Suspense fallback={<p>Memuat detail barang...</p>}>
        <DetailContent params={params} />
      </Suspense>
    </div>
  );
}
