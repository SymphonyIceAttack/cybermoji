import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmojiCategoryBrowser } from "@/components/emoji/emoji-category-browser";
import {
  emojiCategories,
  getCategoryBySlug,
  isValidCategory,
} from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import { supportedLocales } from "@/lib/translations";
import {
  generateHreflangLinks,
  type LanguageType,
} from "@/lib/translations/hreflang";
import { createTranslator } from "@/lib/translations";

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
  const { t } = createTranslator(lang);
  const categoryName =
    category?.id === "all"
      ? t("common.category.all")
      : t(`common.category.${slug}`);

  const hreflangLinks = generateHreflangLinks(`/category/${slug}`);

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
      languages: hreflangLinks,
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
  const { t } = createTranslator(lang);
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
