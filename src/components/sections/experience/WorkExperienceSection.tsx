'use client'

import { ExperienceItemType, WorkExperience } from '../../ui/work-experience'

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: '1',
    companyName: 'Enosta - Digital Product Consultancy',
    companyLogo: '/logos/enosta.png',
    webUrl: 'https://enosta.com',
    isCurrentEmployer: true,
    positions: [
      {
        id: '1-1',
        title: 'Backend Engineer',
        employmentPeriod: 'Dec 2023 – Present',
        employmentType: 'Full-time',
        description: [
          {
            title: 'Backend Team',
            items: [
              //   `Implemented codebase improvements such as reorganizing code structure, removing unused code/libraries, upgrading NestJS/TypeORM to latest version.`,
              `Initiated and implemented new projects for company's clients, including designing codebase and database schema, implementing backend APIs, and deploying the project.`,
              `Supported other members to debug, solve problems, reviewing code.`,
              `Collaborated with senior engineers to deliver internal knowledge-sharing sessions on AWS Foundations, enhancing cloud proficiency and best practices adoption across the engineering team.`,
            ],
            subsections: [
              {
                title: 'Projects',
                items: ['Projects that I have initiated and worked on.'],
                images: ['/enosta/charithon.png', '/enosta/soulmed.png'],
              },
            ],
          },
          {
            title: 'DevOps Team',
            items: [
              `Refactored Gitlab CI pipeline template by separating CI steps/resources into independent YAML files, improving configuration consistency across projects, centralizing in a remote repository.`,
              `Configured CI/CD pipelines using GitLab CI and GitHub Actions, integrating stages such as linting, type checking, unit testing, building, and deployment to streamline development workflows and enforce code quality.`,
              `Managed AWS infrastructure using Infrastructure as Code (IaC) tools like AWS CDK and Serverless Framework, along with Docker, to automate provisioning, deployment, and scaling of cloud-native applications.`,
            ],
          },
          {
            title: 'Project: Kaiso',
            items: [],
            isExpanded: false,
            subsections: [
              {
                title: 'Team Size',
                items: ['5 Members: 3 Frontend, 2 Backend'],
              },
              {
                title: 'Description',
                items: [
                  'A SAAS platform that automates the ISO compliance from start to finish for small business in Australia.',
                ],
              },
              {
                title: 'Technologies',
                items: [
                  'Typescript, GraphQL, NestJS, PostgresQL, ORM (TypeORM)',
                  'Amazon Web Services: CDK, ALB, ECS, EC2, RDS, S3, ElastiCache, SES, CloudWatch, Lambda',
                ],
              },
              {
                title: 'Responsibilities',
                items: [
                  'Played a primary role in architecting, designing, developing database schema, backend APIs and deployment from scratch using NestJS, PostgresQL, Cloud services (AWS).',
                  'Integrated backend service with AI service for generative AI features.',
                  'Implemented message queue using Bull queue for offloading heavy works, asynchronous job, high performance.',
                  `Provisioned the cloud infrastructure using AWS CDK and set up CI/CD pipelines for whole BE/FE repos using GitHub Actions (includes linter, check-types, unit test, build script, deploy) that decreases time to deploy new functionality, decreases effort for provision infra for new environment.`,
                  `Collaborated with team members including Business Analysts, Project Managers, and Clients to design technological solutions for business problems.`,
                ],
              },
              {
                title: 'Galleries',
                items: ['Application screenshots and architecture diagrams'],
                images: [
                  '/kaiso/kaiso-architect.png',
                  '/kaiso/kaiso-github.png',
                  '/kaiso/manual-1.png',
                  '/kaiso/manual-2.png',
                  '/kaiso/manual-4.png',
                ],
              },
            ],
          },
        ],
        icon: 'code',
        skills: [
          'TypeScript',
          'GraphQL',
          'RESTful APIs',
          'Server-Sent Events',
          'NestJS',
          'PostgreSQL',
          'Redis',
          'AWS',
          'GitHub Actions',
        ],
        location: 'Da Nang, Vietnam',
        isExpanded: true,
      },
    ],
  },
  {
    id: '2',
    companyName: 'Smartos - Digital Transformation Solutions for Property Management',
    companyLogo: '/logos/smartos.png',
    webUrl: 'https://smartos.space/',
    isCurrentEmployer: false,
    positions: [
      {
        id: '2-1',
        title: 'Backend Engineer',
        employmentPeriod: 'Jan 2022 – Dec 2023',
        employmentType: 'Full-time',
        description: [
          {
            title: 'Description',
            isExpanded: true,
            items: [
              `Smartos is a SaaS Proptech platform for Property Management, including Smartos PMS, White Label Solutions, and
Smartos Marketplace.`,
            ],
          },
          {
            title: 'Team size',
            items: ['10 members: 2 Backend, 5 Frontend, 3 Backend'],
            isExpanded: true,
          },
          {
            title: 'Responsibilities',
            isExpanded: true,
            items: [
              `A key member of development team, responsible for designing and architect solutions, developing service modules that helps product approaches to 3500+ rooms in Vietnam, Canada.`,
              `Migrated Backend APIs from Hapi to NestJS, from RestAPI to GraphQL.`,
              `Developed multiple modules including dashboard, booking, invoice, notification, analytics and reporting, configuration,...`,
              `Implemented a worker service and task scheduling service utilizing Serverless (Lambda, SQS, EventBridge) to handle asynchronous jobs, reminders, and cron jobs.`,
              `Designed and developed a module for importing/exporting data in xlsx Format and generating docx files with prefilled data from template.`,
              `Troubleshooted application using CloudWatch and Sentry, optimized several BE APIs, resolved technical issues.`,
              `Designed and developed third-party APIs integrations, including Firebase for Browser/Mobile App notifications, Zalo ZNS for invoice notifications, TTLock for smart door lock management, and Stripe for Canada payment gateway integration.`,
              `Developed White Label Solution App for clients: TPBank, BizCity, NTVM,...`,
              `Participated in analysis and work out solutions for new requirements, conducted code reviews, provided valuable feedback, and mentored new team members.`,
              `Invoked in an Scrumban team`,
            ],
          },
          {
            title: 'Product Gallery',
            items: ['Smartos platform interface and mobile app screenshots'],
            images: ['/smartos/tpbank.png', '/smartos/ttlock.png', '/smartos/iig.png', '/smartos/report.png'],
          },
        ],
        icon: 'code',
        skills: [
          'TypeScript',
          'GraphQL',
          'NestJS',
          'PostgreSQL',
          'Redis',
          'AWS',
          'AWS Lambda',
          'AWS ECS',
          'AWS SQS',
          'AWS S3',
          'AWS CloudWatch',
          'AWS CDK',
          'Serverless Framework',
          'Stripe',
          'Zalo Notification Service',
          'TTLock',
          'Firebase Cloud Messaging',
        ],
        location: 'Riyadh, Saudi Arabia',
      },
    ],
  },
  {
    id: '3',
    companyName: 'Enouvo IT Solutions',
    companyLogo: '/logos/enouvo.png',
    webUrl: 'https://enouvo.com',
    isCurrentEmployer: false,
    positions: [
      {
        id: '3-1',
        title: 'Backend Developer',
        employmentPeriod: 'Jan 2022 – May 2023',
        employmentType: 'Full-time',
        description: [
          {
            title: 'Overview',
            items: [
              "Joined to develop several company's projects as a backend developer.",
              `Contributed as a member of the Blockchain team to researching and developing smart contracts and Web3 solutions on Ethereum and Polygon.`,
            ],
            isExpanded: true,
          },
          {
            title: 'Project: EdLuma',
            items: [],
            isExpanded: false,
            subsections: [
              {
                title: 'Team Size',
                items: ['7 Members: 4 Front-end, 3 Back-end'],
              },
              {
                title: 'Description',
                items: [
                  'Education platform connecting students, parents, and tutors for personalized academic support in online and in-person learning.',
                ],
              },
              {
                title: 'Technologies',
                items: [
                  'TypeScript, GraphQL, NestJS for backend development',
                  'PostgreSQL with TypeORM, Redis for database management',
                  'Amazon Web Services for deployment',
                ],
              },
              {
                title: 'Responsibilities',
                items: [
                  'Collaborated with Team Lead, BA teams for designing database schemas, implementing common features, finding solutions.',
                  'Developed several feature: onboarding, booking, checkout cart, course configuration, transferring and refunding payment.',
                  'Implemented Backend APIs using NestJS, PostgresQL.',
                  'Developed the messaging queue, dead letter queue based on AWS Cloud services (SQS, Lambda).',
                  'Integrated with Stripe for collecting online payment: one-time payment, subscription payment.',
                  'Invoked in an Agile team.',
                ],
              },
              {
                title: 'Product Gallery',
                items: ['EdLuma platform interface'],
                images: ['/edluma/1.png', '/edluma/2.png', '/edluma/3.png'],
              },
            ],
          },
          {
            title: 'Project: RRQ Guild',
            items: [],
            isExpanded: false,
            subsections: [
              {
                title: 'Team Size',
                items: ['3 members: 1 front-end, 1 smart contract, 1 technical lead'],
              },
              {
                title: 'Description',
                items: ['Web3 Proof of concept project about tokenization and staking.'],
              },
              {
                title: 'Technologies',
                items: ['Solidity, Polygon, Hardhat, Ethers.js, Smart contract.'],
              },
              {
                title: 'Responsibilities',
                items: [
                  'Designed and developed smart contracts for tokenization, staking, and liquid staking using Solidity .',
                  'Supported frontend to integrate smart contracts with React.',
                ],
              },
            ],
          },
        ],
        skills: ['TypeScript', 'GraphQL', 'NestJS', 'PostgreSQL', 'AWS', 'Solidity', 'Ethereum', 'Polygon'],
        icon: 'code',
        location: 'Da Nang, Vietnam',
      },
      {
        id: '3-2',
        title: 'Backend Internship',
        employmentPeriod: 'Sep 2021 – Dec 2021',
        employmentType: 'Internship',
        description: [
          {
            items: [
              'Learned about Git, Javascript, Typescript, PostgresQL, NodeJS/NestJS fundamentals, GraphQL in 4 weeks.',
              'Developed GraphQL APIs, wrote unit tests and learned more teamwork, communication, process flows,... in Tedgro project (product inhouse).',
            ],
          },
        ],
        icon: 'code',
        skills: ['Git', 'JavaScript', 'TypeScript', 'NestJS', 'PostgreSQL', 'GraphQL'],
        location: 'Da Nang, Vietnam',
      },
    ],
  },
]

export default function WorkSection() {
  return (
    <section className="w-full ibmsans">
      <h2 className="section-title">Experience</h2>
      <WorkExperience className="rounded-lg" experiences={WORK_EXPERIENCE} />
    </section>
  )
}
