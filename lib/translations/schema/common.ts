import { z } from "zod";

export const navSchema = z.object({
  "common.nav.home": z.string(),
  "common.nav.categories": z.string(),
  "common.nav.topics": z.string(),
  "common.nav.trending": z.string(),
  "common.nav.random": z.string(),
  "common.nav.about": z.string(),
  "common.nav.all": z.string(),
  "common.nav.emojiTopics": z.string(),
  "common.nav.language": z.string(),
});

export const footerSchema = z.object({
  "common.footer.features": z.string(),
  "common.footer.resources": z.string(),
  "common.footer.legal": z.string(),
  "common.footer.privacy": z.string(),
  "common.footer.terms": z.string(),
  "common.footer.copyright": z.string(),
  "common.footer.madeWith": z.string(),
  "common.footer.description": z.string(),
  "common.footer.allEmojisAvailable": z.string(),
  "common.footer.browse": z.string(),
  "common.footer.allEmojis": z.string(),
  "common.footer.categories": z.string(),
  "common.footer.trending": z.string(),
  "common.footer.favorites": z.string(),
  "common.footer.aboutUs": z.string(),
  "common.footer.contact": z.string(),
  "common.footer.faq": z.string(),
  "common.footer.disclaimer": z.string(),
  "common.footer.privacyPolicy": z.string(),
  "common.footer.termsOfService": z.string(),
  "common.footer.smartSearch": z.string(),
  "common.footer.oneClickCopy": z.string(),
  "common.footer.multiLanguage": z.string(),
  "common.footer.copyrightText": z.string(),
  "common.footer.freeNoLoginInstant": z.string(),
  "common.footer.free": z.string(),
  "common.footer.noLogin": z.string(),
  "common.footer.instantCopy": z.string(),
  "common.footer.contactEmail": z.string(),
});

export const headerSchema = z.object({
  "common.header.categories": z.string(),
  "common.header.topics": z.string(),
  "common.header.allEmojis": z.string(),
  "common.header.all": z.string(),
  "common.header.emojiTopics": z.string(),
  "common.header.language": z.string(),
  "common.header.openMenu": z.string(),
  "common.header.closeMenu": z.string(),
});

export const trustSchema = z.object({
  "common.trust.largeCollection": z.string(),
  "common.trust.instantCopy": z.string(),
  "common.trust.freeForever": z.string(),
  "common.trust.noLogin": z.string(),
  "common.trust.anonymous": z.string(),
  "common.trust.secure": z.string(),
  "common.trust.usersTrust": z.string(),
});

export const categoryNamesSchema = z.object({
  "common.category.all": z.string(),
  "common.category.smileys-emotion": z.string(),
  "common.category.people-body": z.string(),
  "common.category.animals-nature": z.string(),
  "common.category.food-drink": z.string(),
  "common.category.travel-places": z.string(),
  "common.category.activities": z.string(),
  "common.category.objects": z.string(),
  "common.category.symbols": z.string(),
  "common.category.flags": z.string(),
});

export const searchSchema = z.object({
  "common.search.placeholder": z.string(),
  "common.search.copied": z.string(),
  "common.search.copy": z.string(),
  "common.search.try": z.string(),
  "common.search.popular": z.string(),
  "common.search.trending": z.string(),
});

export const tabsSchema = z.object({
  "common.tabs.all": z.string(),
  "common.tabs.smileys": z.string(),
  "common.tabs.people": z.string(),
  "common.tabs.animals": z.string(),
  "common.tabs.food": z.string(),
  "common.tabs.travel": z.string(),
  "common.tabs.activities": z.string(),
  "common.tabs.objects": z.string(),
  "common.tabs.symbols": z.string(),
});

// Combined common schema for validation
export const commonSchema = z.object({
  ...navSchema.shape,
  ...footerSchema.shape,
  ...trustSchema.shape,
  ...categoryNamesSchema.shape,
  ...searchSchema.shape,
  ...tabsSchema.shape,
  ...headerSchema.shape,
});
