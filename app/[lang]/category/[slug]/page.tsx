import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmojiCategoryBrowser } from "@/components/emoji/emoji-category-browser";
import {
  emojiCategories,
  getCategoryBySlug,
  isValidCategory,
} from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales, translations } from "@/lib/translations";

export async function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = [];

  for (const lang of supportedLocales) {
    for (const category of emojiCategories) {
      params.push({ lang, slug: category.id });
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

  if (!isValidCategory(slug)) {
    return {
      title: "Category Not Found - Cybermoji",
    };
  }

  const category = getCategoryBySlug(slug);
  const t = (key: string): string => {
    const langTranslations =
      translations[lang as keyof typeof translations] || translations.en;
    if (!langTranslations) return key;

    // First, check if the key exists directly (flat structure)
    if (key in langTranslations) {
      const value = (langTranslations as Record<string, unknown>)[key];
      if (typeof value === "string") {
        return value;
      }
    }

    // Fall back to nested object lookup
    const keys = key.split(".");
    let value: unknown = langTranslations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  const categoryName =
    category?.id === "all"
      ? t("common.category.all")
      : t(`common.category.${slug}`);

  return {
    title: `${categoryName} - Cybermoji`,
    description: `Browse and copy ${categoryName.toLowerCase()}. Find the perfect emoji for every moment.`,
    openGraph: {
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      title: `${categoryName} - Cybermoji`,
      description: `Browse and copy ${categoryName.toLowerCase()}.`,
      siteName: siteConfig.siteName,
      url: `${siteConfig.siteUrl}/${lang}/category/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} - Cybermoji`,
      description: `Browse and copy ${categoryName.toLowerCase()}.`,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/category/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: LanguageType; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isValidCategory(slug)) {
    notFound();
  }

  const category = getCategoryBySlug(slug);
  const t = (key: string): string => {
    const langTranslations =
      translations[lang as keyof typeof translations] || translations.en;
    if (!langTranslations) return key;

    // First, check if the key exists directly (flat structure)
    if (key in langTranslations) {
      const value = (langTranslations as Record<string, unknown>)[key];
      if (typeof value === "string") {
        return value;
      }
    }

    // Fall back to nested object lookup
    const keys = key.split(".");
    let value: unknown = langTranslations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  const categoryName =
    category?.id === "all"
      ? t("common.category.all")
      : t(`common.category.${slug}`);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{category?.icon || "📁"}</span>
          <h1 className="text-3xl font-display font-bold capitalize">
            {categoryName}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {t("category.browseAndCopy").replace(
            "{categoryName}",
            categoryName.toLowerCase(),
          )}
        </p>
      </div>

      <EmojiCategoryBrowser lang={lang} category={slug} />
    </div>
  );
}
