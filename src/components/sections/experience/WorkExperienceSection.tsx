"use client";

import { AiOutlineBranches, AiOutlineCalendar, AiOutlineCheckCircle, AiOutlineCode, AiOutlineTag } from "react-icons/ai";
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
					`• Developed and launched multiple full-stack web applications in a fast-paced startup environment.\n\n• Built custom internal tools, AI-driven automation solutions, and secure payment systems.\n\n• Focused on scalable, robust, and secure application architecture.\n\n• Collaborated with cross-functional teams to deliver high-impact features on tight deadlines.`,
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
					`• Developed the Sustainable Star Form Builder platform with customizable forms and drag-and-drop functionality.\n\n• Ensured responsive design and optimized frontend performance for a seamless user experience.\n\n• Collaborated with designers and backend engineers to deliver new features and improvements.`,
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
					`• Contributed to team projects including the NAJ Training Center, improving usability and creativity.\n\n• Maintained legacy projects by updating packages and optimizing code for better performance.\n\n• Worked closely with team members to deliver high-quality solutions on schedule.`,
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
					`• Supported database maintenance and security operations for critical infrastructure.\n\n• Implemented protocols to protect sensitive data and ensure compliance with security standards.\n\n• Participated in network security monitoring, backup systems, and disaster recovery planning.`,
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
					`• Worked independently on various full-stack projects for clients in diverse industries.\n\n• Delivered custom web applications, API integrations, and client-specific solutions.\n\n• Managed end-to-end development including design, deployment, and maintenance.`,
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
					`• Studied Software Engineering and Database Systems with a strong emphasis on building secure applications and robust data management.\n\n• Developed a solid foundation in modern programming practices, system architecture, and problem-solving.\n\n• Engaged in hands-on projects and collaborative learning environments.`,
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
		<section className="w-full ibmsans">
			<h2 className="section-title">Work Experience & Education</h2>
			<WorkExperience
				className="rounded-lg"
				experiences={WORK_EXPERIENCE}
			/>
		</section>
	);
}
