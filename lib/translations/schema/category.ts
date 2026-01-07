import { z } from "zod";

export const categoryAnalysisSchema = z.object({
  "category.analysis.title": z.string(),
  "category.analysis.subtitle": z.string(),
  "category.analysis.totalEmojis": z.string(),
  "category.analysis.subgroups": z.string(),
  "category.analysis.trending": z.string(),
  "category.analysis.mostUsed": z.string(),
  "category.analysis.newest": z.string(),
  "category.analysis.usageStats": z.string(),
  "category.analysis.popularityScore": z.string(),
  "category.analysis.dailyViews": z.string(),
  "category.analysis.copyCount": z.string(),
  "category.analysis.lastUpdated": z.string(),
});

export const categoryPainPointsSchema = z.object({
  "category.painPoints.title": z.string(),
  "category.painPoints.subtitle": z.string(),
  "category.painPoints.findFast.title": z.string(),
  "category.painPoints.findFast.desc": z.string(),
  "category.painPoints.crossPlatform.title": z.string(),
  "category.painPoints.crossPlatform.desc": z.string(),
  "category.painPoints.organization.title": z.string(),
  "category.painPoints.organization.desc": z.string(),
  "category.painPoints.batchCopy.title": z.string(),
  "category.painPoints.batchCopy.desc": z.string(),
  "category.painPoints.privacy.title": z.string(),
  "category.painPoints.privacy.desc": z.string(),
});

export const categoryTechSchema = z.object({
  "category.tech.title": z.string(),
  "category.tech.subtitle": z.string(),
  "category.tech.emojiDb.title": z.string(),
  "category.tech.emojiDb.desc": z.string(),
  "category.tech.performance.title": z.string(),
  "category.tech.performance.desc": z.string(),
  "category.tech.searchEngine.title": z.string(),
  "category.tech.searchEngine.desc": z.string(),
  "category.tech.caching.title": z.string(),
  "category.tech.caching.desc": z.string(),
  "category.tech.typing.title": z.string(),
  "category.tech.typing.desc": z.string(),
  "category.tech.i18n.title": z.string(),
  "category.tech.i18n.desc": z.string(),
});

export const categoryUsageSchema = z.object({
  "category.usage.title": z.string(),
  "category.usage.subtitle": z.string(),
  "category.usage.platform.title": z.string(),
  "category.usage.platform.desc": z.string(),
  "category.usage.unicode.title": z.string(),
  "category.usage.unicode.desc": z.string(),
  "category.usage.regions.title": z.string(),
  "category.usage.regions.desc": z.string(),
  "category.usage.zwj.title": z.string(),
  "category.usage.zwj.desc": z.string(),
  "category.usage.skinTones.title": z.string(),
  "category.usage.skinTones.desc": z.string(),
  "category.usage.bestPractices.title": z.string(),
  "category.usage.bestPractices.desc": z.string(),
});

export const categoryExamplesSchema = z.object({
  "category.examples.title": z.string(),
  "category.examples.subtitle": z.string(),
  "category.examples.social.title": z.string(),
  "category.examples.social.desc": z.string(),
  "category.examples.messaging.title": z.string(),
  "category.examples.messaging.desc": z.string(),
  "category.examples.professional.title": z.string(),
  "category.examples.professional.desc": z.string(),
  "category.examples.creative.title": z.string(),
  "category.examples.creative.desc": z.string(),
  "category.examples.education.title": z.string(),
  "category.examples.education.desc": z.string(),
  "category.examples.tips.title": z.string(),
  "category.examples.tips.desc": z.string(),
});

export const categoryFeatureToggleSchema = z.object({
  "category.toggle.title": z.string(),
  "category.toggle.subtitle": z.string(),
  "category.toggle.details": z.string(),
  "category.toggle.details.desc": z.string(),
  "category.toggle.largeGrid": z.string(),
  "category.toggle.largeGrid.desc": z.string(),
  "category.toggle.compactGrid": z.string(),
  "category.toggle.compactGrid.desc": z.string(),
  "category.toggle.showTags": z.string(),
  "category.toggle.showTags.desc": z.string(),
  "category.toggle.skinTones": z.string(),
  "category.toggle.skinTones.desc": z.string(),
  "category.toggle.autoCopy": z.string(),
  "category.toggle.autoCopy.desc": z.string(),
  "category.toggle.animations": z.string(),
  "category.toggle.animations.desc": z.string(),
});

export const categoryFAQSchema = z.object({
  "category.faq.title": z.string(),
  "category.faq.subtitle": z.string(),
  "category.faq.q1": z.string(),
  "category.faq.a1": z.string(),
  "category.faq.q2": z.string(),
  "category.faq.a2": z.string(),
  "category.faq.q3": z.string(),
  "category.faq.a3": z.string(),
  "category.faq.q4": z.string(),
  "category.faq.a4": z.string(),
  "category.faq.q5": z.string(),
  "category.faq.a5": z.string(),
  "category.faq.q6": z.string(),
  "category.faq.a6": z.string(),
  "category.faq.q7": z.string(),
  "category.faq.a7": z.string(),
  "category.faq.q8": z.string(),
  "category.faq.a8": z.string(),
});

export const categorySchema = categoryAnalysisSchema
  .merge(categoryPainPointsSchema)
  .merge(categoryTechSchema)
  .merge(categoryUsageSchema)
  .merge(categoryExamplesSchema)
  .merge(categoryFeatureToggleSchema)
  .merge(categoryFAQSchema);
