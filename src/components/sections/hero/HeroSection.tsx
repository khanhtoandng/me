'use client'

import { useSocialLinks } from '@/hooks/use-social-links'
import { memo } from 'react'

import { AiFillTwitterCircle, AiFillYoutube, AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai'
import { BsLinkedin } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'

const iconsMap = {
  github: SiGithub,
  linkedin: BsLinkedin,
  youtube: AiFillYoutube,
  twitter: AiFillTwitterCircle,
  email: AiOutlineMail,
  whatsapp: AiOutlineWhatsApp,
  facebook: FaFacebook,
}

function HeroSocialLinks() {
  const { socialLinks } = useSocialLinks(true)

  return (
    <section>
      <div className="w-full mx-auto">
        <div className="text-left mb-4">
          <p className="text-[var(--paragraph)] text-sm pt-2" style={{ borderColor: 'var(--card-border-color)' }}>
            Where to find me <span className="text-[var(--headline)] font-medium">(digitally)</span> if you wish to
          </p>
        </div>

        <div className="mt-4 w-full max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-start gap-4">
            {socialLinks.map((social) => {
              const IconComponent = iconsMap[social.icon.toLowerCase() as keyof typeof iconsMap]

              return (
                <a
                  key={social._id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-lg px-3 py-2 font-medium text-xs gap-2 shadow transition focus:outline-none"
                  style={{
                    backgroundColor: 'var(--card-background)',
                    color: 'var(--headline)',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--link-color)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
                >
                  {IconComponent && <IconComponent aria-hidden="true" className="text-[var(--paragraph)]" size={16} />}
                  <span>{social.platform}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroSection() {
  return (
    <div className="header max-md:pt-[50px]">
      <div className="header-content">
        <h1 className="header-title text-[var(--headline)]">Huynh Tran Khanh Toan</h1>
        <h1 className="subtitle capitalize text-[var(--headline)]">Backend Engineer</h1>
        <p className="text-[var(--paragraph)]">
          I’m a backend engineer with 4+ years of hands-on experience designing and developing SaaS platforms and
          scalable cloud-native applications. I specialize in GraphQL, TypeScript, NestJS, PostgreSQL, and AWS, with a
          strong emphasis on clean architecture and infrastructure as code. My passion lies in leveraging modern
          technologies to deliver smarter, more efficient solutions that solve real-world problems.
          <br />
          <br />
          I take pride in building efficient, maintainable backend systems and CI/CD pipelines that enhance deployment
          speed and reliability. I've developed high-impact features such as AI integrations, real-time messaging
          queues, and third-party service integrations (Stripe, Firebase, Zalo ZNS). My approach combines technical
          depth with a focus on innovation, ensuring every project is both functional and future-ready.
          <br />
          <br />
          Committed to continuous learning, I stay up to date with the latest advancements in modern software
          development. My goal is to deliver high-quality, impactful software that drives progress and exceeds
          expectations.
        </p>
      </div>

      {/* Social Links */}
      <HeroSocialLinks />
    </div>
  )
}

export default memo(HeroSection)
