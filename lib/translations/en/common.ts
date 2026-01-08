export const nav = {
  "common.nav.home": "Home",
  "common.nav.categories": "Categories",
  "common.nav.topics": "Topics",
  "common.nav.trending": "Trending",
  "common.nav.random": "Random",
  "common.nav.about": "About",
} as const;

export const footer = {
  "common.footer.features": "Features",
  "common.footer.resources": "Resources",
  "common.footer.legal": "Legal",
  "common.footer.privacy": "Privacy Policy",
  "common.footer.terms": "Terms of Service",
  "common.footer.copyright": "All rights reserved.",
  "common.footer.madeWith": "Made with ❤️ for emoji lovers",
  "common.footer.description":
    "The ultimate emoji collection. Browse, search, and copy thousands of emojis instantly. 100% free, no login required.",
  "common.footer.allEmojisAvailable": "All Emojis Available",
  "common.footer.browse": "Browse",
  "common.footer.allEmojis": "All Emojis",
  "common.footer.categories": "Categories",
  "common.footer.trending": "Trending",
  "common.footer.favorites": "Favorites",
  "common.footer.aboutUs": "About Us",
  "common.footer.contact": "Contact",
  "common.footer.faq": "FAQ",
  "common.footer.blog": "Blog",
  "common.footer.disclaimer": "Disclaimer",
  "common.footer.privacyPolicy": "Privacy Policy",
  "common.footer.termsOfService": "Terms of Service",
  "common.footer.smartSearch": "Smart Search",
  "common.footer.oneClickCopy": "One-Click Copy",
  "common.footer.multiLanguage": "Multi-Language",
  "common.footer.copyrightText": "All rights reserved.",
  "common.footer.freeNoLoginInstant": "100% Free · No Login · Instant Copy",
  "common.footer.free": "100% Free",
  "common.footer.noLogin": "No Login",
  "common.footer.instantCopy": "Instant Copy",
} as const;

export const trust = {
  "common.trust.largeCollection": "3000+ Emojis",
  "common.trust.instantCopy": "Instant Copy",
  "common.trust.freeForever": "100% Free",
  "common.trust.noLogin": "No Login Required",
  "common.trust.anonymous": "100% Anonymous",
  "common.trust.secure": "Secure & Encrypted",
  "common.trust.usersTrust": "1M+ Users Trust Us",
} as const;

export const categoryNames = {
  "common.category.all": "All Emojis",
  "common.category.smileys-emotion": "Smileys & Emotion",
  "common.category.people-body": "People & Body",
  "common.category.animals-nature": "Animals & Nature",
  "common.category.food-drink": "Food & Drink",
  "common.category.travel-places": "Travel & Places",
  "common.category.activities": "Activities",
  "common.category.objects": "Objects",
  "common.category.symbols": "Symbols",
  "common.category.flags": "Flags",
} as const;

export const search = {
  "common.search.placeholder": "Search emojis...",
  "common.search.copied": "Copied!",
  "common.search.copy": "Click to copy",
  "common.search.try": "Try:",
  "common.search.popular": "Popular",
  "common.search.trending": "Trending",
} as const;

export const tabs = {
  "common.tabs.all": "All",
  "common.tabs.smileys": "Smileys",
  "common.tabs.people": "People",
  "common.tabs.animals": "Animals",
  "common.tabs.food": "Food",
  "common.tabs.travel": "Travel",
  "common.tabs.activities": "Activities",
  "common.tabs.objects": "Objects",
  "common.tabs.symbols": "Symbols",
} as const;

export const header = {
  "common.header.categories": "Categories",
  "common.header.topics": "Topics",
  "common.header.allEmojis": "All Emojis",
  "common.header.all": "All",
  "common.header.emojiTopics": "Emoji Topics",
  "common.header.language": "Language",
  "common.header.openMenu": "Open menu",
  "common.header.closeMenu": "Close menu",
} as const;

export const common = {
  ...nav,
  ...footer,
  ...trust,
  ...categoryNames,
  ...search,
  ...tabs,
  ...header,
} as const;
