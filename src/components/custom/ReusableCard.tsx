/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, Github } from "lucide-react";
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
  coverImg?: string; // New prop for cover image
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
      coverImg, // Destructure coverImg prop
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
        ref={ref}
        gradientColor="#7e7e7e12"
        className={cn("px-4 pb-4 pt-2", className)}
        {...props}
      >
        {coverImg && (
          <div className="w-full">
            <img
              src={coverImg}
              alt={title || "Cover Image"}
              className="roud mb-1 h-[200px] w-full rounded-[10px] object-cover"
            />
          </div>
        )}
        <CardHeader className="flex items-center justify-between py-2 max-md:flex-col max-md:items-start">
          {img && (
            <img
              src={img}
              alt={title || "Image"}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}
          {title && (
            <CardTitle className="text-base font-semibold leading-6 tracking-tight text-[var(--headline)]">
              {title}
            </CardTitle>
          )}
          {suptitle && (
            <h3 className="mt-1 text-sm text-[var(--subtitle)]">{suptitle}</h3>
          )}
          {date && (
            <CardDescription className="text-sm text-[var(--paragraph)] max-md:mb-0 max-md:mt-1">
              {date}
            </CardDescription>
          )}
        </CardHeader>

        {description && (
          <CardContent>
            <CardDescription className="mb-6 mt-0 max-w-lg py-2 pb-4 text-sm text-[var(--paragraph)]">
              {description}
            </CardDescription>
          </CardContent>
        )}

        <CardFooter className="mt-4 flex w-full flex-wrap items-center justify-between max-md:flex-col max-md:items-start">
          {skills.length > 0 && (
            <div className="flex max-w-[60%] flex-wrap gap-2 max-md:mb-0 max-md:mt-4 max-md:max-w-full">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4 max-md:mt-5">
            {websiteLink && (
              <a
                href={websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("flex items-center gap-1", linkStyle)}
              >
                <Globe className="h-4 w-4" />
                <span>{t("links.visitWebsite")}</span>
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("flex items-center gap-1", linkStyle)}
              >
                <Github className="h-4 w-4" />
                <span>{t("links.visitGithub")}</span>
              </a>
            )}
          </div>
        </CardFooter>
      </MagicCard>
    );
  },
);

ReusableCard.displayName = "ReusableCard";

export default ReusableCard;
