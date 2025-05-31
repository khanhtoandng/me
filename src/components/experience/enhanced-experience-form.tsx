"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Briefcase,
  Sparkles,
  Loader2,
  Plus,
  X,
  Wand2,
  Brain,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  enhanceExperienceDescription,
  enhanceLocation,
  processSkillsWithAI,
  validateTextForAI,
  isAIServiceAvailable,
} from "@/lib/ai-service";
import { EXPERIENCE_CONFIG } from "@/lib/constants";

interface Experience {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  type: string;
  skills: string[];
  achievements: string[];
  order?: number;
}

interface EnhancedExperienceFormProps {
  experience?: Experience;
  onSubmit: (data: Omit<Experience, "_id"> & { _id?: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EnhancedExperienceForm({
  experience,
  onSubmit,
  onCancel,
  isLoading = false,
}: EnhancedExperienceFormProps) {
  const [formData, setFormData] = useState<
    Omit<Experience, "_id"> & { _id?: string }
  >({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
    location: "",
    type: "full-time",
    skills: [],
    achievements: [],
    ...experience,
  });

  const [aiEnhancing, setAiEnhancing] = useState({
    description: false,
    location: false,
    skills: false,
  });

  const [rawSkillsText, setRawSkillsText] = useState("");
  const [showSkillsProcessor, setShowSkillsProcessor] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newAchievement, setNewAchievement] = useState("");

  // Pre-populate form when editing
  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company || "",
        position: experience.position || "",
        description: experience.description || "",
        startDate: experience.startDate || "",
        endDate: experience.endDate || "",
        current: experience.current || false,
        location: experience.location || "",
        type: experience.type || "full-time",
        skills: experience.skills || [],
        achievements: experience.achievements || [],
        order: experience.order,
        _id: experience._id,
      });
    }
  }, [experience]);

  const handleInputChange = (
    field: keyof (Omit<Experience, "_id"> & { _id?: string }),
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.position.trim()) {
      toast.error("Company and position are required");
      return;
    }

    try {
      await onSubmit(formData);
      toast.success(
        experience
          ? "Experience updated successfully!"
          : "Experience added successfully!"
      );
    } catch (error) {
      toast.error("Failed to save experience");
    }
  };

  const enhanceDescription = async () => {
    if (!formData.description.trim()) {
      toast.error("Please enter a description first");
      return;
    }

    const validation = validateTextForAI(formData.description);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setAiEnhancing((prev) => ({ ...prev, description: true }));

    try {
      const result = await enhanceExperienceDescription(formData.description);

      if (result.success && typeof result.data === "string") {
        setFormData((prev) => ({
          ...prev,
          description: result.data as string,
        }));
        toast.success("Description enhanced successfully!");
      } else {
        toast.error(result.error || "Failed to enhance description");
      }
    } catch (error) {
      toast.error("AI enhancement failed");
    } finally {
      setAiEnhancing((prev) => ({ ...prev, description: false }));
    }
  };

  const enhanceLocationField = async () => {
    if (!formData.location?.trim()) {
      toast.error("Please enter a location first");
      return;
    }

    setAiEnhancing((prev) => ({ ...prev, location: true }));

    try {
      const result = await enhanceLocation(formData.location);

      if (result.success && typeof result.data === "string") {
        setFormData((prev) => ({
          ...prev,
          location: result.data as string,
        }));
        toast.success("Location formatted successfully!");
      } else {
        toast.error(result.error || "Failed to enhance location");
      }
    } catch (error) {
      toast.error("AI enhancement failed");
    } finally {
      setAiEnhancing((prev) => ({ ...prev, location: false }));
    }
  };

  const processSkills = async () => {
    if (!rawSkillsText.trim()) {
      toast.error("Please enter skills text first");
      return;
    }

    setAiEnhancing((prev) => ({ ...prev, skills: true }));

    try {
      const result = await processSkillsWithAI(rawSkillsText);

      if (result.success && Array.isArray(result.data)) {
        const newSkills = result.data as string[];
        const combinedSkills = [...new Set([...formData.skills, ...newSkills])];

        setFormData((prev) => ({
          ...prev,
          skills: combinedSkills,
        }));

        setRawSkillsText("");
        setShowSkillsProcessor(false);
        toast.success(`Added ${newSkills.length} skills successfully!`);
      } else {
        toast.error(result.error || "Failed to process skills");
      }
    } catch (error) {
      toast.error("AI processing failed");
    } finally {
      setAiEnhancing((prev) => ({ ...prev, skills: false }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const addAchievement = () => {
    if (
      newAchievement.trim() &&
      !formData.achievements.includes(newAchievement.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }));
      setNewAchievement("");
    }
  };

  const removeAchievement = (achievementToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter(
        (achievement) => achievement !== achievementToRemove
      ),
    }));
  };

  const isAIAvailable = isAIServiceAvailable();

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {experience ? "Edit Experience" : "Add New Experience"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Company name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) =>
                    handleInputChange("position", e.target.value)
                  }
                  placeholder="Job title"
                  required
                />
              </div>
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Employment Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_CONFIG.types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location with AI Enhancement */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="City, State, Country"
                  className="flex-1"
                />
                {isAIAvailable && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={enhanceLocationField}
                    disabled={
                      aiEnhancing.location || !formData.location?.trim()
                    }
                    className="shrink-0"
                  >
                    {aiEnhancing.location ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="h-4 w-4" />
                    )}
                    Format
                  </Button>
                )}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  disabled={formData.current}
                />
              </div>
            </div>

            {/* Current Position Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="current"
                checked={formData.current}
                onCheckedChange={(checked) => {
                  handleInputChange("current", checked);
                  if (checked) {
                    handleInputChange("endDate", "");
                  }
                }}
              />
              <Label htmlFor="current">I currently work here</Label>
            </div>

            {/* Description with AI Enhancement */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                Description
                {isAIAvailable && (
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Enhanced
                  </Badge>
                )}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe your role and responsibilities..."
                rows={4}
                className="resize-none"
              />
              {isAIAvailable && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={enhanceDescription}
                  disabled={
                    aiEnhancing.description || !formData.description.trim()
                  }
                  className="w-full"
                >
                  {aiEnhancing.description ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Enhancing with AI...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Enhance with AI
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Skills Section with AI Processing */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  Skills
                  {isAIAvailable && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI Powered
                    </Badge>
                  )}
                </Label>
                {isAIAvailable && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSkillsProcessor(true)}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Process with AI
                  </Button>
                )}
              </div>

              {/* Manual Skill Addition */}
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSkill())
                  }
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Skills Display */}
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {formData.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="space-y-4">
              <Label>Key Achievements</Label>

              <div className="flex gap-2">
                <Input
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Add an achievement..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addAchievement())
                  }
                />
                <Button type="button" onClick={addAchievement} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <AnimatePresence>
                  {formData.achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="flex-1 text-sm">{achievement}</span>
                      <button
                        type="button"
                        onClick={() => removeAchievement(achievement)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.company.trim() ||
                  !formData.position.trim()
                }
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {experience ? "Update Experience" : "Add Experience"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* AI Skills Processor Dialog */}
      <Dialog open={showSkillsProcessor} onOpenChange={setShowSkillsProcessor}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Skills Processor
            </DialogTitle>
            <DialogDescription>
              Paste raw skills text and let AI parse and format them for you.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Textarea
              value={rawSkillsText}
              onChange={(e) => setRawSkillsText(e.target.value)}
              placeholder="Paste skills text here... (e.g., 'React, Node.js, TypeScript, MongoDB, AWS, Docker')"
              rows={4}
              className="resize-none"
            />

            {rawSkillsText.trim() && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                AI will parse, format, and deduplicate these skills
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowSkillsProcessor(false);
                setRawSkillsText("");
              }}
              disabled={aiEnhancing.skills}
            >
              Cancel
            </Button>
            <Button
              onClick={processSkills}
              disabled={aiEnhancing.skills || !rawSkillsText.trim()}
            >
              {aiEnhancing.skills ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Process with AI
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
