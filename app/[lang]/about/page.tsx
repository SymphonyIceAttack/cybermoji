import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/about-content";
import {
  BreadcrumbStructuredData,
  getAboutBreadcrumb,
} from "@/components/structured-data/breadcrumb";
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
    title: "About Us | Cybermoji",
    description:
      "Learn more about Cybermoji, your ultimate destination for discovering, exploring, and copying emojis. We're passionate about helping people express themselves through emojis.",
    keywords:
      "about Cybermoji, emoji platform, about us, emoji collection, who we are",
    ogTitle: "About Us | Cybermoji",
    ogDescription:
      "Learn more about Cybermoji and our mission to help people express themselves through emojis.",
  },
  zh: {
    title: "关于我们 | Cybermoji",
    description:
      "了解更多关于 Cybermoji 的信息，您发现、探索和复制表情符号的终极目的地。我们热衷于帮助人们通过表情符号表达自己。",
    keywords: "关于 Cybermoji, 表情符号平台, 关于我们, 表情符号集合",
    ogTitle: "关于我们 | Cybermoji",
    ogDescription:
      "了解更多关于 Cybermoji 以及我们通过表情符号帮助人们表达自己的使命。",
  },
  fr: {
    title: "À Propos | Cybermoji",
    description:
      "En savoir plus sur Cybermoji, votre destination ultime pour découvrir, explorer et copier des emoji. Nous sommes passionnés par l'aide aux gens pour s'exprimer à travers les emoji.",
    keywords:
      "à propos de Cybermoji, plateforme emoji, à propos de nous, collection emoji",
    ogTitle: "À Propos | Cybermoji",
    ogDescription:
      "En savoir plus sur Cybermoji et notre mission d'aider les gens à s'exprimer à travers les emoji.",
  },
  es: {
    title: "Sobre Nosotros | Cybermoji",
    description:
      "Obtenga más información sobre Cybermoji, su destino definitivo para descubrir, explorar y copiar emoji. Nos apasiona ayudar a las personas a expresarse a través de emoji.",
    keywords:
      "sobre Cybermoji, plataforma emoji, sobre nosotros, colección emoji",
    ogTitle: "Sobre Nosotros | Cybermoji",
    ogDescription:
      "Obtenga más información sobre Cybermoji y nuestra misión de ayudar a las personas a expresarse a través de emoji.",
  },
  de: {
    title: "Über Uns | Cybermoji",
    description:
      "Erfahren Sie mehr über Cybermoji, Ihr ultimatives Ziel zum Entdecken, Durchsuchen und Kopieren von Emoji. Wir sind leidenschaftlich dabei, Menschen zu helfen, sich durch Emoji auszudrücken.",
    keywords: "über Cybermoji, Emoji-Plattform, über uns, Emoji-Sammlung",
    ogTitle: "Über Uns | Cybermoji",
    ogDescription:
      "Erfahren Sie mehr über Cybermoji und unsere Mission, Menschen zu helfen, sich durch Emoji auszudrücken.",
  },
  ja: {
    title: "概要 | Cybermoji",
    description:
      "Cybermoji の詳細をご覧ください。絵文字を発見、探索、コピーするための究極の目的地です。私たちは人々が絵文字を通じて表現することを情熱的にサポートしています。",
    keywords:
      "Cybermoji について, 絵文字プラットフォーム, 概要, 絵文字コレクション",
    ogTitle: "概要 | Cybermoji",
    ogDescription:
      "Cybermoji と人々が絵文字を通じて表現するのを助ける使命について更多信息。",
  },
  ko: {
    title: "회사 소개 | Cybermoji",
    description:
      "Cybermoji에 대해 자세히 알아보세요. 이모지를 발견하고 탐색하고 복사하는 궁극의 목적지입니다. 사람들이 이모지를 통해 표현하는 것을 돕는 것에 열정을 가지고 있습니다.",
    keywords: "Cybermoji 소개, 이모지 플랫폼, 회사 소개, 이모지 컬렉션",
    ogTitle: "회사 소개 | Cybermoji",
    ogDescription:
      "Cybermoji와 사람들이 이모지를 통해 표현하도록 돕는 사명에 대해 자세히 알아보세요.",
  },
  pt: {
    title: "Sobre Nós | Cybermoji",
    description:
      "Saiba mais sobre Cybermoji, seu destino definitivo para descobrir, explorar e copiar emoji. Somos apaixonados por ajudar as pessoas a se expressarem através de emoji.",
    keywords: "sobre Cybermoji, plataforma emoji, sobre nós, coleção emoji",
    ogTitle: "Sobre Nós | Cybermoji",
    ogDescription:
      "Saiba mais sobre Cybermoji e nossa missão de ajudar as pessoas a se expressarem através de emoji.",
  },
  ru: {
    title: "О Нас | Cybermoji",
    description:
      "Узнайте больше о Cybermoji, вашем конечном пункте для обнаружения, исследования и копирования эмодзи. Мы страстно стремимся помогать людям выражать себя через эмодзи.",
    keywords: "о Cybermoji, платформа эмодзи, о нас, коллекция эмодзи",
    ogTitle: "О Нас | Cybermoji",
    ogDescription:
      "Узнайте больше о Cybermoji и нашей миссии помогать людям выражать себя через эмодзи.",
  },
  ar: {
    title: "من نحن | Cybermoji",
    description:
      "اعرف المزيد عن Cybermoji، وجهتك النهائية لاكتشاف واستكشاف ونسخ الإيموجي. نحن شغوفون بمساعدة الناس على التعبير عن أنفسهم من خلال الإيموجي.",
    keywords: "عن Cybermoji, منصة الإيموجي, من نحن, مجموعة الإيموجي",
    ogTitle: "من نحن | Cybermoji",
    ogDescription:
      "اعرف المزيد عن Cybermoji ومهمتنا لمساعدة الناس على التعبير عن أنفسهم من خلال الإيموجي.",
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

  const hreflangLinks = generateHreflangLinks("/about");

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
      url: `${siteConfig.siteUrl}/${lang}/about`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/about`,
      languages: hreflangLinks,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  const { translations } = createTranslator(lang);

  return (
    <>
      <BreadcrumbStructuredData items={getAboutBreadcrumb(lang)} />
      <AboutContent lang={lang} translations={translations} />
    </>
  );
}
