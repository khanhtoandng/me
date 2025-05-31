"use client";

import { useState, useEffect } from "react";
import { ResponsiveDashboardLayout } from "@/components/dashboard/responsive-layout";
import { EnhancedExperienceDashboard } from "@/components/experience/enhanced-experience-dashboard";
import { PageTransition } from "@/components/ui/page-transition";
import { toast } from "sonner";

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

// Mock data for demonstration
const mockExperiences: Experience[] = [
  {
    _id: "1",
    company: "Tech Solutions Inc.",
    position: "Senior Full-Stack Developer",
    description: "Led development of enterprise web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    startDate: "2022-01-15",
    current: true,
    location: "San Francisco, CA, USA",
    type: "full-time",
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
    achievements: [
      "Increased application performance by 40%",
      "Led a team of 5 developers",
      "Implemented CI/CD pipeline reducing deployment time by 60%"
    ],
    order: 0,
  },
  {
    _id: "2",
    company: "Digital Innovations LLC",
    position: "Frontend Developer",
    description: "Developed responsive web applications and mobile-first designs. Worked closely with UX/UI designers to implement pixel-perfect interfaces.",
    startDate: "2020-06-01",
    endDate: "2021-12-31",
    current: false,
    location: "New York, NY, USA",
    type: "full-time",
    skills: ["React", "Vue.js", "CSS3", "JavaScript", "Figma"],
    achievements: [
      "Improved user engagement by 25%",
      "Reduced page load times by 50%",
      "Mentored 3 junior developers"
    ],
    order: 1,
  },
  {
    _id: "3",
    company: "StartupXYZ",
    position: "Full-Stack Developer",
    description: "Built the entire web platform from scratch using modern technologies. Handled both frontend and backend development in a fast-paced startup environment.",
    startDate: "2019-03-01",
    endDate: "2020-05-31",
    current: false,
    location: "Austin, TX, USA",
    type: "full-time",
    skills: ["React", "Express.js", "PostgreSQL", "Docker", "Heroku"],
    achievements: [
      "Launched MVP in 3 months",
      "Achieved 99.9% uptime",
      "Implemented real-time features using WebSockets"
    ],
    order: 2,
  },
];

export default function EnhancedExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API calls
  const handleUpdateExperiences = async (updatedExperiences: Experience[]) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      // const response = await fetch('/api/experience', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedExperiences),
      // });
      
      setExperiences(updatedExperiences);
      console.log("Experiences updated:", updatedExperiences);
      
    } catch (error) {
      console.error("Failed to update experiences:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock user data
  const mockUser = {
    name: "Alshaer",
    email: "alshaercontact@gmail.com",
    avatar: "/api/placeholder/40/40",
  };

  return (
    <ResponsiveDashboardLayout user={mockUser}>
      <PageTransition>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Enhanced Experience Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your work experience with AI-powered enhancements, drag & drop ordering, and bulk operations.
            </p>
          </div>

          {/* Enhanced Experience Dashboard */}
          <EnhancedExperienceDashboard
            experiences={experiences}
            onUpdate={handleUpdateExperiences}
            isLoading={isLoading}
          />

          {/* Features Info */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-3">
              ✨ Enhanced Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
              <div>
                <h4 className="font-medium mb-2">🤖 AI-Powered Enhancements</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• AI text enhancement for descriptions</li>
                  <li>• Smart location formatting</li>
                  <li>• Intelligent skills processing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🎯 Advanced Management</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Drag & drop ordering</li>
                  <li>• Bulk delete with OTP security</li>
                  <li>• Form pre-population for editing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🎨 Modern UX</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Custom dialog components</li>
                  <li>• Smooth animations</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔒 Security Features</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• OTP confirmation for bulk actions</li>
                  <li>• Secure delete operations</li>
                  <li>• Data validation and sanitization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Development Notes */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              🚀 Development Notes
            </h3>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <p>
                <strong>AI Integration:</strong> Uses Google Gemini API with hardcoded key for text enhancement.
                The AI service validates input, processes text, and provides intelligent suggestions.
              </p>
              <p>
                <strong>State Management:</strong> Uses React Context for sidebar state management and local state
                for form data with proper TypeScript typing throughout.
              </p>
              <p>
                <strong>Security:</strong> Bulk delete operations require OTP confirmation (code: 2132) to prevent
                accidental data loss.
              </p>
              <p>
                <strong>Responsive Design:</strong> Fully responsive with mobile-first approach, collapsible sidebar,
                and touch-friendly interactions.
              </p>
            </div>
          </div>
        </div>
      </PageTransition>
    </ResponsiveDashboardLayout>
  );
}
