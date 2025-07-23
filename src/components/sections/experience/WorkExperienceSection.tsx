"use client";

import { ExperienceItemType, WorkExperience } from "../../ui/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "1",
    companyName: "Samtax",
    companyLogo: "/logos/samtax.svg",
    isCurrentEmployer: true,
    positions: [
      {
        id: "1-1",
        title: "Full Stack Engineer",
        employmentPeriod: "June 2024 – Present",
        employmentType: "Full-time",
        description:
          "Developed and launched multiple full-stack web applications for a startup environment. Built custom internal tools, AI-driven automation solutions, and secure payment systems. Focused on scalable, robust, and secure applications.",
        icon: "code",
        skills: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Express.js",
          "MongoDB",
          "Node.js",
          "AI Integration",
          "Payment Systems",
          "Systems Design",
        ],
        location: "Philadelphia, United States",
        isExpanded: true,
      },
    ],
  },
  {
    id: "2",
    companyName: "Sustainable Star LLC",
    companyLogo: "/logos/sustainablestar.png",
    isCurrentEmployer: false,
    positions: [
      {
        id: "2-1",
        title: "Frontend Developer",
        employmentPeriod: "July 2023 – November 2023",
        employmentType: "Full-time",
        description:
          "Developed the Sustainable Star Form Builder platform with customizable forms and drag-and-drop functionality. Ensured responsive design and optimized frontend performance.",
        icon: "code",
        skills: [
          "React.js",
          "JavaScript ES6+",
          "CSS3",
          "TypeScript",
          "Tailwind CSS",
          "Redux Toolkit",
          "REST APIs",
          "Webpack",
          "Git",
          "Axios",
        ],
        location: "Riyadh, Saudi Arabia",
      },
    ],
  },
  {
    id: "3",
    companyName: "Perfect Touch (PTIT)",
    companyLogo: "/logos/ptit.png",
    isCurrentEmployer: false,
    positions: [
      {
        id: "3-1",
        title: "Frontend Developer",
        employmentPeriod: "June 2023 – September 2023",
        employmentType: "Full-time",
        description:
          "Contributed to team projects including the NAJ Training Center, improving usability and creativity. Maintained legacy projects by updating packages and optimizing code.",
        icon: "code",
        skills: [
          "React",
          "JavaScript",
          "HTML5",
          "CSS3",
          "Legacy Code Optimization",
          "Package Management",
        ],
        location: "Riyadh, Saudi Arabia",
      },
    ],
  },
  {
    id: "4",
    companyName: "Gaza Electricity Distribution Company (GEDCO)",
    companyLogo: "/logos/gedco.png",
    isCurrentEmployer: false,
    positions: [
      {
        id: "4-1",
        title: "IT Security & Database Intern",
        employmentPeriod: "April 2022 – June 2022",
        employmentType: "Internship",
        description:
          "Supported database maintenance and security operations, implemented protocols to protect sensitive data, participated in network security monitoring, backup systems, and disaster recovery planning.",
        icon: "security",
        skills: [
          "SQL Server Administration",
          "MySQL",
          "Database Security",
          "Network Security Monitoring",
          "Security Compliance",
          "Vulnerability Management",
          "Data Backup Solutions",
        ],
        location: "Gaza, Palestine",
      },
    ],
  },
  {
    id: "5",
    companyName: "Freelance",
    isCurrentEmployer: false,
    positions: [
      {
        id: "5-1",
        title: "Full Stack Engineer",
        employmentPeriod: "2022 – 2023",
        employmentType: "Contract",
        description:
          "Worked independently on various full-stack projects, delivering custom web applications, API integrations, and client-specific solutions. Managed end-to-end development including design, deployment, and maintenance.",
        icon: "code",
        skills: [
          "React",
          "Node.js",
          "Express.js",
          "MongoDB",
          "TypeScript",
          "REST APIs",
          "Tailwind CSS",
        ],
        location: "Remote",
      },
    ],
  },
  {
    id: "6",
    companyName: "Al-Azhar University",
    companyLogo: "/logos/alazhar-logo.png",
    isCurrentEmployer: false,
    positions: [
      {
        id: "6-1",
        title: "Diploma in Software Engineering and Database Systems",
        employmentPeriod: "2020 – 2022",
        employmentType: "Education",
        description:
          "Studied Software Engineering and Database Systems with a strong emphasis on building secure applications, system architecture, and robust data management. Developed a solid foundation in modern programming practices and problem-solving within diverse technology environments.",
        icon: "education",
        skills: [
          "Software Engineering",
          "Database Systems",
          "Secure Applications",
          "System Architecture",
          "Programming Practices",
          "Problem Solving",
        ],
        location: "Gaza, Palestine",
      },
    ],
  },
];

export default function WorkSection() {
  return (
    <section className="w-full">
      <h2 className="section-title">Work Experience & Education</h2>
      <WorkExperience className="rounded-lg" experiences={WORK_EXPERIENCE} />
    </section>
  );
}
