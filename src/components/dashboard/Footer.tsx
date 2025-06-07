"use client";

import { Heart, Code, Coffee } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--card-border-color)] bg-[var(--card-background)] py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-[var(--paragraph)]">
            <span>© {currentYear} Baraa Alshaer. All Rights Reserved</span>
            <Separator orientation="vertical" className="hidden md:block h-4" />
            <div className="flex items-center gap-1 text-xs">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" />
              <span>and</span>
              <Coffee className="h-3 w-3 text-amber-600" />
              <span>for better portfolio management</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center gap-2 text-xs text-[var(--paragraph)]/70">
            <Code className="h-3 w-3" />
            <span>Dashboard v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
