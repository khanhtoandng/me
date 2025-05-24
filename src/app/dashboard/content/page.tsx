"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Save, RefreshCw, Eye, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import { AITextEnhancer } from "@/components/ui/ai-text-enhancer";

interface ContentData {
  _id?: string;
  section: string;
  title: string;
  subtitle: string;
  description: string;
  content: any;
}

export default function ContentManagementPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [heroContent, setHeroContent] = useState<ContentData>({
    section: "hero",
    title: "Baraa Alshaer",
    subtitle: "software engineer | Full-Stack Developer",
    description: "",
    content: {
      paragraphs: [
        "I am a Full-Stack Developer from Palestine, specializing in crafting seamless and efficient web applications across both front-end and back-end technologies. I hold a degree in software engineering from Al-Azhar University, where I developed a strong foundation in modern software development principles, problem-solving, and system architecture.",
        "I approach each project with a focus on delivering high-quality solutions, combining my skills in frontend development, backend systems, and overall project design. My aim is to create user-centric applications that not only meet client needs but also drive innovation.",
        "I am dedicated to staying current with industry trends and continuously improving my craft. My work reflects a commitment to excellence and a drive to contribute meaningfully to the tech community.",
      ],
    },
  });

  const [footerContent, setFooterContent] = useState<ContentData>({
    section: "footer",
    title: "Baraa Alshaer",
    subtitle: "",
    description:
      "Full-Stack Developer specializing in creating seamless and efficient web applications.",
    content: {
      copyright: "All rights reserved.",
    },
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      // Fetch hero content
      const heroResponse = await fetch("/api/content/hero");
      if (heroResponse.ok) {
        const heroData = await heroResponse.json();
        if (heroData.success && heroData.data) {
          setHeroContent(heroData.data);
        }
      }

      // Fetch footer content
      const footerResponse = await fetch("/api/content/footer");
      if (footerResponse.ok) {
        const footerData = await footerResponse.json();
        if (footerData.success && footerData.data) {
          setFooterContent(footerData.data);
        }
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      toast({
        title: "Error",
        description: "Failed to load content. Using default values.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (contentData: ContentData) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/content/${contentData.section}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: `${contentData.section} content updated successfully!`,
        });
      } else {
        throw new Error(data.error || "Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleHeroParagraphChange = (index: number, value: string) => {
    setHeroContent((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        paragraphs: prev.content.paragraphs.map((p: string, i: number) =>
          i === index ? value : p
        ),
      },
    }));
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--headline)]">
            Content Management
          </h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="h-8 w-8 animate-spin text-[var(--paragraph)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--headline)]">
            Content Management
          </h1>
          <p className="text-[var(--paragraph)]">
            Edit your website's hero section and footer content
          </p>
        </div>
        <Button
          onClick={fetchContent}
          variant="outline"
          className="border-[var(--card-border-color)] text-[var(--paragraph)]"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="bg-[var(--card-background)] text-[var(--paragraph)]">
            <TabsTrigger
              value="hero"
              className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger
              value="footer"
              className="data-[state=active]:bg-[var(--button)] data-[state=active]:text-[var(--button-text)]"
            >
              <Eye className="h-4 w-4 mr-2" />
              Footer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
                <CardHeader>
                  <CardTitle className="text-[var(--card-headline)]">
                    Hero Section Content
                  </CardTitle>
                  <CardDescription className="text-[var(--card-paragraph)]">
                    Edit the main hero section that appears on your homepage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="hero-title"
                      className="text-[var(--card-headline)]"
                    >
                      Main Title
                    </Label>
                    <Input
                      id="hero-title"
                      value={heroContent.title}
                      onChange={(e) =>
                        setHeroContent((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Your name or main title"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="hero-subtitle"
                      className="text-[var(--card-headline)]"
                    >
                      Subtitle
                    </Label>
                    <Input
                      id="hero-subtitle"
                      value={heroContent.subtitle}
                      onChange={(e) =>
                        setHeroContent((prev) => ({
                          ...prev,
                          subtitle: e.target.value,
                        }))
                      }
                      placeholder="Your role or profession"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-[var(--card-headline)]">
                      Description Paragraphs
                    </Label>
                    {heroContent.content.paragraphs?.map(
                      (paragraph: string, index: number) => (
                        <div key={index} className="space-y-2">
                          <Label
                            htmlFor={`paragraph-${index}`}
                            className="text-sm text-[var(--card-paragraph)]"
                          >
                            Paragraph {index + 1}
                          </Label>
                          <Textarea
                            id={`paragraph-${index}`}
                            value={paragraph}
                            onChange={(e) =>
                              handleHeroParagraphChange(index, e.target.value)
                            }
                            placeholder={`Enter paragraph ${index + 1} content`}
                            className="min-h-24 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                          />
                          <AITextEnhancer
                            originalText={paragraph}
                            onTextUpdate={(newText) =>
                              handleHeroParagraphChange(index, newText)
                            }
                            type="hero"
                            placeholder={`Enhance paragraph ${index + 1}...`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => saveContent(heroContent)}
                    disabled={saving}
                    className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Save Hero Content"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="footer" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
                <CardHeader>
                  <CardTitle className="text-[var(--card-headline)]">
                    Footer Content
                  </CardTitle>
                  <CardDescription className="text-[var(--card-paragraph)]">
                    Edit the footer section that appears on all pages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="footer-title"
                      className="text-[var(--card-headline)]"
                    >
                      Footer Title
                    </Label>
                    <Input
                      id="footer-title"
                      value={footerContent.title}
                      onChange={(e) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Footer title"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="footer-description"
                      className="text-[var(--card-headline)]"
                    >
                      About Description
                    </Label>
                    <Textarea
                      id="footer-description"
                      value={footerContent.description}
                      onChange={(e) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description about yourself"
                      className="min-h-20 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                    />
                    <AITextEnhancer
                      originalText={footerContent.description}
                      onTextUpdate={(newText) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          description: newText,
                        }))
                      }
                      type="footer"
                      placeholder="Enhance footer description..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="footer-copyright"
                      className="text-[var(--card-headline)]"
                    >
                      Copyright Text
                    </Label>
                    <Input
                      id="footer-copyright"
                      value={footerContent.content.copyright}
                      onChange={(e) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          content: {
                            ...prev.content,
                            copyright: e.target.value,
                          },
                        }))
                      }
                      placeholder="Copyright text"
                      className="bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => saveContent(footerContent)}
                    disabled={saving}
                    className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Save Footer Content"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
