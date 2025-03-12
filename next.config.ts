import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      { protocol: "https", hostname: "media2.dev.to" },
      { protocol: "https", hostname: "images.prismic.io" },
    ],
  },
};

export default nextConfig;
