import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  ar: () => import("./ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!locale || !(locale in dictionaries)) {
    return dictionaries.en();
  }
  return dictionaries[locale as keyof typeof dictionaries]();
};
