"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MagicCard } from "../ui/MagicCard";

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
    ref
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
          className
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
              alt={"Cover Image"}
              className="w-full h-full object-contain z-50 transition-transform duration-300  rounded-lg scale-105"
            />
          </div>
        )}

        <CardHeader className="p-4 flex flex-col  items-start justify-between space-y-3">
          <div className="flex flex-col space-y-2">
            {title && (
              <CardTitle className="text-lg    font-semibold">
                <a
                  href={websiteLink || githubLink || "#"}
                  className="text-[var(--card-headline)] max-md:flex-wrap   transition-colors hover:text-[var(--link-hover)] flex items-center"
                >
                  <span>{title}</span>
                  {/* <ExternalLink className="ms-2 h-4 w-4 max-md:hidden" /> */}
                </a>
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
                    alt={title || "Profile Image"}
                    className="w-full h-full object-cover"
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
              <a
                href={websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors",
                  "text-[var(--link-color)] hover:text-[var(--link-hover)]",
                  "max-md:w-full max-md:bg-[var(--border)] max-md:p-2 max-md:rounded-[8px] max-md:text-center ",
                  linkStyle
                )}
              >
                <Globe className="h-4 w-4" />
                <span>Visit Website</span>
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors",
                  "text-[var(--link-color)] hover:text-[var(--link-hover)]",
                  "max-md:w-full max-md:bg-[var(--border)] max-md:p-2 max-md:rounded-[8px] max-md:text-center ",
                  linkStyle
                )}
              >
                <Github className="h-4 w-4" />
                <span>Visit Github</span>
              </a>
            )}
          </div>
        </CardFooter>
      </MagicCard>
    );
  }
);

ReusableCard.displayName = "ReusableCard";

export default ReusableCard;
