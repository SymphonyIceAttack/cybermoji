"use client";

import { Copy, Heart, Sparkles, Star, ThumbsUp, Zap } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmojiCopy } from "@/hooks/use-emoji-copy";
import type { EmojibaseEmoji } from "@/hooks/use-emojibase";
import type { EmojiCategorySlug } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface CategoryUsageProps {
  translations: Record<string, string>;
  categoryT: (key: string) => string;
  categoryEmojis: EmojibaseEmoji[];
  paginatedEmojis: EmojibaseEmoji[];
  categorySlug: EmojiCategorySlug;
}

interface StoryMessage {
  id: string;
  sender: "me" | "friend";
  name: string;
  avatar: string;
  contentKey: string;
  emojis: number[];
  time: string;
}

interface EmojiItem {
  emoji: string;
  label: string;
}

// DiceBear Avatar configuration
const AVATAR_STYLES = {
  avataaars: "avataaars",
  bottts: "bottts",
  funEmoji: "fun-emoji",
  openPeeps: "open-peeps",
  personas: "personas",
  micah: "micah",
} as const;

type AvatarStyle = (typeof AVATAR_STYLES)[keyof typeof AVATAR_STYLES];

// Generate DiceBear avatar URL
const getAvatarUrl = (seed: string, style: AvatarStyle = "avataaars"): string =>
  `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

// Predefined avatar styles for different categories/scenarios
const getScenarioAvatarStyle = (
  categorySlug: string,
  scenarioId: string,
): AvatarStyle => {
  const styleMap: Record<string, Record<string, AvatarStyle>> = {
    "smileys-emotion": {
      default: "avataaars",
      dating: "avataaars",
      crush: "avataaars",
      party: "fun-emoji",
      comfort: "avataaars",
    },
    "people-body": {
      default: "avataaars",
      gym: "avataaars",
      dance: "avataaars",
      selfie: "avataaars",
      wave: "avataaars",
    },
    "animals-nature": {
      default: "open-peeps",
      pet: "open-peeps",
      garden: "open-peeps",
      weather: "fun-emoji",
      hiking: "open-peeps",
    },
    "food-drink": {
      default: "avataaars",
      cooking: "avataaars",
      picnic: "avataaars",
      cafe: "avataaars",
      bakery: "avataaars",
    },
    "travel-places": {
      default: "avataaars",
      vacation: "avataaars",
      roadtrip: "avataaars",
      airport: "avataaars",
      hotel: "avataaars",
    },
    activities: {
      default: "bottts",
      gaming: "bottts",
      concert: "avataaars",
      sports: "avataaars",
      art: "micah",
    },
    objects: {
      default: "fun-emoji",
      shopping: "fun-emoji",
      gift: "fun-emoji",
      phone: "fun-emoji",
      tech: "bottts",
    },
    symbols: {
      default: "fun-emoji",
      zodiac: "fun-emoji",
      lucky: "fun-emoji",
      newyear: "fun-emoji",
      love: "avataaars",
    },
    flags: {
      default: "avataaars",
      worldcup: "avataaars",
      travel: "avataaars",
      global: "avataaars",
      festival: "avataaars",
    },
  };

  return (
    styleMap[categorySlug]?.[scenarioId] ||
    styleMap[categorySlug]?.default ||
    "avataaars"
  );
};

interface StoryScenario {
  id: string;
  icon: string;
  titleKey: string;
  subtitleKey: string;
  colorClass: string;
  messages: StoryMessage[];
  emojis: EmojiItem[];
}

interface CategoryScenarioConfig {
  icon: string;
  bgColorClass: string;
  scenarios: StoryScenario[];
}

export function CategoryUsage({
  translations,
  categoryEmojis,
  paginatedEmojis,
  categorySlug,
}: CategoryUsageProps) {
  const [selectedScenarioId, setSelectedScenarioId] =
    useState<string>("scenario1");
  const [selectedEmojis, setSelectedEmojis] = useState<Set<string>>(new Set());
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const { copyToClipboard } = useEmojiCopy();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const baseEmojis =
    paginatedEmojis.length > 0 ? paginatedEmojis : categoryEmojis;

  // 为每个 category 定义专属场景配置
  const categoryConfigs: Record<string, CategoryScenarioConfig> =
    useMemo(() => {
      const getEmojis = (count: number, offset: number = 0) =>
        baseEmojis.slice(offset, offset + count).map((e, i) => ({
          emoji: e.emoji,
          label: e.label || `Emoji ${i + 1}`,
        }));

      return {
        "smileys-emotion": {
          icon: "😀",
          bgColorClass:
            "bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30",
          scenarios: [
            {
              id: "dating",
              icon: "💕",
              titleKey: "category.examples.scenarios.dating.title",
              subtitleKey: "category.examples.scenarios.dating.subtitle",
              colorClass: "bg-pink-100 dark:bg-pink-900/30",
              messages: [
                {
                  id: "d1",
                  sender: "friend",
                  name: "Alex",
                  avatar: "A",
                  contentKey: "category.examples.scenarios.dating.msg1",
                  emojis: [],
                  time: "8:00 PM",
                },
                {
                  id: "d2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.dating.msg2",
                  emojis: [0, 1, 2],
                  time: "8:05 PM",
                },
                {
                  id: "d3",
                  sender: "friend",
                  name: "Alex",
                  avatar: "A",
                  contentKey: "category.examples.scenarios.dating.msg3",
                  emojis: [3, 4, 5],
                  time: "8:10 PM",
                },
                {
                  id: "d4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.dating.msg4",
                  emojis: [6, 7, 8],
                  time: "8:15 PM",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "crush",
              icon: "😳",
              titleKey: "category.examples.scenarios.crush.title",
              subtitleKey: "category.examples.scenarios.crush.subtitle",
              colorClass: "bg-red-100 dark:bg-red-900/30",
              messages: [
                {
                  id: "c1",
                  sender: "friend",
                  name: "Jamie",
                  avatar: "J",
                  contentKey: "category.examples.scenarios.crush.msg1",
                  emojis: [],
                  time: "Yesterday",
                },
                {
                  id: "c2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.crush.msg2",
                  emojis: [0, 1, 2],
                  time: "Yesterday",
                },
                {
                  id: "c3",
                  sender: "friend",
                  name: "Jamie",
                  avatar: "J",
                  contentKey: "category.examples.scenarios.crush.msg3",
                  emojis: [3, 4, 5],
                  time: "Yesterday",
                },
                {
                  id: "c4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.crush.msg4",
                  emojis: [6, 7, 8],
                  time: "Yesterday",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "party",
              icon: "🎉",
              titleKey: "category.examples.scenarios.party.title",
              subtitleKey: "category.examples.scenarios.party.subtitle",
              colorClass: "bg-purple-100 dark:bg-purple-900/30",
              messages: [
                {
                  id: "p1",
                  sender: "friend",
                  name: "Sam",
                  avatar: "S",
                  contentKey: "category.examples.scenarios.party.msg1",
                  emojis: [],
                  time: "Today",
                },
                {
                  id: "p2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.party.msg2",
                  emojis: [0, 1, 2],
                  time: "Today",
                },
                {
                  id: "p3",
                  sender: "friend",
                  name: "Sam",
                  avatar: "S",
                  contentKey: "category.examples.scenarios.party.msg3",
                  emojis: [3, 4, 5],
                  time: "Today",
                },
                {
                  id: "p4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.party.msg4",
                  emojis: [6, 7, 8],
                  time: "Today",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "comfort",
              icon: "🤗",
              titleKey: "category.examples.scenarios.comfort.title",
              subtitleKey: "category.examples.scenarios.comfort.subtitle",
              colorClass: "bg-blue-100 dark:bg-blue-900/30",
              messages: [
                {
                  id: "cf1",
                  sender: "friend",
                  name: "Jordan",
                  avatar: "J",
                  contentKey: "category.examples.scenarios.comfort.msg1",
                  emojis: [],
                  time: "Yesterday",
                },
                {
                  id: "cf2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.comfort.msg2",
                  emojis: [0, 1, 2],
                  time: "Yesterday",
                },
                {
                  id: "cf3",
                  sender: "friend",
                  name: "Jordan",
                  avatar: "J",
                  contentKey: "category.examples.scenarios.comfort.msg3",
                  emojis: [3, 4, 5],
                  time: "Yesterday",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
        "people-body": {
          icon: "👋",
          bgColorClass:
            "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
          scenarios: [
            {
              id: "gym",
              icon: "💪",
              titleKey: "category.examples.scenarios.gym.title",
              subtitleKey: "category.examples.scenarios.gym.subtitle",
              colorClass: "bg-orange-100 dark:bg-orange-900/30",
              messages: [
                {
                  id: "g1",
                  sender: "friend",
                  name: "Coach",
                  avatar: "C",
                  contentKey: "category.examples.scenarios.gym.msg1",
                  emojis: [],
                  time: "6:00 AM",
                },
                {
                  id: "g2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.gym.msg2",
                  emojis: [0, 1, 2],
                  time: "6:15 AM",
                },
                {
                  id: "g3",
                  sender: "friend",
                  name: "Coach",
                  avatar: "C",
                  contentKey: "category.examples.scenarios.gym.msg3",
                  emojis: [3, 4, 5],
                  time: "6:30 AM",
                },
                {
                  id: "g4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.gym.msg4",
                  emojis: [6, 7, 8],
                  time: "6:45 AM",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "dance",
              icon: "💃",
              titleKey: "category.examples.scenarios.dance.title",
              subtitleKey: "category.examples.scenarios.dance.subtitle",
              colorClass: "bg-pink-100 dark:bg-pink-900/30",
              messages: [
                {
                  id: "dn1",
                  sender: "friend",
                  name: "Mia",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.dance.msg1",
                  emojis: [],
                  time: "9:00 PM",
                },
                {
                  id: "dn2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.dance.msg2",
                  emojis: [0, 1, 2],
                  time: "9:05 PM",
                },
                {
                  id: "dn3",
                  sender: "friend",
                  name: "Mia",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.dance.msg3",
                  emojis: [3, 4, 5],
                  time: "9:10 PM",
                },
                {
                  id: "dn4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.dance.msg4",
                  emojis: [6, 7, 8],
                  time: "9:15 PM",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "selfie",
              icon: "📸",
              titleKey: "category.examples.scenarios.selfie.title",
              subtitleKey: "category.examples.scenarios.selfie.subtitle",
              colorClass: "bg-yellow-100 dark:bg-yellow-900/30",
              messages: [
                {
                  id: "sf1",
                  sender: "friend",
                  name: "Lisa",
                  avatar: "L",
                  contentKey: "category.examples.scenarios.selfie.msg1",
                  emojis: [],
                  time: "2:00 PM",
                },
                {
                  id: "sf2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.selfie.msg2",
                  emojis: [0, 1, 2],
                  time: "2:05 PM",
                },
                {
                  id: "sf3",
                  sender: "friend",
                  name: "Lisa",
                  avatar: "L",
                  contentKey: "category.examples.scenarios.selfie.msg3",
                  emojis: [3, 4, 5],
                  time: "2:10 PM",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "wave",
              icon: "👋",
              titleKey: "category.examples.scenarios.wave.title",
              subtitleKey: "category.examples.scenarios.wave.subtitle",
              colorClass: "bg-green-100 dark:bg-green-900/30",
              messages: [
                {
                  id: "wv1",
                  sender: "friend",
                  name: "Tom",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.wave.msg1",
                  emojis: [],
                  time: "10:00 AM",
                },
                {
                  id: "wv2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.wave.msg2",
                  emojis: [0, 1, 2],
                  time: "10:05 AM",
                },
                {
                  id: "wv3",
                  sender: "friend",
                  name: "Tom",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.wave.msg3",
                  emojis: [3, 4, 5],
                  time: "10:10 AM",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
        "animals-nature": {
          icon: "🐱",
          bgColorClass:
            "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30",
          scenarios: [
            {
              id: "pet",
              icon: "🐕",
              titleKey: "category.examples.scenarios.pet.title",
              subtitleKey: "category.examples.scenarios.pet.subtitle",
              colorClass: "bg-amber-100 dark:bg-amber-900/30",
              messages: [
                {
                  id: "pt1",
                  sender: "friend",
                  name: "PetLover",
                  avatar: "P",
                  contentKey: "category.examples.scenarios.pet.msg1",
                  emojis: [],
                  time: "11:00 AM",
                },
                {
                  id: "pt2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.pet.msg2",
                  emojis: [0, 1, 2],
                  time: "11:05 AM",
                },
                {
                  id: "pt3",
                  sender: "friend",
                  name: "PetLover",
                  avatar: "P",
                  contentKey: "category.examples.scenarios.pet.msg3",
                  emojis: [3, 4, 5],
                  time: "11:10 AM",
                },
                {
                  id: "pt4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.pet.msg4",
                  emojis: [6, 7, 8],
                  time: "11:15 AM",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "garden",
              icon: "🌸",
              titleKey: "category.examples.scenarios.garden.title",
              subtitleKey: "category.examples.scenarios.garden.subtitle",
              colorClass: "bg-pink-100 dark:bg-pink-900/30",
              messages: [
                {
                  id: "gd1",
                  sender: "friend",
                  name: "Mom",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.garden.msg1",
                  emojis: [],
                  time: "9:00 AM",
                },
                {
                  id: "gd2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.garden.msg2",
                  emojis: [0, 1, 2],
                  time: "9:15 AM",
                },
                {
                  id: "gd3",
                  sender: "friend",
                  name: "Mom",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.garden.msg3",
                  emojis: [3, 4, 5],
                  time: "9:20 AM",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "weather",
              icon: "🌤️",
              titleKey: "category.examples.scenarios.weather.title",
              subtitleKey: "category.examples.scenarios.weather.subtitle",
              colorClass: "bg-sky-100 dark:bg-sky-900/30",
              messages: [
                {
                  id: "wt1",
                  sender: "friend",
                  name: "Friend",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.weather.msg1",
                  emojis: [],
                  time: "8:00 AM",
                },
                {
                  id: "wt2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.weather.msg2",
                  emojis: [0, 1, 2],
                  time: "8:05 AM",
                },
                {
                  id: "wt3",
                  sender: "friend",
                  name: "Friend",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.weather.msg3",
                  emojis: [3, 4, 5],
                  time: "8:10 AM",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "hiking",
              icon: "🏔️",
              titleKey: "category.examples.scenarios.hiking.title",
              subtitleKey: "category.examples.scenarios.hiking.subtitle",
              colorClass: "bg-stone-100 dark:bg-stone-900/30",
              messages: [
                {
                  id: "hk1",
                  sender: "friend",
                  name: "Adventure",
                  avatar: "A",
                  contentKey: "category.examples.scenarios.hiking.msg1",
                  emojis: [],
                  time: "10:00 AM",
                },
                {
                  id: "hk2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.hiking.msg2",
                  emojis: [0, 1, 2],
                  time: "10:30 AM",
                },
                {
                  id: "hk3",
                  sender: "friend",
                  name: "Adventure",
                  avatar: "A",
                  contentKey: "category.examples.scenarios.hiking.msg3",
                  emojis: [3, 4, 5],
                  time: "11:00 AM",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
        "food-drink": {
          icon: "🍎",
          bgColorClass:
            "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30",
          scenarios: [
            {
              id: "cooking",
              icon: "👨‍🍳",
              titleKey: "category.examples.scenarios.cooking.title",
              subtitleKey: "category.examples.scenarios.cooking.subtitle",
              colorClass: "bg-yellow-100 dark:bg-yellow-900/30",
              messages: [
                {
                  id: "ck1",
                  sender: "friend",
                  name: "Chef",
                  avatar: "C",
                  contentKey: "category.examples.scenarios.cooking.msg1",
                  emojis: [],
                  time: "5:00 PM",
                },
                {
                  id: "ck2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.cooking.msg2",
                  emojis: [0, 1, 2],
                  time: "5:10 PM",
                },
                {
                  id: "ck3",
                  sender: "friend",
                  name: "Chef",
                  avatar: "C",
                  contentKey: "category.examples.scenarios.cooking.msg3",
                  emojis: [3, 4, 5],
                  time: "5:20 PM",
                },
                {
                  id: "ck4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.cooking.msg4",
                  emojis: [6, 7, 8],
                  time: "5:30 PM",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "picnic",
              icon: "🧺",
              titleKey: "category.examples.scenarios.picnic.title",
              subtitleKey: "category.examples.scenarios.picnic.subtitle",
              colorClass: "bg-green-100 dark:bg-green-900/30",
              messages: [
                {
                  id: "pc1",
                  sender: "friend",
                  name: "Friends",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.picnic.msg1",
                  emojis: [],
                  time: "10:00 AM",
                },
                {
                  id: "pc2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.picnic.msg2",
                  emojis: [0, 1, 2],
                  time: "10:05 AM",
                },
                {
                  id: "pc3",
                  sender: "friend",
                  name: "Friends",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.picnic.msg3",
                  emojis: [3, 4, 5],
                  time: "10:10 AM",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "cafe",
              icon: "☕",
              titleKey: "category.examples.scenarios.cafe.title",
              subtitleKey: "category.examples.scenarios.cafe.subtitle",
              colorClass: "bg-amber-100 dark:bg-amber-900/30",
              messages: [
                {
                  id: "cf1",
                  sender: "friend",
                  name: "Cafe buddy",
                  avatar: "C",
                  contentKey: "category.examples.scenarios.cafe.msg1",
                  emojis: [],
                  time: "3:00 PM",
                },
                {
                  id: "cf2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.cafe.msg2",
                  emojis: [0, 1, 2],
                  time: "3:10 PM",
                },
                {
                  id: "cf3",
                  sender: "friend",
                  name: "Cafe buddy",
                  avatar: "C",
                  contentKey: "category.examples.scenarios.cafe.msg3",
                  emojis: [3, 4, 5],
                  time: "3:15 PM",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "bakery",
              icon: "🥐",
              titleKey: "category.examples.scenarios.bakery.title",
              subtitleKey: "category.examples.scenarios.bakery.subtitle",
              colorClass: "bg-orange-100 dark:bg-orange-900/30",
              messages: [
                {
                  id: "bk1",
                  sender: "friend",
                  name: "Foodie",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.bakery.msg1",
                  emojis: [],
                  time: "8:00 AM",
                },
                {
                  id: "bk2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.bakery.msg2",
                  emojis: [0, 1, 2],
                  time: "8:05 AM",
                },
                {
                  id: "bk3",
                  sender: "friend",
                  name: "Foodie",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.bakery.msg3",
                  emojis: [3, 4, 5],
                  time: "8:10 AM",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
        "travel-places": {
          icon: "✈️",
          bgColorClass:
            "bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30",
          scenarios: [
            {
              id: "vacation",
              icon: "🌴",
              titleKey: "category.examples.scenarios.vacation.title",
              subtitleKey: "category.examples.scenarios.vacation.subtitle",
              colorClass: "bg-teal-100 dark:bg-teal-900/30",
              messages: [
                {
                  id: "vc1",
                  sender: "friend",
                  name: "TravelBuddy",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.vacation.msg1",
                  emojis: [],
                  time: "Yesterday",
                },
                {
                  id: "vc2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.vacation.msg2",
                  emojis: [0, 1, 2],
                  time: "Yesterday",
                },
                {
                  id: "vc3",
                  sender: "friend",
                  name: "TravelBuddy",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.vacation.msg3",
                  emojis: [3, 4, 5],
                  time: "Yesterday",
                },
                {
                  id: "vc4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.vacation.msg4",
                  emojis: [6, 7, 8],
                  time: "Yesterday",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "roadtrip",
              icon: "🚗",
              titleKey: "category.examples.scenarios.roadtrip.title",
              subtitleKey: "category.examples.scenarios.roadtrip.subtitle",
              colorClass: "bg-indigo-100 dark:bg-indigo-900/30",
              messages: [
                {
                  id: "rt1",
                  sender: "friend",
                  name: "RoadCrew",
                  avatar: "R",
                  contentKey: "category.examples.scenarios.roadtrip.msg1",
                  emojis: [],
                  time: "7:00 AM",
                },
                {
                  id: "rt2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.roadtrip.msg2",
                  emojis: [0, 1, 2],
                  time: "7:10 AM",
                },
                {
                  id: "rt3",
                  sender: "friend",
                  name: "RoadCrew",
                  avatar: "R",
                  contentKey: "category.examples.scenarios.roadtrip.msg3",
                  emojis: [3, 4, 5],
                  time: "7:20 AM",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "airport",
              icon: "🛫",
              titleKey: "category.examples.scenarios.airport.title",
              subtitleKey: "category.examples.scenarios.airport.subtitle",
              colorClass: "bg-sky-100 dark:bg-sky-900/30",
              messages: [
                {
                  id: "ap1",
                  sender: "friend",
                  name: "Family",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.airport.msg1",
                  emojis: [],
                  time: "8:00 AM",
                },
                {
                  id: "ap2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.airport.msg2",
                  emojis: [0, 1, 2],
                  time: "8:05 AM",
                },
                {
                  id: "ap3",
                  sender: "friend",
                  name: "Family",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.airport.msg3",
                  emojis: [3, 4, 5],
                  time: "8:10 AM",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "hotel",
              icon: "🏨",
              titleKey: "category.examples.scenarios.hotel.title",
              subtitleKey: "category.examples.scenarios.hotel.subtitle",
              colorClass: "bg-violet-100 dark:bg-violet-900/30",
              messages: [
                {
                  id: "ht1",
                  sender: "friend",
                  name: "TravelPal",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.hotel.msg1",
                  emojis: [],
                  time: "2:00 PM",
                },
                {
                  id: "ht2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.hotel.msg2",
                  emojis: [0, 1, 2],
                  time: "2:05 PM",
                },
                {
                  id: "ht3",
                  sender: "friend",
                  name: "TravelPal",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.hotel.msg3",
                  emojis: [3, 4, 5],
                  time: "2:10 PM",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
        activities: {
          icon: "⚽",
          bgColorClass:
            "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30",
          scenarios: [
            {
              id: "gaming",
              icon: "🎮",
              titleKey: "category.examples.scenarios.gaming.title",
              subtitleKey: "category.examples.scenarios.gaming.subtitle",
              colorClass: "bg-indigo-100 dark:bg-indigo-900/30",
              messages: [
                {
                  id: "gm1",
                  sender: "friend",
                  name: "Gamer",
                  avatar: "G",
                  contentKey: "category.examples.scenarios.gaming.msg1",
                  emojis: [],
                  time: "8:00 PM",
                },
                {
                  id: "gm2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.gaming.msg2",
                  emojis: [0, 1, 2],
                  time: "8:05 PM",
                },
                {
                  id: "gm3",
                  sender: "friend",
                  name: "Gamer",
                  avatar: "G",
                  contentKey: "category.examples.scenarios.gaming.msg3",
                  emojis: [3, 4, 5],
                  time: "8:15 PM",
                },
                {
                  id: "gm4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.gaming.msg4",
                  emojis: [6, 7, 8],
                  time: "8:20 PM",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "concert",
              icon: "🎵",
              titleKey: "category.examples.scenarios.concert.title",
              subtitleKey: "category.examples.scenarios.concert.subtitle",
              colorClass: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
              messages: [
                {
                  id: "ct1",
                  sender: "friend",
                  name: "MusicFan",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.concert.msg1",
                  emojis: [],
                  time: "7:00 PM",
                },
                {
                  id: "ct2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.concert.msg2",
                  emojis: [0, 1, 2],
                  time: "7:05 PM",
                },
                {
                  id: "ct3",
                  sender: "friend",
                  name: "MusicFan",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.concert.msg3",
                  emojis: [3, 4, 5],
                  time: "7:10 PM",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "sports",
              icon: "🏆",
              titleKey: "category.examples.scenarios.sports.title",
              subtitleKey: "category.examples.scenarios.sports.subtitle",
              colorClass: "bg-green-100 dark:bg-green-900/30",
              messages: [
                {
                  id: "sp1",
                  sender: "friend",
                  name: "Team",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.sports.msg1",
                  emojis: [],
                  time: "3:00 PM",
                },
                {
                  id: "sp2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.sports.msg2",
                  emojis: [0, 1, 2],
                  time: "3:10 PM",
                },
                {
                  id: "sp3",
                  sender: "friend",
                  name: "Team",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.sports.msg3",
                  emojis: [3, 4, 5],
                  time: "3:20 PM",
                },
                {
                  id: "sp4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.sports.msg4",
                  emojis: [6, 7, 8],
                  time: "3:30 PM",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "art",
              icon: "🎨",
              titleKey: "category.examples.scenarios.art.title",
              subtitleKey: "category.examples.scenarios.art.subtitle",
              colorClass: "bg-rose-100 dark:bg-rose-900/30",
              messages: [
                {
                  id: "ar1",
                  sender: "friend",
                  name: "Artist",
                  avatar: "A",
                  contentKey: "category.examples.scenarios.art.msg1",
                  emojis: [],
                  time: "10:00 AM",
                },
                {
                  id: "ar2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.art.msg2",
                  emojis: [0, 1, 2],
                  time: "10:15 AM",
                },
                {
                  id: "ar3",
                  sender: "friend",
                  name: "Artist",
                  avatar: "A",
                  contentKey: "category.examples.scenarios.art.msg3",
                  emojis: [3, 4, 5],
                  time: "10:30 AM",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
        objects: {
          icon: "💡",
          bgColorClass:
            "bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30",
          scenarios: [
            {
              id: "shopping",
              icon: "🛍️",
              titleKey: "category.examples.scenarios.shopping.title",
              subtitleKey: "category.examples.scenarios.shopping.subtitle",
              colorClass: "bg-rose-100 dark:bg-rose-900/30",
              messages: [
                {
                  id: "sh1",
                  sender: "friend",
                  name: "ShopPal",
                  avatar: "S",
                  contentKey: "category.examples.scenarios.shopping.msg1",
                  emojis: [],
                  time: "2:00 PM",
                },
                {
                  id: "sh2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.shopping.msg2",
                  emojis: [0, 1, 2],
                  time: "2:10 PM",
                },
                {
                  id: "sh3",
                  sender: "friend",
                  name: "ShopPal",
                  avatar: "S",
                  contentKey: "category.examples.scenarios.shopping.msg3",
                  emojis: [3, 4, 5],
                  time: "2:20 PM",
                },
                {
                  id: "sh4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.shopping.msg4",
                  emojis: [6, 7, 8],
                  time: "2:30 PM",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "gift",
              icon: "🎁",
              titleKey: "category.examples.scenarios.gift.title",
              subtitleKey: "category.examples.scenarios.gift.subtitle",
              colorClass: "bg-red-100 dark:bg-red-900/30",
              messages: [
                {
                  id: "gf1",
                  sender: "friend",
                  name: "BFF",
                  avatar: "B",
                  contentKey: "category.examples.scenarios.gift.msg1",
                  emojis: [],
                  time: "Dec 20",
                },
                {
                  id: "gf2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.gift.msg2",
                  emojis: [0, 1, 2],
                  time: "Dec 20",
                },
                {
                  id: "gf3",
                  sender: "friend",
                  name: "BFF",
                  avatar: "B",
                  contentKey: "category.examples.scenarios.gift.msg3",
                  emojis: [3, 4, 5],
                  time: "Dec 20",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "phone",
              icon: "📱",
              titleKey: "category.examples.scenarios.phone.title",
              subtitleKey: "category.examples.scenarios.phone.subtitle",
              colorClass: "bg-blue-100 dark:bg-blue-900/30",
              messages: [
                {
                  id: "ph1",
                  sender: "friend",
                  name: "TechGuru",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.phone.msg1",
                  emojis: [],
                  time: "Today",
                },
                {
                  id: "ph2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.phone.msg2",
                  emojis: [0, 1, 2],
                  time: "Today",
                },
                {
                  id: "ph3",
                  sender: "friend",
                  name: "TechGuru",
                  avatar: "T",
                  contentKey: "category.examples.scenarios.phone.msg3",
                  emojis: [3, 4, 5],
                  time: "Today",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "tech",
              icon: "💻",
              titleKey: "category.examples.scenarios.tech.title",
              subtitleKey: "category.examples.scenarios.tech.subtitle",
              colorClass: "bg-slate-100 dark:bg-slate-900/30",
              messages: [
                {
                  id: "tc1",
                  sender: "friend",
                  name: "Dev",
                  avatar: "D",
                  contentKey: "category.examples.scenarios.tech.msg1",
                  emojis: [],
                  time: "9:00 AM",
                },
                {
                  id: "tc2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.tech.msg2",
                  emojis: [0, 1, 2],
                  time: "9:10 AM",
                },
                {
                  id: "tc3",
                  sender: "friend",
                  name: "Dev",
                  avatar: "D",
                  contentKey: "category.examples.scenarios.tech.msg3",
                  emojis: [3, 4, 5],
                  time: "9:20 AM",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
        symbols: {
          icon: "❤️",
          bgColorClass:
            "bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30",
          scenarios: [
            {
              id: "zodiac",
              icon: "🔮",
              titleKey: "category.examples.scenarios.zodiac.title",
              subtitleKey: "category.examples.scenarios.zodiac.subtitle",
              colorClass: "bg-violet-100 dark:bg-violet-900/30",
              messages: [
                {
                  id: "zd1",
                  sender: "friend",
                  name: "AstroFan",
                  avatar: "A",
                  contentKey: "category.examples.scenarios.zodiac.msg1",
                  emojis: [],
                  time: "Today",
                },
                {
                  id: "zd2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.zodiac.msg2",
                  emojis: [0, 1, 2],
                  time: "Today",
                },
                {
                  id: "zd3",
                  sender: "friend",
                  name: "AstroFan",
                  avatar: "A",
                  contentKey: "category.examples.scenarios.zodiac.msg3",
                  emojis: [3, 4, 5],
                  time: "Today",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "lucky",
              icon: "🍀",
              titleKey: "category.examples.scenarios.lucky.title",
              subtitleKey: "category.examples.scenarios.lucky.subtitle",
              colorClass: "bg-green-100 dark:bg-green-900/30",
              messages: [
                {
                  id: "lk1",
                  sender: "friend",
                  name: "Lucky",
                  avatar: "L",
                  contentKey: "category.examples.scenarios.lucky.msg1",
                  emojis: [],
                  time: "Today",
                },
                {
                  id: "lk2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.lucky.msg2",
                  emojis: [0, 1, 2],
                  time: "Today",
                },
                {
                  id: "lk3",
                  sender: "friend",
                  name: "Lucky",
                  avatar: "L",
                  contentKey: "category.examples.scenarios.lucky.msg3",
                  emojis: [3, 4, 5],
                  time: "Today",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "newyear",
              icon: "🎊",
              titleKey: "category.examples.scenarios.newyear.title",
              subtitleKey: "category.examples.scenarios.newyear.subtitle",
              colorClass: "bg-yellow-100 dark:bg-yellow-900/30",
              messages: [
                {
                  id: "ny1",
                  sender: "friend",
                  name: "Friend",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.newyear.msg1",
                  emojis: [],
                  time: "New Year",
                },
                {
                  id: "ny2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.newyear.msg2",
                  emojis: [0, 1, 2],
                  time: "New Year",
                },
                {
                  id: "ny3",
                  sender: "friend",
                  name: "Friend",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.newyear.msg3",
                  emojis: [3, 4, 5],
                  time: "New Year",
                },
                {
                  id: "ny4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.newyear.msg4",
                  emojis: [6, 7, 8],
                  time: "New Year",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "love",
              icon: "💌",
              titleKey: "category.examples.scenarios.love.title",
              subtitleKey: "category.examples.scenarios.love.subtitle",
              colorClass: "bg-pink-100 dark:bg-pink-900/30",
              messages: [
                {
                  id: "lv1",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.love.msg1",
                  emojis: [0, 1, 2],
                  time: "Today",
                },
                {
                  id: "lv2",
                  sender: "friend",
                  name: "Love",
                  avatar: "L",
                  contentKey: "category.examples.scenarios.love.msg2",
                  emojis: [3, 4, 5],
                  time: "Today",
                },
                {
                  id: "lv3",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.love.msg3",
                  emojis: [6, 7, 8],
                  time: "Today",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
        flags: {
          icon: "🚩",
          bgColorClass:
            "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30",
          scenarios: [
            {
              id: "worldcup",
              icon: "⚽",
              titleKey: "category.examples.scenarios.worldcup.title",
              subtitleKey: "category.examples.scenarios.worldcup.subtitle",
              colorClass: "bg-emerald-100 dark:bg-emerald-900/30",
              messages: [
                {
                  id: "wc1",
                  sender: "friend",
                  name: "FanClub",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.worldcup.msg1",
                  emojis: [],
                  time: "Match Day",
                },
                {
                  id: "wc2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.worldcup.msg2",
                  emojis: [0, 1, 2],
                  time: "Match Day",
                },
                {
                  id: "wc3",
                  sender: "friend",
                  name: "FanClub",
                  avatar: "F",
                  contentKey: "category.examples.scenarios.worldcup.msg3",
                  emojis: [3, 4, 5],
                  time: "Match Day",
                },
                {
                  id: "wc4",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.worldcup.msg4",
                  emojis: [6, 7, 8],
                  time: "Match Day",
                },
              ],
              emojis: getEmojis(12, 0),
            },
            {
              id: "travel",
              icon: "🌍",
              titleKey: "category.examples.scenarios.travel.title",
              subtitleKey: "category.examples.scenarios.travel.subtitle",
              colorClass: "bg-cyan-100 dark:bg-cyan-900/30",
              messages: [
                {
                  id: "tr1",
                  sender: "friend",
                  name: "Explorer",
                  avatar: "E",
                  contentKey: "category.examples.scenarios.travel.msg1",
                  emojis: [],
                  time: "Today",
                },
                {
                  id: "tr2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.travel.msg2",
                  emojis: [0, 1, 2],
                  time: "Today",
                },
                {
                  id: "tr3",
                  sender: "friend",
                  name: "Explorer",
                  avatar: "E",
                  contentKey: "category.examples.scenarios.travel.msg3",
                  emojis: [3, 4, 5],
                  time: "Today",
                },
              ],
              emojis: getEmojis(12, 12),
            },
            {
              id: "global",
              icon: "🌏",
              titleKey: "category.examples.scenarios.global.title",
              subtitleKey: "category.examples.scenarios.global.subtitle",
              colorClass: "bg-blue-100 dark:bg-blue-900/30",
              messages: [
                {
                  id: "gl1",
                  sender: "friend",
                  name: "Global",
                  avatar: "G",
                  contentKey: "category.examples.scenarios.global.msg1",
                  emojis: [],
                  time: "Today",
                },
                {
                  id: "gl2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.global.msg2",
                  emojis: [0, 1, 2],
                  time: "Today",
                },
                {
                  id: "gl3",
                  sender: "friend",
                  name: "Global",
                  avatar: "G",
                  contentKey: "category.examples.scenarios.global.msg3",
                  emojis: [3, 4, 5],
                  time: "Today",
                },
              ],
              emojis: getEmojis(12, 24),
            },
            {
              id: "festival",
              icon: "🎭",
              titleKey: "category.examples.scenarios.festival.title",
              subtitleKey: "category.examples.scenarios.festival.subtitle",
              colorClass: "bg-orange-100 dark:bg-orange-900/30",
              messages: [
                {
                  id: "fv1",
                  sender: "friend",
                  name: "Culture",
                  avatar: "C",
                  contentKey: "category.examples.scenarios.festival.msg1",
                  emojis: [],
                  time: "Today",
                },
                {
                  id: "fv2",
                  sender: "me",
                  name: "Me",
                  avatar: "M",
                  contentKey: "category.examples.scenarios.festival.msg2",
                  emojis: [0, 1, 2],
                  time: "Today",
                },
                {
                  id: "fv3",
                  sender: "friend",
                  name: "Culture",
                  avatar: "C",
                  contentKey: "category.examples.scenarios.festival.msg3",
                  emojis: [3, 4, 5],
                  time: "Today",
                },
              ],
              emojis: getEmojis(12, 36),
            },
          ],
        },
      };
    }, [baseEmojis]);

  const currentCategoryConfig = useMemo(
    () => categoryConfigs[categorySlug] || categoryConfigs["smileys-emotion"],
    [categoryConfigs, categorySlug],
  );

  const selectedScenario = useMemo(
    () =>
      currentCategoryConfig.scenarios.find(
        (s) => s.id === selectedScenarioId,
      ) || currentCategoryConfig.scenarios[0],
    [currentCategoryConfig, selectedScenarioId],
  );

  const handleEmojiClick = useCallback(
    (emojiChar: string) => {
      const newSelected = new Set(selectedEmojis);
      newSelected.add(emojiChar);
      setSelectedEmojis(newSelected);
      copyToClipboard(emojiChar);
      setCopyFeedback(emojiChar);
      setTimeout(() => setCopyFeedback(null), 1500);
    },
    [copyToClipboard, selectedEmojis],
  );

  const clearSelection = useCallback(() => {
    setSelectedEmojis(new Set());
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [selectedEmojis, selectedScenarioId]);

  useEffect(() => {
    setSelectedScenarioId(
      currentCategoryConfig.scenarios[0]?.id || "scenario1",
    );
    setSelectedEmojis(new Set());
  }, [categorySlug, currentCategoryConfig]);

  return (
    <Card className="bg-primary/5 border-primary/20 overflow-hidden">
      <div className={cn("h-1.5", currentCategoryConfig.bgColorClass)} />
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {translations["category.examples.title"] || "Interactive Stories"}
          </CardTitle>
          <div className="flex gap-1.5 flex-wrap">
            {currentCategoryConfig.scenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => {
                  setSelectedScenarioId(scenario.id);
                  clearSelection();
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all border",
                  selectedScenarioId === scenario.id
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-primary/5",
                )}
              >
                <span className="text-sm">{scenario.icon}</span>
                <span className="hidden sm:inline">
                  {translations[scenario.titleKey] || scenario.titleKey}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl mt-2 transition-all",
            selectedScenario.colorClass,
          )}
        >
          <span className="text-2xl">{selectedScenario.icon}</span>
          <div className="flex-1">
            <div className="text-sm font-semibold">
              {translations[selectedScenario.titleKey] ||
                selectedScenario.titleKey}
            </div>
            <div className="text-xs text-muted-foreground">
              {translations[selectedScenario.subtitleKey] ||
                selectedScenario.subtitleKey}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {selectedScenario.messages.length} messages
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stories Live Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                Stories Preview
              </span>
              <Badge variant="outline" className="text-xs">
                {selectedEmojis.size > 0
                  ? `${selectedEmojis.size} reactions`
                  : "Tap to react!"}
              </Badge>
            </div>

            {/* Stories Container - Instagram Style */}
            <div className="rounded-2xl overflow-hidden border bg-gradient-to-b from-background to-muted/20 shadow-lg">
              {/* Progress Bar Indicators */}
              <div className="flex gap-1 p-2 bg-background/80 backdrop-blur-sm">
                {currentCategoryConfig.scenarios.map((scenario, _idx) => {
                  const isActive = scenario.id === selectedScenarioId;
                  const isPast = currentCategoryConfig.scenarios
                    .slice(
                      0,
                      currentCategoryConfig.scenarios.findIndex(
                        (s) => s.id === selectedScenarioId,
                      ),
                    )
                    .some((s) => s.id === scenario.id);

                  return (
                    <div
                      key={scenario.id}
                      className="flex-1 h-1 rounded-full overflow-hidden bg-muted"
                    >
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300 ease-linear",
                          isActive
                            ? "bg-primary w-full animate-pulse"
                            : isPast
                              ? "bg-primary w-full"
                              : "w-0",
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Stories Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 to-transparent">
                <div className="relative">
                  <img
                    src={getAvatarUrl(
                      selectedScenario.messages[0]?.name || "User",
                      getScenarioAvatarStyle(categorySlug, selectedScenarioId),
                    )}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full shadow-md ring-2 ring-background"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {selectedScenario.messages[0]?.name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground">8h</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {translations[selectedScenario.titleKey] ||
                      selectedScenario.titleKey}
                  </div>
                </div>
                <button
                  type="button"
                  className="p-2 hover:bg-muted/50 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>

              {/* Stories Content Card - Chat Dialog Style */}
              <div
                className="relative flex flex-col p-4 space-y-3"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--primary/5) 0%, 
                    var(--primary/10) 50%, 
                    var(--primary/5) 100%)`,
                }}
              >
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                </div>

                {/* Chat Messages */}
                <div className="relative z-10 space-y-3">
                  {selectedScenario.messages.map((message, idx) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2 animate-in slide-in-from-bottom-2",
                        message.sender === "me"
                          ? "flex-row-reverse"
                          : "flex-row",
                      )}
                      style={{ animationDelay: `${idx * 0.08}s` }}
                    >
                      {/* Avatar */}
                      <img
                        src={getAvatarUrl(
                          message.name,
                          message.sender === "me"
                            ? "avataaars"
                            : getScenarioAvatarStyle(
                                categorySlug,
                                selectedScenarioId,
                              ),
                        )}
                        alt={message.name}
                        className="w-7 h-7 rounded-full shadow-sm shrink-0"
                      />
                      <div
                        className={cn(
                          "max-w-[75%] space-y-1",
                          message.sender === "me" ? "items-end" : "items-start",
                        )}
                      >
                        {/* Name & Time */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground/70">
                            {message.sender === "me" ? "" : message.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground/50">
                            {message.time}
                          </span>
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                            message.sender === "me"
                              ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-sm"
                              : "bg-gradient-to-br from-background to-muted/80 rounded-tl-sm border",
                          )}
                        >
                          {/* Message text */}
                          <p className="leading-snug">
                            {translations[message.contentKey] ||
                              message.contentKey}
                          </p>

                          {/* Pre-defined emojis in message */}
                          {message.emojis.length > 0 && (
                            <div className="flex gap-0.5 mt-1 flex-wrap">
                              {message.emojis.map((emojiIdx) => {
                                const emoji =
                                  selectedScenario.emojis[
                                    emojiIdx % selectedScenario.emojis.length
                                  ];
                                return (
                                  <span
                                    key={emojiIdx}
                                    className="text-2xl sm:text-3xl"
                                  >
                                    {emoji?.emoji || "❓"}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* User selected emojis (only for "me" messages) */}
                        {selectedEmojis.size > 0 && message.sender === "me" && (
                          <div className="flex gap-0.5 flex-wrap justify-end">
                            {Array.from(selectedEmojis).map((emoji, eidx) => (
                              <span
                                key={eidx}
                                className="text-2xl sm:text-3xl animate-bounce filter drop-shadow-md"
                                style={{
                                  animationDelay: `${eidx * 0.1}s`,
                                }}
                              >
                                {emoji}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Empty state hint */}
                  {selectedEmojis.size === 0 && (
                    <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                      <Sparkles className="h-8 w-8 opacity-25 mb-1" />
                      <p className="text-xs text-center">
                        Tap emojis below to add reactions!
                      </p>
                    </div>
                  )}
                </div>

                {/* Reaction indicators at bottom */}
                {selectedEmojis.size > 0 && (
                  <div className="relative z-10 flex items-center justify-center gap-2 bg-background/60 backdrop-blur-sm py-2 px-4 rounded-full">
                    <div className="flex -space-x-2">
                      {Array.from(selectedEmojis)
                        .slice(0, 5)
                        .map((emoji, i) => (
                          <span
                            key={i}
                            className="text-2xl sm:text-3xl animate-pulse"
                            style={{
                              animationDelay: `${i * 0.1}s`,
                              transform: `translateY(${-i * 2}px)`,
                            }}
                          >
                            {emoji}
                          </span>
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {selectedEmojis.size}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Reaction Selection */}
            {selectedEmojis.size > 0 && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearSelection}
                  className="flex-1"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const allEmojis = Array.from(selectedEmojis).join(" ");
                    copyToClipboard(allEmojis);
                  }}
                  className="flex-1"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy All
                </Button>
              </div>
            )}
          </div>

          {/* Emoji Picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                Emoji Picker
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                Tap to use
              </span>
            </div>
            <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-4 border">
              <div className="grid grid-cols-4 gap-2">
                {selectedScenario.emojis.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleEmojiClick(item.emoji)}
                    className={cn(
                      "group relative flex flex-col items-center gap-1 p-2.5 rounded-lg transition-all duration-200",
                      "hover:scale-105 hover:shadow-md bg-background/80 backdrop-blur",
                      copyFeedback === item.emoji
                        ? "ring-2 ring-primary scale-105 shadow-lg"
                        : "",
                    )}
                  >
                    <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full text-center font-medium">
                      {item.label}
                    </span>
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg transition-all duration-200",
                        copyFeedback === item.emoji
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-50",
                      )}
                    >
                      <div className="bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded-full shadow-lg font-medium">
                        {copyFeedback === item.emoji ? "Copied!" : "Copy"}
                      </div>
                    </div>
                    {selectedEmojis.has(item.emoji) && (
                      <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-md">
                        <Heart className="h-2.5 w-2.5 fill-current" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3 text-xs text-muted-foreground border border-primary/10">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p>
              Each scenario has its own emoji picker! Select emojis to
              personalize your message preview.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
