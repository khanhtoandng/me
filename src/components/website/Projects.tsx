"use client";

import type React from "react";

import { Globe, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReusableCard from "@/components/common/ReusableCard";
import Link from "next/link";
import { ScrollEffect } from "@/lib/animations";
import { Card } from "../ui/card";

const styles = {
  linkStyle:
    "flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hover:opacity-100 transition-opacity",
  linkStyle2:
    "text-[var(--link-color)] hoverd hover:text-[var(--link-hover)] flex gap-1 items-center w-max justify-center",
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
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.linkStyle}
  >
    <Icon className="h-4 w-4" />
    <span>{children}</span>
  </a>
);

const OtherProjectLink = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Card className="text-[var(--headline)] ">
    <div className="flex items-center gap-2">
    <ExternalLink className="h-4 w-4" />

    <Link href={href} target="_blank">
      {children}
    </Link>
    </div>



  </Card>
);

const ProjectsData = [
  {
    id: 2,
    title: "SFB - Sustainable Star Form Builder",
    description:
      " A dynamic form builder that enables companies to create and manage custom forms easily, streamlining data collection and enhancing user experience with a flexible and customizable interface.",
    skills: ["React", "Tailwind CSS", "Shadcn UI"],
    links: {
      website: "https://sfb-sa.com",
      github: null,
    },
  },
  {
    id: 1,
    title: "Gradients CSS",
    description:
      "Created a sophisticated gradient tool tailored for designers and developers, offering seamless customization.",
    skills: ["React JS", "Typescript", "Tailwind CSS", "RESTful APIs"],
    links: {
      website: "https://gradientscss.vercel.app/",
      github: "https://github.com/balshaer/gradients-css",
    },
  },
  {
    id: 3,
    title: "Raouf Zadi",
    description:
      "Designed a professional online presence for a barber, showcasing services and style.",
    skills: ["React JS", "Typescript", "Tailwind CSS", "Git"],
    links: {
      website: "https://raoufzadi.vercel.app/",
      github: null,
    },
  },
  {
    id: 4,
    title: "Naj Training Center",
    description:
      "Developed an educational platform for a dental training center in Saudi Arabia, supporting professional growth.",
    skills: ["React JS", "Javascript", "MIUI"],
    links: {
      website: "https://naj.shamilapp.com/",
      github: null,
    },
  },
];

export default function Projects() {
  return (
    <div className="projects-cards flex flex-col gap-8 pb-16">
      {ProjectsData.map((project: any) => (
        <ScrollEffect type="fadeUp">

        <ReusableCard
          key={project.id}
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
            {project.skills.map((skill: any, index: any) => (
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

      <h2 className="text-base text-[var(--paragraph)] opacity-80">Here are some more projects that I have worked on, <br /> You can find the complete list of projects on my <Link className="link text-base" href={"https://github.com/balshaer/"}>GitHub profile.</Link></h2>

      <ul className="space-y-2">
  <OtherProjectLink href="https://sam-tax.com/">
    SamTax <span className="opacity-60">- A professional website for a U.S.-based company offering tax and translation services.</span>
  </OtherProjectLink>

  <OtherProjectLink href="https://github.com/balshaer/rove">
    Rove <span className="opacity-60">- A full-stack, open-source eCommerce web application.</span>
  </OtherProjectLink>
  <OtherProjectLink href="https://sustainablestar.com.sa/">
    Sustainable Star <span className="opacity-60">- A corporate website for a Saudi Arabian company specializing in software solutions.</span>
  </OtherProjectLink>
  <OtherProjectLink href="https://github.com/balshaer/bookstore-api">
    Bookstore API <span className="opacity-60">- A robust API for managing bookstore operations.</span>
  </OtherProjectLink>
</ul>


    </div>
  );
}
