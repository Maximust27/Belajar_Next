"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  History,
  House,
  LayoutDashboard,
  Package,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Data Barang", url: "/barang", icon: Package },
  { title: "Stok Masuk", url: "/stok-masuk", icon: ArrowDownToLine },
  { title: "Stok Keluar", url: "/stok-keluar", icon: ArrowUpFromLine },
  { title: "Riwayat", url: "/riwayat", icon: History },
];

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-3 pb-2 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="px-3 [&_svg]:size-5!">
              <Link href="/dashboard" aria-label="Inventra Dashboard">
                <Boxes className="size-5" aria-hidden="true" />
                <span className="text-app-brand font-semibold tracking-tight">Inventra</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <Suspense fallback={null}>
          <NavMain items={navigation} />
        </Suspense>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Beranda">
              <Link href="/">
                <House aria-hidden="true" />
                <span>Kembali ke beranda</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
