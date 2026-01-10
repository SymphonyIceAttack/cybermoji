export const nav = {
  "common.nav.home": "ホーム",
  "common.nav.categories": "カテゴリ",
  "common.nav.topics": "トピック",
  "common.nav.trending": "トレンド",
  "common.nav.random": "ランダム",
  "common.nav.about": "概要",
  "common.nav.all": "すべて",
  "common.nav.emojiTopics": "絵文字トピック",
  "common.nav.language": "言語",
} as const;

export const footer = {
  "common.footer.features": "機能",
  "common.footer.resources": "リソース",
  "common.footer.legal": "法的情報",
  "common.footer.privacy": "プライバシーポリシー",
  "common.footer.terms": "利用規約",
  "common.footer.copyright": "無断複写・転載を禁じます。",
  "common.footer.madeWith": "❤️ 絵文字愛好家のために作成",
  "common.footer.description":
    "究極の絵文字コレクション。数千の絵文字を即座に閲覧、検索、コピー。100%無料、ログイン不要。",
  "common.footer.allEmojisAvailable": "すべての絵文字が利用可能",
  "common.footer.browse": "閲覧",
  "common.footer.allEmojis": "すべての絵文字",
  "common.footer.categories": "カテゴリ",
  "common.footer.trending": "トレンド",
  "common.footer.favorites": "お気に入り",
  "common.footer.aboutUs": "概要",
  "common.footer.contact": "お問い合わせ",
  "common.footer.faq": "よくある質問",
  "common.footer.disclaimer": "免責事項",
  "common.footer.privacyPolicy": "プライバシーポリシー",
  "common.footer.termsOfService": "利用規約",
  "common.footer.smartSearch": "スマート検索",
  "common.footer.oneClickCopy": "ワンクリックコピー",
  "common.footer.multiLanguage": "多言語対応",
  "common.footer.copyrightText": "無断複写・転載を禁じます。",
  "common.footer.freeNoLoginInstant": "100%無料 · ログイン不要 · 即座にコピー",
  "common.footer.free": "100%無料",
  "common.footer.noLogin": "ログイン不要",
  "common.footer.instantCopy": "即座にコピー",
  "common.footer.contactEmail": "hello@cybermoji.org",
} as const;

export const trust = {
  "common.trust.largeCollection": "3000+ 絵文字",
  "common.trust.instantCopy": "即座にコピー",
  "common.trust.freeForever": "100% 無料",
  "common.trust.noLogin": "ログイン不要",
  "common.trust.anonymous": "100% 匿名",
  "common.trust.secure": "安全な暗号化",
  "common.trust.usersTrust": "100万以上のユーザー",
} as const;

export const categoryNames = {
  "common.category.all": "すべての絵文字",
  "common.category.smileys-emotion": "顔文字と感情",
  "common.category.people-body": "人と体",
  "common.category.animals-nature": "動物と自然",
  "common.category.food-drink": "食べ物と飲み物",
  "common.category.travel-places": "旅行と場所",
  "common.category.activities": "活動",
  "common.category.objects": "オブジェクト",
  "common.category.symbols": "記号",
  "common.category.flags": "旗",
} as const;

export const search = {
  "common.search.placeholder": "絵文字を検索...",
  "common.search.copied": "コピーしました！",
  "common.search.copy": "クリックしてコピー",
  "common.search.try": "试试：",
  "common.search.popular": "人気",
  "common.search.trending": "トレンド",
} as const;

export const tabs = {
  "common.tabs.all": "すべて",
  "common.tabs.smileys": "顔文字",
  "common.tabs.people": "人々",
  "common.tabs.animals": "動物",
  "common.tabs.food": "食べ物",
  "common.tabs.travel": "旅行",
  "common.tabs.activities": "活動",
  "common.tabs.objects": "オブジェクト",
  "common.tabs.symbols": "記号",
} as const;

export const header = {
  "common.header.categories": "カテゴリ",
  "common.header.topics": "トピック",
  "common.header.allEmojis": "すべての絵文字",
  "common.header.all": "すべて",
  "common.header.emojiTopics": "絵文字トピック",
  "common.header.language": "言語",
  "common.header.openMenu": "メニューを開く",
  "common.header.closeMenu": "メニューを閉じる",
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
