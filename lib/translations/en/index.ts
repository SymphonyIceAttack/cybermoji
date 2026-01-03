export const common = {
  "nav.home": "Home",
  "nav.guides": "Guides",
  "nav.blog": "Blog",
  "nav.startViewing": "Start Viewing",
  "footer.features": "Features",
  "footer.resources": "Resources",
  "footer.legal": "Legal",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.copyright": "All rights reserved.",
  "footer.notAffiliated": "Not affiliated with Instagram or Meta.",
  "trust.anonymous": "100% Anonymous",
  "trust.secure": "Secure & Encrypted",
  "trust.noLogin": "No Login Required",
  "trust.users": "1M+ Users Trust Us",
  "cta.ready": "Ready to Browse Anonymously?",
  "cta.subtitle":
    "Join millions of users who trust duckinsview for private Instagram viewing.",
  "cta.button": "Start Viewing Now",
  "features.profileViewing": "Profile Viewing",
  "features.profileSubtitle": "Browse any public profile anonymously",
  "features.storyViewing": "Story Viewing",
  "features.storySubtitle": "Watch stories without being seen",
  "features.reelsDownload": "Reels Download",
  "features.reelsSubtitle": "Save reels in high quality",
  "features.highlightsBrowser": "Highlights Browser",
  "features.highlightsSubtitle": "Explore saved story collections",
  "features.postsViewer": "Post Viewer & Downloader",
  "features.postsSubtitle": "View and save photos & videos",
  "moreReasons.completePrivacy": "Complete Privacy",
  "moreReasons.completePrivacyDesc":
    "Your identity is never revealed. No login, no cookies tracking your activity.",
  "moreReasons.lightningFast": "Lightning Fast",
  "moreReasons.lightningFastDesc":
    "Optimized servers deliver content in seconds. No waiting, instant results.",
  "moreReasons.worksWorldwide": "Works Worldwide",
  "moreReasons.worksWorldwideDesc":
    "Access from any country. No geo-restrictions or VPN needed.",
  "moreReasons.alwaysAvailable": "Always Available",
  "moreReasons.alwaysAvailableDesc":
    "24/7 uptime. Our service is always ready when you need it.",
  "moreReasons.secureConnection": "Secure Connection",
  "moreReasons.secureConnectionDesc":
    "All data transmitted over encrypted HTTPS connections.",
  "moreReasons.freeForever": "Free Forever",
  "moreReasons.freeForeverDesc":
    "Core features are completely free. No hidden fees or premium requirements.",
  "howItWorks.step1": "1",
  "howItWorks.step1Title": "Enter Username",
  "howItWorks.step1Desc":
    "Type the Instagram username you want to view in the search box above.",
  "howItWorks.step2": "2",
  "howItWorks.step2Title": "Browse Content",
  "howItWorks.step2Desc":
    "View their profile, posts, stories, reels, and highlights anonymously.",
  "howItWorks.step3": "3",
  "howItWorks.step3Title": "Download (Optional)",
  "howItWorks.step3Desc":
    "Save any content you like with our one-click download feature.",
  "faq.features": "Features & Functionality",
  "faq.privacy": "Privacy & Security",
  "faq.technical": "Technical Support",
  "search.placeholder": "Enter Instagram username",
  "search.viewProfile": "View Profile",
  "search.try": "Try:",
  "search.anonymous": "Anonymous",
  "tabs.posts": "Posts",
  "tabs.stories": "Stories",
  "tabs.reels": "Reels",
  "tabs.highlights": "Highlights",
  "posts.posts": "Posts",
  "posts.followers": "Followers",
  "posts.following": "Following",
  "posts.noActiveStories": "No active stories",
  "posts.save": "Save",
  "posts.verified": "Verified",
} as const;

export const home = {
  "hero.title": "View Instagram Anonymously, Without an Account",
  "hero.subtitle":
    "Browse Instagram profiles, stories, reels, and highlights privately. No login required. No trace left behind. 100% free.",
  "features.title": "Everything You Need to Browse Instagram Privately",
  "features.subtitle":
    "duckinsview offers a complete suite of tools for anonymous Instagram browsing.",
  "moreReasons.title": "More Reasons to Choose duckinsview",
  "moreReasons.subtitle":
    "Beyond the core features, here's what makes duckinsview the best choice for anonymous Instagram browsing.",
  "howItWorks.title": "How It Works",
  "howItWorks.subtitle":
    "Start viewing Instagram content anonymously in just 3 simple steps.",
  "faq.title": "Frequently Asked Questions",
  "faq.subtitle": "Find quick answers to common questions about duckinsview.",
  "profile.bio": "Bio",
  postsCount: "Posts",
} as const;

export const privacy = {
  title: "Privacy Policy",
  description: "Learn how duckinsview protects your privacy and handles data.",
} as const;

export const terms = {
  title: "Terms of Service",
  description: "Terms and conditions for using duckinsview.",
} as const;

export const blog = {
  title: "Blog",
  description: "Latest news and guides from duckinsview.",
} as const;

export const guides = {
  anonymousStories: "Anonymous Story Viewing",
  competitorAnalysis: "Competitor Analysis",
  noAccountNeeded: "No Account Needed",
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
