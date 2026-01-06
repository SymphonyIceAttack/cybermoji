import { z } from "zod";

export const blogSchema = z.object({
  "blog.title": z.string(),
  "blog.description": z.string(),
  "blog.heroBadge": z.string(),
  "blog.heroTitle": z.string(),
  "blog.heroTitleHighlight": z.string(),
  "blog.heroSubtitle": z.string(),
  "blog.featuredArticle": z.string(),
  "blog.moreArticles": z.string(),
  "blog.readyToStart": z.string(),
  "blog.putIntoPractice": z.string(),
  "blog.tryNow": z.string(),
  "blog.readArticle": z.string(),
  "blog.read": z.string(),
});

// Combined blogPage schema for validation
export const blogPageSchema = blogSchema;
