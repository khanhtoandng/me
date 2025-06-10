"use client";

import { useState, useEffect } from "react";
import { ExperienceForm } from "@/components/experience/experience-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";

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
}

export default function EditExperiencePage() {
  const params = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperience() {
      try {
        setLoading(true);
        const response = await fetch(`/api/experiences/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setExperience(data.data);
        } else {
          setError(data.error || "Failed to fetch experience");
        }
      } catch (err) {
        console.error("Error fetching experience:", err);
        setError("Failed to fetch experience");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchExperience();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[var(--headline)]">
          Edit Experience
        </h1>
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
          <p className="text-[var(--card-paragraph)]">{error}</p>
        </Card>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[var(--headline)]">
          Edit Experience
        </h1>
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
          <h3 className="text-xl font-semibold text-[var(--card-headline)] mb-2">
            Experience Not Found
          </h3>
          <p className="text-[var(--card-paragraph)]">
            The experience you're looking for doesn't exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Edit Experience
      </h1>
      <ExperienceForm
        experience={{
          id: experience._id,
          title: experience.title,
          company: experience.company,
          companyUrl: experience.companyUrl,
          location: experience.location,
          startDate: experience.startDate,
          endDate: experience.endDate,
          current: experience.current,
          description: experience.description,
          skills: experience.skills,
        }}
      />
    </div>
  );
}
