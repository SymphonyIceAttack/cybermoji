import type { ItemList, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { EmojiCombination } from "@/lib/topic-emojis";
import type { LanguageType } from "@/lib/translations";

interface TopicStructuredDataProps {
  lang: LanguageType;
  slug: string;
  topicName: string;
  combinations: EmojiCombination[];
}

export function TopicStructuredData({
  lang,
  slug,
  topicName,
  combinations,
}: TopicStructuredDataProps) {
  const topicSchema: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${topicName} Emoji Combinations - Cybermoji`,
    description: `Browse and copy ${topicName.toLowerCase()} emoji combinations.`,
    url: `${siteConfig.siteUrl}/${lang}/topic/${slug}`,
    numberOfItems: combinations.length,
    itemListElement: combinations.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.tags[0] || `${item.emoji[0]} combination`,
      item: `${siteConfig.siteUrl}/${lang}/topic/${slug}#${item.emoji.join("-")}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(topicSchema),
      }}
    />
  );
}

export function TopicIndexStructuredData({
  lang,
  topics,
}: {
  lang: LanguageType;
  topics: Array<{
    slug: string;
    name: string;
    icon: string;
    combinationsCount: number;
  }>;
}) {
  const topicIndexSchema: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Emoji Topics - Cybermoji",
    description:
      "Explore beautiful emoji combinations by topic. Find the perfect emoji art for your social media bios, comments, and messages.",
    url: `${siteConfig.siteUrl}/${lang}/topic`,
    numberOfItems: topics.length,
    itemListElement: topics.map((topic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: topic.name,
      description: `${topic.combinationsCount} emoji combinations`,
      item: `${siteConfig.siteUrl}/${lang}/topic/${topic.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(topicIndexSchema),
      }}
    />
  );
}
