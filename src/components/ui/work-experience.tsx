'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  BriefcaseBusinessIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
  ShieldIcon,
} from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { SkillsList, skillIconMap } from '@/components/ui/skills'
import { cn } from '@/lib/utils'

const iconMap = {
  code: CodeXmlIcon,
  design: DraftingCompassIcon,
  business: BriefcaseBusinessIcon,
  education: GraduationCapIcon,
  security: ShieldIcon,
} as const

export type ExperiencePositionIconType = keyof typeof iconMap

function ImageGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [api, setApi] = useState<any>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      // Show buttons only if there's scrollable content
      const hasScrollableContent = api.canScrollPrev() || api.canScrollNext()
      setShowButtons(hasScrollableContent)
    }

    onSelect()
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api])

  return (
    <>
      <div className="relative">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div
                  className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg border border-[var(--border)] hover:border-[var(--main)] transition-all duration-300 hover:shadow-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Expand icon overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-expand"
                      >
                        <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
                        <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
                        <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
                        <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom navigation buttons - only show when scrolling is possible */}
          {showButtons && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-[var(--background)] border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-black dark:text-white"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-[var(--background)] border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-black dark:text-white"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </Carousel>
      </div>

      {/* Enhanced Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center animate-in fade-in-0 zoom-in-95 duration-300">
            <button
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 backdrop-blur-sm rounded-full p-2"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
            <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage}
                alt="Full size image"
                fill
                className="object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export type DescriptionSection = {
  title?: string
  items: string[]
  webUrl?: string
  isExpanded?: boolean
  images?: string[]
  subsections?: {
    title?: string
    content?: string
    items?: string[]
    technologies?: string[]
    webUrl?: string
    images?: string[]
  }[]
}

export type ExperiencePositionItemType = {
  id: string
  title: string
  employmentPeriod: string
  employmentType?: string
  description?: DescriptionSection[]
  icon?: ExperiencePositionIconType
  skills?: string[]
  isExpanded?: boolean
  location?: string
}

export type ExperienceItemType = {
  id: string
  companyName: string
  companyLogo?: string
  webUrl?: string
  positions: ExperiencePositionItemType[]
  isCurrentEmployer?: boolean
}

function ExperienceItem({ experience }: { experience: ExperienceItemType }) {
  return (
    <div className="space-y-4 py-4">
      <div className="not-prose flex items-center gap-3 ms-[-4px]">
        <div
          className="flex h-8 w-8 shrink-0 items-center  rounded-full justify-center bg-[var(--card-background)] border p-1"
          aria-hidden
        >
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName}
              width={24}
              height={24}
              quality={100}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <div className="flex h-6 w-6 shrink-0 items-center justify-center">
              <span className="flex h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <h3 className="text-lg leading-snug font-medium text-[var(--headline)]">{experience.companyName}</h3>
          {experience.webUrl && (
            <a
              href={experience.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--secondary)] hover:text-[var(--main)] transition-colors"
              aria-label={`Visit ${experience.companyName} website`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-link pointer-events-none size-4"
                aria-hidden="true"
                style={{ stroke: 'var(--link-color)' }}
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </a>
          )}
        </div>

        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-[var(--highlight)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--highlight)]" />
            <span className="sr-only">Current Employer</span>
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-[var(--border)]">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}

function ExperiencePositionItem({ position }: { position: ExperiencePositionItemType }) {
  const [isOpen, setIsOpen] = useState(position.isExpanded ?? false)

  useEffect(() => {
    if (position.isExpanded !== undefined) setIsOpen(position.isExpanded)
  }, [position.isExpanded])

  const ExperienceIcon = iconMap[position.icon || 'business']

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-[var(--background)]">
        <CollapsibleTrigger asChild>
          <motion.div
            className="group/experience not-prose block w-full text-left select-none"
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="relative z-10 mb-1 flex items-center gap-3 bg-[var(--background)]">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--card-background)] border text-[var(--card-paragraph)]"
                aria-hidden
              >
                <ExperienceIcon className="h-4 w-4" />
              </div>
              <h4 className="flex-1 text-base font-medium text-[var(--main)]">{position.title}</h4>
              <div className="shrink-0 text-[var(--secondary)] [&_svg]:h-4 [&_svg]:w-4" aria-hidden>
                {isOpen ? <ChevronsDownUpIcon /> : <ChevronsUpDownIcon />}
              </div>
            </div>
            <div className="flex items-center gap-2 pl-9 text-sm text-[var(--secondary)]">
              {position.employmentType && (
                <>
                  <dl>
                    <dt className="sr-only">Employment Type</dt>
                    <dd>{position.employmentType}</dd>
                  </dl>
                  <Separator
                    className="data-[orientation=vertical]:h-4"
                    orientation="vertical"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </>
              )}
              <dl>
                <dt className="sr-only">Employment Period</dt>
                <dd>{position.employmentPeriod}</dd>
              </dl>
            </div>
          </motion.div>
        </CollapsibleTrigger>
        <AnimatePresence initial={false}>
          <motion.div
            key={isOpen ? 'open' : 'closed'}
            initial={{ opacity: 0, height: 0 }}
            animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            {isOpen && (
              <CollapsibleContent className="overflow-hidden">
                {position.description && <DescriptionList description={position.description} />}
                <SkillsSection skills={position.skills} />
              </CollapsibleContent>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Collapsible>
  )
}

function SectionItem({ section, sectionIdx }: { section: DescriptionSection; sectionIdx: number }) {
  const [isOpen, setIsOpen] = useState(section.isExpanded ?? false)

  useEffect(() => {
    if (section.isExpanded !== undefined) setIsOpen(section.isExpanded)
  }, [section.isExpanded])

  if (!section.title) {
    // If no title, render without collapsible functionality
    return (
      <div className="space-y-2">
        {section.webUrl && (
          <div className="flex justify-start pb-1">
            <a
              href={section.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--secondary)] hover:text-[var(--main)] transition-colors"
              aria-label="Visit website"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-link pointer-events-none size-3"
                aria-hidden="true"
                style={{ stroke: 'var(--link-color)' }}
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </a>
          </div>
        )}
        <SectionContent section={section} />
      </div>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
      <div className="space-y-2">
        <CollapsibleTrigger asChild>
          <motion.div
            className="group/section not-prose block w-full text-left select-none cursor-pointer"
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-1">
              <h5 className="text-sm font-semibold text-[var(--main)] hover:text-[var(--secondary)] transition-colors">
                {section.title}
              </h5>
              {section.webUrl && (
                <a
                  href={section.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--secondary)] hover:text-[var(--main)] transition-colors"
                  aria-label={`Visit ${section.title} website`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-link pointer-events-none size-3"
                    aria-hidden="true"
                    style={{ stroke: 'var(--link-color)' }}
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </a>
              )}
              <div className="shrink-0 text-[var(--secondary)] [&_svg]:h-4 [&_svg]:w-4" aria-hidden>
                {isOpen ? <ChevronsDownUpIcon /> : <ChevronsUpDownIcon />}
              </div>
            </div>
          </motion.div>
        </CollapsibleTrigger>
        <AnimatePresence initial={false}>
          <motion.div
            key={isOpen ? 'open' : 'closed'}
            initial={{ opacity: 0, height: 0 }}
            animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            {isOpen && (
              <CollapsibleContent className="overflow-hidden">
                <SectionContent section={section} />
              </CollapsibleContent>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Collapsible>
  )
}

function SectionContent({ section }: { section: DescriptionSection }) {
  return (
    <div className="space-y-2 pt-2">
      {section.items.length > 0 && (
        <ul className="mb-4 list-disc ml-6 space-y-2">
          {section.items.map((item, itemIdx) => (
            <li key={itemIdx} className="flex items-start gap-2">
              <span className="text-base leading-5">-</span>
              <span>{item.replace(/^•\s*/, '')}</span>
            </li>
          ))}
        </ul>
      )}
      {section.images && section.images.length > 0 && (
        <div className="mb-4">
          <ImageGallery images={section.images} />
        </div>
      )}
      {section.subsections?.map((subsection, subIdx) => (
        <div key={subIdx} className="ml-4 space-y-2">
          {subsection.title && (
            <div className="flex items-center gap-2">
              <h6 className="text-sm font-medium text-[var(--secondary)]">{subsection.title}</h6>
              {subsection.webUrl && (
                <a
                  href={subsection.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--secondary)] hover:text-[var(--main)] transition-colors"
                  aria-label={`Visit ${subsection.title} website`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-link pointer-events-none size-3"
                    aria-hidden="true"
                    style={{ stroke: 'var(--link-color)' }}
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </a>
              )}
            </div>
          )}
          {!subsection.title && subsection.webUrl && (
            <div className="flex justify-start">
              <a
                href={subsection.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--secondary)] hover:text-[var(--main)] transition-colors"
                aria-label="Visit website"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-link pointer-events-none size-3"
                  aria-hidden="true"
                  style={{ stroke: 'var(--link-color)' }}
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </a>
            </div>
          )}
          {subsection.content && <p className="text-sm text-[var(--card-paragraph)] ml-4">{subsection.content}</p>}
          {subsection.technologies && (
            <div className="ml-4">
              <span className="text-xs font-medium text-[var(--secondary)]">Technologies: </span>
              <span className="text-xs text-[var(--card-paragraph)]">{subsection.technologies.join(', ')}</span>
            </div>
          )}
          {subsection.items && subsection.items.length > 0 && (
            <ul className="mb-4 list-disc ml-10 space-y-2">
              {subsection.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span className="text-base leading-5">-</span>
                  <span>{item.replace(/^•\s*/, '')}</span>
                </li>
              ))}
            </ul>
          )}
          {subsection.images && subsection.images.length > 0 && (
            <div className="ml-4">
              <ImageGallery images={subsection.images} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function DescriptionList({ description }: { description: DescriptionSection[] }) {
  return (
    <div className="pt-2 pl-9 max-md:pl-2">
      <div className="mb-4 space-y-4">
        {description.map((section, sectionIdx) => (
          <SectionItem key={sectionIdx} section={section} sectionIdx={sectionIdx} />
        ))}
      </div>
    </div>
  )
}

function SkillsSection({ skills }: { skills?: string[] }) {
  return (
    <div className="pl-9 max-md:pl-2">
      <ul className="mb-4 list-disc ml-6 space-y-2">
        <li className="flex items-center gap-2 ">
          <SkillsList skills={Array.isArray(skills) ? skills : []} iconMap={skillIconMap} />
        </li>
      </ul>
    </div>
  )
}

function Prose({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'prose prose-sm max-w-none font-mono text-[var(--card-paragraph)] prose-zinc dark:prose-invert',
        'prose-a:font-medium prose-a:break-words prose-a:text-[var(--card-paragraph)] prose-a:underline prose-a:underline-offset-4',
        'prose-code:rounded-md prose-code:border prose-code:bg-[var(--card-background-effect)] prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
        className
      )}
      {...props}
    />
  )
}

export function WorkExperience({ className, experiences }: { className?: string; experiences: ExperienceItemType[] }) {
  return (
    <div className={cn(' px-4', className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  )
}
