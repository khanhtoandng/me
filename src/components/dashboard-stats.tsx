"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  FileText,
  Inbox,
  Users,
  Eye,
  ArrowUp,
  ArrowDown,
  Briefcase,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

interface StatsData {
  projects: number;
  experiences: number;
  education: number;
  messages: number;
  unreadMessages: number;
  recommendations: number;
  visitors: {
    count: number;
    trend: number;
  };
  pageViews: {
    count: number;
    trend: number;
  };
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    projects: 0,
    experiences: 0,
    education: 0,
    messages: 0,
    unreadMessages: 0,
    recommendations: 0,
    visitors: {
      count: 0,
      trend: 0,
    },
    pageViews: {
      count: 0,
      trend: 0,
    },
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

        // In a real application, you would fetch analytics data from a service
        // For this example, we'll use mock data
        const visitorsCount = Math.floor(Math.random() * 1000) + 100;
        const visitorsTrend = Math.floor(Math.random() * 20) - 10;

        const pageViewsCount = Math.floor(Math.random() * 5000) + 500;
        const pageViewsTrend = Math.floor(Math.random() * 20) - 5;

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
          visitors: {
            count: visitorsCount,
            trend: visitorsTrend,
          },
          pageViews: {
            count: pageViewsCount,
            trend: pageViewsTrend,
          },
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Experience</CardTitle>
          <Briefcase className="h-4 w-4 text-[var(--paragraph)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : stats.experiences}
          </div>
          <p className="text-xs text-[var(--paragraph)]">Work experiences</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Education</CardTitle>
          <GraduationCap className="h-4 w-4 text-[var(--paragraph)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : stats.education}
          </div>
          <p className="text-xs text-[var(--paragraph)]">Educational entries</p>
        </CardContent>
      </Card>

      <Card>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          <Users className="h-4 w-4 text-[var(--paragraph)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : stats.visitors.count.toLocaleString()}
          </div>
          <p className="text-xs text-[var(--paragraph)] flex items-center">
            {stats.visitors.trend > 0 ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span>{Math.abs(stats.visitors.trend)}% from last month</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          <Eye className="h-4 w-4 text-[var(--paragraph)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : stats.pageViews.count.toLocaleString()}
          </div>
          <p className="text-xs text-[var(--paragraph)] flex items-center">
            {stats.pageViews.trend > 0 ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span>{Math.abs(stats.pageViews.trend)}% from last month</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Analytics</CardTitle>
          <BarChart3 className="h-4 w-4 text-[var(--paragraph)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">View Details</div>
          <p className="text-xs text-[var(--paragraph)]">
            Click to see detailed analytics
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
