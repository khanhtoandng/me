"use client";

import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Briefcase, Loader2 } from "lucide-react";
import { ScrollEffect } from "@/lib/animations";

interface Experience {
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
  createdAt: string;
  updatedAt: string;
}

export function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/experiences");
        const data = await response.json();

        if (data.success) {
          setExperiences(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch experiences");
        }
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [isMounted]);

  // Helper function to format date range
  const formatDateRange = (
    startDate: string,
    endDate?: string,
    current?: boolean,
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

  // Loading state
  if (loading) {
    return (
      <div id="work" className="h-max w-full px-0 py-10">
        <ScrollEffect type="fadeIn">
          <div className="section-header mb-8">
            <h2 className="section-title flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-[var(--link-color)]" />
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

  // Error state
  if (error) {
    return (
      <div id="work" className="h-max w-full px-0 py-10">
        <ScrollEffect type="fadeIn">
          <div className="section-header mb-8">
            <h2 className="section-title flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-[var(--link-color)]" />
              Work Experience
            </h2>
            <p className="description">
              My professional journey and the companies I've worked with.
            </p>
          </div>
        </ScrollEffect>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-500 mb-2">Failed to load experience</p>
            <p className="text-[var(--paragraph)] text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No experiences state
  if (experiences.length === 0) {
    return (
      <div id="work" className="h-max w-full px-0 py-10">
        <ScrollEffect type="fadeIn">
          <div className="section-header mb-8">
            <h2 className="section-title flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-[var(--link-color)]" />
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
            <Briefcase className="h-6 w-6 text-[var(--link-color)]" />
            Work Experience
          </h2>
          <p className="description">
            My professional journey and the companies I've worked with.
          </p>
        </div>
      </ScrollEffect>

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <ScrollEffect key={experience._id} type="fadeUp">
            <div className="relative pl-8 border-l-2 border-[var(--card-border-color)] last:border-l-0">
              {/* Timeline dot */}
              <div className="absolute -left-2 top-0 w-4 h-4 bg-[var(--link-color)] rounded-full border-2 border-[var(--background)]"></div>

              {/* Date */}
              <div className="text-sm text-[var(--link-color)] font-medium mb-2">
                {formatDateRange(
                  experience.startDate,
                  experience.endDate,
                  experience.current,
                )}
              </div>

              {/* Content */}
              <div className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-[12px] p-6 shadow-sm">
                <header>
                  <h3 className={styles.sectionTitle}>
                    <span>{experience.title}</span>{" "}
                    <span className="opacity-60">at</span>
                    <span>
                      {experience.companyUrl &&
                      experience.companyUrl !== "#" ? (
                        <Link
                          href={experience.companyUrl}
                          target="_blank"
                          className="text-[var(--link-color)] hover:underline"
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
