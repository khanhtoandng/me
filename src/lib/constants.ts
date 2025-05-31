// ============================================================================
// Application Configuration
// ============================================================================

export const APP_CONFIG = {
  name: "Alshaer Portfolio",
  title: "Professional Portfolio & Dashboard",
  description:
    "A modern portfolio website with comprehensive admin dashboard for content management.",
  version: "2.0.0",
  url: "https://alshaer.onrender.com",
  author: "Alshaer",
  email: "alshaercontact@gmail.com",
  repository: "https://github.com/alshaer/portfolio",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
} as const;

// Legacy alias for backward compatibility
export const SITE_CONFIG = APP_CONFIG;

// Default social links (fallback when database is empty)
export const DEFAULT_SOCIAL_LINKS = [
  {
    platform: "GitHub",
    url: "https://github.com",
    icon: "Github",
    visible: true,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com",
    icon: "Linkedin",
    visible: true,
  },
  {
    platform: "Twitter",
    url: "https://twitter.com",
    icon: "Twitter",
    visible: true,
  },
];

// API endpoints
export const API_ENDPOINTS = {
  projects: "/api/projects",
  experiences: "/api/experiences",
  education: "/api/education",
  recommendations: "/api/recommendations",
  socialLinks: "/api/social-links",
  profile: "/api/profile",
  messages: "/api/messages",
  content: "/api/content",
};

// Database collections
export const COLLECTIONS = {
  USERS: "users",
  PROJECTS: "projects",
  PROJECT_TYPES: "projectTypes",
  EXPERIENCES: "experiences",
  EDUCATION: "education",
  RECOMMENDATIONS: "recommendations",
  SOCIAL_LINKS: "socialLinks",
  MESSAGES: "messages",
  CONTENT: "content",
  PROFILE: "profile",
} as const;

// ============================================================================
// Database Configuration
// ============================================================================

export const DATABASE_CONFIG = {
  url: "mongodb+srv://alshaercontact:12345678Samtax@cluster0.k44ex3a.mongodb.net/alshaer",
  name: "alshaer",
  collections: COLLECTIONS,
} as const;

// ============================================================================
// Project Configuration
// ============================================================================

export const PROJECT_CONFIG = {
  types: [
    { value: "web-app", label: "Web Application" },
    { value: "mobile-app", label: "Mobile Application" },
    { value: "desktop-app", label: "Desktop Application" },
    { value: "api", label: "API/Backend" },
    { value: "library", label: "Library/Package" },
    { value: "tool", label: "Tool/Utility" },
    { value: "other", label: "Other" },
  ],
  statuses: [
    { value: "draft", label: "Draft", color: "gray" },
    { value: "in-progress", label: "In Progress", color: "blue" },
    { value: "completed", label: "Completed", color: "green" },
    { value: "published", label: "Published", color: "purple" },
    { value: "archived", label: "Archived", color: "orange" },
  ],
  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "AWS",
    "Vercel",
    "Tailwind CSS",
    "Styled Components",
    "Material-UI",
    "Chakra UI",
    "Python",
    "Django",
    "Flask",
    "FastAPI",
    "Java",
    "Spring Boot",
    "C#",
    ".NET",
    "PHP",
    "Laravel",
    "Ruby",
    "Rails",
    "Go",
    "Rust",
    "Vue.js",
    "Angular",
    "Svelte",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Unity",
    "Unreal Engine",
    "Blender",
    "Figma",
    "Adobe XD",
  ],
} as const;

// ============================================================================
// Experience Configuration
// ============================================================================

export const EXPERIENCE_CONFIG = {
  types: [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
    { value: "internship", label: "Internship" },
  ],
  industries: [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "E-commerce",
    "Media",
    "Gaming",
    "Automotive",
    "Real Estate",
    "Travel",
    "Food & Beverage",
    "Fashion",
    "Sports",
    "Non-profit",
    "Government",
  ],
} as const;

// ============================================================================
// File Upload Configuration
// ============================================================================

export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFiles: 10,
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  allowedDocumentTypes: ["application/pdf", "application/msword"],
  uploadPath: "/uploads",
  imageQuality: 0.8,
  thumbnailSize: { width: 300, height: 300 },
} as const;

// ============================================================================
// Security Configuration
// ============================================================================

export const SECURITY_CONFIG = {
  otpCode: "2132",
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  passwordRequirements: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
} as const;

// ============================================================================
// AI Configuration
// ============================================================================

export const AI_CONFIG = {
  geminiApiKey: "AIzaSyCU6wEazb7dvTZnVV9BtaFk39sg52d4-IQ",
  maxTokens: 1000,
  temperature: 0.7,
  model: "gemini-pro",
} as const;

// ============================================================================
// Feature Flags
// ============================================================================

export const FEATURE_FLAGS = {
  analytics: true,
  notifications: true,
  darkMode: true,
  multiLanguage: false,
  realTimeUpdates: true,
  advancedFiltering: true,
  exportData: true,
  bulkOperations: true,
  aiEnhancement: true,
  socialLogin: false,
} as const;

// ============================================================================
// UI Configuration
// ============================================================================

export const UI_CONFIG = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
} as const;
