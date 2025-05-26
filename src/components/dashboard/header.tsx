"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Menu,
  Check,
  CheckCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "../ui/theme-toggle";

interface HeaderProps {
  toggleSidebar?: () => void;
}

export function DashboardHeader({ toggleSidebar }: HeaderProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [username, setUsername] = useState("Admin");
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  // Ensure theme component is mounted before rendering
  useEffect(() => {
    setMounted(true);

    // Fetch unread messages count
    fetchUnreadCount();

    // Fetch user profile
    fetchUserProfile();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch("/api/messages?unread=true&limit=5");
      const data = await response.json();

      if (response.ok && data.success) {
        setUnreadCount(data.data.length);
        setRecentMessages(data.data.slice(0, 5)); // Show only 5 recent messages
      }
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/messages/mark-all-read", {
        method: "POST",
      });

      if (response.ok) {
        setUnreadCount(0);
        setRecentMessages([]);
        toast.success("All notifications marked as read");
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to mark all as read");
    }
  };

  const clearAllNotifications = async () => {
    try {
      const response = await fetch("/api/messages/clear-all", {
        method: "POST",
      });

      if (response.ok) {
        setUnreadCount(0);
        setRecentMessages([]);
        toast.success("All notifications cleared");
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
      toast.error("Failed to clear notifications");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      const data = await response.json();

      if (response.ok && data.success) {
        setUsername(data.data.firstName || "Admin");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/auth/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-[var(--card-background)] px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-2">
              <DropdownMenuLabel className="p-0">
                Notifications
              </DropdownMenuLabel>
              {unreadCount > 0 && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="h-6 px-2 text-xs"
                  >
                    <CheckCheck className="h-3 w-3 mr-1" />
                    Mark All Read
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllNotifications}
                    className="h-6 px-2 text-xs text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear All
                  </Button>
                </div>
              )}
            </div>
            <DropdownMenuSeparator />

            {unreadCount > 0 ? (
              <div className="max-h-64 overflow-y-auto">
                {recentMessages.map((message, index) => (
                  <DropdownMenuItem
                    key={message._id || index}
                    asChild
                    className="cursor-pointer"
                  >
                    <Link
                      href="/dashboard/inbox"
                      className="flex flex-col items-start p-3 space-y-1"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-sm truncate">
                          {message.sender}
                        </span>
                        <span className="text-xs text-[var(--paragraph)]">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="text-sm text-[var(--paragraph)] truncate w-full">
                        {message.subject}
                      </span>
                      <span className="text-xs text-[var(--paragraph)] line-clamp-2">
                        {message.message}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/inbox"
                    className="text-center w-full text-[var(--link-color)]"
                  >
                    View All Messages
                  </Link>
                </DropdownMenuItem>
              </div>
            ) : (
              <div className="p-4 text-center">
                <Bell className="h-8 w-8 mx-auto text-[var(--paragraph)] mb-2" />
                <p className="text-sm text-[var(--paragraph)]">
                  No new notifications
                </p>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-row-reverse" asChild>
            <Button variant="ghost" className="relative h-8 w-8  rounded-full">
              <Avatar className="h-8 w-8 bg-[var(--card-background)] border-2 border-[var(--border)]">
                <AvatarImage src="/placeholder-user.jpg" alt={username} />
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
