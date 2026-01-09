import { siteConfig } from "@/lib/config";
import type { LanguageType } from "./index";
import { supportedLocales } from "./index";

export type { LanguageType };

// Generate hreflang links for a given base path
export function generateHreflangLinks(
  basePath: string,
): Record<LanguageType, string> {
  return supportedLocales.reduce(
    (acc, locale) => {
      acc[locale] = `${siteConfig.siteUrl}/${locale}${basePath}`;
      return acc;
    },
    {} as Record<LanguageType, string>,
  );
}
