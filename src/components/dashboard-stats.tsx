"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Inbox,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Tag,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface StatsData {
  projects: number;
  experiences: number;
  education: number;
  messages: number;
  unreadMessages: number;
  recommendations: number;
  projectTypes: number;
  projectsByType: Array<{ name: string; count: number; color: string }>;
  contentGrowth: Array<{
    month: string;
    projects: number;
    experiences: number;
    education: number;
  }>;
  recentActivity: Array<{ date: string; count: number }>;
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    projects: 0,
    experiences: 0,
    education: 0,
    messages: 0,
    unreadMessages: 0,
    recommendations: 0,
    projectTypes: 0,
    projectsByType: [],
    contentGrowth: [],
    recentActivity: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch projects count
        const projectsRes = await fetch("/api/projects");
        const projectsData = await projectsRes.json();

        // Fetch experiences count
        const experiencesRes = await fetch("/api/experiences");
        const experiencesData = await experiencesRes.json();

        // Fetch education count
        const educationRes = await fetch("/api/education");
        const educationData = await educationRes.json();

        // Fetch messages count
        const messagesRes = await fetch("/api/messages");
        const messagesData = await messagesRes.json();

        // Fetch unread messages count
        const unreadMessagesRes = await fetch("/api/messages?read=false");
        const unreadMessagesData = await unreadMessagesRes.json();

        // Fetch recommendations count
        const recommendationsRes = await fetch("/api/recommendations");
        const recommendationsData = await recommendationsRes.json();

        // Fetch project types count
        const projectTypesRes = await fetch("/api/project-types");
        const projectTypesData = await projectTypesRes.json();

        // Generate projects by type data
        const projectsByType = projectTypesData.success
          ? projectTypesData.data.map((type: any) => {
              const projectCount = projectsData.success
                ? projectsData.data.filter(
                    (project: any) => project.projectType === type.name,
                  ).length
                : 0;
              return {
                name: type.name,
                count: projectCount,
                color: type.color || "#3B82F6",
              };
            })
          : [];

        // Generate mock content growth data (last 6 months)
        const contentGrowth = Array.from({ length: 6 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (5 - i));
          return {
            month: date.toLocaleDateString("en-US", { month: "short" }),
            projects: Math.floor(Math.random() * 5) + 1,
            experiences: Math.floor(Math.random() * 3) + 1,
            education: Math.floor(Math.random() * 2) + 1,
          };
        });

        // Generate mock recent activity data (last 7 days)
        const recentActivity = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return {
            date: date.toLocaleDateString("en-US", { weekday: "short" }),
            count: Math.floor(Math.random() * 10) + 1,
          };
        });

        setStats({
          projects: projectsData.success ? projectsData.data.length : 0,
          experiences: experiencesData.success
            ? experiencesData.data.length
            : 0,
          education: educationData.success ? educationData.data.length : 0,
          messages: messagesData.success ? messagesData.data.length : 0,
          unreadMessages: unreadMessagesData.success
            ? unreadMessagesData.data.length
            : 0,
          recommendations: recommendationsData.success
            ? recommendationsData.data.length
            : 0,
          projectTypes: projectTypesData.success
            ? projectTypesData.data.length
            : 0,
          projectsByType,
          contentGrowth,
          recentActivity,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <FileText className="h-4 w-4 text-[var(--paragraph)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.projects}
              </div>
              <p className="text-xs text-[var(--paragraph)]">
                Total portfolio projects
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <Briefcase className="h-4 w-4 text-[var(--paragraph)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.experiences}
              </div>
              <p className="text-xs text-[var(--paragraph)]">
                Work experiences
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Education</CardTitle>
              <GraduationCap className="h-4 w-4 text-[var(--paragraph)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.education}
              </div>
              <p className="text-xs text-[var(--paragraph)]">
                Educational entries
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <Inbox className="h-4 w-4 text-[var(--paragraph)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.messages}
                {stats.unreadMessages > 0 && (
                  <span className="ml-2 text-sm font-normal text-red-500">
                    ({stats.unreadMessages} unread)
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--paragraph)]">
                Contact form submissions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recommendations
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-[var(--paragraph)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.recommendations}
              </div>
              <p className="text-xs text-[var(--paragraph)]">
                Professional recommendations
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Project Types
              </CardTitle>
              <Tag className="h-4 w-4 text-[var(--paragraph)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stats.projectTypes}
              </div>
              <p className="text-xs text-[var(--paragraph)]">
                Available categories
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Projects by Type Chart */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Projects by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--link-color)]"></div>
                </div>
              ) : stats.projectsByType.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stats.projectsByType}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ name, count }) => `${name}: ${count}`}
                    >
                      {stats.projectsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-[var(--paragraph)]">
                  No project type data available
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Growth Chart */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Content Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--link-color)]"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={stats.contentGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="projects" fill="#3B82F6" name="Projects" />
                    <Bar
                      dataKey="experiences"
                      fill="#10B981"
                      name="Experience"
                    />
                    <Bar dataKey="education" fill="#F59E0B" name="Education" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity Chart */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--link-color)]"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={stats.recentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      name="Activity"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
