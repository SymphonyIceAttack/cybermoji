import type { LanguageType } from "@/lib/translations";
import { translations } from "@/lib/translations";
import { CTASection, FAQSection } from "./faq-ssr";
import { BenefitsSection, FeaturesSection } from "./features-ssr";
import { HeroSection } from "./hero-ssr";
import { HowToUseSection, WhatIsSection } from "./what-is-ssr";

interface CybermojiIndexProps {
  lang: LanguageType;
}

export function CybermojiIndex({ lang }: CybermojiIndexProps) {
  const translationsForLang =
    translations[lang as keyof typeof translations] || translations.en;

  return (
    <>
      <HeroSection
        lang={lang}
        translations={translationsForLang as unknown as Record<string, string>}
      />
      <WhatIsSection
        translations={translationsForLang as unknown as Record<string, string>}
      />
      <HowToUseSection
        translations={translationsForLang as unknown as Record<string, string>}
      />
      <FeaturesSection
        translations={translationsForLang as unknown as Record<string, string>}
      />
      <BenefitsSection />
      <FAQSection
        translations={translationsForLang as unknown as Record<string, string>}
      />
      <CTASection />
    </>
  );
}
