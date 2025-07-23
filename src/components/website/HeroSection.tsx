"use client";

import { useContent } from "@/hooks/use-content";
import { useSocialLinks } from "@/hooks/use-social-links";
import { memo } from "react";

import {
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const iconsMap = {
  github: SiGithub,
  linkedin: BsLinkedin,
  youtube: AiFillYoutube,
  twitter: AiFillTwitterCircle,
  email: AiOutlineMail,
  whatsapp: AiOutlineWhatsApp,
  facebook: FaFacebook,
};

function HeroSocialLinks() {
  const { socialLinks, loading } = useSocialLinks(true);

  if (loading) {
    return (
      <p className="text-center text-[var(--paragraph)]">
        Loading social links...
      </p>
    );
  }

  return (
    <section className="py-2">
      <div className="w-full mx-auto   ">
        <div className="text-left mb-4">
          <p
            className="text-[var(--paragraph)] text-sm border-t pt-2"
            style={{ borderColor: "var(--card-border-color)" }}
          >
            Where to find me{" "}
            <span className="text-[var(--headline)] font-medium">
              (digitally)
            </span>{" "}
            if you wish to
          </p>
        </div>

        <div className="mt-4 w-full max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-start gap-4">
            {socialLinks.map((social) => {
              const IconComponent =
                iconsMap[social.icon.toLowerCase() as keyof typeof iconsMap];

              return (
                <a
                  key={social._id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-lg px-3 py-2 font-medium text-xs gap-2 shadow transition focus:outline-none"
                  style={{
                    backgroundColor: "var(--card-background)",
                    border: `1px solid var(--card-border-color)`,
                    color: "var(--headline)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--link-color)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--card-border-color)")
                  }
                >
                  {IconComponent && (
                    <IconComponent
                      aria-hidden="true"
                      className="text-[var(--paragraph)]"
                      size={16}
                    />
                  )}
                  <span>{social.platform}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const { content: heroContent } = useContent("hero");

  const defaultContent = {
    title: "Baraa Alshaer",
    subtitle: "software engineer | Full-Stack Developer",
    description: "",
    content: {
      paragraphs: [
        "I am a Full-Stack Developer from Palestine, specializing in crafting seamless and efficient web applications across both front-end and back-end technologies. I hold a degree in software engineering from Al-Azhar University, where I developed a strong foundation in modern software development principles, problem-solving, and system architecture.",
        "I approach each project with a focus on delivering high-quality solutions, combining my skills in frontend development, backend systems, and overall project design. My aim is to create user-centric applications that not only meet client needs but also drive innovation.",
        "I am dedicated to staying current with industry trends and continuously improving my craft. My work reflects a commitment to excellence and a drive to contribute meaningfully to the tech community.",
      ],
    },
  };

  const displayContent = {
    ...defaultContent,
    ...(heroContent || {}),
    description: heroContent?.description || defaultContent.description,
  };

  return (
    <div className="header max-md:pt-[50px]">
      <div className="header-content">
        <h1 className="header-title text-[var(--headline)]">{displayContent.title}</h1>
        <h1 className="subtitle capitalize text-[var(--headline)]">{displayContent.subtitle}</h1>
        <h1 className="text-[var(--paragraph)]">{displayContent.description}</h1>
      </div>

      {/* Social Links */}
      <HeroSocialLinks />
    </div>
  );
}

export default memo(HeroSection);
