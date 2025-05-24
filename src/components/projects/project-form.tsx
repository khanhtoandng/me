"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { X, Plus, Upload, Trash2, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { AITextEnhancer } from "@/components/ui/ai-text-enhancer";

type ProjectFormProps = {
  project?: {
    id?: string;
    title: string;
    description: string;
    projectType: string;
    images: string[];
    videoUrl?: string;
    githubUrl?: string;
    websiteUrl?: string;
    technologies: string[];
    featured: boolean;
    status: string;
  };
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectType: "Full-stack",
    images: [] as string[],
    videoUrl: "",
    githubUrl: "",
    websiteUrl: "",
    technologies: [] as string[],
    featured: false,
    status: "Draft",
  });

  const [techInput, setTechInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        projectType: project.projectType || "Full-stack",
        images: project.images || [],
        videoUrl: project.videoUrl || "",
        githubUrl: project.githubUrl || "",
        websiteUrl: project.websiteUrl || "",
        technologies: project.technologies || [],
        featured: project.featured || false,
        status: project.status || "Draft",
      });
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const addImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const removeImage = (image: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== image),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields before submission
      const submitData = {
        ...formData,
        // Ensure projectType is not empty and is a valid enum value
        projectType: formData.projectType || "Full-stack",
        // Ensure status is not empty and is a valid enum value
        status: formData.status || "Draft",
        // Ensure arrays are not undefined
        technologies: formData.technologies || [],
        images: formData.images || [],
        // Ensure strings are not undefined
        title: formData.title.trim(),
        description: formData.description.trim(),
        videoUrl: formData.videoUrl?.trim() || "",
        githubUrl: formData.githubUrl?.trim() || "",
        websiteUrl: formData.websiteUrl?.trim() || "",
      };

      // Additional validation
      if (!submitData.title) {
        throw new Error("Project title is required");
      }
      if (!submitData.description) {
        throw new Error("Project description is required");
      }
      if (!submitData.projectType) {
        throw new Error("Project type is required");
      }

      console.log("Submitting project data:", submitData);

      const url = project?.id ? `/api/projects/${project.id}` : "/api/projects";
      const method = project?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: project?.id
            ? "Project updated successfully"
            : "Project created successfully",
        });
        router.push("/dashboard/projects");
        router.refresh();
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
          <CardContent className=" space-y-6">
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="title" className="text-[var(--card-headline)]">
                Project Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                required
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label
                htmlFor="description"
                className="text-[var(--card-headline)]"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project"
                className="min-h-32 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                required
              />
              <AITextEnhancer
                originalText={formData.description}
                onTextUpdate={(newText) =>
                  setFormData((prev) => ({ ...prev, description: newText }))
                }
                type="project"
                placeholder="Enhance project description..."
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label
                htmlFor="projectType"
                className="text-[var(--card-headline)]"
              >
                Project Type
              </Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) =>
                  handleSelectChange("projectType", value)
                }
              >
                <SelectTrigger className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="Full-stack">Full-stack</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label className="text-[var(--card-headline)]">
                Technologies
              </Label>
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add a technology"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTechnology())
                  }
                />
                <Button
                  type="button"
                  onClick={addTechnology}
                  className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <AnimatePresence>
                  {formData.technologies.map((tech) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className="bg-[var(--button2)] text-[var(--button-text)] flex items-center gap-1">
                        {tech}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTechnology(tech)}
                        />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label className="text-[var(--card-headline)]">Images</Label>
              <div className="flex gap-2">
                <Input
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="Image URL"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addImage())
                  }
                />
                <Button
                  type="button"
                  onClick={addImage}
                  className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                <AnimatePresence>
                  {formData.images.map((image) => (
                    <motion.div
                      key={image}
                      className="relative group rounded-md overflow-hidden aspect-video"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt="Project"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(image)}
                          className="bg-red-500 text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="videoUrl" className="text-[var(--card-headline)]">
                Video URL (optional)
              </Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="YouTube or Vimeo URL"
                className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="githubUrl"
                  className="text-[var(--card-headline)] flex items-center gap-2"
                >
                  <Link2 className="h-4 w-4" /> GitHub URL (optional)
                </Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="GitHub repository URL"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="websiteUrl"
                  className="text-[var(--card-headline)] flex items-center gap-2"
                >
                  <Link2 className="h-4 w-4" /> Live Website URL (optional)
                </Label>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="Live project URL"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                />
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <Label htmlFor="status" className="text-[var(--card-headline)]">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
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
              <div className="flex items-end  gap-2  justify-end h-full">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-[var(--input-border-color)] bg-[var(--input-background)]"
                />
                <Label
                  htmlFor="featured"
                  className="text-[var(--card-headline)]"
                >
                  Feature this project on your portfolio
                </Label>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="pb-4 pt-6 mt-6 border-t border-[var(--card-border-color)] flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[var(--card-border-color)] text-[var(--paragraph)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
            >
              {isSubmitting
                ? "Saving..."
                : project?.id
                  ? "Update Project"
                  : "Create Project"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </form>
  );
}
