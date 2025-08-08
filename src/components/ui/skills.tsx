import { cn } from '@/lib/utils'
import React from 'react'
import {
  FaAws,
  FaBrain,
  FaCode,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaProjectDiagram,
  FaReact,
} from 'react-icons/fa'
import { GiArtificialIntelligence } from 'react-icons/gi'
import {
  SiBootstrap,
  SiEthereum,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGithubactions,
  SiGooglecloud,
  SiGraphql,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiOpencv,
  SiPolygon,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiSass,
  SiSolidity,
  SiTailwindcss,
  SiTypescript,
  SiWebauthn,
  SiWebpack,
} from 'react-icons/si'

export type SkillBadgeProps = {
  skill: string
  className?: string
  icon?: React.ReactNode
  link?: string
}

export function SkillBadge({ skill, className, icon, link }: SkillBadgeProps) {
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  const baseClasses =
    'inline-flex items-center gap-1 rounded bg-[var(--card-background)] px-2 py-1 text-xs font-medium border border-[var(--card-border-color)]'
  const interactiveClasses = link
    ? 'cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 hover:border-[var(--headline)] hover:bg-[var(--card-hover-background)]'
    : ''

  return (
    <span
      className={cn(baseClasses, interactiveClasses, className)}
      style={{ color: 'var(--headline)' }}
      onClick={handleClick}
      title={link ? `Click to learn more about ${skill}` : skill}
    >
      {icon}
      {skill}
    </span>
  )
}

export function SkillsList({
  skills,
  iconMap,
  linkMap,
  className,
}: {
  skills: string[]
  iconMap?: Record<string, React.ReactNode>
  linkMap?: Record<string, string>
  className?: string
}) {
  if (!skills || skills.length === 0) return <span>N/A</span>
  return (
    <div className={cn('flex flex-wrap gap-2 mt-1', className)}>
      {skills.map((skill) => (
        <SkillBadge
          key={skill}
          skill={skill}
          icon={iconMap && iconMap[skill] ? iconMap[skill] : undefined}
          link={linkMap && linkMap[skill] ? linkMap[skill] : undefined}
        />
      ))}
    </div>
  )
}

export const skillIconMap: Record<string, React.ReactNode> = {
  // Programming Languages
  JavaScript: <SiJavascript title="JavaScript" className="text-yellow-400" />,
  TypeScript: <SiTypescript title="TypeScript" className="text-blue-600" />,
  Python: <SiPython title="Python" className="text-blue-400" />,
  Java: <FaJava title="Java" className="text-orange-700" />,
  PostgreSQL: <SiPostgresql title="PostgreSQL" className="text-blue-700" />,
  MySQL: <SiMysql title="MySQL" className="text-blue-500" />,
  MongoDB: <SiMongodb title="MongoDB" className="text-green-600" />,
  // Libraries & Frameworks
  NestJS: <SiNestjs title="NestJS" className="text-red-600" />,
  'React.js': <SiReact title="React.js" className="text-sky-500" />,
  React: <FaReact className="text-sky-500" title="React" />,
  'React (Next.js)': <SiNextdotjs className="text-black dark:text-white" title="Next.js" />,
  'Next.js': <SiNextdotjs className="text-black dark:text-white" title="Next.js" />,
  'Express.js': <SiExpress title="Express.js" className="text-gray-700" />,
  Prisma: <SiPrisma title="Prisma" className="text-indigo-600" />,
  'Tailwind CSS': <SiTailwindcss title="Tailwind CSS" className="text-cyan-400" />,
  Bootstrap: <SiBootstrap title="Bootstrap" className="text-purple-700" />,
  SASS: <SiSass title="SASS" className="text-pink-400" />,
  FastAPI: <SiFastapi title="FastAPI" className="text-green-700" />,
  // Infrastructure & Tools
  'Node.js': <SiNodedotjs title="Node.js" className="text-green-700" />,
  Docker: <FaDocker title="Docker" className="text-blue-400" />,
  'RESTful APIs': <SiPostman title="RESTful APIs" className="text-orange-500" />,
  Webpack: <SiWebpack title="Webpack" className="text-blue-400" />,
  'Google Cloud Platform': <SiGooglecloud title="Google Cloud Platform" className="text-yellow-500" />,
  'GitHub Actions': <SiGithubactions title="GitHub Actions" className="text-gray-700" />,
  Firebase: <SiFirebase title="Firebase" className="text-yellow-500" />,
  'JWT & OAuth': <SiJsonwebtokens title="JWT" className="text-yellow-600" />,
  OAuth: <SiWebauthn title="OAuth" className="text-blue-600" />,
  UML: <FaProjectDiagram title="UML" className="text-purple-600" />,
  'Systems Design': <FaProjectDiagram title="Systems Design" className="text-purple-600" />,
  OOP: <FaCode title="OOP" className="text-gray-700" />,
  // AI & Machine Learning
  'Machine Learning': <FaBrain title="Machine Learning" className="text-purple-600" />,
  'Deep Learning': <GiArtificialIntelligence title="Deep Learning" className="text-indigo-600" />,
  OpenCV: <SiOpencv title="OpenCV" className="text-green-700" />,
  'OpenAI API': <SiOpenai title="OpenAI API" className="text-gray-700" />,
  // Other
  HTML: <FaHtml5 title="HTML" className="text-orange-500" />,
  CSS: <FaCss3Alt title="CSS" className="text-blue-500" />,
  // Productivity Tools
  Git: <FaGitAlt title="Git" className="text-orange-600" />,
  GraphQL: <SiGraphql title="GraphQL" className="text-red-600" />,
  AWS: <FaAws title="AWS" className="text-yellow-500" />,
  Solidity: <SiSolidity title="Solidity" className="text-gray-700" />,
  Ethereum: <SiEthereum title="Ethereum" className="text-gray-700" />,
  Polygon: <SiPolygon title="Polygon" className="text-gray-700" />,
}
