import { Timeline } from "@/components/ui/timeline";
import { useTranslation } from "react-i18next";

export function WorkTimeLine() {
  const { t } = useTranslation();

  const data = [
    {
      id: "frontend-developer-sustainable-star",
      title: t("frontendDeveloperSustainableStar"),
      content: (
        <>
          <p className="font-semibold text-[var(--headline)]">
            {t("company")}:
          </p>
          <p className="text-[var(--paragraph)]">{t("sustainableStarLLC")}</p>
          <p className="font-semibold text-[var(--headline)]">{t("date")}:</p>
          <p className="text-[var(--paragraph)]">2021 - 2022</p>
          <p className="font-semibold text-[var(--headline)]">
            {t("description")}:
          </p>
          <p className="text-[var(--paragraph)]">{t("frontendDescription")}</p>
          <p className="font-semibold text-[var(--headline)]">{t("skills")}:</p>
          <p className="text-[var(--paragraph)]">{t("frontendSkills")}</p>
        </>
      ),
    },
    {
      id: "frontend-developer-ptit",
      title: t("frontendDeveloperPtit"),
      content: (
        <>
          <p className="font-semibold text-[var(--headline)]">
            {t("company")}:
          </p>
          <p className="text-[var(--paragraph)]">{t("ptit")}</p>
          <p className="font-semibold text-[var(--headline)]">{t("date")}:</p>
          <p className="text-[var(--paragraph)]">2020 - 2021</p>
          <p className="font-semibold text-[var(--headline)]">
            {t("description")}:
          </p>
          <p className="text-[var(--paragraph)]">{t("ptitDescription")}</p>
          <p className="font-semibold text-[var(--headline)]">{t("skills")}:</p>
          <p className="text-[var(--paragraph)]">{t("ptitSkills")}</p>
        </>
      ),
    },
    {
      id: "software-engineer-intern-gedco",
      title: t("softwareEngineerInternGedco"),
      content: (
        <>
          <p className="font-semibold text-[var(--headline)]">
            {t("company")}:
          </p>
          <p className="text-[var(--paragraph)]">{t("gedco")}</p>
          <p className="font-semibold text-[var(--headline)]">{t("date")}:</p>
          <p className="text-[var(--paragraph)]">2019</p>
          <p className="font-semibold text-[var(--headline)]">
            {t("description")}:
          </p>
          <p className="text-[var(--paragraph)]">{t("gedcoDescription")}</p>
          <p className="font-semibold text-[var(--headline)]">{t("skills")}:</p>
          <p className="text-[var(--paragraph)]">{t("gedcoSkills")}</p>
        </>
      ),
    },
  ];

  return <Timeline data={data} />;
}
