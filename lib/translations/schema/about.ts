import { z } from "zod";

export const aboutSchema = z.object({
  "about.badge": z.string(),
  "about.title": z.string(),
  "about.subtitle": z.string(),
  "about.intro": z.string(),
  "about.missionTitle": z.string(),
  "about.missionDesc": z.string(),
  "about.offerTitle": z.string(),
  "about.offerCurated": z.string(),
  "about.offerInstant": z.string(),
  "about.offerSearch": z.string(),
  "about.offerTopic": z.string(),
  "about.offerMulti": z.string(),
  "about.valuesTitle": z.string(),
  "about.valuesAccessibility": z.string(),
  "about.valuesAccessibilityDesc": z.string(),
  "about.valuesSimplicity": z.string(),
  "about.valuesSimplicityDesc": z.string(),
  "about.valuesQuality": z.string(),
  "about.valuesQualityDesc": z.string(),
  "about.valuesPrivacy": z.string(),
  "about.valuesPrivacyDesc": z.string(),
  "about.communityTitle": z.string(),
  "about.communityDesc": z.string(),
  "about.questions": z.string(),
  "about.questionsLink": z.string(),
});

export const whatIsSchema = z.object({
  "whatIs.title": z.string(),
  "whatIs.subtitle": z.string(),
  "whatIs.description": z.string(),
  "whatIs.featuresSearchTitle": z.string(),
  "whatIs.featuresSearchDesc": z.string(),
  "whatIs.featuresBrowseTitle": z.string(),
  "whatIs.featuresBrowseDesc": z.string(),
  "whatIs.featuresCopyTitle": z.string(),
  "whatIs.featuresCopyDesc": z.string(),
  "whatIs.featuresTopicsTitle": z.string(),
  "whatIs.featuresTopicsDesc": z.string(),
  "whatIs.feature1": z.string(),
  "whatIs.feature2": z.string(),
  "whatIs.feature3": z.string(),
  "whatIs.feature4": z.string(),
});

export const howToUseSchema = z.object({
  "howToUse.title": z.string(),
  "howToUse.mainTitle": z.string(),
  "howToUse.step1Title": z.string(),
  "howToUse.step1Desc": z.string(),
  "howToUse.step2Title": z.string(),
  "howToUse.step2Desc": z.string(),
  "howToUse.step3Title": z.string(),
  "howToUse.step3Desc": z.string(),
});

// Combined aboutPage schema for validation
export const aboutPageSchema = z.object({
  ...aboutSchema.shape,
  ...whatIsSchema.shape,
  ...howToUseSchema.shape,
});
