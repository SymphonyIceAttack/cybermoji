export const common = {
  "nav.home": "Home",
  "nav.categories": "Categories",
  "nav.trending": "Trending",
  "nav.random": "Random",
  "nav.about": "About",
  "footer.features": "Features",
  "footer.resources": "Resources",
  "footer.legal": "Legal",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.copyright": "All rights reserved.",
  "footer.madeWith": "Made with ❤️ for emoji lovers",
  "trust.largeCollection": "3000+ Emojis",
  "trust.instantCopy": "Instant Copy",
  "trust.freeForever": "100% Free",
  "trust.noLogin": "No Login Required",
  "cta.ready": "Ready to Express Yourself?",
  "cta.subtitle":
    "Browse thousands of emojis, copy instantly, and add flair to your messages.",
  "cta.button": "Start Browsing",
  "features.search": "Smart Search",
  "features.searchSubtitle":
    "Find the perfect emoji by keyword, mood, or category",
  "features.categories": "Organized Categories",
  "features.categoriesSubtitle":
    "Browse emojis organized by theme for easy discovery",
  "features.instantCopy": "One-Click Copy",
  "features.instantCopySubtitle":
    "Click any emoji to copy it to your clipboard instantly",
  "features.trending": "Trending Emojis",
  "features.trendingSubtitle": "See what emojis are hot right now",
  "moreReasons.crossPlatform": "Works Everywhere",
  "moreReasons.crossPlatformDesc":
    "Emojis work on all devices and platforms. Copy once, use anywhere.",
  "moreReasons.alwaysUpdated": "Always Updated",
  "moreReasons.alwaysUpdatedDesc":
    "We add new emojis as soon as they are released by Unicode.",
  "moreReasons.lightningFast": "Lightning Fast",
  "moreReasons.lightningFastDesc":
    "No loading, no waiting. Find and copy emojis in milliseconds.",
  "moreReasons.noAds": "No Ads, No Tracking",
  "moreReasons.noAdsDesc":
    "Clean, focused experience without distractions or privacy invasions.",
  "moreReasons.darkMode": "Dark Mode",
  "moreReasons.darkModeDesc": "Easy on the eyes with our beautiful dark theme.",
  "moreReasons.secureConnection": "Secure Connection",
  "moreReasons.secureConnectionDesc":
    "All data transmitted over encrypted HTTPS connections.",
  "moreReasons.freeForever": "Free Forever",
  "moreReasons.freeForeverDesc":
    "Core features are completely free. No hidden fees or premium requirements.",
  "howItWorks.step1": "1",
  "howItWorks.step1Title": "Browse or Search",
  "howItWorks.step1Desc":
    "Use categories or search to find the emoji you want.",
  "howItWorks.step2": "2",
  "howItWorks.step2Title": "Click to Copy",
  "howItWorks.step2Desc":
    "Simply click on any emoji to copy it to your clipboard.",
  "howItWorks.step3": "3",
  "howItWorks.step3Title": "Paste Anywhere",
  "howItWorks.step3Desc": "Paste the emoji anywhere you want to use it.",
  "faq.categories": "Categories & Search",
  "faq.using": "Using Cybermoji",
  "faq.technical": "Technical Support",
  "search.placeholder": "Search emojis...",
  "search.copied": "Copied!",
  "search.copy": "Click to copy",
  "search.try": "Try:",
  "search.popular": "Popular",
  "search.trending": "Trending",
  "tabs.all": "All",
  "tabs.smileys": "Smileys",
  "tabs.people": "People",
  "tabs.animals": "Animals",
  "tabs.food": "Food",
  "tabs.travel": "Travel",
  "tabs.activities": "Activities",
  "tabs.objects": "Objects",
  "tabs.symbols": "Symbols",
} as const;

export const home = {
  "hero.title": "The Ultimate Emoji Collection",
  "hero.subtitle":
    "Browse, search, and copy thousands of emojis. Find the perfect expression for every moment. 100% free, no login required.",
  "features.title": "Everything You Need to Express Yourself",
  "features.subtitle":
    "Cybermoji offers the most comprehensive emoji browsing experience.",
  "moreReasons.title": "More Reasons to Choose Cybermoji",
  "moreReasons.subtitle":
    "Beyond the core features, here's what makes Cybermoji the best choice for emoji lovers.",
  "howItWorks.title": "How It Works",
  "howItWorks.subtitle":
    "Find and use the perfect emoji in just 3 simple steps.",
  "faq.title": "Frequently Asked Questions",
  "faq.subtitle": "Find quick answers to common questions about Cybermoji.",
  "trending.title": "Trending Emojis",
  "trending.subtitle": "See what emojis are popular right now",
  "categories.title": "Browse by Category",
  "categories.subtitle": "Find emojis organized by theme",
} as const;

export const privacy = {
  title: "Privacy Policy",
  description: "Learn how Cybermoji protects your privacy and handles data.",
} as const;

export const terms = {
  title: "Terms of Service",
  description: "Terms and conditions for using Cybermoji.",
} as const;

export const blog = {
  title: "Blog",
  description: "Latest news and updates from Cybermoji.",
} as const;

export const guides = {
  emojiBasics: "Emoji Basics",
  emojiTrends: "Emoji Trends",
  expressionGuide: "How to Express Yourself with Emojis",
} as const;

const en = {
  common,
  home,
  privacy,
  terms,
  blog,
  guides,
} as const;

export type En = typeof en;
export default en;
