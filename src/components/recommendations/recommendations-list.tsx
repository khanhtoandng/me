"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Calendar,
  Quote,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Recommendation = {
  _id: string;
  name: string;
  position: string;
  company: string;
  text: string;
  relationship: string;
  avatar?: string;
  featured: boolean;
  date: string;
};

export function RecommendationsList() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const response = await fetch("/api/recommendations");
        const data = await response.json();

        if (data.success) {
          setRecommendations(data.data);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast({
          title: "Error",
          description: "Failed to load recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [toast]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this recommendation?")) {
      try {
        const response = await fetch(`/api/recommendations/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          setRecommendations(recommendations.filter((rec) => rec._id !== id));
          toast({
            title: "Success",
            description: "Recommendation deleted successfully",
          });
        } else {
          throw new Error(data.error || "Failed to delete recommendation");
        }
      } catch (error) {
        console.error("Error deleting recommendation:", error);
        toast({
          title: "Error",
          description: "Failed to delete recommendation. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--skeleton-color)] animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-[var(--skeleton-color)] rounded animate-pulse" />
                    <div className="h-4 w-48 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="h-5 w-24 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  <div className="h-5 w-20 bg-[var(--skeleton-color)] rounded animate-pulse" />
                </div>
                <Separator className="bg-[var(--card-border-color)]" />
                <div className="h-20 w-full bg-[var(--skeleton-color)] rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
        <h3 className="text-xl font-semibold text-[var(--card-headline)]">
          No recommendations found
        </h3>
        <p className="text-[var(--card-paragraph)] mt-2">
          Start by adding your first recommendation
        </p>
        <Link href="/dashboard/recommendations/new">
          <Button className="mt-4 mx-auto bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]">
            <Plus className="mr-2 h-4 w-4" />
            Add Recommendation
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
      {recommendations.map((recommendation) => (
        <motion.div key={recommendation._id} variants={itemVariants}>
          <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={recommendation.avatar || "/placeholder.svg"}
                      alt={recommendation.name}
                    />
                    <AvatarFallback className="bg-[var(--button2)] text-[var(--button-text)]">
                      {recommendation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-[var(--card-headline)]">
                      {recommendation.name}
                    </CardTitle>
                    <div className="text-[var(--card-paragraph)]">
                      {recommendation.position} at {recommendation.company}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/recommendations/${recommendation._id}/edit`}
                  >
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
                    onClick={() => handleDelete(recommendation._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className="border-[var(--card-border-color)]"
                  >
                    {recommendation.relationship}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-[var(--card-paragraph)]">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(recommendation.date)}
                  </div>
                  {recommendation.featured && (
                    <Badge className="bg-[var(--tertiary)] text-[var(--button-text)]">
                      Featured
                    </Badge>
                  )}
                </div>
                <Separator className="bg-[var(--card-border-color)]" />
                <div className="relative pl-6 text-sm text-[var(--card-paragraph)]">
                  <Quote className="absolute left-0 top-0 h-4 w-4 text-[var(--button)]" />
                  <p className="italic">{recommendation.text}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[var(--card-border-color)] text-[var(--paragraph)]"
              >
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                View on LinkedIn
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
