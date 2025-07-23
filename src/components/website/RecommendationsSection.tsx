"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedRecommendations } from "@/hooks/use-recommendations";
import { ScrollEffect } from "@/lib/animations";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MagicCard } from "../ui/MagicCard";

const styles = {
  section: "w-full",
  headerTitle:
    "font-doto font-bold tracking-wider text-[26px] leading-8  pt-2",
  headerTitleStyle: {
    color: "var(--headline)",
    borderColor: "var(--border)",
  },
  headerSubTitle:
    "font-jetbrains-mono text-sm font-normal tracking-wider",
  headerSubTitleStyle: { color: "var(--secondary)" },
  headerDesc:
    "font-figtree text-sm mt-2 mb-4",
  headerDescStyle: { color: "var(--paragraph)" },
  categoryTitle:
    "text-sm font-figtree font-medium mb-4 uppercase tracking-wider",
  categoryTitleStyle: { color: "var(--paragraph)" },
  skillButton:
    "flex items-center cursor-default rounded-lg px-3 py-2 font-medium text-xs gap-2 shadow transition focus:outline-none",
  skillButtonStyle: {
    backgroundColor: "var(--card-background)",
    border: "1px solid var(--card-border-color)",
    color: "var(--headline)",
  },
};

// Extract initials from full name
const getInitials = (name: string) => {
  const names = name.trim().split(" ");
  const firstInitial = names[0]?.charAt(0).toUpperCase() ?? "";
  const lastInitial = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};

const RecommendationsSection = () => {
  const { recommendations, loading, error } = useFeaturedRecommendations();

  if (loading) {
    return (
      <section className={styles.section + " py-10"}>
        <ScrollEffect type="fadeIn">
          <header className="section-header mb-8">
            <h1
              className={styles.headerTitle}
              style={styles.headerTitleStyle}
              data-ninja-font="doto_bold_normal_rg90b"
            >
              Recommendations{" "}
              <span
                className={styles.headerSubTitle}
                style={styles.headerSubTitleStyle}
                data-ninja-font="jetbrainsmono_regular_normal_smv0q"
              >
                From <Link href="link">LinkedIn</Link>
              </span>
            </h1>
            <p className={styles.headerDesc} style={styles.headerDescStyle}>
              Here are some recommendations from people I've worked with.
            </p>
          </header>
          <div className="flex flex-col w-full items-center justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-full rounded-[12px] pt-16 flex flex-col"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[95%]" />
                  <Skeleton className="h-4 w-[88%]" />
                  <Skeleton className="h-4 w-[92%]" />
                  <Skeleton className="h-4 w-[75%]" />
                </div>
              </div>
            ))}
          </div>
        </ScrollEffect>
      </section>
    );
  }

  if (error || recommendations.length === 0) {
    return (
      <section className={styles.section + " py-10"}>
        <ScrollEffect type="fadeIn">
          <header className="section-header mb-8">
            <h2 className="section-title flex items-center gap-2">
              Recommendations
            </h2>
            <p className="description">
              {error
                ? "Failed to load recommendations"
                : "No recommendations available yet."}
            </p>
          </header>
        </ScrollEffect>
      </section>
    );
  }

  return (
    <section className={styles.section + " py-10"}>
      <ScrollEffect type="fadeIn">
        <header className="section-header mb-8">
          <h2 className="section-title flex items-center gap-2">Recommendations</h2>
          <p className="description">
            Here are some recommendations from people I've worked with.
          </p>
        </header>
      </ScrollEffect>
      <div className="flex flex-col items-center justify-center gap-6">
        {recommendations.map(({ _id, avatar, name, position, company, text }) => (
          <ScrollEffect key={_id} className="w-full" type="fadeUp">
            <MagicCard
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              gradientColor="#7e7e7e12"
              className={cn("flex h-max w-full p-8")}
            >
              <header className="flex items-start gap-2">
                <Avatar className="bg-[var(--secondary)] border border-[var(--input-border-color)]">
                  {avatar ? (
                    <AvatarImage src={avatar} alt={name} />
                  ) : (
                    <AvatarFallback className="text-[var(--headline)]">
                      {getInitials(name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="pt-1 text-start">
                  <h3 className="text-sm font-semibold text-[var(--card-headline)]">
                    {name}
                  </h3>
                  <p className="text-sm text-[var(--card-paragraph)]">
                    {position} at {company}
                  </p>
                </div>
              </header>

              <blockquote className="mt-4 relative text-start">
                <span className="absolute -left-2 -top-2 text-4xl text-[var(--link-color)] opacity-20">
                  &ldquo;
                </span>
                <p className="mt-0 line-clamp-6 text-[var(--card-paragraph)] relative z-10">
                  {text}
                </p>
                <span className="absolute -bottom-4 -right-2 text-4xl text-[var(--link-color)] opacity-20">
                  &rdquo;
                </span>
              </blockquote>
            </MagicCard>
          </ScrollEffect>
        ))}
      </div>
    </section>
  );
};

export default RecommendationsSection;
