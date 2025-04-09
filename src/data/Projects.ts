import { projects } from "./Links";

const getFaviconUrl = (url: string | undefined): string => {
  if (!url) return "/app/images/logo.png";
  try {
    const domain = new URL(url).origin;
    return `${domain}/favicon.ico`;
  } catch {
    return "/app/images/logo.png";
  }
};

export const ProjectsData = [
  {
    id: "samtax",
    titleKey: "projects.samtax.title",
    descriptionKey: "projects.samtax.description",
    skills: ["React", "Tailwind CSS", "Shadcn UI"],
    links: {
      website: projects.samtax,
    },
    img: getFaviconUrl(projects.samtax),
  },

  {
    id: "gradients-css",
    titleKey: "projects.gradientsCss.title",
    descriptionKey: "projects.gradientsCss.description",
    skills: [
      "React JS",
      "Typescript",
      "Tailwind CSS",
      "Github",
      "Git",
      "RESTful APIs",
    ],
    links: {
      website: projects.gradientscss.website,
      github: projects.gradientscss.github,
    },
    img: getFaviconUrl(projects.gradientscss.website),
  },
  {
    id: "raouf-zadi",
    titleKey: "projects.raoufzadi.title",
    descriptionKey: "projects.raoufzadi.description",
    skills: ["React JS", "Typescript", "Tailwind CSS", "Github", "Git"],
    links: {
      website: projects.raoufzadi,
    },
    img: getFaviconUrl(projects.raoufzadi),
  },

  {
    id: "naj-training-center",
    titleKey: "projects.najTrainingCenter.title",
    descriptionKey: "projects.najTrainingCenter.description",
    skills: ["React JS", "Javascript", "MIUI"],
    links: {
      website: projects.najcenter,
    },
    img: getFaviconUrl(projects.najcenter),
  },
  {
    id: "rove",
    titleKey: "projects.rove.title",
    descriptionKey: "projects.rove.description",
    skills: ["React", "Tailwind CSS", "Laravel", "MYSQL"],
    links: {
      github: projects.rove,
    },
    img: getFaviconUrl(undefined), // No website link available
  },
  {
    id: "sustainable-star",
    titleKey: "projects.sustainableStar.title",
    descriptionKey: "projects.sustainableStar.description",
    skills: ["React", "Tailwind CSS", "Material UI"],
    links: {
      website: projects.sustainablestar,
    },
    img: getFaviconUrl(projects.sustainablestar),
  },
  {
    id: "bookstore-api",
    titleKey: "projects.bookstoreApi.title",
    descriptionKey: "projects.bookstoreApi.description",
    skills: ["Node JS", "Express JS", "Mongoose DB"],
    links: {
      github: projects.bookstoreapi,
    },
    img: getFaviconUrl(undefined),
  },
];
