"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { motion, AnimatePresence } from "framer-motion";
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
  Tag,
  User,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function DashboardSidebar({
  isOpen = true,
  onClose,
  isMobile = false,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && onClose) {
      onClose();
    }
  }, [pathname, isMobile, onClose]);

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
    { href: "/dashboard/project-types", label: "Project Types", icon: Tag },
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

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: isMobile ? "-100%" : 0,
      opacity: isMobile ? 0 : 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    // Close mobile sidebar after navigation
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(isOpen || !isMobile) && (
          <motion.div
            initial={isMobile ? "closed" : "open"}
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className={`h-screen ${
              isMobile ? "fixed" : "relative"
            } z-50 bg-[var(--card-background)] border-r border-[var(--card-border-color)] flex flex-col ${
              collapsed && !isMobile ? "w-[80px]" : "w-[240px]"
            } ${isMobile ? "" : "transition-all duration-300"}`}
          >
            <div className="p-4 border-b border-[var(--card-border-color)] flex items-center justify-between">
              {(!collapsed || isMobile) && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-bold text-[var(--headline)]"
                >
                  b19r
                </motion.h1>
              )}

              {!isMobile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCollapsed(!collapsed)}
                  className="p-2 rounded-md hover:bg-[var(--card-hover)] text-[var(--paragraph)]"
                >
                  {collapsed ? (
                    <ChevronRight size={20} />
                  ) : (
                    <ChevronLeft size={20} />
                  )}
                </motion.button>
              )}

              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-[var(--card-hover)] text-[var(--paragraph)]"
                >
                  <XIcon size={20} />
                </motion.button>
              )}
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-2 px-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
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
                        {(!collapsed || isMobile) && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="ml-3"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </motion.button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <div className="p-4 border-t border-[var(--card-border-color)]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  className="w-full flex justify-center gap-3 flex-row-reverse"
                  variant="outline"
                  onClick={handleLogout}
                >
                  <LogOut size={20} className="shrink-0" />
                  {(!collapsed || isMobile) && (
                    <span className="ml-3">Logout</span>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
