export * from "./about";
export * from "./browser";
export {
  category,
  categoryAnalysis,
  categoryExamples,
  categoryFAQ,
  categoryFeatureToggle,
  categoryPainPoints,
  categoryTech,
  categoryUsage,
} from "./category";
export * from "./common";
export * from "./contact";
export * from "./disclaimer";
export * from "./guides";
export * from "./home";
export * from "./privacy";
export * from "./terms";
export {
  topic,
  topicBrowser,
  topicPage,
  topics,
} from "./topic";

import { validateTranslations } from "../schema/index";
import * as about from "./about";
import * as browser from "./browser";
import { category } from "./category";
import * as common from "./common";
import * as contact from "./contact";
import * as disclaimer from "./disclaimer";
import * as guides from "./guides";
import * as home from "./home";
import * as privacy from "./privacy";
import * as terms from "./terms";
import * as topic from "./topic";

// Flatten all translation keys into a single level object for validation
const enFlat = {
  ...common.common,
  ...home.home,
  ...browser.emojiBrowser,
  ...browser.categoryBrowser,
  ...topic.topics,
  ...topic.category,
  ...topic.topicBrowser,
  ...about.aboutPage,
  ...contact.contactPage,
  ...privacy.privacyPage,
  ...terms.termsPage,
  ...disclaimer.disclaimerPage,
  ...guides.guidesPage,
  ...category,
} as const;

// Re-export as flat object for use in translations
const en = enFlat;

// Validate English translations
const isValid = validateTranslations(enFlat, "en");
if (!isValid) {
  console.warn(
    "[i18n] English (en) translations have some missing or extra keys - this is expected during development",
  );
}

export type En = typeof en;
export default en;
