"use client";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      className="relative cursor-pointer"
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-md"
        transition={{ duration: 0.3 }}
      />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-[var(--link-color)]">
        .b
      </div>
    </motion.div>
  );
}
