import { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// TODO: ContactForm component needs to be created
import { webImage, websitePath } from '@/data/Links'

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: 'Contact Huynh Tran Khanh Toan | Backend Engineer',
  description:
    'Contact Huynh Tran Khanh Toan (Toan Huynh), Backend Engineer based in Da Nang, Vietnam, currently working at Enosta. Specializing in GraphQL, TypeScript, NestJS, PostgreSQL, and AWS. Get in touch for backend development projects, consultations, or collaboration opportunities.',
  keywords:
    'contact Huynh Tran Khanh Toan, contact Toan Huynh, hire backend engineer Da Nang, GraphQL developer Da Nang, TypeScript developer Vietnam, NestJS expert, PostgreSQL developer, AWS cloud engineer, Enosta developer contact, backend development services Da Nang, khanhtoandng contact',
  openGraph: {
    title: 'Contact Huynh Tran Khanh Toan | Backend Engineer',
    description:
      'Contact Huynh Tran Khanh Toan, Backend Engineer based in Da Nang, Vietnam, working at Enosta. 4+ years experience in GraphQL, TypeScript, NestJS, PostgreSQL, and AWS. Available for backend development projects and consultations.',
    url: websitePath.contact,
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: 'Contact Huynh Tran Khanh Toan - Backend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Huynh Tran Khanh Toan | Backend Engineer',
    description:
      "Reach out to Huynh Tran Khanh Toan, Backend Engineer based in Da Nang, Vietnam, working at Enosta. Expertise in GraphQL, TypeScript, NestJS, PostgreSQL, and AWS. Let's discuss your backend development project!",
    images: webImage,
  },
}

export default function ContactPage() {
  const styles = {
    breadcrumbLink: 'hover:text-[var(--paragraph)] hoverd',
    arrowIcon:
      'text-[var(--paragraph)] text-3xl hoverd hover:text-[var(--link-color)] cursor-pointer ml-[-16px] max-md:ml-[-8px]',
    linkStyle:
      'flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hoverd hover:opacity-100',
  }

  return (
    <div className="container mx-auto">
      <div>
        <div className="header max-md:pt-[50px]">
          <h1 className="header-title">Let's Connect!</h1>
          <p className="description max-w-[100%]">
            Do you have a project that you would like to collaborate on? Please feel free to contact me.
          </p>
          <div className="py-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className={styles.breadcrumbLink}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <div>
                  <BreadcrumbSeparator />
                </div>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/contact" className={styles.breadcrumbLink}>
                    Contact
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* <ContactForm /> */}
        <div className="mt-8 p-6 bg-[var(--card-background)] rounded-lg border border-[var(--card-border-color)]">
          <p className="text-[var(--paragraph)]">Contact form will be available soon. Please reach out via email.</p>
        </div>
      </div>
    </div>
  )
}
