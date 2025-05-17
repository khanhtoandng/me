"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

type Activity = {
  id: string;
  type: string;
  action: string;
  title: string;
  timestamp: Date;
  icon: string;
};

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        // This is a simplified approach. In a real app, you might have a dedicated API endpoint for activity logs
        const [projectsRes, experienceRes, educationRes, messagesRes] =
          await Promise.all([
            fetch("/api/projects?status=Published"),
            fetch("/api/experiences"),
            fetch("/api/education"),
            fetch("/api/messages?read=false"),
          ]);

        const [projectsData, experienceData, educationData, messagesData] =
          await Promise.all([
            projectsRes.json(),
            experienceRes.json(),
            educationRes.json(),
            messagesRes.json(),
          ]);

        const projectActivities = projectsData.data
          .slice(0, 3)
          .map((project: any) => ({
            id: project._id,
            type: "project",
            action: "added",
            title: project.title,
            timestamp: new Date(project.createdAt),
            icon: project.title.substring(0, 2).toUpperCase(),
          }));

        const experienceActivities = experienceData.data
          .slice(0, 2)
          .map((exp: any) => ({
            id: exp._id,
            type: "experience",
            action: "updated",
            title: exp.title,
            timestamp: new Date(exp.updatedAt),
            icon: exp.company.substring(0, 2).toUpperCase(),
          }));

        const educationActivities = educationData.data
          .slice(0, 1)
          .map((edu: any) => ({
            id: edu._id,
            type: "education",
            action: "added",
            title: edu.degree,
            timestamp: new Date(edu.createdAt),
            icon: edu.institution.substring(0, 2).toUpperCase(),
          }));

        const messageActivities = messagesData.data
          .slice(0, 2)
          .map((msg: any) => ({
            id: msg._id,
            type: "message",
            action: "received",
            title: msg.subject,
            timestamp: new Date(msg.createdAt),
            icon: msg.sender.substring(0, 2).toUpperCase(),
          }));

        const allActivities = [
          ...projectActivities,
          ...experienceActivities,
          ...educationActivities,
          ...messageActivities,
        ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        setActivities(allActivities.slice(0, 5));
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentActivity();
  }, []);

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
      <CardHeader>
        <CardTitle className="text-[var(--card-headline)]">
          Recent Activity
        </CardTitle>
        <CardDescription className="text-[var(--card-paragraph)]">
          Your latest portfolio updates and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-[var(--skeleton-color)] animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-[var(--skeleton-color)] rounded animate-pulse" />
                </div>
                <div className="h-3 w-16 bg-[var(--skeleton-color)] rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                className="flex items-center gap-4"
                variants={itemVariants}
              >
                <Avatar className="h-9 w-9 bg-[var(--button2)]">
                  <AvatarFallback className="text-[var(--button-text)]">
                    {activity.icon}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-[var(--card-headline)]">
                    {activity.action.charAt(0).toUpperCase() +
                      activity.action.slice(1)}{" "}
                    {activity.type}
                  </p>
                  <p className="text-sm text-[var(--card-paragraph)]">
                    {activity.title}
                  </p>
                </div>
                <div className="text-xs text-[var(--card-paragraph)]">
                  {formatDate(activity.timestamp)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
