"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Eye, EyeOff } from "lucide-react";

export default function SkeletonDemoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const HeroSkeletonDemo = () => (
    <div className="header max-md:pt-[50px]">
      <div className="header-content">
        {/* Title Skeleton */}
        <Skeleton className="h-12 w-[300px] mb-4 max-md:w-[250px]" />
        {/* Subtitle Skeleton */}
        <Skeleton className="h-6 w-[400px] mb-6 max-md:w-[300px]" />
        {/* Content Paragraphs Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[95%]" />
          <div className="space-y-3 mt-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[92%]" />
          </div>
          <div className="space-y-3 mt-6">
            <Skeleton className="h-4 w-[88%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>
      </div>

      {/* Social Links Skeleton */}
      <div className="flex items-start gap-4 py-[8px] max-md:w-full max-md:flex-col mt-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[40px] w-[120px] max-md:w-full" />
        ))}
      </div>
    </div>
  );

  const HeroContentDemo = () => (
    <div className="header max-md:pt-[50px]">
      <div className="header-content">
        <h1 className="header-title">Baraa Alshaer</h1>
        <h1 className="subtitle capitalize">software engineer | Full-Stack Developer</h1>
        <p className="description">
          I am a Full-Stack Developer from Palestine, specializing in crafting seamless and efficient web applications across both front-end and back-end technologies. I hold a degree in software engineering from Al-Azhar University, where I developed a strong foundation in modern software development principles, problem-solving, and system architecture.
        </p>
        <p className="description">
          I approach each project with a focus on delivering high-quality solutions, combining my skills in frontend development, backend systems, and overall project design. My aim is to create user-centric applications that not only meet client needs but also drive innovation.
        </p>
        <p className="description">
          I am dedicated to staying current with industry trends and continuously improving my craft. My work reflects a commitment to excellence and a drive to contribute meaningfully to the tech community.
        </p>
      </div>

      {/* Social Links */}
      <ul className="hovered section flex items-start gap-4 py-[8px] text-[1rem] text-[var(--paragraph)] max-md:w-full max-md:flex-col mt-8">
        {["GitHub", "LinkedIn", "Twitter", "Email"].map((platform) => (
          <li
            key={platform}
            className="rounded-lg underline max-md:w-full max-md:bg-[var(--card-background)] max-md:px-[8px] max-md:py-[14px]"
          >
            <a
              className="flex contact-title capitalize text-[1rem] items-center hoverd gap-2 max-md:flex max-md:flex-row h-[100%] w-full"
              href="#"
            >
              <span className="flex h-full items-center justify-center gap-1 text-[var(--headline)] opacity-80">
                <span>{platform}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const OldSkeletonDemo = () => (
    <div className="header max-md:pt-[50px]">
      <div className="header-content">
        <h1 className="header-title">Baraa Alshaer</h1>
        <h1 className="subtitle capitalize">software engineer | Full-Stack Developer</h1>
        {/* Old custom skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Old social links skeleton */}
      <div className="flex items-start gap-4 py-[8px] max-md:w-full max-md:flex-col mt-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-[40px] w-[120px] bg-gray-200 rounded-lg animate-pulse max-md:w-full"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[var(--headline)]">
            HeroSection Skeleton Loading Demo
          </h1>
          <p className="text-lg text-[var(--paragraph)] max-w-2xl mx-auto">
            Demonstration of the enhanced skeleton loading using shadcn/ui components in the HeroSection.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button onClick={toggleLoading} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Simulate Loading
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center gap-2"
            >
              {showComparison ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showComparison ? "Hide" : "Show"} Comparison
            </Button>
          </div>
        </div>

        {/* Main Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Enhanced HeroSection with shadcn/ui Skeleton
              {isLoading && (
                <span className="text-sm font-normal text-[var(--paragraph)]">
                  (Loading...)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <HeroSkeletonDemo /> : <HeroContentDemo />}
          </CardContent>
        </Card>

        {/* Comparison */}
        {showComparison && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">✅ New: shadcn/ui Skeleton</CardTitle>
              </CardHeader>
              <CardContent>
                <HeroSkeletonDemo />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">❌ Old: Custom Skeleton</CardTitle>
              </CardHeader>
              <CardContent>
                <OldSkeletonDemo />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>✨ Enhanced Skeleton Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-600">✅ New Implementation</h4>
                <ul className="space-y-2 text-sm text-[var(--paragraph)]">
                  <li>• Uses shadcn/ui Skeleton component</li>
                  <li>• Consistent with design system</li>
                  <li>• Better accessibility support</li>
                  <li>• Proper theme integration</li>
                  <li>• More realistic content representation</li>
                  <li>• Responsive skeleton sizing</li>
                  <li>• Smooth animations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-red-600">❌ Old Implementation</h4>
                <ul className="space-y-2 text-sm text-[var(--paragraph)]">
                  <li>• Custom CSS skeleton</li>
                  <li>• Hardcoded gray colors</li>
                  <li>• Basic pulse animation</li>
                  <li>• Limited responsiveness</li>
                  <li>• Inconsistent with design system</li>
                  <li>• Less realistic representation</li>
                  <li>• Manual styling required</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Details */}
        <Card>
          <CardHeader>
            <CardTitle>🛠️ Implementation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[var(--card-background)] border border-[var(--card-border-color)] rounded-lg p-4">
              <h4 className="font-semibold mb-2">Key Changes Made:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--paragraph)]">
                <li>Imported <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Skeleton</code> from shadcn/ui</li>
                <li>Replaced custom skeleton divs with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Skeleton</code> components</li>
                <li>Added skeleton for title and subtitle when loading</li>
                <li>Enhanced content skeleton with varied widths for realism</li>
                <li>Improved social links skeleton layout</li>
                <li>Maintained responsive design patterns</li>
              </ol>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Benefits:</h4>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>• Consistent with the overall design system</li>
                <li>• Better user experience during loading</li>
                <li>• Automatic theme support (light/dark mode)</li>
                <li>• Reduced custom CSS maintenance</li>
                <li>• Improved accessibility features</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
