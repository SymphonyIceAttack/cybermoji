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

import en from "./en/index";
import es from "./es/index";
import fr from "./fr/index";
import zh from "./zh/index";
import de from "./de/index";
import ja from "./ja/index";
import ko from "./ko/index";
import pt from "./pt/index";
import ru from "./ru/index";
import ar from "./ar/index";

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
