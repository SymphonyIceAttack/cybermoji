"use client";

import { useQuery } from "@tanstack/react-query";
import type { Locale } from "emojibase";
import { fetchEmojis } from "emojibase";
import { useCallback, useMemo } from "react";

export interface EmojibaseEmoji {
  emoji: string;
  group: number;
  hexcode: string;
  label: string;
  labelLocal?: string;
  order: number;
  subgroup: number;
  tags: string[];
  tagsLocal?: string[];
  text: string;
  textLocal?: string;
  type: number;
  version: number;
  skins?: EmojibaseEmoji[];
  tone?: number | number[];
}

export function isCombinationEmoji(emoji: EmojibaseEmoji): boolean {
  return emoji.hexcode.includes("-200D-");
}

export function parseHexcode(hexcode: string): string[] {
  return hexcode.split("-");
}

export interface EmojibaseMessages {
  groups: Array<{ key: string; message: string; order: number }>;
  subgroups: Array<{ key: string; message: string; order: number }>;
  skinTones: Array<{ key: string; message: string }>;
}

const GROUP_NAMES: Record<number, string> = {
  0: "Smileys & Emotion",
  1: "People & Body",
  2: "Animals & Nature",
  3: "Food & Drink",
  4: "Travel & Places",
  5: "Activities",
  6: "Objects",
  7: "Symbols",
  8: "Flags",
};

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

interface UseEmojibaseOptions {
  lang?: string;
}

interface UseEmojibaseReturn {
  emojis: EmojibaseEmoji[];
  emojisByGroup: Record<number, EmojibaseEmoji[]>;
  emojisBySubgroup: Record<number, EmojibaseEmoji[]>;
  groups: Array<{ id: number; name: string; count: number }>;
  subgroups: Array<{ id: number; name: string; count: number }>;
  isLoading: boolean;
  error: Error | null;
  search: (query: string) => EmojibaseEmoji[];
  getByGroup: (group: number) => EmojibaseEmoji[];
  getBySubgroup: (subgroup: number) => EmojibaseEmoji[];
  localEmojis?: EmojibaseEmoji[];
}

export function useEmojibase(
  options: UseEmojibaseOptions = {},
): UseEmojibaseReturn {
  const { lang = "en" } = options;

  const isNonEnglish = lang !== "en";

  const {
    data: englishEmojis,
    isLoading: isLoadingEnglish,
    error: englishError,
  } = useQuery({
    queryKey: ["emojibase", "en"],
    queryFn: async (): Promise<EmojibaseEmoji[]> => {
      const data = await fetchEmojis("en", { compact: false });
      return data as EmojibaseEmoji[];
    },
    staleTime: Infinity,
  });

  const {
    data: localEmojis,
    isLoading: isLoadingLocal,
    error: localError,
  } = useQuery({
    queryKey: ["emojibase", lang],
    queryFn: async (): Promise<EmojibaseEmoji[]> => {
      if (!isNonEnglish) return [];
      const data = await fetchEmojis(lang as Locale, { compact: false });
      return data as EmojibaseEmoji[];
    },
    staleTime: Infinity,
    enabled: isNonEnglish,
  });

  const isLoading = isLoadingEnglish || (isNonEnglish && isLoadingLocal);
  const error = (englishError || localError) as Error | null;

  const emojis = useMemo(() => {
    if (!englishEmojis) return [];

    if (!isNonEnglish) {
      return englishEmojis;
    }

    const englishByHexcode = new Map<string, EmojibaseEmoji>();
    englishEmojis.forEach((emoji) => {
      englishByHexcode.set(emoji.hexcode, emoji);
    });

    const merged = (localEmojis || englishEmojis).map((localEmoji) => {
      const englishEmoji = englishByHexcode.get(localEmoji.hexcode);
      if (englishEmoji) {
        return {
          ...localEmoji,
          label: englishEmoji.label,
          labelLocal: localEmoji.label,
          tags: englishEmoji.tags,
          tagsLocal: localEmoji.tags,
          text: englishEmoji.text,
          textLocal: localEmoji.text,
        };
      }
      return localEmoji;
    });

    return merged;
  }, [englishEmojis, localEmojis, isNonEnglish]);

  const emojisByGroup = useMemo(() => {
    const grouped: Record<number, EmojibaseEmoji[]> = {};

    emojis.forEach((emoji) => {
      if (!grouped[emoji.group]) {
        grouped[emoji.group] = [];
      }
      grouped[emoji.group].push(emoji);
    });

    return grouped;
  }, [emojis]);

  const emojisBySubgroup = useMemo(() => {
    const grouped: Record<number, EmojibaseEmoji[]> = {};

    emojis.forEach((emoji) => {
      if (!grouped[emoji.subgroup]) {
        grouped[emoji.subgroup] = [];
      }
      grouped[emoji.subgroup].push(emoji);
    });

    return grouped;
  }, [emojis]);

  const groups = useMemo(() => {
    return Object.entries(emojisByGroup).map(([id, groupEmojis]) => ({
      id: parseInt(id, 10),
      name: GROUP_NAMES[parseInt(id, 10)] || `Group ${id}`,
      count: groupEmojis.length,
    }));
  }, [emojisByGroup]);

  const subgroups = useMemo(() => {
    return Object.entries(emojisBySubgroup).map(([id, subgroupEmojis]) => ({
      id: parseInt(id, 10),
      name: SUBGROUP_NAMES[parseInt(id, 10)] || `Subgroup ${id}`,
      count: subgroupEmojis.length,
    }));
  }, [emojisBySubgroup]);

  const search = useCallback(
    (query: string): EmojibaseEmoji[] => {
      if (!query.trim() || !emojis.length) return emojis;

      const normalizedQuery = query.toLowerCase().trim();

      return emojis.filter((emoji) => {
        const searchParts = [emoji.label, emoji.hexcode, ...(emoji.tags || [])];

        if (emoji.labelLocal) {
          searchParts.push(emoji.labelLocal);
        }
        if (emoji.tagsLocal) {
          searchParts.push(...emoji.tagsLocal);
        }

        const searchText = searchParts.join(" ").toLowerCase();

        return searchText.includes(normalizedQuery);
      });
    },
    [emojis],
  );

  const getByGroup = useCallback(
    (group: number): EmojibaseEmoji[] => {
      return emojisByGroup[group] || [];
    },
    [emojisByGroup],
  );

  const getBySubgroup = useCallback(
    (subgroup: number): EmojibaseEmoji[] => {
      return emojisBySubgroup[subgroup] || [];
    },
    [emojisBySubgroup],
  );

  return {
    emojis,
    emojisByGroup,
    emojisBySubgroup,
    groups,
    subgroups,
    isLoading,
    error,
    search,
    getByGroup,
    getBySubgroup,
    localEmojis: localEmojis || [],
  };
}
