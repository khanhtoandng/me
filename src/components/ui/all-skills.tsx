import { ReactNode } from "react";
import { FaBrain, FaCode, FaCss3Alt, FaDocker, FaGitAlt, FaHtml5, FaJava, FaProjectDiagram } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { SiBootstrap, SiExpress, SiFastapi, SiFirebase, SiGithubactions, SiGooglecloud, SiJavascript, SiJsonwebtokens, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiOpenai, SiOpencv, SiPostgresql, SiPostman, SiPrisma, SiPython, SiReact, SiSass, SiTailwindcss, SiTypescript, SiWebauthn, SiWebpack } from "react-icons/si";

export type SkillData = {
  name: string;
  icon: ReactNode;
  category: string;
};

export const ALL_SKILLS: SkillData[] = [
  // Programming Languages
  { name: "JavaScript", icon: <SiJavascript title="JavaScript" className="text-yellow-400" />, category: "Programming Languages" },
  { name: "TypeScript", icon: <SiTypescript title="TypeScript" className="text-blue-600" />, category: "Programming Languages" },
  { name: "Python", icon: <SiPython title="Python" className="text-blue-400" />, category: "Programming Languages" },
  { name: "Java", icon: <FaJava title="Java" className="text-orange-700" />, category: "Programming Languages" },
  { name: "PostgreSQL", icon: <SiPostgresql title="PostgreSQL" className="text-blue-700" />, category: "Programming Languages" },
  { name: "MySQL", icon: <SiMysql title="MySQL" className="text-blue-500" />, category: "Programming Languages" },
  { name: "MongoDB", icon: <SiMongodb title="MongoDB" className="text-green-600" />, category: "Programming Languages" },
  // Libraries & Frameworks
  { name: "React.js", icon: <SiReact title="React.js" className="text-sky-500" />, category: "Libraries & Frameworks" },
  { name: "Next.js", icon: <SiNextdotjs title="Next.js" className="text-black dark:text-white" />, category: "Libraries & Frameworks" },
  { name: "Express.js", icon: <SiExpress title="Express.js" className="text-gray-700" />, category: "Libraries & Frameworks" },
  { name: "Prisma", icon: <SiPrisma title="Prisma" className="text-indigo-600" />, category: "Libraries & Frameworks" },
  { name: "Tailwind CSS", icon: <SiTailwindcss title="Tailwind CSS" className="text-cyan-400" />, category: "Libraries & Frameworks" },
  { name: "Bootstrap", icon: <SiBootstrap title="Bootstrap" className="text-purple-700" />, category: "Libraries & Frameworks" },
  { name: "SASS", icon: <SiSass title="SASS" className="text-pink-400" />, category: "Libraries & Frameworks" },
  { name: "FastAPI", icon: <SiFastapi title="FastAPI" className="text-green-700" />, category: "Libraries & Frameworks" },
  // Infrastructure & Tools
  { name: "Node.js", icon: <SiNodedotjs title="Node.js" className="text-green-700" />, category: "Infrastructure & Tools" },
  { name: "Git", icon: <FaGitAlt title="Git" className="text-orange-600" />, category: "Infrastructure & Tools" },
  { name: "Docker", icon: <FaDocker title="Docker" className="text-blue-400" />, category: "Infrastructure & Tools" },
  { name: "RESTful APIs", icon: <SiPostman title="RESTful APIs" className="text-orange-500" />, category: "Infrastructure & Tools" },
  { name: "Webpack", icon: <SiWebpack title="Webpack" className="text-blue-400" />, category: "Infrastructure & Tools" },
  { name: "Google Cloud Platform", icon: <SiGooglecloud title="Google Cloud Platform" className="text-yellow-500" />, category: "Infrastructure & Tools" },
  { name: "GitHub Actions", icon: <SiGithubactions title="GitHub Actions" className="text-gray-700" />, category: "Infrastructure & Tools" },
  { name: "Firebase", icon: <SiFirebase title="Firebase" className="text-yellow-500" />, category: "Infrastructure & Tools" },
  { name: "JWT & OAuth", icon: <SiJsonwebtokens title="JWT" className="text-yellow-600" />, category: "Infrastructure & Tools" },
  { name: "OAuth", icon: <SiWebauthn title="OAuth" className="text-blue-600" />, category: "Infrastructure & Tools" },
  { name: "UML", icon: <FaProjectDiagram title="UML" className="text-purple-600" />, category: "Infrastructure & Tools" },
  { name: "Systems Design", icon: <FaProjectDiagram title="Systems Design" className="text-purple-600" />, category: "Infrastructure & Tools" },
  { name: "OOP", icon: <FaCode title="OOP" className="text-gray-700" />, category: "Infrastructure & Tools" },
  // AI & Machine Learning
  { name: "Machine Learning", icon: <FaBrain title="Machine Learning" className="text-purple-600" />, category: "AI & Machine Learning" },
  { name: "Deep Learning", icon: <GiArtificialIntelligence title="Deep Learning" className="text-indigo-600" />, category: "AI & Machine Learning" },
  { name: "OpenCV", icon: <SiOpencv title="OpenCV" className="text-green-700" />, category: "AI & Machine Learning" },
  { name: "OpenAI API", icon: <SiOpenai title="OpenAI API" className="text-gray-700" />, category: "AI & Machine Learning" },
  // Other
  { name: "HTML", icon: <FaHtml5 title="HTML" className="text-orange-500" />, category: "Other" },
  { name: "CSS", icon: <FaCss3Alt title="CSS" className="text-blue-500" />, category: "Other" },
];

export const skillIconMap: Record<string, ReactNode> = Object.fromEntries(
  ALL_SKILLS.map((s) => [s.name, s.icon])
);
