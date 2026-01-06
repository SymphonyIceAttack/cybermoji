import type { Metadata } from "next";
import { DisclaimerContent } from "@/components/pages/disclaimer-content";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales } from "@/lib/translations";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Disclaimer | Cybermoji",
    description:
      "Important disclaimers about Cybermoji's services, content, and limitations. Please read this important information before using our service.",
    keywords:
      "disclaimer, terms of use, limitations, important notice, cybermoji disclaimer",
    ogTitle: "Disclaimer | Cybermoji",
    ogDescription:
      "Important disclaimers about Cybermoji's services and content.",
  },
  zh: {
    title: "免责声明 | Cybermoji",
    description:
      "关于 Cybermoji 服务、内容和限制的重要免责声明。在使用我们的服务之前，请阅读此重要信息。",
    keywords: "免责声明, 使用条款, 限制, 重要通知, Cybermoji 免责声明",
    ogTitle: "免责声明 | Cybermoji",
    ogDescription: "关于 Cybermoji 服务和内容的重要免责声明。",
  },
  fr: {
    title: "Clause de Non-Responsabilité | Cybermoji",
    description:
      "Clause de non-responsabilité importante concernant les services, le contenu et les limites de Cybermoji. Veuillez lire ces informations importantes avant d&apos;utiliser notre service.",
    keywords:
      "clause de non-responsabilité, conditions d&apos;utilisation, limites, avis important",
    ogTitle: "Clause de Non-Responsabilité | Cybermoji",
    ogDescription:
      "Clause de non-responsabilité importante concernant les services et le contenu de Cybermoji.",
  },
  es: {
    title: "Aviso Legal | Cybermoji",
    description:
      "Avisos legales importantes sobre los servicios, contenido y limitaciones de Cybermoji. Lea esta información importante antes de usar nuestro servicio.",
    keywords: "aviso legal, condiciones de uso, limitaciones, aviso importante",
    ogTitle: "Aviso Legal | Cybermoji",
    ogDescription:
      "Avisos legales importantes sobre los servicios y contenido de Cybermoji.",
  },
  de: {
    title: "Haftungsausschluss | Cybermoji",
    description:
      "Wichtige Haftungsausschlüsse über die Dienste, Inhalte und Einschränkungen von Cybermoji. Bitte lesen Sie diese wichtigen Informationen, bevor Sie unseren Dienst nutzen.",
    keywords:
      "haftungsausschluss, nutzungsbedingungen, begrenzungen, wichtiger hinweis",
    ogTitle: "Haftungsausschluss | Cybermoji",
    ogDescription:
      "Wichtige Haftungsausschlüsse über die Dienste und Inhalte von Cybermoji.",
  },
  ja: {
    title: "免責事項 | Cybermoji",
    description:
      "Cybermoji のサービス、コンテンツ、制限に関する重要な免責事項。この重要な情報をご使用の前にお読みください。",
    keywords: "免責事項, 利用条件, 制限, 重要なお知らせ",
    ogTitle: "免責事項 | Cybermoji",
    ogDescription: "Cybermoji のサービスとコンテンツに関する重要な免責事項。",
  },
  ko: {
    title: "면책 고지 | Cybermoji",
    description:
      "Cybermoji의 서비스, 콘텐츠 및 제한에 대한 중요한 면책 고지입니다. 서비스를 사용하기 전에 이 중요한 정보를 읽어보세요.",
    keywords: "면책 고지, 이용 조건, 제한, 중요한 통지",
    ogTitle: "면책 고지 | Cybermoji",
    ogDescription: "Cybermoji의 서비스 및 콘텐츠에 대한 중요한 면책 고지.",
  },
  pt: {
    title: "Aviso Legal | Cybermoji",
    description:
      "Avisos legais importantes sobre os serviços, conteúdo e limitações do Cybermoji. Por favor, leia estas informações importantes antes de usar nosso serviço.",
    keywords: "aviso legal, condições de uso, limitações, aviso importante",
    ogTitle: "Aviso Legal | Cybermoji",
    ogDescription:
      "Avisos legais importantes sobre os serviços e conteúdo do Cybermoji.",
  },
  ru: {
    title: "Отказ от ответственности | Cybermoji",
    description:
      "Важные отказы от ответственности относительно услуг, контента и ограничений Cybermoji. Пожалуйста, прочитайте эту важную информацию перед использованием нашего сервиса.",
    keywords:
      "отказ от ответственности, условия использования, ограничения, важное уведомление",
    ogTitle: "Отказ от ответственности | Cybermoji",
    ogDescription:
      "Важные отказы от ответственности относительно услуг и контента Cybermoji.",
  },
  ar: {
    title: "إخلاء المسؤولية | Cybermoji",
    description:
      "إخلاءات المسؤولية المهمة حول خدمات ومحتوى وحدود Cybermoji. يرجى قراءة هذه المعلومات المهمة قبل استخدام خدمتنا.",
    keywords: "إخلاء المسؤولية, شروط الاستخدام, القيود, إشعار مهم",
    ogTitle: "إخلاء المسؤولية | Cybermoji",
    ogDescription: "إخلاءات المسؤولية المهمة حول خدمات ومحتوى Cybermoji.",
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
      url: `${siteConfig.siteUrl}/${lang}/disclaimer`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/disclaimer`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  return <DisclaimerContent lang={lang} />;
}
