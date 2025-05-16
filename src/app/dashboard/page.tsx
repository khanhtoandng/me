"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Settings } from "lucide-react";

const DashboardPage = () => {
  const [data, setData] = useState<any>(null); // You can replace `any` with the type you expect

  // Example of fetching some data for the dashboard (e.g., user data or stats)
  useEffect(() => {
    // This could be an API call to fetch data, like stats or user-related info
    setData({
      users: 100,
      posts: 50,
      comments: 200,
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Analytics />
      <SpeedInsights />

      <div className="flex-grow p-6">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold">Users</h2>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {data ? data.users : "Loading..."}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" icon={<Settings />}>
                Manage Users
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold">Posts</h2>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {data ? data.posts : "Loading..."}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" icon={<Settings />}>
                Manage Posts
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold">Comments</h2>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {data ? data.comments : "Loading..."}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" icon={<Settings />}>
                Manage Comments
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Dashboard Sections */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Example of recent activity, could be fetched from an API */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold">
                User John Doe commented on your post
              </h3>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold">
                New post published: "How to Build a Dashboard"
              </h3>
              <p className="text-sm text-gray-600">1 day ago</p>
            </div>
            {/* Add more recent activity here */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
