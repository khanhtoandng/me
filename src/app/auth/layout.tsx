"use client";

import "../globals.css";

import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// SEO Keywords
const keywords = [
  "Baraa Alshaer",
  "Authentication",
  "Login",
  "Sign Up",
  "Secure Login",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthProvider>
          <Toaster />
          <div className="w-full flex flex-1 items-center justify-center px-4">
            <Link href={"/"} className="absolute left-3 top-3 icon">
              <ArrowLeft />
            </Link>

            {children}
          </div>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}
