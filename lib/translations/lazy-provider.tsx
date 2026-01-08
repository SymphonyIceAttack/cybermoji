"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import type { LanguageType } from "./index";

// Cache for loaded translations
const translationCache = new Map<LanguageType, Record<string, string | readonly string[]>>();

// Dynamic import map for each language
const translationLoaders: Record<string, () => Promise<Record<string, string | readonly string[]>>> = {
  en: () => import("./en/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  zh: () => import("./zh/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  fr: () => import("./fr/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  es: () => import("./es/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  de: () => import("./de/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  ja: () => import("./ja/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  ko: () => import("./ko/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  pt: () => import("./pt/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  ru: () => import("./ru/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
  ar: () => import("./ar/index").then((mod) => mod.default as Record<string, string | readonly string[]>),
};

interface TranslationContextType {
  lang: LanguageType;
  translations: Record<string, string | readonly string[]>;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function LazyTranslationProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: LanguageType;
}) {
  const [translations, setTranslations] = useState<Record<string, string | readonly string[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Check cache first
    if (translationCache.has(lang)) {
      setTranslations(translationCache.get(lang)!);
      setIsLoading(false);
      return;
    }

    // Load translations dynamically
    const loader = translationLoaders[lang];
    if (loader) {
      loader()
        .then((data) => {
          translationCache.set(lang, data);
          setTranslations(data);
        })
        .catch((error) => {
          console.error(`Failed to load translations for ${lang}:`, error);
          setTranslations({});
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [lang]);

  return (
    <TranslationContext.Provider value={{ lang, translations, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useLazyTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error(
      "useLazyTranslation must be used within LazyTranslationProvider",
    );
  }

  const { lang, translations, isLoading } = context;

  const t = (key: string): string => {
    if (isLoading || !translations) return key;

    // Check if the key exists directly (flat structure)
    if (key in translations) {
      const value = translations[key];
      if (typeof value === "string") {
        return value;
      }
    }

    // Fall back to nested object lookup
    const keys = key.split(".");
    let value: unknown = translations;

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

  return { t, lang, isLoading };
}
