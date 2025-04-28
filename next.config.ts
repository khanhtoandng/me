import type { NextConfig } from "next";

/**
 * Next.js configuration with optimizations for performance and SEO
 */
const nextConfig: NextConfig = {
  // Enhanced image optimization
  images: {
    domains: ["edurank.org"],
    remotePatterns: [
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "media2.dev.to" },
      { protocol: "https", hostname: "images.prismic.io" },
      { protocol: "https", hostname: "cdn.dribbble.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "edurank.org" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // SEO optimizations
  trailingSlash: true,

  // Build optimizations
  reactStrictMode: true,
  swcMinify: true,

  // Cache optimizations
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 4,
  },
};

export default nextConfig;
