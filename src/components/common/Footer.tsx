"use client";

import { github, linkedin, youtube } from "@/data/Links";
import { scrollToTop } from "@/lib/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface footerLinksType {
  title: string;
  link: string;
}

export default function Footer() {
  const linkStyle = "hover:tracking-widest hoverd";
  const currentYear = new Date().getFullYear();
  const direction = "en";
  const path = usePathname();
  const isDasboard = path.startsWith("/dasboard");

  const footerLinks: footerLinksType[] = [
    {
      title: "youtube",
      link: youtube,
    },
    {
      title: "github",
      link: github,
    },

    {
      title: "projects",
      link: "/projects",
    },
    {
      title: "linkedin",
      link: linkedin,
    },
  ];

  return (
    <>
      {!isDasboard ? (
        <footer className="w-full z-40  max-md:overflow-hidden border-t-[0.5px] border-[var(--footer-border-color)] bg-[var(--footer-background)]">
          <div className="container mx-auto flex items-center justify-between py-10 max-md:flex-col max-md:gap-4 max-md:p-0 max-md:py-14">
            <div
              dir={direction}
              className="hoverd flex gap-2 text-sm capitalize text-[var(--footer-text)] max-md:flex-col max-md:items-center"
            >
              <div
                dir={direction}
                className="flex max-md:flex-wrap h-full gap-2"
              >
                {footerLinks.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (item.title == "Projects") {
                        scrollToTop();
                      }
                    }}
                  >
                    .{" "}
                    <Link className={`${linkStyle}`} href={item.link}>
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center max-md:flex-wrap gap-1 text-sm capitalize text-[var(--footer-text)] opacity-90">
              <span>&copy; {currentYear}</span>
              <span>All Rights Reserved</span>
            </div>
          </div>
        </footer>
      ) : (
        <footer>dashboard footer</footer>
      )}
    </>
  );
}
