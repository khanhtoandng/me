import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EducationList } from "@/components/education/education-list";

export default function EducationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--headline)]">Education</h1>
        <Link href="/dashboard/education/new">
          <Button className="bg-[var(--button)]  text-[var(--button-text)] hover:bg-[var(--button2)]">
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="text-center py-10">Loading education entries...</div>
        }
      >
        <EducationList />
      </Suspense>
    </div>
  );
}
