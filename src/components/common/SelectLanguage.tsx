import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectLanguageProps {
  currentLanguage: string;
  onChange: (lng: string) => void;
}

const languages = [
  { code: "en", name: "English", flag: "/ukflag.svg" },
  { code: "ar", name: "العربية", flag: "/psflag.svg" },
];

const currentLanguage = "en";
function changeLanguage() {}

const SelectLanguage: React.FC<SelectLanguageProps> = () => {
  return (
    <div className="relative inline-block">
      <Select onValueChange={changeLanguage} defaultValue={currentLanguage}>
        <SelectTrigger
          className="w-[180px] bg-[var(--card-background)] text-[var(--card-headline)]"
          aria-label={"SelectLanguage"}
        >
          <SelectValue placeholder={"SelectLanguage"} />
        </SelectTrigger>
        <SelectContent className="bg-[var(--card-background)] text-[var(--card-headline)]">
          <SelectGroup className="bg-[var(--card-background)] text-[var(--card-headline)]">
            {languages.map((language) => (
              <SelectItem
                key={language.code}
                value={language.code}
                className="flex items-center gap-2 bg-[var(--card-background)] text-[var(--card-headline)]"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={language.flag}
                    alt={language.code}
                    className="h-5 w-5"
                  />
                  <span>{language.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectLanguage;
