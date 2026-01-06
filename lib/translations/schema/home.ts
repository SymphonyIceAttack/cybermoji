import { z } from "zod";

export const heroSchema = z.object({
  "home.hero.title": z.string(),
  "home.hero.subtitle": z.string(),
  "home.hero.available": z.string(),
  "home.hero.availableTitle": z.string(),
  "home.hero.availableTitle2": z.string(),
  "home.hero.availableSubtitle": z.string(),
  "home.hero.availableText": z.string(),
  "home.hero.featuresTitle": z.string(),
  "home.hero.featuresSubtitle": z.string(),
  "home.hero.featuresTitle2": z.string(),
  "home.hero.featuresDesc": z.string(),
  "home.hero.advantagesTitle": z.string(),
  "home.hero.advantagesSubtitle": z.string(),
  "home.hero.advantagesTitle2": z.string(),
  "home.hero.advantagesDesc": z.string(),
});

export const featuresSchema = z.object({
  "home.features.title": z.string(),
  "home.features.subtitle": z.string(),
  "home.features.mainTitle": z.string(),
  "home.features.mainTitle2": z.string(),
  "home.features.mainTitle3": z.string(),
  "home.features.mainDesc": z.string(),
  "home.features.browseTitle": z.string(),
  "home.features.browseSubtitle": z.string(),
  "home.features.browseDesc": z.string(),
  "home.features.searchTitle": z.string(),
  "home.features.searchSubtitle": z.string(),
  "home.features.searchDesc": z.string(),
  "home.features.copyTitle": z.string(),
  "home.features.copySubtitle": z.string(),
  "home.features.copyDesc": z.string(),
  "home.features.favoritesTitle": z.string(),
  "home.features.favoritesSubtitle": z.string(),
  "home.features.favoritesDesc": z.string(),
  "home.features.privacyTitle": z.string(),
  "home.features.privacyDesc": z.string(),
  "home.features.speedTitle": z.string(),
  "home.features.speedDesc": z.string(),
  "home.features.mobileTitle": z.string(),
  "home.features.mobileDesc": z.string(),
  "home.features.updatedTitle": z.string(),
  "home.features.updatedDesc": z.string(),
  "home.features.langTitle": z.string(),
  "home.features.langDesc": z.string(),
  "home.features.noAccountTitle": z.string(),
  "home.features.noAccountDesc": z.string(),
});

export const moreReasonsSchema = z.object({
  "home.moreReasons.title": z.string(),
  "home.moreReasons.subtitle": z.string(),
  "home.moreReasons.crossPlatform": z.string(),
  "home.moreReasons.crossPlatformDesc": z.string(),
  "home.moreReasons.alwaysUpdated": z.string(),
  "home.moreReasons.alwaysUpdatedDesc": z.string(),
  "home.moreReasons.lightningFast": z.string(),
  "home.moreReasons.lightningFastDesc": z.string(),
  "home.moreReasons.noAds": z.string(),
  "home.moreReasons.noAdsDesc": z.string(),
  "home.moreReasons.darkMode": z.string(),
  "home.moreReasons.darkModeDesc": z.string(),
  "home.moreReasons.secureConnection": z.string(),
  "home.moreReasons.secureConnectionDesc": z.string(),
  "home.moreReasons.freeForever": z.string(),
  "home.moreReasons.freeForeverDesc": z.string(),
});

export const howItWorksSchema = z.object({
  "home.howItWorks.title": z.string(),
  "home.howItWorks.subtitle": z.string(),
  "home.howItWorks.step1": z.string(),
  "home.howItWorks.step1Title": z.string(),
  "home.howItWorks.step1Desc": z.string(),
  "home.howItWorks.step2": z.string(),
  "home.howItWorks.step2Title": z.string(),
  "home.howItWorks.step2Desc": z.string(),
  "home.howItWorks.step3": z.string(),
  "home.howItWorks.step3Title": z.string(),
  "home.howItWorks.step3Desc": z.string(),
});

export const faqSchema = z.object({
  "home.faq.badge": z.string(),
  "home.faq.titleLarge": z.string(),
  "home.faq.titleLarge2": z.string(),
  "home.faq.subtitleLarge": z.string(),
  "home.faq.featuresTitle": z.string(),
  "home.faq.using": z.string(),
  "home.faq.technical": z.string(),
  "home.faq.q1": z.string(),
  "home.faq.a1": z.string(),
  "home.faq.q2": z.string(),
  "home.faq.a2": z.string(),
  "home.faq.q3": z.string(),
  "home.faq.a3": z.string(),
  "home.faq.q4": z.string(),
  "home.faq.a4": z.string(),
  "home.faq.q5": z.string(),
  "home.faq.a5": z.string(),
  "home.faq.q6": z.string(),
  "home.faq.a6": z.string(),
  "home.faq.q7": z.string(),
  "home.faq.a7": z.string(),
  "home.faq.q8": z.string(),
  "home.faq.a8": z.string(),
  "home.faq.q9": z.string(),
  "home.faq.a9": z.string(),
  "home.faq.q10": z.string(),
  "home.faq.a10": z.string(),
  "home.faq.q11": z.string(),
  "home.faq.a11": z.string(),
  "home.faq.q12": z.string(),
  "home.faq.a12": z.string(),
  "home.faq.usageTitle": z.string(),
  "home.faq.techTitle": z.string(),
});

export const trendingSchema = z.object({
  "home.trending.title": z.string(),
  "home.trending.subtitle": z.string(),
});

export const categoriesSchema = z.object({
  "home.categories.title": z.string(),
  "home.categories.subtitle": z.string(),
});

export const ctaSchema = z.object({
  "home.cta.ready": z.string(),
  "home.cta.subtitle": z.string(),
  "home.cta.button": z.string(),
});

// Combined home schema for validation
export const homeSchema = z.object({
  ...heroSchema.shape,
  ...featuresSchema.shape,
  ...moreReasonsSchema.shape,
  ...howItWorksSchema.shape,
  ...faqSchema.shape,
  ...trendingSchema.shape,
  ...categoriesSchema.shape,
  ...ctaSchema.shape,
});
