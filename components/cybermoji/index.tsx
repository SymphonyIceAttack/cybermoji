import type { LanguageType } from "@/lib/translations";
import { CTASection, FAQSection } from "./faq-ssr";
import { BenefitsSection, FeaturesSection } from "./features-ssr";
import { HeroSection } from "./hero-ssr";
import { HowItWorksSection } from "./how-it-works-ssr";

interface CybermojiIndexProps {
  lang: LanguageType;
}

export function CybermojiIndex({ lang }: CybermojiIndexProps) {
  return (
    <>
      <HeroSection lang={lang} />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
