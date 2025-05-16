// No "use client" here — this stays a server component
import { Metadata } from "next";
import { webImage, websitePath } from "@/data/Links";
import PageSeo from "@/components/seo/PageSeo";
import ProjectsPageClient from "@/components/website/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects | Web Applications & Software Solutions",
  description:
    "Explore Baraa Alshaer's portfolio of innovative projects, from responsive web applications to cutting-edge software solutions...",
  keywords:
    "web projects, React projects, Node.js applications, TypeScript projects, full stack development, portfolio projects, software solutions",
  openGraph: {
    title: "Projects - Baraa Alshaer | Web Applications & Software Solutions",
    description:
      "Discover Baraa Alshaer's latest projects showcasing expertise in full-stack web development...",
    url: websitePath.projects,
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "Baraa Alshaer Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Baraa Alshaer | Web Applications & Software Solutions",
    description:
      "Check out Baraa Alshaer's portfolio of innovative projects and web applications...",
    images: webImage,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageSeo
        title="Projects - Baraa Alshaer"
        description="Explore Baraa Alshaer's portfolio of innovative projects..."
        image={webImage}
        type="WebPage"
      />
      <ProjectsPageClient />
    </>
  );
}
