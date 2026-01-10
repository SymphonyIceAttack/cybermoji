import type { MetadataRoute } from "next";
import type { EmojiCategorySlug } from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import { getAllTopics } from "@/lib/topic-emojis";
import { supportedLocales } from "@/lib/translations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const topics = getAllTopics();

  const staticPages = [
    {
      path: "",
      priority: 1.0,
      changefreq: "daily" as const,
    },
    {
      path: "/about",
      priority: 0.7,
      changefreq: "weekly" as const,
    },
    {
      path: "/contact",
      priority: 0.7,
      changefreq: "weekly" as const,
    },
    {
      path: "/privacy",
      priority: 0.6,
      changefreq: "monthly" as const,
    },
    {
      path: "/terms",
      priority: 0.6,
      changefreq: "monthly" as const,
    },
    {
      path: "/disclaimer",
      priority: 0.5,
      changefreq: "monthly" as const,
    },
    {
      path: "/topic",
      priority: 0.8,
      changefreq: "daily" as const,
    },
  ];

  const categorySlugs: EmojiCategorySlug[] = [
    "all",
    "smileys-emotion",
    "people-body",
    "animals-nature",
    "food-drink",
    "travel-places",
    "activities",
    "objects",
    "symbols",
    "flags",
  ];

  const allUrls: MetadataRoute.Sitemap = [];

  for (const lang of supportedLocales) {
    const langPrefix = `/${lang}`;

    for (const page of staticPages) {
      allUrls.push({
        url: `${baseUrl}${langPrefix}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changefreq,
        priority: page.priority,
      });
    }

    for (const slug of categorySlugs) {
      allUrls.push({
        url: `${baseUrl}${langPrefix}/category/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      });
    }

    for (const topic of topics) {
      allUrls.push({
        url: `${baseUrl}${langPrefix}/topic/${topic.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      });
    }
  }

  return allUrls;
}
