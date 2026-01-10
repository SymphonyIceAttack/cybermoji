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
const esFlat = {
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
  ...guides.guidesPage,
} as const;

// Re-export as flat object for use in translations
const es = esFlat;

// Validate Spanish translations
const isValid = validateTranslations(esFlat, "es");
if (!isValid) {
  console.warn(
    "[i18n] Spanish (es) translations have some missing or extra keys - this is expected if not all languages are fully translated",
  );
}

export type Es = typeof es;
export default es;
