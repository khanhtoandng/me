import { Suspense } from "react";
import { MessagesList } from "@/components/inbox/messages-list";

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--headline)]">Inbox</h1>
      </div>

      <Suspense
        fallback={<div className="text-center py-10">Loading messages...</div>}
      >
        <MessagesList />
      </Suspense>
    </div>
  );
}
