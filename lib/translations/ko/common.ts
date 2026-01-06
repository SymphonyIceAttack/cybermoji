export const nav = {
  "common.nav.home": "홈",
  "common.nav.categories": "카테고리",
  "common.nav.topics": "주제",
  "common.nav.trending": "트렌드",
  "common.nav.random": "랜덤",
  "common.nav.about": "소개",
} as const;

export const footer = {
  "common.footer.features": "기능",
  "common.footer.resources": "리소스",
  "common.footer.legal": "법적 정보",
  "common.footer.privacy": "개인정보 처리방침",
  "common.footer.terms": "서비스 약관",
  "common.footer.copyright": "모든 권리 보유.",
  "common.footer.madeWith": "❤️ 이모지 애호가를 위해 만들었습니다",
  "common.footer.description":
    "최고의 이모지 컬렉션. 수천 개의 이모지를 즉시 검색, 찾아보기고 복사하세요. 100% 무료, 로그인 불필요.",
  "common.footer.allEmojisAvailable": "모든 이모지 이용 가능",
  "common.footer.browse": "찾아보기",
  "common.footer.allEmojis": "모든 이모지",
  "common.footer.categories": "카테고리",
  "common.footer.trending": "트렌드",
  "common.footer.favorites": "즐겨찾기",
  "common.footer.aboutUs": "소개",
  "common.footer.contact": "연락처",
  "common.footer.faq": "자주 묻는 질문",
  "common.footer.blog": "블로그",
  "common.footer.disclaimer": "면책 조항",
  "common.footer.privacyPolicy": "개인정보 처리방침",
  "common.footer.termsOfService": "서비스 약관",
  "common.footer.smartSearch": "스마트 검색",
  "common.footer.oneClickCopy": "원 클릭 복사",
  "common.footer.multiLanguage": "다국어 지원",
  "common.footer.copyrightText": "모든 권리 보유.",
  "common.footer.freeNoLoginInstant": "100% 무료 · 로그인 불필요 · 즉시 복사",
  "common.footer.free": "100% 무료",
  "common.footer.noLogin": "로그인 불필요",
  "common.footer.instantCopy": "즉시 복사",
} as const;

export const trust = {
  "common.trust.largeCollection": "3000+ 이모지",
  "common.trust.instantCopy": "즉시 복사",
  "common.trust.freeForever": "100% 무료",
  "common.trust.noLogin": "로그인 필요 없음",
  "common.trust.anonymous": "100% 익명",
  "common.trust.secure": "안전한 암호화",
  "common.trust.usersTrust": "100만+ 사용자 신뢰",
} as const;

export const categoryNames = {
  "common.category.all": "모든 이모지",
  "common.category.smileys-emotion": "스마일리와 감정",
  "common.category.people-body": "사람과 몸",
  "common.category.animals-nature": "동물과 자연",
  "common.category.food-drink": "음식과 음료",
  "common.category.travel-places": "여행과 장소",
  "common.category.activities": "활동",
  "common.category.objects": "물체",
  "common.category.symbols": "기호",
  "common.category.flags": "깃발",
} as const;

export const search = {
  "common.search.placeholder": "이모지 검색...",
  "common.search.copied": "복사됨!",
  "common.search.copy": "클릭하여 복사",
  "common.search.try": "시도:",
  "common.search.popular": "인기",
  "common.search.trending": "트렌드",
} as const;

export const tabs = {
  "common.tabs.all": "모두",
  "common.tabs.smileys": "스마일리",
  "common.tabs.people": "사람",
  "common.tabs.animals": "동물",
  "common.tabs.food": "음식",
  "common.tabs.travel": "여행",
  "common.tabs.activities": "활동",
  "common.tabs.objects": "물체",
  "common.tabs.symbols": "기호",
} as const;

export const header = {
  "common.header.categories": "카테고리",
  "common.header.topics": "주제",
  "common.header.allEmojis": "모든 이모지",
  "common.header.all": "모두",
  "common.header.emojiTopics": "이모지 주제",
  "common.header.language": "언어",
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
