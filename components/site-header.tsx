"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/barang": "Data Barang",
  "/stok-masuk": "Stok Masuk",
  "/stok-keluar": "Stok Keluar",
  "/riwayat": "Riwayat Transaksi",
};

export function SiteHeader() {
  const pathname = usePathname();
  const route = Object.keys(routeTitles).find(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  const title = route ? routeTitles[route] : "Inventaris Gudang";

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
}
