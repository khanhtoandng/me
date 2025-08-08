'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function Logo() {
  const [hovered, setHovered] = useState(false)

  const logoVariants = {
    initial: {
      scale: 1,
      filter: 'brightness(1)',
      rotate: 0,
    },
    hover: {
      scale: 1.05,
      filter: 'brightness(1.1)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className="relative cursor-pointer h-8 w-8 md:h-10 md:w-10 flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={logoVariants}
      initial="initial"
      animate={hovered ? 'hover' : 'initial'}
    >
      <div className="relative w-full h-full overflow-hidden rounded-md">
        <Image src="/kt-logo.png" alt="KT Logo" fill className="object-contain" priority />
      </div>
    </motion.div>
  )
}
