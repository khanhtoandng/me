"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Plus,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  baseUrl: string;
  placeholder: string;
  inputType: "username" | "email" | "phone" | "url";
  validation?: (value: string) => boolean;
  formatUrl: (value: string) => string;
}

interface SocialLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  visible: boolean;
}

interface SmartSocialLinksProps {
  socialLinks: SocialLink[];
  onUpdate: (links: SocialLink[]) => Promise<void>;
  isLoading?: boolean;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "github",
    name: "GitHub",
    icon: <Github className="h-4 w-4" />,
    baseUrl: "https://github.com/",
    placeholder: "your-username",
    inputType: "username",
    formatUrl: (username) => `https://github.com/${username}`,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Linkedin className="h-4 w-4" />,
    baseUrl: "https://linkedin.com/in/",
    placeholder: "your-profile-name",
    inputType: "username",
    formatUrl: (username) => `https://linkedin.com/in/${username}`,
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: <Twitter className="h-4 w-4" />,
    baseUrl: "https://twitter.com/",
    placeholder: "your-handle",
    inputType: "username",
    formatUrl: (username) => `https://twitter.com/${username.replace("@", "")}`,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="h-4 w-4" />,
    baseUrl: "https://instagram.com/",
    placeholder: "your-username",
    inputType: "username",
    formatUrl: (username) => `https://instagram.com/${username}`,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <Facebook className="h-4 w-4" />,
    baseUrl: "https://facebook.com/",
    placeholder: "your-profile",
    inputType: "username",
    formatUrl: (username) => `https://facebook.com/${username}`,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <Youtube className="h-4 w-4" />,
    baseUrl: "https://youtube.com/@",
    placeholder: "your-channel",
    inputType: "username",
    formatUrl: (username) => `https://youtube.com/@${username}`,
  },
  {
    id: "email",
    name: "Email",
    icon: <Mail className="h-4 w-4" />,
    baseUrl: "mailto:",
    placeholder: "your-email@example.com",
    inputType: "email",
    validation: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    formatUrl: (email) => `mailto:${email}`,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <MessageCircle className="h-4 w-4" />,
    baseUrl: "https://wa.me/",
    placeholder: "1234567890",
    inputType: "phone",
    formatUrl: (phone) => `https://wa.me/${phone.replace(/\D/g, "")}`,
  },
  {
    id: "mastodon",
    name: "Mastodon",
    icon: <Users className="h-4 w-4" />,
    baseUrl: "https://infosec.exchange/@",
    placeholder: "your-username",
    inputType: "username",
    formatUrl: (username) => `https://infosec.exchange/@${username}`,
  },
  {
    id: "bluesky",
    name: "Bluesky",
    icon: <Globe className="h-4 w-4" />,
    baseUrl: "https://bsky.app/profile/",
    placeholder: "your-handle.bsky.social",
    inputType: "username",
    formatUrl: (username) => `https://bsky.app/profile/${username}`,
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    icon: <Briefcase className="h-4 w-4" />,
    baseUrl: "https://",
    placeholder: "your-website.com",
    inputType: "url",
    validation: (url) => {
      try {
        new URL(url.startsWith("http") ? url : `https://${url}`);
        return true;
      } catch {
        return false;
      }
    },
    formatUrl: (url) => (url.startsWith("http") ? url : `https://${url}`),
  },
  {
    id: "custom",
    name: "Custom Link",
    icon: <ExternalLink className="h-4 w-4" />,
    baseUrl: "https://",
    placeholder: "https://your-link.com",
    inputType: "url",
    validation: (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
    formatUrl: (url) => url,
  },
];

export function SmartSocialLinks({
  socialLinks,
  onUpdate,
  isLoading = false,
}: SmartSocialLinksProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const getPlatformById = (id: string) => {
    return SOCIAL_PLATFORMS.find((p) => p.id === id);
  };

  const validateInput = (platform: SocialPlatform, value: string): boolean => {
    if (!value.trim()) return false;

    if (platform.validation) {
      return platform.validation(value);
    }

    return true;
  };

  const handleAddLink = async () => {
    if (!selectedPlatform || !inputValue.trim()) {
      setError("Please select a platform and enter a value");
      return;
    }

    const platform = getPlatformById(selectedPlatform);
    if (!platform) {
      setError("Invalid platform selected");
      return;
    }

    if (!validateInput(platform, inputValue)) {
      setError(`Please enter a valid ${platform.inputType}`);
      return;
    }

    // Check if platform already exists
    const existingLink = socialLinks.find(
      (link) => link.platform === platform.name
    );
    if (existingLink) {
      setError(`${platform.name} link already exists`);
      return;
    }

    setIsAdding(true);
    setError("");

    try {
      const newLink: SocialLink = {
        id: Date.now().toString(),
        platform: platform.name,
        username: inputValue.trim(),
        url: platform.formatUrl(inputValue.trim()),
        visible: true,
      };

      const updatedLinks = [...socialLinks, newLink];
      await onUpdate(updatedLinks);

      setSelectedPlatform("");
      setInputValue("");
      toast.success(`${platform.name} link added successfully!`);
    } catch (error) {
      setError("Failed to add social link");
      toast.error("Failed to add social link");
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveLink = async (linkId: string) => {
    try {
      const updatedLinks = socialLinks.filter((link) => link.id !== linkId);
      await onUpdate(updatedLinks);
      toast.success("Social link removed successfully!");
    } catch (error) {
      toast.error("Failed to remove social link");
    }
  };

  const handleToggleVisibility = async (linkId: string) => {
    try {
      const updatedLinks = socialLinks.map((link) =>
        link.id === linkId ? { ...link, visible: !link.visible } : link
      );
      await onUpdate(updatedLinks);
      toast.success("Link visibility updated!");
    } catch (error) {
      toast.error("Failed to update link visibility");
    }
  };

  const selectedPlatformData = selectedPlatform
    ? getPlatformById(selectedPlatform)
    : null;
  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    (platform) =>
      !socialLinks.some((link) => link.platform === platform.name) ||
      platform.id === "custom"
  );

  return (
    <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
      <CardHeader>
        <CardTitle className="text-[var(--card-headline)] flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Social Links
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Add New Link */}
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-[12px]">
          <h4 className="font-medium text-[var(--card-headline)]">
            Add New Social Link
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={selectedPlatform}
                onValueChange={setSelectedPlatform}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlatforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      <div className="flex items-center gap-2">
                        {platform.icon}
                        {platform.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                {selectedPlatformData?.inputType === "email"
                  ? "Email"
                  : selectedPlatformData?.inputType === "phone"
                    ? "Phone Number"
                    : selectedPlatformData?.inputType === "url"
                      ? "URL"
                      : "Username"}
              </Label>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={selectedPlatformData?.placeholder || "Enter value"}
                disabled={!selectedPlatform}
              />
              {selectedPlatformData && inputValue && (
                <p className="text-xs text-[var(--card-paragraph)]">
                  Preview: {selectedPlatformData.formatUrl(inputValue)}
                </p>
              )}
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleAddLink}
                disabled={
                  !selectedPlatform ||
                  !inputValue.trim() ||
                  isAdding ||
                  isLoading
                }
                className="w-full"
              >
                {isAdding ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mr-2"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Existing Links */}
        <div className="space-y-3">
          <h4 className="font-medium text-[var(--card-headline)]">
            Your Social Links
          </h4>

          {socialLinks.length === 0 ? (
            <p className="text-[var(--card-paragraph)] text-center py-8">
              No social links added yet. Add your first link above!
            </p>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {socialLinks.map((link) => {
                  const platform = SOCIAL_PLATFORMS.find(
                    (p) => p.name === link.platform
                  );
                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center justify-between p-3  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[12px]2px]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {platform?.icon || (
                            <ExternalLink className="h-4 w-4" />
                          )}
                          <span className="font-medium">{link.platform}</span>
                        </div>
                        <Badge variant={link.visible ? "default" : "secondary"}>
                          {link.visible ? "Visible" : "Hidden"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(link.url, "_blank")}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleVisibility(link.id)}
                          disabled={isLoading}
                        >
                          {link.visible ? "Hide" : "Show"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveLink(link.id)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Platform Guidelines */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-[12px]2px] p-4">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            Smart Link Generation
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Just enter your username - we'll generate the full URL</li>
            <li>• Email links will automatically use mailto:</li>
            <li>• WhatsApp links will use wa.me format</li>
            <li>• All links are validated before saving</li>
            <li>• You can hide/show links without deleting them</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
