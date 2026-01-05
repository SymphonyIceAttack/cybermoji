import type { Emoji, GroupKey, Locale } from "emojibase";
import { fetchEmojis } from "emojibase";
import type { LanguageType } from "./translations";

export type { Emoji };

export type EmojiCategory = GroupKey;

export interface EmojiCategoryInfo {
  id: EmojiCategory;
  name: string;
  icon: string;
  emojiCount: number;
}

export interface EmojiWithLocal extends Emoji {
  labelLocal?: string;
  tagsLocal?: string[];
  textLocal?: string;
}

export const emojiCategories: EmojiCategoryInfo[] = [
  {
    id: "smileys-emotion",
    name: "Smileys & Emotion",
    icon: "😀",
    emojiCount: 0,
  },
  { id: "people-body", name: "People & Body", icon: "👋", emojiCount: 0 },
  { id: "animals-nature", name: "Animals & Nature", icon: "🐱", emojiCount: 0 },
  { id: "food-drink", name: "Food & Drink", icon: "🍎", emojiCount: 0 },
  { id: "travel-places", name: "Travel & Places", icon: "✈", emojiCount: 0 },
  { id: "activities", name: "Activities", icon: "⚽", emojiCount: 0 },
  { id: "objects", name: "Objects", icon: "💡", emojiCount: 0 },
  { id: "symbols", name: "Symbols", icon: "❤", emojiCount: 0 },
  { id: "flags", name: "Flags", icon: "🚩", emojiCount: 0 },
];

let cachedEnglishEmojis: Emoji[] | null = null;
const cachedLocalEmojis: Map<string, Emoji[]> = new Map();

async function getEnglishEmojis(): Promise<Emoji[]> {
  if (cachedEnglishEmojis) {
    return cachedEnglishEmojis;
  }

  const data = await fetchEmojis("en" as Locale, { compact: false });
  cachedEnglishEmojis = data as Emoji[];
  return cachedEnglishEmojis;
}

async function getLocalEmojis(lang: LanguageType): Promise<Emoji[]> {
  if (lang === "en") {
    return [];
  }

  if (cachedLocalEmojis.has(lang)) {
    const cached = cachedLocalEmojis.get(lang);
    if (cached) return cached;
  }

  const data = await fetchEmojis(lang as Locale, { compact: false });
  const emojis = data as Emoji[];
  cachedLocalEmojis.set(lang, emojis);
  return emojis;
}

export async function getAllEmojis(
  lang: LanguageType = "en",
): Promise<EmojiWithLocal[]> {
  const englishEmojis = await getEnglishEmojis();
  const isNonEnglish = lang !== "en";

  if (!isNonEnglish) {
    return englishEmojis;
  }

  const localEmojis = await getLocalEmojis(lang);

  const englishByHexcode = new Map<string, Emoji>();
  englishEmojis.forEach((emoji) => {
    englishByHexcode.set(emoji.hexcode, emoji);
  });

  const merged = localEmojis.map((localEmoji) => {
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
}

export function getEmojisByCategory(
  category: EmojiCategory,
  emojis: Emoji[],
): Emoji[] {
  return emojis.filter((emoji) =>
    emoji.group === emojiCategories.find((c) => c.id === category)?.name
      ? 0
      : 0,
  );
}

export async function searchEmojis(
  query: string,
  lang: LanguageType = "en",
): Promise<EmojiWithLocal[]> {
  const emojis = await getAllEmojis(lang);
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return emojis;

  return emojis.filter((emoji) => {
    const searchParts = [emoji.label, ...(emoji.tags || [])];

    if (emoji.labelLocal) {
      searchParts.push(emoji.labelLocal);
    }
    if (emoji.tagsLocal) {
      searchParts.push(...emoji.tagsLocal);
    }

    const searchText = searchParts.join(" ").toLowerCase();

    return searchText.includes(normalizedQuery);
  });
}

export async function getTrendingEmojis(
  lang: LanguageType = "en",
): Promise<Emoji[]> {
  const emojis = await getAllEmojis(lang);
  return emojis.slice(0, 12);
}

export async function getRecentEmojis(
  lang: LanguageType = "en",
): Promise<Emoji[]> {
  const emojis = await getAllEmojis(lang);
  return emojis.slice(0, 8);
}

export async function getRandomEmojis(
  count: number = 12,
  lang: LanguageType = "en",
): Promise<Emoji[]> {
  const emojis = await getAllEmojis(lang);
  const shuffled = [...emojis].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function getEmojiByHexcode(
  hexcode: string,
  lang: LanguageType = "en",
): Promise<Emoji | undefined> {
  const emojis = await getAllEmojis(lang);
  return emojis.find((emoji) => emoji.hexcode === hexcode);
}
