import type { Metadata } from "next";
import { PrivacyContent } from "@/components/pages/privacy-content";
import {
  BreadcrumbStructuredData,
  getPrivacyBreadcrumb,
} from "@/components/structured-data/breadcrumb";
import { PrivacyPageStructuredData } from "@/components/structured-data/privacy-page";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { createTranslator, supportedLocales } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations/hreflang";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Privacy Policy | Cybermoji",
    description:
      "Learn how Cybermoji handles your privacy. We are committed to protecting your personal information and being transparent about our practices.",
    keywords:
      "Cybermoji privacy policy, instagram viewer privacy, data protection, privacy practices",
    ogTitle: "Privacy Policy | Cybermoji",
    ogDescription:
      "Learn how Cybermoji handles your privacy. We are committed to protecting your personal information and being transparent about our practices.",
  },
  zh: {
    title: "隐私政策 | Cybermoji",
    description:
      "了解 Cybermoji 如何处理您的隐私。我们致力于保护您的个人信息并对我们的做法保持透明。",
    keywords: "Cybermoji 隐私政策, Instagram 查看器隐私, 数据保护, 隐私实践",
    ogTitle: "隐私政策 | Cybermoji",
    ogDescription:
      "了解 Cybermoji 如何处理您的隐私。我们致力于保护您的个人信息并对我们的做法保持透明。",
  },
  fr: {
    title: "Politique de Confidentialité | Cybermoji",
    description:
      "Découvrez comment Cybermoji gère votre vie privée. Nous nous engageons à protéger vos informations personnelles et à être transparents sur nos pratiques.",
    keywords:
      "politique de confidentialité Cybermoji, confidentialité visualiseur instagram, protection des données, pratiques de confidentialité",
    ogTitle: "Politique de Confidentialité | Cybermoji",
    ogDescription:
      "Découvrez comment Cybermoji gère votre vie privée. Nous nous engageons à protéger vos informations personnelles et à être transparents sur nos pratiques.",
  },
  es: {
    title: "Política de Privacidad | Cybermoji",
    description:
      "Aprende cómo Cybermoji maneja tu privacidad. Nos comprometemos a proteger tu información personal y ser transparentes sobre nuestras prácticas.",
    keywords:
      "política de privacidad Cybermoji, privacidad del visor de instagram, protección de datos, prácticas de privacidad",
    ogTitle: "Política de Privacidad | Cybermoji",
    ogDescription:
      "Aprende cómo Cybermoji maneja tu privacidad. Nos comprometemos a proteger tu información personal y ser transparentes sobre nuestras prácticas.",
  },
  de: {
    title: "Datenschutzrichtlinie | Cybermoji",
    description:
      "Erfahren Sie, wie Cybermoji mit Ihrem Datenschutz umgeht. Wir verpflichten uns, Ihre persönlichen Daten zu schützen und unsere Praktiken transparent zu gestalten.",
    keywords:
      "Datenschutzrichtlinie Cybermoji, Datenschutz Instagram-Betrachter, Datenschutz, Datenschutzpraktiken",
    ogTitle: "Datenschutzrichtlinie | Cybermoji",
    ogDescription:
      "Erfahren Sie, wie Cybermoji mit Ihrem Datenschutz umgeht. Wir verpflichten uns, Ihre persönlichen Daten zu schützen und unsere Praktiken transparent zu gestalten.",
  },
  ja: {
    title: "プライバシーポリシー | Cybermoji",
    description:
      "Cybermoji がプライバシーをどのように処理するか学びます。私たちは個人情報の保護とプラクティスの透明性に取り組むことをお約束します。",
    keywords:
      "Cybermoji プライバシーポリシー, Instagram ビューアプライバシー, データ保護, プライバシー慣行",
    ogTitle: "プライバシーポリシー | Cybermoji",
    ogDescription:
      "Cybermoji がプライバシーをどのように処理するか学びます。私たちは個人情報の保護とプラクティスの透明性に取り組むことをお約束します。",
  },
  ko: {
    title: "개인정보 처리방침 | Cybermoji",
    description:
      "Cybermoji가 귀하의 프라이버시를 어떻게 처리하는지 알아보세요. 우리는 귀하의 개인정보 보호와 관행의 투명성 유지에 최선을 다하고 있습니다.",
    keywords:
      "Cybermoji 개인정보 처리방침, Instagram 뷰어 프라이버시, 데이터 보호, 프라이버시 관행",
    ogTitle: "개인정보 처리방침 | Cybermoji",
    ogDescription:
      "Cybermoji가 귀하의 프라이버시를 어떻게 처리하는지 알아보세요. 우리는 귀하의 개인정보 보호와 관행의 투명성 유지에 최선을 다하고 있습니다.",
  },
  pt: {
    title: "Política de Privacidade | Cybermoji",
    description:
      "Saiba como o Cybermoji trata sua privacidade. Comprometemo-nos a proteger suas informações pessoais e ser transparentes sobre nossas práticas.",
    keywords:
      "política de privacidade Cybermoji, privacidade do visualizador do instagram, proteção de dados, práticas de privacidade",
    ogTitle: "Política de Privacidade | Cybermoji",
    ogDescription:
      "Saiba como o Cybermoji trata sua privacidade. Comprometemo-nos a proteger suas informações pessoais e ser transparentes sobre nossas práticas.",
  },
  ru: {
    title: "Политика конфиденциальности | Cybermoji",
    description:
      "Узнайте, как Cybermoji обрабатывает вашу конфиденциальность. Мы стремимся защищать вашу личную информацию и быть прозрачными в наших практиках.",
    keywords:
      "политика конфиденциальности Cybermoji, конфиденциальность просмотрщика instagram, защита данных, практики конфиденциальности",
    ogTitle: "Политика конфиденциальности | Cybermoji",
    ogDescription:
      "Узнайте, как Cybermoji обрабатывает вашу конфиденциальность. Мы стремимся защищать вашу личную информацию и быть прозрачными в наших практиках.",
  },
  ar: {
    title: "سياسة الخصوصية | Cybermoji",
    description:
      "تعرف على كيفية تعامل Cybermoji مع خصوصيتك. نحن ملتزمون بحماية معلوماتك الشخصية والشفافية حول ممارساتنا.",
    keywords:
      "سياسة الخصوصية Cybermoji, خصوصية عارض instagram, حماية البيانات, ممارسات الخصوصية",
    ogTitle: "سياسة الخصوصية | Cybermoji",
    ogDescription:
      "تعرف على كيفية تعامل Cybermoji مع خصوصيتك. نحن ملتزمون بحماية معلوماتك الشخصية والشفافية حول ممارساتنا.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;

  const hreflangLinks = generateHreflangLinks("/privacy");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: {
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      title: langData.ogTitle,
      description: langData.ogDescription,
      siteName: siteConfig.siteName,
      url: `${siteConfig.siteUrl}/${lang}/privacy`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/privacy`,
      languages: hreflangLinks,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  const { translations } = createTranslator(lang);

  return (
    <>
      <BreadcrumbStructuredData items={getPrivacyBreadcrumb(lang)} />
      <PrivacyPageStructuredData lang={lang} />
      <PrivacyContent lang={lang} translations={translations} />
    </>
  );
}
