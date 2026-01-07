export const topic = {
  "topic.indexTitle": "موضوعات الرموز التعبيرية",
  "topic.indexDescription":
    "استكشف مجموعات رموز تعبيرية جميلة منظمة حسب الموضوع.",
  "topic.tapToCopy": "انقر للنسخ",
  "topic.longPress": "اضغط طويلاً لتحديد عدة",
  "topic.relatedTopics": "موضوعات ذات صلة",
  "topic.primaryEmoji": "رمز تعبيري رئيسي",
  "topic.primaryEmojis": "رموز تعبيرية رئيسية",
  "topic.combinations": "توليفة",
  "topic.combinationsCount": "{count} توليفة{plural}",
  "topic.noResults": "لم يتم العثور على توليفات لـ",
  "topic.popularity": "الشعبية:",
  "topic.browseEmojis": "تصفح وانسخ مجموعات رموز تعبيرية {topicName}.",
  "topic.clickToCopy": "انقر على أي توليفة لنسخها.",
  "topic.browseCategory":
    "تصفح وانسخ {categoryName}. انقر على أي رمز تعبيري لنسخه.",
} as const;

export const category = {
  "category.browseAndCopy":
    "تصفح وانسخ {categoryName}. انقر على أي رمز تعبيري لنسخه.",
} as const;

export const topicPage = {
  "topicPage.features.mainTitle": "الميزات",
  "topicPage.features.mainTitle2": "كل ما تحتاجه",
  "topicPage.features.mainTitle3": "للتميز بالرموز التعبيرية",
  "topicPage.features.mainDesc":
    "أدوات قوية لاكتشاف وتنظيم واستخدام الرموز التعبيرية بكفاءة.",
  "topicPage.features.browseTitle": "تصفح جميع الفئات",
  "topicPage.features.browseSubtitle": "استكشف كل نوع من الرموز التعبيرية",
  "topicPage.features.browseDesc":
    "تصفح رموز تعبيرية منظمة حسب الفئات: الوجوه، القلوب، الإيماءات، الطبيعة، الطعام، الأنشطة، السفر، الأشياء، والرموز.",
  "topicPage.features.browseList": [
    "9 فئات رئيسية",
    "مئات من الفئات الفرعية",
    "سهولة التنقل",
    "وصول سريع للمفضلة",
  ],
  "topicPage.features.searchTitle": "بحث ذكي",
  "topicPage.features.searchSubtitle": "اعثر على الرموز التعبيرية فوراً",
  "topicPage.features.searchDesc":
    "ابحث عن الرموز التعبيرية بالاسم أو الكلمة المفتاحية أو الوصف. يجد بحثنا الذكي الرمز التعبيري المثالي لأي موقف.",
  "topicPage.features.searchList": [
    "بحث بالكلمة المفتاحية",
    "مطابقة المرادفات",
    "نتائج فورية",
    "تاريخ البحث",
  ],
  "topicPage.features.copyTitle": "نسخ بنقرة واحدة",
  "topicPage.features.copySubtitle": "انسخ بنقرة واحدة",
  "topicPage.features.copyDesc":
    "انقر على أي رمز تعبيري لنسخه إلى الحافظة فوراً. الصقه في أي مكان - المحادثات، وسائل التواصل الاجتماعي، المستندات، والمزيد.",
  "topicPage.features.copyList": [
    "نسخ فوري",
    "إشعار بالنسخ",
    "وضع النسخ الدفعي",
    "اختصارات لوحة المفاتيح",
  ],
  "topicPage.features.favoritesTitle": "مجموعة المفضلة",
  "topicPage.features.favoritesSubtitle": "احفظ رموزك المفضلة",
  "topicPage.features.favoritesDesc":
    "ابنِ مجموعتك الشخصية من الرموز التعبيرية المفضلة. الوصول إليها فوراً من قسم المفضلة.",
  "topicPage.features.favoritesList": [
    "مفضلة غير محدودة",
    "وصول سريع",
    "مزامنة عبر الأجهزة",
    "خيارات التصدير",
  ],
  "topicPage.features.privacyTitle": "الخصوصية أولاً",
  "topicPage.features.privacyDesc":
    "لا تتبع، لا جمع بيانات. تصفحك يبقى خاصاً تماماً.",
  "topicPage.features.speedTitle": "سريع جداً",
  "topicPage.features.speedDesc":
    "محسّن للسرعة. اعثر على الرموز التعبيرية وانسخها في أجزاء من الثانية.",
  "topicPage.features.mobileTitle": "متوافق مع الجوال",
  "topicPage.features.mobileDesc":
    "يعمل بشكل مثالي على جميع الأجهزة - الهاتف، الجهاز اللوحي، أو سطح المكتب.",
  "topicPage.features.updatedTitle": "دائماً محدّث",
  "topicPage.features.updatedDesc":
    "نضيف رموز تعبيرية جديدة بانتظام بمجرد صدورها من Unicode.",
  "topicPage.features.langTitle": "متعدد اللغات",
  "topicPage.features.langDesc": "دعم لعدة لغات وتنويعات رموز تعبيرية إقليمية.",
  "topicPage.features.noAccountTitle": "لا حاجة لحساب",
  "topicPage.features.noAccountDesc":
    "استخدم فوراً بدون تسجيل. لا تسجيل دخول، لا كلمات مرور.",
} as const;

export const topics = {
  ...topic,
  ...topicPage,
} as const;

export const topicBrowser = {
  "topicBrowser.copied": "تم النسخ! ({count})",
  "topicBrowser.selected": "{count} محدد",
  "topicBrowser.copy": "نسخ",
  "topicBrowser.searchPlaceholder": "البحث عن توليفات...",
  "topicBrowser.longPressSelect": "· اضغط طويلاً لتحديد عدة",
  "topicBrowser.combinationsCount": "{count} توليفة{plural}",
  "topicBrowser.noCombinationsFound": "لم يتم العثور على توليفات لـ",
  "topicBrowser.relatedTopics": "موضوعات ذات صلة",
  "topicBrowser.primaryEmojiCount": "{count} رمز تعبيري رئيسي{plural}",
} as const;
