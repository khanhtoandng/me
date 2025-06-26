"use client";

import { ResponsiveDashboardLayout } from "@/components/dashboard/responsive-layout";
import { EnhancedProjectsDashboard } from "@/components/projects/enhanced-projects-dashboard";
import { PageTransition } from "@/components/ui/page-transition";
import { useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  images: string[];
  technologies: string[];
  status: string;
  featured: boolean;
  githubUrl?: string;
  websiteUrl?: string;
  videoUrl?: string;
  startDate?: string;
  endDate?: string;
  client?: string;
  teamSize?: number;
  role?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  order?: number;
}

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Built with modern technologies for scalability and performance.",
    projectType: "web-app",
    images: ["/api/placeholder/400/300"],
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "Docker"],
    status: "published",
    featured: true,
    githubUrl: "https://github.com/alshaer/ecommerce-platform",
    websiteUrl: "https://ecommerce-demo.alshaer.com",
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    client: "RetailCorp Inc.",
    teamSize: 4,
    role: "Lead Full-Stack Developer",
    challenges:
      "Handling high traffic loads and ensuring secure payment processing while maintaining fast page load times.",
    solutions:
      "Implemented Redis caching, optimized database queries, and used CDN for static assets. Integrated Stripe for secure payments.",
    results:
      "Achieved 99.9% uptime, 2-second average page load time, and processed over $1M in transactions in the first quarter.",
    order: 0,
  },
  {
    _id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
    projectType: "web-app",
    images: ["/api/placeholder/400/300"],
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Socket.io",
      "Tailwind CSS",
    ],
    status: "in-progress",
    featured: false,
    githubUrl: "https://github.com/alshaer/task-manager",
    websiteUrl: "https://tasks.alshaer.com",
    videoUrl: "https://youtube.com/watch?v=demo",
    startDate: "2023-08-01",
    teamSize: 2,
    role: "Frontend Lead",
    challenges:
      "Implementing real-time collaboration features and ensuring data consistency across multiple users.",
    solutions:
      "Used Socket.io for real-time updates and implemented optimistic UI updates with conflict resolution.",
    results:
      "Currently in beta testing with 50+ active users and positive feedback on user experience.",
    order: 1,
  },
  {
    _id: "3",
    title: "Mobile Weather App",
    description:
      "A beautiful and intuitive weather application with location-based forecasts, interactive maps, and personalized weather alerts.",
    projectType: "mobile-app",
    images: ["/api/placeholder/400/300"],
    technologies: [
      "React Native",
      "TypeScript",
      "OpenWeather API",
      "AsyncStorage",
      "React Navigation",
    ],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/alshaer/weather-app",
    startDate: "2023-03-01",
    endDate: "2023-05-15",
    teamSize: 1,
    role: "Solo Developer",
    challenges:
      "Creating smooth animations and handling offline functionality while maintaining accurate weather data.",
    solutions:
      "Implemented local caching with AsyncStorage and used React Native Reanimated for smooth transitions.",
    results:
      "Published on both iOS and Android app stores with 4.8/5 rating and 10K+ downloads.",
    order: 2,
  },
  {
    _id: "4",
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website with admin dashboard, content management system, and analytics integration.",
    projectType: "web-app",
    images: ["/api/placeholder/400/300"],
    technologies: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    status: "published",
    featured: false,
    githubUrl: "https://github.com/alshaer/portfolio",
    websiteUrl: "https://alshaer.onrender.com",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    teamSize: 1,
    role: "Full-Stack Developer",
    challenges:
      "Creating a fast, SEO-optimized website with smooth animations and comprehensive admin features.",
    solutions:
      "Used Next.js for SSR/SSG, implemented lazy loading, and optimized images for web performance.",
    results:
      "Achieved 95+ Lighthouse score, fast loading times, and comprehensive admin dashboard for content management.",
    order: 3,
  },
];

export default function EnhancedProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API calls
  const handleUpdateProjects = async (updatedProjects: Project[]) => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call
      // const response = await fetch('/api/projects', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedProjects),
      // });

      setProjects(updatedProjects);
      console.log("Projects updated:", updatedProjects);
    } catch (error) {
      console.error("Failed to update projects:", error);
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
              Enhanced Projects Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your projects with AI-powered enhancements, drag & drop
              ordering, and comprehensive project details.
            </p>
          </div>

          {/* Enhanced Projects Dashboard */}
          <EnhancedProjectsDashboard
            projects={projects}
            onUpdate={handleUpdateProjects}
            isLoading={isLoading}
          />

          {/* Features Info */}
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-[12px] p-6">
            <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-3">
              ✨ Enhanced Project Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800 dark:text-green-200">
              <div>
                <h4 className="font-medium mb-2">🤖 AI-Powered Content</h4>
                <ul className="space-y-1 text-green-700 dark:text-green-300">
                  <li>• AI description enhancement</li>
                  <li>• Smart technology parsing</li>
                  <li>• Intelligent content suggestions</li>
                  <li>• Automated text formatting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📊 Project Management</h4>
                <ul className="space-y-1 text-green-700 dark:text-green-300">
                  <li>• Drag & drop project ordering</li>
                  <li>• Featured project toggle</li>
                  <li>• Status and type management</li>
                  <li>• Bulk operations with security</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔗 Rich Project Data</h4>
                <ul className="space-y-1 text-green-700 dark:text-green-300">
                  <li>• GitHub, website, and demo links</li>
                  <li>• Team size and role tracking</li>
                  <li>• Client and timeline information</li>
                  <li>• Challenges, solutions, and results</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🎨 Modern Interface</h4>
                <ul className="space-y-1 text-green-700 dark:text-green-300">
                  <li>• Responsive card layouts</li>
                  <li>• Smooth animations</li>
                  <li>• Interactive project previews</li>
                  <li>• Mobile-optimized design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Implementation */}
          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-[12px]2px] p-6">
            <h3 className="text-lg font-medium text-purple-900 dark:text-purple-100 mb-3">
              🛠️ Technical Implementation
            </h3>
            <div className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
              <p>
                <strong>AI Integration:</strong> Google Gemini API integration
                for intelligent text processing, technology parsing, and content
                enhancement with real-time validation.
              </p>
              <p>
                <strong>Drag & Drop:</strong> Framer Motion Reorder components
                for smooth drag-and-drop functionality with visual feedback and
                automatic state management.
              </p>
              <p>
                <strong>Form Management:</strong> Pre-populated forms for
                editing with comprehensive validation, AI-enhanced fields, and
                real-time preview capabilities.
              </p>
              <p>
                <strong>Security:</strong> OTP-protected bulk operations, input
                sanitization, and secure API communication with proper error
                handling.
              </p>
            </div>
          </div>
        </div>
      </PageTransition>
    </ResponsiveDashboardLayout>
  );
}
