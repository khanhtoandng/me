'use client'

import { ALL_SKILLS, skillIconMap, skillLinkMap } from '@/components/ui/all-skills'
import { SkillsList } from '@/components/ui/skills'
import React, { JSX } from 'react'

type Skill = {
  name: string
  icon: JSX.Element
}

type SkillCategory = {
  title: string
  skills: Skill[]
}

// Replace categories definition with dynamic grouping from ALL_SKILLS
const categories = Array.from(
  ALL_SKILLS.reduce((acc, skill) => {
    if (!acc.has(skill.category)) acc.set(skill.category, [])
    acc.get(skill.category)!.push(skill)
    return acc
  }, new Map<string, typeof ALL_SKILLS>())
).map(([title, skills]) => ({ title, skills }))

const styles = {
  section: 'w-full',
  headerTitle: 'section-title',
  headerTitleStyle: {
    color: 'var(--headline)',
    borderColor: 'var(--border)',
  },
  headerSubTitle: 'font-jetbrains-mono text-sm font-normal tracking-wider',
  headerSubTitleStyle: { color: 'var(--secondary)' },
  headerDesc: 'font-figtree text-sm mt-2 mb-4',
  headerDescStyle: { color: 'var(--paragraph)' },
  categoryTitle: 'text-[11px] font-figtree font-medium mb-1 uppercase tracking-wider',
  categoryTitleStyle: { color: 'var(--paragraph)' },
  skillButton:
    'flex items-center cursor-default rounded-lg px-3 py-2 font-medium text-xs gap-2 shadow transition focus:outline-none',
  skillButtonStyle: {
    backgroundColor: 'var(--card-background)',
    border: 'none',
    color: 'var(--headline)',
  },
}

export default function SkillsSection() {
  const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'transparent'
  }
  const onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'transparent'
  }

  return (
    <section className={styles.section}>
      <header>
        <h1 className={'section-title'} style={styles.headerTitleStyle} data-ninja-font="doto_bold_normal_rg90b">
          Skills{' '}
          <span
            className={styles.headerSubTitle}
            style={styles.headerSubTitleStyle}
            data-ninja-font="jetbrainsmono_regular_normal_smv0q"
          >
            Which I use/know
          </span>
        </h1>
        <p className={styles.headerDesc} style={styles.headerDescStyle} data-ninja-font="figtree_light_normal_rmlnd">
          These are the technologies I've learned and worked with. This list is constantly evolving as I continue to
          learn and grow as a developer.
        </p>
      </header>

      {categories.map(({ title, skills }) => (
        <div key={title} className="mb-6">
          <h3 className={styles.categoryTitle} style={styles.categoryTitleStyle}>
            &lt; {title} /&gt;
          </h3>
          <SkillsList skills={skills.map((s) => s.name)} iconMap={skillIconMap} linkMap={skillLinkMap} />
        </div>
      ))}
    </section>
  )
}
