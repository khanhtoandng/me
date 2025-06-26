"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUpload } from "@/components/ui/file-upload";
import { CustomDialog } from "@/components/ui/custom-dialog";
import {
  Camera,
  Upload,
  Trash2,
  User,
  Edit3,
  Check,
  X,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ProfilePhotoManagerProps {
  currentPhoto?: string;
  userName?: string;
  onPhotoUpdate: (photoUrl: string | null) => Promise<void>;
  isLoading?: boolean;
}

export function ProfilePhotoManager({
  currentPhoto,
  userName = "User",
  onPhotoUpdate,
  isLoading = false,
}: ProfilePhotoManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleRemovePhoto = async () => {
    try {
      await onPhotoUpdate(null);
      setShowDeleteDialog(false);
      toast.success("Profile photo removed successfully!");
    } catch (error) {
      console.error("Remove photo error:", error);
      toast.error("Failed to remove photo. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const displayPhoto = currentPhoto;

  return (
    <>
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
        <CardHeader>
          <CardTitle className="text-[var(--card-headline)] flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Profile Photo
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Photo Display */}
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Avatar className="h-32 w-32 border-4 border-[var(--card-border-color)]">
                <AvatarImage
                  src={displayPhoto}
                  alt={userName}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {getUserInitials(userName)}
                </AvatarFallback>
              </Avatar>

              {!isEditing && (
                <motion.div
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  <Edit3 className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </motion.div>

            {/* Action Buttons */}
            {!isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  {currentPhoto ? "Change Photo" : "Add Photo"}
                </Button>

                {currentPhoto && (
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isLoading}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            ) : (
              <div className="w-full space-y-4">
                {/* File Upload */}
                <FileUpload
                  onUpload={(urls) => {
                    if (urls.length > 0) {
                      onPhotoUpdate(urls[0]);
                      setIsEditing(false);
                    }
                  }}
                  accept="image/*"
                  maxSize={10}
                  multiple={false}
                  maxFiles={1}
                  uploadType="profile"
                  entityId={userName.toLowerCase().replace(/\s+/g, "_")}
                  className="w-full"
                />

                {/* Action Buttons */}
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Photo Guidelines */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-[12px] p-4">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Photo Guidelines
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use a high-quality, professional photo</li>
              <li>• Square aspect ratio works best</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Supported formats: JPG, PNG, WebP, GIF</li>
              <li>• Face should be clearly visible</li>
              <li>• Images are automatically optimized via Cloudinary</li>
            </ul>
          </div>

          {/* Current Photo Info */}
          {currentPhoto && !isEditing && (
            <div className="text-center">
              <p className="text-sm text-[var(--card-paragraph)]">
                Current photo uploaded
              </p>
              <p className="text-xs text-[var(--card-paragraph)] mt-1">
                Click "Change Photo" to update or "Remove" to delete
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <CustomDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleRemovePhoto}
        title="Remove Profile Photo"
        description="Are you sure you want to remove your profile photo? This action cannot be undone."
        confirmText="Remove Photo"
        confirmVariant="destructive"
        isLoading={isLoading}
      />
    </>
  );
}
