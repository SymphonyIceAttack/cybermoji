"use client";

import { Check, Copy, Link2, X } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import type { EmojibaseEmoji } from "@/hooks/use-emojibase";
import type { LanguageType } from "@/lib/translations";
import { translations } from "@/lib/translations";

function isCombinationEmoji(emoji: EmojibaseEmoji): boolean {
  return emoji.hexcode.includes("-200D-");
}

interface EmojiDetailModalProps {
  emoji: EmojibaseEmoji | null;
  onClose: () => void;
  lang: LanguageType;
}

const SKIN_TONES = [
  { id: 1, key: "skinTone.light" },
  { id: 2, key: "skinTone.medium-light" },
  { id: 3, key: "skinTone.medium" },
  { id: 4, key: "skinTone.medium-dark" },
  { id: 5, key: "skinTone.dark" },
];

const SUBGROUP_KEYS: Record<number, string> = {
  0: "subgroup.face-smiling",
  1: "subgroup.face-affection",
  2: "subgroup.face-tongue",
  3: "subgroup.face-hand",
  4: "subgroup.face-neutral-skeptical",
  5: "subgroup.face-sleepy",
  6: "subgroup.face-unwell",
  7: "subgroup.face-hat",
  8: "subgroup.face-glasses",
  9: "subgroup.face-concerned",
  10: "subgroup.face-negative",
  11: "subgroup.cat-face",
  12: "subgroup.monkey-face",
  13: "subgroup.face-costume",
  14: "subgroup.emotion",
  15: "subgroup.person",
  16: "subgroup.person-gesture",
  17: "subgroup.person-fantasy",
  18: "subgroup.person-activity",
  19: "subgroup.person-sport",
  20: "subgroup.person-resting",
  21: "subgroup.person-role",
  22: "subgroup.person-symbol",
  23: "subgroup.family",
  24: "subgroup.gender",
  25: "subgroup.skin-tone",
  26: "subgroup.hair-style",
  27: "subgroup.animal-mammal",
  28: "subgroup.animal-bird",
  29: "subgroup.animal-amphibian",
  30: "subgroup.animal-reptile",
  31: "subgroup.animal-marine",
  32: "subgroup.animal-bug",
  33: "subgroup.plant-flower",
  34: "subgroup.plant-other",
  35: "subgroup.food-fruit",
  36: "subgroup.food-vegetable",
  37: "subgroup.food-prepared",
  38: "subgroup.food-asian",
  39: "subgroup.food-sweet",
  40: "subgroup.drink",
  41: "subgroup.dishware",
  42: "subgroup.body-parts",
  43: "subgroup.hand-fingers-open",
  44: "subgroup.hand-fingers-partial",
  45: "subgroup.hand-fingers-closed",
  46: "subgroup.hand-single-finger",
  47: "subgroup.hand-fingers-partial",
  48: "subgroup.hand-prop",
  49: "subgroup.hands",
  50: "subgroup.animal-mammal",
  51: "subgroup.transport-ground",
  52: "subgroup.transport-water",
  53: "subgroup.transport-air",
  54: "subgroup.transport-sign",
  55: "subgroup.place-building",
  56: "subgroup.place-geographic",
  57: "subgroup.place-map",
  58: "subgroup.place-other",
  59: "subgroup.place-religious",
  60: "subgroup.event",
  61: "subgroup.award-medal",
  62: "subgroup.sport",
  63: "subgroup.game",
  64: "subgroup.arts-crafts",
  65: "subgroup.clothing",
  66: "subgroup.sound",
  67: "subgroup.music",
  68: "subgroup.musical-instrument",
  69: "subgroup.phone",
  70: "subgroup.computer",
  71: "subgroup.light-video",
  72: "subgroup.book-paper",
  73: "subgroup.money",
  74: "subgroup.mail",
  75: "subgroup.writing",
  76: "subgroup.office",
  77: "subgroup.lock",
  78: "subgroup.tool",
  79: "subgroup.science",
  80: "subgroup.medical",
  81: "subgroup.household",
  82: "subgroup.other-object",
  83: "subgroup.keycap",
  84: "subgroup.arrow",
  85: "subgroup.religion",
  86: "subgroup.zodiac",
  87: "subgroup.av-symbol",
  88: "subgroup.math",
  89: "subgroup.punctuation",
  90: "subgroup.currency",
  91: "subgroup.other-symbol",
  92: "subgroup.flag",
  93: "subgroup.country-flag",
  94: "subgroup.subdivision-flag",
  95: "subgroup.alphanum",
  96: "subgroup.geometric",
  97: "subgroup.warning",
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

export function EmojiDetailModal({
  emoji,
  onClose,
  lang,
}: EmojiDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [selectedTone, setSelectedTone] = useState<number | undefined>(
    undefined,
  );
  const [isMobile, setIsMobile] = useState(false);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: unknown =
        translations[lang as keyof typeof translations] || translations.en;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      return typeof value === "string" ? value : key;
    },
    [lang],
  );
  const modalT = useCallback((key: string) => t(`modal.${key}`), [t]);

  // Get translated skin tone name
  const getSkinToneName = useCallback(
    (skinToneId: number): string => {
      const tone = SKIN_TONES.find((s) => s.id === skinToneId);
      if (!tone) return "";
      const translated = t(tone.key);
      return translated === tone.key
        ? tone.key.replace("skinTone.", "")
        : translated;
    },
    [t],
  );

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
      setSelectedTone(typeof emoji.tone === "number" ? emoji.tone : undefined);
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
        aria-label={modalT("close")}
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
          <div className="relative inline-block w-32 h-32">
            {!isMobile ? (
              <img
                src={getTwemojiUrl(displayEmoji.hexcode)}
                alt={displayEmoji.label}
                className="w-full h-full object-contain drop-shadow-lg"
                loading="eager"
                fetchPriority="high"
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.classList.remove("opacity-0");
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.classList.add("hidden");
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <span
              className={`text-7xl select-none absolute inset-0 flex items-center justify-center ${!isMobile ? "hidden" : ""}`}
              ref={(node) => {
                if (node && !isMobile) {
                  const img = node.previousElementSibling as HTMLImageElement;
                  if (img && img.complete) {
                    node.classList.add("hidden");
                  }
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
                <span className="font-medium">{modalT("copied")}</span>
              </>
            ) : (
              <>
                <span className="text-2xl">{displayEmoji.emoji}</span>
                <Copy className="h-5 w-5" />
                <span className="font-medium">{modalT("copyToClipboard")}</span>
              </>
            )}
          </button>

          {/* Skin tone selector */}
          {emoji.skins && emoji.skins.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                {modalT("skinTone")}
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
                  title={modalT("default")}
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
                        tone.id === 1
                          ? "tone-light"
                          : tone.id === 2
                            ? "tone-medium-light"
                            : tone.id === 3
                              ? "tone-medium"
                              : tone.id === 4
                                ? "tone-medium-dark"
                                : tone.id === 5
                                  ? "tone-dark"
                                  : ""
                      } ${
                        selectedTone === tone.id
                          ? "ring-2 ring-primary ring-offset-2"
                          : "hover:scale-110"
                      }`}
                      title={getSkinToneName(tone.id)}
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
              <p className="text-sm font-medium text-muted-foreground">
                {modalT("tags")}
              </p>
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
            <span className="text-sm text-muted-foreground">
              {modalT("text")}
            </span>
            <code className="text-sm font-mono">
              {displayEmoji.text || "N/A"}
            </code>
          </div>

          {/* Combination Emoji Info */}
          {isCombinationEmoji(displayEmoji) && (
            <div className="p-3 rounded-lg bg-primary/5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Link2 className="h-4 w-4" />
                {modalT("combinationEmoji")}
              </div>
              <p className="text-xs text-muted-foreground/70">
                {modalT("combinationDesc")}
              </p>
            </div>
          )}
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
  lang: LanguageType;
  showTags?: boolean;
}

export const EmojiItemWithDetail = memo(function EmojiItemWithDetail({
  emoji,
  isCopied,
  onCopy,
  onShowDetail,
  showDetails = false,
  lang,
  showTags = false,
}: EmojiItemWithDetailProps) {
  const isCombo = isCombinationEmoji(emoji);

  const translationsForLang =
    translations[lang as keyof typeof translations] || translations.en;
  const t = useCallback(
    (key: string): string => {
      return (
        ((translationsForLang as Record<string, unknown>)[key] as string) || key
      );
    },
    [translationsForLang],
  );
  const browserT = useCallback((key: string) => t(`browser.${key}`), [t]);

  // Get translated subgroup name
  const getSubgroupName = useCallback(
    (subgroupId: number): string => {
      const key = SUBGROUP_KEYS[subgroupId];
      if (!key) return `subgroup-${subgroupId}`;
      const translated = t(key);
      return translated === key
        ? SUBGROUP_KEYS[subgroupId].replace("subgroup.", "")
        : translated;
    },
    [t],
  );

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
      className={`group relative flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all cursor-pointer h-auto min-h-[4rem] sm:min-h-[4.5rem] w-full border-0 bg-transparent touch-manipulation ${
        showDetails ? "hover:bg-primary/20" : "hover:bg-primary/5"
      }`}
      onClick={handleClick}
      aria-label={`${emoji.label}, ${showDetails ? browserT("showDetails") : browserT("copyToClipboard")}`}
      style={{ contain: "content", contentVisibility: "auto" }}
    >
      {/* Emoji - fixed height container to prevent CLS */}
      <span aria-hidden="true" className="text-2xl sm:text-3xl h-8 sm:h-9 flex items-center justify-center transform transition-transform duration-200 select-none group-active:scale-110">
        {emoji.emoji}
      </span>

      {/* Combination indicator */}
      {isCombo && (
        <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
          <Link2 className="h-3 w-3 text-primary/60" />
        </span>
      )}

      {/* Subgroup badge (only in details mode) - reserved space */}
      <span
        className={`text-[10px] text-muted-foreground/60 truncate max-w-full px-1 mt-1 ${
          showDetails ? "block" : "sm:hidden"
        }`}
      >
        {showDetails ? getSubgroupName(emoji.subgroup) : ""}
      </span>

      {/* Tags (only when showTags is true) - reserved space */}
      <span
        className={`text-[8px] text-muted-foreground/50 truncate max-w-full px-0.5 mt-0.5 h-3 ${
          showTags ? "block" : "hidden"
        }`}
        aria-hidden={!showTags}
      >
        {showTags && emoji.tags && emoji.tags.length > 0 ? emoji.tags[0] : ""}
      </span>

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
});
