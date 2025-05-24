"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AITextEnhancer } from "@/components/ui/ai-text-enhancer";
import { Sparkles, Lightbulb, Wand2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function AIDemoPage() {
  const { toast } = useToast();
  const [demoTexts, setDemoTexts] = useState({
    hero: "I am a Full-Stack Developer from Palestine, specializing in crafting seamless and efficient web applications across both front-end and back-end technologies.",
    footer: "Full-Stack Developer specializing in creating seamless and efficient web applications.",
    project: "This is a web application built with React and Node.js. It has user authentication and a dashboard.",
    experience: "Worked as a developer building web applications and fixing bugs. Used various technologies and frameworks."
  });

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleTextUpdate = (type: keyof typeof demoTexts, newText: string) => {
    setDemoTexts(prev => ({
      ...prev,
      [type]: newText
    }));
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(null), 2000);
      toast({
        title: "Copied",
        description: "Text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--headline)] flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-500" />
            AI Text Enhancement Demo
          </h1>
          <p className="text-[var(--paragraph)] mt-2">
            Experience the power of Google Gemini AI for enhancing your portfolio content
          </p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Powered by Gemini AI
        </Badge>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="bg-[var(--card-background)] text-[var(--paragraph)] grid grid-cols-4">
            <TabsTrigger
              value="hero"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger
              value="footer"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Footer
            </TabsTrigger>
            <TabsTrigger
              value="project"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Project
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Copy className="h-4 w-4 mr-2" />
              Experience
            </TabsTrigger>
          </TabsList>

          {Object.entries(demoTexts).map(([type, text]) => (
            <TabsContent key={type} value={type} className="space-y-4">
              <motion.div variants={itemVariants}>
                <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
                  <CardHeader>
                    <CardTitle className="text-[var(--card-headline)] capitalize flex items-center justify-between">
                      {type} Content Enhancement
                      <Button
                        onClick={() => copyToClipboard(text, type)}
                        variant="ghost"
                        size="sm"
                        className="text-[var(--paragraph)]"
                      >
                        {copiedText === type ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--card-headline)]">
                        Original Text:
                      </label>
                      <Textarea
                        value={text}
                        onChange={(e) => handleTextUpdate(type as keyof typeof demoTexts, e.target.value)}
                        placeholder={`Enter your ${type} content here...`}
                        className="min-h-24 bg-[var(--input-background)] border-[var(--input-border-color)] text-[var(--input-text)]"
                      />
                    </div>

                    <AITextEnhancer
                      originalText={text}
                      onTextUpdate={(newText) => handleTextUpdate(type as keyof typeof demoTexts, newText)}
                      type={type as "hero" | "footer" | "project" | "experience"}
                      placeholder={`Enhance your ${type} content...`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Features Overview */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Enhancement Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-purple-100">
                  <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-800 mb-1">Text Enhancement</h3>
                  <p className="text-sm text-purple-600">
                    Transform your content into professional, engaging copy
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                  <Lightbulb className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 mb-1">Smart Suggestions</h3>
                  <p className="text-sm text-blue-600">
                    Get actionable recommendations to improve your content
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-green-100">
                  <Wand2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 mb-1">Multiple Variations</h3>
                  <p className="text-sm text-green-600">
                    Generate different versions with various tones and styles
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Instructions */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
            <CardHeader>
              <CardTitle className="text-[var(--card-headline)]">How to Use AI Enhancement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className="bg-purple-500 text-white min-w-6 h-6 flex items-center justify-center text-xs">1</Badge>
                  <div>
                    <h4 className="font-medium text-[var(--card-headline)]">Enter Your Content</h4>
                    <p className="text-sm text-[var(--card-paragraph)]">
                      Type or paste your original text in the textarea above
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-purple-500 text-white min-w-6 h-6 flex items-center justify-center text-xs">2</Badge>
                  <div>
                    <h4 className="font-medium text-[var(--card-headline)]">Choose Enhancement Type</h4>
                    <p className="text-sm text-[var(--card-paragraph)]">
                      Click "Enhance with AI", "Get Suggestions", or "Generate Variations"
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-purple-500 text-white min-w-6 h-6 flex items-center justify-center text-xs">3</Badge>
                  <div>
                    <h4 className="font-medium text-[var(--card-headline)]">Review and Apply</h4>
                    <p className="text-sm text-[var(--card-paragraph)]">
                      Review the AI-generated content and apply the version you like best
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
