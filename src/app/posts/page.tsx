import PostsPreview from "@/components/website/PostsPreview";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";
import Link from "next/link";
import { webImage } from "@/data/Links";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "Explore the latest blog posts by Baraa Alshaer, a Full Stack Developer. Stay updated with insights, tutorials, and projects related to web development, technology, and more.",
  openGraph: {
    title: "Posts - Baraa Alshaer",
    description:
      "Discover the latest posts and articles by Baraa Alshaer, a Full Stack Developer sharing his insights on web development, technology, and other related topics.",
    url: "https://alshaer.vercel.app/posts",
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "Baraa Alshaer Posts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Posts - Baraa Alshaer",
    description:
      "Explore the latest blog posts by Baraa Alshaer, a Full Stack Developer. Stay updated with insights, tutorials, and projects related to web development, technology, and more.",
    images: webImage,
  },
};

export default function PostsPage() {
  const styles = {
    breadcrumbLink: "hover:text-[var(--paragraph)] hoverd",
    arrowIcon:
      "text-[var(--paragraph)] text-3xl hoverd hover:text-[var(--link-color)] cursor-pointer ml-[-16px] max-md:ml-[-8px]",
    linkStyle:
      "flex items-center justify-center gap-1 text-sm text-[var(--headline)] opacity-70 hoverd hover:opacity-100",
  };

  return (
    <div className="posts  flex min-h-[100vh] w-full flex-col gap-5 max-md:pb-0 max-md:pt-[50px]">
      <div className="header">
        <h1 className="header-title">Latest posts</h1>
        <p className="description max-w-[100%]">
          Explore my latest posts on web development, programming, and tech.
        </p>
        <div className="py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link className={styles.breadcrumbLink} href={"/"}>
                  Home
                </Link>
              </BreadcrumbItem>
              <div>
                <BreadcrumbSeparator />
              </div>
              <BreadcrumbItem>
                <Link className={styles.breadcrumbLink} href={"/posts"}>
                  Posts
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <PostsPreview />
    </div>
  );
}
