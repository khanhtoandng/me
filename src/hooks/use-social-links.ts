"use client";

import { useState, useEffect } from "react";

export interface SocialLink {
  _id: string;
  platform: string;
  url: string;
  icon: string;
  iconLibrary: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface UseSocialLinksReturn {
  socialLinks: SocialLink[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSocialLinks(
  activeOnly: boolean = true,
): UseSocialLinksReturn {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = activeOnly
        ? "/api/social-links?active=true"
        : "/api/social-links";

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setSocialLinks(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch social links");
      }
    } catch (err) {
      console.error("Error fetching social links:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setSocialLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, [activeOnly]);

  return {
    socialLinks,
    loading,
    error,
    refetch: fetchSocialLinks,
  };
}
