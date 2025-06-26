"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type EducationFormProps = {
  education?: {
    id?: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
  };
};

export function EducationForm({ education }: EducationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [] as string[],
  });

  const [achievementInput, setAchievementInput] = useState("");

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree || "",
        institution: education.institution || "",
        location: education.location || "",
        startDate: education.startDate
          ? new Date(education.startDate).toISOString().split("T")[0]
          : "",
        endDate: education.endDate
          ? new Date(education.endDate).toISOString().split("T")[0]
          : "",
        current: education.current || false,
        description: education.description || "",
        achievements: education.achievements || [],
      });
    }
  }, [education]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));

    // Clear end date if current is checked
    if (name === "current" && checked) {
      setFormData((prev) => ({ ...prev, endDate: "" }));
    }
  };

  const addAchievement = () => {
    if (
      achievementInput.trim() &&
      !formData.achievements.includes(achievementInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()],
      }));
      setAchievementInput("");
    }
  };

  const removeAchievement = (achievement: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a !== achievement),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = education?.id
        ? `/api/education/${education.id}`
        : "/api/education";
      const method = education?.id ? "PUT" : "POST";

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
          description: education?.id
            ? "Education updated successfully"
            : "Education created successfully",
        });
        router.push("/dashboard/education");
        router.refresh();
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting education:", error);
      toast({
        title: "Error",
        description: "Failed to save education. Please try again.",
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
              <Label htmlFor="degree" className="text-[var(--card-headline)]">
                Degree / Certificate
              </Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g. Bachelor of Science in Computer Science"
                className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                required
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label
                htmlFor="institution"
                className="text-[var(--card-headline)]"
              >
                Institution
              </Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="e.g. Stanford University"
                className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                required
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="location" className="text-[var(--card-headline)]">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Stanford, CA or Online"
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
                  htmlFor="startDate"
                  className="text-[var(--card-headline)]"
                >
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="endDate"
                  className="text-[var(--card-headline)]"
                >
                  End Date
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={formData.current}
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                />
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2"
              variants={itemVariants}
            >
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-[var(--input-border-color)] bg-[var(--input-background)]"
              />
              <Label htmlFor="current" className="text-[var(--card-headline)]">
                I am currently studying here
              </Label>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label
                htmlFor="description"
                className="text-[var(--card-headline)]"
              >
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your studies, focus areas, thesis, etc."
                className="min-h-32 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label className="text-[var(--card-headline)]">
                Achievements
              </Label>
              <div className="flex gap-2">
                <Input
                  value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  placeholder="Add an achievement"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addAchievement())
                  }
                />
                <Button
                  type="button"
                  onClick={addAchievement}
                  className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                <AnimatePresence>
                  {formData.achievements.map((achievement) => (
                    <motion.div
                      key={achievement}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex-1 bg-[var(--card-background-effect)] p-2 rounded-md text-[var(--card-paragraph)]">
                        {achievement}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[var(--paragraph)]"
                        onClick={() => removeAchievement(achievement)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
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
                : education?.id
                  ? "Update Education"
                  : "Create Education"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </form>
  );
}
