"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "@/components/charts";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: [] as any[],
    visitors: [] as any[],
    referrers: [] as any[],
    browsers: [] as any[],
    devices: [] as any[],
    countries: [] as any[],
  });

  useEffect(() => {
    // In a real application, you would fetch this data from an analytics API
    // For this example, we'll generate mock data
    const fetchAnalytics = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate dates for the selected period
      const dates = generateDates(period);

      // Generate mock data
      const pageViews = dates.map((date) => ({
        date,
        value: Math.floor(Math.random() * 500) + 100,
      }));

      const visitors = dates.map((date) => ({
        date,
        value: Math.floor(Math.random() * 200) + 50,
      }));

      const referrers = [
        { name: "Google", value: Math.floor(Math.random() * 500) + 200 },
        { name: "Direct", value: Math.floor(Math.random() * 300) + 150 },
        { name: "Twitter", value: Math.floor(Math.random() * 200) + 50 },
        { name: "LinkedIn", value: Math.floor(Math.random() * 150) + 30 },
        { name: "GitHub", value: Math.floor(Math.random() * 100) + 20 },
      ];

      const browsers = [
        { name: "Chrome", value: Math.floor(Math.random() * 60) + 30 },
        { name: "Firefox", value: Math.floor(Math.random() * 20) + 10 },
        { name: "Safari", value: Math.floor(Math.random() * 20) + 10 },
        { name: "Edge", value: Math.floor(Math.random() * 10) + 5 },
        { name: "Other", value: Math.floor(Math.random() * 5) + 1 },
      ];

      const devices = [
        { name: "Desktop", value: Math.floor(Math.random() * 60) + 30 },
        { name: "Mobile", value: Math.floor(Math.random() * 40) + 20 },
        { name: "Tablet", value: Math.floor(Math.random() * 10) + 5 },
      ];

      const countries = [
        { name: "United States", value: Math.floor(Math.random() * 300) + 150 },
        { name: "United Kingdom", value: Math.floor(Math.random() * 150) + 50 },
        { name: "Germany", value: Math.floor(Math.random() * 100) + 30 },
        { name: "Canada", value: Math.floor(Math.random() * 80) + 20 },
        { name: "France", value: Math.floor(Math.random() * 70) + 15 },
        { name: "Australia", value: Math.floor(Math.random() * 60) + 10 },
        { name: "Other", value: Math.floor(Math.random() * 100) + 50 },
      ];

      setAnalyticsData({
        pageViews,
        visitors,
        referrers,
        browsers,
        devices,
        countries,
      });

      setLoading(false);
    };

    fetchAnalytics();
  }, [period]);

  // Helper function to generate dates for the selected period
  const generateDates = (period: string) => {
    const dates = [];
    const today = new Date();
    let days = 7;

    switch (period) {
      case "7d":
        days = 7;
        break;
      case "30d":
        days = 30;
        break;
      case "90d":
        days = 90;
        break;
      default:
        days = 7;
    }

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }

    return dates;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-[var(--paragraph)]">
            View statistics about your portfolio website
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Page Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading
                ? "..."
                : analyticsData.pageViews
                    .reduce((sum, item) => sum + item.value, 0)
                    .toLocaleString()}
            </div>
            <p className="text-xs text-[var(--paragraph)]">
              +{Math.floor(Math.random() * 20) + 5}% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading
                ? "..."
                : analyticsData.visitors
                    .reduce((sum, item) => sum + item.value, 0)
                    .toLocaleString()}
            </div>
            <p className="text-xs text-[var(--paragraph)]">
              +{Math.floor(Math.random() * 15) + 3}% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Session Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading
                ? "..."
                : `${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 50) + 10}s`}
            </div>
            <p className="text-xs text-[var(--paragraph)]">
              {Math.random() > 0.5 ? "+" : "-"}
              {Math.floor(Math.random() * 10) + 1}% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : `${Math.floor(Math.random() * 30) + 30}%`}
            </div>
            <p className="text-xs text-[var(--paragraph)]">
              {Math.random() > 0.5 ? "+" : "-"}
              {Math.floor(Math.random() * 8) + 1}% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>
                  Daily page views for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <p>Loading chart data...</p>
                  </div>
                ) : (
                  <LineChart
                    data={analyticsData.pageViews}
                    xField="date"
                    yField="value"
                    category="Page Views"
                  />
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Visitors</CardTitle>
                <CardDescription>
                  Daily unique visitors for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <p>Loading chart data...</p>
                  </div>
                ) : (
                  <BarChart
                    data={analyticsData.visitors}
                    xField="date"
                    yField="value"
                    category="Visitors"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Countries</CardTitle>
                <CardDescription>Visitors by country</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <p>Loading chart data...</p>
                  </div>
                ) : (
                  <BarChart
                    data={analyticsData.countries}
                    xField="name"
                    yField="value"
                    category="Visitors"
                    horizontal
                  />
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Devices</CardTitle>
                <CardDescription>Visitors by device type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <p>Loading chart data...</p>
                  </div>
                ) : (
                  <PieChart
                    data={analyticsData.devices}
                    nameField="name"
                    valueField="value"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Browsers</CardTitle>
              <CardDescription>Visitors by browser</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <PieChart
                  data={analyticsData.browsers}
                  nameField="name"
                  valueField="value"
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acquisition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Referrers</CardTitle>
              <CardDescription>Top referral sources</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <BarChart
                  data={analyticsData.referrers}
                  xField="name"
                  yField="value"
                  category="Visitors"
                  horizontal
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
