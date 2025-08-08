import PostsPreview from '@/components/sections/blog/PostsPreview'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Metadata } from 'next'

import { webImage, websitePath } from '@/data/Links'

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: 'Blog Posts by Huynh Tran Khanh Toan | Backend Engineering Insights',
  description:
    'Read blog posts and articles by Huynh Tran Khanh Toan (Toan Huynh), Backend Engineer based in Da Nang, Vietnam, working at Enosta. Insights on GraphQL, TypeScript, NestJS, PostgreSQL, AWS, cloud-native applications, and modern backend development practices.',
  keywords:
    'Huynh Tran Khanh Toan blog, Toan Huynh articles, backend engineering blog Da Nang, GraphQL tutorials Vietnam, TypeScript tips, NestJS articles, PostgreSQL insights, AWS cloud tutorials, backend development blog, Enosta developer blog, khanhtoandng posts, Da Nang tech blog',
  openGraph: {
    title: 'Blog Posts by Huynh Tran Khanh Toan | Backend Engineering Insights',
    description:
      'Discover blog posts and articles by Huynh Tran Khanh Toan, Backend Engineer based in Da Nang, Vietnam, working at Enosta. Sharing insights on GraphQL, TypeScript, NestJS, PostgreSQL, AWS, and modern backend development practices.',
    url: websitePath.posts,
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: 'Huynh Tran Khanh Toan Blog Posts',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Posts by Huynh Tran Khanh Toan | Backend Engineering Insights',
    description:
      'Explore blog posts by Huynh Tran Khanh Toan, Backend Engineer based in Da Nang, Vietnam, working at Enosta. Stay updated with insights on GraphQL, TypeScript, NestJS, PostgreSQL, AWS, and backend development practices.',
    images: webImage,
  },
}

export default function PostsPage() {
  const styles = {
    breadcrumbLink: 'hover:text-[var(--paragraph)] hoverd',
    arrowIcon:
      'text-[var(--paragraph)] text-3xl hoverd hover:text-[var(--link-color)] cursor-pointer ml-[-16px] max-md:ml-[-8px]',
    linkStyle:
      'flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hoverd hover:opacity-100',
  }

  return (
    <>
      <div className="posts container mx-auto flex min-h-[100vh] w-full flex-col gap-5 max-md:pb-0 max-md:pt-[50px]">
        <div className="header">
          <h1 className="header-title">Latest posts</h1>
          <p className="description max-w-[100%]">Explore my latest posts on web development, programming, and tech.</p>
          <div className="py-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className={styles.breadcrumbLink} href={'/'}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <div>
                  <BreadcrumbSeparator />
                </div>
                <BreadcrumbItem>
                  <BreadcrumbLink className={styles.breadcrumbLink} href={'/posts'}>
                    Posts
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <PostsPreview />
      </div>
    </>
  )
}
