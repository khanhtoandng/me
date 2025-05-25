"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const status = searchParams.get("status") || "all";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery);
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
      <form onSubmit={handleSearch} className="relative  w-full md:w-96">
        <Search className="absolute  hiddenh-4 w-4 text-[var(--paragraph)]" />
        <Input
          type="search"
          placeholder="Search projects..."
          className="w-full bg-[var(--input-background)] border-[var(--input-border-color)] pl-8 text-[var(--input-text)]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
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
