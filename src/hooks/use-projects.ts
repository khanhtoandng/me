"use client";

import { useState, useEffect, useCallback } from "react";

export interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  images: string[];
  videoUrl: string;
  githubUrl: string;
  websiteUrl: string;
  technologies: string[];
  featured: boolean;
  status: "Draft" | "Published" | "Archived";
  createdAt: string;
  updatedAt: string;
}

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseProjectsOptions {
  status?: "Draft" | "Published" | "Archived";
  featured?: boolean;
  projectType?: string;
  publishedOnly?: boolean;
}

export function useProjects(
  options: UseProjectsOptions = {},
): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();

      // Default to published projects only unless specified otherwise
      if (options.publishedOnly !== false) {
        params.append("status", "Published");
      } else if (options.status) {
        params.append("status", options.status);
      }

      if (options.featured !== undefined) {
        params.append("featured", options.featured.toString());
      }

      if (options.projectType) {
        params.append("projectType", options.projectType);
      }

      const url = `/api/projects${params.toString() ? `?${params.toString()}` : ""}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch projects");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [
    options.status,
    options.featured,
    options.projectType,
    options.publishedOnly,
  ]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
}

// Helper hook for featured projects only
export function useFeaturedProjects(): UseProjectsReturn {
  return useProjects({ featured: true, publishedOnly: true });
}

// Helper hook for projects by type
export function useProjectsByType(projectType: string): UseProjectsReturn {
  return useProjects({ projectType, publishedOnly: true });
}
