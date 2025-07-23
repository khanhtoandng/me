"use client";

import { useSocialLinks } from "@/hooks/use-social-links";
import Link from "next/link";
import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";

const iconLibraries = {
  fa: FaIcons,
  ai: AiIcons,
  bi: BiIcons,
  bs: BsIcons,
  fi: FiIcons,
  hi: HiIcons,
  io: IoIcons,
  md: MdIcons,
  ri: RiIcons,
  si: SiIcons,
  ti: TiIcons,
};

interface SocialLinksDisplayProps {
  variant?: "footer" | "hero" | "sidebar" | "inline";
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
  limit?: number;
}

export function SocialLinksDisplay({
  variant = "footer",
  className = "",
  iconSize = 20,
  showLabels = false,
  limit,
}: SocialLinksDisplayProps) {
  const { socialLinks, loading, error } = useSocialLinks(true);

  // Get icon component
  const getIconComponent = (iconName: string, library: string) => {
    const iconLib = iconLibraries[library as keyof typeof iconLibraries];
    if (!iconLib) return null;

    const IconComponent = iconLib[iconName as keyof typeof iconLib];
    if (!IconComponent) return null;

    // Type assertion for React component
    const Icon = IconComponent as React.ComponentType<{ size?: number }>;
    return <Icon size={iconSize} />;
  };

  // Apply limit if specified
  const displayLinks = limit ? socialLinks.slice(0, limit) : socialLinks;

  if (loading) {
    return (
      <div className={`flex gap-3 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error || displayLinks.length === 0) {
    return null;
  }

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case "footer":
        return {
          container: "flex space-x-3",
          link: "p-2 rounded-full bg-[var(--card-background)] border border-[var(--card-border-color)] text-[var(--paragraph)] hover:text-[var(--link-color)] hover:border-[var(--link-color)] transition-colors",
          label: "sr-only",
        };
      case "hero":
        return {
          container: "flex items-center gap-4",
          link: "flex items-center gap-2 text-[var(--paragraph)] hover:text-[var(--link-color)] transition-colors",
          label: showLabels ? "text-sm" : "sr-only",
        };
      case "sidebar":
        return {
          container: "flex flex-col space-y-2",
          link: "flex items-center gap-3 p-2 rounded-[12px] text-[var(--paragraph)] hover:text-[var(--link-color)] hover:bg-[var(--card-hover)] transition-colors",
          label: "text-sm",
        };
      case "inline":
        return {
          container: "flex items-center gap-3",
          link: "flex items-center gap-2 text-[var(--paragraph)] hover:text-[var(--link-color)] transition-colors",
          label: showLabels ? "text-sm" : "sr-only",
        };
      default:
        return {
          container: "flex gap-3",
          link: "text-[var(--paragraph)] hover:text-[var(--link-color)] transition-colors",
          label: "sr-only",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {displayLinks.map((social) => (
        <Link
          key={social._id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={social.platform}
          title={social.platform}
        >
          {getIconComponent(social.icon, social.iconLibrary)}
          {showLabels && (
            <span className={styles.label}>{social.platform}</span>
          )}
        </Link>
      ))}
    </div>
  );
}

// Export individual social link component for more control
interface SocialLinkItemProps {
  social: {
    _id: string;
    platform: string;
    url: string;
    icon: string;
    iconLibrary: string;
  };
  className?: string;
  iconSize?: number;
  showLabel?: boolean;
}

export function SocialLinkItem({
  social,
  className = "",
  iconSize = 20,
  showLabel = false,
}: SocialLinkItemProps) {
  const getIconComponent = (iconName: string, library: string) => {
    const iconLib = iconLibraries[library as keyof typeof iconLibraries];
    if (!iconLib) return null;

    const IconComponent = iconLib[iconName as keyof typeof iconLib];
    if (!IconComponent) return null;

    const Icon = IconComponent as React.ComponentType<{ size?: number }>;
    return <Icon size={iconSize} />;
  };

  return (
    <Link
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 text-[var(--paragraph)] hover:text-[var(--link-color)] transition-colors ${className}`}
      aria-label={social.platform}
      title={social.platform}
    >
      {getIconComponent(social.icon, social.iconLibrary)}
      {showLabel && <span className="text-sm">{social.platform}</span>}
    </Link>
  );
}
