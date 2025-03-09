"use client";

import * as React from "react";
import Link from "next/link";
import {
  Package,
  ClipboardList,
  HelpCircle,
  Users,
  Settings,
  LayoutDashboard,
  Mail,
  BarcodeIcon as BillingIcon,
  MessageSquare,
  ArrowLeftCircleIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const adminGroups: MenuGroup[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
      { title: "Users", url: "/dashboard/admin/users", icon: Users },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Packages", url: "/dashboard/admin/packages", icon: Package },
      { title: "Orders", url: "/dashboard/admin/orders", icon: ClipboardList },
      { title: "Email Lists", url: "/dashboard/admin/email-lists", icon: Mail },
      {
        title: "Subscriptions",
        url: "/dashboard/admin/subscriptions",
        icon: Package,
      },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Billing", url: "/dashboard/admin/billing", icon: BillingIcon },
      {
        title: "Support",
        url: "/dashboard/admin/support",
        icon: MessageSquare,
      },
      { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        title: "Generator",
        url: "/dashboard/admin/generator",
        icon: ArrowLeftCircleIcon,
      },
      {
        title: "Insert Email",
        url: "/dashboard/admin/insert-emails",
        icon: ArrowLeftCircleIcon,
      },
    ],
  },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={"/profile"}>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback className="rounded-lg">ba</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="font-semibold">Baraa</span>
                  <span className="text-xs text-muted-foreground">
                    The owner of Emailty
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8.5rem)]">
          {adminGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
          <Separator className="my-4 bg-sidebar-border" />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          asChild
        >
          <Link href="/support">
            <HelpCircle className="h-4 w-4" />
            <span>Help & Support</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
