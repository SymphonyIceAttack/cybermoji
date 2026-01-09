export type LanguageType =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "ja"
  | "zh"
  | "ko"
  | "pt"
  | "ru"
  | "ar";

export const supportedLocales: LanguageType[] = [
  "en",
  "es",
  "fr",
  "de",
  "ja",
  "zh",
  "ko",
  "pt",
  "ru",
  "ar",
];

export const defaultLocale: LanguageType = "en";

export const localeNames: Record<LanguageType, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
  pt: "Português",
  ru: "Русский",
  ar: "العربية",
};

import ar from "./ar/index";
import de from "./de/index";
// Eagerly load English for backward compatibility and type safety
import en from "./en/index";
import es from "./es/index";
import fr from "./fr/index";
import ja from "./ja/index";
import ko from "./ko/index";
import pt from "./pt/index";
import ru from "./ru/index";
// Load all other translations eagerly (static export required)
import zh from "./zh/index";

export const translations = {
  en,
  zh,
  fr,
  es,
  de,
  ja,
  ko,
  pt,
  ru,
  ar,
} as const;

export type TranslationsType = typeof translations;

// Cache for lazy-loaded translations
const lazyTranslationCache = new Map<
  LanguageType,
  Promise<Record<string, unknown>>
>();

/**
 * Load translations lazily for a specific language (async)
 * Only loads the requested language, not all languages
 */
export async function getTranslations(
  lang: LanguageType,
): Promise<Record<string, unknown>> {
  // For English, use the eagerly loaded translations
  if (lang === "en") {
    return en;
  }

  // Check cache first
  const cached = lazyTranslationCache.get(lang);
  if (cached !== undefined) {
    return cached;
  }

  // Create the lazy load promise
  const loaderPromise = (async () => {
    let mod: { default: Record<string, unknown> };

    switch (lang) {
      case "zh":
        mod = await import("./zh/index");
        break;
      case "fr":
        mod = await import("./fr/index");
        break;
      case "es":
        mod = await import("./es/index");
        break;
      case "de":
        mod = await import("./de/index");
        break;
      case "ja":
        mod = await import("./ja/index");
        break;
      case "ko":
        mod = await import("./ko/index");
        break;
      case "pt":
        mod = await import("./pt/index");
        break;
      case "ru":
        mod = await import("./ru/index");
        break;
      case "ar":
        mod = await import("./ar/index");
        break;
      default:
        return en;
    }

    return mod.default;
  })();

  lazyTranslationCache.set(lang, loaderPromise);
  return loaderPromise;
}

/**
 * Translate a key using dot notation with fallback to the key itself
 */
export function translate(
  key: string,
  lang: LanguageType,
  langTranslations?: Record<string, unknown>,
): string {
  const translationsForLang = (langTranslations ||
    translations[lang as keyof typeof translations] ||
    translations.en) as Record<string, unknown>;

  // First, check if the key exists directly (flat structure)
  if (key in translationsForLang) {
    const value = translationsForLang[key];
    if (typeof value === "string") {
      return value;
    }
  }

  // Fall back to nested object lookup using dot notation
  const keys = key.split(".");
  let value: unknown = translationsForLang;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

/**
 * Create a translator for a specific language
 * Returns both the translation function and the translations object
 */
export function createTranslator(lang: LanguageType) {
  const translationsForLang =
    translations[lang as keyof typeof translations] || translations.en;
  const t = function t(key: string): string {
    return translate(key, lang, translationsForLang);
  };
  return {
    t,
    translations: translationsForLang as unknown as Record<string, string>,
  };
}

/**
 * Create an async translator that loads translations lazily
 * Use this when you want to avoid loading all translations at once
 */
export async function createLazyTranslator(lang: LanguageType) {
  const translationsForLang = await getTranslations(lang);
  const t = async function t(key: string): Promise<string> {
    return translate(key, lang, translationsForLang);
  };
  return { t, translations: translationsForLang };
}
