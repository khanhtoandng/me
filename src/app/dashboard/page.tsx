import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentActivity } from "@/components/recent-activity";
import { QuickActions } from "@/components/quick-actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard for portfolio website",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      </div>

      <DashboardStats />

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="actions">Quick Actions</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <RecentActivity />
        </TabsContent>
        <TabsContent value="actions" className="space-y-4">
          <QuickActions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
