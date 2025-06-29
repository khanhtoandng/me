"use client";

import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  Star,
  Tags,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface DesktopSidebarProps {
  className?: string;
}

export function DesktopSidebar({ className = "" }: DesktopSidebarProps) {
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
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
    { href: "/dashboard/project-types", label: "Project Types", icon: Tags },
    { href: "/dashboard/experience", label: "Experience", icon: BookOpen },
    { href: "/dashboard/education", label: "Education", icon: BookOpen },
    {
      href: "/dashboard/recommendations",
      label: "Recommendations",
      icon: Star,
    },
    { href: "/dashboard/content", label: "Content", icon: FileText },
    {
      href: "/dashboard/ai-enhancement",
      label: "AI Enhancement",
      icon: Sparkles,
    },
    { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className={`hidden md:flex ${className}`}>
      <motion.div
        className={`h-screen relative z-50 bg-[var(--card-background)] border-r border-[var(--card-border-color)] flex flex-col ${
          collapsed ? "w-[80px]" : "w-[240px] lg:w-[280px]"
        } transition-all duration-300`}
      >
        <div className="p-4 border-b border-[var(--card-border-color)] flex items-center justify-between">
          {!collapsed && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-[var(--heading)]"
            >
              Dashboard
            </motion.h1>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-[var(--card-hover)] text-[var(--paragraph)]"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center p-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-[var(--button)] text-[var(--button-text)]"
                      : "text-[var(--nav-item)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
                  }`}
                >
                  <item.icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-3 text-left"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.button>
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--card-border-color)]">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="w-full flex justify-center gap-3 flex-row-reverse"
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut size={20} className="shrink-0" />
              {!collapsed && <span className="ml-3">Logout</span>}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
