"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Calendar,
  Users,
  FolderOpen,
  Star,
  Github,
  Globe,
  Play,
  AlertTriangle,
  Loader2,
  Shield,
  Trash,
  Eye,
  EyeOff,
} from "lucide-react";
import { EnhancedProjectForm } from "./enhanced-project-form";
import { formatDate, getDuration } from "@/lib/utils";
import { PROJECT_CONFIG, SECURITY_CONFIG } from "@/lib/constants";

interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  images: string[];
  technologies: string[];
  status: string;
  featured: boolean;
  githubUrl?: string;
  websiteUrl?: string;
  videoUrl?: string;
  startDate?: string;
  endDate?: string;
  client?: string;
  teamSize?: number;
  role?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  order?: number;
}

interface EnhancedProjectsDashboardProps {
  projects: Project[];
  onUpdate: (projects: Project[]) => Promise<void>;
  isLoading?: boolean;
}

export function EnhancedProjectsDashboard({
  projects: initialProjects,
  onUpdate,
  isLoading = false,
}: EnhancedProjectsDashboardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Update local state when prop changes
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleReorder = async (newOrder: Project[]) => {
    // Update order property for each project
    const reorderedProjects = newOrder.map((project, index) => ({
      ...project,
      order: index,
    }));

    setProjects(reorderedProjects);

    try {
      await onUpdate(reorderedProjects);
      toast.success("Project order updated successfully!");
    } catch (error) {
      toast.error("Failed to update order");
      // Revert on error
      setProjects(initialProjects);
    }
  };

  const moveProject = async (index: number, direction: "up" | "down") => {
    const newProjects = [...projects];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newProjects.length) return;

    // Swap projects
    [newProjects[index], newProjects[targetIndex]] = [
      newProjects[targetIndex],
      newProjects[index],
    ];

    await handleReorder(newProjects);
  };

  const handleAddProject = () => {
    setEditingProject(undefined);
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const updatedProjects = projects.filter((proj) => proj._id !== projectId);
      await onUpdate(updatedProjects);
      setProjects(updatedProjects);
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleToggleFeatured = async (projectId: string) => {
    try {
      const updatedProjects = projects.map((proj) =>
        proj._id === projectId ? { ...proj, featured: !proj.featured } : proj
      );
      await onUpdate(updatedProjects);
      setProjects(updatedProjects);
      toast.success("Project featured status updated!");
    } catch (error) {
      toast.error("Failed to update featured status");
    }
  };

  const handleFormSubmit = async (
    formData: Omit<Project, "_id"> & { _id?: string }
  ) => {
    setFormLoading(true);

    try {
      let updatedProjects: Project[];

      if (editingProject) {
        // Update existing project
        updatedProjects = projects.map((proj) =>
          proj._id === editingProject._id
            ? { ...formData, _id: editingProject._id }
            : proj
        );
      } else {
        // Add new project
        const newProject: Project = {
          ...formData,
          _id: Date.now().toString(), // Temporary ID
          order: projects.length,
        };
        updatedProjects = [...projects, newProject];
      }

      await onUpdate(updatedProjects);
      setProjects(updatedProjects);
      setShowForm(false);
      setEditingProject(undefined);
    } catch (error) {
      toast.error("Failed to save project");
    } finally {
      setFormLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (otpCode !== SECURITY_CONFIG.otpCode) {
      toast.error("Invalid OTP code");
      return;
    }

    setBulkDeleting(true);

    try {
      await onUpdate([]);
      setProjects([]);
      setShowBulkDelete(false);
      setOtpCode("");
      toast.success("All projects deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete projects");
    } finally {
      setBulkDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusConfig = PROJECT_CONFIG.statuses.find(
      (s) => s.value === status
    );
    return statusConfig?.color || "gray";
  };

  const getTypeLabel = (type: string) => {
    const typeConfig = PROJECT_CONFIG.types.find((t) => t.value === type);
    return typeConfig?.label || type;
  };

  if (showForm) {
    return (
      <EnhancedProjectForm
        project={editingProject}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setShowForm(false);
          setEditingProject(undefined);
        }}
        isLoading={formLoading}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projects Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your projects with AI-powered enhancements and drag & drop
              ordering
            </p>
          </div>

          <div className="flex gap-2">
            {projects.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setShowBulkDelete(true)}
                className="flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                Delete All
              </Button>
            )}
            <Button
              onClick={handleAddProject}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>

        {/* Projects Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.length}
                  </p>
                </div>
                <FolderOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Featured
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.filter((p) => p.featured).length}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Published
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.filter((p) => p.status === "published").length}
                  </p>
                </div>
                <Globe className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.filter((p) => p.status === "in-progress").length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Projects Added
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start building your portfolio by adding your first project.
              </p>
              <Button onClick={handleAddProject}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Reorder.Group
            axis="y"
            values={projects}
            onReorder={handleReorder}
            className="space-y-4"
          >
            <AnimatePresence>
              {projects.map((project, index) => (
                <Reorder.Item
                  key={project._id}
                  value={project}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      totalCount={projects.length}
                      onEdit={() => handleEditProject(project)}
                      onDelete={() => handleDeleteProject(project._id)}
                      onToggleFeatured={() => handleToggleFeatured(project._id)}
                      onMoveUp={() => moveProject(index, "up")}
                      onMoveDown={() => moveProject(index, "down")}
                      getStatusColor={getStatusColor}
                      getTypeLabel={getTypeLabel}
                    />
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </div>

      {/* Bulk Delete Dialog */}
      <Dialog open={showBulkDelete} onOpenChange={setShowBulkDelete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete All Projects
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All {projects.length} project
              entries will be permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-200 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">
                  Security Verification Required
                </span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">
                Enter the OTP code to confirm this destructive action.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otpCode">OTP Code</Label>
              <Input
                id="otpCode"
                type="password"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter OTP code"
                className="text-center tracking-widest"
                maxLength={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowBulkDelete(false);
                setOtpCode("");
              }}
              disabled={bulkDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={bulkDeleting || otpCode !== SECURITY_CONFIG.otpCode}
            >
              {bulkDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete All Projects
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
  totalCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  getStatusColor: (status: string) => string;
  getTypeLabel: (type: string) => string;
}

function ProjectCard({
  project,
  index,
  totalCount,
  onEdit,
  onDelete,
  onToggleFeatured,
  onMoveUp,
  onMoveDown,
  getStatusColor,
  getTypeLabel,
}: ProjectCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {/* Drag Handle */}
              <div className="flex flex-col items-center gap-1 pt-1">
                <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-gray-600 cursor-grab" />
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMoveUp}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMoveDown}
                    disabled={index === totalCount - 1}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      {project.title}
                      {project.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </CardTitle>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                      {getTypeLabel(project.projectType)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      className={`bg-${getStatusColor(project.status)}-100 text-${getStatusColor(project.status)}-800 dark:bg-${getStatusColor(project.status)}-900 dark:text-${getStatusColor(project.status)}-300`}
                    >
                      {project.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {project.startDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(project.startDate, {
                          month: "short",
                          year: "numeric",
                        })}
                        {project.endDate && (
                          <>
                            {" "}
                            -{" "}
                            {formatDate(project.endDate, {
                              month: "short",
                              year: "numeric",
                            })}
                          </>
                        )}
                      </span>
                    </div>
                  )}

                  {project.teamSize && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {project.teamSize} member
                        {project.teamSize !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  {project.client && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {project.client}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Technologies */}
                {project.technologies.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Project Links */}
                <div className="flex items-center gap-2 mb-3">
                  {project.githubUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  {project.websiteUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(project.websiteUrl, "_blank")}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Globe className="h-4 w-4" />
                    </Button>
                  )}
                  {project.videoUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(project.videoUrl, "_blank")}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleFeatured}
                className={
                  project.featured ? "text-yellow-600" : "text-gray-600"
                }
              >
                {project.featured ? (
                  <Star className="h-4 w-4 fill-current" />
                ) : (
                  <Star className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete Project
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{project.title}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
