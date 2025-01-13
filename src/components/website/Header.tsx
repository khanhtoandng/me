import { useTranslation } from "react-i18next";

import i18n from "@/i18n";
import ContactSection from "./ContactSection";

export default function Header() {
  const { t } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <div className="header max-md:pt-[70px]" dir={direction}>
      <div className="header-content">
        <h1 className="header-title">{t("Header.Title")}</h1>
        <h1 className="subtitle">{t("Header.Subtitle")}</h1>

        <p className={"description"}>{t("Header.Description1")}</p>
    
        <p className={"description"}>{t("Header.Description2")}</p>
        <p className={"description"}>{t("Header.Description3")}</p>
      </div>
      <ContactSection />
    </div>
  );
}
