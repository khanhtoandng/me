import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { webImage, websitePath } from "@/data/Links";
import Link from "next/link";
import Projects from "@/components/website/Projects";
import PageSeo from "@/components/seo/PageSeo";

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "Projects | Web Applications & Software Solutions",
  description:
    "Explore Baraa Alshaer's portfolio of innovative projects, from responsive web applications to cutting-edge software solutions developed using React, Node.js, TypeScript, and more. View case studies and technical details.",
  keywords:
    "web projects, React projects, Node.js applications, TypeScript projects, full stack development, portfolio projects, software solutions",
  openGraph: {
    title: "Projects - Baraa Alshaer | Web Applications & Software Solutions",
    description:
      "Discover Baraa Alshaer's latest projects showcasing expertise in full-stack web development with modern technologies like React, Node.js, TypeScript, and more. Explore case studies and technical implementations.",
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
      "Check out Baraa Alshaer's portfolio of innovative projects and web applications built with React, Node.js, TypeScript and other modern technologies.",
    images: webImage,
  },
};

export default function ProjectsPage() {
  const styles = {
    breadcrumbLink: "hover:text-[var(--paragraph)] hoverd",
    arrowIcon:
      "text-[var(--paragraph)] text-3xl hoverd hover:text-[var(--link-color)] cursor-pointer ml-[-16px] max-md:ml-[-8px]",
    linkStyle:
      "flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hoverd hover:opacity-100",
  };

  return (
    <>
      {/* Add structured data for the projects page */}
      <PageSeo
        title="Projects - Baraa Alshaer"
        description="Explore Baraa Alshaer's portfolio of innovative projects, from responsive web applications to cutting-edge software solutions."
        image={webImage}
        type="WebPage"
      />

      <div className="projectCards flex min-h-[100vh] w-full flex-col gap-5 max-md:pb-0 max-md:pt-[50px]">
        <div className="header">
          <h1 className="header-title">Projects</h1>
          <p className="description max-w-[100%]">
            I have worked on a variety of projects, here are some of the ones
            I'm particularly proud of.
          </p>
          <div className="py-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={"/"} className={styles.breadcrumbLink}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={"/projects"}
                    className={styles.breadcrumbLink}
                  >
                    Projects
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <Projects />
      </div>
    </>
  );
}
