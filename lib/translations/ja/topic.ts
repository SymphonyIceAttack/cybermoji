export const topic = {
  "topic.indexTitle": "絵文字トピック",
  "topic.indexDescription":
    "テーマに整理された美しい絵文字の組み合わせを探索。任意をクリックして絵文字アートと組み合わせを閲覧。",
  "topic.tapToCopy": "タップしてコピー",
  "topic.longPress": "長押しで複数選択",
  "topic.relatedTopics": "関連トピック",
  "topic.primaryEmoji": "メイン絵文字",
  "topic.primaryEmojis": "メイン絵文字",
  "topic.combinations": "組み合わせ",
  "topic.combinationsCount": "{count} 個の組み合わせ",
  "topic.noResults": "結果が見つかりません",
  "topic.popularity": "人気度：",
  "topic.browseEmojis": "{topicName} 絵文字の組み合わせを閲覧およびコピー。",
  "topic.clickToCopy": "任意の組み合わせをクリックしてクリップボードにコピー。",
  "topic.browseCategory":
    "{categoryName} を閲覧およびコピー。いずれの絵文字をクリックしてクリップボードにコピー。",
} as const;

export const category = {
  "category.browseAndCopy":
    "{categoryName} を閲覧およびコピー。いずれの絵文字をクリックしてクリップボードにコピー。",
} as const;

export const topicPage = {
  "topicPage.features.mainTitle": "機能",
  "topicPage.features.mainTitle2": "必要なすべて",
  "topicPage.features.mainTitle3": "絵文字の卓越性のため",
  "topicPage.features.mainDesc":
    "絵文字を発見、効率的に整理、使用するための強力なツール。",
  "topicPage.features.browseTitle": "すべてのカテゴリーを閲覧",
  "topicPage.features.browseSubtitle": "すべての絵文字タイプを探索",
  "topicPage.features.browseDesc":
    "カテゴリー別に整理された絵文字を閲覧：顔文字、ハート、ジェスチャー、自然、食料、アクティビティ、旅行、物、記号。",
  "topicPage.features.browseList": [
    "9つの主要カテゴリー",
    "数百のサブカテゴリー",
    "簡単なナビゲーション",
    "お気に入りへのクイックアクセス",
  ],
  "topicPage.features.searchTitle": "スマート検索",
  "topicPage.features.searchSubtitle": "瞬時に絵文字を発見",
  "topicPage.features.searchDesc":
    "名前、キーワード、または説明で検索。インテリジェントな検索があらゆる状況に最適な絵文字を見つけます。",
  "topicPage.features.searchList": [
    "キーワード検索",
    "同義語マッチング",
    "インスタント結果",
    "検索履歴",
  ],
  "topicPage.features.copyTitle": "ワンクリックコピー",
  "topicPage.features.copySubtitle": "タップでコピー",
  "topicPage.features.copyDesc":
    "任意をクリックしてインスタントにクリップボードにコピー。チャット、ソーシャルメディア、ドキュメントなど、どこにでも貼り付け。",
  "topicPage.features.copyList": [
    "インスタントコピー",
    "コピー通知",
    "バッチコピーモード",
    "キーボードショートカット",
  ],
  "topicPage.features.favoritesTitle": "お気に入りコレクション",
  "topicPage.features.favoritesSubtitle": "よくある質問",
  "topicPage.features.favoritesDesc":
    "お気に入り絵文字の個人的なコレクションを構築。お気に入りセクションから即座にアクセス。",
  "topicPage.features.favoritesList": [
    "無制限のお気に入り",
    "クイックアクセス",
    "デバイス間の同期",
    "エクスポートオプション",
  ],
  "topicPage.features.privacyTitle": "プライバシー最優先",
  "topicPage.features.privacyDesc":
    "追跡なし、データ収集なし。閲覧は完全にプライベートに保たれます。",
  "topicPage.features.speedTitle": "超高速",
  "topicPage.features.speedDesc":
    "速度に最適化。ミリ秒単位で絵文字を検索してコピー。",
  "topicPage.features.mobileTitle": "モバイル対応",
  "topicPage.features.mobileDesc":
    "電話、タブレット、デスクトップを問わず、すべてのデバイスで完璧に動作。",
  "topicPage.features.updatedTitle": "常に更新",
  "topicPage.features.updatedDesc":
    "Unicodeから公開された時点で定期的に新しい絵文字を追加。",
  "topicPage.features.langTitle": "多言語対応",
  "topicPage.features.langDesc":
    "複数の言語と地域の絵文字バリエーションをサポート。",
  "topicPage.features.noAccountTitle": "アカウント不要",
  "topicPage.features.noAccountDesc":
    "サインアップなしですぐに使用。ログインなし、パスワードなし。",
} as const;

export const topics = {
  ...topic,
  ...topicPage,
} as const;

export const topicBrowser = {
  "topicBrowser.copied": "コピーしました！({count})",
  "topicBrowser.selected": "{count} 個選択済み",
  "topicBrowser.copy": "コピー",
  "topicBrowser.searchPlaceholder": "組み合わせを検索...",
  "topicBrowser.longPressSelect": "· 長押しで複数選択",
  "topicBrowser.combinationsCount": "{count} 個の組み合わせ",
  "topicBrowser.noCombinationsFound": "組み合わせが見つかりません",
  "topicBrowser.relatedTopics": "関連トピック",
  "topicBrowser.primaryEmojiCount": "{count} 個のメイン絵文字",
} as const;
