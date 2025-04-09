"use client";
import { ScrollEffect } from "@/lib/animations";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

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
    offset: ["start 30%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="mx-auto w-full  bg-transparent md:pt-10" ref={containerRef}>
      <div className="section ">
        <h2 className="section-title pb-0">Employment History</h2>
        <p className="description">
          Here is a brief overview of my employment history.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-[1400px] pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-5 max-md:pt-10 md:gap-10 max-md:ps-[30px]"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 max-md:left-[-40px] flex h-10 w-10 items-center justify-center rounded-full bg-transparent md:left-3">
                <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800" />
              </div>
              <h3 className="hidden text-xl font-bold text-neutral-500 dark:text-neutral-500 md:block md:pl-16 md:text-2xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full max-md:ps-0 max-md:px-0 pr-4 ps-20 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl max-md:text-xl font-bold text-neutral-500 dark:text-neutral-500 md:hidden">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 max-md:left-[10px] top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700 md:left-8 max-md:max-h-[150vh]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-purple-900 via-[8%]  to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
