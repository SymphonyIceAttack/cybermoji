"use client";

import { Check, Copy, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { EmojibaseEmoji } from "@/hooks/use-emojibase";

interface EmojiDetailModalProps {
  emoji: EmojibaseEmoji | null;
  onClose: () => void;
}

const SKIN_TONES = [
  { id: 1, name: "Light", class: "tone-light" },
  { id: 2, name: "Medium-Light", class: "tone-medium-light" },
  { id: 3, name: "Medium", class: "tone-medium" },
  { id: 4, name: "Medium-Dark", class: "tone-medium-dark" },
  { id: 5, name: "Dark", class: "tone-dark" },
];

const SUBGROUP_NAMES: Record<number, string> = {
  0: "face-smiling",
  1: "face-affection",
  2: "face-tongue",
  3: "face-hand",
  4: "face-neutral-skeptical",
  5: "face-sleepy",
  6: "face-unwell",
  7: "face-hat",
  8: "face-glasses",
  9: "face-concerned",
  10: "face-negative",
  11: "cat-face",
  12: "monkey-face",
  13: "face-costume",
  14: "emotion",
  15: "person",
  16: "person-gesture",
  17: "person-fantasy",
  18: "person-activity",
  19: "person-sport",
  20: "person-resting",
  21: "person-role",
  22: "person-symbol",
  23: "family",
  24: "gender",
  25: "skin-tone",
  26: "hair-style",
  27: "animal-mammal",
  28: "animal-bird",
  29: "animal-amphibian",
  30: "animal-reptile",
  31: "animal-marine",
  32: "animal-bug",
  33: "plant-flower",
  34: "plant-other",
  35: "food-fruit",
  36: "food-vegetable",
  37: "food-prepared",
  38: "food-asian",
  39: "food-sweet",
  40: "drink",
  41: "dishware",
  42: "body-parts",
  43: "hand-fingers-open",
  44: "hand-fingers-partial",
  45: "hand-fingers-closed",
  46: "hand-single-finger",
  47: "hand-fingers-partial",
  48: "hand-prop",
  49: "hands",
  50: "animal-mammal",
  51: "transport-ground",
  52: "transport-water",
  53: "transport-air",
  54: "transport-sign",
  55: "place-building",
  56: "place-geographic",
  57: "place-map",
  58: "place-other",
  59: "place-religious",
  60: "event",
  61: "award-medal",
  62: "sport",
  63: "game",
  64: "arts-crafts",
  65: "clothing",
  66: "sound",
  67: "music",
  68: "musical-instrument",
  69: "phone",
  70: "computer",
  71: "light-video",
  72: "book-paper",
  73: "money",
  74: "mail",
  75: "writing",
  76: "office",
  77: "lock",
  78: "tool",
  79: "science",
  80: "medical",
  81: "household",
  82: "other-object",
  83: "keycap",
  84: "arrow",
  85: "religion",
  86: "zodiac",
  87: "av-symbol",
  88: "math",
  89: "punctuation",
  90: "currency",
  91: "other-symbol",
  92: "flag",
  93: "country-flag",
  94: "subdivision-flag",
  95: "alphanum",
  96: "geometric",
  97: "warning",
};

function getTwemojiUrl(hexcode: string): string {
  const cleanHexcode = hexcode.replace(/-FE0F$/, "").toLowerCase();
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/${cleanHexcode}.svg`;
}

function formatHexcode(hexcode: string): string {
  return hexcode.toUpperCase();
}

function getSkinToneEmoji(
  emoji: EmojibaseEmoji,
  tone: number | undefined,
): EmojibaseEmoji {
  if (!tone || !emoji.skins) return emoji;
  return emoji.skins.find((s) => s.tone === tone) || emoji;
}

export function EmojiDetailModal({ emoji, onClose }: EmojiDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [selectedTone, setSelectedTone] = useState<number | undefined>(
    undefined,
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (emoji) {
      setSelectedTone(emoji.tone);
    }
  }, [emoji]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleCopy = useCallback(() => {
    if (!emoji) return;
    const toneEmoji = getSkinToneEmoji(emoji, selectedTone);
    navigator.clipboard.writeText(toneEmoji.emoji);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [emoji, selectedTone]);

  const displayEmoji = emoji ? getSkinToneEmoji(emoji, selectedTone) : null;

  if (!emoji || !displayEmoji) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative bg-background border border-primary/30 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header - Emoji Display */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 pt-12 text-center">
          {/* Twemoji Image (desktop) or Character (mobile) */}
          <div className="relative inline-block">
            {!isMobile ? (
              <img
                src={getTwemojiUrl(displayEmoji.hexcode)}
                alt={displayEmoji.label}
                className="w-32 h-32 object-contain drop-shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <span
              className={`text-7xl select-none ${!isMobile ? "hidden" : ""}`}
              onLoad={(e) => {
                const target = e.target as HTMLElement;
                const prev = target.previousElementSibling as HTMLImageElement;
                if (prev && prev.complete) {
                  target.classList.add("hidden");
                }
              }}
            >
              {displayEmoji.emoji}
            </span>
          </div>

          {/* Emoji name */}
          <h2 className="text-xl font-display font-bold mt-4 capitalize">
            {displayEmoji.label}
          </h2>

          {/* Hexcode */}
          <p className="text-sm font-mono text-muted-foreground mt-1">
            U+{formatHexcode(displayEmoji.hexcode)}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full h-12 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/30 flex items-center justify-center gap-3 transition-all group"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span className="font-medium">Copied!</span>
              </>
            ) : (
              <>
                <span className="text-2xl">{displayEmoji.emoji}</span>
                <Copy className="h-5 w-5" />
                <span className="font-medium">Copy to clipboard</span>
              </>
            )}
          </button>

          {/* Skin tone selector */}
          {emoji.skins && emoji.skins.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Skin Tone
              </p>
              <div className="flex gap-2 justify-center">
                {/* Default/No tone */}
                <button
                  type="button"
                  onClick={() => setSelectedTone(undefined)}
                  className={`w-10 h-10 rounded-full text-xl flex items-center justify-center transition-all ${
                    selectedTone === undefined
                      ? "bg-primary/30 ring-2 ring-primary ring-offset-2"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                  title="Default"
                >
                  {emoji.emoji}
                </button>

                {/* Skin tones */}
                {SKIN_TONES.map((tone) => {
                  const toneEmoji = emoji.skins?.find(
                    (s) => s.tone === tone.id,
                  );
                  if (!toneEmoji) return null;

                  return (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => setSelectedTone(tone.id)}
                      className={`w-10 h-10 rounded-full text-xl flex items-center justify-center transition-all ${
                        tone.class
                      } ${
                        selectedTone === tone.id
                          ? "ring-2 ring-primary ring-offset-2"
                          : "hover:scale-110"
                      }`}
                      title={tone.name}
                    >
                      {toneEmoji.emoji}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {displayEmoji.tags && displayEmoji.tags.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-2">
                {displayEmoji.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-primary/10 text-sm text-muted-foreground capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Text representation */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
            <span className="text-sm text-muted-foreground">Text:</span>
            <code className="text-sm font-mono">
              {displayEmoji.text || "N/A"}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

interface EmojiItemWithDetailProps {
  emoji: EmojibaseEmoji;
  isCopied: boolean;
  onCopy: (emojiChar: string) => void;
  onShowDetail: (emoji: EmojibaseEmoji) => void;
  showDetails?: boolean;
}

export function EmojiItemWithDetail({
  emoji,
  isCopied,
  onCopy,
  onShowDetail,
  showDetails = false,
}: EmojiItemWithDetailProps) {
  const subgroupName =
    SUBGROUP_NAMES[emoji.subgroup] || `subgroup-${emoji.subgroup}`;

  const handleClick = () => {
    if (showDetails) {
      onShowDetail(emoji);
    } else {
      onCopy(emoji.emoji);
    }
  };

  return (
    <button
      type="button"
      className={`group relative flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all cursor-pointer h-auto min-h-16 w-full border-0 bg-transparent ${
        showDetails ? "hover:bg-primary/20" : "hover:bg-primary/5"
      }`}
      onClick={handleClick}
      aria-label={`${emoji.label}, ${showDetails ? "show details" : "copy to clipboard"}`}
    >
      {/* Emoji */}
      <span className="text-2xl sm:text-3xl hover:scale-125 transition-transform duration-200 select-none">
        {emoji.emoji}
      </span>

      {/* Subgroup badge (only in details mode) */}
      {showDetails && (
        <span className="text-[10px] text-muted-foreground/60 truncate max-w-full px-1 mt-1">
          {subgroupName}
        </span>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-primary/30 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {emoji.label}
      </div>

      {/* Copied feedback */}
      {isCopied && !showDetails && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/20 rounded-lg">
          <Check className="h-4 w-4 text-primary" />
        </div>
      )}
    </button>
  );
}
