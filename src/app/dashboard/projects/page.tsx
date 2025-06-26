"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsList } from "@/components/projects/projects-list";
import { UnifiedSearch } from "@/components/ui/unified-search";
import { useActiveProjectTypes } from "@/hooks/use-project-types";
import { useProjects } from "@/hooks/use-projects";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortOption, setSortOption] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { projectTypes } = useActiveProjectTypes();
  const { projects, loading } = useProjects();

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

  const sortOptions = [
    { key: "createdAt", label: "Date Created", direction: sortDirection },
    { key: "title", label: "Title", direction: sortDirection },
    { key: "featured", label: "Featured", direction: sortDirection },
    { key: "projectType", label: "Project Type", direction: sortDirection },
  ];

  const handleSortChange = (sortKey: string, direction: "asc" | "desc") => {
    setSortOption(sortKey);
    setSortDirection(direction);
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchLower),
          );
        if (!matchesSearch) return false;
      }

      // Other filters
      for (const [key, value] of Object.entries(filters)) {
        if (!value) continue;

        switch (key) {
          case "projectType":
            if (project.projectType !== value) return false;
            break;
          case "featured":
            if (project.featured.toString() !== value) return false;
            break;
          case "technologies":
            if (Array.isArray(value)) {
              const hasAllTechs = value.every((tech) =>
                project.technologies.includes(tech),
              );
              if (!hasAllTechs) return false;
            }
            break;
        }
      }

      return true;
    })
    .sort((a, b) => {
      let aValue: any = a[sortOption as keyof typeof a];
      let bValue: any = b[sortOption as keyof typeof b];

      if (sortOption === "createdAt") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

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

      <UnifiedSearch
        placeholder="Search projects by title, description, or technology..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={projectFilters}
        activeFilters={filters}
        onFiltersChange={setFilters}
        sortOptions={sortOptions}
        activeSortOption={sortOption}
        onSortChange={handleSortChange}
        resultCount={filteredProjects.length}
        isLoading={loading}
        className="w-full"
      />

      <ProjectsList
        projects={filteredProjects}
        searchQuery={searchQuery}
        filters={filters}
        isLoading={loading}
      />
    </div>
  );
}
