"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Briefcase,
  GraduationCap,
  MessageSquare,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      label: "Add Project",
      icon: FolderKanban,
      color: "text-[var(--tertiary)]",
      href: "/dashboard/projects/new",
    },
    {
      label: "Add Experience",
      icon: Briefcase,
      color: "text-[var(--highlight)]",
      href: "/dashboard/experience/new",
    },
    {
      label: "Add Education",
      icon: GraduationCap,
      color: "text-[var(--button)]",
      href: "/dashboard/education/new",
    },
    {
      label: "Add Recommendation",
      icon: MessageSquare,
      color: "text-[var(--badge-background)]",
      href: "/dashboard/recommendations/new",
    },
    {
      label: "Update Profile",
      icon: User,
      color: "text-[var(--paragraph)]",
      href: "/dashboard/profile",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
      <CardHeader>
        <CardTitle className="text-[var(--card-headline)]">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-[var(--card-paragraph)]">
          Shortcuts to common tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actions.map((action) => (
            <motion.div key={action.label} variants={itemVariants}>
              <Button
                variant="outline"
                className="flex h-24 w-full flex-col items-center justify-center gap-1 bg-[var(--card-background-effect)] border-[var(--card-border-color)] text-[var(--card-headline)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
                onClick={() => router.push(action.href)}
              >
                <action.icon className={`h-5 w-5 ${action.color}`} />
                <span>{action.label}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
