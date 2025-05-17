import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, Briefcase, GraduationCap, Inbox } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <FolderKanban className="h-4 w-4 text-[var(--tertiary)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-[var(--card-paragraph)]">+2 added this month</p>
        </CardContent>
      </Card>
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Experience</CardTitle>
          <Briefcase className="h-4 w-4 text-[var(--highlight)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-[var(--card-paragraph)]">Positions listed</p>
        </CardContent>
      </Card>
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Education</CardTitle>
          <GraduationCap className="h-4 w-4 text-[var(--button)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-[var(--card-paragraph)]">Degrees & certifications</p>
        </CardContent>
      </Card>
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          <Inbox className="h-4 w-4 text-[var(--badge-background)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-[var(--card-paragraph)]">From contact form</p>
        </CardContent>
      </Card>
    </div>
  )
}
