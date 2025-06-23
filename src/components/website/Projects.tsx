"use client";

import type React from "react";
import { useMemo } from "react";
import { Globe, Github, Loader2, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReusableCard from "@/components/common/ReusableCard";
import Link from "next/link";
import { ScrollEffect } from "@/lib/animations";

import { github } from "@/data/Links";
import { useProjects, type Project } from "@/hooks/use-projects";

const styles = {
  linkStyle:
    "flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hover:opacity-100 transition-opacity",
};

const isValidLink = (link: string | undefined) =>
  link && link.trim() !== "" && link !== "#";

const ProjectLink = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.linkStyle}
  >
    <Icon className="h-4 w-4" />
    <span>{children}</span>
  </Link>
);

// Type for props
type ProjectsProps = {
  filterType?: string; // e.g., "frontend", "backend", etc.
};

// Helper function to map database project to component format
const mapProjectToComponentFormat = (project: Project) => ({
  id: project._id,
  type: project.projectType.toLowerCase(),
  title: project.title,
  description: project.description,
  skills: project.technologies,
  coverImg:
    project.images && project.images.length > 0 ? project.images[0] : undefined,
  links: {
    website: project.websiteUrl || undefined,
    github: project.githubUrl || undefined,
    video: project.videoUrl || undefined,
  },
});

export default function Projects({ filterType = "all" }: ProjectsProps) {
  const { projects, loading, error } = useProjects({ publishedOnly: true });

  const filteredProjects = useMemo(() => {
    const mappedProjects = projects.map(mapProjectToComponentFormat);

    if (filterType === "all") return mappedProjects;
    return mappedProjects.filter(
      (project) => project.type.toLowerCase() === filterType.toLowerCase()
    );
  }, [projects, filterType]);

  // Loading state
  if (loading) {
    return (
      <div className="projects-cards flex flex-col gap-8 pb-16">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-[var(--paragraph)]">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading projects...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="projects-cards flex flex-col gap-8 pb-16">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-500 mb-2">Failed to load projects</p>
            <p className="text-[var(--paragraph)] text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No projects state
  if (filteredProjects.length === 0) {
    return (
      <div className="projects-cards flex flex-col gap-8 pb-16">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-[var(--paragraph)] mb-2">No projects found</p>
            <p className="text-[var(--paragraph)] text-sm opacity-70">
              {filterType === "all"
                ? "No projects have been published yet."
                : `No ${filterType} projects found.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-cards flex flex-col gap-8 pb-16">
      {filteredProjects.map((project) => (
        <ScrollEffect key={project.id} type="fadeUp">
          <ReusableCard
            id={project.id.toString()}
            title={project.title}
            description={project.description}
            skills={project.skills}
            websiteLink={project.links.website}
            githubLink={project.links.github}
            coverImg={project.coverImg}
            linkStyle={styles.linkStyle}
            className="pb-4 pt-2"
          >
            <div className="flex max-w-[60%] flex-wrap gap-2 max-md:mb-0 max-md:mt-4 max-md:max-w-full">
              {project.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 max-md:mt-5">
              {project.links.website && isValidLink(project.links.website) && (
                <ProjectLink href={project.links.website} icon={Globe}>
                  Visit Website
                </ProjectLink>
              )}

              {project.links.github && isValidLink(project.links.github) && (
                <ProjectLink href={project.links.github} icon={Github}>
                  View on GitHub
                </ProjectLink>
              )}

              {project.links.video && isValidLink(project.links.video) && (
                <ProjectLink href={project.links.video} icon={Play}>
                  Watch Demo
                </ProjectLink>
              )}
            </div>
          </ReusableCard>
        </ScrollEffect>
      ))}

      <h2 className="text-base text-[var(--paragraph)] opacity-80">
        You can find more projects and open-source contributions on my{" "}
        <Link className="link text-base" href={github}>
          GitHub profile.
        </Link>
      </h2>
    </div>
  );
}
