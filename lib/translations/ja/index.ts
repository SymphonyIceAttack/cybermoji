export * from "./about";
export * from "./blog";
export * from "./browser";
export * from "./common";
export * from "./contact";
export * from "./disclaimer";
export * from "./guides";
export * from "./home";
export * from "./privacy";
export * from "./terms";
export * from "./topic";

import { validateTranslations } from "../schema/index";
import * as about from "./about";
import * as blog from "./blog";
import * as browser from "./browser";
import * as category from "./category";
import * as common from "./common";
import * as contact from "./contact";
import * as disclaimer from "./disclaimer";
import * as guides from "./guides";
import * as home from "./home";
import * as privacy from "./privacy";
import * as terms from "./terms";
import * as topic from "./topic";

// Flatten all translation keys into a single level object for validation
const jaFlat = {
  ...common.common,
  ...home.home,
  ...browser.emojiBrowser,
  ...browser.categoryBrowser,
  ...category.category,
  ...topic.topics,
  ...topic.category,
  ...topic.topicBrowser,
  ...about.aboutPage,
  ...contact.contactPage,
  ...privacy.privacyPage,
  ...terms.termsPage,
  ...disclaimer.disclaimerPage,
  ...blog.blogPage,
  ...guides.guidesPage,
} as const;

const ja = jaFlat;

// Validate Japanese translations
const isValid = validateTranslations(jaFlat, "ja");
if (!isValid) {
  console.warn(
    "[i18n] Japanese (ja) translations have some missing or extra keys - this is expected if not all languages are fully translated",
  );
}

export type Ja = typeof ja;
export default ja;
