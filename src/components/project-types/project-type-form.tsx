"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectTypes } from "@/hooks/use-project-types";
import { useToast } from "@/hooks/use-toast";
import { IconSelector } from "@/components/project-types/icon-selector";

interface ProjectTypeFormProps {
  projectType?: any;
  onClose: () => void;
}

export function ProjectTypeForm({
  projectType,
  onClose,
}: ProjectTypeFormProps) {
  const { createProjectType, updateProjectType } = useProjectTypes();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: {
      library: "fa",
      name: "FaCode",
    },
    color: "#3B82F6",
    isActive: true,
  });

  useEffect(() => {
    if (projectType) {
      setFormData({
        name: projectType.name || "",
        description: projectType.description || "",
        icon: projectType.icon || { library: "fa", name: "FaCode" },
        color: projectType.color || "#3B82F6",
        isActive:
          projectType.isActive !== undefined ? projectType.isActive : true,
      });
    }
  }, [projectType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (projectType) {
        await updateProjectType(projectType._id, formData);
        toast({
          title: "Success",
          description: "Project type updated successfully",
        });
      } else {
        await createProjectType(formData);
        toast({
          title: "Success",
          description: "Project type created successfully",
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save project type",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleIconSelect = (library: string, iconName: string) => {
    setFormData((prev) => ({
      ...prev,
      icon: { library, name: iconName },
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {projectType ? "Edit Project Type" : "Create Project Type"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Web Application, Mobile App"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of this project type"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Icon *</Label>
            <IconSelector
              selectedLibrary={formData.icon.library}
              selectedIcon={formData.icon.name}
              onIconSelect={handleIconSelect}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-16 h-10"
              />
              <Input
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                placeholder="#3B82F6"
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[var(--link-color)] hover:bg-[var(--link-color)]/90"
            >
              {loading ? "Saving..." : projectType ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
