"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Edit3,
  FolderKanban,
  GraduationCap,
  Home,
  Inbox,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "../ui/button";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
    { href: "/dashboard/education", label: "Education", icon: GraduationCap },
    {
      href: "/dashboard/recommendations",
      label: "Recommendations",
      icon: MessageSquare,
    },
    { href: "/dashboard/content", label: "Content", icon: Edit3 },
    { href: "/dashboard/ai-demo", label: "AI Enhancement", icon: Sparkles },
    { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <div
        className={`h-screen bg-[var(--card-background)]  border-r border-[var(--card-border-color)] flex flex-col ${
          collapsed ? "w-[80px]" : "w-[240px]"
        } transition-all duration-300`}
      >
        <div className="p-4 border-b border-[var(--card-border-color)] flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-[var(--headline)]">b19r</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-[var(--card-hover)] text-[var(--paragraph)]"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => router.push(item.href)}
                    className={`w-full flex items-center p-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-[var(--button)] text-[var(--button-text)]"
                        : "text-[var(--nav-item)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
                    }`}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {!collapsed && (
                      <span className="ml-3 transition-opacity duration-300">
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-[var(--card-border-color)]">
          <Button
            className="w-full flex justify-center gap-3  flex-row-reverse"
            variant={"outline"}
            onClick={handleLogout}
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && (
              <span className="ml-3 transition-opacity duration-300">
                Logout
              </span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
