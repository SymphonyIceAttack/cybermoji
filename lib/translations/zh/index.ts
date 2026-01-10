import { validateTranslations } from "../schema/index";
import * as about from "./about";
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
const zhFlat = {
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
  ...category.category,
} as const;

// Re-export as flat object for use in translations
const zh = zhFlat;

// Validate Chinese translations
const isValid = validateTranslations(zhFlat, "zh");
if (!isValid) {
  console.warn(
    "[i18n] Chinese (zh) translations have some missing or extra keys - this is expected if not all languages are fully translated",
  );
}

export type Zh = typeof zh;
export default zh;
