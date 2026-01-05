"use client";

import { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmojis } from "emojibase";
import type { Locale } from "emojibase";

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
  tone?: number;
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
  4: "face-neutral",
  5: "face-sleepy",
  6: "face-unwell",
  7: "face-hat",
  8: "face-glasses",
  9: "face-concerned",
  10: "face-negative",
  11: "face-cat",
  12: "face-cat-concerned",
  13: "monkey-face",
  14: "monkey",
  15: "person",
  16: "person-gesture",
  17: "person-fantasy",
  18: "person-clothing",
  19: "person-symbol",
  20: "skin-tone",
  21: "hair-style",
  22: "animal-mammal",
  23: "animal-bird",
  24: "animal-amphibian",
  25: "animal-reptile",
  26: "animal-marine",
  27: "animal-bug",
  28: "plant-flower",
  29: "plant-other",
  30: "food-fruit",
  31: "food-vegetable",
  32: "food-prepared",
  33: "food-asian",
  34: "food-marine",
  35: "food-sweet",
  36: "drink",
  37: "dishware",
  38: "travel-place",
  39: "transport-ground",
  40: "transport-water",
  41: "transport-air",
  42: "hotel",
  43: "time",
  44: "event",
  45: "award-medal",
  46: "sport",
  47: "game",
  48: "arts-crafts",
  49: "clothing",
  50: "sound",
  51: "music",
  52: "music-note",
  53: "phone",
  54: "computer",
  55: "light-video",
  56: "book-paper",
  57: "money",
  58: "mail",
  59: "writing",
  60: "office",
  61: "lock",
  62: "tool",
  63: "science",
  64: "medical",
  65: "household",
  66: "other-object",
  67: "transport-sign",
  68: "warning",
  69: "arrow",
  70: "religion",
  71: "zodiac",
  72: "av-symbol",
  73: "math",
  74: "punctuation",
  75: "currency",
  76: "other-symbol",
  77: "keycap",
  78: "alphanum",
  79: "geometric",
  80: "flag",
  81: "country-flag",
  82: "subdivision-flag",
  83: "flag-presentation",
};

interface UseEmojibaseOptions {
  lang?: string;
  includeSkins?: boolean;
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
  const { lang = "en", includeSkins = false } = options;

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
      if (!includeSkins) {
        return englishEmojis.filter((e) => !e.tone && !e.skins);
      }
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

    if (!includeSkins) {
      return merged.filter((e) => !e.tone && !e.skins);
    }

    return merged;
  }, [englishEmojis, localEmojis, isNonEnglish, includeSkins]);

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
