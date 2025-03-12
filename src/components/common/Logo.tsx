"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <motion.div
      className="relative cursor-pointer"
    
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-md"
     
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
