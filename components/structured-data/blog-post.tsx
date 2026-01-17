import type { BlogPosting, ImageObject, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";

interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  imageUrl?: string;
}

export function BlogPostStructuredData({
  title,
  description,
  slug,
  publishedAt,
  imageUrl,
}: BlogPostStructuredDataProps) {
  const postUrl = `${siteConfig.siteUrl}/en/posts/${slug}`;

  const publisherLogo: ImageObject = {
    "@type": "ImageObject",
    url: `${siteConfig.siteUrl}/base-logo.webp`,
    width: "1024",
    height: "1024",
  };

  const blogPostSchema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: postUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      logo: publisherLogo,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    inLanguage: "en",
    image: imageUrl ? `${siteConfig.siteUrl}${imageUrl}` : undefined,
    keywords: ["emoji", "emojis", "unicode", "cybermoji", "blog"],
    articleSection: "Technology",
    audience: {
      "@type": "Audience",
      audienceType: "General",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(blogPostSchema),
      }}
    />
  );
}
