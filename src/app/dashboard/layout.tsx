"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { DesktopSidebar } from "@/components/dashboard/DesktopSidebar";
import LoadingPage from "../loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Authentication check
    if (typeof window !== "undefined") {
      const hasAuthToken = document.cookie.includes("auth-token=");
      const hasClientToken = document.cookie.includes("client-auth-token=");

      if (!hasAuthToken && !hasClientToken) {
        router.replace("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

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
              <DesktopSidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />
                <div className="flex-1 p-4 sm:p-6 max-h-screen overflow-auto">
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
