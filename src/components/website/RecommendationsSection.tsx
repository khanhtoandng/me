"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedRecommendations } from "@/hooks/use-recommendations";
import { ScrollEffect } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MagicCard } from "../ui/MagicCard";

const RecommendationsSection = () => {
  const { recommendations, loading, error } = useFeaturedRecommendations();

  // Function to extract first letters of first and last name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const firstInitial = names[0]?.charAt(0).toUpperCase();
    const lastInitial = names[1]?.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  if (loading) {
    return (
      <div className="section py-10">
        <ScrollEffect type="fadeIn">
          <div className="section-header mb-8">
            <h2 className="section-title flex items-center gap-2">
              Recommendations
            </h2>
            <p className="description">
              Here are some recommendations from people I've worked with.
            </p>
          </div>
        </ScrollEffect>
        <div className="flex flex-col w-full  items-center justify-center gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-full  rounded-[12px] pt-16 flex flex-col "
            >
              <div className="flex items-start gap-4">
                {/* Avatar Skeleton */}
                <Skeleton className="h-10 w-full rounded-full flex-shrink-0" />

                {/* Header Content Skeleton */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>

              {/* Quote Content Skeleton */}
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
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return (
      <div className="section py-10">
        <ScrollEffect type="fadeIn">
          <div className="section-header mb-8">
            <h2 className="section-title flex items-center gap-2">
              Recommendations
            </h2>
            <p className="description">
              {error
                ? "Failed to load recommendations"
                : "No recommendations available yet."}
            </p>
          </div>
        </ScrollEffect>
      </div>
    );
  }

  return (
    <div className="section py-10">
      <ScrollEffect type="fadeIn">
        <div className="section-header mb-8">
          <h2 className="section-title flex items-center gap-2">
            Recommendations
          </h2>
          <p className="description">
            Here are some recommendations from people I've worked with.
          </p>
        </div>
      </ScrollEffect>
      <div className="flex flex-col items-center  justify-center gap-6">
        {recommendations.map((recommendation) => (
          <ScrollEffect
            key={recommendation._id}
            className="w-full"
            type="fadeUp"
          >
            <MagicCard
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              gradientColor="#7e7e7e12"
              className={cn("flex h-max w-full p-8 ")}
              ref={undefined}
            >
              <header className="flex items-start gap-2">
                {recommendation.avatar ? (
                  <Avatar className="bg-[var(--secondary)] border border-[var(--input-border-color)]">
                    <AvatarImage
                      src={recommendation.avatar}
                      alt={recommendation.name}
                    />
                    <AvatarFallback className="text-[var(--headline)]">
                      {getInitials(recommendation.name)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="bg-[var(--secondary)] border border-[var(--input-border-color)]">
                    <AvatarFallback className="text-[var(--headline)]">
                      {getInitials(recommendation.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="pt-1 text-start">
                  <h3 className="text-sm font-semibold text-[var(--card-headline)]">
                    {recommendation.name}
                  </h3>
                  <p className="text-sm text-[var(--card-paragraph)]">
                    {recommendation.position} at {recommendation.company}
                  </p>
                </div>
              </header>

              <div className="mt-4 relative">
                <span className="absolute -left-2 -top-2 text-4xl text-[var(--link-color)] opacity-20">
                  "
                </span>
                <p className="mt-0 line-clamp-6 text-start text-[var(--card-paragraph)] relative z-10">
                  {recommendation.text}
                </p>
                <span className="absolute -bottom-4 -right-2 text-4xl text-[var(--link-color)] opacity-20">
                  "
                </span>
              </div>
            </MagicCard>
          </ScrollEffect>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
