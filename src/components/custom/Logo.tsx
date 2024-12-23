import { useState } from "react";
import { RandomizedTextEffect } from "../ui/text-randomized";
import { motion, AnimatePresence } from "framer-motion";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-start gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span className="relative flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-[var(--link-color)]">
          <AnimatePresence>
            {isHovered ? (
              <motion.div
                key="hovered"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              >
                <RandomizedTextEffect
                  text={"Baraa"}
                  className="hovered text-base font-bold text-[var(--link-color)]"
                />
              </motion.div>
            ) : (
              <motion.div
                key="not-hovered"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                .b
              </motion.div>
            )}
          </AnimatePresence>
        </motion.span>
      </div>
    </div>
  );
}
