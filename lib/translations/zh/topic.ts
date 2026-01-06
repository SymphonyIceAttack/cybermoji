export const topic = {
  "topic.indexTitle": "表情主题",
  "topic.indexDescription":
    "探索按主题组织的精美表情组合。点击任何主题浏览其表情艺术和组合。",
  "topic.tapToCopy": "点击复制",
  "topic.longPress": "长按选择多个",
  "topic.relatedTopics": "相关主题",
  "topic.primaryEmoji": "主要表情",
  "topic.primaryEmojis": "主要表情",
  "topic.combinations": "组合",
  "topic.combinationsCount": "{count} 个组合",
  "topic.noResults": "未找到结果",
  "topic.popularity": "流行度：",
  "topic.browseEmojis": "浏览并复制 {topicName} 表情组合。",
  "topic.clickToCopy": "点击任何组合即可将其复制到剪贴板。",
  "topic.browseCategory":
    "浏览并复制 {categoryName}。点击任何表情即可将其复制到剪贴板。",
} as const;

export const category = {
  "category.browseAndCopy":
    "浏览并复制 {categoryName}。点击任何表情即可将其复制到剪贴板。",
} as const;

export const topicPage = {
  "topicPage.features.mainTitle": "功能",
  "topicPage.features.mainTitle2": "您需要的一切",
  "topicPage.features.mainTitle3": "表情卓越性",
  "topicPage.features.mainDesc": "用于发现、组织和高效使用表情的强大工具。",
  "topicPage.features.browseTitle": "浏览所有类别",
  "topicPage.features.browseSubtitle": "探索每种表情类型",
  "topicPage.features.browseDesc":
    "按类别浏览表情：笑脸、心形、手势、自然、食物、活动、旅行、物品和符号。",
  "topicPage.features.browseList": [
    "9个主要类别",
    "数百个子类别",
    "轻松导航",
    "快速访问收藏夹",
  ],
  "topicPage.features.searchTitle": "智能搜索",
  "topicPage.features.searchSubtitle": "立即找到表情",
  "topicPage.features.searchDesc":
    "按名称、关键词或描述搜索表情。我们的智能搜索能找到任何情况的完美表情。",
  "topicPage.features.searchList": [
    "关键词搜索",
    "同义词匹配",
    "即时结果",
    "搜索历史",
  ],
  "topicPage.features.copyTitle": "一键复制",
  "topicPage.features.copySubtitle": "单次点击复制",
  "topicPage.features.copyDesc":
    "点击任何表情即可立即复制到剪贴板。粘贴到任何地方 - 聊天、社交媒体、文档等。",
  "topicPage.features.copyList": [
    "即时复制",
    "复制通知",
    "批量复制模式",
    "键盘快捷键",
  ],
  "topicPage.features.favoritesTitle": "收藏集",
  "topicPage.features.favoritesSubtitle": "保存您喜欢的表情",
  "topicPage.features.favoritesDesc":
    "建立您个人的表情收藏集。从收藏夹部分即时访问。",
  "topicPage.features.favoritesList": [
    "无限收藏",
    "快速访问",
    "设备间同步",
    "导出选项",
  ],
  "topicPage.features.privacyTitle": "隐私优先",
  "topicPage.features.privacyDesc": "无跟踪，无数据收集。您的浏览完全私密。",
  "topicPage.features.speedTitle": "闪电般快速",
  "topicPage.features.speedDesc": "针对速度优化。毫秒级查找和复制表情。",
  "topicPage.features.mobileTitle": "移动端友好",
  "topicPage.features.mobileDesc": "在手机、平板或桌面上完美工作。",
  "topicPage.features.updatedTitle": "始终更新",
  "topicPage.features.updatedDesc": "Unicode 发布新表情时定期添加。",
  "topicPage.features.langTitle": "多语言",
  "topicPage.features.langDesc": "支持多种语言和地区表情变体。",
  "topicPage.features.noAccountTitle": "无需账户",
  "topicPage.features.noAccountDesc": "立即使用，无需注册。无登录，无密码。",
} as const;

export const topics = {
  ...topic,
  ...topicPage,
} as const;
