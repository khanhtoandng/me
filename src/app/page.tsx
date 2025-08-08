'use client'

import PostSection from '@/components/sections/blog/PostSection'
import CertificationsSection from '@/components/sections/certifications/CertificationsSection'
import WorkExperienceSection from '@/components/sections/experience/WorkExperienceSection'
import HeroSection from '@/components/sections/hero/HeroSection'
import Projects from '@/components/sections/projects/Projects'
import SkillsSection from '@/components/sections/skills/SkillsSection'
import { Button } from '@/components/ui'
import ClickSpark from '@/components/ui/ClickSpark'
import ShinyText from '@/components/ui/ShinyText'
import { mailto } from '@/data/Links'
import { ScrollEffect } from '@/lib/animations'
import Link from 'next/link'
import { MdEmail } from 'react-icons/md'

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <HeroSection />

      <div className="py-4 border-t mt-6">
        <SkillsSection />
      </div>

      <div id="certifications" className="py-4 border-t mt-6">
        <CertificationsSection />
      </div>

      <div id="work" className="py-4 border-t mt-6">
        <WorkExperienceSection />
      </div>

      <div id="projects" className="py-4 border-t mt-6">
        <Projects />
      </div>

      {/* <div className="py-4 border-t mt-6">
        <RecommendationsSection />
      </div> */}

      <div className="py-4 border-t mt-6">
        <PostSection />
      </div>

      <ClickSpark sparkColor="var(--headline)" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <ScrollEffect type="fadeIn">
          <div className="mt-16 mb-12 text-center w-full mx-auto">
            <div className="p-8 rounded-2xl bg-[var(--card-background)] border border-[var(--card-border-color)] shadow-lg">
              <ShinyText
                text="Let's Work Together"
                disabled={false}
                speed={3}
                className="text-2xl md:text-3xl font-bold mb-4 "
              />
              <p className="text-[var(--paragraph)] mb-6 max-w-2xl mx-auto">
                I'm open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <Link href={mailto}>
                <Button icon={<MdEmail className="h-4 w-4" />} className="mx-auto flex-row-reverse">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </ScrollEffect>
      </ClickSpark>
    </div>
  )
}
