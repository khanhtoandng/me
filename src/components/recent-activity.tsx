"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Mail,
  MessageSquare,
  Plus,
  Edit,
  Trash,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  type: "project" | "message" | "recommendation" | "experience" | "education";
  action: "created" | "updated" | "deleted" | "received" | "starred";
  title: string;
  timestamp: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        // In a real application, you would fetch this from an API
        // For this example, we'll use mock data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockActivities: Activity[] = [
          {
            id: "1",
            type: "project",
            action: "created",
            title: "Portfolio Website Redesign",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          },
          {
            id: "2",
            type: "message",
            action: "received",
            title: "New client inquiry",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          },
          {
            id: "3",
            type: "project",
            action: "updated",
            title: "E-commerce Dashboard",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
          },
          {
            id: "4",
            type: "recommendation",
            action: "received",
            title: "New recommendation from Sarah Johnson",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          },
          {
            id: "5",
            type: "message",
            action: "starred",
            title: "Collaboration opportunity",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 2,
            ).toISOString(), // 2 days ago
          },
          {
            id: "6",
            type: "experience",
            action: "updated",
            title: "Senior Developer position",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 3,
            ).toISOString(), // 3 days ago
          },
          {
            id: "7",
            type: "education",
            action: "created",
            title: "Advanced React Certification",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 5,
            ).toISOString(), // 5 days ago
          },
          {
            id: "8",
            type: "project",
            action: "deleted",
            title: "Outdated Project",
            timestamp: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 7,
            ).toISOString(), // 7 days ago
          },
        ];

        setActivities(mockActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  // Format timestamp to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return "just now";
    } else if (diffMin < 60) {
      return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`;
    } else if (diffDay < 30) {
      return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get icon based on activity type and action
  const getActivityIcon = (type: string, action: string) => {
    if (type === "project") {
      if (action === "created") return <Plus className="h-4 w-4" />;
      if (action === "updated") return <Edit className="h-4 w-4" />;
      if (action === "deleted") return <Trash className="h-4 w-4" />;
      return <FileText className="h-4 w-4" />;
    } else if (type === "message") {
      if (action === "starred")
        return <Star className="h-4 w-4 text-yellow-500" />;
      return <Mail className="h-4 w-4" />;
    } else if (type === "recommendation") {
      return <MessageSquare className="h-4 w-4" />;
    } else {
      return <Edit className="h-4 w-4" />;
    }
  };

  // Get badge color based on activity type
  const getBadgeVariant = (
    type: string,
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "project":
        return "default";
      case "message":
        return "secondary";
      case "recommendation":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest updates and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[350px]">
            <p>Loading activities...</p>
          </div>
        ) : (
          <ScrollArea className="h-[350px]">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start rounded-[12px] gap-4  border px-3 py-4"
                >
                  {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {getActivityIcon(activity.type, activity.action)}
                  </div> */}
                  <div className="flex-1 space-y-1 ">
                    <div className="flex items-center gap-2 justify-between ">
                      <Badge variant={getBadgeVariant(activity.type)}>
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-[var(--paragraph)]">
                        {formatRelativeTime(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-none pt-4">
                      {activity.title}
                    </p>
                    <p className="text-xs text-[var(--paragraph)]">
                      {activity.action === "created" && "Added a new item"}
                      {activity.action === "updated" &&
                        "Updated an existing item"}
                      {activity.action === "deleted" && "Removed an item"}
                      {activity.action === "received" && "Received a new item"}
                      {activity.action === "starred" && "Marked as important"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
