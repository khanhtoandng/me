"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar, useResponsiveSidebar } from "@/contexts/sidebar-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  FolderOpen,
  BookOpen,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Home,
  Briefcase,
  GraduationCap,
  Star,
  Mail,
  Cog,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    href: "/dashboard/projects",
    label: "Projects",
    icon: <FolderOpen className="h-5 w-5" />,
  },
  {
    href: "/dashboard/experience",
    label: "Experience",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    href: "/dashboard/education",
    label: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    href: "/dashboard/recommendations",
    label: "Recommendations",
    icon: <Star className="h-5 w-5" />,
  },
  {
    href: "/dashboard/messages",
    label: "Messages",
    icon: <Mail className="h-5 w-5" />,
    badge: 3,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <Cog className="h-5 w-5" />,
  },
];

interface ResponsiveSidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function ResponsiveSidebar({ user }: ResponsiveSidebarProps) {
  const pathname = usePathname();
  const { closeSidebar } = useSidebar();
  const {
    sidebarOpen,
    isMobile,
    toggleSidebar,
    showOverlay,
    sidebarClasses,
    showMobileMenuButton,
  } = useResponsiveSidebar();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const handleNavClick = () => {
    if (isMobile) {
      closeSidebar();
    }
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
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

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {showMobileMenuButton && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden /90 backdrop-blur-sm shadow-lg"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      )}

      {/* Overlay for mobile */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        id="dashboard-sidebar"
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`
          fixed inset-y-0 left-0 z-50 w-64  dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          ${isMobile ? "shadow-xl" : ""}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                Alshaer
              </span>
            </Link>

            {isMobile && (
              <Button variant="ghost" size="icon" onClick={closeSidebar}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* User Profile */}
          {user && (
            <motion.div
              variants={itemVariants}
              className="p-4 border-b border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <motion.div
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.02, staggerDirection: -1 },
                },
              }}
            >
              {navigationItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <NavItem
                    item={item}
                    isActive={isActive(item.href)}
                    isExpanded={expandedItems.includes(item.href)}
                    onToggleExpanded={() => toggleExpanded(item.href)}
                    onNavClick={handleNavClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          </nav>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="p-4 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="space-y-2">
              <Link href="/" onClick={handleNavClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <Home className="h-4 w-4 mr-3" />
                  View Site
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onNavClick: () => void;
}

function NavItem({
  item,
  isActive,
  isExpanded,
  onToggleExpanded,
  onNavClick,
}: NavItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={onToggleExpanded}
          className={`
            w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors
            ${
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            }
          `}
        >
          <div className="flex items-center">
            {item.icon}
            <span className="ml-3">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto mr-2">
                {item.badge}
              </Badge>
            )}
          </div>
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>
      ) : (
        <Link href={item.href} onClick={onNavClick}>
          <div
            className={`
              flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
              ${
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              }
            `}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto">
                {item.badge}
              </Badge>
            )}
          </div>
        </Link>
      )}

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-6 mt-1 space-y-1 overflow-hidden"
          >
            {item.children?.map((child) => (
              <Link key={child.href} href={child.href} onClick={onNavClick}>
                <div className="flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  {child.icon}
                  <span className="ml-3">{child.label}</span>
                  {child.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {child.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
