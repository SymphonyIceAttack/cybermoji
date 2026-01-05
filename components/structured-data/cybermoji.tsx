"use client";

import type { WebSite, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface CybermojiStructuredDataProps {
  lang: LanguageType;
}

export function CybermojiStructuredData({
  lang,
}: CybermojiStructuredDataProps) {
  const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getSiteName(lang),
    url: `${siteConfig.siteUrl}/${lang}`,
    description: getSiteDescription(lang),
    inLanguage: lang,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/${lang}#browse`,
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
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema),
      }}
    />
  );
}

function getSiteName(lang: LanguageType): string {
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
  return names[lang] || names.en;
}

function getSiteDescription(lang: LanguageType): string {
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
  return descriptions[lang] || descriptions.en;
}
