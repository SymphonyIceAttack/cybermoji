import type { LanguageType } from "../../translations";

/**
 * Category Detail Page Data Schema
 *
 * Defines the complete data structure for the category detail page including:
 * - Page metadata (SEO)
 * - Category emoji data
 * - Structured data types for schema.org
 */

export interface CategoryDetailMetadata {
  title: string;
  description: string;
  canonical: string;
}

export interface CategoryEmojiItem {
  hexcode: string;
  emoji: string;
  label: string;
  tags: string[];
}

export interface CategoryDetailPageData {
  lang: LanguageType;
  slug: string;
  metadata: CategoryDetailMetadata;
  categoryId: string;
  categoryName: string;
  emojiCount: number;
  emojis: CategoryEmojiItem[];
}

/**
 * Category Detail Structured Data Types
 *
 * Defines schema.org structured data types for the category detail page
 */

export interface CollectionPageSchema {
  "@context": "https://schema.org";
  "@type": "CollectionPage";
  name: string;
  description: string;
  url: string;
  mainEntity: {
    "@type": "ItemList";
    numberOfItems: number;
    itemListElement: Array<{
      "@type": "ListItem";
      position: number;
      name: string;
      description: string;
      item: string;
    }>;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  about: {
    "@type": "Thing";
    name: string;
    description: string;
  };
  audience: {
    "@type": "Audience";
    audienceType: string;
  };
  inLanguage: string;
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface HowToSchema {
  "@context": "https://schema.org";
  "@type": "HowTo";
  name: string;
  description: string;
  step: Array<{
    "@type": "HowToStep";
    position: number;
    name?: string;
    text: string;
  }>;
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

export interface CategoryDetailPageSchema {
  collectionPage: CollectionPageSchema;
  faq: FAQPageSchema;
  howTo?: HowToSchema;
  breadcrumb: BreadcrumbSchema;
}

/**
 * Schema factory functions
 */

export function createCategoryDetailPageSchema(
  lang: LanguageType,
  siteUrl: string,
  siteName: string,
  data: CategoryDetailPageData,
): CategoryDetailPageSchema {
  const collectionPage = createCollectionPageSchema(
    lang,
    siteUrl,
    siteName,
    data,
  );
  const faq = createFAQPageSchema(lang, data);
  const howTo = createHowToSchema(lang, siteUrl, data);
  const breadcrumb = createBreadcrumbSchema(lang, siteUrl, data);

  return {
    collectionPage,
    faq,
    howTo,
    breadcrumb,
  };
}

function createCollectionPageSchema(
  lang: LanguageType,
  siteUrl: string,
  siteName: string,
  data: CategoryDetailPageData,
): CollectionPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${data.categoryName} - Cybermoji`,
    description: `Browse and copy ${data.categoryName.toLowerCase()} emojis. Find the perfect emoji for every moment.`,
    url: `${siteUrl}/${lang}/category/${data.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: data.emojiCount,
      itemListElement: data.emojis.slice(0, 100).map((emoji, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: emoji.label,
        description: emoji.tags?.join(", ") || "",
        item: `${siteUrl}/${lang}/category/${data.slug}#${emoji.hexcode}`,
      })),
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    about: {
      "@type": "Thing",
      name: data.categoryName,
      description: `A collection of ${data.emojiCount} ${data.categoryName.toLowerCase()} emojis for creative expression`,
    },
    audience: {
      "@type": "Audience",
      audienceType: "General",
    },
    inLanguage: lang,
  };
}

function createFAQPageSchema(
  lang: LanguageType,
  data: CategoryDetailPageData,
): FAQPageSchema {
  const faqData = getFAQData(lang, data.categoryName);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

function getFAQData(lang: LanguageType, categoryName: string) {
  const faqData: Record<LanguageType, Array<{ q: string; a: string }>> = {
    en: [
      {
        q: `How many ${categoryName.toLowerCase()} emojis are available?`,
        a: `Our ${categoryName.toLowerCase()} category features a comprehensive collection of emojis. We regularly update our collection to include new emoji releases from Unicode as soon as they become available.`,
      },
      {
        q: `Can I use ${categoryName.toLowerCase()} emojis on social media?`,
        a: `Yes! ${categoryName.toLowerCase()} emojis are standard Unicode characters that work on all major social media platforms including Twitter, Facebook, Instagram, TikTok, and more.`,
      },
      {
        q: `Are these ${categoryName.toLowerCase()} emojis free to use?`,
        a: `Yes! All emojis in our collection are standard Unicode characters, which are free to use. There are no copyright restrictions on using emojis in your communications.`,
      },
      {
        q: `Can I copy multiple ${categoryName.toLowerCase()} emojis at once?`,
        a: `Absolutely! You can click on multiple emojis to add them to your clipboard. Simply click each emoji you want, then paste them all at once wherever you need them.`,
      },
      {
        q: `Do ${categoryName.toLowerCase()} emojis work on all devices?`,
        a: `Yes! Our emojis are standard Unicode characters that work on all modern devices - iPhone, Android, Windows, Mac, and Linux. However, older devices may not display the newest emojis.`,
      },
      {
        q: `How do I find specific ${categoryName.toLowerCase()} emojis?`,
        a: `Use the search bar to find emojis by keyword, name, or description. Try searching for specific terms related to ${categoryName.toLowerCase()} to find the perfect emoji for your needs.`,
      },
    ],
    zh: [
      {
        q: `${categoryName}类别有多少个表情可用？`,
        a: `我们的${categoryName}类别提供了全面的表情集合。我们会定期更新集合，以便在Unicode发布新表情后立即将其添加进来。`,
      },
      {
        q: `我可以在社交媒体上使用${categoryName}表情吗？`,
        a: `可以！${categoryName}表情是标准的Unicode字符，可在所有主要社交媒体平台上使用，包括Twitter、Facebook、Instagram、TikTok等。`,
      },
      {
        q: `这些${categoryName}表情可以免费使用吗？`,
        a: `是的！我们集合中的所有表情都是标准的Unicode字符，可以免费使用。在您的通讯中使用表情没有版权限制。`,
      },
      {
        q: `我可以一次复制多个${categoryName}表情吗？`,
        a: `当然可以！您可以点击多个表情将它们添加到剪贴板。只需点击您想要的表情，然后一次性粘贴到任何需要的地方。`,
      },
      {
        q: `${categoryName}表情在所有设备上都能使用吗？`,
        a: `是的！我们的表情是标准的Unicode字符，可以在所有现代设备上使用——iPhone、Android、Windows、Mac和Linux。但是，较旧的设备可能无法显示最新的表情。`,
      },
      {
        q: `如何找到特定的${categoryName}表情？`,
        a: `使用搜索栏按关键词、名称或描述查找表情。尝试搜索与${categoryName}相关的特定术语，以找到适合您需求的完美表情。`,
      },
    ],
    fr: [
      {
        q: `Combien d'emoji ${categoryName.toLowerCase()} sont disponibles ?`,
        a: `Notre catégorie ${categoryName.toLowerCase()} présente une collection complète d'emoji. Nous mettons régulièrement à jour notre collection pour inclure les nouvelles versions d'emoji Unicode.`,
      },
      {
        q: `Puis-je utiliser des emoji ${categoryName.toLowerCase()} sur les réseaux sociaux ?`,
        a: `Oui ! Les emoji ${categoryName.toLowerCase()} sont des caractères Unicode standard qui fonctionnent sur toutes les principales plateformes de réseaux sociaux.`,
      },
      {
        q: `Ces emoji ${categoryName.toLowerCase()} sont-ils gratuits ?`,
        a: `Oui ! Tous les emoji de notre collection sont des caractères Unicode standard, gratuits à utiliser sans restrictions de droits d'auteur.`,
      },
    ],
    es: [
      {
        q: `¿Cuántos emoji de ${categoryName.toLowerCase()} están disponibles?`,
        a: `Nuestra categoría de ${categoryName.toLowerCase()} presenta una colección completa de emoji. Actualizamos regularmente nuestra colección para incluir los nuevos lanzamientos de emoji.`,
      },
      {
        q: `¿Puedo usar emoji de ${categoryName.toLowerCase()} en redes sociales?`,
        a: `¡Sí! Los emoji de ${categoryName.toLowerCase()} son caracteres Unicode estándar que funcionan en todas las principales plataformas de redes sociales.`,
      },
      {
        q: `¿Estos emoji de ${categoryName.toLowerCase()} son gratuitos?`,
        a: `¡Sí! Todos los emoji de nuestra colección son caracteres Unicode estándar, gratuitos para usar sin restricciones de derechos de autor.`,
      },
    ],
    de: [
      {
        q: `Wie viele ${categoryName.toLowerCase()} Emoji sind verfügbar?`,
        a: `Unsere ${categoryName.toLowerCase()} Kategorie bietet eine umfassende Emoji-Sammlung. Wir aktualisieren unsere Sammlung regelmäßig.`,
      },
      {
        q: `Kann ich ${categoryName.toLowerCase()} Emoji in sozialen Medien verwenden?`,
        a: `Ja! ${categoryName.toLowerCase()} Emoji sind Standard-Unicode-Zeichen, die auf allen wichtigen Social-Media-Plattformen funktionieren.`,
      },
      {
        q: `Sind diese ${categoryName.toLowerCase()} Emoji kostenlos?`,
        a: `Ja! Alle Emoji in unserer Sammlung sind Standard-Unicode-Zeichen, die kostenlos zu verwenden sind.`,
      },
    ],
    ja: [
      {
        q: `${categoryName}の絵文字はいくつありますか？`,
        a: `私たちの${categoryName}カテゴリは、包括的な絵文字コレクションを提供します。定期的にコレクションを更新しています。`,
      },
      {
        q: `ソーシャルメディアで${categoryName}の絵文字を使用できますか？`,
        a: `はい！${categoryName}の絵文字は、すべての主要なソーシャルメディアプラットフォームで動作する標準のUnicode文字です。`,
      },
      {
        q: `これらの${categoryName}の絵文字は 無料ですか？`,
        a: `はい！私たちのコレクションのすべての絵文字は、無料で使用できる標準のUnicode文字です。`,
      },
    ],
    ko: [
      {
        q: `${categoryName} 이모지는 몇 개 있나요?`,
        a: `우리의 ${categoryName} 카테고리는 포괄적인 이모지 컬렉션을 제공합니다. 정기적으로 컬렉션을 업데이트합니다.`,
      },
      {
        q: `소셜 미디어에서 ${categoryName} 이모지를 사용할 수 있나요?`,
        a: `네! ${categoryName} 이모지는 모든 주요 소셜 미디어 플랫폼에서 작동하는 표준 유니코드 문자입니다.`,
      },
      {
        q: `이 ${categoryName} 이모지는 무료인가요?`,
        a: `네! 컬렉션의 모든 이모지는 무료로 사용할 수 있는 표준 유니코드 문자입니다.`,
      },
    ],
    pt: [
      {
        q: `Quantos emoji de ${categoryName.toLowerCase()} estão disponíveis?`,
        a: `Nossa categoria de ${categoryName.toLowerCase()} apresenta uma coleção completa de emoji. Atualizamos regularmente nossa coleção.`,
      },
      {
        q: `Posso usar emoji de ${categoryName.toLowerCase()} em mídias sociais?`,
        a: `Sim! Os emoji de ${categoryName.toLowerCase()} são caracteres Unicode padrão que funcionam em todas as principais plataformas de mídia social.`,
      },
      {
        q: `Estes emoji de ${categoryName.toLowerCase()} são gratuitos?`,
        a: `Sim! Todos os emoji em nossa coleção são caracteres Unicode padrão, gratuitos para usar.`,
      },
    ],
    ru: [
      {
        q: `Сколько эмодзи ${categoryName.toLowerCase()} доступно?`,
        a: `Наша категория ${categoryName.toLowerCase()} представляет собой полную коллекцию эмодзи. Мы регулярно обновляем нашу коллекцию.`,
      },
      {
        q: `Могу ли я использовать эмодзи ${categoryName.toLowerCase()} в социальных сетях?`,
        a: `Да! Эмодзи ${categoryName.toLowerCase()} — это стандартные символы Unicode, которые работают на всех основных платформах социальных сетей.`,
      },
      {
        q: `Эти эмодзи ${categoryName.toLowerCase()} бесплатны?`,
        a: `Да! Все эмодзи в нашей коллекции — это стандартные символы Unicode, которые бесплатны для использования.`,
      },
    ],
    ar: [
      {
        q: `كم عدد إيموجي ${categoryName.toLowerCase()} المتاحة؟`,
        a: `فئة ${categoryName.toLowerCase()} الخاصة بنا تقدم مجموعة شاملة من الإيموجي. نقوم بتحديث مجموعتنا بانتظام.`,
      },
      {
        q: `هل يمكنني استخدام إيموجي ${categoryName.toLowerCase()} على وسائل التواصل الاجتماعي؟`,
        a: `نعم! إيموجي ${categoryName.toLowerCase()} هي أحرف Unicode قياسية تعمل على جميع منصات وسائل التواصل الاجتماعي الرئيسية.`,
      },
      {
        q: `هل هذه الإيموجي ${categoryName.toLowerCase()} مجانية؟`,
        a: `نعم! جميع الإيموجي في مجموعتنا هي أحرف Unicode قياسية، وهي مجانية للاستخدام.`,
      },
    ],
  };

  return faqData[lang] || faqData.en;
}

function createHowToSchema(
  lang: LanguageType,
  _siteUrl: string,
  data: CategoryDetailPageData,
): HowToSchema {
  const howToNames: Record<
    LanguageType,
    { name: string; description: string }
  > = {
    en: {
      name: `How to Use ${data.categoryName} Emojis`,
      description: `Learn how to find and use ${data.categoryName.toLowerCase()} emojis in your messages and social media`,
    },
    zh: {
      name: `如何使用${data.categoryName}表情`,
      description: `了解如何在消息和社交媒体中找到和使用${data.categoryName.toLowerCase()}表情`,
    },
    fr: {
      name: `Comment utiliser les emoji ${data.categoryName.toLowerCase()}`,
      description: `Apprenez à trouver et à utiliser les emoji ${data.categoryName.toLowerCase()} dans vos messages et réseaux sociaux`,
    },
    es: {
      name: `Cómo usar emoji de ${data.categoryName.toLowerCase()}`,
      description: `Aprende a encontrar y usar emoji de ${data.categoryName.toLowerCase()} en tus mensajes y redes sociales`,
    },
    de: {
      name: `Wie man ${data.categoryName.toLowerCase()} Emoji verwendet`,
      description: `Erfahren Sie, wie Sie ${data.categoryName.toLowerCase()} Emoji in Ihren Nachrichten und sozialen Medien finden und verwenden`,
    },
    ja: {
      name: `${data.categoryName}の絵文字の使い方`,
      description: `メッセージやソーシャルメディアで${data.categoryName.toLowerCase()}の絵文字を見つけて使用する方法を学ぶ`,
    },
    ko: {
      name: `${data.categoryName} 이모지 사용 방법`,
      description: `메시지와 소셜 미디어에서 ${data.categoryName.toLowerCase()} 이모지를 찾고 사용하는 방법을 알아보세요`,
    },
    pt: {
      name: `Como usar emoji de ${data.categoryName.toLowerCase()}`,
      description: `Aprenda a encontrar e usar emoji de ${data.categoryName.toLowerCase()} em suas mensagens e redes sociais`,
    },
    ru: {
      name: `Как использовать эмодзи ${data.categoryName.toLowerCase()}`,
      description: `Узнайте, как находить и использовать эмодзи ${data.categoryName.toLowerCase()} в своих сообщениях и социальных сетях`,
    },
    ar: {
      name: `كيفية استخدام إيموجي ${data.categoryName.toLowerCase()}`,
      description: `تعلم كيفية البحث عن إيموجي ${data.categoryName.toLowerCase()} واستخدامها في رسائلك ووسائل التواصل الاجتماعي`,
    },
  };

  const names = howToNames[lang] || howToNames.en;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: names.name,
    description: names.description,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Browse",
        text: `Browse the ${data.categoryName.toLowerCase()} category to discover emojis that match your needs`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Preview",
        text: "Click on any emoji to see it in larger size and preview how it looks",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Copy",
        text: "Click to copy the emoji to your clipboard and paste it wherever you want to use it",
      },
    ],
  };
}

function createBreadcrumbSchema(
  lang: LanguageType,
  siteUrl: string,
  data: CategoryDetailPageData,
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

  const categoryNames: Record<LanguageType, string> = {
    en: "Categories",
    zh: "类别",
    fr: "Catégories",
    es: "Categorías",
    de: "Kategorien",
    ja: "カテゴリー",
    ko: "카테고리",
    pt: "Categorias",
    ru: "Категории",
    ar: "الفئات",
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
        name: categoryNames[lang] || categoryNames.en,
        item: `${siteUrl}/${lang}/category`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.categoryName,
        item: `${siteUrl}/${lang}/category/${data.slug}`,
      },
    ],
  };
}
