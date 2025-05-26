"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsList } from "@/components/projects/projects-list";
import { SearchBar } from "@/components/ui/search-bar";
import { useActiveProjectTypes } from "@/hooks/use-project-types";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { projectTypes } = useActiveProjectTypes();

  const projectFilters = [
    {
      key: "projectType",
      label: "Project Type",
      type: "select" as const,
      options: projectTypes.map((type) => ({
        value: type.name,
        label: type.name,
      })),
    },
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "Draft", label: "Draft" },
        { value: "Published", label: "Published" },
        { value: "Archived", label: "Archived" },
      ],
    },
    {
      key: "featured",
      label: "Featured",
      type: "select" as const,
      options: [
        { value: "true", label: "Featured" },
        { value: "false", label: "Not Featured" },
      ],
    },
    {
      key: "technologies",
      label: "Technologies",
      type: "multiselect" as const,
      options: [
        { value: "React", label: "React" },
        { value: "Next.js", label: "Next.js" },
        { value: "TypeScript", label: "TypeScript" },
        { value: "Node.js", label: "Node.js" },
        { value: "Python", label: "Python" },
        { value: "MongoDB", label: "MongoDB" },
        { value: "PostgreSQL", label: "PostgreSQL" },
        { value: "Docker", label: "Docker" },
        { value: "AWS", label: "AWS" },
        { value: "Vercel", label: "Vercel" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--headline)]">
            Projects
          </h1>
          <p className="text-[var(--paragraph)] mt-1">
            Manage your portfolio projects and showcase your work
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      <SearchBar
        placeholder="Search projects by title, description, or technology..."
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
        filters={projectFilters}
        className="w-full"
      />

      <ProjectsList searchQuery={searchQuery} filters={filters} />
    </div>
  );
}
