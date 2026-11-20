"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="px-2 py-2">
      <SidebarGroupLabel className="px-3 font-semibold uppercase tracking-[0.13em] text-sidebar-foreground/55">Menu utama</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map(({ title, url, icon: Icon }, index) => (
            <SidebarMenuItem key={url} data-motion="left" data-motion-delay={index * 55}>
              <SidebarMenuButton
                asChild
                tooltip={title}
                className="font-medium transition-colors duration-200 data-[active=true]:font-semibold"
                isActive={pathname === url || pathname.startsWith(`${url}/`)}
              >
                <Link href={url}>
                  <Icon aria-hidden="true" />
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
