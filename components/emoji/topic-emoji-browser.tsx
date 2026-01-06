"use client";

import { Copy, Info, Search, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEmojiCopy } from "@/hooks/use-emoji-copy";
import type { TopicEmojiData } from "@/lib/topic-emojis";
import type { LanguageType } from "@/lib/translations";

interface TopicEmojiBrowserProps {
  topic: TopicEmojiData;
  lang?: LanguageType;
}

const LONG_PRESS_DURATION = 500;

export function TopicEmojiBrowser({
  topic,
  lang = "en",
}: TopicEmojiBrowserProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCount, setCopiedCount] = useState(0);
  const [isCopiedVisible, setIsCopiedVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { copyToClipboard } = useEmojiCopy();

  const handleCopy = useCallback(
    async (emoji: string[], combinationId: string) => {
      const emojiString = emoji.join("");
      await copyToClipboard(emojiString);
      setCopiedId(combinationId);
      setCopiedCount((prev: number) => prev + 1);
      setIsCopiedVisible(true);
    },
    [copyToClipboard],
  );

  useEffect(() => {
    if (isCopiedVisible) {
      const timer = setTimeout(() => {
        setIsCopiedVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopiedVisible]);

  const handleMouseDown = useCallback((comboId: string) => {
    longPressTimerRef.current = setTimeout(() => {
      setIsSelectionMode(true);
      setSelectedIds((prev) => {
        if (prev.includes(comboId)) return prev;
        return [...prev, comboId];
      });
    }, LONG_PRESS_DURATION);
  }, []);

  const handleMouseUp = useCallback(
    (emoji: string[], comboId: string) => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      if (isSelectionMode) {
        setSelectedIds((prev) => {
          const index = prev.indexOf(comboId);
          if (index > -1) {
            const newArray = [...prev];
            newArray.splice(index, 1);
            return newArray;
          }
          return [...prev, comboId];
        });
      } else {
        handleCopy(emoji, comboId);
      }
    },
    [isSelectionMode, handleCopy],
  );

  const handleMouseLeave = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleCopySelected = useCallback(async () => {
    const selectedCombinations = topic.combinations.filter((combo) =>
      selectedIds.includes(combo.id),
    );
    const emojiStrings = selectedCombinations.map((combo) =>
      combo.emoji.join(""),
    );
    const combinedEmoji = emojiStrings.join(" ");
    await copyToClipboard(combinedEmoji);
    setCopiedCount((prev) => prev + selectedCombinations.length);
    setIsCopiedVisible(true);
    setSelectedIds([]);
    setIsSelectionMode(false);
  }, [selectedIds, topic.combinations, copyToClipboard]);

  const filteredCombinations = topic.combinations.filter((combo) => {
    if (!searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      combo.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      combo.emoji.some((e) => e.includes(searchLower))
    );
  });

  const primaryEmojiString = topic.primaryEmojis.join(" ");

  return (
    <div className="w-full space-y-8">
      {/* Copy indicator */}
      {isCopiedVisible && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg">
            <Copy className="h-4 w-4" />
            <span className="text-sm font-medium">Copied! ({copiedCount})</span>
          </div>
        </div>
      )}

      {/* Selection mode bar */}
      {isSelectionMode && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 fade-in">
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-lg max-w-[90vw] overflow-hidden">
            {/* Selected emoji preview */}
            <div className="flex items-center gap-1 max-w-[200px] overflow-hidden">
              {selectedIds.slice(0, 5).map((id) => {
                const combo = topic.combinations.find((c) => c.id === id);
                return combo ? (
                  <span key={id} className="text-lg shrink-0">
                    {combo.emoji.join("")}
                  </span>
                ) : null;
              })}
              {selectedIds.length > 5 && (
                <span className="text-xs shrink-0">
                  +{selectedIds.length - 5}
                </span>
              )}
            </div>
            <span className="text-sm font-medium shrink-0">
              {selectedIds.length} selected
            </span>
            <button
              type="button"
              onClick={handleCopySelected}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-foreground text-primary rounded-full text-sm font-medium hover:bg-primary-foreground/90 transition-colors shrink-0"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedIds([]);
                setIsSelectionMode(false);
              }}
              className="p-1.5 hover:bg-primary-foreground/20 rounded-full transition-colors shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Primary emojis */}
      <div className="text-center py-6">
        <div className="text-6xl sm:text-8xl mb-4">{primaryEmojiString}</div>
        <p className="text-sm text-muted-foreground">
          {topic.primaryEmojis.length} primary emoji
          {topic.primaryEmojis.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search and controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search combinations..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>Tap to copy</span>
          <span className="hidden sm:inline">
            · Long-press to select multiple
          </span>
        </div>
      </div>

      {/* Combinations count */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {filteredCombinations.length} combination
          {filteredCombinations.length !== 1 ? "s" : ""}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Emoji combinations grid */}
      <div className="grid gap-3 pb-20">
        {filteredCombinations.map((combo) => {
          const emojiString = combo.emoji.join("");
          const isCopied = copiedId === combo.id;
          const isSelected = selectedIds.includes(combo.id);

          return (
            <button
              key={combo.id}
              type="button"
              onMouseDown={() => handleMouseDown(combo.id)}
              onMouseUp={() => handleMouseUp(combo.emoji, combo.id)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleMouseDown(combo.id)}
              onTouchEnd={() => handleMouseUp(combo.emoji, combo.id)}
              className={`group relative p-4 rounded-xl border transition-all duration-200 text-left ${
                isSelected
                  ? "bg-primary/30 border-primary ring-2 ring-primary/50"
                  : isCopied
                    ? "bg-primary/20 border-primary"
                    : "bg-background hover:bg-primary/5 border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-2xl sm:text-3xl tracking-wide">
                    {emojiString}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {combo.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Popularity indicator */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    <span>{combo.popularity}%</span>
                  </div>

                  {/* Copy icon */}
                  <div
                    className={`p-2 rounded-lg transition-all ${
                      isCopied
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredCombinations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-muted-foreground">
            No combinations found for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Related topics */}
      {topic.relatedTopics.length > 0 && (
        <div className="pt-8 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Related Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map((related) => (
              <a
                key={related}
                href={`/${lang}/topic/${related}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-foreground text-sm transition-colors capitalize"
              >
                <Sparkles className="h-3 w-3" />
                {related}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
