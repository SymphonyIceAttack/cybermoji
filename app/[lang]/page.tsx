import type { Metadata } from "next";
import { CybermojiIndex } from "@/components/cybermoji";
import { CybermojiStructuredData } from "@/components/structured-data/cybermoji";
import { siteConfig } from "@/lib/config";
import { generateHreflangLinks } from "@/lib/translations/hreflang";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales } from "@/lib/translations";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Cybermoji - The Ultimate Emoji Collection",
    description:
      "Browse, search, and copy thousands of emojis. Find the perfect expression for every moment. 100% free, instant copy, no login required.",
    ogTitle: "Cybermoji - The Ultimate Emoji Collection",
    ogDescription:
      "Browse, search, and copy thousands of emojis. Find the perfect expression for every moment.",
  },
  zh: {
    title: "Cybermoji - 终极 Emoji 集合",
    description:
      "浏览、搜索和复制数千个 Emoji。找到完美的表达方式。100% 免费、即时复制、无需登录。",
    ogTitle: "Cybermoji - 终极 Emoji 集合",
    ogDescription: "浏览、搜索和复制数千个 Emoji。找到完美的表达方式。",
  },
  fr: {
    title: "Cybermoji - La Collection Emoji Ultime",
    description:
      "Parcourez, recherchez et copiez des milliers d'emoji. Trouvez l'expression parfaite pour chaque moment. 100% gratuit, copie instantanée, sans connexion.",
    ogTitle: "Cybermoji - La Collection Emoji Ultime",
    ogDescription:
      "Parcourez, recherchez et copiez des milliers d'emoji. Trouvez l'expression parfaite pour chaque moment.",
  },
  es: {
    title: "Cybermoji - La Colección Emoji Definitiva",
    description:
      "Navega, busca y copia miles de emoji. Encuentra la expresión perfecta para cada momento. 100% gratis, copia instantánea, sin inicio de sesión.",
    ogTitle: "Cybermoji - La Colección Emoji Definitiva",
    ogDescription:
      "Navega, busca y copia miles de emoji. Encuentra la expresión perfecta para cada momento.",
  },
  de: {
    title: "Cybermoji - Die Ultimative Emoji-Sammlung",
    description:
      "Durchsuchen, suchen und kopieren Sie Tausende von Emoji. Finden Sie den perfekten Ausdruck für jeden Moment. 100% kostenlos, sofortiges Kopieren, kein Login erforderlich.",
    ogTitle: "Cybermoji - Die Ultimative Emoji-Sammlung",
    ogDescription:
      "Durchsuchen, suchen und kopieren Sie Tausende von Emoji. Finden Sie den perfekten Ausdruck für jeden Moment.",
  },
  ja: {
    title: "Cybermoji - 究極の Emoji コレクション",
    description:
      "何千もの Emoji を閲覧、検索、コピー瞬間に理想の表現を見つけましょう。100% 無料、即座にコピー、ログイン不要。",
    ogTitle: "Cybermoji - 究極の Emoji コレクション",
    ogDescription:
      "何千もの Emoji を閲覧、検索、コピー瞬間に理想の表現を見つけましょう。",
  },
  ko: {
    title: "Cybermoji - 궁극의 이모지 컬렉션",
    description:
      "수천 개의 이모지를 검색, 탐색, 복사하세요. 순간에 맞는 완벽한 표현을 찾으세요. 100% 무료, 즉시 복사, 로그인 불필요.",
    ogTitle: "Cybermoji - 궁극의 이모지 컬렉션",
    ogDescription:
      "수천 개의 이모지를 검색, 탐색, 복사하세요. 순간에 맞는 완벽한 표현을 찾으세요.",
  },
  pt: {
    title: "Cybermoji - A Coleção Emoji Definitiva",
    description:
      "Navegue, pesquise e copie milhares de emoji. Encontre a expressão perfeita para cada momento. 100% gratuito, cópia instantânea, sem login.",
    ogTitle: "Cybermoji - A Coleção Emoji Definitiva",
    ogDescription:
      "Navegue, pesquise e copie milhares de emoji. Encontre a expressão perfeita para cada momento.",
  },
  ru: {
    title: "Cybermoji - Лучшая Коллекция Эмодзи",
    description:
      "Просматривайте, ищите и копируйте тысячи эмодзи. Найдите идеальное выражение для любого момента. 100% бесплатно, мгновенное копирование, без входа.",
    ogTitle: "Cybermoji - Лучшая Коллекция Эмодзи",
    ogDescription:
      "Просматривайте, ищите и копируйте тысячи эмодзи. Найдите идеальное выражение для любого момента.",
  },
  ar: {
    title: "Cybermoji - مجموعة الإيموجي النهائية",
    description:
      "تصفح، ابحث، وانسخ آلاف الإيموجي. ابحث عن التعبير المثالي لكل لحظة. 100% مجاني، نسخ فوري، بدون تسجيل.",
    ogTitle: "Cybermoji - مجموعة الإيموجي النهائية",
    ogDescription:
      "تصفح، ابحث، وانسخ آلاف الإيموجي. ابحث عن التعبير المثالي لكل لحظة.",
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

  const hreflangLinks = generateHreflangLinks("");

  return {
    title: langData.title,
    description: langData.description,
    openGraph: {
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      title: langData.ogTitle,
      description: langData.ogDescription,
      siteName: siteConfig.siteName,
      url: `${siteConfig.siteUrl}/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}`,
      languages: hreflangLinks,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <CybermojiStructuredData lang={lang} />
      <CybermojiIndex lang={lang} />
    </>
  );
}
