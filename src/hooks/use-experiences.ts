"use client";

import { useState, useEffect, useCallback } from "react";

export interface Experience {
  _id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

interface UseExperiencesOptions {
  current?: boolean;
  limit?: number;
}

interface UseExperiencesReturn {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useExperiences(
  options: UseExperiencesOptions = {},
): UseExperiencesReturn {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();

      if (options.current !== undefined) {
        params.append("current", options.current.toString());
      }

      if (options.limit) {
        params.append("limit", options.limit.toString());
      }

      const url = `/api/experiences${params.toString() ? `?${params.toString()}` : ""}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setExperiences(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch experiences");
      }
    } catch (err) {
      console.error("Error fetching experiences:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, [options.current, options.limit]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
  };
}

// Helper hook for current experience only
export function useCurrentExperience(): UseExperiencesReturn {
  return useExperiences({ current: true, limit: 1 });
}

// Helper hook for all experiences with limit
export function useExperiencesWithLimit(limit: number): UseExperiencesReturn {
  return useExperiences({ limit });
}
