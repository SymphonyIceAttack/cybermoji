"use client";

import type { LanguageType } from "@/lib/translations";
import { EmojiBrowser } from "@/components/emoji/emoji-browser";

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
