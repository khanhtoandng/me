import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/components/dashboard/stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Dashboard Overview
      </h1>

      <DashboardStats />

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="bg-[var(--card-background)] text-[var(--paragraph)]">
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            Recent Activity
          </TabsTrigger>
          <TabsTrigger
            value="actions"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            Quick Actions
          </TabsTrigger>
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
