"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderPlus,
  FileEdit,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Settings,
  User,
  Mail,
} from "lucide-react";

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      id: 1,
      title: "Add New Project",
      description: "Create a new portfolio project",
      icon: <FolderPlus className="h-5 w-5" />,
      href: "/dashboard/projects/new",
    },
    {
      id: 2,
      title: "Update Experience",
      description: "Add or edit work experience",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/dashboard/experience",
    },
    {
      id: 3,
      title: "Manage Education",
      description: "Update educational background",
      icon: <GraduationCap className="h-5 w-5" />,
      href: "/dashboard/education",
    },
    {
      id: 4,
      title: "View Messages",
      description: "Check your inbox",
      icon: <Mail className="h-5 w-5" />,
      href: "/dashboard/inbox",
    },
    {
      id: 5,
      title: "Edit Profile",
      description: "Update your personal information",
      icon: <User className="h-5 w-5" />,
      href: "/dashboard/profile",
    },
    {
      id: 6,
      title: "Manage Recommendations",
      description: "Add or edit recommendations",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/dashboard/recommendations",
    },
    {
      id: 7,
      title: "Edit Content",
      description: "Update website content",
      icon: <FileEdit className="h-5 w-5" />,
      href: "/dashboard/content",
    },
    {
      id: 8,
      title: "Settings",
      description: "Configure dashboard settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/dashboard/settings",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto flex flex-col items-start gap-1 p-4 justify-start"
              onClick={() => router.push(action.href)}
            >
              <div className="flex items-center gap-2">
                {action.icon}
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-xs text-[var(--paragraph)]">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
