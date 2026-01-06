import type { LanguageType } from "@/lib/translations";
import { CTASection, FAQSection } from "./faq-ssr";
import { BenefitsSection, FeaturesSection } from "./features-ssr";
import { HeroSection } from "./hero-ssr";
import { HowToUseSection, WhatIsSection } from "./what-is-ssr";

interface CybermojiIndexProps {
  lang: LanguageType;
}

export function CybermojiIndex({ lang }: CybermojiIndexProps) {
  return (
    <>
      <HeroSection lang={lang} />
      <WhatIsSection lang={lang} />
      <HowToUseSection lang={lang} />
      <FeaturesSection />
      <BenefitsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
