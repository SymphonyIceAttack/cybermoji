"use client";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Info,
  Search,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  EmojiDetailModal,
  EmojiItemWithDetail,
} from "@/components/emoji/emoji-detail-modal";
import { Input } from "@/components/ui/input";
import { useEmojiCopy } from "@/hooks/use-emoji-copy";
import { type EmojibaseEmoji, useEmojibase } from "@/hooks/use-emojibase";
import type { EmojiCategorySlug } from "@/lib/categories";
import type { LanguageType } from "@/lib/translations";

const ITEMS_PER_PAGE = 120;

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
  const { emojis, isLoading, search, getByGroup, subgroups } = useEmojibase({
    lang,
  });
  const { copiedEmoji, copyToClipboard } = useEmojiCopy();

  const categoryEmojis = useMemo(() => {
    if (category === "all") {
      return emojis;
    }

    const groupMap: Record<string, number> = {
      "smileys-emotion": 0,
      "people-body": 1,
      "animals-nature": 2,
      "food-drink": 3,
      "travel-places": 4,
      activities: 5,
      objects: 6,
      symbols: 7,
      flags: 8,
    };

    const groupNumber = groupMap[category];
    return getByGroup(groupNumber);
  }, [emojis, category, getByGroup]);

  const filteredEmojis = useMemo(() => {
    let result = categoryEmojis;

    // Filter by subgroup within category
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
    },
    [copyToClipboard],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search in this category..."
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
          <span className="text-sm font-medium">Details</span>
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
                "Filter"
              : "Subgroup"}
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
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  selectedSubgroup === null
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                All Subgroups
              </button>
              <div className="border-t border-primary/20 my-1" />
              {subgroups
                .filter((s) => {
                  // Only show subgroups that exist in this category
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
            {filteredEmojis.length} emoji
            {filteredEmojis.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Results Info */}
      {searchQuery.length > 0 && (
        <div className="text-sm text-muted-foreground font-mono">
          {filteredEmojis.length} emoji{filteredEmojis.length !== 1 ? "s" : ""}{" "}
          found for "{searchQuery}"
        </div>
      )}

      {/* Emoji Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1 sm:gap-2">
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
            {searchQuery
              ? `No emojis found for "${searchQuery}" in this category`
              : "No emojis in this category"}
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
            aria-label="Previous page"
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
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
