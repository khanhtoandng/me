"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnifiedSearchInput } from "@/components/ui/unified-search-input";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function ProjectsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const status = searchParams.get("status") || "all";

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(`/dashboard/projects?${params.toString()}`);
  };

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    router.push(`/dashboard/projects?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:w-96">
        <UnifiedSearchInput
          placeholder="Search projects..."
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          className="w-full"
          showSearchButton={true}
        />
      </div>
      <div className="flex items-center gap-2 w-full justify-end">
        <Button
          variant="outline"
          size="sm"
          className="border-[var(--card-border-color)] text-[var(--paragraph)]"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Tabs
          defaultValue={status}
          onValueChange={handleStatusChange}
          className="w-max flex  justify-end items-center"
        >
          <TabsList className="bg-[var(--card-background)] text-[var(--paragraph)]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="Published"
              className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
            >
              Published
            </TabsTrigger>
            <TabsTrigger
              value="Draft"
              className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
            >
              Drafts
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
