"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Briefcase, GraduationCap, Inbox } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardStats() {
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    education: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, experienceRes, educationRes, messagesRes] =
          await Promise.all([
            fetch("/api/projects"),
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

        setStats({
          projects: projectsData.data.length,
          experience: experienceData.data.length,
          education: educationData.data.length,
          messages: messagesData.data.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-[var(--tertiary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.projects}
            </div>
            <p className="text-xs text-[var(--card-paragraph)]">
              Manage your portfolio projects
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experience</CardTitle>
            <Briefcase className="h-4 w-4 text-[var(--highlight)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.experience}
            </div>
            <p className="text-xs text-[var(--card-paragraph)]">
              Work positions listed
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Education</CardTitle>
            <GraduationCap className="h-4 w-4 text-[var(--button)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.education}
            </div>
            <p className="text-xs text-[var(--card-paragraph)]">
              Degrees & certifications
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <Inbox className="h-4 w-4 text-[var(--badge-background)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.messages}
            </div>
            <p className="text-xs text-[var(--card-paragraph)]">
              From contact form
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
