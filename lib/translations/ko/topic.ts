export const topic = {
  "topic.indexTitle": "이모지 주제",
  "topic.indexDescription":
    "테마별로 정리된 아름다운 이모지 조합을 탐색하세요. 주제를 클릭하여 이모지 아트와 조합을 탐색합니다.",
  "topic.tapToCopy": "탭하여 복사",
  "topic.longPress": "길게 눌러 여러 개 선택",
  "topic.relatedTopics": "관련 주제",
  "topic.primaryEmoji": "메인 이모지",
  "topic.primaryEmojis": "메인 이모지들",
  "topic.combinations": "조합",
  "topic.combinationsCount": "{count}개 조합",
  "topic.noResults": "결과 없음",
  "topic.popularity": "인기:",
  "topic.browseEmojis": "{topicName} 이모지 조합을 탐색하고 복사하세요.",
  "topic.clickToCopy": "임의의 조합을 클릭하여 클립보드에 복사합니다.",
  "topic.browseCategory":
    "{categoryName}을 탐색하고 복사하세요. 이모지를 클릭하면 클립보드에 복사됩니다.",
} as const;

export const category = {
  "category.browseAndCopy":
    "{categoryName}을 탐색하고 복사하세요. 이모지를 클릭하면 클립보드에 복사됩니다.",
} as const;

export const topicPage = {
  "topicPage.features.mainTitle": "기능",
  "topicPage.features.mainTitle2": "필요한 모든 것",
  "topicPage.features.mainTitle3": "이모지 탁월함을 위해",
  "topicPage.features.mainDesc":
    "이모지를 발견하고 효율적으로 구성하고 사용하는 강력한 도구.",
  "topicPage.features.browseTitle": "모든 카테고리 탐색",
  "topicPage.features.browseSubtitle": "모든 이모지 유형 탐색",
  "topicPage.features.browseDesc":
    "카테고리별로 정리된 이모지 탐색: 스마일리, 하트, 제스처, 자연, 음식, 활동, 여행, 사물, 기호.",
  "topicPage.features.browseList": [
    "9개의 주요 카테고리",
    "수백 개의 하위 카테고리",
    "쉬운 탐색",
    "즐겨찾기 빠른 접근",
  ],
  "topicPage.features.searchTitle": "스마트 검색",
  "topicPage.features.searchSubtitle": "즉시 이모지 찾기",
  "topicPage.features.searchDesc":
    "이름, 키워드 또는 설명으로 이모지 검색. 지능형 검색이 모든 상황에 맞는 완벽한 이모지를 찾습니다.",
  "topicPage.features.searchList": [
    "키워드 검색",
    "동의어 매칭",
    "즉시 결과",
    "검색 기록",
  ],
  "topicPage.features.copyTitle": "원클릭 복사",
  "topicPage.features.copySubtitle": "한 번의 탭으로 복사",
  "topicPage.features.copyDesc":
    "이모지를 클릭하여 즉시 클립보드에 복사합니다. 채팅, 소셜 미디어, 문서 등 어디에나 붙여넣기.",
  "topicPage.features.copyList": [
    "즉시 복사",
    "복사 알림",
    "일괄 복사 모드",
    "키보드 단축키",
  ],
  "topicPage.features.favoritesTitle": "즐겨찾기 컬렉션",
  "topicPage.features.favoritesSubtitle": "자주 사용하는 이모지 저장",
  "topicPage.features.favoritesDesc":
    "즐겨찾기 이모지의 개인 컬렉션을 구축합니다. 즐겨찾기 섹션에서 즉시 접근합니다.",
  "topicPage.features.favoritesList": [
    "무제한 즐겨찾기",
    "빠른 접근",
    "기기 간 동기화",
    "내보내기 옵션",
  ],
  "topicPage.features.privacyTitle": "개인정보 보호 우선",
  "topicPage.features.privacyDesc":
    "추적 없음, 데이터 수집 없음. 브라우징이 완전히 비공개로 유지됩니다.",
  "topicPage.features.speedTitle": "초고속",
  "topicPage.features.speedDesc":
    "속도에 최적화. 밀리초 단위로 이모지를 찾아 복사합니다.",
  "topicPage.features.mobileTitle": "모바일 친화적",
  "topicPage.features.mobileDesc":
    "휴대폰, 태블릿 또는 데스크톱을 포함한 모든 기기에서 완벽하게 작동합니다.",
  "topicPage.features.updatedTitle": "항상 업데이트",
  "topicPage.features.updatedDesc":
    "Unicode에서 발표되면 정기적으로 새 이모지를 추가합니다.",
  "topicPage.features.langTitle": "다국어 지원",
  "topicPage.features.langDesc": "여러 언어 및 지역 이모지 변형을 지원합니다.",
  "topicPage.features.noAccountTitle": "계정 불필요",
  "topicPage.features.noAccountDesc":
    "가입 없이 즉시 사용. 로그인 없음, 비밀번호 없음.",
} as const;

export const topics = {
  ...topic,
  ...topicPage,
} as const;

export const topicBrowser = {
  "topicBrowser.copied": "복사됨! ({count})",
  "topicBrowser.selected": "{count}개 선택됨",
  "topicBrowser.copy": "복사",
  "topicBrowser.searchPlaceholder": "조합 검색...",
  "topicBrowser.longPressSelect": "· 길게 눌러 여러 개 선택",
  "topicBrowser.combinationsCount": "{count}개 조합",
  "topicBrowser.noCombinationsFound": "조합을 찾을 수 없음",
  "topicBrowser.relatedTopics": "관련 주제",
  "topicBrowser.primaryEmojiCount": "{count}개 메인 이모지",
} as const;
