"use client";

import { DesktopSidebar } from "@/components/dashboard/DesktopSidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
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

  if (!isClient || !isAuthenticated) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <div className="flex min-h-screen h-screen overflow-hidden">
          <DesktopSidebar className="flex-shrink-0 h-full" />
          <div className="flex flex-col flex-1 min-w-0 h-full">
            <DashboardHeader />
            <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
            <Toaster />
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
