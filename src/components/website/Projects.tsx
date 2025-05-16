"use client";

import type React from "react";
import { useMemo } from "react";
import { Globe, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReusableCard from "@/components/common/ReusableCard";
import Link from "next/link";
import { ScrollEffect } from "@/lib/animations";
import { Card } from "../ui/card";
import { github, projects } from "@/data/Links";

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

const OtherProjectLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <ScrollEffect type="fadeUp">
    <Link href={href} target="_blank">
      <Card className="text-[var(--headline)]">
        <h1 className="flex items-center gap-2 max-md:flex-wrap">
          <ExternalLink className="h-4 w-4 max-md:hidden" />
          {children}
        </h1>
      </Card>
    </Link>
  </ScrollEffect>
);

// Add `type` field to each project
const ProjectsData = [
  {
    id: 2,
    type: "frontend",
    title: "SFB - Sustainable Star Form Builder",
    description:
      "A dynamic form builder for customizable data collection with a great UI.",
    skills: ["React", "Tailwind CSS", "Shadcn UI"],
    links: {
      website: projects.sfb,
      github: null,
    },
  },
  {
    id: 5,
    type: "fullstack",
    title: "Sam-Tax",
    description:
      "A professional website for a U.S.-based company offering tax and translation services.",
    skills: ["React", "Tailwind CSS", "Express.js", "Mongodb", "Node.js"],
    links: {
      website: projects.samtax,
      github: null,
    },
  },
  {
    id: 1,
    type: "frontend",
    title: "Gradients CSS",
    description:
      "A gradient design tool for developers and designers with live previews.",
    skills: ["React JS", "Typescript", "Tailwind CSS", "RESTful APIs"],
    links: {
      website: projects.gradientscss.website,
      github: projects.gradientscss.github,
    },
  },
  {
    id: 3,
    type: "frontend",
    title: "Raouf Zadi",
    description:
      "A stylish barber portfolio website built with modern React stack.",
    skills: ["React JS", "Typescript", "Tailwind CSS", "Git"],
    links: {
      website: projects.raoufzadi,
      github: null,
    },
  },
  {
    id: 4,
    type: "frontend",
    title: "Naj Training Center",
    description:
      "An educational platform for a dental training center in Saudi Arabia.",
    skills: ["React JS", "Javascript", "MIUI"],
    links: {
      website: projects.najcenter,
      github: null,
    },
  },
];

// Type for props
type ProjectsProps = {
  filterType?: string; // e.g., "frontend", "backend", etc.
};

export default function Projects({ filterType = "all" }: ProjectsProps) {
  const filteredProjects = useMemo(() => {
    if (filterType === "all") return ProjectsData;
    return ProjectsData.filter(
      (project) => project.type.toLowerCase() === filterType.toLowerCase()
    );
  }, [filterType]);

  return (
    <div className="projects-cards flex flex-col gap-8 pb-16">
      {filteredProjects.map((project) => (
        <ScrollEffect key={project.id} type="fadeUp">
          <ReusableCard
            id={project.id}
            title={project.title}
            description={project.description}
            skills={project.skills}
            websiteLink={project.links.website}
            githubLink={project.links.github}
            linkStyle={styles.linkStyle}
            className="pb-4 pt-2"
          >
            <div className="flex max-w-[60%] flex-wrap gap-2 max-md:mb-0 max-md:mt-4 max-md:max-w-full">
              {project.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 max-md:mt-5">
              {isValidLink(project.links.website) && (
                <ProjectLink href={project.links.website} icon={Globe}>
                  Visit Website
                </ProjectLink>
              )}

              {isValidLink(project.links.github) && (
                <ProjectLink href={project.links.github} icon={Github}>
                  View on GitHub
                </ProjectLink>
              )}
            </div>
          </ReusableCard>
        </ScrollEffect>
      ))}

      <h2 className="text-base text-[var(--paragraph)] opacity-80">
        Here are some more projects that I have worked on, <br /> You can find
        the complete list of projects on my{" "}
        <Link className="link text-base" href={github}>
          GitHub profile.
        </Link>
      </h2>

      <ul className="space-y-2">
        <OtherProjectLink href={projects.rove}>
          Rove{" "}
          <span className="opacity-60">
            - A full-stack, open-source eCommerce web application.
          </span>
        </OtherProjectLink>
        <OtherProjectLink href={projects.sustainablestar}>
          Sustainable Star{" "}
          <span className="opacity-60">
            - A corporate website for a Saudi Arabian software company.
          </span>
        </OtherProjectLink>
        <OtherProjectLink href={projects.bookstoreapi}>
          Bookstore API{" "}
          <span className="opacity-60">
            - A robust API for managing bookstore operations.
          </span>
        </OtherProjectLink>
      </ul>
    </div>
  );
}
