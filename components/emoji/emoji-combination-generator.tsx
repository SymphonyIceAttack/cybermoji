"use client";

import { Check, Copy, Plus, Shuffle, Trash2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEmojiCopy } from "@/hooks/use-emoji-copy";
import type { LanguageType } from "@/lib/translations";

interface EmojiCombinationGeneratorProps {
  lang?: LanguageType;
  translations?: Record<string, string>;
  onClose?: () => void;
}

const POPULAR_DECORATORS = [
  "✨",
  "⭐",
  "🌟",
  "💫",
  "⋆",
  "˚",
  "｡",
  "°",
  "˖",
  "꩜",
  "♡",
  "💕",
  "💖",
  "💗",
  "❤️",
  "🩷",
  "🩵",
  "💜",
  "🌸",
  "🌺",
  "🌻",
  "🌷",
  "✿",
  "🦋",
  "🫧",
  "☁️",
  "🌙",
  "🌈",
  "⊹",
  "‧",
  "･",
  "·",
];

const COMBINATION_TEMPLATES = [
  { pattern: [0, 1, 2, 1, 0], name: "mirror" },
  { pattern: [0, 1, 0, 1], name: "alternate" },
  { pattern: [0, 1, 1, 0], name: "sandwich" },
  { pattern: [0, 0, 0], name: "triple" },
  { pattern: [1, 0, 1, 0, 1], name: "decorated" },
];

export function EmojiCombinationGenerator({
  translations = {},
  onClose,
}: EmojiCombinationGeneratorProps) {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [combination, setCombination] = useState<string>("");
  const { copiedEmoji, copyToClipboard } = useEmojiCopy();

  const t = useCallback(
    (key: string): string => {
      return translations[key] || key;
    },
    [translations],
  );

  const addEmoji = useCallback((emoji: string) => {
    setSelectedEmojis((prev) => {
      if (prev.length >= 10) return prev;
      return [...prev, emoji];
    });
  }, []);

  const removeEmoji = useCallback((index: number) => {
    setSelectedEmojis((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedEmojis([]);
    setCombination("");
  }, []);

  const generateCombination = useCallback(() => {
    if (selectedEmojis.length === 0) return;
    setCombination(selectedEmojis.join(""));
  }, [selectedEmojis]);

  const shuffleCombination = useCallback(() => {
    if (selectedEmojis.length === 0) return;
    const shuffled = [...selectedEmojis].sort(() => Math.random() - 0.5);
    setSelectedEmojis(shuffled);
    setCombination(shuffled.join(""));
  }, [selectedEmojis]);

  const applyTemplate = useCallback(
    (template: { pattern: number[]; name: string }) => {
      if (selectedEmojis.length < 2) return;
      const result = template.pattern
        .map((idx) => selectedEmojis[idx % selectedEmojis.length] || "")
        .join("");
      setCombination(result);
    },
    [selectedEmojis],
  );

  const handleCopy = useCallback(() => {
    if (combination) {
      copyToClipboard(combination);
    }
  }, [combination, copyToClipboard]);

  return (
    <div className="bg-background border border-primary/30 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20">
        <h3 className="text-lg font-display font-bold">
          {t("generator.title") !== "generator.title"
            ? t("generator.title")
            : "Emoji Combination Generator"}
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Selected Emojis */}
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {t("generator.selected") !== "generator.selected"
              ? t("generator.selected")
              : "Selected Emojis"}{" "}
            ({selectedEmojis.length}/10)
          </p>
          <div className="flex flex-wrap gap-2 min-h-[3rem] p-3 rounded-xl bg-primary/5 border border-primary/20">
            {selectedEmojis.length === 0 ? (
              <span className="text-sm text-muted-foreground">
                {t("generator.selectHint") !== "generator.selectHint"
                  ? t("generator.selectHint")
                  : "Click emojis below to add"}
              </span>
            ) : (
              selectedEmojis.map((emoji, index) => (
                <button
                  key={`${emoji}-${index}`}
                  type="button"
                  onClick={() => removeEmoji(index)}
                  className="group relative text-2xl p-1 rounded-lg hover:bg-destructive/20 transition-colors"
                  title="Click to remove"
                >
                  {emoji}
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="h-3 w-3 text-destructive-foreground" />
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Popular Decorators */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {t("generator.decorators") !== "generator.decorators"
              ? t("generator.decorators")
              : "Popular Decorators"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_DECORATORS.map((emoji, index) => (
              <button
                key={`${emoji}-${index}`}
                type="button"
                onClick={() => addEmoji(emoji)}
                className="text-xl p-1.5 rounded-lg hover:bg-primary/20 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Templates */}
        {selectedEmojis.length >= 2 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {t("generator.templates") !== "generator.templates"
                ? t("generator.templates")
                : "Quick Templates"}
            </p>
            <div className="flex flex-wrap gap-2">
              {COMBINATION_TEMPLATES.map((template) => (
                <button
                  key={template.name}
                  type="button"
                  onClick={() => applyTemplate(template)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors capitalize"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            className="flex-1"
            disabled={selectedEmojis.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {t("generator.clear") !== "generator.clear"
              ? t("generator.clear")
              : "Clear"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={shuffleCombination}
            className="flex-1"
            disabled={selectedEmojis.length < 2}
          >
            <Shuffle className="h-4 w-4 mr-2" />
            {t("generator.shuffle") !== "generator.shuffle"
              ? t("generator.shuffle")
              : "Shuffle"}
          </Button>
          <Button
            size="sm"
            onClick={generateCombination}
            className="flex-1"
            disabled={selectedEmojis.length === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("generator.generate") !== "generator.generate"
              ? t("generator.generate")
              : "Generate"}
          </Button>
        </div>

        {/* Result */}
        {combination && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {t("generator.result") !== "generator.result"
                ? t("generator.result")
                : "Result"}
            </p>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/30">
              <span className="text-3xl flex-1 text-center">{combination}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-3 rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors"
              >
                {copiedEmoji === combination ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
