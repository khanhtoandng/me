"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  FolderOpen,
  User,
  Settings,
  Inbox,
  BookOpen,
  Star,
  FileText,
  Sparkles,
  Menu,
  LogOut,
  Tags,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    name: "Project Types",
    href: "/dashboard/project-types",
    icon: Tags,
  },
  {
    name: "Experience",
    href: "/dashboard/experience",
    icon: BookOpen,
  },
  {
    name: "Education",
    href: "/dashboard/education",
    icon: BookOpen,
  },
  {
    name: "Recommendations",
    href: "/dashboard/recommendations",
    icon: Star,
  },
  {
    name: "Content",
    href: "/dashboard/content",
    icon: FileText,
  },
  {
    name: "AI Enhancement",
    href: "/dashboard/ai-enhancement",
    icon: Sparkles,
  },
  {
    name: "Inbox",
    href: "/dashboard/inbox",
    icon: Inbox,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleNavigation = (href: string) => {
    router.push(href);
    setOpen(false); // Close the sheet after navigation
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <nav className="flex-1 space-y-2 py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          <div className="border-t pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
