"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MagicCard } from "../ui/MagicCard";
import Link from "next/link";

interface ReusableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  date?: string;
  description?: string;
  skills?: string[];
  websiteLink?: string;
  githubLink?: string;
  t?: (key: string) => string;
  linkStyle?: string;
  img?: string;
  coverImg?: string;
  suptitle?: string;
}

const ReusableCard = React.forwardRef<HTMLDivElement, ReusableCardProps>(
  (
    {
      id,
      title,
      date,
      description,
      skills = [],
      websiteLink,
      githubLink,
      t = (key: string) => key,
      linkStyle = "",
      img,
      coverImg,
      suptitle,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <MagicCard
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        gradientColor="#7e7e7e12"
        ref={ref}
        className={cn(
          "group overflow-hidden transition-all duration-300",
          "border-[var(--card-border-color)] bg-[var(--card-background)]",
          className,
        )}
        {...props}
      >
        {coverImg && (
          <div className="relative w-full h-52 overflow-hidden rounded-t-md">
            <div
              className="absolute inset-0 bg-cover bg-center blur-[100px]"
              style={{ backgroundImage: `url(${coverImg})` }}
            ></div>
            <img
              src={coverImg}
              alt={title ? `${title} - Cover Image` : "Cover Image"}
              className="w-full h-full object-contain z-50 transition-transform duration-300 rounded-[12px] scale-105"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x225?text=Loading...";
              }}
            />
          </div>
        )}

        <CardHeader className="p-4 flex flex-col  items-start justify-between space-y-3">
          <div className="flex flex-col space-y-2">
            {title && (
              <CardTitle className="text-lg    font-semibold">
                <Link
                  href={websiteLink || githubLink || "#"}
                  className="text-[var(--card-headline)] max-md:flex-wrap   transition-colors hover:text-[var(--link-hover)] flex items-center"
                >
                  <span>{title}</span>
                  {/* <ExternalLink className="ms-2 h-4 w-4 max-md:hidden" /> */}
                </Link>
              </CardTitle>
            )}
            {suptitle && (
              <CardDescription className="text-sm text-[var(--card-paragraph)]">
                {suptitle}
              </CardDescription>
            )}
          </div>

          {date && (
            <CardDescription className="flex items-center justify-between text-sm text-[var(--card-paragraph)]">
              <span>{date}</span>
              {img && (
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={img}
                    alt={title ? `${title} - Profile Image` : "Profile Image"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/100?text=Profile";
                    }}
                  />
                </div>
              )}
            </CardDescription>
          )}
        </CardHeader>

        {description && (
          <CardContent className="p-4">
            <p className="text-sm text-[var(--card-paragraph)]">
              {description}
            </p>
          </CardContent>
        )}

        <CardFooter className="p-4 flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-[var(--badge-background)] text-xs text-[var(--badge-text)]"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex max-md:w-full flex-wrap gap-4">
            {websiteLink && (
              <Link
                href={websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors",
                  "text-[var(--link-color)] hover:text-[var(--link-hover)]",
                  "max-md:w-full max-md:bg-[var(--border)] max-md:p-2 max-md:rounded-[8px] max-md:text-center ",
                  linkStyle,
                )}
              >
                <Globe className="h-4 w-4" />
                <span>Visit Website</span>
              </Link>
            )}

            {githubLink && (
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors",
                  "text-[var(--link-color)] hover:text-[var(--link-hover)]",
                  "max-md:w-full max-md:bg-[var(--border)] max-md:p-2 max-md:rounded-[8px] max-md:text-center ",
                  linkStyle,
                )}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Visit Github</span>
              </Link>
            )}
          </div>
        </CardFooter>
      </MagicCard>
    );
  },
);

ReusableCard.displayName = "ReusableCard";

export default ReusableCard;
