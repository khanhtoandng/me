"use client";

import ReusableCard from "@/components/common/ReusableCard";
import { ScrollEffect } from "@/lib/animations";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { github } from "@/data/Links";
import { useProjects, type Project } from "@/hooks/use-projects";

const styles = {
  linkStyle:
    "flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hover:opacity-100 transition-opacity",
};

const isValidLink = (link: string | undefined) =>
  link && link.trim() !== "" && link !== "#";

type ProjectsProps = {
  filterType?: string;
};

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
      {filteredProjects.map((project) => {
        const papers = [
          project.links.github && {
            title: "GitHub",
            link: project.links.github,
          },
          project.links.website && {
            title: "Website",
            link: project.links.website,
          },
          project.links.video && { title: "Demo", link: project.links.video },
        ].filter(Boolean) as { title: string; link: string }[];

        return (
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
              papers={papers}
            />
          </ScrollEffect>
        );
      })}

      <h2 className="text-base text-[var(--paragraph)] opacity-80">
        You can find more projects and open-source contributions on my 
        <Link className="link text-base px-1" href={github}>
          <span>GitHub profile.</span>
        </Link>
      </h2>
    </div>
  );
}
