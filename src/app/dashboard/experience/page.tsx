import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExperienceList } from "@/components/experience/experience-list";

export default function ExperiencePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--headline)]">
          Experience
        </h1>
        <Link href="/dashboard/experience/new">
          <Button
            icon={<Plus className="mr-2 h-4 w-4" />}
            className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
          >
            Add Experience
          </Button>
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="text-center py-10">Loading experience entries...</div>
        }
      >
        <ExperienceList />
      </Suspense>
    </div>
  );
}
