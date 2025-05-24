"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  GraduationCap,
  FolderKanban,
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [unreadMessages] = useState(5);

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen bg-[var(--background)]">
          <Sidebar
            variant="floating"
            className="border-[var(--card-border-color)]"
          >
            <SidebarHeader className="border-b border-[var(--card-border-color)] pb-2">
              <div className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8 bg-[var(--button)]">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback className="text-[var(--button-text)]">
                    PD
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <h3 className="text-sm font-medium text-[var(--headline)]">
                    Portfolio Dashboard
                  </h3>
                  <p className="text-xs text-[var(--paragraph)]">
                    Content Management
                  </p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard"}
                      >
                        <Link href="/dashboard">
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Overview</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/inbox"}
                      >
                        <Link href="/dashboard/inbox">
                          <Inbox className="h-4 w-4" />
                          <span>Inbox</span>
                        </Link>
                      </SidebarMenuButton>
                      {unreadMessages > 0 && (
                        <Badge className="bg-[var(--badge-background)] text-[var(--badge-text)]">
                          {unreadMessages}
                        </Badge>
                      )}
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Content</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/projects"}
                      >
                        <Link href="/dashboard/projects">
                          <FolderKanban className="h-4 w-4" />
                          <span>Projects</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/experience"}
                      >
                        <Link href="/dashboard/experience">
                          <Briefcase className="h-4 w-4" />
                          <span>Experience</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/education"}
                      >
                        <Link href="/dashboard/education">
                          <GraduationCap className="h-4 w-4" />
                          <span>Education</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/recommendations"}
                      >
                        <Link href="/dashboard/recommendations">
                          <MessageSquare className="h-4 w-4" />
                          <span>Recommendations</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/profile"}
                      >
                        <Link href="/dashboard/profile">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/settings"}
                      >
                        <Link href="/dashboard/settings">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-[var(--card-border-color)] pt-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-[var(--paragraph)]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-6">
            <header className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-[var(--headline)]">
                  Dashboard
                </h1>
              </div>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback className="bg-[var(--button)] text-[var(--button-text)]">
                  JD
                </AvatarFallback>
              </Avatar>
            </header>
            <main>{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
