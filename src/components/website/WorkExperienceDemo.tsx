import { WorkExperience } from "../ui/work-experience";

interface Position {
  id: string;
  title: string;
  employmentPeriod: string; // e.g. "06.2024 — present" or "07.2023 — 11.2023"
  employmentType?: string;
  icon?: string;
  description: string;
  skills: string[];
  isExpanded?: boolean;
}

interface ExperienceItemType {
  id: string;
  companyName: string;
  companyLogo?: string;
  positions: Position[];
  isCurrentEmployer: boolean;
}

// Your original flat Experience[] data
const experiencesData = [
  {
    _id: "exp_1",
    title: "Full Stack Engineer",
    company: "Samtax",
    companyUrl: "https://sam-tax.com/",
    location: "Philadelphia, United States",
    startDate: "2024-06-01",
    current: true,
    description:
      "Developed and launched multiple full-stack web applications for a startup, including custom internal tools, AI-driven automation solutions, and secure payment systems to enable seamless transactions for clients.",
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
  },
  {
    _id: "exp_2",
    title: "Frontend Developer",
    company: "Sustainable Star LLC",
    companyUrl: "https://sustainablestar.com.sa/",
    location: "Riyadh, Saudi Arabia",
    startDate: "2023-07-01",
    endDate: "2023-11-30",
    current: false,
    description:
      "Developed the Sustainable Star Form Builder (SFB) platform, enabling companies to create custom forms with drag-and-drop functionality, ensuring responsive design and optimal performance.",
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
  },
  {
    _id: "exp_3",
    title: "Frontend Developer",
    company: "Perfect Touch (PTIT)",
    companyUrl: "http://ptit.com.sa/",
    location: "Riyadh, Saudi Arabia",
    startDate: "2023-06-01",
    endDate: "2023-09-30",
    current: false,
    description:
      "Contributed to team projects including the NAJ Training Center, enhanced applications for greater creativity and usability, and maintained legacy projects by updating outdated packages.",
    skills: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Legacy Code Optimization",
      "Package Management",
    ],
  },
  {
    _id: "exp_4",
    title: "IT Security & Database Intern",
    company: "Gaza Electricity Distribution Company (GEDCO)",
    location: "Gaza, Palestine",
    startDate: "2022-04-01",
    endDate: "2022-06-30",
    current: false,
    description:
      "Supported database maintenance operations, implemented security protocols, and participated in security monitoring and incident response to protect sensitive data.",
    skills: [
      "SQL Server Administration",
      "MySQL",
      "Database Security",
      "Network Security Monitoring",
      "Security Compliance",
      "Operating Systems",
      "Vulnerability Management",
      "Data Backup Solutions",
      "Networks",
    ],
  },
];

// Helper to format dates to "MM.YYYY"
function formatEmploymentPeriod(
  startDate: string,
  endDate?: string,
  current?: boolean
) {
  const start = new Date(startDate);
  const startFormatted = `${String(start.getMonth() + 1).padStart(2, "0")}.${start.getFullYear()}`;

  let endFormatted = endDate
    ? (() => {
        const end = new Date(endDate);
        return `${String(end.getMonth() + 1).padStart(2, "0")}.${end.getFullYear()}`;
      })()
    : current
      ? "present"
      : "";

  return endFormatted ? `${startFormatted} — ${endFormatted}` : startFormatted;
}

// Group experiences by company and build ExperienceItemType[]
function groupByCompany(data: typeof experiencesData): ExperienceItemType[] {
  const map = new Map<string, ExperienceItemType>();

  data.forEach((exp) => {
    if (!map.has(exp.company)) {
      map.set(exp.company, {
        id: exp.company.toLowerCase().replace(/\s+/g, "-"),
        companyName: exp.company,
        companyLogo: exp.companyUrl, // optionally replace with actual logos if available
        positions: [],
        isCurrentEmployer: exp.current,
      });
    }

    const companyItem = map.get(exp.company)!;

    // Add position
    companyItem.positions.push({
      id: exp._id,
      title: exp.title,
      employmentPeriod: formatEmploymentPeriod(
        exp.startDate,
        exp.endDate,
        exp.current
      ),
      description: exp.description,
      skills: exp.skills,
      isExpanded: false,
    });

    // Update isCurrentEmployer if any position is current
    if (exp.current) companyItem.isCurrentEmployer = true;
  });

  return Array.from(map.values());
}

const WORK_EXPERIENCE: ExperienceItemType[] = groupByCompany(experiencesData);

export function WorkExperienceDemo() {
  return (
    <WorkExperience
      className="w-full rounded-lg "
      experiences={WORK_EXPERIENCE as any}
    />
  );
}
