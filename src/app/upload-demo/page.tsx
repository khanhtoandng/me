"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Cloud,
  Upload,
  Image as ImageIcon,
  User,
  FolderOpen,
  CheckCircle,
  ExternalLink,
  Copy,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function UploadDemoPage() {
  const [profileImages, setProfileImages] = useState<string[]>([]);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [generalFiles, setGeneralFiles] = useState<string[]>([]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
  };

  const clearUploads = (type: string) => {
    switch (type) {
      case "profile":
        setProfileImages([]);
        break;
      case "project":
        setProjectImages([]);
        break;
      case "general":
        setGeneralFiles([]);
        break;
    }
    toast.success(`${type} uploads cleared!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[var(--headline)]">
              Cloudinary Upload Demo
            </h1>
          </div>
          <p className="text-lg text-[var(--paragraph)] max-w-2xl mx-auto">
            Test the enhanced file upload functionality with Cloudinary
            integration. Images are automatically optimized and organized by
            type.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Cloudinary Configured
            </Badge>
            <Badge variant="outline">Max 10MB per file</Badge>
            <Badge variant="outline">Auto-optimization</Badge>
          </div>
        </div>

        <Separator />

        {/* Upload Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Photos
              </CardTitle>
              <p className="text-sm text-[var(--paragraph)]">
                Optimized for 400x400px, face detection enabled
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                onUpload={(urls) => {
                  setProfileImages((prev) => [...prev, ...urls]);
                  toast.success(`${urls.length} profile photo(s) uploaded!`);
                }}
                onRemove={(url) => {
                  setProfileImages((prev) => prev.filter((img) => img !== url));
                }}
                existingFiles={profileImages}
                accept="image/*"
                multiple={false}
                maxFiles={1}
                maxSize={10}
                uploadType="profile"
                entityId="demo_user"
                className="w-full"
              />

              {profileImages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploaded Files:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearUploads("profile")}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {profileImages.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
                    >
                      <span className="flex-1 truncate">{url}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(url)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(url, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Images Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Project Images
              </CardTitle>
              <p className="text-sm text-[var(--paragraph)]">
                Optimized for 1200x800px, perfect for portfolios
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                onUpload={(urls) => {
                  setProjectImages((prev) => [...prev, ...urls]);
                  toast.success(`${urls.length} project image(s) uploaded!`);
                }}
                onRemove={(url) => {
                  setProjectImages((prev) => prev.filter((img) => img !== url));
                }}
                existingFiles={projectImages}
                accept="image/*"
                multiple={true}
                maxFiles={5}
                maxSize={10}
                uploadType="project"
                entityId="demo_project"
                className="w-full"
              />

              {projectImages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploaded Files:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearUploads("project")}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {projectImages.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
                    >
                      <span className="flex-1 truncate">{url}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(url)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(url, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* General Files Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                General Files
              </CardTitle>
              <p className="text-sm text-[var(--paragraph)]">
                Documents, images, and other files
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                onUpload={(urls) => {
                  setGeneralFiles((prev) => [...prev, ...urls]);
                  toast.success(`${urls.length} file(s) uploaded!`);
                }}
                onRemove={(url) => {
                  setGeneralFiles((prev) =>
                    prev.filter((file) => file !== url),
                  );
                }}
                existingFiles={generalFiles}
                accept="*/*"
                multiple={true}
                maxFiles={10}
                maxSize={10}
                uploadType="general"
                entityId="demo_general"
                className="w-full"
              />

              {generalFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploaded Files:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearUploads("general")}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {generalFiles.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
                    >
                      <span className="flex-1 truncate">{url}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(url)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(url, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Configuration Info */}
        <Card>
          <CardHeader>
            <CardTitle>🔧 Cloudinary Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Upload Settings</h4>
                <ul className="space-y-1 text-sm text-[var(--paragraph)]">
                  <li>• Cloud Name: dp9roufx3</li>
                  <li>• Max File Size: 10MB</li>
                  <li>• Auto-optimization enabled</li>
                  <li>• Secure HTTPS delivery</li>
                  <li>• Organized folder structure</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Folder Organization</h4>
                <ul className="space-y-1 text-sm text-[var(--paragraph)]">
                  <li>• Profile: /alshaer-portfolio/profiles/</li>
                  <li>• Projects: /alshaer-portfolio/projects/</li>
                  <li>• Documents: /alshaer-portfolio/documents/</li>
                  <li>• General: /alshaer-portfolio/general/</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
