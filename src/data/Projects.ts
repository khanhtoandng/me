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
      website: "https://sam-tax.com",
    },
    img: getFaviconUrl("https://sam-tax.com"),
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
      website: "https://gradientscss.vercel.app/",
      github: "https://github.com/balshaer/gradients-css",
    },
    img: getFaviconUrl("https://gradientscss.vercel.app/"),
  },
  {
    id: "raouf-zadi",
    titleKey: "projects.raoufzadi.title",
    descriptionKey: "projects.raoufzadi.description",
    skills: ["React JS", "Typescript", "Tailwind CSS", "Github", "Git"],
    links: {
      website: "https://raoufzadi.vercel.app",
    },
    img: getFaviconUrl("https://raoufzadi.vercel.app"),
  },

  {
    id: "naj-training-center",
    titleKey: "projects.najTrainingCenter.title",
    descriptionKey: "projects.najTrainingCenter.description",
    skills: ["React JS", "Javascript", "MIUI"],
    links: {
      website: "https://naj.shamilapp.com/",
    },
    img: getFaviconUrl("https://naj.shamilapp.com/"),
  },
  {
    id: "rove",
    titleKey: "projects.rove.title",
    descriptionKey: "projects.rove.description",
    skills: ["React", "Tailwind CSS", "Laravel", "MYSQL"],
    links: {
      github: "https://github.com/balshaer/rove",
    },
    img: getFaviconUrl(undefined), // No website link available
  },
  {
    id: "sustainable-star",
    titleKey: "projects.sustainableStar.title",
    descriptionKey: "projects.sustainableStar.description",
    skills: ["React", "Tailwind CSS", "Material UI"],
    links: {
      website: "https://sustainablestar.com.sa/",
    },
    img: getFaviconUrl("https://sustainablestar.com.sa/"),
  },
  {
    id: "bookstore-api",
    titleKey: "projects.bookstoreApi.title",
    descriptionKey: "projects.bookstoreApi.description",
    skills: ["Node JS", "Express JS", "Mongoose DB"],
    links: {
      github: "https://github.com/balshaer/bookstore-api",
    },
    img: getFaviconUrl(undefined),
  },
];
