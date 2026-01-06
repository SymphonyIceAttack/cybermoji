import type { ZodObject, ZodString } from "zod";
import * as aboutSchema from "./about";
import * as blogSchema from "./blog";
import * as browserSchema from "./browser";
import * as commonSchema from "./common";
import * as contactSchema from "./contact";
import * as disclaimerSchema from "./disclaimer";
import * as guidesSchema from "./guides";
import * as homeSchema from "./home";
import * as privacySchema from "./privacy";
import * as termsSchema from "./terms";
import * as topicSchema from "./topic";

export {
  aboutSchema as aboutPageSchema,
  aboutSchema,
  howToUseSchema,
  whatIsSchema,
} from "./about";
export {
  blogSchema as blogPageSchema,
  blogSchema,
} from "./blog";

export {
  browserSchema,
  emojiBrowserSchema,
  modalSchema,
} from "./browser";
// Re-export all schema modules
export {
  categoryNamesSchema,
  commonSchema,
  footerSchema,
  navSchema,
  searchSchema,
  tabsSchema,
  trustSchema,
} from "./common";
export {
  contactSchema as contactPageSchema,
  contactSchema,
} from "./contact";
export {
  disclaimerSchema as disclaimerPageSchema,
  disclaimerSchema,
} from "./disclaimer";
export {
  guidesSchema as guidesPageSchema,
  guidesSchema,
} from "./guides";
export {
  categoriesSchema,
  ctaSchema,
  faqSchema,
  featuresSchema,
  heroSchema,
  homeSchema,
  howItWorksSchema,
  moreReasonsSchema,
  trendingSchema,
} from "./home";
export {
  privacySchema as privacyPageSchema,
  privacySchema,
} from "./privacy";
export {
  termsSchema as termsPageSchema,
  termsSchema,
} from "./terms";
export {
  categorySchema,
  topicPageSchema,
  topicSchema as topicsSchema,
} from "./topic";

// Get all required keys from all schemas
function getAllRequiredKeys(): string[] {
  const keys = new Set<string>();

  const addKeys = (schema: ZodObject<Record<string, ZodString>>) => {
    const shape = schema.shape;
    for (const key of Object.keys(shape)) {
      keys.add(key);
    }
  };

  addKeys(commonSchema.commonSchema);
  addKeys(homeSchema.homeSchema);
  addKeys(browserSchema.emojiBrowserSchema);
  addKeys(topicSchema.topicsSchema);
  addKeys(aboutSchema.aboutPageSchema);
  addKeys(contactSchema.contactPageSchema);
  addKeys(privacySchema.privacyPageSchema);
  addKeys(termsSchema.termsPageSchema);
  addKeys(disclaimerSchema.disclaimerPageSchema);
  addKeys(blogSchema.blogPageSchema);
  addKeys(guidesSchema.guidesPageSchema);

  return Array.from(keys).sort();
}

// Validation function
export function validateTranslations(
  translations: object,
  lang: string,
): boolean {
  const requiredKeys = getAllRequiredKeys();
  const transKeys = Object.keys(translations);

  const missingKeys = requiredKeys.filter((key) => !(key in translations));
  const extraKeys = transKeys.filter((key) => !requiredKeys.includes(key));

  let isValid = true;

  if (missingKeys.length > 0) {
    console.warn(`[i18n] Missing translation keys for language "${lang}":`);
    console.warn("  Missing keys:");
    for (const key of missingKeys) {
      console.warn(`    - ${key}`);
    }
    isValid = false;
  }

  if (extraKeys.length > 0) {
    console.warn(`[i18n] Extra translation keys for language "${lang}":`);
    console.warn("  Extra keys:");
    for (const key of extraKeys) {
      console.warn(`    - ${key}`);
    }
    isValid = false;
  }

  return isValid;
}

// Get all required keys
export function getRequiredKeys(): string[] {
  return getAllRequiredKeys();
}
