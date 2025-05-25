"use client";

import type React from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, Upload, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { SocialLinksManager } from "@/components/profile/social-links-manager";

export function ProfileForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
    skills: [] as string[],
  });

  const [skillInput, setSkillInput] = useState("");

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/profile");
        const data = await response.json();

        if (data.success && data.data) {
          const profile = data.data;
          setFormData({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: profile.email || "",
            phone: profile.phone || "",
            location: profile.location || "",
            bio: profile.bio || "",
            avatar: profile.avatar || "",
            skills: profile.skills || [],
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="bg-[var(--card-background)] text-[var(--paragraph)]">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            Social Profiles
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
          >
            Skills
          </TabsTrigger>
        </TabsList>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          <TabsContent value="personal" className="space-y-4">
            <Card className="border-none">
              <CardHeader>
                <CardTitle className="text-[var(--card-headline)]">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-[var(--card-paragraph)]">
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  className="flex justify-between items-center py-5"
                  variants={itemVariants}
                >
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={formData.avatar || "/placeholder.svg"}
                      alt="Profile"
                    />
                    <AvatarFallback className="bg-[var(--button)] text-[var(--button-text)] text-xl">
                      {formData.firstName && formData.lastName
                        ? `${formData.firstName[0]}${formData.lastName[0]}`
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <Separator className="bg-[var(--card-border-color)]" />

                <motion.div
                  className="grid gap-4 sm:grid-cols-2"
                  variants={itemVariants}
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-[var(--card-headline)]"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-[var(--card-headline)]"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[var(--card-headline)]"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-[var(--card-headline)]"
                    >
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label
                      htmlFor="location"
                      className="text-[var(--card-headline)]"
                    >
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="San Francisco, CA"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label
                      htmlFor="bio"
                      className="text-[var(--card-headline)]"
                    >
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Write a short bio about yourself..."
                      className="min-h-32 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                    />
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <SocialLinksManager />
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
              <CardHeader>
                <CardTitle className="text-[var(--card-headline)]">
                  Skills
                </CardTitle>
                <CardDescription className="text-[var(--card-paragraph)]">
                  Add your technical and professional skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label className="text-[var(--card-headline)]">
                    Add Skills
                  </Label>
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
                  <div className="flex flex-wrap gap-2 mt-4">
                    <AnimatePresence>
                      {formData.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge className="bg-[var(--button2)] text-[var(--button-text)] flex items-center gap-1 px-3 py-1">
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer ml-1"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
