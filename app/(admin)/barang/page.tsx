
import { Suspense } from "react";
import { Heading, Text } from "@/components/ui/typography";
import Link from "next/link";

import { getAllBarang } from "@/lib/services/barang.service";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Plus } from "lucide-react";

// Bagian yang mengambil data database
async function TabelBarang() {
  const barang = await getAllBarang();

  return (
    <Card data-motion="rise" className="min-w-0 w-full">
      <CardHeader>
        <CardTitle>Daftar Barang ({barang.length})</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {barang.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  Belum ada barang.
                </TableCell>
              </TableRow>
            ) : (
              barang.map((item) => (
                <TableRow key={item.id} className="transition-colors duration-200 hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">
                    {item.sku}
                  </TableCell>

                  <TableCell className="font-medium">
                    {item.nama}
                  </TableCell>

                  <TableCell>{item.satuan}</TableCell>

                  <TableCell>{item.stok}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        item.stok === 0
                          ? "destructive"
                          : item.stok <= 10
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {item.stok === 0
                        ? "Habis"
                        : item.stok <= 10
                          ? "Menipis"
                          : "Aman"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/barang/${item.id}`}>
                        Detail
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/barang/${item.id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Halaman mengikuti lebar area utama, konsisten dengan dashboard.
export default function BarangPage() {
  return (
    <main className="flex min-w-0 flex-col gap-6 px-4 py-6 lg:px-6">
      <div data-motion="rise" className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Heading as="h1" size="page">
            Data Barang
          </Heading>
          <Text tone="muted">
            Kelola seluruh inventaris gudang.
          </Text>
        </div>

        <Button asChild>
          <Link href="/barang/tambah">
            <Plus className="mr-2 size-4" />
            Tambah Barang
          </Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <Card className="min-w-0 w-full">
            <CardContent className="p-6">
              Memuat data barang...
            </CardContent>
          </Card>
        }
      >
        <TabelBarang />
      </Suspense>
    </main>
  );
}
