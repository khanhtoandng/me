"use client";

import {
  SiBootstrap,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiGooglecloud,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiWebauthn,
  SiWebpack,
} from "react-icons/si";

import React, { JSX } from "react";
import { FaCode, FaJava, FaProjectDiagram } from "react-icons/fa";

type Skill = {
  name: string;
  icon: JSX.Element;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const categories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Python", icon: <SiPython /> },
      { name: "Java", icon: <FaJava /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
  },
  {
    title: "Libraries / Frameworks",
    skills: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "Prisma", icon: <SiPrisma /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
      { name: "SASS", icon: <SiSass /> },
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Git", icon: <SiGit /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "REST APIs", icon: <SiPostman /> },
      { name: "Webpack", icon: <SiWebpack /> },
      { name: "UML", icon: <FaProjectDiagram /> },
      { name: "Google Cloud Platform", icon: <SiGooglecloud /> },
      { name: "GitHub Actions", icon: <SiGithubactions /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "Systems Design", icon: <FaProjectDiagram /> },
      { name: "OOP", icon: <FaCode /> },
      { name: "JWT", icon: <SiJsonwebtokens /> },
      { name: "OAuth", icon: <SiWebauthn /> },
    ],
  },
];

const styles = {
  section: "w-full",
  headerTitle: "section-title",
  headerTitleStyle: {
    color: "var(--headline)",
    borderColor: "var(--border)",
  },
  headerSubTitle: "font-jetbrains-mono text-sm font-normal tracking-wider",
  headerSubTitleStyle: { color: "var(--secondary)" },
  headerDesc: "font-figtree text-sm mt-2 mb-4",
  headerDescStyle: { color: "var(--paragraph)" },
  categoryTitle: "text-[11px] font-figtree font-medium mb-1 uppercase tracking-wider",
  categoryTitleStyle: { color: "var(--paragraph)" },
  skillButton:
    "flex items-center cursor-default rounded-lg px-3 py-2 font-medium text-xs gap-2 shadow transition focus:outline-none",
  skillButtonStyle: {
    backgroundColor: "var(--card-background)",
    border: "none",
    color: "var(--headline)",
  },
};

export default function SkillsSection() {
  const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = "transparent";
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = "transparent";
  };

  return (
    <section className={styles.section}>
      <header>
        <h1
          className={"section-title"}
          style={styles.headerTitleStyle}
          data-ninja-font="doto_bold_normal_rg90b"
        >
          Skills{" "}
          <span
            className={styles.headerSubTitle}
            style={styles.headerSubTitleStyle}
            data-ninja-font="jetbrainsmono_regular_normal_smv0q"
          >
            Which I use/know
          </span>
        </h1>
        <p
          className={styles.headerDesc}
          style={styles.headerDescStyle}
          data-ninja-font="figtree_light_normal_rmlnd"
        >
          These are the technologies I've learned and worked with. This list is
          constantly evolving as I continue to learn and grow as a developer.
        </p>
      </header>

      {categories.map(({ title, skills }) => (
        <div key={title} className="mb-6">
          <h3
            className={styles.categoryTitle}
            style={styles.categoryTitleStyle}
          >
            &lt; {title} /&gt;
          </h3>

          <div className="flex ibmsans flex-wrap gap-3">
            {skills.map(({ name, icon }) => (
              <button
                key={name}
                type="button"
                aria-label={name}
                tabIndex={0}
                className={styles.skillButton}
                style={styles.skillButtonStyle}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <span className="text-lg">{icon}</span>
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
