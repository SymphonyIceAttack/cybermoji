export const nav = {
  "common.nav.home": "首页",
  "common.nav.categories": "分类",
  "common.nav.topics": "主题",
  "common.nav.trending": "热门",
  "common.nav.random": "随机",
  "common.nav.about": "关于",
} as const;

export const footer = {
  "common.footer.features": "功能",
  "common.footer.resources": "资源",
  "common.footer.legal": "法律",
  "common.footer.privacy": "隐私政策",
  "common.footer.terms": "服务条款",
  "common.footer.copyright": "版权所有。",
  "common.footer.madeWith": "为表情爱好者 ❤️ 打造",
  "common.footer.description":
    "终极表情集合。立即浏览、搜索和复制数千个表情。100% 免费，无需登录。",
  "common.footer.allEmojisAvailable": "所有表情可用",
  "common.footer.browse": "浏览",
  "common.footer.allEmojis": "所有表情",
  "common.footer.categories": "分类",
  "common.footer.trending": "热门",
  "common.footer.favorites": "收藏",
  "common.footer.aboutUs": "关于我们",
  "common.footer.contact": "联系我们",
  "common.footer.faq": "常见问题",
  "common.footer.blog": "博客",
  "common.footer.disclaimer": "免责声明",
  "common.footer.privacyPolicy": "隐私政策",
  "common.footer.termsOfService": "服务条款",
  "common.footer.smartSearch": "智能搜索",
  "common.footer.oneClickCopy": "一键复制",
  "common.footer.multiLanguage": "多语言支持",
  "common.footer.copyrightText": "版权所有。",
  "common.footer.freeNoLoginInstant": "100% 免费 · 无需登录 · 即时复制",
  "common.footer.free": "100% 免费",
  "common.footer.noLogin": "无需登录",
  "common.footer.instantCopy": "即时复制",
} as const;

export const trust = {
  "common.trust.largeCollection": "3000+ 表情",
  "common.trust.instantCopy": "即时复制",
  "common.trust.freeForever": "完全免费",
  "common.trust.noLogin": "无需登录",
  "common.trust.anonymous": "100% 匿名",
  "common.trust.secure": "安全加密",
  "common.trust.usersTrust": "100万+ 用户信任我们",
} as const;

export const categoryNames = {
  "common.category.all": "所有表情",
  "common.category.smileys-emotion": "笑脸与情感",
  "common.category.people-body": "人与身体",
  "common.category.animals-nature": "动物与自然",
  "common.category.food-drink": "美食与饮品",
  "common.category.travel-places": "旅行与地点",
  "common.category.activities": "活动",
  "common.category.objects": "物品",
  "common.category.symbols": "符号",
  "common.category.flags": "旗帜",
} as const;

export const search = {
  "common.search.placeholder": "搜索表情...",
  "common.search.copied": "已复制！",
  "common.search.copy": "点击复制",
  "common.search.try": "试试：",
  "common.search.popular": "热门",
  "common.search.trending": "趋势",
} as const;

export const tabs = {
  "common.tabs.all": "全部",
  "common.tabs.smileys": "笑脸",
  "common.tabs.people": "人物",
  "common.tabs.animals": "动物",
  "common.tabs.food": "美食",
  "common.tabs.travel": "旅行",
  "common.tabs.activities": "活动",
  "common.tabs.objects": "物品",
  "common.tabs.symbols": "符号",
} as const;

export const header = {
  "common.header.categories": "分类",
  "common.header.topics": "主题",
  "common.header.allEmojis": "所有表情",
  "common.header.all": "全部",
  "common.header.emojiTopics": "表情主题",
  "common.header.language": "语言",
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
