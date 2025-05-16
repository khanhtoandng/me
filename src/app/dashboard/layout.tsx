// src/app/dashboard/layout.tsx
import { ReactNode } from "react";

import { domain, websitePath } from "@/data/Links";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Footer from "@/components/dashboard/Footer";

// Remove the "use client" directive and keep the metadata export
export const metadata = {
  metadataBase: new URL(`https://${domain}`),
  title: {
    template: "Dashboard - %s",
    default: "Dashboard - Admin Panel",
  },
  description:
    "Admin Dashboard for managing users, posts, and comments with a focus on performance and security.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Admin Dashboard",
    description: "Admin Dashboard for managing users, posts, and comments.",
    url: websitePath.main,
    siteName: "Admin Dashboard",
  },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Add preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Analytics />
        <SpeedInsights />

        {/* Sidebar and main content layout */}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 p-6 bg-gray-50">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
