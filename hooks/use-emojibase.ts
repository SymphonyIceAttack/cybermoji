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
  1: "People & Gestures",
  2: "Skin Tones",
  3: "Animals & Nature",
  4: "Food & Drink",
  5: "Travel & Places",
  6: "Activities",
  7: "Objects",
  8: "Symbols",
  9: "Flags",
};

const SUBGROUP_NAMES: Record<number, string> = {
  // Group 0: Smileys & Emotion (subgroups 0-14)
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
  11: "face-costume",
  12: "cat-face",
  13: "monkey-face",
  14: "heart",
  15: "emotion",
  // Group 1: People & Body (subgroups 16-33)
  16: "hand-fingers-open",
  17: "hand-fingers-partial",
  18: "hand-single-finger",
  19: "hand-fingers-closed",
  20: "hands",
  21: "hand-prop",
  22: "body-parts",
  23: "person",
  24: "person-gesture",
  25: "person-role",
  26: "person-fantasy",
  27: "person-activity",
  28: "person-sport",
  29: "person-resting",
  30: "family",
  31: "person-symbol",
  32: "skin-tone",
  33: "hair-style",
  // Group 2: Component (subgroups 34-35)
  34: "skin-tone-modifier",
  35: "hair-style-modifier",
  // Group 3: Animals & Nature (subgroups 36-43)
  36: "animal-mammal",
  37: "animal-bird",
  38: "animal-amphibian",
  39: "animal-reptile",
  40: "animal-marine",
  41: "animal-bug",
  42: "plant-flower",
  43: "plant-other",
  // Group 4: Food & Drink (subgroups 44-52)
  44: "food-fruit",
  45: "food-vegetable",
  46: "food-prepared",
  47: "food-asian",
  48: "food-marine",
  49: "food-sweet",
  50: "drink",
  51: "dishware",
  // Group 5: Travel & Places (subgroups 53-63)
  52: "place-map",
  53: "place-geographic",
  54: "place-building",
  55: "place-religious",
  56: "place-other",
  57: "transport-ground",
  58: "transport-water",
  59: "transport-air",
  60: "hotel",
  61: "time",
  62: "sky-weather",
  // Group 6: Activities (subgroups 64-68)
  63: "event",
  64: "award-medal",
  65: "sport",
  66: "game",
  67: "arts-crafts",
  // Group 7: Objects (subgroups 69-86)
  68: "clothing",
  69: "sound",
  70: "music",
  71: "musical-instrument",
  72: "phone",
  73: "computer",
  74: "light-video",
  75: "book-paper",
  76: "money",
  77: "mail",
  78: "writing",
  79: "office",
  80: "lock",
  81: "tool",
  82: "science",
  83: "medical",
  84: "household",
  85: "other-object",
  // Group 8: Symbols (subgroups 87-100)
  86: "transport-sign",
  87: "warning",
  88: "arrow",
  89: "religion",
  90: "zodiac",
  91: "av-symbol",
  92: "gender",
  93: "math",
  94: "punctuation",
  95: "currency",
  96: "other-symbol",
  97: "keycap",
  98: "alphanum",
  99: "geometric",
  // Group 9: Flags (subgroups 101-103)
  100: "flag",
  101: "country-flag",
  102: "subdivision-flag",
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
