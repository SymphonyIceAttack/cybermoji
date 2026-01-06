import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicEmojiBrowser } from "@/components/emoji/topic-emoji-browser";
import { siteConfig } from "@/lib/config";
import { getAllTopics, getTopicBySlug, isValidTopic } from "@/lib/topic-emojis";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales, translations } from "@/lib/translations";

export async function generateStaticParams() {
  const topics = getAllTopics();
  const params: Array<{ lang: string; slug: string }> = [];

  for (const lang of supportedLocales) {
    for (const topic of topics) {
      params.push({ lang, slug: topic.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidTopic(slug)) {
    return {
      title: "Topic Not Found - Cybermoji",
    };
  }

  const topic = getTopicBySlug(slug);
  const topicName = topic?.name || slug.replace(/-/g, " ");

  return {
    title: `${topicName} Emojis - Cybermoji`,
    description:
      topic?.description ||
      `Browse and copy ${topicName.toLowerCase()} emoji combinations.`,
    openGraph: {
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      title: `${topicName} Emojis - Cybermoji`,
      description: `Browse and copy ${topicName.toLowerCase()} emoji combinations.`,
      siteName: siteConfig.siteName,
      url: `${siteConfig.siteUrl}/${lang}/topic/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${topicName} Emojis - Cybermoji`,
      description: `Browse and copy ${topicName.toLowerCase()} emoji combinations.`,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/topic/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ lang: LanguageType; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isValidTopic(slug)) {
    notFound();
  }

  const topic = getTopicBySlug(slug);
  const topicName = topic?.name || slug.replace(/-/g, " ");

  if (!topic) {
    notFound();
  }

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown =
      translations[lang as keyof typeof translations] || translations.en;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };
  const commonT = (key: string) => t(`common.${key}`);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{topic.icon}</span>
          <h1 className="text-3xl font-display font-bold capitalize">
            {topicName} {commonT("topic.combinations")}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {topic.description} {commonT("topic.clickToCopy")}
        </p>
      </div>

      <TopicEmojiBrowser topic={topic} lang={lang} />
    </div>
  );
}
