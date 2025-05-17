"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  GraduationCap,
  Home,
  Inbox,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "80px" },
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
    { href: "/dashboard/education", label: "Education", icon: GraduationCap },
    { href: "/dashboard/recommendations", label: "Recommendations", icon: MessageSquare },
    { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <motion.div
      className="h-screen bg-[var(--card-background)] border-r border-[var(--card-border-color)] flex flex-col"
      initial="expanded"
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-[var(--card-border-color)] flex items-center justify-between">
        <AnimatePresence>
          {!collapsed && (
            <motion.h1
              className="text-xl font-bold text-[var(--headline)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Portfolio
            </motion.h1>
          )}
        </AnimatePresence>
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
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-[var(--button)] text-[var(--button-text)]"
                      : "text-[var(--nav-item)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
                  }`}
                >
                  <item.icon size={20} className="shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        className="ml-3"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-[var(--card-border-color)]">
        <button className="w-full flex items-center p-2 rounded-md text-[var(--nav-item)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]">
          <LogOut size={20} className="shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="ml-3"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}
