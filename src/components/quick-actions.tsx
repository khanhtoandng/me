import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderKanban, Briefcase, GraduationCap, MessageSquare, User } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
      <CardHeader>
        <CardTitle className="text-[var(--card-headline)]">Quick Actions</CardTitle>
        <CardDescription className="text-[var(--card-paragraph)]">Shortcuts to common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <Button
            variant="outline"
            className="flex h-24 flex-col items-center justify-center gap-1 bg-[var(--card-background-effect)] border-[var(--card-border-color)] text-[var(--card-headline)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
          >
            <FolderKanban className="h-5 w-5 text-[var(--tertiary)]" />
            <span>Add Project</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-24 flex-col items-center justify-center gap-1 bg-[var(--card-background-effect)] border-[var(--card-border-color)] text-[var(--card-headline)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
          >
            <Briefcase className="h-5 w-5 text-[var(--highlight)]" />
            <span>Add Experience</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-24 flex-col items-center justify-center gap-1 bg-[var(--card-background-effect)] border-[var(--card-border-color)] text-[var(--card-headline)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
          >
            <GraduationCap className="h-5 w-5 text-[var(--button)]" />
            <span>Add Education</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-24 flex-col items-center justify-center gap-1 bg-[var(--card-background-effect)] border-[var(--card-border-color)] text-[var(--card-headline)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
          >
            <MessageSquare className="h-5 w-5 text-[var(--badge-background)]" />
            <span>Add Recommendation</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-24 flex-col items-center justify-center gap-1 bg-[var(--card-background-effect)] border-[var(--card-border-color)] text-[var(--card-headline)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
          >
            <User className="h-5 w-5 text-[var(--paragraph)]" />
            <span>Update Profile</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
