"use client";

import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { useEducation } from "@/hooks/use-education";
import { Skeleton } from "@/components/ui/skeleton";

export default function Education() {
  const [isMounted, setIsMounted] = useState(false);
  const { education, loading, error } = useEducation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format date range
  const formatDateRange = (
    startDate: string,
    endDate?: string,
    current?: boolean,
  ) => {
    const start = new Date(startDate).getFullYear();
    if (current) {
      return `${start} - Present`;
    }
    const end = endDate ? new Date(endDate).getFullYear() : start;
    return start === end ? `${start}` : `${start} - ${end}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-0 flex-col gap-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-24" />

        {/* Education Items Skeleton */}
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="rounded-[12px] bg-[var(--card-background)] border border-[var(--card-border-color)] p-3"
          >
            <div className="flex">
              <div className="flex-none">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <div className="flex-grow ml-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || education.length === 0) {
    return (
      <div className="flex min-h-0 flex-col gap-y-3">
        <h2 className="text-xl font-bold text-[var(--headline)]">Education</h2>
        <div className="text-center py-4 text-[var(--paragraph)]">
          {error
            ? "Failed to load education data"
            : "No education data available"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-col gap-y-3">
      {/* Education Title */}
      <div
        style={{
          opacity: isMounted ? 1 : 0,
          filter: isMounted ? "blur(0px)" : "blur(2px)",
          transform: isMounted
            ? "translateY(-6px) translateZ(0px)"
            : "translateY(0px) translateZ(0px)",
          transition:
            "opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease",
        }}
      >
        <h2 className="text-xl font-bold text-[var(--headline)]">Education</h2>
      </div>

      {/* Education Items */}
      {education.map((item, index) => (
        <div
          key={item._id}
          style={{
            opacity: isMounted ? 1 : 0,
            filter: isMounted ? "blur(0px)" : "blur(2px)",
            transform: isMounted
              ? "translateY(-6px) translateZ(0px)"
              : "translateY(0px) translateZ(0px)",
            transition:
              "opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease",
            transitionDelay: `${(index + 1) * 0.1}s`,
          }}
        >
          <div className="block cursor-default">
            <div className="rounded-[12px] bg-[var(--card-background)] text-[var(--paragraph)] flex border border-[var(--card-border-color)] p-3 hover:bg-[var(--card-hover)] transition-colors">
              <div className="flex-none">
                <span className="relative flex shrink-0 overflow-hidden rounded-full border border-[var(--card-border-color)] size-12 m-auto bg-[var(--background)]">
                  <GraduationCap className="h-6 w-6 m-auto text-[var(--link-color)]" />
                </span>
              </div>
              <div className="flex-grow ml-4 items-center flex-col group py-1">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm text-[var(--headline)]">
                      {item.institution}
                    </h3>
                    <div className="text-xs sm:text-sm tabular-nums text-[var(--paragraph)] text-right">
                      {formatDateRange(
                        item.startDate,
                        item.endDate,
                        item.current,
                      )}
                    </div>
                  </div>
                  <div className="font-sans text-xs text-[var(--paragraph)]">
                    {item.degree}
                  </div>
                  {item.location && (
                    <div className="font-sans text-xs text-[var(--paragraph)] opacity-70">
                      {item.location}
                    </div>
                  )}
                  {item.description && (
                    <div className="font-sans text-xs text-[var(--paragraph)] mt-1 opacity-80">
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
