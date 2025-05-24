"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, ExternalLink, Edit, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Project = {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  images: string[];
  technologies: string[];
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  githubUrl?: string;
  websiteUrl?: string;
  videoUrl?: string;
};

export function ProjectsList() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const status = searchParams.get("status");
  const search = searchParams.get("search");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        let url = "/api/projects";
        const params = new URLSearchParams();

        if (status) {
          params.set("status", status);
        }

        if (search) {
          params.set("search", search);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [status, search, toast]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          setProjects(projects.filter((project) => project._id !== id));
          toast({
            title: "Success",
            description: "Project deleted successfully",
          });
        } else {
          throw new Error(data.error || "Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        toast({
          title: "Error",
          description: "Failed to delete project. Please try again.",
          variant: "destructive",
        });
      }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card
            key={i}
            className="overflow-hidden bg-[var(--card-background)] border-[var(--card-border-color)]"
          >
            <div className="aspect-video w-full bg-[var(--skeleton-color)] animate-pulse" />
            <CardHeader className="py-4">
              <div className="flex items-start justify-between w-full">
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  <div className="h-4 w-48 bg-[var(--skeleton-color)] rounded animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap gap-2">
                <div className="h-5 w-16 bg-[var(--skeleton-color)] rounded animate-pulse" />
                <div className="h-5 w-20 bg-[var(--skeleton-color)] rounded animate-pulse" />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <div className="h-5 w-24 bg-[var(--skeleton-color)] rounded animate-pulse" />
              <div className="h-4 w-20 bg-[var(--skeleton-color)] rounded animate-pulse" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
        <h3 className="text-xl font-semibold text-[var(--card-headline)]">
          No projects found
        </h3>
        <p className="text-[var(--card-paragraph)] mt-2">
          {search
            ? `No projects matching "${search}"`
            : status
              ? `No projects with status "${status}"`
              : "Start by adding your first project"}
        </p>
        <Link href="/dashboard/projects/new">
          <Button className="mt-4 mx-auto bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <motion.div key={project._id} variants={itemVariants}>
          <Card className="overflow-hidden bg-[var(--card-background)] border-[var(--card-border-color)]">
            <div className="aspect-video w-full overflow-hidden bg-[var(--card-background-effect)]">
              {project.images && project.images.length > 0 ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-xs">No Image</p>
                  </div>
                </div>
              )}
            </div>
            <CardHeader className="py-4">
              <div className="flex items-start justify-between w-full">
                <div>
                  <CardTitle className="text-xl text-[var(--card-headline)]">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-[var(--card-paragraph)]">
                    {project.projectType}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[var(--paragraph)]"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]"
                  >
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href={`/dashboard/projects/${project._id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    {project.websiteUrl && (
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live
                        </a>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(project._id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="py-4 pt-0">
              <p className="text-sm text-[var(--card-paragraph)] mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-[var(--button2)] text-[var(--button-text)]"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge
                    variant="outline"
                    className="border-[var(--card-border-color)] text-[var(--paragraph)]"
                  >
                    +{project.technologies.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between py-4 pt-0">
              <Badge
                variant={project.status === "Published" ? "default" : "outline"}
                className={
                  project.status === "Published"
                    ? "bg-[var(--tertiary)] text-[var(--button-text)]"
                    : "border-[var(--card-border-color)] text-[var(--paragraph)]"
                }
              >
                {project.status}
              </Badge>
              {project.featured && (
                <Badge className="bg-[var(--highlight)] text-[var(--button-text)]">
                  Featured
                </Badge>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
