// components/website/ProjectTypeSelect.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProjectTypeSelectProps = {
  onSelect: (value: string) => void;
};

export default function ProjectTypeSelect({
  onSelect,
}: ProjectTypeSelectProps) {
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    onSelect(selectedType);
  }, [selectedType, onSelect]);

  return (
    <Select value={selectedType} onValueChange={setSelectedType}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Projects</SelectItem>
        <SelectItem value="fullstack">Full Stack</SelectItem>
        <SelectItem value="frontend">Frontend</SelectItem>
        <SelectItem value="backend">Backend</SelectItem>
        <SelectItem value="mobile">Mobile Apps</SelectItem>
        <SelectItem value="opensource">Open Source</SelectItem>
        <SelectItem value="devops">DevOps</SelectItem>
        <SelectItem value="ai">AI / ML</SelectItem>
        <SelectItem value="others">Others</SelectItem>
      </SelectContent>
    </Select>
  );
}
