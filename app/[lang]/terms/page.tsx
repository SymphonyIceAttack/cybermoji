import type { Metadata } from "next";
import { TermsContent } from "@/components/pages/terms-content";
import { TermsPageStructuredData } from "@/components/structured-data/terms-page";
import { siteConfig } from "@/lib/config";
import { generateHreflangLinks } from "@/lib/translations/hreflang";
import type { LanguageType } from "@/lib/translations";
import { createTranslator, supportedLocales } from "@/lib/translations";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Terms of Service | Cybermoji",
    description:
      "Read the terms of service for Cybermoji. Understand the rules and guidelines for using our anonymous Instagram viewer service.",
    keywords:
      "Cybermoji terms of service, terms and conditions, user agreement, service terms",
    ogTitle: "Terms of Service | Cybermoji",
    ogDescription:
      "Read the terms of service for Cybermoji. Understand the rules and guidelines for using our anonymous Instagram viewer service.",
  },
  zh: {
    title: "服务条款 | Cybermoji",
    description:
      "阅读 Cybermoji 的服务条款。了解使用我们的匿名 Instagram 查看器服务的规则和指南。",
    keywords: "Cybermoji 服务条款, 服务条款和条件, 用户协议, 服务条款",
    ogTitle: "服务条款 | Cybermoji",
    ogDescription:
      "阅读 Cybermoji 的服务条款。了解使用我们的匿名 Instagram 查看器服务的规则和指南。",
  },
  fr: {
    title: "Conditions d'Utilisation | Cybermoji",
    description:
      "Lisez les conditions d'utilisation de Cybermoji. Comprenez les règles et directives pour utiliser notre service de visualisation Instagram anonyme.",
    keywords:
      "conditions d'utilisation Cybermoji, conditions générales, accord utilisateur, conditions de service",
    ogTitle: "Conditions d'Utilisation | Cybermoji",
    ogDescription:
      "Lisez les conditions d'utilisation de Cybermoji. Comprenez les règles et directives pour utiliser notre service de visualisation Instagram anonyme.",
  },
  es: {
    title: "Términos de Servicio | Cybermoji",
    description:
      "Lee los términos de servicio de Cybermoji. Comprende las reglas y pautas para usar nuestro servicio de visor de Instagram anónimo.",
    keywords:
      "términos de servicio Cybermoji, términos y condiciones, acuerdo de usuario, términos del servicio",
    ogTitle: "Términos de Servicio | Cybermoji",
    ogDescription:
      "Lee los términos de servicio de Cybermoji. Comprende las reglas y pautas para usar nuestro servicio de visor de Instagram anónimo.",
  },
  de: {
    title: "Nutzungsbedingungen | Cybermoji",
    description:
      "Lesen Sie die Nutzungsbedingungen von Cybermoji. Verstehen Sie die Regeln und Richtlinien für die Nutzung unseres anonymen Instagram-Dienstes.",
    keywords:
      "Nutzungsbedingungen Cybermoji, Allgemeine Geschäftsbedingungen, Benutzervereinbarung, Dienstbedingungen",
    ogTitle: "Nutzungsbedingungen | Cybermoji",
    ogDescription:
      "Lesen Sie die Nutzungsbedingungen von Cybermoji. Verstehen Sie die Regeln und Richtlinien für die Nutzung unseres anonymen Instagram-Dienstes.",
  },
  ja: {
    title: "利用規約 | Cybermoji",
    description:
      "Cybermoji の利用規約を読みます。匿名 Instagram ビューアサービスの使用に関するルールとガイドラインを理解しましょう。",
    keywords:
      "Cybermoji 利用規約, 利用規約と条件, ユーザー契約, サービス利用規約",
    ogTitle: "利用規約 | Cybermoji",
    ogDescription:
      "Cybermoji の利用規約を読みます。匿名 Instagram ビューアサービスの使用に関するルールとガイドラインを理解しましょう。",
  },
  ko: {
    title: "서비스 약관 | Cybermoji",
    description:
      "Cybermoji의 서비스 약관을 읽으세요. 익명 Instagram 뷰어 서비스 사용에 대한 규칙과 가이드라인을 이해하세요.",
    keywords: "Cybermoji 서비스 약관, 약관 및 조건, 사용자 동의, 서비스 약관",
    ogTitle: "서비스 약관 | Cybermoji",
    ogDescription:
      "Cybermoji의 서비스 약관을 읽으세요. 익명 Instagram 뷰어 서비스 사용에 대한 규칙과 가이드라인을 이해하세요.",
  },
  pt: {
    title: "Termos de Serviço | Cybermoji",
    description:
      "Leia os termos de serviço do Cybermoji. Entenda as regras e diretrizes para usar nosso serviço de visualizador anônimo do Instagram.",
    keywords:
      "termos de serviço Cybermoji, termos e condições, acordo do usuário, termos de serviço",
    ogTitle: "Termos de Serviço | Cybermoji",
    ogDescription:
      "Leia os termos de serviço do Cybermoji. Entenda as regras e diretrizes para usar nosso serviço de visualizador anônimo do Instagram.",
  },
  ru: {
    title: "Условия использования | Cybermoji",
    description:
      "Прочитайте условия использования Cybermoji. Поймите правила и рекомендации по использованию нашего сервиса анонимного просмотра Instagram.",
    keywords:
      "условия использования Cybermoji, условия и положения, пользовательское соглашение, условия обслуживания",
    ogTitle: "Условия использования | Cybermoji",
    ogDescription:
      "Прочитайте условия использования Cybermoji. Поймите правила и рекомендации по использованию нашего сервиса анонимного просмотра Instagram.",
  },
  ar: {
    title: "شروط الخدمة | Cybermoji",
    description:
      "اقرأ شروط خدمة Cybermoji. افهم القواعد والإرشادات لاستخدام خدمة عارض إنستغرام المجهولة الهوية.",
    keywords:
      "شروط خدمة Cybermoji, الشروط والأحكام, اتفاقية المستخدم, شروط الخدمة",
    ogTitle: "شروط الخدمة | Cybermoji",
    ogDescription:
      "اقرأ شروط خدمة Cybermoji. افهم القواعد والإرشادات لاستخدام خدمة عارض إنستغرام المجهولة الهوية.",
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

  const hreflangLinks = generateHreflangLinks("/terms");

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
      url: `${siteConfig.siteUrl}/${lang}/terms`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/terms`,
      languages: hreflangLinks,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  const { translations } = createTranslator(lang);
  return (
    <>
      <TermsPageStructuredData lang={lang} />
      <TermsContent
        lang={lang}
        translations={translations}
      />
    </>
  );
}
