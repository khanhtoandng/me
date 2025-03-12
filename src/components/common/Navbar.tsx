"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Briefcase,
  FolderGit2,
  MessageCircleCode,
  LucideFileSpreadsheet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../ui/theme-toggle";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";

const styles = {
  link: "text-[var(--headline)] hover:text-[var(--headline)] flex gap-[5px] hoverd rounded-md text-sm font-medium items-center py-2",
  icon: "h-4 w-4",
  dropdownItem:
    "flex items-center w-full h-full p-2 text-[var(--headline)] justify-center text-center rounded-md",
  navMenu:
    "text-[var(--headline)] cursor-pointer h-full flex justify-center items-center",
  activeIndicator:
    "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-zinc-400/0 via-zinc-400/40 to-zinc-400/0",
};

const iconAnimationVariants = {
  initial: { scale: 1 },
  animate: { scale: [1, 0.9, 1], transition: { duration: 0.2 } },
};

const mobileMenuVariants = {
  closed: {
    opacity: "0%",
    x: "100%",
    transition: { duration: 0.2 },
  },
  open: {
    opacity: "100%",
    x: 0,
    transition: { duration: 0.2 },
  },
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = usePathname();
  const isDasboard = path.startsWith("/dashboard");

  const navItems = [
    { name: "Work", path: "/#work", icon: Briefcase },
    { name: "Projects", path: "/projects", icon: FolderGit2 },
    { name: "Post", path: "/posts", icon: LucideFileSpreadsheet },
    { name: "Say Hi", path: "/contact", icon: MessageCircleCode },
  ];

  return (
    <>
      {isDasboard ? (
        <nav>
          <h1>nav dashboard</h1>
        </nav>
      ) : (
        <nav
          dir="ltr"
          className="container  max-md:bg-[var(--background)] max-md:z-50 mx-auto z-50 flex items-center justify-between gap-5 rounded-3xl border border-[var(--border)] max-md:border-t-0 max-md:border-x-0 bg-[var(--mobile-nav)] px-5 text-base backdrop-blur-lg max-md:fixed max-md:left-0 max-md:right-0 max-md:top-0 max-md:w-full max-md:rounded-none max-md:px-3 sm:px-6 md:mt-2 max-[900]:hidden"
        >
          <div className="container mx-auto px-0">
            <div className="flex h-14  items-center justify-between max-md:flex-wrap">
              <Link href={"/"} className="flex-shrink-0">
                <Logo />
              </Link>

              <div className="hidden  h-full items-center justify-center md:flex">
                <div
                  dir="ltr"
                  className=" flex h-full items-center justify-center gap-8"
                >
                  {navItems.map((item) => (
                    <div
                      className="relative   flex h-full items-center justify-center  max-md:hidden"
                      key={item.name}
                    >
                      <Link
                        href={item.path}
                        className={`${styles.link} ${
                          path === item.path ? "text-[var(--headline)]" : ""
                        }`}
                      >
                        <item.icon className={styles.icon} />
                        <span>{item.name}</span>
                      </Link>
                      {path === item.path && (
                        <motion.div
                          className={styles.activeIndicator}
                          layoutId="activeIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex  h-full items-center justify-center gap-4 max-md:hidden max-md:gap-2">
                <ThemeToggle />
              </div>

              {/* Mobile menu toggle */}
              <div className="flex items-center max-md:flex-wrap gap-3 justify-center md:hidden">
                <ThemeToggle />

                <motion.button
                  className="text-[var(--headline)]"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileTap="animate"
                >
                  <motion.div
                    className="flex items-center justify-center gap-4 max-md:gap-3"
                    variants={iconAnimationVariants}
                    initial="initial"
                  >
                    <div className="flex w-full items-center justify-start rounded-sm text-center">
                      <Menu className="h-4 w-4 max-md:h-5 max-md:w-5" />
                    </div>
                  </motion.div>
                </motion.button>
              </div>

              {/* Mobile menu */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    className="fixed z-50 inset-0 m-0 flex h-[100vh] w-full flex-col items-center justify-center bg-[var(--background)]"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={mobileMenuVariants}
                  >
                    <nav className="absolute left-0 right-[-40px] top-[-9px] m-auto mt-2 flex h-14 w-full items-center justify-end px-8 text-[var(--headline)]">
                      <motion.span
                        initial={{ opacity: "0%" }}
                        animate={{ opacity: "100%" }}
                        transition={{ duration: 1.5 }}
                      >
                        <X
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="h-5 w-5 cursor-pointer"
                        />
                      </motion.span>
                    </nav>

                    <div className="flex flex-col  space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className="hidden max-md:text-[20px] max-md:font-bold h-full w-full items-center justify-center rounded-md p-2 text-center text-[var(--headline)] max-md:flex"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.span
                            initial={{ opacity: "0%" }}
                            animate={{ opacity: "100%" }}
                            transition={{ duration: 1.5 }}
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
