import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Archive, Trash2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Suspense } from "react"
import { MessagesList } from "@/components/inbox/messages-list"

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--headline)]">Inbox</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[var(--card-border-color)] text-[var(--paragraph)]">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button variant="outline" className="border-[var(--card-border-color)] text-[var(--paragraph)]">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--paragraph)]" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="w-full bg-[var(--input-background)] border-[var(--input-border-color)] pl-8 text-[var(--input-text)]"
          />
        </div>
        <Tabs defaultValue="all" className="w-[300px]">
          <TabsList className="bg-[var(--card-background)] text-[var(--paragraph)]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
            >
              Unread
            </TabsTrigger>
            <TabsTrigger
              value="starred"
              className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
            >
              Starred
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<div className="text-center py-10">Loading messages...</div>}>
        <MessagesList />
      </Suspense>
    </div>
  )
}
