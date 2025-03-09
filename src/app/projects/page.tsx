import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { webImage } from "@/data/Links";
import Link from "next/link";
import Projects from "@/components/website/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the portfolio of Baraa Alshaer, a Full Stack Developer. Discover a range of innovative projects, from web applications to cutting-edge software solutions developed using technologies like React, Node.js, TypeScript, and more.",
  openGraph: {
    title: "Projects - Baraa Alshaer",
    description:
      "Discover the latest projects by Baraa Alshaer, showcasing expertise in full-stack web development with projects built using modern technologies like React, Node.js, TypeScript, and more.",
    url: "https://alshaer.vercel.app/projects",
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "Baraa Alshaer Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Baraa Alshaer",
    description:
      "Check out the portfolio of Baraa Alshaer, a Full Stack Developer, featuring innovative projects and web applications built with modern technologies.",
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
      <div className="projectCards  flex min-h-[100vh] w-full flex-col gap-5 max-md:pb-0 max-md:pt-[50px]">
        <div className="header">
          <h1 className="header-title">Projects</h1>
          <p className="description max-w-[100%]">I have worked on a variety of projects, here are some of the ones I'm particularly proud of.</p>
          <div className="py-5">
            <Breadcrumb>
              <BreadcrumbList>
                <Link href={"/"}>
                  <BreadcrumbItem>
                    <BreadcrumbLink className={styles.breadcrumbLink}>
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Link>
                <BreadcrumbSeparator />

                <Link href={"/projects"}>
                  <BreadcrumbItem>
                    <BreadcrumbLink className={styles.breadcrumbLink}>
                      Projects
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Link>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <Projects />
      </div>
    </>
  );
}
