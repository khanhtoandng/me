import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import SEO from "@/components/featuers/SEO";
import { MagicCard } from "@/components/ui/MagicCard";
import { ContactForm } from "@/components/website/ContactForm";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const styles = {
    breadcrumbLink: "hover:text-[var(--paragraph)] hoverd",
    arrowIcon:
      "text-[var(--paragraph)] text-3xl hoverd hover:text-[var(--link-color)] cursor-pointer ml-[-16px] max-md:ml-[-8px]",
    linkStyle:
      "flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hoverd hover:opacity-100",
  };

  return (
    <>
      <SEO
        title="Contact - Baraa Alshaer"
        description="Get in touch with Baraa Alshaer for inquiries, collaborations, or feedback."
        keywords={[
          "Baraa Alshaer",
          "Contact",
          "Web Developer",
          "Full Stack Developer",
          "Portfolio",
        ]}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        dir={direction}
        className="contactPage flex min-h-[100vh] w-full flex-col gap-5 max-md:pb-0 max-md:pt-[50px]"
      >
        <div className="header">
          <h1 className="header-title">{t("Contact.Title")}</h1>
          <p className="description max-w-[100%]">{t("Contact.Description")}</p>
          <div className="py-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link to={"/"}>
                    <BreadcrumbLink className={styles.breadcrumbLink}>
                      {t("Navbar.Home")}
                    </BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <div>
                  {i18n.language === "ar" ? (
                    <BreadcrumbSeparator
                      style={{ transform: "rotate(180deg)" }}
                    />
                  ) : (
                    <BreadcrumbSeparator />
                  )}
                </div>
                <BreadcrumbItem>
                  <Link to={"/contact"}>
                    <BreadcrumbLink className={styles.breadcrumbLink}>
                      {t("Navbar.Contact")}
                    </BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <MagicCard gradientColor={"#7e7e7e12"} ref={undefined}>
          <ContactForm />
        </MagicCard>

        <br />
      </motion.div>
    </>
  );
}
