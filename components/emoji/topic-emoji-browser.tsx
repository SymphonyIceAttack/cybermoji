"use client";

import {
  Check,
  Copy,
  Info,
  Plus,
  Search,
  Share2,
  Shuffle,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEmojiCopy } from "@/hooks/use-emoji-copy";
import { shareEmoji } from "@/lib/share-emoji";
import type { TopicEmojiData } from "@/lib/topic-emojis";
import type { LanguageType, TranslationsType } from "@/lib/translations";
import { translations } from "@/lib/translations";

interface TopicEmojiBrowserProps {
  topic: TopicEmojiData;
  lang?: LanguageType;
}

function getTopicTranslation(lang: LanguageType, key: string): string {
  const translationsForLang =
    translations[lang as keyof TranslationsType] || translations.en;
  return (
    ((translationsForLang as Record<string, unknown>)[key] as string) || key
  );
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
  const [showGenerator, setShowGenerator] = useState(true);
  const [generatorEmojis, setGeneratorEmojis] = useState<string[]>([]);
  const [generatorResult, setGeneratorResult] = useState("");
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { copyToClipboard } = useEmojiCopy();

  const t = useCallback(
    (key: string) => getTopicTranslation(lang, key),
    [lang],
  );

  const topicT = useCallback((key: string) => t(`topic.${key}`), [t]);
  const topicBrowserT = useCallback(
    (key: string) => t(`topicBrowser.${key}`),
    [t],
  );

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

  // Generator functions
  const addToGenerator = useCallback(
    (emoji: string) => {
      if (generatorEmojis.length >= 10) return;
      setGeneratorEmojis((prev) => [...prev, emoji]);
    },
    [generatorEmojis.length],
  );

  const removeFromGenerator = useCallback((index: number) => {
    setGeneratorEmojis((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const shuffleGenerator = useCallback(() => {
    setGeneratorEmojis((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const generateResult = useCallback(() => {
    setGeneratorResult(generatorEmojis.join(""));
  }, [generatorEmojis]);

  const copyGeneratorResult = useCallback(async () => {
    if (generatorResult) {
      await copyToClipboard(generatorResult);
      setCopiedCount((prev) => prev + 1);
      setIsCopiedVisible(true);
    }
  }, [generatorResult, copyToClipboard]);

  const handleShare = useCallback(
    async (emojiString: string) => {
      const url = typeof window !== "undefined" ? window.location.href : "";
      const title = `${topic.name} - ${topic.icon}`;
      const text = `Check out this emoji combination: ${emojiString}`;

      const shared = await shareEmoji(emojiString, title, text, url);

      if (!shared) {
        await copyToClipboard(emojiString);
      }
    },
    [topic.name, topic.icon, copyToClipboard],
  );

  return (
    <div className="w-full space-y-8">
      {/* Copy indicator */}
      {isCopiedVisible && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg">
            <Copy className="h-4 w-4" />
            <span className="text-sm font-medium">
              {topicBrowserT("copied").replace("{count}", String(copiedCount))}
            </span>
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
              {selectedIds.length}{" "}
              {topicBrowserT("selected").replace(
                "{count}",
                String(selectedIds.length),
              )}
            </span>
            <button
              type="button"
              onClick={handleCopySelected}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-foreground text-primary rounded-full text-sm font-medium hover:bg-primary-foreground/90 transition-colors shrink-0"
            >
              <Copy className="h-4 w-4" />
              {topicBrowserT("copy")}
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
        <button
          type="button"
          onClick={() => setShowGenerator(!showGenerator)}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          {topicBrowserT("createCombination")}
        </button>
      </div>

      {/* Combination Generator */}
      {showGenerator && (
        <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg">
              {topicBrowserT("generator")}
            </h3>
            <button
              type="button"
              onClick={() => setShowGenerator(false)}
              className="p-1 hover:bg-primary/20 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Selected emojis */}
          <div className="flex flex-wrap gap-2 min-h-[3rem] p-3 rounded-xl bg-background border border-primary/20">
            {generatorEmojis.length === 0 ? (
              <span className="text-sm text-muted-foreground">
                {topicBrowserT("selectEmojis")}
              </span>
            ) : (
              generatorEmojis.map((emoji, index) => (
                <button
                  key={`${emoji}-${index}`}
                  type="button"
                  onClick={() => removeFromGenerator(index)}
                  className="text-2xl p-1 rounded-lg hover:bg-destructive/20 transition-colors group relative"
                >
                  {emoji}
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="h-3 w-3 text-destructive-foreground" />
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Topic primary emojis to add */}
          <div className="flex flex-wrap gap-2">
            {topic.primaryEmojis.map((emoji, index) => (
              <button
                key={`primary-${emoji}-${index}`}
                type="button"
                onClick={() => addToGenerator(emoji)}
                className="text-2xl p-2 rounded-lg bg-background hover:bg-primary/20 border border-border transition-colors"
              >
                {emoji}
              </button>
            ))}
            {["✨", "⭐", "💫", "⋆", "｡", "˚", "♡", "☁️"].map((emoji, index) => (
              <button
                key={`deco-${emoji}-${index}`}
                type="button"
                onClick={() => addToGenerator(emoji)}
                className="text-xl p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setGeneratorEmojis([])}
              disabled={generatorEmojis.length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              {topicBrowserT("clear")}
            </button>
            <button
              type="button"
              onClick={shuffleGenerator}
              disabled={generatorEmojis.length < 2}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 transition-colors"
            >
              <Shuffle className="h-4 w-4" />
              {topicBrowserT("shuffle")}
            </button>
            <button
              type="button"
              onClick={generateResult}
              disabled={generatorEmojis.length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              {topicBrowserT("generate")}
            </button>
          </div>

          {/* Result */}
          {generatorResult && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-primary/30">
              <span className="text-3xl flex-1 text-center">
                {generatorResult}
              </span>
              <button
                type="button"
                onClick={copyGeneratorResult}
                className="p-3 rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors"
              >
                <Check className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search and controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={topicBrowserT("searchPlaceholder")}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>{topicT("tapToCopy")}</span>
          <span className="hidden sm:inline">
            {topicBrowserT("longPressSelect")}
          </span>
        </div>
      </div>

      {/* Combinations count */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {filteredCombinations.length !== 1
            ? topicBrowserT("combinationsCount")
                .replace("{count}", String(filteredCombinations.length))
                .replace("{plural}", "s")
            : topicBrowserT("combinationsCount")
                .replace("{count}", String(filteredCombinations.length))
                .replace("{plural}", "")}
          {searchQuery &&
            ` ${topicBrowserT("noCombinationsFound")} "${searchQuery}"`}
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

                  {/* Share button */}
                  <div
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(emojiString);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        handleShare(emojiString);
                      }
                    }}
                    className="p-2 rounded-lg bg-primary/10 text-primary sm:opacity-0 sm:group-hover:opacity-100 hover:bg-primary/20 transition-all cursor-pointer"
                    title={
                      topicBrowserT("share") !== "topicBrowser.share"
                        ? topicBrowserT("share")
                        : "Share"
                    }
                  >
                    <Share2 className="h-4 w-4" />
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
            {topicBrowserT("noCombinationsFound")} "{searchQuery}"
          </p>
        </div>
      )}

      {/* Related topics */}
      {topic.relatedTopics.length > 0 && (
        <div className="pt-8 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {topicBrowserT("relatedTopics")}
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
