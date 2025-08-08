import { ReactNode } from 'react'

import { BsFillLightningChargeFill } from 'react-icons/bs'
import { DiRedis } from 'react-icons/di'
import { FaAws, FaDocker, FaGitAlt, FaGitlab } from 'react-icons/fa'
import { PiWaveformFill } from 'react-icons/pi'
import {
  SiAdguard,
  SiAwsorganizations,
  SiBitwarden,
  SiBrave,
  SiDatagrip,
  SiExpress,
  SiGithubactions,
  SiGmail,
  SiGooglecontaineroptimizedos,
  SiJavascript,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiRedis,
  SiServerless,
  SiTypeorm,
  SiTypescript,
  SiYaml,
  SiYoutubemusic,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

export type SkillData = {
  name: string
  icon: ReactNode
  category: string
  link?: string // Optional URL to redirect when clicked
}

export const ALL_SKILLS: SkillData[] = [
  // Programming Languages
  {
    name: 'JavaScript',
    icon: <SiJavascript title="JavaScript" className="text-yellow-400" />,
    category: 'Programming Languages',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript title="TypeScript" className="text-blue-600" />,
    category: 'Programming Languages',
    link: 'https://www.typescriptlang.org/',
  },
  // {
  //   name: 'Python',
  //   icon: <SiPython title="Python" className="text-blue-400" />,
  //   category: 'Programming Languages',
  //   link: 'https://www.python.org/',
  // },
  // {
  //   name: 'Java',
  //   icon: <FaJava title="Java" className="text-orange-700" />,
  //   category: 'Programming Languages',
  //   link: 'https://www.oracle.com/java/',
  // },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql title="PostgreSQL" className="text-blue-700" />,
    category: 'Programming Languages',
    link: 'https://www.postgresql.org/',
  },
  {
    name: 'Redis',
    icon: <SiRedis title="Redis" className="text-red-500" />,
    category: 'Programming Languages',
    link: 'https://redis.io/',
  },
  {
    name: 'YAML',
    icon: <SiYaml title="YAML" className="text-yellow-500" />,
    category: 'Programming Languages',
    link: 'https://yaml.org/',
  },
  {
    name: 'Node.js',
    icon: <SiNodedotjs title="Node.js" className="text-green-700" />,
    category: 'Libraries & Frameworks',
    link: 'https://nodejs.org/',
  },
  {
    name: 'Express.js',
    icon: <SiExpress title="Express.js" className="text-gray-700" />,
    category: 'Libraries & Frameworks',
    link: 'https://expressjs.com/',
  },
  {
    name: 'NestJS',
    icon: <SiNestjs title="NestJS" className="text-red-600" />,
    category: 'Libraries & Frameworks',
    link: 'https://nestjs.com/',
  },
  {
    name: 'TypeORM',
    icon: <SiTypeorm title="TypeORM" className="text-orange-600" />,
    category: 'Libraries & Frameworks',
    link: 'https://typeorm.io/',
  },
  // Infrastructure & Tools
  {
    name: 'AWS',
    icon: <FaAws title="AWS" className="text-yellow-500" />,
    category: 'Infrastructure & Tools',
    link: 'https://aws.amazon.com/',
  },
  {
    name: 'Serverless Framework',
    icon: <SiServerless title="Serverless" className="text-red-500" />,
    category: 'Infrastructure & Tools',
    link: 'https://www.serverless.com/',
  },
  {
    name: 'AWS CDK',
    icon: <SiAwsorganizations title="AWS CDK" className="text-yellow-700" />,
    category: 'Infrastructure & Tools',
    link: 'https://aws.amazon.com/cdk/',
  },
  {
    name: 'Docker',
    icon: <FaDocker title="Docker" className="text-blue-400" />,
    category: 'Infrastructure & Tools',
    link: 'https://www.docker.com/',
  },
  {
    name: 'GitHub Actions',
    icon: <SiGithubactions title="GitHub Actions" className="text-gray-700" />,
    category: 'Infrastructure & Tools',
    link: 'https://github.com/features/actions',
  },
  {
    name: 'GitLab',
    icon: <FaGitlab title="GitLab" className="text-orange-500" />,
    category: 'Infrastructure & Tools',
    link: 'https://gitlab.com/',
  },
  // {
  //   name: 'RESTful APIs',
  //   icon: <SiPostman title="RESTful APIs" className="text-orange-500" />,
  //   category: 'Infrastructure & Tools',
  //   link: 'https://www.postman.com/',
  // },
  // {
  //   name: 'Google Cloud Platform',
  //   icon: <SiGooglecloud title="Google Cloud Platform" className="text-yellow-500" />,
  //   category: 'Infrastructure & Tools',
  //   link: 'https://cloud.google.com/',
  // },

  // {
  //   name: 'Firebase',
  //   icon: <SiFirebase title="Firebase" className="text-yellow-500" />,
  //   category: 'Infrastructure & Tools',
  //   link: 'https://firebase.google.com/',
  // },
  // {
  //   name: 'JWT & OAuth',
  //   icon: <SiJsonwebtokens title="JWT" className="text-yellow-600" />,
  //   category: 'Infrastructure & Tools',
  //   link: 'https://jwt.io/',
  // },
  // {
  //   name: 'OAuth',
  //   icon: <SiWebauthn title="OAuth" className="text-blue-600" />,
  //   category: 'Infrastructure & Tools',
  //   link: 'https://oauth.net/',
  // },
  // {
  //   name: 'UML',
  //   icon: <FaProjectDiagram title="UML" className="text-purple-600" />,
  //   category: 'Infrastructure & Tools',
  // },
  // {
  //   name: 'Systems Design',
  //   icon: <FaProjectDiagram title="Systems Design" className="text-purple-600" />,
  //   category: 'Infrastructure & Tools',
  // },
  // { name: 'OOP', icon: <FaCode title="OOP" className="text-gray-700" />, category: 'Infrastructure & Tools' },
  // Productivity Tools
  {
    name: 'Cursor',
    icon: <VscVscode title="Cursor" className="text-blue-500" />,
    category: 'Productivity Tools',
    link: 'https://www.cursor.com/',
  },
  {
    name: 'Git',
    icon: <FaGitAlt title="Git" className="text-orange-600" />,
    category: 'Productivity Tools',
    link: 'https://git-scm.com/',
  },
  {
    name: 'OrbStack',
    icon: <SiGooglecontaineroptimizedos title="Google Cloud Platform" className="text-purple-500" />,
    category: 'Productivity Tools',
    link: 'https://orbstack.dev/',
  },
  {
    name: 'Redis Insight',
    icon: <DiRedis title="RedisInsight" className="text-red-500" />,
    category: 'Productivity Tools',
    link: 'https://redis.com/redis-insight/',
  },
  {
    name: 'DataGrip',
    icon: <SiDatagrip title="DataGrip" className="text-black-500" />,
    category: 'Productivity Tools',
    link: 'https://www.jetbrains.com/datagrip/',
  },
  {
    name: 'Postman',
    icon: <SiPostman title="Postman" className="text-orange-500" />,
    category: 'Productivity Tools',
    link: 'https://www.postman.com/',
  },
  {
    name: 'Brave',
    icon: <SiBrave title="Brave" className="text-red-500" />,
    category: 'Productivity Tools',
    link: 'https://brave.com/',
  },
  {
    name: 'Bitwarden',
    icon: <SiBitwarden title="Bitwarden" className="text-blue-500" />,
    category: 'Productivity Tools',
    link: 'https://bitwarden.com/',
  },
  {
    name: 'Spark',
    icon: <SiGmail title="Spark" className="text-blue-500" />,
    category: 'Productivity Tools',
    link: 'https://sparkmailapp.com/',
  },
  {
    name: 'YouTube Music',
    icon: <SiYoutubemusic title="YouTube Music" className="text-red-500" />,
    category: 'Productivity Tools',
    link: 'https://music.youtube.com/',
  },
  {
    name: 'LM Studio',
    icon: <PiWaveformFill title="LM Studio" className="text-purple-500" />,
    category: 'Productivity Tools',
    link: 'https://lmstudio.ai/',
  },
  {
    name: 'AdGuard VPN',
    icon: <SiAdguard title="AdGuard" className="text-green-500" />,
    category: 'Productivity Tools',
    link: 'https://adguard-vpn.com/',
  },
  {
    name: 'AlDente',
    icon: <BsFillLightningChargeFill title="Lightning" className="text-yellow-500" />,
    category: 'Productivity Tools',
    link: 'https://apphousekitchen.com/aldente-overview/',
  },
  // AI & Machine Learning
  // {
  //   name: 'Machine Learning',
  //   icon: <FaBrain title="Machine Learning" className="text-purple-600" />,
  //   category: 'AI & Machine Learning',
  // },
  // {
  //   name: 'Deep Learning',
  //   icon: <GiArtificialIntelligence title="Deep Learning" className="text-indigo-600" />,
  //   category: 'AI & Machine Learning',
  // },
  // {
  //   name: 'OpenCV',
  //   icon: <SiOpencv title="OpenCV" className="text-green-700" />,
  //   category: 'AI & Machine Learning',
  //   link: 'https://opencv.org/',
  // },
  // {
  //   name: 'OpenAI API',
  //   icon: <SiOpenai title="OpenAI API" className="text-gray-700" />,
  //   category: 'AI & Machine Learning',
  //   link: 'https://openai.com/api/',
  // },
  // Other
  // {
  //   name: 'HTML',
  //   icon: <FaHtml5 title="HTML" className="text-orange-500" />,
  //   category: 'Other',
  //   link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  // },
  // {
  //   name: 'CSS',
  //   icon: <FaCss3Alt title="CSS" className="text-blue-500" />,
  //   category: 'Other',
  //   link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  // },
]

export const skillIconMap: Record<string, ReactNode> = Object.fromEntries(ALL_SKILLS.map((s) => [s.name, s.icon]))

export const skillLinkMap: Record<string, string> = Object.fromEntries(
  ALL_SKILLS.filter((s) => s.link).map((s) => [s.name, s.link!])
)
