"use client";

import { Timeline } from "@/components/ui/timeline";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Briefcase, Loader2 } from "lucide-react";
import { ScrollEffect } from "@/lib/animations";
import { useExperiences } from "@/hooks/use-experiences";
import { useMemo } from "react";

export function TimelineDemo() {
  const { experiences, loading, error } = useExperiences();

  const styles = {
    sectionTitle:
      "flex flex-row gap-1 pb-2 text-sm sm:text-lg md:text-xl max-md:text-base max-md:flex-wrap",
    sectionDescription:
      "description opacity-80 mt-0 pb-2 pt-0 text-sm md:text-base",
  };

  // Helper function to format date range
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

  // Transform experiences data for Timeline component
  const timelineData = useMemo(() => {
    return experiences.map((experience) => ({
      title: formatDateRange(
        experience.startDate,
        experience.endDate,
        experience.current
      ),
      content: (
        <section key={experience._id}>
          <header>
            <h2 className={styles.sectionTitle}>
              <span>{experience.title}</span>{" "}
              <span className="opacity-60">at</span>
              <span>
                {experience.companyUrl && experience.companyUrl !== "#" ? (
                  <Link href={experience.companyUrl} target="_blank">
                    {experience.company}
                  </Link>
                ) : (
                  <span>{experience.company}</span>
                )}
              </span>
            </h2>
            <p className={styles.sectionDescription}>
              {experience.description}
            </p>
          </header>

          <div className="flex gap-3 pt-2 md:pb-[28px] flex-wrap max-md:overflow-hidden">
            {experience.skills.map((skill, index) => (
              <Badge key={index} className="w-max">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      ),
    }));
  }, [experiences, styles.sectionTitle, styles.sectionDescription]);

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
  if (timelineData.length === 0) {
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
      <Timeline data={timelineData} />
    </div>
  );
}
