"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const { t } = useTranslation();

  return (
    <div className="section w-full bg-[var(--background)]" ref={containerRef}>
      <div className="mx-auto">
        <h2 className="section-title">{t("WorkExperience.Title")}</h2>
        <p className="subtitle">{t("WorkExperience.Description")}</p>
      </div>

      <div ref={ref} className="relative mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-10"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row">
              <div className="absolute left-[-18px] flex h-10 w-10 items-center justify-center rounded-full bg-[var(--background)] dark:bg-black md:left-[-20px]">
                <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800" />
              </div>
              <h3 className="hidden text-xl font-bold text-[var(--nav-item)] dark:text-neutral-500 max-md:ps-0 md:block md:ps-10 md:text-2xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-10 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-[var(--nav-item)] dark:text-neutral-500 md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="md:left-0s absolute left-0 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[var(--tertiary-color)] from-[0%] via-[var(--link-color)] via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
