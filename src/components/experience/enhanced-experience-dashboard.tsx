"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Calendar,
  MapPin,
  Briefcase,
  Users,
  Award,
  AlertTriangle,
  Loader2,
  Shield,
  Trash,
} from "lucide-react";
import { EnhancedExperienceForm } from "./enhanced-experience-form";
import { formatDate, getDuration } from "@/lib/utils";
import { SECURITY_CONFIG } from "@/lib/constants";

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

interface EnhancedExperienceDashboardProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => Promise<void>;
  isLoading?: boolean;
}

export function EnhancedExperienceDashboard({
  experiences: initialExperiences,
  onUpdate,
  isLoading = false,
}: EnhancedExperienceDashboardProps) {
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<
    Experience | undefined
  >();
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Update local state when prop changes
  useEffect(() => {
    setExperiences(initialExperiences);
  }, [initialExperiences]);

  const handleReorder = async (newOrder: Experience[]) => {
    // Update order property for each experience
    const reorderedExperiences = newOrder.map((exp, index) => ({
      ...exp,
      order: index,
    }));

    setExperiences(reorderedExperiences);

    try {
      await onUpdate(reorderedExperiences);
      toast.success("Experience order updated successfully!");
    } catch (error) {
      toast.error("Failed to update order");
      // Revert on error
      setExperiences(initialExperiences);
    }
  };

  const moveExperience = async (index: number, direction: "up" | "down") => {
    const newExperiences = [...experiences];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newExperiences.length) return;

    // Swap experiences
    [newExperiences[index], newExperiences[targetIndex]] = [
      newExperiences[targetIndex],
      newExperiences[index],
    ];

    await handleReorder(newExperiences);
  };

  const handleAddExperience = () => {
    setEditingExperience(undefined);
    setShowForm(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    setShowForm(true);
  };

  const handleDeleteExperience = async (experienceId: string) => {
    try {
      const updatedExperiences = experiences.filter(
        (exp) => exp._id !== experienceId
      );
      await onUpdate(updatedExperiences);
      setExperiences(updatedExperiences);
      toast.success("Experience deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete experience");
    }
  };

  const handleFormSubmit = async (
    formData: Omit<Experience, "_id"> & { _id?: string }
  ) => {
    setFormLoading(true);

    try {
      let updatedExperiences: Experience[];

      if (editingExperience) {
        // Update existing experience
        updatedExperiences = experiences.map((exp) =>
          exp._id === editingExperience._id
            ? { ...formData, _id: editingExperience._id }
            : exp
        );
      } else {
        // Add new experience
        const newExperience: Experience = {
          ...formData,
          _id: Date.now().toString(), // Temporary ID
          order: experiences.length,
        };
        updatedExperiences = [...experiences, newExperience];
      }

      await onUpdate(updatedExperiences);
      setExperiences(updatedExperiences);
      setShowForm(false);
      setEditingExperience(undefined);
    } catch (error) {
      toast.error("Failed to save experience");
    } finally {
      setFormLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (otpCode !== SECURITY_CONFIG.otpCode) {
      toast.error("Invalid OTP code");
      return;
    }

    setBulkDeleting(true);

    try {
      await onUpdate([]);
      setExperiences([]);
      setShowBulkDelete(false);
      setOtpCode("");
      toast.success("All experiences deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete experiences");
    } finally {
      setBulkDeleting(false);
    }
  };

  const getExperienceTypeColor = (type: string) => {
    const colors = {
      "full-time":
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "part-time":
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      contract:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      freelance:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      internship:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };
    return colors[type as keyof typeof colors] || colors["full-time"];
  };

  if (showForm) {
    return (
      <EnhancedExperienceForm
        experience={editingExperience}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setShowForm(false);
          setEditingExperience(undefined);
        }}
        isLoading={formLoading}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Experience Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your work experience with AI-powered enhancements
            </p>
          </div>

          <div className="flex gap-2">
            {experiences.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setShowBulkDelete(true)}
                className="flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                Delete All
              </Button>
            )}
            <Button
              onClick={handleAddExperience}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </div>

        {/* Experience List */}
        {experiences.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Experience Added
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start building your professional timeline by adding your work
                experience.
              </p>
              <Button onClick={handleAddExperience}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Experience
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Reorder.Group
            axis="y"
            values={experiences}
            onReorder={handleReorder}
            className="space-y-4"
          >
            <AnimatePresence>
              {experiences.map((experience, index) => (
                <Reorder.Item
                  key={experience._id}
                  value={experience}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ExperienceCard
                      experience={experience}
                      index={index}
                      totalCount={experiences.length}
                      onEdit={() => handleEditExperience(experience)}
                      onDelete={() => handleDeleteExperience(experience._id)}
                      onMoveUp={() => moveExperience(index, "up")}
                      onMoveDown={() => moveExperience(index, "down")}
                      getTypeColor={getExperienceTypeColor}
                    />
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </div>

      {/* Bulk Delete Dialog */}
      <Dialog open={showBulkDelete} onOpenChange={setShowBulkDelete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete All Experiences
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All {experiences.length} experience
              entries will be permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-200 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">
                  Security Verification Required
                </span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">
                Enter the OTP code to confirm this destructive action.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otpCode">OTP Code</Label>
              <Input
                id="otpCode"
                type="password"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter OTP code"
                className="text-center tracking-widest"
                maxLength={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowBulkDelete(false);
                setOtpCode("");
              }}
              disabled={bulkDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={bulkDeleting || otpCode !== SECURITY_CONFIG.otpCode}
            >
              {bulkDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete All Experiences
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Experience Card Component
interface ExperienceCardProps {
  experience: Experience;
  index: number;
  totalCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  getTypeColor: (type: string) => string;
}

function ExperienceCard({
  experience,
  index,
  totalCount,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  getTypeColor,
}: ExperienceCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {/* Drag Handle */}
              <div className="flex flex-col items-center gap-1 pt-1">
                <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-gray-600 cursor-grab" />
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMoveUp}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMoveDown}
                    disabled={index === totalCount - 1}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      {experience.position}
                    </CardTitle>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {experience.company}
                    </p>
                  </div>

                  <Badge className={getTypeColor(experience.type)}>
                    {experience.type.replace("-", " ")}
                  </Badge>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(experience.startDate, {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {experience.current
                        ? "Present"
                        : formatDate(experience.endDate!, {
                            month: "short",
                            year: "numeric",
                          })}
                    </span>
                    <span className="text-gray-400">
                      ({getDuration(experience.startDate, experience.endDate)})
                    </span>
                  </div>

                  {experience.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {experience.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {experience.description}
                  </p>
                )}

                {/* Skills */}
                {experience.skills.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {experience.skills.slice(0, 6).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {experience.skills.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{experience.skills.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {experience.achievements.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Award className="h-4 w-4" />
                      <span>
                        {experience.achievements.length} achievement
                        {experience.achievements.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete Experience
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the experience at{" "}
              <strong>{experience.company}</strong>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Experience
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
