"use client";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Info,
  Layers,
  Search,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  EmojiDetailModal,
  EmojiItemWithDetail,
} from "@/components/emoji/emoji-detail-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmojiCopy } from "@/hooks/use-emoji-copy";
import { type EmojibaseEmoji, useEmojibase } from "@/hooks/use-emojibase";
import type { EmojiCategorySlug } from "@/lib/categories";
import { shareEmoji } from "@/lib/share-emoji";
import { topicEmojiData } from "@/lib/topic-emojis";
import type { LanguageType } from "@/lib/translations";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { CategoryAnalysis } from "./category-analysis-ssr";
import { CategoryFAQ } from "./category-faq-ssr";
import { CategoryTech } from "./category-tech-ssr";
import { CategoryUsage } from "./category-usage";

const ITEMS_PER_PAGE = 120;

function getCategoryTranslation(lang: LanguageType, key: string): string {
  const translationsForLang = translations[lang] || translations.en;
  return (
    ((translationsForLang as Record<string, unknown>)[key] as string) || key
  );
}

function getAllCategoryTranslations(
  lang: LanguageType,
): Record<string, string> {
  const translationsForLang = translations[lang] || translations.en;
  const result: Record<string, string> = {};

  // Extract all category-related translations
  const prefix = "category.";
  for (const [key, value] of Object.entries(translationsForLang)) {
    if (key.startsWith(prefix) && typeof value === "string") {
      result[key] = value;
    }
  }

  return result;
}

interface EmojiCategoryBrowserProps {
  lang: LanguageType;
  category: EmojiCategorySlug;
}

export function EmojiCategoryBrowser({
  lang,
  category,
}: EmojiCategoryBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmoji, setSelectedEmoji] = useState<EmojibaseEmoji | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSubgroup, setSelectedSubgroup] = useState<number | null>(null);
  const [featureToggles, setFeatureToggles] = useState<Record<string, boolean>>(
    {
      largeGrid: false,
      showTags: true,
      autoCopy: false,
    },
  );
  const [shareFeedback, setShareFeedback] = useState(false);

  const { emojis, isLoading, search, getByGroup, subgroups } = useEmojibase({
    lang,
  });
  const { copiedEmoji, copyToClipboard } = useEmojiCopy();

  const t = useCallback(
    (key: string) => getCategoryTranslation(lang, key),
    [lang],
  );

  const categoryT = useCallback(
    (key: string) => t(`browser.category.${key}`),
    [t],
  );

  const newT = useCallback((key: string) => t(`category.${key}`), [t]);

  const categoryTranslations = useMemo(
    () => getAllCategoryTranslations(lang),
    [lang],
  );

  const toggleFeature = useCallback((key: string) => {
    setFeatureToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Get related topics based on category
  const relatedTopics = useMemo(() => {
    const categoryTopicMap: Record<string, string[]> = {
      "smileys-emotion": ["heart", "sparkle", "star"],
      "people-body": ["heart", "flower"],
      "animals-nature": ["butterfly", "flower", "cat", "dog"],
      "food-drink": ["berry"],
      "travel-places": ["cloud", "moon", "rainbow"],
      activities: ["music", "star"],
      objects: ["music", "sparkle"],
      symbols: ["heart", "star", "sparkle"],
      flags: ["rainbow"],
      all: ["heart", "star", "flower", "butterfly"],
    };
    const topicSlugs = categoryTopicMap[category] || [];
    return topicEmojiData.filter((t) => topicSlugs.includes(t.slug));
  }, [category]);

  const categoryEmojis = useMemo(() => {
    if (category === "all") {
      return emojis;
    }

    const groupMap: Record<string, number> = {
      "smileys-emotion": 0,
      "people-body": 1,
      "animals-nature": 3,
      "food-drink": 4,
      "travel-places": 5,
      activities: 6,
      objects: 7,
      symbols: 8,
      flags: 9,
    };

    const groupNumber = groupMap[category];
    return getByGroup(groupNumber);
  }, [emojis, category, getByGroup]);

  const filteredEmojis = useMemo(() => {
    let result = categoryEmojis;

    if (selectedSubgroup !== null) {
      result = result.filter((e) => e.subgroup === selectedSubgroup);
    }

    if (!searchQuery.trim()) {
      return result;
    }

    const searchResults = search(searchQuery);
    const categoryHexcodes = new Set(result.map((e) => e.hexcode));
    return searchResults.filter((e) => categoryHexcodes.has(e.hexcode));
  }, [categoryEmojis, searchQuery, search, selectedSubgroup]);

  // Share functionality - 分享整个分类
  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = `${t(`common.category.${category}`)} Emojis - Cybermoji`;
    const text = `Check out ${filteredEmojis.length} ${t(`common.category.${category}`)} emojis!`;

    // 尝试分享分类第一个 emoji 的图片
    let shared = false;
    if (filteredEmojis.length > 0) {
      const firstEmoji = filteredEmojis[0]?.emoji;
      if (firstEmoji) {
        shared = await shareEmoji(firstEmoji, title, text, url);
      }
    }

    if (!shared) {
      await navigator.clipboard.writeText(url);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  }, [category, filteredEmojis.length, t]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredEmojis.length / ITEMS_PER_PAGE);
  }, [filteredEmojis]);

  const paginatedEmojis = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmojis.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmojis, currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.min(Math.max(1, page), totalPages));
    },
    [totalPages],
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleEmojiClick = useCallback(
    (emojiChar: string) => {
      copyToClipboard(emojiChar);
    },
    [copyToClipboard],
  );

  const gridCols = featureToggles.largeGrid
    ? "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
    : "grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12";

  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16 sm:w-20 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>

        {/* Search and Detail toggle skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 flex-1 rounded-xl" />
          <Skeleton className="h-11 w-24 rounded-xl" />
        </div>

        {/* Filter skeleton */}
        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Results info skeleton */}
        <Skeleton className="h-4 w-32" />

        {/* Grid skeleton - responsive columns matching actual grid */}
        <div
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-0.5 sm:gap-1 md:gap-1.5"
          style={{
            contain: "content",
            contentVisibility: "auto",
            containIntrinsicSize: "0 500px",
          }}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-square rounded-sm"
            />
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>

        {/* Info panel skeleton */}
        <div className="space-y-6 pt-6 border-t border-primary/20">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-56 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {newT("relatedTopics")}:
            </span>
            {relatedTopics.slice(0, 4).map((topic) => (
              <Link
                key={topic.slug}
                href={`/${lang}/topic/${topic.slug}`}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Sparkles className="h-3 w-3" />
                {topic.icon} {topic.name}
              </Link>
            ))}
          </div>
        )}

        {/* Feature Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-1"
          >
            <Share2 className="h-3 w-3" />
            {shareFeedback ? "Copied!" : null}
          </Button>
          <Button
            variant={featureToggles.largeGrid ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFeature("largeGrid")}
            className="gap-1"
            data-tooltip={`${newT("toggle.largeGrid")}\n${newT("toggle.largeGrid.desc")}`}
          >
            <Layers className="h-3 w-3" />
          </Button>
          <Button
            variant={featureToggles.showTags ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFeature("showTags")}
            className="gap-1"
            data-tooltip={`${newT("toggle.showTags")}\n${newT("toggle.showTags.desc")}`}
          >
            <Info className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={categoryT("searchPlaceholder")}
            className="input-cyber pl-12 h-12 text-base"
          />
        </div>

        {/* Detail Mode Toggle */}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl border transition-all",
            showDetails
              ? "bg-primary/20 border-primary text-primary"
              : "bg-primary/5 border-primary/30 text-muted-foreground hover:text-foreground",
          )}
        >
          <Info className="h-5 w-5" />
          <span className="text-sm font-medium">{categoryT("details")}</span>
        </button>
      </div>

      {/* Subgroup Filter */}
      <div className="flex items-center gap-2">
        <div className="relative group">
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-mono rounded-lg border transition-all",
              selectedSubgroup !== null
                ? "bg-primary/20 border-primary text-primary"
                : "bg-primary/5 border-primary/30 text-muted-foreground hover:text-foreground",
            )}
          >
            <Filter className="h-4 w-4" />
            {selectedSubgroup !== null
              ? subgroups.find((s) => s.id === selectedSubgroup)?.name ||
                categoryT("filter")
              : categoryT("subgroup")}
            {selectedSubgroup !== null && (
              <X
                className="h-3 w-3 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSubgroup(null);
                }}
              />
            )}
          </button>
          <div className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg p-2 shadow-xl">
              <button
                type="button"
                onClick={() => setSelectedSubgroup(null)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                  selectedSubgroup === null
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-primary/10 text-muted-foreground hover:text-foreground",
                )}
              >
                {categoryT("allSubgroups")}
              </button>
              <div className="border-t border-primary/20 my-1" />
              {subgroups
                .filter((s) => {
                  const subgroupHexcodes = new Set(
                    categoryEmojis
                      .filter((e) => e.subgroup === s.id)
                      .map((e) => e.hexcode),
                  );
                  return subgroupHexcodes.size > 0;
                })
                .map((subgroup) => (
                  <button
                    key={subgroup.id}
                    type="button"
                    onClick={() => setSelectedSubgroup(subgroup.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between",
                      selectedSubgroup === subgroup.id
                        ? "bg-primary/20 text-primary font-medium"
                        : "hover:bg-primary/10 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="truncate">{subgroup.name}</span>
                    <span className="text-xs text-muted-foreground/60">
                      {subgroup.count}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Active subgroup info */}
        {selectedSubgroup !== null && (
          <span className="text-sm text-muted-foreground font-mono">
            {filteredEmojis.length === 1
              ? categoryT("emojiCountOne")
                  .replace("{count}", String(filteredEmojis.length))
                  .replace("{emoji}", "")
              : categoryT("emojiCount")
                  .replace("{count}", String(filteredEmojis.length))
                  .replace("{plural}", "s")
                  .replace("个", "")}
          </span>
        )}
      </div>

      {/* Results Info */}
      {searchQuery.length > 0 && (
        <div className="text-sm text-muted-foreground font-mono">
          {filteredEmojis.length === 1
            ? categoryT("emojiCountOne")
                .replace("{count}", String(filteredEmojis.length))
                .replace("{emoji}", "")
            : categoryT("emojiCount")
                .replace("{count}", String(filteredEmojis.length))
                .replace("{plural}", "s")
                .replace("个", "")}{" "}
          {categoryT("foundFor")} "{searchQuery}"
        </div>
      )}

      {/* Main Content Grid */}
      <div className="space-y-6">
        {/* Emoji Grid */}
        <div
          className={cn("grid gap-0.5 sm:gap-1 md:gap-1.5", gridCols)}
          style={{
            contain: "content",
            contentVisibility: "auto",
            containIntrinsicSize: "0 600px",
          }}
        >
          {paginatedEmojis.map((emoji) => (
            <EmojiItemWithDetail
              key={emoji.hexcode}
              emoji={emoji}
              isCopied={copiedEmoji === emoji.emoji}
              onCopy={handleEmojiClick}
              onShowDetail={setSelectedEmoji}
              showDetails={showDetails}
              lang={lang}
              showTags={featureToggles.showTags}
            />
          ))}
        </div>

        {/* Detail Modal */}
        {selectedEmoji && (
          <EmojiDetailModal
            emoji={selectedEmoji}
            onClose={() => setSelectedEmoji(null)}
            lang={lang}
          />
        )}

        {paginatedEmojis.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground font-mono">
              {searchQuery
                ? `${categoryT("noEmojisFound").replace("{searchQuery}", searchQuery)} "${searchQuery}"`
                : categoryT("noEmojisInCategory")}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-primary/30 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label={categoryT("previousPage")}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-mono text-muted-foreground px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-primary/30 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label={categoryT("nextPage")}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Info Panel Below Emoji Grid */}
        <div className="space-y-6 pt-6 border-t border-primary/20">
          <CategoryAnalysis
            translations={categoryTranslations}
            filteredEmojis={filteredEmojis}
            subgroups={subgroups}
          />

          <CategoryUsage
            translations={categoryTranslations}
            categoryT={categoryT}
            categoryEmojis={categoryEmojis}
            paginatedEmojis={paginatedEmojis}
            categorySlug={category}
          />

          <CategoryTech translations={categoryTranslations} />

          <CategoryFAQ translations={categoryTranslations} />
        </div>
      </div>
    </div>
  );
}
