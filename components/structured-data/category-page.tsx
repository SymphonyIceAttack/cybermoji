import type { CollectionPage, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface CategoryStructuredDataProps {
  lang: LanguageType;
  slug: string;
  categoryName: string;
  emojiCount: number;
}

export function CategoryStructuredData({
  lang,
  slug,
  categoryName,
  emojiCount,
}: CategoryStructuredDataProps) {
  const categorySchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} - Cybermoji`,
    description: `Browse and copy ${categoryName.toLowerCase()}. Find the perfect emoji for every moment.`,
    url: `${siteConfig.siteUrl}/${lang}/category/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: emojiCount,
      itemListElement: [],
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(categorySchema),
      }}
    />
  );
}
