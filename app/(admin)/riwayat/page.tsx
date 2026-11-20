
import { Suspense } from "react";
import { Heading, Text } from "@/components/ui/typography";
import Link from "next/link";
import { ChevronDown, Search, RotateCcw } from "lucide-react";

import { getRiwayatTransaksi } from "@/lib/services/riwayat.service";

import { Input } from "@/components/ui/input";
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

// Type
type Props = {
  searchParams: Promise<{
    q?: string;
    tipe?: string;
    tanggal?: string;
  }>;
};

// RiwayatContent
async function RiwayatContent({ searchParams }: Props) {
  const params = await searchParams;

  // Filter pencarian
  const q =
    typeof params.q === "string"
      ? params.q.trim().slice(0, 80)
      : "";

  // Filter tipe transaksi
  const tipe =
    params.tipe === "MASUK" || params.tipe === "KELUAR"
      ? params.tipe
      : "";

  // Filter tanggal
  const rawTanggal =
    typeof params.tanggal === "string"
      ? params.tanggal
      : "";

  const tanggal =
    /^\d{4}-\d{2}-\d{2}$/.test(rawTanggal) &&
    !Number.isNaN(Date.parse(rawTanggal)) &&
    new Date(rawTanggal).toISOString().slice(0, 10) ===
      rawTanggal
      ? rawTanggal
      : "";

  // Ambil data langsung dari service MariaDB
  const riwayat = await getRiwayatTransaksi({
    q,
    tipe,
    tanggal,
  });

  return (
    <Card data-motion="rise" className="overflow-hidden">
      {/* HEADER CARD */}
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              Daftar Transaksi
            </CardTitle>

            <CardDescription>
              Monitoring barang masuk dan keluar gudang.
            </CardDescription>
          </div>

          <Badge variant="secondary">
            {riwayat.length} Transaksi
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">

        {/* FILTER FORM */}
        <form
          method="get"
          className="flex flex-wrap items-center gap-3"
        >
          {/* SEARCH */}
          <div className="relative w-full sm:w-64">
            <Search
              className="
                pointer-events-none
                absolute left-3 top-1/2
                size-4 -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              name="q"
              defaultValue={q}
              placeholder="Cari SKU atau nama barang..."
              className="h-10 w-full pl-9 pr-3"
            />
          </div>

          {/* FILTER TIPE */}
          <div className="relative w-full sm:w-48">
            <select
              name="tipe"
              defaultValue={tipe}
              className="
                h-10 w-full
                appearance-none
                rounded-md
                border border-input
                bg-background
                pl-3 pr-10
                text-sm
                shadow-xs
                outline-none
                transition-colors
                focus-visible:border-ring
                focus-visible:ring-[3px]
                focus-visible:ring-ring/50
                dark:bg-input/30
              "
            >
              <option value="">
                Semua Transaksi
              </option>

              <option value="MASUK">
                Barang Masuk
              </option>

              <option value="KELUAR">
                Barang Keluar
              </option>
            </select>

            {/* PANAH DROPDOWN */}
            <ChevronDown
              className="
                pointer-events-none
                absolute right-3 top-1/2
                size-4 -translate-y-1/2
                text-muted-foreground
              "
            />
          </div>

          {/* FILTER TANGGAL */}
          <Input
            name="tanggal"
            type="date"
            defaultValue={tanggal}
            className="h-10 w-full sm:w-44"
          />

          {/* BUTTON FILTER */}
          <Button
            type="submit"
            className="h-10 gap-2 px-4"
          >
            <Search className="size-4" />
            Filter
          </Button>

          {/* BUTTON RESET */}
          <Button
            variant="outline"
            className="h-10 gap-2 px-4"
            asChild
          >
            <Link href="/riwayat">
              <RotateCcw className="size-4" />
              Reset
            </Link>
          </Button>
        </form>

        {/* ========================================
            TABLE RIWAYAT
        ======================================== */}

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  Tanggal
                </TableHead>

                <TableHead>
                  Barang
                </TableHead>

                <TableHead>
                  Tipe
                </TableHead>

                <TableHead className="text-right">
                  Jumlah
                </TableHead>

                <TableHead className="text-right">
                  Stok Awal
                </TableHead>

                <TableHead className="text-right">
                  Stok Akhir
                </TableHead>

                <TableHead>
                  Keterangan
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {riwayat.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-12 text-center text-muted-foreground"
                  >
                    Tidak ada transaksi ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                riwayat.map((item) => (
                  <TableRow
                    key={item.id}
                    className="transition-colors duration-200 hover:bg-muted/40"
                  >
                    {/* TANGGAL */}
                    <TableCell className="whitespace-nowrap text-sm">
                      {item.waktu}
                    </TableCell>

                    {/* NAMA BARANG */}
                    <TableCell>
                      <Link
                        href={`/barang/${item.barang_id}`}
                        className="font-medium hover:text-primary hover:underline"
                      >
                        {item.nama}
                      </Link>

                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {item.sku}
                      </p>
                    </TableCell>

                    {/* TIPE TRANSAKSI */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.tipe === "MASUK"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                            : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
                        }
                      >
                        {item.tipe}
                      </Badge>
                    </TableCell>

                    {/* JUMLAH */}
                    <TableCell
                      className={`text-right font-semibold tabular-nums ${
                        item.tipe === "MASUK"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.tipe === "MASUK" ? "+" : "-"}
                      {item.jumlah}
                    </TableCell>

                    {/* STOK AWAL */}
                    <TableCell className="text-right tabular-nums">
                      {item.stok_sebelum}
                    </TableCell>

                    {/* STOK AKHIR */}
                    <TableCell className="text-right font-medium tabular-nums">
                      {item.stok_sesudah}
                    </TableCell>

                    {/* KETERANGAN */}
                    <TableCell className="max-w-64 text-sm text-muted-foreground">
                      {item.keterangan || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Menampilkan {riwayat.length} transaksi
            (maksimal 100 data terbaru sesuai filter).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// page
export default function RiwayatPage({
  searchParams,
}: Props) {
  return (
    <div className="flex flex-col gap-6 px-4 py-6 lg:px-6">
      {/* PAGE HEADER */}
      <div data-motion="rise" className="space-y-1">
        <Heading as="h1" size="page">
          Riwayat Transaksi
        </Heading>
          <Text tone="muted">
          Monitoring seluruh aktivitas barang masuk
          dan keluar di gudang.
        </Text>
      </div>

      {/* PAGE CONTENT */}
      <Suspense
        fallback={
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-64 w-full animate-pulse rounded-md bg-muted" />
              </div>
            </CardContent>
          </Card>
        }
      >
        <RiwayatContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
