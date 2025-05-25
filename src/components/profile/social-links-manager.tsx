"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { IconPicker } from "@/components/ui/icon-picker";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  GripVertical,
  Save,
  X,
} from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";

interface SocialLink {
  _id?: string;
  platform: string;
  url: string;
  icon: string;
  iconLibrary: string;
  isActive: boolean;
  order: number;
}

interface SocialLinksManagerProps {
  className?: string;
}

const iconLibraries = {
  fa: FaIcons,
  ai: AiIcons,
  bi: BiIcons,
  bs: BsIcons,
  fi: FiIcons,
  hi: HiIcons,
  io: IoIcons,
  md: MdIcons,
  ri: RiIcons,
  si: SiIcons,
  ti: TiIcons,
};

export function SocialLinksManager({
  className = "",
}: SocialLinksManagerProps) {
  const { toast } = useToast();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "FaLink",
    iconLibrary: "fa",
    isActive: true,
  });

  // Fetch social links
  const fetchSocialLinks = async () => {
    try {
      const response = await fetch("/api/social-links");
      const data = await response.json();
      if (data.success) {
        setSocialLinks(data.data);
      }
    } catch (error) {
      console.error("Error fetching social links:", error);
      toast({
        title: "Error",
        description: "Failed to fetch social links",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  // Get icon component
  const getIconComponent = (iconName: string, library: string) => {
    const iconLib = iconLibraries[library as keyof typeof iconLibraries];
    if (!iconLib) return null;

    const IconComponent = iconLib[iconName as keyof typeof iconLib];
    if (!IconComponent) return null;

    // Type assertion for React component
    const Icon = IconComponent as React.ComponentType<{ size?: number }>;
    return <Icon size={20} />;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingLink
        ? `/api/social-links/${editingLink._id}`
        : "/api/social-links";

      const method = editingLink ? "PUT" : "POST";

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
          description: editingLink
            ? "Social link updated successfully"
            : "Social link created successfully",
        });

        await fetchSocialLinks();
        handleCloseDialog();
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving social link:", error);
      toast({
        title: "Error",
        description: "Failed to save social link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/social-links/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Social link deleted successfully",
        });
        await fetchSocialLinks();
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting social link:", error);
      toast({
        title: "Error",
        description: "Failed to delete social link. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle toggle active status
  const handleToggleActive = async (link: SocialLink) => {
    try {
      const response = await fetch(`/api/social-links/${link._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...link,
          isActive: !link.isActive,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchSocialLinks();
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating social link:", error);
      toast({
        title: "Error",
        description: "Failed to update social link. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle open dialog for editing
  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
      iconLibrary: link.iconLibrary,
      isActive: link.isActive,
    });
    setIsDialogOpen(true);
  };

  // Handle open dialog for creating
  const handleCreate = () => {
    setEditingLink(null);
    setFormData({
      platform: "",
      url: "",
      icon: "FaLink",
      iconLibrary: "fa",
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingLink(null);
    setFormData({
      platform: "",
      url: "",
      icon: "FaLink",
      iconLibrary: "fa",
      isActive: true,
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle icon selection
  const handleIconSelect = (icon: string, library: string) => {
    setFormData((prev) => ({
      ...prev,
      icon,
      iconLibrary: library,
    }));
  };

  if (isLoading) {
    return (
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
        <CardContent className="p-6">
          <div className="text-center text-[var(--card-paragraph)]">
            Loading social links...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`bg-[var(--card-background)] border-[var(--card-border-color)] ${className}`}
    >
      <CardHeader>
        <div className="flex items-center w-full justify-between">
          <div>
            <CardTitle className="text-[var(--card-headline)]">
              Social Links
            </CardTitle>
            <CardDescription className="text-[var(--card-paragraph)]">
              Manage your social media profiles and links
            </CardDescription>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-[var(--button)]  text-[var(--button-text)] hover:bg-[var(--button2)]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialLinks.length === 0 ? (
          <div className="text-center py-8 text-[var(--card-paragraph)]">
            No social links added yet. Click "Add Link" to get started.
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {socialLinks.map((link) => (
                <motion.div
                  key={link._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    link.isActive
                      ? "border-[var(--card-border-color)] bg-[var(--input-background)]"
                      : "  opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      {getIconComponent(link.icon, link.iconLibrary)}
                    </div>
                    <div>
                      <div className="font-medium text-[var(--card-headline)]">
                        {link.platform}
                      </div>
                      <div className="text-sm text-[var(--card-paragraph)] flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {link.url}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={link.isActive}
                      onCheckedChange={() => handleToggleActive(link)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(link)}
                      className="border-[var(--input-border-color)]"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(link._id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md bg-[var(--card-background)] border-[var(--card-border-color)]">
            <DialogHeader>
              <DialogTitle className="text-[var(--card-headline)]">
                {editingLink ? "Edit Social Link" : "Add Social Link"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="platform"
                  className="text-[var(--card-headline)]"
                >
                  Platform Name
                </Label>
                <Input
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  placeholder="e.g., LinkedIn, GitHub, Twitter"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url" className="text-[var(--card-headline)]">
                  URL
                </Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/profile"
                  className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                  required
                />
              </div>

              <IconPicker
                selectedIcon={formData.icon}
                selectedLibrary={formData.iconLibrary}
                onIconSelect={handleIconSelect}
              />

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isActive: checked }))
                  }
                />
                <Label
                  htmlFor="isActive"
                  className="text-[var(--card-headline)]"
                >
                  Active
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="border-[var(--input-border-color)]"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--button)] mb-2 text-[var(--button-text)] hover:bg-[var(--button2)]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
