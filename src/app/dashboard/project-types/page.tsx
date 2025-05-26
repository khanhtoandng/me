"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Tag } from "lucide-react";
import { useProjectTypes } from "@/hooks/use-project-types";
import { ProjectTypeForm } from "@/components/project-types/project-type-form";
import { useToast } from "@/hooks/use-toast";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const iconLibraries = {
  fa: FaIcons,
  ai: AiIcons,
  bi: BiIcons,
  bs: BsIcons,
  fi: FiIcons,
  hi: HiIcons,
  io: IoIcons,
  md: MdIcons,
  ri: RiIcons,
  si: SiIcons,
  ti: TiIcons,
};

export default function ProjectTypesPage() {
  const { projectTypes, loading, error, deleteProjectType } = useProjectTypes();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingType, setEditingType] = useState(null);

  const renderIcon = (icon: { library: string; name: string }, color: string = "#3B82F6") => {
    const library = iconLibraries[icon.library as keyof typeof iconLibraries];
    if (!library) return null;

    const IconComponent = library[icon.name as keyof typeof library];
    if (!IconComponent) return null;

    const Icon = IconComponent as React.ComponentType<{ size?: number; color?: string }>;
    return <Icon size={20} color={color} />;
  };

  const handleEdit = (projectType: any) => {
    setEditingType(projectType);
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await deleteProjectType(id);
        toast({
          title: "Success",
          description: "Project type deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete project type",
          variant: "destructive",
        });
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingType(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[var(--headline)]">Project Types</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[var(--headline)]">Project Types</h1>
        <div className="text-center py-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[var(--headline)]">Project Types</h1>
          <p className="text-[var(--paragraph)] mt-1">
            Manage project categories and their visual representations
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[var(--link-color)] hover:bg-[var(--link-color)]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project Type
        </Button>
      </div>

      {projectTypes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Tag className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-[var(--headline)] mb-2">
              No project types yet
            </h3>
            <p className="text-[var(--paragraph)] text-center mb-4">
              Create your first project type to categorize your projects
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[var(--link-color)] hover:bg-[var(--link-color)]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project Type
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectTypes.map((projectType) => (
            <Card key={projectType._id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${projectType.color}20` }}
                    >
                      {renderIcon(projectType.icon, projectType.color)}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[var(--headline)]">
                        {projectType.name}
                      </CardTitle>
                      <Badge variant={projectType.isActive ? "default" : "secondary"}>
                        {projectType.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(projectType)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(projectType._id, projectType.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {projectType.description && (
                <CardContent className="pt-0">
                  <p className="text-sm text-[var(--paragraph)]">
                    {projectType.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {showForm && (
        <ProjectTypeForm
          projectType={editingType}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
