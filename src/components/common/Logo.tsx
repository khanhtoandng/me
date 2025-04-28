"use client";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-md"
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-[var(--link-color)]">
        .b
      </div>
    </motion.div>
  );
}
