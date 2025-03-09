"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);
  const glowColor = "";

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.7 },
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={logoVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-md"
        style={{ backgroundColor: glowColor }}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        transition={{ duration: 0.3 }}
      />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-[var(--link-color)]">
        .b
      </div>
    </motion.div>
  );
}
