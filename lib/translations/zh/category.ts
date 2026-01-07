export const categoryAnalysis = {
  "category.analysis.title": "分类分析",
  "category.analysis.subtitle": "该表情分类的统计数据和洞察",
  "category.analysis.totalEmojis": "表情总数",
  "category.analysis.subgroups": "子分类",
  "category.analysis.trending": "热门",
  "category.analysis.mostUsed": "最常用",
  "category.analysis.newest": "最新",
  "category.analysis.usageStats": "使用统计",
  "category.analysis.popularityScore": "流行度评分",
  "category.analysis.dailyViews": "日浏览量",
  "category.analysis.copyCount": "复制次数",
  "category.analysis.lastUpdated": "最后更新",
} as const;

export const categoryPainPoints = {
  "category.painPoints.title": "解决痛点",
  "category.painPoints.subtitle": "我们如何解决常见挑战",
  "category.painPoints.findFast.title": "快速找到合适的表情",
  "category.painPoints.findFast.desc":
    "不再需要滚动数百个表情。我们的智能搜索和子分类筛选帮助您在几秒钟内找到所需的表情。",
  "category.painPoints.crossPlatform.title": "跨平台兼容性",
  "category.painPoints.crossPlatform.desc":
    "并非所有表情在每个设备上都能正确显示。我们显示通用 unicode 字符，可以在所有平台上使用。",
  "category.painPoints.organization.title": "混乱的分类",
  "category.painPoints.organization.desc":
    "表情被逻辑地组织成类别和子分类，使发现变得直观和快速。",
  "category.painPoints.batchCopy.title": "批量复制",
  "category.painPoints.batchCopy.desc":
    "需要多个表情？点击每个您想要的表情，然后一次性粘贴它们。无需重复复制。",
  "category.painPoints.privacy.title": "隐私问题",
  "category.painPoints.privacy.desc":
    "无追踪、无登录、无数据收集。您的浏览历史完全保密。",
} as const;

export const categoryTech = {
  "category.tech.title": "技术实现",
  "category.tech.subtitle": "我们如何构建这个表情浏览器",
  "category.tech.emojiDb.title": "表情数据库",
  "category.tech.emojiDb.desc":
    "由 Emojibase 提供支持，提供准确的表情元数据、注释和 unicode 版本。",
  "category.tech.performance.title": "性能优化",
  "category.tech.performance.desc":
    "虚拟滚动和分页确保即使在数千个表情的情况下也能保持流畅的性能。只渲染可见的内容。",
  "category.tech.searchEngine.title": "智能搜索引擎",
  "category.tech.searchEngine.desc":
    "全文搜索，支持多语言同义词匹配。通过关键字、标签和描述查找表情。",
  "category.tech.caching.title": "智能缓存",
  "category.tech.caching.desc":
    "经常访问的表情会缓存在本地以实现即时访问。重复访问时无需网络请求。",
  "category.tech.typing.title": "类型安全",
  "category.tech.typing.desc":
    "使用 TypeScript 构建，确保类型安全。所有表情数据都是严格类型化的，以防止运行时错误。",
  "category.tech.i18n.title": "国际化",
  "category.tech.i18n.desc":
    "支持 12 种以上语言的完整 i18n。表情注释和描述已本地化。",
} as const;

export const categoryUsage = {
  "category.usage.title": "使用边界",
  "category.usage.subtitle": "了解限制和最佳实践",
  "category.usage.platform.title": "平台兼容性",
  "category.usage.platform.desc":
    "表情适用于所有现代平台（iOS、Android、Windows、Mac、Linux）。较旧的设备可能无法正确显示较新的表情。",
  "category.usage.unicode.title": "Unicode 标准",
  "category.usage.unicode.desc":
    "我们支持最多 Unicode 15.1 的表情。一些非常新的表情可能无法在运行旧版操作系统的设备上显示。",
  "category.usage.regions.title": "区域限制",
  "category.usage.regions.desc":
    "旗帜表情显示区域指示符，在 unicode 支持有限的区域可能无法正确显示。",
  "category.usage.zwj.title": "ZWJ 序列",
  "category.usage.zwj.desc":
    "某些表情使用零宽度连接符组合多个字符。这些在不同平台上可能显示不同。",
  "category.usage.skinTones.title": "肤色修饰符",
  "category.usage.skinTones.desc":
    "人物和手势表情支持肤色修饰符（5种色调）。如果不确定，请使用默认的中性色调。",
  "category.usage.bestPractices.title": "最佳实践",
  "category.usage.bestPractices.desc":
    "使用表情来增强交流，而不是取代它。考虑您的受众和使用场景。",
} as const;

export const categoryExamples = {
  "category.examples.title": "使用示例",
  "category.examples.subtitle": "了解在不同场景下如何使用表情",
  "category.examples.social.title": "社交媒体",
  "category.examples.social.desc": "适合帖子、评论和故事",
  "category.examples.messaging.title": "即时通讯",
  "category.examples.messaging.desc": "在聊天和对话中表达自己",
  "category.examples.professional.title": "专业用途",
  "category.examples.professional.desc": "为邮件和文档增添个性",
  "category.examples.creative.title": "创意项目",
  "category.examples.creative.desc": "用视觉表达设计内容",
  "category.examples.education.title": "教育",
  "category.examples.education.desc": "用视觉辅助工具吸引学习者",
  "category.examples.tips.title": "专业技巧",
  "category.examples.tips.desc": "通过这些策略最大化影响力",
} as const;

export const categoryFeatureToggle = {
  "category.toggle.title": "自定义您的体验",
  "category.toggle.subtitle": "选择要启用的功能",
  "category.toggle.details": "显示表情详情",
  "category.toggle.details.desc": "悬停时显示表情元数据",
  "category.toggle.largeGrid": "大网格视图",
  "category.toggle.largeGrid.desc": "显示较大的表情预览",
  "category.toggle.compactGrid": "紧凑网格视图",
  "category.toggle.compactGrid.desc": "每行显示更多表情",
  "category.toggle.showTags": "显示标签",
  "category.toggle.showTags.desc": "显示表情关键字和标签",
  "category.toggle.skinTones": "肤色选择器",
  "category.toggle.skinTones.desc": "启用肤色变体",
  "category.toggle.autoCopy": "自动复制",
  "category.toggle.autoCopy.desc": "点击时自动复制",
  "category.toggle.animations": "动画效果",
  "category.toggle.animations.desc": "启用 UI 动画和过渡效果",
} as const;

export const categoryFAQ = {
  "category.faq.title": "常见问题",
  "category.faq.subtitle": "关于此分类的常见问题",
  "category.faq.q1": "这个分类有多少个表情？",
  "category.faq.a1":
    "此分类包含数百个表情，组织在子分类中。随着 Unicode 发布新表情，我们会定期添加，数量会相应变化。",
  "category.faq.q2": "我可以复制这个分类的表情吗？",
  "category.faq.a2":
    "当然可以！点击任何表情即可复制到剪贴板。然后您可以将其粘贴到任何地方——社交媒体、即时通讯应用、文档等。",
  "category.faq.q3": "如何找到特定的表情？",
  "category.faq.a3":
    "使用搜索栏按关键字搜索，或使用下拉菜单按子分类筛选。您也可以手动浏览网格。",
  "category.faq.q4": "为什么某些表情在我的设备上看起来不同？",
  "category.faq.a4":
    "表情设计因平台而异（Apple、Google、Microsoft 等）。这是正常的，也是预期的。unicode 字符是相同的，但渲染方式不同。",
  "category.faq.q5": "这些表情可以免费使用吗？",
  "category.faq.a5":
    "是的！所有表情都是标准的 Unicode 字符，可在任何环境中免费使用——个人、商业或教育目的。",
  "category.faq.q6": "我可以建议添加新表情吗？",
  "category.faq.a6":
    "表情提案会提交给 Unicode Consortium。您可以在其网站上跟踪新的表情候选。我们会在表情正式发布后立即添加。",
  "category.faq.q7": "肤色修饰符如何工作？",
  "category.faq.a7":
    "人物和手势表情支持肤色修饰符（5种色调）。点击任何表情可在详情视图中查看可用的变体。",
  "category.faq.q8": "这适合移动设备使用吗？",
  "category.faq.a8":
    "是的！我们的分类浏览器完全响应式，在所有设备上都能完美运行，包括智能手机和平板电脑。",
} as const;

export const category = {
  ...categoryAnalysis,
  ...categoryPainPoints,
  ...categoryTech,
  ...categoryUsage,
  ...categoryExamples,
  ...categoryFeatureToggle,
  ...categoryFAQ,
} as const;
