import type { LanguageType } from "../../translations";

/**
 * Topic Index Page Data Schema
 *
 * Defines the complete data structure for the topic index page including:
 * - Page metadata (SEO)
 * - Topic list data
 * - Structured data types for schema.org
 */

export interface TopicIndexMetadata {
  title: string;
  description: string;
  canonical: string;
}

export interface TopicListItem {
  id: string;
  slug: string;
  name: string;
  icon: string;
  combinationsCount: number;
  popularity: number;
}

export interface TopicIndexPageData {
  lang: LanguageType;
  metadata: TopicIndexMetadata;
  topics: TopicListItem[];
}

/**
 * Topic Index Structured Data Types
 *
 * Defines schema.org structured data types for the topic index page
 */

export interface ItemListSchema {
  "@context": "https://schema.org";
  "@type": "ItemList";
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    description: string;
    item: string;
  }>;
}

export interface CollectionPageSchema {
  "@context": "https://schema.org";
  "@type": "CollectionPage";
  name: string;
  description: string;
  url: string;
  mainEntity: ItemListSchema;
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  audience: {
    "@type": "Audience";
    audienceType: string;
  };
  inLanguage: string;
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface TopicIndexPageSchema {
  itemList: ItemListSchema;
  collectionPage: CollectionPageSchema;
  breadcrumb: BreadcrumbSchema;
}

/**
 * Schema factory functions
 */

export function createTopicIndexPageSchema(
  lang: LanguageType,
  siteUrl: string,
  siteName: string,
  data: TopicIndexPageData,
): TopicIndexPageSchema {
  const itemList = createItemListSchema(lang, siteUrl, data);
  const collectionPage = createCollectionPageSchema(
    lang,
    siteUrl,
    siteName,
    data,
  );
  const breadcrumb = createBreadcrumbSchema(lang, siteUrl);

  return {
    itemList,
    collectionPage,
    breadcrumb,
  };
}

function createItemListSchema(
  lang: LanguageType,
  siteUrl: string,
  data: TopicIndexPageData,
): ItemListSchema {
  const names: Record<LanguageType, string> = {
    en: "Emoji Topics",
    zh: "表情主题",
    fr: "Sujets Emoji",
    es: "Temas Emoji",
    de: "Emoji-Themen",
    ja: "絵文字トピック",
    ko: "이모지 주제",
    pt: "Temas Emoji",
    ru: "Темы Эмодзи",
    ar: "موضوعات الإيموجي",
  };

  const descriptions: Record<LanguageType, string> = {
    en: "Explore beautiful emoji combinations by topic. Find the perfect emoji art for your social media bios, comments, and messages.",
    zh: "按主题探索精美的表情组合。为您的社交媒体个人资料、评论和消息找到完美的表情艺术。",
    fr: "Explorez de belles combinaisons d'emoji par sujet. Trouvez l'art d'emoji parfait pour vos bios, commentaires et messages sur les réseaux sociaux.",
    es: "Explora hermosas combinaciones de emoji por tema. Encuentra el arte de emoji perfecto para tus biografías, comentarios y mensajes en redes sociales.",
    de: "Entdecken Sie wunderschöne Emoji-Kombinationen nach Themen. Finden Sie die perfekte Emoji-Kunst für Ihre Social-Media-Bios, Kommentare und Nachrichten.",
    ja: "テーマ別に美しい絵文字の組み合わせを探求しましょう。SNSのプロフィール、コメント、メッセージに最適な絵文字アートを見つけましょう。",
    ko: "주제별로 아름다운 이모지 조합을 탐색하세요. 소셜 미디어 프로필, 댓글, 메시지에 맞는 완벽한 이모지 아트를 찾으세요.",
    pt: "Explore belas combinações de emoji por tópico. Encontre a arte de emoji perfeita para suas biografias, comentários e mensagens em redes sociais.",
    ru: "Исследуйте красивые комбинации эмодзи по темам. Найдите идеальное эмодзи-искусство для своих биографий, комментариев и сообщений в социальных сетях.",
    ar: "استكشف مجموعات الإيموجي الجميلة حسب الموضوع. ابحث عن فن الإيموجي المثالي لbios وسائل التواصل الاجتماعي والتعليقات والرسائل.",
  };

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: names[lang] || names.en,
    description: descriptions[lang] || descriptions.en,
    url: `${siteUrl}/${lang}/topic`,
    numberOfItems: data.topics.length,
    itemListElement: data.topics.map((topic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: topic.name,
      description: `${topic.combinationsCount} emoji combinations`,
      item: `${siteUrl}/${lang}/topic/${topic.slug}`,
    })),
  };
}

function createCollectionPageSchema(
  lang: LanguageType,
  siteUrl: string,
  siteName: string,
  data: TopicIndexPageData,
): CollectionPageSchema {
  const itemList = createItemListSchema(lang, siteUrl, data);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: data.metadata.title,
    description: data.metadata.description,
    url: `${siteUrl}/${lang}/topic`,
    mainEntity: itemList,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    audience: {
      "@type": "Audience",
      audienceType: "General",
    },
    inLanguage: lang,
  };
}

function createBreadcrumbSchema(
  lang: LanguageType,
  siteUrl: string,
): BreadcrumbSchema {
  const homeNames: Record<LanguageType, string> = {
    en: "Home",
    zh: "首页",
    fr: "Accueil",
    es: "Inicio",
    de: "Startseite",
    ja: "ホーム",
    ko: "홈",
    pt: "Início",
    ru: "Главная",
    ar: "الرئيسية",
  };

  const topicNames: Record<LanguageType, string> = {
    en: "Topics",
    zh: "主题",
    fr: "Sujets",
    es: "Temas",
    de: "Themen",
    ja: "トピック",
    ko: "주제",
    pt: "Tópicos",
    ru: "Темы",
    ar: "الموضوعات",
  };

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeNames[lang] || homeNames.en,
        item: `${siteUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: topicNames[lang] || topicNames.en,
        item: `${siteUrl}/${lang}/topic`,
      },
    ],
  };
}
