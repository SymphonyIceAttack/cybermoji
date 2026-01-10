import type { BreadcrumbList, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({
  items,
}: BreadcrumbStructuredDataProps) {
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("https")
        ? item.url
        : `${siteConfig.siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}

export function getHomeBreadcrumb(lang: LanguageType): BreadcrumbItem {
  return {
    name: "Cybermoji",
    url: `/${lang}`,
  };
}

export function getCategoryBreadcrumb(
  lang: LanguageType,
  slug: string,
  categoryName: string,
): BreadcrumbItem[] {
  return [
    getHomeBreadcrumb(lang),
    {
      name: categoryName,
      url: `/${lang}/category/${slug}`,
    },
  ];
}

export function getTopicBreadcrumb(
  lang: LanguageType,
  slug: string,
  topicName: string,
): BreadcrumbItem[] {
  return [
    getHomeBreadcrumb(lang),
    {
      name: topicName,
      url: `/${lang}/topic/${slug}`,
    },
  ];
}

export function getTopicIndexBreadcrumb(lang: LanguageType): BreadcrumbItem[] {
  return [
    getHomeBreadcrumb(lang),
    {
      name: "Topics",
      url: `/${lang}/topic`,
    },
  ];
}

export function getAboutBreadcrumb(lang: LanguageType): BreadcrumbItem[] {
  return [
    getHomeBreadcrumb(lang),
    {
      name: "About",
      url: `/${lang}/about`,
    },
  ];
}

export function getContactBreadcrumb(lang: LanguageType): BreadcrumbItem[] {
  return [
    getHomeBreadcrumb(lang),
    {
      name: "Contact",
      url: `/${lang}/contact`,
    },
  ];
}

export function getPrivacyBreadcrumb(lang: LanguageType): BreadcrumbItem[] {
  return [
    getHomeBreadcrumb(lang),
    {
      name: "Privacy Policy",
      url: `/${lang}/privacy`,
    },
  ];
}

export function getTermsBreadcrumb(lang: LanguageType): BreadcrumbItem[] {
  return [
    getHomeBreadcrumb(lang),
    {
      name: "Terms of Service",
      url: `/${lang}/terms`,
    },
  ];
}

export function getDisclaimerBreadcrumb(lang: LanguageType): BreadcrumbItem[] {
  return [
    getHomeBreadcrumb(lang),
    {
      name: "Disclaimer",
      url: `/${lang}/disclaimer`,
    },
  ];
}
