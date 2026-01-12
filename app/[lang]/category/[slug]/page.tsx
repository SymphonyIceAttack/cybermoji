import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmojiCategoryBrowser } from "@/components/emoji/emoji-category-browser";
import {
  BreadcrumbStructuredData,
  getCategoryBreadcrumb,
} from "@/components/structured-data/breadcrumb";
import { CategoryStructuredData } from "@/components/structured-data/category-page";
import { HowToStructuredData } from "@/components/structured-data/how-to-page";
import {
  emojiCategories,
  getCategoryBySlug,
  isValidCategory,
} from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import {
  emojiCategories as emojiCategoriesWithCount,
  getAllEmojis,
} from "@/lib/emoji-data";
import { createTranslator, supportedLocales } from "@/lib/translations";
import {
  generateHreflangLinks,
  type LanguageType,
} from "@/lib/translations/hreflang";

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

  const categoryDescription = t("category.browseAndCopy").replace(
    "{categoryName}",
    categoryName.toLowerCase(),
  );

  const hreflangLinks = generateHreflangLinks(`/category/${slug}`);

  return {
    title: `${categoryName} - Cybermoji`,
    description: categoryDescription,
    openGraph: {
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      title: `${categoryName} - Cybermoji`,
      description: categoryDescription,
      siteName: siteConfig.siteName,
      url: `${siteConfig.siteUrl}/${lang}/category/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} - Cybermoji`,
      description: categoryDescription,
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

  // 获取emojis数据用于结构化数据
  let allEmojis: Awaited<ReturnType<typeof getAllEmojis>> = [];
  try {
    allEmojis = await getAllEmojis(lang);
  } catch {
    // 如果加载失败，使用空数组
    allEmojis = [];
  }

  // 根据category过滤emojis
  const categoryInfo = emojiCategoriesWithCount.find((c) => c.id === slug);
  const filteredEmojis =
    slug === "all"
      ? allEmojis
      : allEmojis.filter((emoji) => emoji.group === categoryInfo?.name);

  return (
    <>
      <BreadcrumbStructuredData
        items={getCategoryBreadcrumb(lang, slug, categoryName)}
      />
      <CategoryStructuredData
        lang={lang}
        slug={slug}
        categoryName={categoryName}
        emojiCount={
          category?.id === "all"
            ? emojiCategoriesWithCount.reduce(
                (sum, cat) => sum + (cat.emojiCount || 0),
                0,
              )
            : emojiCategoriesWithCount.find((cat) => cat.id === slug)
                ?.emojiCount || 0
        }
        emojis={filteredEmojis}
      />
      <HowToStructuredData
        lang={lang}
        pageType="category"
        categorySlug={slug}
      />
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
    </>
  );
}
