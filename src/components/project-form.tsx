"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface ProjectFormProps {
  project?: any;
  onSubmit: () => void;
  onCancel: () => void;
}

export function ProjectForm({
  project = null,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const addTag = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag: string) => tag !== tagToRemove));
  };

  return (
    <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
      <CardHeader>
        <CardTitle className="text-[var(--card-headline)]">
          {project ? "Edit Project" : "Add New Project"}
        </CardTitle>
        <CardDescription className="text-[var(--card-paragraph)]">
          {project
            ? "Update your project details"
            : "Fill in the details for your new project"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-[var(--card-headline)]">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Project title"
            defaultValue={project?.title || ""}
            className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-[var(--card-headline)]">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Project description"
            defaultValue={project?.description || ""}
            className="min-h-32 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image" className="text-[var(--card-headline)]">
            Image URL
          </Label>
          <Input
            id="image"
            placeholder="https://example.com/image.jpg"
            defaultValue={project?.image || ""}
            className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags" className="text-[var(--card-headline)]">
            Tags
          </Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag(e)}
              className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
            />
            <Button
              onClick={addTag}
              className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-[var(--button2)] text-[var(--button-text)] flex items-center gap-1"
              >
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-[var(--card-headline)]">
            Status
          </Label>
          <Select defaultValue={project?.status || "Draft"}>
            <SelectTrigger className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-[var(--card-border-color)] text-[var(--paragraph)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
        >
          {project ? "Update Project" : "Create Project"}
        </Button>
      </CardFooter>
    </Card>
  );
}
