"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type RecommendationFormProps = {
  recommendation?: {
    id?: string;
    name: string;
    position: string;
    company: string;
    text: string;
    relationship: string;
    avatar?: string;
    featured: boolean;
    date: string;
  };
};

export function RecommendationForm({
  recommendation,
}: RecommendationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    text: "",
    relationship: "Client",
    avatar: "",
    featured: false,
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (recommendation) {
      setFormData({
        name: recommendation.name || "",
        position: recommendation.position || "",
        company: recommendation.company || "",
        text: recommendation.text || "",
        relationship: recommendation.relationship || "Client",
        avatar: recommendation.avatar || "",
        featured: recommendation.featured || false,
        date: recommendation.date
          ? new Date(recommendation.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [recommendation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = recommendation?.id
        ? `/api/recommendations/${recommendation.id}`
        : "/api/recommendations";
      const method = recommendation?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: recommendation?.id
            ? "Recommendation updated successfully"
            : "Recommendation created successfully",
        });
        router.push("/dashboard/recommendations");
        router.refresh();
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      toast({
        title: "Error",
        description: "Failed to save recommendation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
          <CardContent className="p-6 space-y-6">
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="name" className="text-[var(--card-headline)]">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                required
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="position"
                  className="text-[var(--card-headline)]"
                >
                  Position
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. CTO"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-[var(--card-headline)]"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Inc."
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  required
                />
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="text" className="text-[var(--card-headline)]">
                Recommendation Text
              </Label>
              <Textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Enter the recommendation text"
                className="min-h-32 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                required
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="relationship"
                  className="text-[var(--card-headline)]"
                >
                  Relationship
                </Label>
                <Select
                  value={formData.relationship}
                  onValueChange={(value) =>
                    handleSelectChange("relationship", value)
                  }
                >
                  <SelectTrigger className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--card-background)] border-[var(--card-border-color)] text-[var(--card-headline)]">
                    <SelectItem value="Client">Client</SelectItem>
                    <SelectItem value="Colleague">Colleague</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[var(--card-headline)]">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  required
                />
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="avatar" className="text-[var(--card-headline)]">
                Avatar URL (Optional)
              </Label>
              <Input
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
              />
            </motion.div>

            <motion.div
              className="flex items-center space-x-2"
              variants={itemVariants}
            >
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-[var(--input-border-color)] bg-[var(--input-background)]"
              />
              <Label htmlFor="featured" className="text-[var(--card-headline)]">
                Feature this recommendation on your portfolio
              </Label>
            </motion.div>
          </CardContent>
          <CardFooter className="px-6 py-4 border-t border-[var(--card-border-color)] flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[var(--card-border-color)] text-[var(--paragraph)] hover:bg-[var(--card-hover)] hover:text-[var(--link-hover)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
            >
              {isSubmitting
                ? "Saving..."
                : recommendation?.id
                  ? "Update Recommendation"
                  : "Create Recommendation"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </form>
  );
}
