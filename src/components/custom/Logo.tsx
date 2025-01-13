import { motion, AnimatePresence } from "framer-motion";

export default function Logo() {
  return (
    <div>
      <div className="flex cursor-pointer items-center justify-start gap-2">
        <motion.span className="relative flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-[var(--link-color)] max-md:hidden">
          <AnimatePresence>
            <motion.div
              key="not-hovered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              .b
            </motion.div>
          </AnimatePresence>
        </motion.span>

        <motion.span className="relative hidden h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-[var(--link-color)] max-md:flex">
          <motion.div
            key="not-hovered"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            .b
          </motion.div>
        </motion.span>
      </div>
    </div>
  );
}
