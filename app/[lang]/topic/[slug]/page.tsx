import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicEmojiBrowser } from "@/components/emoji/topic-emoji-browser";
import {
  BreadcrumbStructuredData,
  getTopicBreadcrumb,
} from "@/components/structured-data/breadcrumb";
import { TopicStructuredData } from "@/components/structured-data/topic-page";
import { TopicExample } from "@/components/topic/example-ssr";
import { TopicFAQ } from "@/components/topic/faq-ssr";
import { siteConfig } from "@/lib/config";
import { getAllTopics, getTopicBySlug, isValidTopic } from "@/lib/topic-emojis";
import {
  createTranslator,
  type LanguageType,
  supportedLocales,
  translations,
} from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations/hreflang";

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

  if (!topic) {
    return {
      title: "Topic Not Found - Cybermoji",
    };
  }

  const { t } = createTranslator(lang);
  const topicName = t(`topic.name.${slug}`);
  const topicDescription = t("topic.browseEmojis").replace(
    "{topicName}",
    topicName,
  );

  const hreflangLinks = generateHreflangLinks(`/topic/${slug}`);

  return {
    title: `${topicName} ${t("topic.combinations")} - Cybermoji`,
    description: topicDescription,
    openGraph: {
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      title: `${topicName} ${t("topic.combinations")} - Cybermoji`,
      description: topicDescription,
      siteName: siteConfig.siteName,
      url: `${siteConfig.siteUrl}/${lang}/topic/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${topicName} ${t("topic.combinations")} - Cybermoji`,
      description: topicDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/topic/${slug}`,
      languages: hreflangLinks,
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

  if (!topic) {
    notFound();
  }

  const { t } = createTranslator(lang);
  const topicName = t(`topic.name.${slug}`);

  const translationsForLang =
    translations[lang as keyof typeof translations] || translations.en;

  return (
    <>
      <BreadcrumbStructuredData
        items={getTopicBreadcrumb(lang, slug, topicName)}
      />
      <TopicStructuredData
        lang={lang}
        slug={slug}
        topicName={topicName}
        combinations={topic.combinations}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{topic.icon}</span>
            <h1 className="text-3xl font-display font-bold capitalize">
              {topicName} {t("topic.combinations")}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {topic.description} {t("topic.clickToCopy")}
          </p>
        </div>

        <TopicEmojiBrowser topic={topic} lang={lang} />
      </div>

      <TopicExample
        translations={translationsForLang as unknown as Record<string, string>}
        topicName={topicName}
        icon={topic.icon}
        emojiVariants={topic.combinations
          .slice(0, 4)
          .map((combo) => combo.emoji.map((emoji) => ({ emoji })))}
        usageScenarios={[
          {
            id: "chat",
            template: t("topic.example.scenario.chat"),
            placeholder: "{emoji}",
            context: t("topic.example.context.chat"),
          },
          {
            id: "social",
            template: t("topic.example.scenario.social"),
            placeholder: "{emoji}",
            context: t("topic.example.context.social"),
          },
          {
            id: "bio",
            template: t("topic.example.scenario.bio"),
            placeholder: "{emoji}",
            context: t("topic.example.context.bio"),
          },
        ]}
        proTip={t(`topic.story.${slug}.usageTip`)}
      />
      <TopicFAQ
        translations={translationsForLang as unknown as Record<string, string>}
        topicName={topicName}
      />
    </>
  );
}
