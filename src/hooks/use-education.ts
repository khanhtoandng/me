"use client";

import { useState, useEffect, useCallback } from "react";

export interface Education {
  _id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  createdAt: string;
  updatedAt: string;
}

interface UseEducationOptions {
  current?: boolean;
  limit?: number;
}

interface UseEducationReturn {
  education: Education[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEducation(
  options: UseEducationOptions = {},
): UseEducationReturn {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEducation = useCallback(async () => {
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

      const url = `/api/education${params.toString() ? `?${params.toString()}` : ""}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setEducation(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch education");
      }
    } catch (err) {
      console.error("Error fetching education:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setEducation([]);
    } finally {
      setLoading(false);
    }
  }, [options.current, options.limit]);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  return {
    education,
    loading,
    error,
    refetch: fetchEducation,
  };
}

// Helper hook for current education only
export function useCurrentEducation(): UseEducationReturn {
  return useEducation({ current: true, limit: 1 });
}

// Helper hook for all education with limit
export function useEducationWithLimit(limit: number): UseEducationReturn {
  return useEducation({ limit });
}
