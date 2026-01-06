import { validateTranslations } from "../schema/index";
import * as about from "./about";
import * as blog from "./blog";
import * as browser from "./browser";
import * as common from "./common";
import * as contact from "./contact";
import * as disclaimer from "./disclaimer";
import * as guides from "./guides";
import * as home from "./home";
import * as privacy from "./privacy";
import * as terms from "./terms";
import * as topic from "./topic";

// Flatten all translation keys into a single level object for validation
const arFlat = {
  ...common.common,
  ...home.home,
  ...browser.emojiBrowser,
  ...topic.topics,
  ...topic.category,
  ...about.aboutPage,
  ...contact.contactPage,
  ...privacy.privacyPage,
  ...terms.termsPage,
  ...disclaimer.disclaimerPage,
  ...blog.blogPage,
  ...guides.guidesPage,
} as const;

// Re-export as flat object for use in translations
const ar = arFlat;

// Validate Arabic translations
const isValid = validateTranslations(arFlat, "ar");
if (!isValid) {
  console.warn(
    "[i18n] Arabic (ar) translations have some missing or extra keys - this is expected if not all languages are fully translated",
  );
}

export type Ar = typeof ar;
export default ar;
