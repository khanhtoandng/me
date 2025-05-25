"use client";

import { cn } from "@/lib/utils";
import { MagicCard } from "../ui/MagicCard";
import { ScrollEffect } from "@/lib/animations";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageSquareQuote } from "lucide-react";
import { useFeaturedRecommendations } from "@/hooks/use-recommendations";

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
              <MessageSquareQuote className="h-6 w-6 text-[var(--link-color)]" />
              Recommendations
            </h2>
            <p className="description">
              Here are some recommendations from people I've worked with.
            </p>
          </div>
        </ScrollEffect>
        <div className="flex flex-col items-center justify-center gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-full max-w-2xl h-32 bg-gray-200 rounded-lg animate-pulse"
            />
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
              <MessageSquareQuote className="h-6 w-6 text-[var(--link-color)]" />
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
            <MessageSquareQuote className="h-6 w-6 text-[var(--link-color)]" />
            Recommendations
          </h2>
          <p className="description">
            Here are some recommendations from people I've worked with.
          </p>
        </div>
      </ScrollEffect>
      <div className="flex flex-col items-center  justify-center gap-6">
        {recommendations.map((recommendation) => (
          <ScrollEffect key={recommendation._id} className="w-full" type="fadeUp">
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
