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
import en from "./en/index";
import es from "./es/index";
import fr from "./fr/index";
import ja from "./ja/index";
import ko from "./ko/index";
import pt from "./pt/index";
import ru from "./ru/index";
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

/**
 * Get translations for a specific language (internal function)
 */
function getTranslations(lang: LanguageType) {
  return (translations[lang as keyof typeof translations] ||
    translations.en) as Record<string, unknown>;
}

/**
 * Translate a key using dot notation with fallback to the key itself
 * Supports both flat and nested translation structures
 */
export function translate(
  key: string,
  lang: LanguageType,
  langTranslations?: Record<string, unknown>,
): string {
  const translationsForLang = langTranslations || getTranslations(lang);

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
  const translationsForLang = getTranslations(lang);
  const t = function t(key: string): string {
    return translate(key, lang, translationsForLang);
  };
  return { t, translations: translationsForLang as Record<string, string> };
}
