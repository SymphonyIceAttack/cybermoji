"use client";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Info,
  Link2,
  Search,
  Star,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EmojiDetailModal,
  EmojiItemWithDetail,
} from "@/components/emoji/emoji-detail-modal";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmojiCopy, useFavorites } from "@/hooks/use-emoji-copy";
import {
  type EmojibaseEmoji,
  isCombinationEmoji,
  useEmojibase,
} from "@/hooks/use-emojibase";
import type { LanguageType } from "@/lib/translations";

// Responsive items per page based on viewport
function getItemsPerPage(width: number): number {
  // Mobile: 60, Tablet: 90, Desktop: 120
  return width < 640 ? 60 : width < 1024 ? 90 : 120;
}

interface EmojiBrowserProps {
  lang: LanguageType;
  translations?: Record<string, string>;
}

export function EmojiBrowser({ lang, translations = {} }: EmojiBrowserProps) {
  const t = useCallback(
    (key: string): string => {
      return translations[key] || key;
    },
    [translations],
  );
  const browserT = useCallback((key: string) => t(`browser.${key}`), [t]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmoji, setSelectedEmoji] = useState<EmojibaseEmoji | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSubgroup, setSelectedSubgroup] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1200); // Default to desktop
  const { emojis, subgroups, isLoading, search } = useEmojibase({ lang });
  const { copiedEmoji, copyToClipboard } = useEmojiCopy();
  const { favorites } = useFavorites();

  // Update viewport width on client side
  useEffect(() => {
    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // Responsive items per page
  const itemsPerPage = useMemo(
    () => getItemsPerPage(viewportWidth),
    [viewportWidth],
  );

  const filteredEmojis = useMemo(() => {
    let result = emojis;

    // Filter by subgroup first
    if (selectedSubgroup !== null) {
      result = result.filter((e) => e.subgroup === selectedSubgroup);
    }

    if (activeTab === "all") {
      return searchQuery ? search(searchQuery) : result;
    }
    if (activeTab === "favorites") {
      const favIds = new Set(favorites.map((f) => f.id));
      const filtered = result.filter((e) => favIds.has(e.hexcode));
      return searchQuery
        ? filtered.filter((e) =>
            searchQuery
              .toLowerCase()
              .split(" ")
              .some(
                (word) =>
                  e.label.toLowerCase().includes(word) ||
                  e.tags?.some((t) => t.toLowerCase().includes(word)),
              ),
          )
        : filtered;
    }
    if (activeTab === "trending") {
      return result.slice(0, 60);
    }
    if (activeTab === "recent") {
      return result.slice(0, 48);
    }
    if (activeTab === "combinations") {
      const comboEmojis = result.filter((e) => isCombinationEmoji(e));
      return searchQuery
        ? comboEmojis.filter((e) =>
            searchQuery
              .toLowerCase()
              .split(" ")
              .some(
                (word) =>
                  e.label.toLowerCase().includes(word) ||
                  e.tags?.some((t) => t.toLowerCase().includes(word)),
              ),
          )
        : comboEmojis;
    }
    return result;
  }, [activeTab, searchQuery, emojis, search, favorites, selectedSubgroup]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredEmojis.length / itemsPerPage);
  }, [filteredEmojis, itemsPerPage]);

  const paginatedEmojis = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEmojis.slice(start, start + itemsPerPage);
  }, [filteredEmojis, currentPage, itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.min(Math.max(1, page), totalPages));
    },
    [totalPages],
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    if (query) {
      setActiveTab("all");
    }
  }, []);

  const handleEmojiClick = useCallback(
    (emojiChar: string) => {
      copyToClipboard(emojiChar);
    },
    [copyToClipboard],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 h-10 bg-card/50 border border-primary/20">
          <TabsTrigger value="all" className="gap-2">
            {browserT("all")}
          </TabsTrigger>
          <TabsTrigger value="favorites" className="gap-2">
            <Star className="h-4 w-4" />
            {browserT("favorites")}
          </TabsTrigger>
          <TabsTrigger value="trending" className="gap-2">
            {browserT("trending")}
          </TabsTrigger>
          <TabsTrigger value="recent" className="gap-2">
            {browserT("recent")}
          </TabsTrigger>
          <TabsTrigger value="combinations" className="gap-2">
            <Link2 className="h-4 w-4" />
            {browserT("combinations")}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={browserT("searchPlaceholder")}
            className="input-cyber pl-12 h-12 text-base"
          />
        </div>

        {/* Detail Mode Toggle */}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
            showDetails
              ? "bg-primary/20 border-primary text-primary"
              : "bg-primary/5 border-primary/30 text-muted-foreground hover:text-foreground"
          }`}
        >
          <Info className="h-5 w-5" />
          <span className="text-sm font-medium">{browserT("details")}</span>
        </button>
      </div>

      {/* Subgroup Filter */}
      <div className="flex items-center gap-2">
        <div className="relative group">
          <button
            type="button"
            className={`flex items-center gap-2 px-3 py-2 text-sm font-mono rounded-lg border transition-all ${
              selectedSubgroup !== null
                ? "bg-primary/20 border-primary text-primary"
                : "bg-primary/5 border-primary/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="h-4 w-4" />
            {selectedSubgroup !== null
              ? subgroups.find((s) => s.id === selectedSubgroup)?.name ||
                browserT("subgroup")
              : browserT("subgroup")}
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
          <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg p-2 shadow-xl">
              <button
                type="button"
                onClick={() => setSelectedSubgroup(null)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  selectedSubgroup === null
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                {browserT("allSubgroups")}
              </button>
              <div className="border-t border-primary/20 my-1" />
              {subgroups.map((subgroup) => (
                <button
                  key={subgroup.id}
                  type="button"
                  onClick={() => setSelectedSubgroup(subgroup.id)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between ${
                    selectedSubgroup === subgroup.id
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                  }`}
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
            {filteredEmojis.length}{" "}
            {filteredEmojis.length === 1
              ? browserT("emojiCount")
                  .replace("{count}", "")
                  .replace("{plural}", "")
              : browserT("emojiCount")
                  .replace("{count}", "")
                  .replace("{plural}", "s")}
          </span>
        )}
      </div>

      {/* Results Info */}
      {searchQuery.length > 0 && (
        <div className="text-sm text-muted-foreground font-mono">
          {filteredEmojis.length}{" "}
          {filteredEmojis.length === 1
            ? browserT("emojiCount")
                .replace("{count}", "")
                .replace("{plural}", "")
            : browserT("emojiCount")
                .replace("{count}", "")
                .replace("{plural}", "s")}{" "}
          {browserT("foundFor")} "{searchQuery}"
        </div>
      )}

      {/* Emoji Grid - Optimized for mobile with responsive columns */}
      <div
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-0.5 sm:gap-1 md:gap-1.5"
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
            {activeTab === "favorites"
              ? browserT("noFavorites")
              : `${browserT("noEmojisFound")} "${searchQuery}"`}
          </p>
          {activeTab === "favorites" && (
            <p className="text-sm text-muted-foreground mt-2">
              {browserT("addFavoriteHint")}
            </p>
          )}
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
            aria-label={browserT("previousPage")}
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
            aria-label={browserT("nextPage")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
