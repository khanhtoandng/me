"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  sidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);

      // Auto-close sidebar on mobile when switching to mobile view
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }

      // Auto-open sidebar on desktop when switching from mobile
      if (!mobile && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [sidebarOpen]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMobile || !sidebarOpen) return;

      const sidebar = document.getElementById("dashboard-sidebar");
      const target = event.target as Node;

      if (sidebar && !sidebar.contains(target)) {
        setSidebarOpen(false);
      }
    };

    if (isMobile && sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile, sidebarOpen]);

  // Handle escape key to close sidebar on mobile
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (isMobile && sidebarOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMobile, sidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const value: SidebarContextType = {
    sidebarOpen,
    isMobile,
    toggleSidebar,
    setSidebarOpen,
    closeSidebar,
    openSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Hook for responsive behavior
export function useResponsiveSidebar() {
  const { sidebarOpen, isMobile, toggleSidebar, closeSidebar } = useSidebar();

  return {
    sidebarOpen,
    isMobile,
    toggleSidebar,
    closeSidebar,
    // Helper to determine if sidebar should show overlay
    showOverlay: isMobile && sidebarOpen,
    // Helper to determine sidebar classes
    sidebarClasses: `
      fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      ${isMobile ? "shadow-xl" : ""}
    `,
    // Helper to determine main content classes
    mainContentClasses: `
      transition-all duration-300 ease-in-out
      ${!isMobile && sidebarOpen ? "ml-64" : "ml-0"}
    `,
    // Helper to determine if mobile menu button should be shown
    showMobileMenuButton: isMobile,
  };
}
