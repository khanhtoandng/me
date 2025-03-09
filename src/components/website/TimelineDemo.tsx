import { Timeline } from "@/components/ui/timeline";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import Link from "next/link";

export function TimelineDemo() {
  const styles = {
    sectionTitle: "flex flex-row gap-1 pb-2 text-sm sm:text-lg md:text-xl max-md:text-base max-md:flex-wrap",
    sectionDescription: "description opacity-80 mt-0 pb-2 pt-0 text-sm md:text-base",
  };
  



  const data = [
    {
      title: "Jul 2023 - Oct 2023",
      content: (
        <>
          <div>
            <h1 className={styles.sectionTitle}>
              <span>Frontend Developer</span> <span className="opacity-60">at</span>
              <span>
                <Link href="#" target="_blank">
                  Sustainable Star LLC
                </Link>
              </span>
            </h1>
            <p className={styles.sectionDescription}>
              Worked as a frontend developer using React, responsible for
              developing the main website for Sustainable Star LLC and
              significantly contributing to the SFB project.
            </p>
          </div>
  
          <div className="flex gap-3 pt-2 flex-wrap">
            <Badge className="w-max">React js</Badge>
            <Badge className="w-max">Typescript</Badge>
            <Badge className="w-max">Tailwind CSS</Badge>
            <Badge className="w-max">Github</Badge>
            <Badge className="w-max">Git</Badge>
            <Badge className="w-max">RESTful APIs</Badge>
          </div>
        </>
      ),
    },
    {
      title: "Jul 2023 - Sep 2023",
      content: (
        <>
          <div>
            <h1 className={styles.sectionTitle}>
              <span>Frontend Developer</span> <span className="opacity-60">at</span>
              <span>PTIT</span>
            </h1>
            <p className={styles.sectionDescription}>
              Worked as a React developer, responsible for rebuilding and
              updating several projects, as well as developing new projects.
            </p>
  
            <div className="flex gap-3 pt-2 flex-wrap">
              <Badge className="w-max">React js</Badge>
              <Badge className="w-max">Typescript</Badge>
              <Badge className="w-max">Tailwind CSS</Badge>
              <Badge className="w-max">Github</Badge>
              <Badge className="w-max">Git</Badge>
              <Badge className="w-max">RESTful APIs</Badge>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Apr 2022 - Jun 2022",
      content: (
        <>
          <div>
            <h1 className={styles.sectionTitle}>
              <span>Software Engineer Intern</span> <span className="opacity-60">at</span>
              <span>GEDCO</span>
            </h1>
            <p className={styles.sectionDescription}>
              Completed an internship at GEDCO as a software engineer through my
              college.
            </p>
          </div>
  
          <div className="flex gap-3 pt-2 flex-wrap">
            <Badge className="w-max">PHP</Badge>
            <Badge className="w-max">MYSQL</Badge>
            <Badge className="w-max">Java</Badge>
          </div>
        </>
      ),
    },
  ];
  

  return (
    <div id="work" className="h-max min-h-screen w-full  sm:px-6 md:px-8 max-md:px-0">
      <Timeline data={data} />
    </div>
  );
}
