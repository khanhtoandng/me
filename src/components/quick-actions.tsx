"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderPlus,
  FileEdit,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Settings,
  User,
  Mail,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      id: 1,
      title: "Add New Project",
      description: "Create a new portfolio project",
      icon: <FolderPlus className="h-5 w-5" />,
      href: "/dashboard/projects/new",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Manage Project Types",
      description: "Create and organize project categories",
      icon: <Tag className="h-5 w-5" />,
      href: "/dashboard/project-types",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      title: "Update Experience",
      description: "Add or edit work experience",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/dashboard/experience",
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      title: "Manage Education",
      description: "Update educational background",
      icon: <GraduationCap className="h-5 w-5" />,
      href: "/dashboard/education",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 5,
      title: "View Messages",
      description: "Check your inbox",
      icon: <Mail className="h-5 w-5" />,
      href: "/dashboard/inbox",
      color: "from-red-500 to-red-600",
    },
    {
      id: 6,
      title: "Edit Profile",
      description: "Update your personal information",
      icon: <User className="h-5 w-5" />,
      href: "/dashboard/profile",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: 7,
      title: "Manage Recommendations",
      description: "Add or edit recommendations",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/dashboard/recommendations",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 8,
      title: "Edit Content",
      description: "Update website content",
      icon: <FileEdit className="h-5 w-5" />,
      href: "/dashboard/content",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 9,
      title: "Settings",
      description: "Configure dashboard settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/dashboard/settings",
      color: "from-gray-500 to-gray-600",
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              className="rounded-[12px]"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`relative group cursor-pointer rounded-[12px] p-4 bg-gradient-to-br ${action.color} text-white overflow-hidden transition-all duration-300 hover:shadow-xl`}
                onClick={() => router.push(action.href)}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                      className="p-2 /20 rounded-[12px] backdrop-blur-sm"
                    >
                      {action.icon}
                    </motion.div>
                    <span className="font-semibold text-sm">
                      {action.title}
                    </span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {action.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 /50"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
