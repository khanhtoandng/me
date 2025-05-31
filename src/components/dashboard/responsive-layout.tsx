"use client";

import { ReactNode } from "react";
import { ResponsiveSidebar } from "./responsive-sidebar";
import { SidebarProvider, useResponsiveSidebar } from "@/contexts/sidebar-context";
import { PageTransition } from "@/components/ui/page-transition";
import { motion } from "framer-motion";

interface ResponsiveDashboardLayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  className?: string;
}

function DashboardLayoutContent({
  children,
  user,
  className = "",
}: ResponsiveDashboardLayoutProps) {
  const { mainContentClasses, isMobile, sidebarOpen } = useResponsiveSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ResponsiveSidebar user={user} />
      
      {/* Main Content */}
      <motion.main
        className={`
          ${mainContentClasses}
          min-h-screen transition-all duration-300 ease-in-out
          ${isMobile ? "pt-16" : "pt-0"}
          ${className}
        `}
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <PageTransition>
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </PageTransition>
      </motion.main>
    </div>
  );
}

export function ResponsiveDashboardLayout(props: ResponsiveDashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent {...props} />
    </SidebarProvider>
  );
}

// Hook for components that need to interact with the layout
export function useDashboardLayout() {
  const sidebarContext = useResponsiveSidebar();
  
  return {
    ...sidebarContext,
    // Helper to get responsive padding classes
    getResponsivePadding: (base = "p-4") => {
      const { isMobile } = sidebarContext;
      return isMobile ? "p-4" : base;
    },
    // Helper to get responsive grid classes
    getResponsiveGrid: (mobile = "grid-cols-1", desktop = "grid-cols-2") => {
      const { isMobile } = sidebarContext;
      return isMobile ? mobile : desktop;
    },
    // Helper to determine if content should be full width
    isFullWidth: () => {
      const { isMobile, sidebarOpen } = sidebarContext;
      return isMobile || !sidebarOpen;
    },
  };
}

// Responsive container component
interface ResponsiveContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

export function ResponsiveContainer({
  children,
  maxWidth = "full",
  className = "",
}: ResponsiveContainerProps) {
  const { isMobile } = useResponsiveSidebar();

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={`
        w-full mx-auto
        ${maxWidthClasses[maxWidth]}
        ${isMobile ? "px-0" : "px-4"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Responsive grid component
interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: number;
  className?: string;
}

export function ResponsiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 4,
  className = "",
}: ResponsiveGridProps) {
  const { isMobile } = useResponsiveSidebar();

  const getGridCols = () => {
    if (isMobile) return `grid-cols-${cols.mobile || 1}`;
    return `grid-cols-${cols.mobile || 1} md:grid-cols-${cols.tablet || 2} lg:grid-cols-${cols.desktop || 3}`;
  };

  return (
    <div
      className={`
        grid ${getGridCols()} gap-${gap}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Responsive card component
interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

export function ResponsiveCard({
  children,
  className = "",
  padding = "md",
  hover = false,
}: ResponsiveCardProps) {
  const { isMobile } = useResponsiveSidebar();

  const paddingClasses = {
    sm: isMobile ? "p-3" : "p-4",
    md: isMobile ? "p-4" : "p-6",
    lg: isMobile ? "p-6" : "p-8",
  };

  return (
    <motion.div
      className={`
        bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700
        ${paddingClasses[padding]}
        ${hover ? "hover:shadow-lg transition-shadow duration-200" : ""}
        ${className}
      `}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// Responsive header component
interface ResponsiveHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function ResponsiveHeader({
  title,
  subtitle,
  actions,
  className = "",
}: ResponsiveHeaderProps) {
  const { isMobile } = useResponsiveSidebar();

  return (
    <div
      className={`
        flex flex-col space-y-4 mb-6
        ${isMobile ? "text-center" : "md:flex-row md:items-center md:justify-between md:space-y-0"}
        ${className}
      `}
    >
      <div>
        <h1 className={`font-bold text-gray-900 dark:text-white ${isMobile ? "text-2xl" : "text-3xl"}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      
      {actions && (
        <div className={`flex ${isMobile ? "justify-center" : "justify-end"} space-x-2`}>
          {actions}
        </div>
      )}
    </div>
  );
}

// Responsive stats component
interface ResponsiveStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    change?: {
      value: string;
      type: "increase" | "decrease" | "neutral";
    };
    icon?: ReactNode;
  }>;
  className?: string;
}

export function ResponsiveStats({ stats, className = "" }: ResponsiveStatsProps) {
  const { isMobile } = useResponsiveSidebar();

  return (
    <ResponsiveGrid
      cols={{ mobile: 1, tablet: 2, desktop: stats.length > 3 ? 4 : stats.length }}
      className={className}
    >
      {stats.map((stat, index) => (
        <ResponsiveCard key={index} hover className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {stat.icon}
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.label}
            </span>
          </div>
          
          <div className={`font-bold text-gray-900 dark:text-white ${isMobile ? "text-2xl" : "text-3xl"}`}>
            {stat.value}
          </div>
          
          {stat.change && (
            <div
              className={`text-sm mt-1 ${
                stat.change.type === "increase"
                  ? "text-green-600"
                  : stat.change.type === "decrease"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {stat.change.value}
            </div>
          )}
        </ResponsiveCard>
      ))}
    </ResponsiveGrid>
  );
}
