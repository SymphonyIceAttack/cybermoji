import type { LanguageType } from "../translations";

/**
 * Homepage Data Schema
 *
 * Defines the complete data structure for the homepage including:
 * - Page metadata (SEO)
 * - Page sections (hero, features, categories, etc.)
 * - Structured data types for schema.org
 */

export interface HomePageMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface HomePageSection {
  id: string;
  title: string;
  subtitle?: string;
}

export interface HeroSection {
  badge?: string;
  title: string;
  subtitle: string;
  availableText: string;
  featuresTitle: string;
  advantagesTitle: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon?: string;
  benefits: string[];
}

export interface FeaturesSection {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface MoreReasonsSection {
  title: string;
  subtitle: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

export interface HowItWorksSection {
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSection {
  title: string;
  subtitle: string;
  badge?: string;
  items: FAQItem[];
}

export interface CategoryPreview {
  id: string;
  nameKey: string;
  icon: string;
  emojiCount: number;
}

export interface CategoriesSection {
  title: string;
  subtitle: string;
  categories: CategoryPreview[];
}

export interface TrendingEmoji {
  emoji: string;
  label: string;
  hexcode: string;
}

export interface TrendingSection {
  title: string;
  subtitle: string;
  emojis: TrendingEmoji[];
}

export interface CTASection {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface HomePageData {
  lang: LanguageType;
  metadata: HomePageMetadata;
  hero: HeroSection;
  features: FeaturesSection;
  moreReasons: MoreReasonsSection;
  howItWorks: HowItWorksSection;
  faq: FAQSection;
  categories: CategoriesSection;
  trending: TrendingSection;
  cta: CTASection;
}

/**
 * Homepage Structured Data Types
 *
 * Defines schema.org structured data types for the homepage
 */

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
  };
  about: {
    "@type": "Thing";
    name: string;
    description: string;
  };
  audience: {
    "@type": "Audience";
    audienceType: string;
  };
  provider: {
    "@type": "Organization";
    name: string;
    url: string;
  };
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface HowToSchema {
  "@context": "https://schema.org";
  "@type": "HowTo";
  name: string;
  description: string;
  step: Array<{
    "@type": "HowToStep";
    position: number;
    name?: string;
    text: string;
  }>;
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface HomePageSchema {
  website: WebSiteSchema;
  faq: FAQPageSchema;
  howTo?: HowToSchema;
  breadcrumb: BreadcrumbSchema;
}

export function createHomePageSchema(
  lang: LanguageType,
  siteUrl: string,
  siteName: string,
  data: HomePageData,
): HomePageSchema {
  return {
    website: createWebSiteSchema(lang, siteUrl, siteName, data),
    faq: createFAQPageSchema(lang, data),
    howTo: createHowToSchema(lang, siteUrl, data),
    breadcrumb: createBreadcrumbSchema(lang, siteUrl),
  };
}

function createWebSiteSchema(
  lang: LanguageType,
  siteUrl: string,
  _siteName: string,
  _data: HomePageData,
): WebSiteSchema {
  const names: Record<LanguageType, string> = {
    en: "Cybermoji - The Ultimate Emoji Collection",
    zh: "Cybermoji - 终极 Emoji 集合",
    fr: "Cybermoji - La Collection Emoji Ultime",
    es: "Cybermoji - La Colección Emoji Definitiva",
    de: "Cybermoji - Die Ultimative Emoji-Sammlung",
    ja: "Cybermoji - 究極の Emoji コレクション",
    ko: "Cybermoji - 궁극의 이모지 컬렉션",
    pt: "Cybermoji - A Coleção Emoji Definitiva",
    ru: "Cybermoji - Лучшая Коллекция Эмодзи",
    ar: "Cybermoji - مجموعة الإيموجي النهائية",
  };

  const descriptions: Record<LanguageType, string> = {
    en: "Browse, search, and copy thousands of emojis. Find the perfect expression for every moment. 100% free, instant copy, no login required.",
    zh: "浏览、搜索和复制数千个 Emoji。找到完美的表达方式。100% 免费、即时复制、无需登录。",
    fr: "Parcourez, recherchez et copiez des milliers d'emoji. Trouvez l'expression parfaite pour chaque moment. 100% gratuit, copie instantanée, sans connexion.",
    es: "Navega, busca y copia miles de emoji. Encuentra la expresión perfecta para cada momento. 100% gratis, copia instantánea, sin inicio de sesión.",
    de: "Durchsuchen, suchen und kopieren Sie Tausende von Emoji. Finden Sie den perfekten Ausdruck für jeden Moment. 100% kostenlos, sofortiges Kopieren, kein Login erforderlich.",
    ja: "何千もの Emoji を閲覧、検索、コピー瞬間に理想の表現を見つけましょう。100% 無料、即座にコピー、ログイン不要。",
    ko: "수천 개의 이모지를 검색, 탐색, 복사하세요. 순간에 맞는 완벽한 표현을 찾으세요. 100% 무료, 즉시 복사, 로그인 불필요.",
    pt: "Navegue, pesquise e copie milhares de emoji. Encontre a expressão perfeita para cada momento. 100% gratuito, cópia instantânea, sem login.",
    ru: "Просматривайте, ищите и копируйте тысячи эмодзи. Найдите идеальное выражение для любого момента. 100% бесплатно, мгновенное копирование, без входа.",
    ar: "تصفح، ابحث، وانسخ آلاف الإيموجي. ابحث عن التعبير المثالي لكل لحظة. 100% مجاني، نسخ فوري، بدون تسجيل。",
  };

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: names[lang] || names.en,
    url: `${siteUrl}/${lang}`,
    description: descriptions[lang] || descriptions.en,
    inLanguage: lang,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/${lang}#browse`,
      },
    },
    about: {
      "@type": "Thing",
      name: "Emoji Collection",
      description:
        "Browse, search, and copy thousands of emojis across all categories",
    },
    audience: {
      "@type": "Audience",
      audienceType: "General",
    },
    provider: {
      "@type": "Organization",
      name: _siteName,
      url: siteUrl,
    },
  };
}

function createFAQPageSchema(
  _lang: LanguageType,
  data: HomePageData,
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function createHowToSchema(
  _lang: LanguageType,
  _siteUrl: string,
  data: HomePageData,
): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use Cybermoji",
    description: "Find and use the perfect emoji in just 3 simple steps",
    step: data.howItWorks.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

function createBreadcrumbSchema(
  lang: LanguageType,
  siteUrl: string,
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/${lang}`,
      },
    ],
  };
}
