
import { Suspense } from "react";
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

import { ArrowLeft, Plus, Package } from "lucide-react";

// Bagian yang mengambil data database
async function TabelBarang() {
  const barang = await getAllBarang();

  return (
    <Card data-motion="rise">
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

// Halaman utama
export default function BarangPage() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">

        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 size-4" />
            Dashboard
          </Link>
        </Button>

        <div data-motion="rise" className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <Package className="size-6 text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Data Barang
              </h1>
              <p className="text-sm text-muted-foreground">
                Kelola seluruh inventaris gudang.
              </p>
            </div>
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
            <Card>
              <CardContent className="p-6">
                Memuat data barang...
              </CardContent>
            </Card>
          }
        >
          <TabelBarang />
        </Suspense>
      </div>
    </main>
  );
}
