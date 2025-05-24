"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Education = {
  _id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
};

export function EducationList() {
  const { toast } = useToast();
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducations() {
      try {
        setLoading(true);
        const response = await fetch("/api/education");
        const data = await response.json();

        if (data.success) {
          setEducations(data.data);
        }
      } catch (error) {
        console.error("Error fetching education entries:", error);
        toast({
          title: "Error",
          description: "Failed to load education entries. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchEducations();
  }, [toast]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      try {
        const response = await fetch(`/api/education/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          setEducations(educations.filter((edu) => edu._id !== id));
          toast({
            title: "Success",
            description: "Education entry deleted successfully",
          });
        } else {
          throw new Error(data.error || "Failed to delete education entry");
        }
      } catch (error) {
        console.error("Error deleting education:", error);
        toast({
          title: "Error",
          description: "Failed to delete education entry. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="bg-[var(--card-background)] border-[var(--card-border-color)]"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between w-full">
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  <div className="h-4 w-32 bg-[var(--skeleton-color)] rounded animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="h-4 w-32 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  <div className="h-4 w-24 bg-[var(--skeleton-color)] rounded animate-pulse" />
                </div>
                <Separator className="bg-[var(--card-border-color)]" />
                <div className="h-16 w-full bg-[var(--skeleton-color)] rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (educations.length === 0) {
    return (
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
        <h3 className="text-xl font-semibold text-[var(--card-headline)]">
          No education entries found
        </h3>
        <p className="text-[var(--card-paragraph)] mt-2">
          Start by adding your first education entry
        </p>
        <Link href="/dashboard/education/new">
          <Button className="mt-4 mx-auto bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]">
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {educations.map((education) => (
        <motion.div key={education._id} variants={itemVariants}>
          <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between w-full">
                <div>
                  <CardTitle className="text-xl text-[var(--card-headline)]">
                    {education.degree}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-[var(--card-paragraph)]">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {education.institution}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/education/${education._id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[var(--paragraph)]"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[var(--paragraph)]"
                    onClick={() => handleDelete(education._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--card-paragraph)]">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {formatDate(education.startDate)} -{" "}
                      {education.current
                        ? "Present"
                        : formatDate(education.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{education.location}</span>
                  </div>
                  {education.current && (
                    <Badge className="bg-[var(--tertiary)] text-[var(--button-text)]">
                      Current
                    </Badge>
                  )}
                </div>
                <Separator className="bg-[var(--card-border-color)]" />
                {education.description && (
                  <p className="text-sm text-[var(--card-paragraph)]">
                    {education.description}
                  </p>
                )}
                {education.achievements &&
                  education.achievements.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-[var(--card-headline)] flex items-center gap-1">
                        <Award className="h-3.5 w-3.5" />
                        Achievements
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-[var(--card-paragraph)]">
                        {education.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
