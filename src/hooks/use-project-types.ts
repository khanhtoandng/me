"use client";

import { useState, useEffect, useCallback } from "react";

export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  icon: {
    library: string;
    name: string;
  };
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseProjectTypesOptions {
  active?: boolean;
}

interface UseProjectTypesReturn {
  projectTypes: ProjectType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createProjectType: (data: Partial<ProjectType>) => Promise<ProjectType>;
  updateProjectType: (id: string, data: Partial<ProjectType>) => Promise<ProjectType>;
  deleteProjectType: (id: string) => Promise<void>;
}

export function useProjectTypes(options: UseProjectTypesOptions = {}): UseProjectTypesReturn {
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectTypes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.active !== undefined) {
        params.append("active", options.active.toString());
      }

      const url = `/api/project-types${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProjectTypes(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch project types");
      }
    } catch (err) {
      console.error("Error fetching project types:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setProjectTypes([]);
    } finally {
      setLoading(false);
    }
  }, [options.active]);

  const createProjectType = useCallback(async (data: Partial<ProjectType>): Promise<ProjectType> => {
    const response = await fetch("/api/project-types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to create project type");
    }

    await fetchProjectTypes();
    return result.data;
  }, [fetchProjectTypes]);

  const updateProjectType = useCallback(async (id: string, data: Partial<ProjectType>): Promise<ProjectType> => {
    const response = await fetch(`/api/project-types/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to update project type");
    }

    await fetchProjectTypes();
    return result.data;
  }, [fetchProjectTypes]);

  const deleteProjectType = useCallback(async (id: string): Promise<void> => {
    const response = await fetch(`/api/project-types/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to delete project type");
    }

    await fetchProjectTypes();
  }, [fetchProjectTypes]);

  useEffect(() => {
    fetchProjectTypes();
  }, [fetchProjectTypes]);

  return {
    projectTypes,
    loading,
    error,
    refetch: fetchProjectTypes,
    createProjectType,
    updateProjectType,
    deleteProjectType,
  };
}

// Helper hook for active project types only
export function useActiveProjectTypes(): UseProjectTypesReturn {
  return useProjectTypes({ active: true });
}
