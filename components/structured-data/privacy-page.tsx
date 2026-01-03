"use client";

import type { WebPage, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface PrivacyPageStructuredDataProps {
  lang: LanguageType;
}

export function PrivacyPageStructuredData({
  lang,
}: PrivacyPageStructuredDataProps) {
  const privacySchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: getPageName(lang),
    description: getPageDescription(lang),
    url: `${siteConfig.siteUrl}/${lang}/privacy`,
    inLanguage: getLanguageCode(lang),
    datePublished: "2026-01-02",
    dateModified: "2026-01-02",
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    about: {
      "@type": "Thing",
      name: getAboutName(lang),
      description: getAboutDescription(lang),
    },
    mainEntity: {
      "@type": "Article",
      headline: getHeadline(lang),
      description: getHeadlineDescription(lang),
      datePublished: "2026-01-02",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(privacySchema),
      }}
    />
  );
}

function getPageName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Privacy Policy | duckinsview",
    zh: "隐私政策 | duckinsview",
    fr: "Politique de Confidentialité | duckinsview",
    es: "Política de Privacidad | duckinsview",
    de: "Datenschutzrichtlinie | duckinsview",
    ja: "プライバシーポリシー | duckinsview",
    ko: "개인정보 처리방침 | duckinsview",
    pt: "Política de Privacidade | duckinsview",
    ru: "Политика конфиденциальности | duckinsview",
    ar: "سياسة الخصوصية | duckinsview",
  };
  return names[lang] || names.en;
}

function getPageDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Learn how duckinsview handles your privacy. We are committed to protecting your personal information and being transparent about our practices.",
    zh: "了解 duckinsview 如何处理您的隐私。我们致力于保护您的个人信息并对我们的做法保持透明。",
    fr: "Découvrez comment duckinsview gère votre vie privée. Nous nous engageons à protéger vos informations personnelles et à être transparents sur nos pratiques.",
    es: "Aprende cómo duckinsview maneja tu privacidad. Nos comprometemos a proteger tu información personal y ser transparentes sobre nuestras prácticas.",
    de: "Erfahren Sie, wie duckinsview mit Ihrem Datenschutz umgeht. Wir verpflichten uns, Ihre persönlichen Daten zu schützen und unsere Praktiken transparent zu gestalten.",
    ja: "duckinsview がプライバシーをどのように扱うか学びます。私たちは個人情報の保護とプラクティスの透明性に取り組むことをお約束します。",
    ko: "duckinsview가 귀하의 프라이버시를 어떻게 처리하는지 알아보세요. 우리는 귀하의 개인 정보를 보호하고 관행에 대해 투명하게 공개하는 데 최선을 다하고 있습니다.",
    pt: "Saiba como o duckinsview trata sua privacidade. Comprometemo-nos a proteger suas informações pessoais e ser transparentes sobre nossas práticas.",
    ru: "Узнайте, как duckinsview обрабатывает вашу конфиденциальность. Мы стремимся защищать вашу личную информацию и быть прозрачными в наших практиках.",
    ar: "تعرف على كيفية تعامل duckinsview مع خصوصيتك. نحن ملتزمون بحماية معلوماتك الشخصية والشفافية حول ممارساتنا.",
  };
  return descriptions[lang] || descriptions.en;
}

function getLanguageCode(lang: LanguageType): string {
  const codes: Record<LanguageType, string> = {
    en: "en",
    zh: "zh",
    fr: "fr",
    es: "es",
    de: "de",
    ja: "ja",
    ko: "ko",
    pt: "pt",
    ru: "ru",
    ar: "ar",
  };
  return codes[lang] || "en";
}

function getAboutName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Privacy and Data Protection",
    zh: "隐私和数据保护",
    fr: "Confidentialité et Protection des Données",
    es: "Privacidad y Protección de Datos",
    de: "Datenschutz und Datensicherheit",
    ja: "プライバシーとデータ保護",
    ko: "프라이버시 및 데이터 보호",
    pt: "Privacidade e Proteção de Dados",
    ru: "Конфиденциальность и защита данных",
    ar: "الخصوصية وحماية البيانات",
  };
  return names[lang] || names.en;
}

function getAboutDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Our commitment to protecting your privacy and personal data when using our anonymous Instagram viewing service.",
    zh: "我们在使用匿名 Instagram 查看服务时保护您的隐私和个人数据的承诺。",
    fr: "Notre engagement à protéger votre vie privée et vos données personnelles lors de l'utilisation de notre service de visualisation Instagram anonyme.",
    es: "Nuestro compromiso de proteger su privacidad y datos personales al usar nuestro servicio de visualización anónima de Instagram.",
    de: "Unser Engagement zum Schutz Ihrer Privatsphäre und persönlichen Daten bei der Nutzung unseres anonymen Instagram-Dienstes.",
    ja: "匿名 Instagram 閲覧サービスの使用時に、プライバシーと個人データを保護するための私たちの取り組み。",
    ko: "익명 Instagram 시청 서비스를 사용할 때 귀하의 프라이버시와 개인 데이터를 보호하기 위한 우리의 약속.",
    pt: "Nosso compromisso em proteger sua privacidade e dados pessoais ao usar nosso serviço de visualização anônima do Instagram.",
    ru: "Наша приверженность защите вашей конфиденциальности и личных данных при использовании нашего сервиса анонимного просмотра Instagram.",
    ar: "التزامنا بحماية خصوصيتك وبياناتك الشخصية عند استخدام خدمة مشاهدة إنستغرام المجهولة الهوية.",
  };
  return descriptions[lang] || descriptions.en;
}

function getHeadline(lang: LanguageType): string {
  const headlines: Record<LanguageType, string> = {
    en: "Privacy Policy",
    zh: "隐私政策",
    fr: "Politique de Confidentialité",
    es: "Política de Privacidad",
    de: "Datenschutzrichtlinie",
    ja: "プライバシーポリシー",
    ko: "개인정보 처리방침",
    pt: "Política de Privacidade",
    ru: "Политика конфиденциальности",
    ar: "سياسة الخصوصية",
  };
  return headlines[lang] || headlines.en;
}

function getHeadlineDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "This Privacy Policy explains how we collect, use, and protect information when you use our service.",
    zh: "本隐私政策说明了我们如何在您使用我们的服务时收集、使用和保护信息。",
    fr: "Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons les informations lorsque vous utilisez notre service.",
    es: "Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos la información cuando usa nuestro servicio.",
    de: "Diese Datenschutzrichtlinie erklärt, wie wir Informationen sammeln, verwenden und schützen, wenn Sie unseren Dienst nutzen.",
    ja: "このプライバシーポリシーは、サービスを使用する際に情報の収集、使用、保護方法を説明します。",
    ko: "이 개인정보 처리방침은 서비스를 사용할 때 정보를 수집, 사용, 보호하는 방법을 설명합니다.",
    pt: "Esta Política de Privacidade explica como coletamos, usamos e protegemos informações quando você usa nosso serviço.",
    ru: "Эта Политика конфиденциальности объясняет, как мы собираем, используем и защищаем информацию, когда вы используете наш сервис.",
    ar: "تشرح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات عند استخدامك لخدمتنا.",
  };
  return descriptions[lang] || descriptions.en;
}
