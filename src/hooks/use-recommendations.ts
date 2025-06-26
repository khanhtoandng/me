"use client";

import { useState, useEffect, useCallback } from "react";

export interface Recommendation {
  _id: string;
  name: string;
  position: string;
  company: string;
  text: string;
  relationship: string;
  avatar?: string;
  featured: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface UseRecommendationsOptions {
  featured?: boolean;
  limit?: number;
}

interface UseRecommendationsReturn {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRecommendations(
  options: UseRecommendationsOptions = {},
): UseRecommendationsReturn {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();

      if (options.featured !== undefined) {
        params.append("featured", options.featured.toString());
      }

      if (options.limit) {
        params.append("limit", options.limit.toString());
      }

      const url = `/api/recommendations${params.toString() ? `?${params.toString()}` : ""}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setRecommendations(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch recommendations");
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, [options.featured, options.limit]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations,
  };
}

// Helper hook for featured recommendations only
export function useFeaturedRecommendations(): UseRecommendationsReturn {
  return useRecommendations({ featured: true });
}

// Helper hook for recommendations with limit
export function useRecommendationsWithLimit(
  limit: number,
): UseRecommendationsReturn {
  return useRecommendations({ limit });
}
