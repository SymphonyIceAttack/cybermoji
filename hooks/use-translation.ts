import type { LanguageType } from "@/lib/translations";
import { translations } from "@/lib/translations";

const supportedTranslationLocales = ["en", "zh", "fr", "es", "de", "ja", "ko", "pt", "ru", "ar"] as const;

type SupportedLocale = (typeof supportedTranslationLocales)[number];

function isSupportedLocale(lang: LanguageType): lang is SupportedLocale {
  return supportedTranslationLocales.includes(lang as SupportedLocale);
}

export function useTranslation(lang: LanguageType) {
  const effectiveLang = isSupportedLocale(lang) ? lang : "en";

  const t = (key: string): string => {
    const langTranslations = translations[effectiveLang];
    if (!langTranslations) return key;

    const keys = key.split(".");
    let value: unknown = langTranslations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof value === "string") {
      return value;
    }

    return key;
  };

  return { t, lang };
}
