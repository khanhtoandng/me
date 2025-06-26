"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  FolderOpen,
  Sparkles,
  Loader2,
  Plus,
  X,
  Wand2,
  Brain,
  CheckCircle,
  AlertCircle,
  Link,
  Github,
  Globe,
  Play,
  Calendar,
  Users,
  Star,
} from "lucide-react";
import {
  enhanceProjectDescription,
  processTechnologiesWithAI,
  validateTextForAI,
  isAIServiceAvailable,
} from "@/lib/ai-service";
import { PROJECT_CONFIG } from "@/lib/constants";

interface Project {
  _id?: string;
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

interface EnhancedProjectFormProps {
  project?: Project;
  onSubmit: (data: Omit<Project, "_id"> & { _id?: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EnhancedProjectForm({
  project,
  onSubmit,
  onCancel,
  isLoading = false,
}: EnhancedProjectFormProps) {
  const [formData, setFormData] = useState<Project>({
    title: project?.title || "",
    description: project?.description || "",
    projectType: project?.projectType || "web-app",
    images: project?.images || [],
    technologies: project?.technologies || [],
    status: project?.status || "draft",
    featured: project?.featured || false,
    githubUrl: project?.githubUrl || "",
    websiteUrl: project?.websiteUrl || "",
    videoUrl: project?.videoUrl || "",
    startDate: project?.startDate || "",
    endDate: project?.endDate || "",
    client: project?.client || "",
    teamSize: project?.teamSize || 1,
    role: project?.role || "",
    challenges: project?.challenges || "",
    solutions: project?.solutions || "",
    results: project?.results || "",
    order: project?.order,
    _id: project?._id,
  });

  const [aiEnhancing, setAiEnhancing] = useState({
    description: false,
    challenges: false,
    solutions: false,
    results: false,
    technologies: false,
  });

  const [rawTechnologiesText, setRawTechnologiesText] = useState("");
  const [showTechnologiesProcessor, setShowTechnologiesProcessor] =
    useState(false);
  const [newTechnology, setNewTechnology] = useState("");

  // Pre-populate form when editing
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        projectType: project.projectType || "web-app",
        images: project.images || [],
        technologies: project.technologies || [],
        status: project.status || "draft",
        featured: project.featured || false,
        githubUrl: project.githubUrl || "",
        websiteUrl: project.websiteUrl || "",
        videoUrl: project.videoUrl || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        client: project.client || "",
        teamSize: project.teamSize || 1,
        role: project.role || "",
        challenges: project.challenges || "",
        solutions: project.solutions || "",
        results: project.results || "",
        order: project.order,
        _id: project._id,
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: "",
        description: "",
        projectType: "web-app",
        images: [],
        technologies: [],
        status: "draft",
        featured: false,
        githubUrl: "",
        websiteUrl: "",
        videoUrl: "",
        startDate: "",
        endDate: "",
        client: "",
        teamSize: 1,
        role: "",
        challenges: "",
        solutions: "",
        results: "",
        order: undefined,
        _id: undefined,
      });
    }
  }, [project]);

  const handleInputChange = (field: keyof Project, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      await onSubmit(formData);
      toast.success(
        project
          ? "Project updated successfully!"
          : "Project added successfully!",
      );
    } catch (error) {
      toast.error("Failed to save project");
    }
  };

  const enhanceField = async (
    field: keyof typeof aiEnhancing,
    fieldValue: string,
  ) => {
    if (!fieldValue.trim()) {
      toast.error(`Please enter ${field} first`);
      return;
    }

    const validation = validateTextForAI(fieldValue);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setAiEnhancing((prev) => ({ ...prev, [field]: true }));

    try {
      const result = await enhanceProjectDescription(fieldValue);

      if (result.success && typeof result.data === "string") {
        setFormData((prev) => ({
          ...prev,
          [field]: result.data as string,
        }));
        toast.success(
          `${field.charAt(0).toUpperCase() + field.slice(1)} enhanced successfully!`,
        );
      } else {
        toast.error(result.error || `Failed to enhance ${field}`);
      }
    } catch (error) {
      toast.error("AI enhancement failed");
    } finally {
      setAiEnhancing((prev) => ({ ...prev, [field]: false }));
    }
  };

  const processTechnologies = async () => {
    if (!rawTechnologiesText.trim()) {
      toast.error("Please enter technologies text first");
      return;
    }

    setAiEnhancing((prev) => ({ ...prev, technologies: true }));

    try {
      const result = await processTechnologiesWithAI(rawTechnologiesText);

      if (result.success && Array.isArray(result.data)) {
        const newTechnologies = result.data as string[];
        const combinedTechnologies = [
          ...new Set([...formData.technologies, ...newTechnologies]),
        ];

        setFormData((prev) => ({
          ...prev,
          technologies: combinedTechnologies,
        }));

        setRawTechnologiesText("");
        setShowTechnologiesProcessor(false);
        toast.success(
          `Added ${newTechnologies.length} technologies successfully!`,
        );
      } else {
        toast.error(result.error || "Failed to process technologies");
      }
    } catch (error) {
      toast.error("AI processing failed");
    } finally {
      setAiEnhancing((prev) => ({ ...prev, technologies: false }));
    }
  };

  const addTechnology = () => {
    if (
      newTechnology.trim() &&
      !formData.technologies.includes(newTechnology.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (technologyToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (tech) => tech !== technologyToRemove,
      ),
    }));
  };

  const isAIAvailable = isAIServiceAvailable();

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            {project ? "Edit Project" : "Add New Project"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Project name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) =>
                    handleInputChange("projectType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_CONFIG.types.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status and Featured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_CONFIG.statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full bg-${status.color}-500`}
                          />
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    handleInputChange("featured", checked)
                  }
                />
                <Label htmlFor="featured" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Featured Project
                </Label>
              </div>
            </div>

            {/* Description with AI Enhancement */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                Description *
                {isAIAvailable && (
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Enhanced
                  </Badge>
                )}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe your project..."
                rows={4}
                className="resize-none"
                required
              />
              {isAIAvailable && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    enhanceField("description", formData.description)
                  }
                  disabled={
                    aiEnhancing.description || !formData.description.trim()
                  }
                  className="w-full"
                >
                  {aiEnhancing.description ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Enhancing with AI...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Enhance with AI
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Technologies Section with AI Processing */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  Technologies
                  {isAIAvailable && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI Powered
                    </Badge>
                  )}
                </Label>
                {isAIAvailable && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTechnologiesProcessor(true)}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Process with AI
                  </Button>
                )}
              </div>

              {/* Manual Technology Addition */}
              <div className="flex gap-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add a technology..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTechnology())
                  }
                />
                <Button type="button" onClick={addTechnology} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Technologies Display */}
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {formData.technologies.map((technology, index) => (
                    <motion.div
                      key={technology}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {technology}
                        <button
                          type="button"
                          onClick={() => removeTechnology(technology)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Project Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubUrl" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub URL
                </Label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    handleInputChange("githubUrl", e.target.value)
                  }
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website URL
                </Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) =>
                    handleInputChange("websiteUrl", e.target.value)
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Demo Video URL
                </Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    handleInputChange("videoUrl", e.target.value)
                  }
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSize" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Size
                </Label>
                <Input
                  id="teamSize"
                  type="number"
                  min="1"
                  value={formData.teamSize}
                  onChange={(e) =>
                    handleInputChange("teamSize", parseInt(e.target.value) || 1)
                  }
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => handleInputChange("client", e.target.value)}
                  placeholder="Client or company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="e.g., Full-stack Developer, Lead Developer"
                />
              </div>
            </div>

            {/* AI-Enhanced Project Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Project Details
                {isAIAvailable && (
                  <Badge variant="secondary" className="text-xs ml-2">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Enhanced
                  </Badge>
                )}
              </h3>

              {/* Challenges */}
              <div className="space-y-2">
                <Label htmlFor="challenges">Challenges Faced</Label>
                <Textarea
                  id="challenges"
                  value={formData.challenges}
                  onChange={(e) =>
                    handleInputChange("challenges", e.target.value)
                  }
                  placeholder="What challenges did you encounter during this project?"
                  rows={3}
                  className="resize-none"
                />
                {isAIAvailable && formData.challenges && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      enhanceField("challenges", formData.challenges || "")
                    }
                    disabled={aiEnhancing.challenges}
                    className="w-full"
                  >
                    {aiEnhancing.challenges ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Enhance Challenges
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Solutions */}
              <div className="space-y-2">
                <Label htmlFor="solutions">Solutions Implemented</Label>
                <Textarea
                  id="solutions"
                  value={formData.solutions}
                  onChange={(e) =>
                    handleInputChange("solutions", e.target.value)
                  }
                  placeholder="How did you solve the challenges?"
                  rows={3}
                  className="resize-none"
                />
                {isAIAvailable && formData.solutions && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      enhanceField("solutions", formData.solutions || "")
                    }
                    disabled={aiEnhancing.solutions}
                    className="w-full"
                  >
                    {aiEnhancing.solutions ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Enhance Solutions
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Results */}
              <div className="space-y-2">
                <Label htmlFor="results">Results & Impact</Label>
                <Textarea
                  id="results"
                  value={formData.results}
                  onChange={(e) => handleInputChange("results", e.target.value)}
                  placeholder="What were the outcomes and impact of this project?"
                  rows={3}
                  className="resize-none"
                />
                {isAIAvailable && formData.results && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      enhanceField("results", formData.results || "")
                    }
                    disabled={aiEnhancing.results}
                    className="w-full"
                  >
                    {aiEnhancing.results ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Enhance Results
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.title.trim() ||
                  !formData.description.trim()
                }
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {project ? "Update Project" : "Add Project"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* AI Technologies Processor Dialog */}
      <Dialog
        open={showTechnologiesProcessor}
        onOpenChange={setShowTechnologiesProcessor}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Technologies Processor
            </DialogTitle>
            <DialogDescription>
              Paste raw technologies text and let AI parse and format them for
              you.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Textarea
              value={rawTechnologiesText}
              onChange={(e) => setRawTechnologiesText(e.target.value)}
              placeholder="Paste technologies text here... (e.g., 'React, Node.js, TypeScript, MongoDB, AWS, Docker')"
              rows={4}
              className="resize-none"
            />

            {rawTechnologiesText.trim() && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                AI will parse, format, and deduplicate these technologies
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowTechnologiesProcessor(false);
                setRawTechnologiesText("");
              }}
              disabled={aiEnhancing.technologies}
            >
              Cancel
            </Button>
            <Button
              onClick={processTechnologies}
              disabled={aiEnhancing.technologies || !rawTechnologiesText.trim()}
            >
              {aiEnhancing.technologies ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Process with AI
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
