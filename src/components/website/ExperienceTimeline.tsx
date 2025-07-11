"use client";

import { ScrollEffect } from "@/lib/animations";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

export interface Experience {
  _id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
  achievements?: string[];
  createdAt: string;
  updatedAt: string;
}

export const experiencesData: Experience[] = [
  {
    _id: "exp_1",
    title: "Full Stack Engineer",
    company: "Samtax",
    companyUrl: "https://sam-tax.com/",
    location: "Philadelphia, United States",
    startDate: "2024-06-01",
    current: true,
    description:
      "Developed and launched multiple full-stack web applications for a startup, including custom internal tools, AI-driven automation solutions, and secure payment systems to enable seamless transactions for clients.",
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "Node.js",
      "AI Integration",
      "Payment Systems",
      "Systems Design",
    ],
    achievements: [
      "Built custom internal tools to streamline operations and support growth",
      "Developed AI-driven automation solutions to enhance efficiency and decision-making",
      "Implemented secure payment systems enabling seamless transactions for clients",
      "Delivered robust, scalable full-stack applications with a focus on security and performance",
    ],
    createdAt: "2024-06-01T00:00:00.000Z",
    updatedAt: "2025-07-11T00:00:00.000Z",
  },
  {
    _id: "exp_2",
    title: "Frontend Developer",
    company: "Sustainable Star LLC",
    companyUrl: "https://sustainablestar.com.sa/",
    location: "Riyadh, Saudi Arabia",
    startDate: "2023-07-01",
    endDate: "2023-11-30",
    current: false,
    description:
      "Developed the Sustainable Star Form Builder (SFB) platform, enabling companies to create custom forms with drag-and-drop functionality, ensuring responsive design and optimal performance.",
    skills: [
      "React.js",
      "JavaScript ES6+",
      "CSS3",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "REST APIs",
      "Webpack",
      "Git",
      "Axios",
    ],
    achievements: [
      "Built responsive web applications ensuring cross-device compatibility",
      "Implemented user interface components with modern CSS frameworks",
      "Optimized frontend performance through code splitting and efficient state management",
    ],
    createdAt: "2023-07-01T00:00:00.000Z",
    updatedAt: "2023-11-30T00:00:00.000Z",
  },
  {
    _id: "exp_3",
    title: "Frontend Developer",
    company: "Perfect Touch (PTIT)",
    companyUrl: "http://ptit.com.sa/",
    location: "Riyadh, Saudi Arabia",
    startDate: "2023-06-01",
    endDate: "2023-09-30",
    current: false,
    description:
      "Contributed to team projects including the NAJ Training Center, enhanced applications for greater creativity and usability, and maintained legacy projects by updating outdated packages.",
    skills: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Legacy Code Optimization",
      "Package Management",
    ],
    achievements: [
      "Enhanced PTIT applications for improved creativity and user engagement",
      "Optimized and maintained legacy projects, ensuring up-to-date packages and smoother performance",
    ],
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-09-30T00:00:00.000Z",
  },
  {
    _id: "exp_4",
    title: "IT Security & Database Intern",
    company: "Gaza Electricity Distribution Company (GEDCO)",
    location: "Gaza, Palestine",
    startDate: "2022-04-01",
    endDate: "2022-06-30",
    current: false,
    description:
      "Supported database maintenance operations, implemented security protocols, and participated in security monitoring and incident response to protect sensitive data.",
    skills: [
      "SQL Server Administration",
      "MySQL",
      "Database Security",
      "Network Security Monitoring",
      "Security Compliance",
      "Operating Systems",
      "Vulnerability Management",
      "Data Backup Solutions",
      "Networks",
    ],
    achievements: [
      "Maintained database systems for electrical distribution management",
      "Implemented security measures to protect sensitive customer and operational data",
      "Contributed to backup systems and disaster recovery planning",
    ],
    createdAt: "2022-04-01T00:00:00.000Z",
    updatedAt: "2022-06-30T00:00:00.000Z",
  },
];

export function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Simulate loading delay
    const timer = setTimeout(() => {
      setExperiences(experiencesData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isMounted]);

  const formatDateRange = (
    startDate: string,
    endDate?: string,
    current?: boolean
  ) => {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (current) {
      return `${startFormatted} - Present`;
    }

    if (endDate) {
      const end = new Date(endDate);
      const endFormatted = end.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return `${startFormatted} - ${endFormatted}`;
    }

    return startFormatted;
  };

  const styles = {
    sectionTitle:
      "flex flex-row gap-1 pb-2 text-sm sm:text-lg md:text-xl max-md:text-base max-md:flex-wrap",
    sectionDescription:
      "description opacity-80 mt-0 pb-2 pt-0 text-sm md:text-base",
  };

  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <div id="work" className="h-max w-full px-0 py-10">
        <ScrollEffect type="fadeIn">
          <div className="section-header mb-8">
            <h2 className="section-title flex items-center gap-2">
              Work Experience
            </h2>
            <p className="description">
              My professional journey and the companies I've worked with.
            </p>
          </div>
        </ScrollEffect>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-[var(--paragraph)]">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading experience...</span>
          </div>
        </div>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div id="work" className="h-max w-full px-0 py-10">
        <ScrollEffect type="fadeIn">
          <div className="section-header mb-8">
            <h2 className="section-title flex items-center gap-2">
              Work Experience
            </h2>
            <p className="description">
              My professional journey and the companies I've worked with.
            </p>
          </div>
        </ScrollEffect>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-[var(--paragraph)] mb-2">No experience found</p>
            <p className="text-[var(--paragraph)] text-sm opacity-70">
              Experience data will be displayed here once available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="work" className="h-max w-full px-0 py-10">
      <ScrollEffect type="fadeIn">
        <div className="section-header mb-8">
          <h2 className="section-title flex items-center gap-2">
            Work Experience
          </h2>
          <p className="description">
            My professional journey and the companies I've worked with.
          </p>
        </div>
      </ScrollEffect>

      <div className="space-y-8">
        {experiences.map((experience) => (
          <ScrollEffect key={experience._id} type="fadeUp">
            <div className="relative border-l-2 border-[var(--card-border-color)] last:border-l-0">
              {/* Date */}
              <div className="text-sm text-[var(--headline)] font-medium mb-2">
                {formatDateRange(
                  experience.startDate,
                  experience.endDate,
                  experience.current
                )}
              </div>

              {/* Content */}
              <div className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-[12px] p-6 shadow-sm">
                <header>
                  <h3 className={styles.sectionTitle}>
                    <span>{experience.title}</span>{" "}
                    <span className="opacity-60">at</span>{" "}
                    <span>
                      {experience.companyUrl &&
                      experience.companyUrl !== "#" ? (
                        <Link
                          href={experience.companyUrl}
                          target="_blank"
                          className="text-[var(--headline)] hover:underline"
                        >
                          {experience.company}
                        </Link>
                      ) : (
                        <span>{experience.company}</span>
                      )}
                    </span>
                  </h3>
                  <p className={styles.sectionDescription}>
                    {experience.description}
                  </p>
                </header>

                <div className="flex gap-3 pt-2 flex-wrap">
                  {experience.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} className="w-max">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollEffect>
        ))}
      </div>
    </div>
  );
}
