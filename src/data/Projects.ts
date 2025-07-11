import { projects } from "./Links";

const getFaviconUrl = (url: string | undefined): string => {
  if (!url) return "/app/images/logo.png";
  try {
    const domain = new URL(url).origin;
    return `${domain}/favicon.ico`;
  } catch {
    return "/app/images/logo.png";
  }
};

export interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  images: string[];
  videoUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  technologies: string[];
  featured: boolean;
  status: "Draft" | "Published" | "Archived";
  createdAt: string;
  updatedAt: string;
}

export const projectsData: Project[] = [
  {
    _id: "proj_1",
    title: "Samtax",
    description:
      "A trusted tax and accounting platform providing expert tax preparation, financial planning, and business advisory services. Developed a secure, scalable web application with multi-language support, integrated payment systems, and AI-powered automation tools.",
    projectType: "Web Application",
    images: [],
    websiteUrl: "https://sam-tax.com/",
    githubUrl: "",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "OAuth",
      "GitHub Actions",
      "Systems Design",
    ],
    featured: true,
    status: "Published",
    createdAt: "2024-06-01T00:00:00.000Z",
    updatedAt: "2025-07-11T00:00:00.000Z",
  },
  {
    _id: "proj_2",
    title: "Rove E-commerce",
    description:
      "An e-commerce platform delivering seamless online shopping experiences. Combines modern UI, secure transactions, and scalable architecture to help businesses showcase products and grow sales effortlessly.",
    projectType: "Web Application",
    images: [],
    websiteUrl: "",
    githubUrl: projects.rove,
    technologies: [
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "OAuth",
      "JWT",
      "OOP",
      "Webpack",
      "Laravel",
      "PHP",
      "REST APIs",
      "GitHub Actions",
    ],
    featured: true,
    status: "Published",
    createdAt: "2023-05-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "proj_3",
    title: "SFP - Sustainable Star Form Builder",
    description:
      "A powerful, no-code form builder that lets you create, customize, and deploy smart forms in minutes. Designed for teams and creators who need flexible data collection without the technical headache.",
    projectType: "SaaS Platform",
    images: [],
    websiteUrl: "https://sfb-app.com",
    githubUrl: "",
    technologies: [
      "React.js",
      "React DnD",
      "TypeScript",
      "Node.js",
      "SaaS Architecture",
      "Tailwind CSS",
      "JWT",
      "OAuth",
      "REST APIs",
      "UML",
    ],
    featured: true,
    status: "Published",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-11-30T00:00:00.000Z",
  },
  {
    _id: "proj_4",
    title: "Gradients CSS",
    description:
      "A modern tool that takes the hassle out of creating stunning gradients. Helps developers and designers explore, customize, and export beautiful CSS gradients with ease.",
    projectType: "Tool",
    images: [],
    websiteUrl: "https://gradientscss.vercel.app/",
    githubUrl: projects.gradientscss.github,
    technologies: ["React", "TypeScript", "Tailwind CSS", "CSS3", "Vite"],
    featured: true,
    status: "Published",
    createdAt: "2023-03-01T00:00:00.000Z",
    updatedAt: "2023-06-01T00:00:00.000Z",
  },
  {
    _id: "proj_5",
    title: "Barber Academy",
    description:
      "Developed a comprehensive website for Barber Academy, enabling online appointment scheduling and showcasing a complete range of services. Delivered a user-friendly platform that increased client engagement and streamlined operations.",
    projectType: "Website",
    images: [],
    websiteUrl: "https://raoufzadi.vercel.app/",
    githubUrl: "",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    featured: true,
    status: "Published",
    createdAt: "2022-11-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  },
  {
    _id: "proj_6",
    title: "NAJ Training Center",
    description:
      "A training center website with course management, student enrollment, and progress tracking. Contributed to the project during my time at PTIT, enhancing functionality and maintaining legacy systems.",
    projectType: "Web Application",
    images: [],
    websiteUrl: projects.najcenter,
    githubUrl: "",
    technologies: ["React", "JavaScript", "Material-UI", "Node.js"],
    featured: false,
    status: "Published",
    createdAt: "2023-06-01T00:00:00.000Z",
    updatedAt: "2023-09-30T00:00:00.000Z",
  },
];
