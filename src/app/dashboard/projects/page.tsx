"use clinet";

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsList } from "@/components/projects/projects-list";
import { ProjectsFilter } from "@/components/projects/projects-filter";

export default function ProjectsPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--headline)]">
            Projects
          </h1>
          <Link href="/dashboard/projects/new">
            <Button
              className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </Link>
        </div>

        <ProjectsFilter />

        <Suspense
          fallback={
            <div className="text-center py-10">Loading projects...</div>
          }
        >
          <ProjectsList />
        </Suspense>
      </div>
    </>
  );
}
