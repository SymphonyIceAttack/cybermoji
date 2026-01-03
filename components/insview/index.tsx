"use client";

import { CTASection, FAQSection } from "./faq-ssr";
import { BenefitsSection, FeaturesSection } from "./features-ssr";
import { HeroSection } from "./hero-ssr";
import { HowItWorksSection } from "./how-it-works-ssr";

export function InsviewIndex() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
