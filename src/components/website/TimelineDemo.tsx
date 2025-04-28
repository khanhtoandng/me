import { Timeline } from "@/components/ui/timeline";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { companies } from "@/data/Links";
import { Briefcase } from "lucide-react";
import { ScrollEffect } from "@/lib/animations";

export function TimelineDemo() {
  const styles = {
    sectionTitle:
      "flex flex-row gap-1 pb-2 text-sm sm:text-lg md:text-xl max-md:text-base max-md:flex-wrap",
    sectionDescription:
      "description opacity-80 mt-0 pb-2 pt-0 text-sm md:text-base",
  };

  const data = [
    {
      title: "Jan 2024 - Present",
      content: (
        <section>
          <header>
            <h2 className={styles.sectionTitle}>
              <span>Full-Stack Engineer</span>{" "}
              <span className="opacity-60">at</span>
              <span>
                <Link href={companies.samtax} target="_blank">
                  Samtax
                </Link>
              </span>
            </h2>
            <p className={styles.sectionDescription}>
              Work as a Full-Stack Engineer, responsible for developing the main
              website for Samtax. Build tools to help the company get work done
              faster.
            </p>
          </header>

          <div className="flex gap-3 pt-2 md:pb-[28px] flex-wrap max-md:overflow-hidden">
            <Badge className="w-max">React js</Badge>
            <Badge className="w-max">Typescript</Badge>
            <Badge className="w-max">Tailwind CSS</Badge>
            <Badge className="w-max">Express js</Badge>
            <Badge className="w-max">MongoDB</Badge>
            <Badge className="w-max">Node js</Badge>
            <Badge className="w-max">Ai apis</Badge>
            <Badge className="w-max">RESTful APIs</Badge>
          </div>
        </section>
      ),
    },

    {
      title: "Jul 2023 - Oct 2023",
      content: (
        <section>
          <header>
            <h2 className={styles.sectionTitle}>
              <span>Frontend Developer</span>{" "}
              <span className="opacity-60">at</span>
              <span>
                <Link href={companies.sustainablestar} target="_blank">
                  Sustainable Star LLC
                </Link>
              </span>
            </h2>
            <p className={styles.sectionDescription}>
              Worked as a frontend developer using React, responsible for
              developing the main website for Sustainable Star LLC and
              significantly contributing to the SFB project.
            </p>
          </header>

          <div className="flex gap-3 pt-2 md:pb-[28px] flex-wrap max-md:overflow-hidden">
            <Badge className="w-max">React js</Badge>
            <Badge className="w-max">Typescript</Badge>
            <Badge className="w-max">Tailwind CSS</Badge>
            <Badge className="w-max">Github</Badge>
            <Badge className="w-max">Git</Badge>
            <Badge className="w-max">RESTful APIs</Badge>
          </div>
        </section>
      ),
    },
    {
      title: "Jul 2023 - Sep 2023",
      content: (
        <section>
          <header>
            <h2 className={styles.sectionTitle}>
              <span>Frontend Developer</span>{" "}
              <span className="opacity-60">at</span>
              <Link href={companies.ptit} target="_blank">
                <span>PTIT</span>
              </Link>
            </h2>
            <p className={styles.sectionDescription}>
              Worked as a React developer, responsible for rebuilding and
              updating several projects, as well as developing new projects.
            </p>
          </header>

          <div className="flex gap-3 pt-2 md:pb-[28px] flex-wrap max-md:overflow-hidden">
            <Badge className="w-max">React js</Badge>
            <Badge className="w-max">Typescript</Badge>
            <Badge className="w-max">Tailwind CSS</Badge>
            <Badge className="w-max">Github</Badge>
            <Badge className="w-max">Git</Badge>
            <Badge className="w-max">RESTful APIs</Badge>
          </div>
        </section>
      ),
    },
    {
      title: "Apr 2022 - Jun 2022",
      content: (
        <section>
          <header>
            <h2 className={styles.sectionTitle}>
              <span>Software Engineer Intern</span>{" "}
              <span className="opacity-60">at</span>
              <Link href={companies.gedco} target="_blank">
                <span>GEDCO</span>
              </Link>
            </h2>
            <p className={styles.sectionDescription}>
              Completed an internship at GEDCO as a software engineer through my
              college.
            </p>
          </header>

          <div className="flex gap-3 pt-2 md:pb-[28px] flex-wrap max-md:overflow-hidden">
            <Badge className="w-max">PHP</Badge>
            <Badge className="w-max">MYSQL</Badge>
            <Badge className="w-max">Java</Badge>
          </div>
        </section>
      ),
    },
  ];

  return (
    <div id="work" className="h-max w-full px-0 py-10">
      <ScrollEffect type="fadeIn">
        <div className="section-header mb-8">
          <h2 className="section-title flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[var(--link-color)]" />
            Work Experience
          </h2>
          <p className="description">
            My professional journey and the companies I've worked with.
          </p>
        </div>
      </ScrollEffect>
      <Timeline data={data} />
    </div>
  );
}
