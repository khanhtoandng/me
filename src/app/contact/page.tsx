import { Metadata } from "next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import ContactForm from "@/components/website/ContactForm";
import { webImage } from "@/data/Links";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Baraa Alshaer, a Full Stack Developer, for inquiries, collaborations, or to discuss your next project. Reach out through the contact form or email for professional services and web development consultations.",
  openGraph: {
    title: "Contact - Baraa Alshaer",
    description:
      "Contact Baraa Alshaer, a skilled Full Stack Developer, for project inquiries, consultations, or collaborations. Let's bring your web development ideas to life.",
    url: "https://alshaer.vercel.app/contact",
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "Contact Baraa Alshaer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Baraa Alshaer",
    description:
      "Reach out to Baraa Alshaer, a Full Stack Developer, for professional inquiries, collaborations, and web development services.",
    images: webImage,
  },
};

export default function ContactPage() {
  const styles = {
    breadcrumbLink: "hover:text-[var(--paragraph)] hoverd",
    arrowIcon:
      "text-[var(--paragraph)] text-3xl hoverd hover:text-[var(--link-color)] cursor-pointer ml-[-16px] max-md:ml-[-8px]",
    linkStyle:
      "flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hoverd hover:opacity-100",
  };

  return (
    <div>
      <div className="header  max-md:pt-[50px]">
        <h1 className="header-title">Let's Contact!</h1>
        <p className="description max-w-[100%]">
          Do you have a project that you would like to collaborate on? Please
          feel free to contact me.
        </p>
        <div className="py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <Link href={"/"}>
                <BreadcrumbItem>
                  <BreadcrumbLink className={styles.breadcrumbLink}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Link>

              <div>
                <BreadcrumbSeparator />
              </div>
              <Link href={"/contact"}>
                <BreadcrumbItem>
                  <BreadcrumbLink className={styles.breadcrumbLink}>
                    Contact
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Link>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
