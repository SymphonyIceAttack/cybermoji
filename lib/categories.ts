export type EmojiCategorySlug =
  | "all"
  | "smileys-emotion"
  | "people-body"
  | "animals-nature"
  | "food-drink"
  | "travel-places"
  | "activities"
  | "objects"
  | "symbols"
  | "flags";

export interface EmojiCategoryInfo {
  id: EmojiCategorySlug;
  nameKey: string;
  icon: string;
  groupNumber: number;
}

export const emojiCategories: EmojiCategoryInfo[] = [
  { id: "all", nameKey: "category.all", icon: "😀", groupNumber: -1 },
  {
    id: "smileys-emotion",
    nameKey: "category.smileys-emotion",
    icon: "😀",
    groupNumber: 0,
  },
  {
    id: "people-body",
    nameKey: "category.people-body",
    icon: "👋",
    groupNumber: 1,
  },
  {
    id: "animals-nature",
    nameKey: "category.animals-nature",
    icon: "🐱",
    groupNumber: 3,
  },
  {
    id: "food-drink",
    nameKey: "category.food-drink",
    icon: "🍎",
    groupNumber: 4,
  },
  {
    id: "travel-places",
    nameKey: "category.travel-places",
    icon: "✈️",
    groupNumber: 5,
  },
  {
    id: "activities",
    nameKey: "category.activities",
    icon: "⚽",
    groupNumber: 6,
  },
  { id: "objects", nameKey: "category.objects", icon: "💡", groupNumber: 7 },
  { id: "symbols", nameKey: "category.symbols", icon: "❤️", groupNumber: 8 },
  { id: "flags", nameKey: "category.flags", icon: "🚩", groupNumber: 9 },
];

export function isValidCategory(slug: string): slug is EmojiCategorySlug {
  return emojiCategories.some((cat) => cat.id === slug);
}

export function getCategoryBySlug(
  slug: EmojiCategorySlug,
): EmojiCategoryInfo | undefined {
  return emojiCategories.find((cat) => cat.id === slug);
}

export function getCategoryName(
  category: EmojiCategorySlug,
  translations: Record<string, string>,
): string {
  const cat = getCategoryBySlug(category);
  if (!cat) return category;
  const nameKey = cat.nameKey;
  return translations[nameKey] || category;
}
