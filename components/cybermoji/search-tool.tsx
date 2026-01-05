"use client";

import { EmojiBrowser } from "@/components/emoji/emoji-browser";
import type { LanguageType } from "@/lib/translations";

interface SearchToolProps {
  lang: LanguageType;
}

export function SearchTool({ lang }: SearchToolProps) {
  return (
    <div id="browse" className="w-full space-y-6">
      <EmojiBrowser lang={lang} />
    </div>
  );
}
