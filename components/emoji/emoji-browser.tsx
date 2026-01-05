"use client";

import { useState, useCallback, useMemo } from "react";
import { useEmojibase } from "@/hooks/use-emojibase";
import { useEmojiCopy, useFavorites } from "@/hooks/use-emoji-copy";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { LanguageType } from "@/lib/translations";

const ITEMS_PER_PAGE = 120;

interface EmojiBrowserProps {
  lang: LanguageType;
}

export function EmojiBrowser({ lang }: EmojiBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { emojis, isLoading, search } = useEmojibase({ lang });
  const { copiedEmoji, copyToClipboard } = useEmojiCopy();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const filteredEmojis = useMemo(() => {
    if (activeTab === "all") {
      return searchQuery ? search(searchQuery) : emojis;
    }
    if (activeTab === "favorites") {
      const favIds = new Set(favorites.map((f) => f.id));
      const filtered = emojis.filter((e) => favIds.has(e.hexcode));
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
      return emojis.slice(0, 60);
    }
    if (activeTab === "recent") {
      return emojis.slice(0, 48);
    }
    return emojis;
  }, [activeTab, searchQuery, emojis, search, favorites]);

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, emojiChar: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        copyToClipboard(emojiChar);
      }
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
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 h-10 bg-card/50 border border-primary/20">
          <TabsTrigger value="all" className="gap-2">
            All
          </TabsTrigger>
          <TabsTrigger value="favorites" className="gap-2">
            <Star className="h-4 w-4" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="trending" className="gap-2">
            Trending
          </TabsTrigger>
          <TabsTrigger value="recent" className="gap-2">
            Recent
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search emojis..."
          className="input-cyber pl-12 h-12 text-base"
        />
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
          <EmojiItem
            key={emoji.hexcode}
            emoji={emoji}
            isCopied={copiedEmoji === emoji.emoji}
            isFav={isFavorite(emoji.hexcode)}
            onCopy={handleEmojiClick}
            onKeyDown={handleKeyDown}
            onToggleFavorite={() =>
              toggleFavorite({
                id: emoji.hexcode,
                char: emoji.emoji,
                name: emoji.label,
              })
            }
          />
        ))}
      </div>

      {paginatedEmojis.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground font-mono">
            {activeTab === "favorites"
              ? "No favorites yet"
              : `No emojis found for "${searchQuery}"`}
          </p>
          {activeTab === "favorites" && (
            <p className="text-sm text-muted-foreground mt-2">
              Click the star on any emoji to save it here
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

interface EmojiItemProps {
  emoji: {
    emoji: string;
    hexcode: string;
    label: string;
    tags?: string[];
  };
  isCopied: boolean;
  isFav: boolean;
  onCopy: (emojiChar: string) => void;
  onKeyDown: (e: React.KeyboardEvent, emojiChar: string) => void;
  onToggleFavorite: () => void;
}

function EmojiItem({
  emoji,
  isCopied,
  isFav,
  onCopy,
  onKeyDown,
  onToggleFavorite,
}: EmojiItemProps) {
  return (
    <div
      className="group relative flex flex-col items-center p-1 sm:p-2 rounded-lg hover:bg-primary/5 transition-all cursor-pointer h-16"
      onClick={() => onCopy(emoji.emoji)}
      onKeyDown={(e) => onKeyDown(e, emoji.emoji)}
      role="button"
      tabIndex={0}
      aria-label={`${emoji.label}, copy to clipboard`}
    >
      {/* Emoji */}
      <button
        type="button"
        className="text-2xl sm:text-3xl hover:scale-125 transition-transform duration-200 select-none"
        onClick={() => onCopy(emoji.emoji)}
      >
        {emoji.emoji}
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-primary/30 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {emoji.label}
      </div>

      {/* Copied feedback */}
      {isCopied && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/20 rounded-lg">
          <Check className="h-4 w-4 text-primary" />
        </div>
      )}

      {/* Favorite button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-0 right-0 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          className={`h-3 w-3 ${
            isFav ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          }`}
        />
      </button>
    </div>
  );
}
