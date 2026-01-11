import type { CreativeWork, ItemList, Thing, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { EmojiCombination, TopicEmojiData } from "@/lib/topic-emojis";
import type { LanguageType } from "@/lib/translations";

interface TopicStructuredDataProps {
  lang: LanguageType;
  slug: string;
  topicName: string;
  combinations: EmojiCombination[];
  topicData?: TopicEmojiData;
}

// 为每个topic生成专门的schema.org结构化数据
export function TopicStructuredData({
  lang,
  slug,
  topicName,
  combinations,
  topicData,
}: TopicStructuredDataProps) {
  const topicSchema: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${topicName} Emoji Combinations - Cybermoji`,
    description: `Browse and copy ${topicName.toLowerCase()} emoji combinations. Find the perfect emoji art for your social media bios, comments, and messages.`,
    url: `${siteConfig.siteUrl}/${lang}/topic/${slug}`,
    numberOfItems: combinations.length,
    itemListElement: combinations.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.tags[0] || `${item.emoji[0]} combination`,
      description: item.tags.join(", "),
      item: `${siteConfig.siteUrl}/${lang}/topic/${slug}#${item.emoji.join("-")}`,
    })),
  };

  // 为topic页面生成额外的结构化数据
  const topicDetailSchema: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: topicName,
    description:
      topicData?.description ||
      `A collection of ${combinations.length} ${topicName.toLowerCase()} emoji combinations`,
    url: `${siteConfig.siteUrl}/${lang}/topic/${slug}`,
    image: topicData?.icon,
  };

  // 为topic页面生成FAQ结构化数据
  const topicFAQSchema: WithContext<CreativeWork> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getTopicFAQItems(lang, topicName),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(topicSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(topicDetailSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(topicFAQSchema),
        }}
      />
    </>
  );
}

interface TopicIndexStructuredDataProps {
  lang: LanguageType;
  topics: Array<{
    slug: string;
    name: string;
    icon: string;
    combinationsCount: number;
  }>;
}

export function TopicIndexStructuredData({
  lang,
  topics,
}: TopicIndexStructuredDataProps) {
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

interface FAQItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

function getTopicFAQItems(lang: LanguageType, topicName: string): FAQItem[] {
  const faqData: Record<LanguageType, Array<{ q: string; a: string }>> = {
    en: [
      {
        q: `What are ${topicName.toLowerCase()} emoji combinations?`,
        a: `${topicName} emoji combinations are creative arrangements of emojis that convey specific themes, emotions, or aesthetics. These combinations are perfect for social media bios, comments, and messages.`,
      },
      {
        q: `How do I use ${topicName.toLowerCase()} emoji combinations?`,
        a: `Simply click on any ${topicName.toLowerCase()} emoji combination to copy it to your clipboard. Then paste it wherever you want to use it - in social media posts, messages, bios, or anywhere else that supports emojis.`,
      },
      {
        q: `Can I customize ${topicName.toLowerCase()} emoji combinations?`,
        a: `Yes! You can combine multiple ${topicName.toLowerCase()} emoji combinations by long-pressing on them to select multiple, then copy them all at once.`,
      },
      {
        q: `Are ${topicName.toLowerCase()} emoji combinations free to use?`,
        a: `Absolutely! All emoji combinations on Cybermoji are free to use. They are standard Unicode characters that work on all platforms without any copyright restrictions.`,
      },
      {
        q: `Do ${topicName.toLowerCase()} emoji combinations work on all devices?`,
        a: `Yes! Our emoji combinations use standard Unicode characters that work on all modern devices including iPhone, Android, Windows, Mac, and Linux.`,
      },
      {
        q: `Where can I use ${topicName.toLowerCase()} emoji combinations?`,
        a: `You can use ${topicName.toLowerCase()} emoji combinations anywhere that supports Unicode characters: social media platforms (Twitter, Instagram, TikTok, Facebook), messaging apps (WhatsApp, Telegram, Discord), emails, and documents.`,
      },
    ],
    zh: [
      {
        q: `什么是${topicName}表情组合？`,
        a: `${topicName}表情组合是将表情排列成特定主题、情感或美学效果的创意组合。这些组合非常适合用于社交媒体个人资料、评论和消息。`,
      },
      {
        q: `如何使用${topicName}表情组合？`,
        a: `只需点击任何${topicName}表情组合即可将其复制到剪贴板。然后将其粘贴到您想使用的任何地方——社交媒体帖子、消息、个人资料或任何支持表情的地方。`,
      },
      {
        q: `我可以自定义${topicName}表情组合吗？`,
        a: `可以！您可以通过长按来选择多个${topicName}表情组合，然后将它们一次全部复制。`,
      },
      {
        q: `${topicName}表情组合可以免费使用吗？`,
        a: `当然可以！Cybermoji上的所有表情组合均可免费使用。它们是标准Unicode字符，可在所有平台上使用，无需任何版权限制。`,
      },
      {
        q: `${topicName}表情组合在所有设备上都能使用吗？`,
        a: `是的！我们的表情组合使用标准Unicode字符，可在所有现代设备上使用，包括iPhone、Android、Windows、Mac和Linux。`,
      },
      {
        q: `在哪里可以使用${topicName}表情组合？`,
        a: `您可以在任何支持Unicode字符的地方使用${topicName}表情组合：社交媒体平台（Twitter、Instagram、TikTok、Facebook）、消息应用（WhatsApp、Telegram、Discord）、电子邮件和文档。`,
      },
    ],
    fr: [
      {
        q: `Que sont les combinaisons d'emoji ${topicName.toLowerCase()} ?`,
        a: `Les combinaisons d'emoji ${topicName.toLowerCase()} sont des arrangements créatifs d'emoji qui transmettent des thèmes, des émotions ou des esthétiques spécifiques.`,
      },
      {
        q: `Comment utiliser les combinaisons d'emoji ${topicName.toLowerCase()} ?`,
        a: `Cliquez simplement sur n'importe quelle combinaison d'emoji ${topicName.toLowerCase()} pour la copier dans votre presse-papiers.`,
      },
      {
        q: `Puis-je personnaliser les combinaisons d'emoji ${topicName.toLowerCase()} ?`,
        a: `Oui! Vous pouvez combiner plusieurs combinaisons d'emoji ${topicName.toLowerCase()} en maintenant la pression dessus.`,
      },
    ],
    es: [
      {
        q: `¿Qué son las combinaciones de emoji de ${topicName.toLowerCase()}?`,
        a: `Las combinaciones de emoji de ${topicName.toLowerCase()} son arreglos creativos de emoji que transmiten temas, emociones o estéticas específicas.`,
      },
      {
        q: `¿Cómo uso las combinaciones de emoji de ${topicName.toLowerCase()}?`,
        a: `Simplemente haz clic en cualquier combinación de emoji de ${topicName.toLowerCase()} para copiarla en tu portapapeles.`,
      },
      {
        q: `¿Puedo personalizar las combinaciones de emoji de ${topicName.toLowerCase()}?`,
        a: `¡Sí! Puedes combinar múltiples combinaciones de emoji de ${topicName.toLowerCase()} manteniéndolas presionadas.`,
      },
    ],
    de: [
      {
        q: `Was sind ${topicName.toLowerCase()} Emoji-Kombinationen?`,
        a: `${topicName.toLowerCase()} Emoji-Kombinationen sind kreative Anordnungen von Emojis, die bestimmte Themen, Emotionen oder Ästhetiken vermitteln.`,
      },
      {
        q: `Wie verwende ich ${topicName.toLowerCase()} Emoji-Kombinationen?`,
        a: `Klicken Sie einfach auf eine beliebige ${topicName.toLowerCase()} Emoji-Kombination, um sie in Ihre Zwischenablage zu kopieren.`,
      },
      {
        q: `Kann ich ${topicName.toLowerCase()} Emoji-Kombinationen anpassen?`,
        a: `Ja! Sie können mehrere ${topicName.toLowerCase()} Emoji-Kombinationen kombinieren, indem Sie sie lange drücken.`,
      },
    ],
    ja: [
      {
        q: `${topicName}の絵文字組み合わせは何ですか？`,
        a: `${topicName}の絵文字組み合わせは、特定のテーマ、感情、美しさを伝える絵文字のクリエイティブな配置です。`,
      },
      {
        q: `${topicName}の絵文字組み合わせはどうやって使うの？`,
        a: `任意の${topicName}の絵文字組み合わせをクリックして、クリップボードにコピーするだけです。`,
      },
      {
        q: `${topicName}の絵文字組み合わせをカスタマイズできる？`,
        a: `はい！長押しして複数の${topicName}の絵文字組み合わせを選択できます。`,
      },
    ],
    ko: [
      {
        q: `${topicName} 이모지 조합은 무엇인가요?`,
        a: `${topicName} 이모지 조합은 특정 테마, 감정 또는 미학을 전달하는 이모지의 창의적인 배열입니다.`,
      },
      {
        q: `${topicName} 이모지 조합은 어떻게 사용하나요?`,
        a: `任意의 ${topicName} 이모지 조합을 클릭하여 클립보드에 복사하기만 하면 됩니다.`,
      },
      {
        q: `${topicName} 이모지 조합을 커스터마이즈할 수 있나요?`,
        a: `네! 길게 눌러 여러 ${topicName} 이모지 조합을 선택할 수 있습니다.`,
      },
    ],
    pt: [
      {
        q: `O que são combinações de emoji de ${topicName.toLowerCase()}?`,
        a: `As combinações de emoji de ${topicName.toLowerCase()} são arranjos criativos de emoji que transmitem temas, emoções ou estéticas específicas.`,
      },
      {
        q: `Como usar combinações de emoji de ${topicName.toLowerCase()}?`,
        a: `Basta clicar em qualquer combinação de emoji de ${topicName.toLowerCase()} para copiá-la para sua área de transferência.`,
      },
      {
        q: `Posso personalizar combinações de emoji de ${topicName.toLowerCase()}?`,
        a: `Sim! Você pode combinar várias combinações de emoji de ${topicName.toLowerCase()} mantendo-as pressionadas.`,
      },
    ],
    ru: [
      {
        q: `Что такое комбинации эмодзи ${topicName.toLowerCase()}?`,
        a: `Комбинации эмодзи ${topicName.toLowerCase()} — это креативные排列 эмодзи, которые передают определенные темы, эмоции или эстетику.`,
      },
      {
        q: `Как использовать комбинации эмодзи ${topicName.toLowerCase()}?`,
        a: `Просто нажмите на любую комбинацию эмодзи ${topicName.toLowerCase()}, чтобы скопировать ее в буфер обмена.`,
      },
      {
        q: `Могу ли я настроить комбинации эмодзи ${topicName.toLowerCase()}?`,
        a: `Да! Вы можете комбинировать несколько комбинаций эмодзи ${topicName.toLowerCase()}, нажимая и удерживая их.`,
      },
    ],
    ar: [
      {
        q: `ما هي مجموعات إيموجي ${topicName.toLowerCase()}؟`,
        a: `مجموعات إيموجي ${topicName.toLowerCase()} هي ترتيبات إبداعية من الإيموجي التي تنقل موضوعات أو مشاعر أو جماليات محددة.`,
      },
      {
        q: `كيف أستخدم مجموعات إيموجي ${topicName.toLowerCase()}؟`,
        a: `ما عليك سوى النقر فوق أي مجموعة إيموجي من ${topicName.toLowerCase()} لنسخها إلى الحافظة.`,
      },
      {
        q: `هل يمكنني تخصيص مجموعات إيموجي ${topicName.toLowerCase()}؟`,
        a: `نعم! يمكنك دمج عدة مجموعات إيموجي من ${topicName.toLowerCase()} بالضغط عليها لفترة طويلة.`,
      },
    ],
  };

  const items = faqData[lang] || faqData.en;

  return items.map((item) => ({
    "@type": "Question" as const,
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: item.a,
    },
  }));
}
