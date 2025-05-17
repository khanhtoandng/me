import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "project",
      action: "added",
      title: "E-commerce Dashboard",
      timestamp: "2 hours ago",
      icon: "ED",
    },
    {
      id: 2,
      type: "experience",
      action: "updated",
      title: "Senior Developer at Tech Co",
      timestamp: "1 day ago",
      icon: "TC",
    },
    {
      id: 3,
      type: "message",
      action: "received",
      title: "Collaboration opportunity",
      timestamp: "2 days ago",
      icon: "CO",
    },
    {
      id: 4,
      type: "recommendation",
      action: "added",
      title: "Recommendation from Jane Smith",
      timestamp: "3 days ago",
      icon: "JS",
    },
    {
      id: 5,
      type: "education",
      action: "updated",
      title: "Master's Degree in Computer Science",
      timestamp: "1 week ago",
      icon: "CS",
    },
  ]

  return (
    <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
      <CardHeader>
        <CardTitle className="text-[var(--card-headline)]">Recent Activity</CardTitle>
        <CardDescription className="text-[var(--card-paragraph)]">
          Your latest portfolio updates and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9 bg-[var(--button2)]">
                <AvatarFallback className="text-[var(--button-text)]">{activity.icon}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-[var(--card-headline)]">
                  {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} {activity.type}
                </p>
                <p className="text-sm text-[var(--card-paragraph)]">{activity.title}</p>
              </div>
              <div className="text-xs text-[var(--card-paragraph)]">{activity.timestamp}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
