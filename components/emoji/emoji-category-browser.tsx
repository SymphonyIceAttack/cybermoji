"use client";

import {
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Cpu,
  Filter,
  Globe,
  Info,
  Layers,
  Lightbulb,
  Lock,
  Menu,
  Monitor,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  TrendingUp,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EmojiDetailModal,
  EmojiItemWithDetail,
} from "@/components/emoji/emoji-detail-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEmojiCopy } from "@/hooks/use-emoji-copy";
import { type EmojibaseEmoji, useEmojibase } from "@/hooks/use-emojibase";
import type { EmojiCategorySlug } from "@/lib/categories";
import type { LanguageType, TranslationsType } from "@/lib/translations";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 120;

function getCategoryTranslation(lang: LanguageType, key: string): string {
  const translationsForLang =
    translations[lang as keyof TranslationsType] || translations.en;
  return (
    ((translationsForLang as Record<string, unknown>)[key] as string) || key
  );
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
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [exampleCopied, setExampleCopied] = useState<string | null>(null);
  const [featureToggles, setFeatureToggles] = useState<Record<string, boolean>>(
    {
      largeGrid: false,
      showTags: true,
      animations: true,
      autoCopy: false,
    },
  );

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

  const toggleFeature = useCallback((key: string) => {
    setFeatureToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

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
      setExampleCopied(emojiChar);
    },
    [copyToClipboard],
  );

  // Clear exampleCopied state after delay
  useEffect(() => {
    if (exampleCopied) {
      const timer = setTimeout(() => setExampleCopied(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [exampleCopied]);

  // Smart example tab state
  const [activeExampleTab, setActiveExampleTab] = useState("social");

  // Smart emoji suggestions based on context
  const getSmartEmojis = useCallback(
    (tab: string): Array<{ emoji: string; label: string; context: string }> => {
      const baseEmojis =
        paginatedEmojis.length > 0 ? paginatedEmojis : categoryEmojis;

      const suggestions: Record<
        string,
        Array<{ emoji: string; label: string; context: string }>
      > = {
        social: baseEmojis.slice(0, 8).map((e) => ({
          emoji: e.emoji,
          label: e.label || "Social",
          context: "Great for posts & comments",
        })),
        messaging: baseEmojis.slice(8, 16).map((e) => ({
          emoji: e.emoji,
          label: e.label || "Chat",
          context: "Perfect for conversations",
        })),
        professional: baseEmojis.slice(16, 24).map((e) => ({
          emoji: e.emoji,
          label: e.label || "Work",
          context: "Professional communication",
        })),
        trending: baseEmojis.slice(0, 8).map((e) => ({
          emoji: e.emoji,
          label: e.label || "Hot",
          context: "Currently trending",
        })),
      };

      return suggestions[tab] || suggestions.social;
    },
    [paginatedEmojis, categoryEmojis],
  );

  const gridCols = featureToggles.largeGrid
    ? "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
    : "grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInfoPanel(!showInfoPanel)}
          className="gap-2"
        >
          {showInfoPanel ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
          {showInfoPanel ? "Hide Info" : "Show Info"}
        </Button>

        {/* Feature Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
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
          <Button
            variant={featureToggles.animations ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFeature("animations")}
            className="gap-1"
            data-tooltip={`${newT("toggle.animations")}\n${newT("toggle.animations.desc")}`}
          >
            <Sparkles className="h-3 w-3" />
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
        <div className={cn("grid gap-1 sm:gap-2", gridCols)}>
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
        {showInfoPanel && (
          <div className="space-y-6 pt-6 border-t border-primary/20">
            {/* Analysis Report */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {newT("analysis.title")}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    {newT("analysis.subtitle")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary">
                      {filteredEmojis.length}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {newT("analysis.totalEmojis")}
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary">
                      {subgroups.length}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {newT("analysis.subgroups")}
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary">92%</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {newT("analysis.popularityScore")}
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary">1.2K</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {newT("analysis.dailyViews")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Row 1: Usage Examples - Full Width with Smart Tabs */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    {newT("examples.title")}
                  </CardTitle>
                  <div className="flex gap-1">
                    {[
                      {
                        key: "social",
                        icon: Globe,
                        label: newT("examples.social.title"),
                      },
                      {
                        key: "messaging",
                        icon: Smartphone,
                        label: newT("examples.messaging.title"),
                      },
                      {
                        key: "professional",
                        icon: Briefcase,
                        label: newT("examples.professional.title"),
                      },
                      { key: "trending", icon: TrendingUp, label: "Trending" },
                    ].map(({ key, icon: Icon, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveExampleTab(key)}
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition-all ${
                          activeExampleTab === key
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Smart Example Content */}
                <div className="space-y-4">
                  {/* Context-aware example phrases */}
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {activeExampleTab === "social" &&
                          newT("examples.social.desc")}
                        {activeExampleTab === "messaging" &&
                          newT("examples.messaging.desc")}
                        {activeExampleTab === "professional" &&
                          newT("examples.professional.desc")}
                        {activeExampleTab === "trending" &&
                          "Popular combinations this week"}
                      </span>
                    </div>

                    {/* Smart emoji combinations with context */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {getSmartEmojis(activeExampleTab).map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleEmojiClick(item.emoji)}
                          className={`group relative flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/20 transition-all text-left ${
                            exampleCopied === item.emoji ? "copied" : ""
                          }`}
                        >
                          <span className="text-3xl">{item.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {item.label}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {item.context}
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 group-[.copied]:opacity-100 transition-opacity rounded-lg">
                            <span className="text-xs font-medium">
                              {exampleCopied === item.emoji ? "Copied!" : ""}
                            </span>
                          </div>
                          <div
                            className={`absolute inset-0 flex items-center justify-center bg-primary/20 rounded-lg transition-opacity duration-200 ${
                              exampleCopied === item.emoji
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                            }`}
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick copy all */}
                  <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                    <span className="text-sm text-muted-foreground">
                      {categoryT("clickToCopyHint")}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const allEmojis = getSmartEmojis(activeExampleTab)
                          .map((item) => item.emoji)
                          .join(" ");
                        copyToClipboard(allEmojis);
                      }}
                      className="gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      {categoryT("copyAll")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Row 2: Usage Boundaries + Pain Points + Technical Implementation - Each in own row */}
            <div className="space-y-6">
              {/* Usage Boundaries */}
              <Card className="bg-red-500/5 border-red-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-red-500">
                    <Shield className="h-5 w-5" />
                    {newT("usage.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">
                        {newT("usage.platform.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {newT("usage.platform.desc")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">
                        {newT("usage.zwj.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {newT("usage.zwj.desc")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pain Points Solved */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    {newT("painPoints.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">
                        {newT("painPoints.findFast.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {newT("painPoints.findFast.desc")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">
                        {newT("painPoints.crossPlatform.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {newT("painPoints.crossPlatform.desc")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">
                        {newT("painPoints.privacy.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {newT("painPoints.privacy.desc")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Implementation */}
              <Card className="bg-blue-500/5 border-blue-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-500">
                    <Cpu className="h-5 w-5" />
                    {newT("tech.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">
                        {newT("tech.performance.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {newT("tech.performance.desc")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">
                        {newT("tech.typing.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {newT("tech.typing.desc")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">
                        {newT("tech.i18n.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {newT("tech.i18n.desc")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section - Default Expanded */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  {newT("faq.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion
                  type="multiple"
                  defaultValue={["item-1", "item-2", "item-3", "item-4"]}
                >
                  <AccordionItem value="item-1" className="border-primary/20">
                    <AccordionTrigger className="text-sm py-3">
                      {newT("faq.q1")}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {newT("faq.a1")}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-primary/20">
                    <AccordionTrigger className="text-sm py-3">
                      {newT("faq.q3")}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {newT("faq.a3")}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-primary/20">
                    <AccordionTrigger className="text-sm py-3">
                      {newT("faq.q5")}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {newT("faq.a5")}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border-primary/20">
                    <AccordionTrigger className="text-sm py-3">
                      {newT("faq.q7")}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {newT("faq.a7")}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
