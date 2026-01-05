"use client";

import { useState, useCallback } from "react";

interface UseEmojiCopyReturn {
  copiedEmoji: string | null;
  copyCount: number;
  copyToClipboard: (emoji: string) => Promise<void>;
  showCopiedNotification: (emoji: string) => void;
}

export function useEmojiCopy(): UseEmojiCopyReturn {
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [copyCount, setCopyCount] = useState(0);

  const copyToClipboard = useCallback(async (emoji: string) => {
    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);
      setCopyCount((prev) => prev + 1);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedEmoji(null);
      }, 2000);
    } catch {
      console.error("Failed to copy emoji");
    }
  }, []);

  const showCopiedNotification = useCallback((emoji: string) => {
    setCopiedEmoji(emoji);
    setTimeout(() => {
      setCopiedEmoji(null);
    }, 1500);
  }, []);

  return {
    copiedEmoji,
    copyCount,
    copyToClipboard,
    showCopiedNotification,
  };
}

interface FavoriteEmoji {
  id: string;
  char: string;
  name: string;
  addedAt: number;
}

const FAVORITES_KEY = "cybermoji_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteEmoji[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addFavorite = useCallback(
    (emoji: { id: string; char: string; name: string }) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.id === emoji.id)) return prev;

        const newFavorites = [{ ...emoji, addedAt: Date.now() }, ...prev].slice(
          0,
          100,
        ); // Limit to 100 favorites

        if (typeof window !== "undefined") {
          localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        }

        return newFavorites;
      });
    },
    [],
  );

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((f) => f.id !== id);

      if (typeof window !== "undefined") {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }

      return newFavorites;
    });
  }, []);

  const toggleFavorite = useCallback(
    (emoji: { id: string; char: string; name: string }) => {
      if (favorites.some((f) => f.id === emoji.id)) {
        removeFavorite(emoji.id);
      } else {
        addFavorite(emoji);
      }
    },
    [favorites, addFavorite, removeFavorite],
  );

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites],
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(FAVORITES_KEY);
    }
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}
