"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import LoadingPage from "../loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Always open on desktop
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (typeof window !== "undefined") {
      const hasAuthToken = document.cookie.includes("auth-token=");
      const hasClientToken = document.cookie.includes("client-auth-token=");

      if (!hasAuthToken && !hasClientToken) {
        router.replace("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!isClient) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div className="w-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen">
              <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                isMobile={isMobile}
              />
              <div className="flex-1 flex flex-col">
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <div className="flex-1 p-6 max-h-screen overflow-auto overflow-y-scroll">
                  {children}
                </div>
                <Toaster />
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}
