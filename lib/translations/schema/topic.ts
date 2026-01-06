import { z } from "zod";

export const topicSchema = z.object({
  "topic.indexTitle": z.string(),
  "topic.indexDescription": z.string(),
  "topic.tapToCopy": z.string(),
  "topic.longPress": z.string(),
  "topic.relatedTopics": z.string(),
  "topic.primaryEmoji": z.string(),
  "topic.primaryEmojis": z.string(),
  "topic.combinations": z.string(),
  "topic.combinationsCount": z.string(),
  "topic.noResults": z.string(),
  "topic.popularity": z.string(),
  "topic.browseEmojis": z.string(),
  "topic.clickToCopy": z.string(),
  "topic.browseCategory": z.string(),
});

export const categorySchema = z.object({
  "category.browseAndCopy": z.string(),
});

export const topicPageSchema = z.object({
  "topicPage.features.mainTitle": z.string(),
  "topicPage.features.mainTitle2": z.string(),
  "topicPage.features.mainTitle3": z.string(),
  "topicPage.features.mainDesc": z.string(),
  "topicPage.features.browseTitle": z.string(),
  "topicPage.features.browseSubtitle": z.string(),
  "topicPage.features.browseDesc": z.string(),
  "topicPage.features.browseList": z.string(),
  "topicPage.features.searchTitle": z.string(),
  "topicPage.features.searchSubtitle": z.string(),
  "topicPage.features.searchDesc": z.string(),
  "topicPage.features.searchList": z.string(),
  "topicPage.features.copyTitle": z.string(),
  "topicPage.features.copySubtitle": z.string(),
  "topicPage.features.copyDesc": z.string(),
  "topicPage.features.copyList": z.string(),
  "topicPage.features.favoritesTitle": z.string(),
  "topicPage.features.favoritesSubtitle": z.string(),
  "topicPage.features.favoritesDesc": z.string(),
  "topicPage.features.favoritesList": z.string(),
  "topicPage.features.privacyTitle": z.string(),
  "topicPage.features.privacyDesc": z.string(),
  "topicPage.features.speedTitle": z.string(),
  "topicPage.features.speedDesc": z.string(),
  "topicPage.features.mobileTitle": z.string(),
  "topicPage.features.mobileDesc": z.string(),
  "topicPage.features.updatedTitle": z.string(),
  "topicPage.features.updatedDesc": z.string(),
  "topicPage.features.langTitle": z.string(),
  "topicPage.features.langDesc": z.string(),
  "topicPage.features.noAccountTitle": z.string(),
  "topicPage.features.noAccountDesc": z.string(),
});

// Combined topics schema for validation
export const topicsSchema = z.object({
  ...topicSchema.shape,
  ...categorySchema.shape,
  ...topicPageSchema.shape,
});
