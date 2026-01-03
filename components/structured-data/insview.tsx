"use client";

import type { WebSite, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface InsviewStructuredDataProps {
  lang: LanguageType;
}

export function InsviewStructuredData({ lang }: InsviewStructuredDataProps) {
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
        urlTemplate: `${siteConfig.siteUrl}/${lang}#search`,
      },
    },
    about: {
      "@type": "Thing",
      name: "Anonymous Instagram Viewing",
      description:
        "View Instagram profiles, stories, reels, and highlights without an account",
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
    en: "duckinsview - Anonymous Instagram Viewer",
    zh: "duckinsview - 匿名 Instagram 查看器",
    fr: "duckinsview - Visionneuse Instagram Anonyme",
    es: "duckinsview - Visor de Instagram Anónimo",
    de: "duckinsview - Anonymer Instagram-Betrachter",
    ja: "duckinsview - 匿名Instagramビューアー",
    ko: "duckinsview - 익명 인스타그램 뷰어",
    pt: "duckinsview - Visualizador Anônimo do Instagram",
    ru: "duckinsview - Анонимный просмотр Instagram",
    ar: "duckinsview - عارض إنستغرام مجهول الهوية",
  };
  return names[lang] || names.en;
}

function getSiteDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "View Instagram profiles, stories, reels, and highlights anonymously without an account. 100% free, private, and secure.",
    zh: "无需账户即可匿名查看 Instagram 资料、动态、 reels 和精选内容。100% 免费、私密、安全。",
    fr: "Affichez les profils, stories, reels et highlights Instagram de manière anonyme sans compte. 100% gratuit, privé et sécurisé.",
    es: "Ve perfiles, historias, reels y destacados de Instagram de forma anónima sin cuenta. 100% gratis, privado y seguro.",
    de: "Instagram-Profile, Stories, Reels und Highlights anonym ohne Konto ansehen. 100% kostenlos, privat und sicher.",
    ja: "アカウントなしでInstagramプロフィール、ストーリーズ、リール、ハイライトを匿名で閲覧。100%無料、プライバシー、安全。",
    ko: "계정 없이 인스타그램 프로필, 스토리, 릴스, 하이라이트를 익명으로閲覧. 100% 무료, 프라이버시, 안전.",
    pt: "Visualize perfis, stories, reels e destaques do Instagram anonimamente sem conta. 100% gratuito, privado e seguro.",
    ru: "Просматривайте профили, истории, рилс и избранное Instagram анонимно без аккаунта. 100% бесплатно, конфиденциально и безопасно.",
    ar: "شاهد ملفات إنستغرام والقصص والريلز والمميزات مجهولة الهوية بدون حساب. 100% مجاني وخاص وآمن.",
  };
  return descriptions[lang] || descriptions.en;
}
