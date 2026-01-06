export const topic = {
  "topic.indexTitle": "Emoji Topics",
  "topic.indexDescription":
    "Explore beautiful emoji combinations organized by theme. Click any topic to browse its emoji art and combinations.",
  "topic.tapToCopy": "Tap to copy",
  "topic.longPress": "Long-press to select multiple",
  "topic.relatedTopics": "Related Topics",
  "topic.primaryEmoji": "primary emoji",
  "topic.primaryEmojis": "primary emojis",
  "topic.combinations": "combination",
  "topic.combinationsCount": "{count} combination{plural}",
  "topic.noResults": "No combinations found for",
  "topic.popularity": "Popularity:",
  "topic.browseEmojis": "Browse and copy {topicName} emoji combinations.",
  "topic.clickToCopy": "Click any combination to copy it to your clipboard.",
  "topic.browseCategory":
    "Browse and copy {categoryName}. Click any emoji to copy it to your clipboard.",
} as const;

export const category = {
  "category.browseAndCopy":
    "Browse and copy {categoryName}. Click any emoji to copy it to your clipboard.",
} as const;

export const topicPage = {
  "topicPage.features.mainTitle": "Features",
  "topicPage.features.mainTitle2": "Everything You Need",
  "topicPage.features.mainTitle3": "For Emoji Excellence",
  "topicPage.features.mainDesc":
    "Powerful tools for discovering, organizing, and using emojis efficiently.",
  "topicPage.features.browseTitle": "Browse All Categories",
  "topicPage.features.browseSubtitle": "Explore every emoji type",
  "topicPage.features.browseDesc":
    "Browse emojis organized by categories: Smileys, Hearts, Gestures, Nature, Food, Activities, Travel, Objects, and Symbols.",
  "topicPage.features.browseList": [
    "9 main categories",
    "Hundreds of subcategories",
    "Easy navigation",
    "Quick access to favorites",
  ],
  "topicPage.features.searchTitle": "Smart Search",
  "topicPage.features.searchSubtitle": "Find emojis instantly",
  "topicPage.features.searchDesc":
    "Search emojis by name, keyword, or description. Our intelligent search finds the perfect emoji for any situation.",
  "topicPage.features.searchList": [
    "Keyword search",
    "Synonym matching",
    "Instant results",
    "Search history",
  ],
  "topicPage.features.copyTitle": "One-Click Copy",
  "topicPage.features.copySubtitle": "Copy with a single tap",
  "topicPage.features.copyDesc":
    "Click any emoji to copy it to your clipboard instantly. Paste it anywhere - chats, social media, documents, and more.",
  "topicPage.features.copyList": [
    "Instant copy",
    "Copied notification",
    "Batch copy mode",
    "Keyboard shortcuts",
  ],
  "topicPage.features.favoritesTitle": "Favorites Collection",
  "topicPage.features.favoritesSubtitle": "Save your go-to emojis",
  "topicPage.features.favoritesDesc":
    "Build your personal collection of favorite emojis. Access them instantly from the favorites section.",
  "topicPage.features.favoritesList": [
    "Unlimited favorites",
    "Quick access",
    "Cross-device sync",
    "Export options",
  ],
  "topicPage.features.privacyTitle": "Privacy First",
  "topicPage.features.privacyDesc":
    "No tracking, no data collection. Your browsing stays completely private.",
  "topicPage.features.speedTitle": "Lightning Fast",
  "topicPage.features.speedDesc":
    "Optimized for speed. Find and copy emojis in milliseconds.",
  "topicPage.features.mobileTitle": "Mobile Friendly",
  "topicPage.features.mobileDesc":
    "Works perfectly on all devices - phone, tablet, or desktop.",
  "topicPage.features.updatedTitle": "Always Updated",
  "topicPage.features.updatedDesc":
    "New emojis added regularly as they're released by Unicode.",
  "topicPage.features.langTitle": "Multi-Language",
  "topicPage.features.langDesc":
    "Support for multiple languages and regional emoji variations.",
  "topicPage.features.noAccountTitle": "No Account Needed",
  "topicPage.features.noAccountDesc":
    "Use immediately without sign-up. No login, no passwords.",
} as const;

export const topics = {
  ...topic,
  ...topicPage,
} as const;
