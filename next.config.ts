import type { NextConfig } from "next";

/**
 * Next.js configuration optimized for static export
 */
const nextConfig: NextConfig = {
  // Enable static export
  output: "export",

  // Disable server-side features for static export
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Enhanced image optimization for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ["edurank.org", "res.cloudinary.com"],
    remotePatterns: [
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "media2.dev.to" },
      { protocol: "https", hostname: "images.prismic.io" },
      { protocol: "https", hostname: "cdn.dribbble.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "edurank.org" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.cloudinary.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  poweredByHeader: false,

  // Build optimizations
  reactStrictMode: true,

  // Disable features not compatible with static export
  experimental: {
    // Disable features that require server-side rendering
  },
};

export default nextConfig;
