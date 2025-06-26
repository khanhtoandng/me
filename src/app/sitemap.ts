import { MetadataRoute } from "next";
import { websitePath } from "@/data/Links";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alshaer.vercel.app";

  // Main pages
  const routes = ["", "/projects", "/posts", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Add language variants
  const locales = ["en", "ar"];
  const localizedRoutes = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route.url === `${baseUrl}` ? "" : route.url.replace(baseUrl, "")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route.url === `${baseUrl}` ? 0.9 : 0.7,
    })),
  );

  return [...routes, ...localizedRoutes];
}
