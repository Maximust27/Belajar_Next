
import { Suspense } from "react";
import { Heading, Text } from "@/components/ui/typography";
import Link from "next/link";

import {
  Package,
  PackageCheck,
  PackageX,
  TriangleAlert,
  Plus,
  ArrowRight,
} from "lucide-react";

import { getDashboardData } from "@/lib/services/dashboard.service";
import { ChartStatusBarang } from "@/components/dashboard/chart-status-barang";
import { CountUp } from "@/components/dashboard/count-up";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
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

// Komponen server untuk membaca data MariaDB
async function DashboardContent() {
  const { statistik, barangTerbaru } =
    await getDashboardData();

  const cards = [
    {
      title: "Jenis Barang",
      value: statistik.total,
      icon: Package,
      color: "text-blue-600",
      background: "bg-blue-500/10",
    },
    {
      title: "Stok Aman",
      value: statistik.aman,
      icon: PackageCheck,
      color: "text-emerald-600",
      background: "bg-emerald-500/10",
    },
    {
      title: "Stok Menipis",
      value: statistik.menipis,
      icon: TriangleAlert,
      color: "text-amber-600",
      background: "bg-amber-500/10",
    },
    {
      title: "Stok Habis",
      value: statistik.habis,
      icon: PackageX,
      color: "text-red-600",
      background: "bg-red-500/10",
    },
  ];

  // Data grafik berasal dari hasil query database
  const chartData = [
    {
      status: "Aman",
      jumlah: statistik.aman,
      fill: "#10B981",
    },
    {
      status: "Menipis",
      jumlah: statistik.menipis,
      fill: "#F59E0B",
    },
    {
      status: "Habis",
      jumlah: statistik.habis,
      fill: "#EF4444",
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 py-6 lg:px-6">

      {/* Judul Dashboard */}
      <div data-motion="rise" className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Heading as="h1" size="page">
            Dashboard Inventaris
          </Heading>
          <Text tone="muted">
            Ringkasan data dan kondisi stok gudang.
          </Text>
        </div>

        <Button asChild>
          <Link href="/barang/tambah">
            <Plus className="mr-2 size-4" />
            Tambah Barang
          </Link>
        </Button>
      </div>

      {/* Statistik */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} data-motion="pop" data-motion-delay={index * 100} data-hover-lift="true">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>

                <div className={`rounded-xl p-2 ${item.background}`}>
                  <Icon className={`size-5 ${item.color}`} />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-app-stat font-bold tabular-nums">
                  <CountUp value={item.value} />
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Berdasarkan data barang gudang
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grafik dan Akses Cepat */}
      <div className="grid gap-4 xl:grid-cols-3">

        <Card data-motion="rise" data-motion-delay="120" data-hover-lift="true" className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Distribusi Status Stok</CardTitle>
            <CardDescription>
              Jumlah jenis barang berdasarkan kondisi stok.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {statistik.total > 0 ? (
              <ChartStatusBarang data={chartData} />
            ) : (
              <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
                Belum ada data barang.
              </div>
            )}
          </CardContent>
        </Card>

        <Card data-motion="rise" data-motion-delay="210" data-hover-lift="true">
          <CardHeader>
            <CardTitle>Akses Cepat</CardTitle>
            <CardDescription>
              Kelola inventaris gudang.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              asChild
              variant="outline"
              className="w-full justify-between"
            >
              <Link href="/barang">
                Lihat Semua Barang
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full justify-between"
            >
              <Link href="/barang/tambah">
                Tambah Barang
                <Plus className="size-4" />
              </Link>
            </Button>

            <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              Status menipis: 1–10 unit.
              Status habis: 0 unit.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Barang Terbaru */}
      <Card data-motion="rise">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Barang Terbaru</CardTitle>
            <CardDescription>
              Delapan barang terakhir yang ditambahkan.
            </CardDescription>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/barang">Lihat Semua</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Nama Barang</TableHead>
                  <TableHead>Satuan</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {barangTerbaru.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-muted-foreground"
                    >
                      Belum ada data barang.
                    </TableCell>
                  </TableRow>
                ) : (
                  barangTerbaru.map((item) => (
                    <TableRow key={item.id} className="transition-colors duration-200 hover:bg-muted/50">
                      <TableCell className="font-mono text-xs">
                        {item.sku}
                      </TableCell>

                      <TableCell>
                        <Link
                          href={`/barang/${item.id}`}
                          className="font-medium hover:underline"
                        >
                          {item.nama}
                        </Link>
                      </TableCell>

                      <TableCell>{item.satuan}</TableCell>

                      <TableCell className="font-medium">
                        {item.stok}
                      </TableCell>

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
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Halaman utama menggunakan Suspense
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-4 px-4 py-6 sm:grid-cols-2 xl:grid-cols-4 lg:px-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
