import type { Metadata } from "next";
import Link from "next/link";
import {
  BreadcrumbStructuredData,
  getTopicIndexBreadcrumb,
} from "@/components/structured-data/breadcrumb";
import { TopicIndexStructuredData } from "@/components/structured-data/topic-page";
import { siteConfig } from "@/lib/config";
import { getAllTopics } from "@/lib/topic-emojis";
import {
  createTranslator,
  type LanguageType,
  supportedLocales,
} from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations/hreflang";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = createTranslator(lang);

  const hreflangLinks = generateHreflangLinks("/topic");

  return {
    title: `${t("topic.indexTitle")} - Cybermoji`,
    description: t("topic.indexDescription"),
    openGraph: {
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      title: `${t("topic.indexTitle")} - Cybermoji`,
      description: t("topic.indexDescription"),
      siteName: siteConfig.siteName,
      url: `${siteConfig.siteUrl}/${lang}/topic`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("topic.indexTitle")} - Cybermoji`,
      description: t("topic.indexDescription"),
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/topic`,
      languages: hreflangLinks,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TopicIndexPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  const topics = getAllTopics();
  const { t } = createTranslator(lang);

  return (
    <>
      <BreadcrumbStructuredData items={getTopicIndexBreadcrumb(lang)} />
      <TopicIndexStructuredData
        lang={lang}
        topics={topics.map((topic) => ({
          slug: topic.slug,
          name: topic.name,
          icon: topic.icon,
          combinationsCount: topic.combinations.length,
        }))}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            {t("topic.indexTitle")}
          </h1>
          <p className="text-muted-foreground">{t("topic.indexDescription")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {topics.map((topic) => {
            const maxPopularity = Math.max(
              ...topic.combinations.map((c) => c.popularity),
            );

            return (
              <Link
                key={topic.id}
                href={`/${lang}/topic/${topic.slug}`}
                className="group relative flex flex-col items-center p-6 rounded-xl border bg-background hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
              >
                <div className="text-5xl mb-3">{topic.icon}</div>
                <h2 className="text-lg font-semibold capitalize mb-1">
                  {topic.name}
                </h2>
                <p className="text-xs text-muted-foreground text-center">
                  {topic.combinations.length}{" "}
                  {topic.combinations.length !== 1
                    ? t("topic.combinations")
                    : t("topic.combinations")}
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{t("topic.popularity")}</span>
                  <span className="font-medium">{maxPopularity}%</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
