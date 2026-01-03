import type { Metadata } from "next";
import { InsviewIndex } from "@/components/insview";
import { InsviewStructuredData } from "@/components/structured-data/insview";
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
    title: "duckinsview - Free Anonymous Instagram Viewer",
    description:
      "View Instagram profiles, stories, reels, and highlights anonymously without an account. 100% free, private, and secure.",
    ogTitle: "duckinsview - Free Anonymous Instagram Viewer",
    ogDescription:
      "View Instagram profiles, stories, reels, and highlights anonymously without an account.",
  },
  zh: {
    title: "duckinsview - 免费匿名 Instagram 查看器",
    description:
      "无需账户即可匿名查看 Instagram 资料、动态、reels 和精选内容。100% 免费、私密、安全。",
    ogTitle: "duckinsview - 免费匿名 Instagram 查看器",
    ogDescription:
      "无需账户即可匿名查看 Instagram 资料、动态、reels 和精选内容。",
  },
  fr: {
    title: "duckinsview - Visionneuse Instagram Anonyme Gratuite",
    description:
      "Affichez les profils, stories, reels et highlights Instagram de manière anonyme sans compte. 100% gratuit, privé et sécurisé.",
    ogTitle: "duckinsview - Visionneuse Instagram Anonyme Gratuite",
    ogDescription:
      "Affichez les profils, stories, reels et highlights Instagram de manière anonyme sans compte.",
  },
  es: {
    title: "duckinsview - Visor de Instagram Anónimo Gratis",
    description:
      "Ve perfiles, historias, reels y destacados de Instagram de forma anónima sin cuenta. 100% gratis, privado y seguro.",
    ogTitle: "duckinsview - Visor de Instagram Anónimo Gratis",
    ogDescription:
      "Ve perfiles, historias, reels y destacados de Instagram de forma anónima sin cuenta.",
  },
  de: {
    title: "duckinsview - Kostenloser Anonymer Instagram-Betrachter",
    description:
      "Zeigen Sie Instagram-Profile, Stories, Reels und Highlights anonym ohne Konto an. 100% kostenlos, privat und sicher.",
    ogTitle: "duckinsview - Kostenloser Anonymer Instagram-Betrachter",
    ogDescription:
      "Zeigen Sie Instagram-Profile, Stories, Reels und Highlights anonym ohne Konto an.",
  },
  ja: {
    title: "duckinsview - 無料匿名 Instagram ビューアー",
    description:
      "アカウントなしで Instagram プロフィール、ストーリー、リール、ハイライトを匿名で表示。100% 無料、私密、安全。",
    ogTitle: "duckinsview - 無料匿名 Instagram ビューアー",
    ogDescription:
      "アカウントなしで Instagram プロフィール、ストーリー、リール、ハイライトを匿名で表示。",
  },
  ko: {
    title: "duckinsview - 무료 익명 Instagram 뷰어",
    description:
      "계정 없이 Instagram 프로필, 스토리, 릴스, 하이라이트를 익명으로 시청. 100% 무료, 프라이버시 보호, 안전.",
    ogTitle: "duckinsview - 무료 익명 Instagram 뷰어",
    ogDescription:
      "계정 없이 Instagram 프로필, 스토리, 릴스, 하이라이트를 익명으로 시청.",
  },
  pt: {
    title: "duckinsview - Visualizador de Instagram Anônimo Gratuito",
    description:
      "Veja perfis, stories, reels e destaques do Instagram anonimamente sem conta. 100% gratuito, privado e seguro.",
    ogTitle: "duckinsview - Visualizador de Instagram Anônimo Gratuito",
    ogDescription:
      "Veja perfis, stories, reels e destaques do Instagram anonimamente sem conta.",
  },
  ru: {
    title: "duckinsview - Бесплатный Анонимный Просмотр Instagram",
    description:
      "Просматривайте профили, истории, рилс и избранное Instagram анонимно без аккаунта. 100% бесплатно, конфиденциально и безопасно.",
    ogTitle: "duckinsview - Бесплатный Анонимный Просмотр Instagram",
    ogDescription:
      "Просматривайте профили, истории, рилс и избранное Instagram анонимно без аккаунта.",
  },
  ar: {
    title: "duckinsview - عارض إنستغرام مجهول الهوية مجانا",
    description:
      "شاهد ملفات إنستغرام والقصص والريلز والمميزات بشكل مجهول بدون حساب. 100% مجاني خاص وآمن.",
    ogTitle: "duckinsview - عارض إنستغرام مجهول الهوية مجانا",
    ogDescription:
      "شاهد ملفات إنستغرام والقصص والريلز والمميزات بشكل مجهول بدون حساب.",
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
      <InsviewStructuredData lang={lang} />
      <InsviewIndex />
    </>
  );
}
