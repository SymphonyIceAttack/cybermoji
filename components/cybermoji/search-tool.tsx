"use client";

import { EmojiBrowser } from "@/components/emoji/emoji-browser";
import type { LanguageType } from "@/lib/translations";

interface SearchToolProps {
  lang: LanguageType;
  translations?: Record<string, string>;
}

export function SearchTool({ lang, translations = {} }: SearchToolProps) {
  return (
    <div id="browse" className="w-full space-y-6">
      <EmojiBrowser lang={lang} translations={translations} />
    </div>
  );
}
