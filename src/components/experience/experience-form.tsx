"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { AITextEnhancer } from "@/components/ui/ai-text-enhancer";

type ExperienceFormProps = {
  experience?: {
    id?: string;
    title: string;
    company: string;
    companyUrl?: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    skills: string[];
  };
};

export function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    companyUrl: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    skills: [] as string[],
  });

  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title || "",
        company: experience.company || "",
        companyUrl: experience.companyUrl || "",
        location: experience.location || "",
        startDate: experience.startDate
          ? new Date(experience.startDate).toISOString().split("T")[0]
          : "",
        endDate: experience.endDate
          ? new Date(experience.endDate).toISOString().split("T")[0]
          : "",
        current: experience.current || false,
        description: experience.description || "",
        skills: experience.skills || [],
      });
    }
  }, [experience]);

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

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = experience?.id
        ? `/api/experiences/${experience.id}`
        : "/api/experiences";
      const method = experience?.id ? "PUT" : "POST";

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
          description: experience?.id
            ? "Experience updated successfully"
            : "Experience created successfully",
        });
        router.push("/dashboard/experience");
        router.refresh();
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting experience:", error);
      toast({
        title: "Error",
        description: "Failed to save experience. Please try again.",
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
              <Label htmlFor="title" className="text-[var(--card-headline)]">
                Job Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
                className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                required
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="company" className="text-[var(--card-headline)]">
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
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label
                htmlFor="companyUrl"
                className="text-[var(--card-headline)]"
              >
                Company URL (Optional)
              </Label>
              <Input
                id="companyUrl"
                name="companyUrl"
                value={formData.companyUrl}
                onChange={handleChange}
                placeholder="e.g. https://company.com"
                className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
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
                placeholder="e.g. San Francisco, CA or Remote"
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
                I currently work here
              </Label>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label
                htmlFor="description"
                className="text-[var(--card-headline)]"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your responsibilities and achievements"
                className="min-h-32 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                required
              />
              <AITextEnhancer
                originalText={formData.description}
                onTextUpdate={(newText) =>
                  setFormData((prev) => ({ ...prev, description: newText }))
                }
                type="experience"
                placeholder="Enhance experience description..."
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label className="text-[var(--card-headline)]">Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSkill())
                  }
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <AnimatePresence>
                  {formData.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className="bg-[var(--button2)] text-[var(--button-text)] flex items-center gap-1">
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
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
                : experience?.id
                  ? "Update Experience"
                  : "Create Experience"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </form>
  );
}
