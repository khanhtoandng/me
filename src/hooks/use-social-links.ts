"use client";

import { useEffect, useState } from "react";

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

const mockSocialLinks: SocialLink[] = [
  {
    _id: "1",
    platform: "GitHub",
    url: "https://github.com/balshaer",
    icon: "github",
    iconLibrary: "fontawesome",
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/balshaer",
    icon: "linkedin",
    iconLibrary: "fontawesome",
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    platform: "YouTube",
    url: "https://youtube.com/@codewithbaraa",
    icon: "youtube",
    iconLibrary: "fontawesome",
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    platform: "Email Me",
    url: "mailto:alshaer.contact@gmail.com",
    icon: "envelope",
    iconLibrary: "fontawesome",
    isActive: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    platform: "WhatsApp",
    url: "https://wa.me/970599349034",
    icon: "whatsapp",
    iconLibrary: "fontawesome",
    isActive: true,
    order: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useSocialLinks(activeOnly: boolean = true): UseSocialLinksReturn {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      setError(null);

      const links = activeOnly
        ? mockSocialLinks.filter((link) => link.isActive)
        : mockSocialLinks;

      await new Promise((resolve) => setTimeout(resolve, 300));

      setSocialLinks(links);
    } catch {
      setError("Failed to load social links");
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
