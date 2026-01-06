import { z } from "zod";

export const browserSchema = z.object({
  "browser.all": z.string(),
  "browser.favorites": z.string(),
  "browser.trending": z.string(),
  "browser.recent": z.string(),
  "browser.combinations": z.string(),
  "browser.searchPlaceholder": z.string(),
  "browser.details": z.string(),
  "browser.subgroup": z.string(),
  "browser.allSubgroups": z.string(),
  "browser.emojiCount": z.string(),
  "browser.foundFor": z.string(),
  "browser.noFavorites": z.string(),
  "browser.noEmojisFound": z.string(),
  "browser.addFavoriteHint": z.string(),
  "browser.previousPage": z.string(),
  "browser.nextPage": z.string(),
  "browser.showDetails": z.string(),
  "browser.copyToClipboard": z.string(),
});

export const modalSchema = z.object({
  "modal.copied": z.string(),
  "modal.copyToClipboard": z.string(),
  "modal.skinTone": z.string(),
  "modal.tags": z.string(),
  "modal.text": z.string(),
  "modal.combinationEmoji": z.string(),
  "modal.combinationDesc": z.string(),
  "modal.default": z.string(),
  "modal.close": z.string(),
});

// Combined emojiBrowser schema for validation
export const emojiBrowserSchema = z.object({
  ...browserSchema.shape,
  ...modalSchema.shape,
});
