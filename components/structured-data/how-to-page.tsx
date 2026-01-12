import type { HowTo, HowToStep, WithContext } from "schema-dts";
import type { EmojiCategorySlug } from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

export type HowToPageType = "home" | "category" | "topic";

interface HowToStructuredDataProps {
  lang: LanguageType;
  pageType?: HowToPageType;
  customTitle?: string;
  customDescription?: string;
  customSteps?: HowToStep[];
  categorySlug?: EmojiCategorySlug;
  topicSlug?: string;
}

export function HowToStructuredData({
  lang,
  pageType = "home",
  customTitle,
  customDescription,
  customSteps,
  categorySlug,
  topicSlug,
}: HowToStructuredDataProps) {
  const howToSchema: WithContext<HowTo> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: customTitle || getHowToName(lang, pageType, categorySlug, topicSlug),
    description:
      customDescription ||
      getHowToDescription(lang, pageType, categorySlug, topicSlug),
    url: `${siteConfig.siteUrl}/${lang}${getPagePath(pageType, categorySlug, topicSlug)}`,
    inLanguage: lang,
    step:
      customSteps ||
      getStepsForPageType(lang, pageType, categorySlug, topicSlug),
    totalTime: "PT1M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    tool: {
      "@type": "HowToTool",
      name: getToolName(lang),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToSchema),
      }}
    />
  );
}

function getToolName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Web Browser",
    zh: "网页浏览器",
    fr: "Navigateur Web",
    es: "Navegador Web",
    de: "Webbrowser",
    ja: "ウェブブラウザ",
    ko: "웹 브라우저",
    pt: "Navegador Web",
    ru: "Веб-браузер",
    ar: "متصفح الويب",
  };
  return names[lang] || names.en;
}

function getPagePath(
  pageType: HowToPageType,
  categorySlug?: EmojiCategorySlug,
  topicSlug?: string,
): string {
  switch (pageType) {
    case "home":
      return "";
    case "category":
      return categorySlug ? `/category/${categorySlug}` : "/category";
    case "topic":
      return topicSlug ? `/topic/${topicSlug}` : "/topic";
    default:
      return "";
  }
}

function getStepsForPageType(
  lang: LanguageType,
  pageType: HowToPageType,
  categorySlug?: EmojiCategorySlug,
  topicSlug?: string,
): HowToStep[] {
  if (categorySlug && categorySlug !== "all") {
    return getCategorySteps(lang, categorySlug);
  }
  if (topicSlug) {
    return getTopicSteps(lang, topicSlug);
  }
  switch (pageType) {
    case "home":
      return getHomeSteps(lang);
    case "category":
      return getCategorySteps(lang, "all");
    case "topic":
      return getTopicSteps(lang, "music");
    default:
      return getHomeSteps(lang);
  }
}

function getHomeSteps(lang: LanguageType): HowToStep[] {
  return [
    {
      "@type": "HowToStep",
      position: 1,
      name: getStep1Name(lang),
      text: getStep1Text(lang),
      url: `${siteConfig.siteUrl}/${lang}#browse`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: getStep2Name(lang),
      text: getStep2Text(lang),
      url: `${siteConfig.siteUrl}/${lang}#browse`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: getStep3Name(lang),
      text: getStep3Text(lang),
      url: `${siteConfig.siteUrl}/${lang}#browse`,
    },
  ];
}

function getCategorySteps(
  lang: LanguageType,
  categorySlug: EmojiCategorySlug,
): HowToStep[] {
  return [
    {
      "@type": "HowToStep",
      position: 1,
      name: getCategoryStep1Name(lang, categorySlug),
      text: getCategoryStep1Text(lang, categorySlug),
      url: `${siteConfig.siteUrl}/${lang}/category/${categorySlug}`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: getCategoryStep2Name(lang, categorySlug),
      text: getCategoryStep2Text(lang, categorySlug),
      url: `${siteConfig.siteUrl}/${lang}/category/${categorySlug}`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: getCategoryStep3Name(lang, categorySlug),
      text: getCategoryStep3Text(lang, categorySlug),
      url: `${siteConfig.siteUrl}/${lang}/category/${categorySlug}`,
    },
  ];
}

function getTopicSteps(lang: LanguageType, topicSlug: string): HowToStep[] {
  return [
    {
      "@type": "HowToStep",
      position: 1,
      name: getTopicStep1Name(lang, topicSlug),
      text: getTopicStep1Text(lang, topicSlug),
      url: `${siteConfig.siteUrl}/${lang}/topic/${topicSlug}`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: getTopicStep2Name(lang, topicSlug),
      text: getTopicStep2Text(lang, topicSlug),
      url: `${siteConfig.siteUrl}/${lang}/topic/${topicSlug}`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: getTopicStep3Name(lang, topicSlug),
      text: getTopicStep3Text(lang, topicSlug),
      url: `${siteConfig.siteUrl}/${lang}/topic/${topicSlug}`,
    },
  ];
}

function getHowToName(
  lang: LanguageType,
  pageType: HowToPageType,
  _categorySlug?: EmojiCategorySlug,
  _topicSlug?: string,
): string {
  const names: Record<LanguageType, Record<HowToPageType, string>> = {
    en: {
      home: "How to Use Cybermoji - Step by Step Guide",
      category: "How to Browse Emojis by Category",
      topic: "How to Use Emoji Topic Combinations",
    },
    zh: {
      home: "如何使用 Cybermoji - 分步指南",
      category: "如何按类别浏览 Emoji",
      topic: "如何使用 Emoji 主题组合",
    },
    fr: {
      home: "Comment Utiliser Cybermoji - Guide Étape par Étape",
      category: "Comment Parcourir les Emoji par Catégorie",
      topic: "Comment Utiliser les Combinaisons de Sujets Emoji",
    },
    es: {
      home: "Cómo Usar Cybermoji - Guía Paso a Paso",
      category: "Cómo Navegar Emoji por Categoría",
      topic: "Cómo Usar Combinaciones de Temas Emoji",
    },
    de: {
      home: "Wie Man Cybermoji Verwendet - Schritt-für-Schritt-Anleitung",
      category: "Wie Man Emoji nach Kategorie Durchsucht",
      topic: "Wie Man Emoji-Themenkombinationen Verwendet",
    },
    ja: {
      home: "Cybermoji の使い方 - ステップバイステップガイド",
      category: "カテゴリー別 Emoji の閲覧方法",
      topic: "Emoji テーマ組み合わせの使用方法",
    },
    ko: {
      home: "Cybermoji 사용 방법 - 단계별 가이드",
      category: "카테고리별 이모지 탐색 방법",
      topic: "이모지 토픽 조합 사용 방법",
    },
    pt: {
      home: "Como Usar Cybermoji - Guia Passo a Passo",
      category: "Como Navegar Emoji por Categoria",
      topic: "Como Usar Combinações de Tópicos Emoji",
    },
    ru: {
      home: "Как Использовать Cybermoji - Пошаговое Руководство",
      category: "Как Просматривать Эмодзи по Категории",
      topic: "Как Использовать Комбинации Тем Эмодзи",
    },
    ar: {
      home: "كيفية استخدام Cybermoji - دليل خطوة بخطوة",
      category: "كيفية تصفح الإيموجي حسب الفئة",
      topic: "كيفية استخدام مجموعات موضوعات الإيموجي",
    },
  };
  return names[lang]?.[pageType] || names.en[pageType];
}

function getHowToDescription(
  lang: LanguageType,
  pageType: HowToPageType,
  _categorySlug?: EmojiCategorySlug,
  _topicSlug?: string,
): string {
  const descriptions: Record<LanguageType, Record<HowToPageType, string>> = {
    en: {
      home: "Learn how to browse, search, and copy emojis in 3 simple steps. Find the perfect expression for every moment.",
      category:
        "Learn how to find and use emojis from specific categories. Browse organized emoji collections and copy your favorites.",
      topic:
        "Discover how to use unique emoji topic combinations. Learn creative ways to express yourself with emoji variations.",
    },
    zh: {
      home: "通过 3 个简单步骤学习如何浏览、搜索和复制 Emoji。找到每个时刻的完美表达方式。",
      category:
        "学习如何从特定类别查找和使用 Emoji。浏览整理的 Emoji 收藏并复制您喜欢的 Emoji。",
      topic:
        "了解如何使用独特的 Emoji 主题组合。学习使用 Emoji 变体创造性地表达自己的方式。",
    },
    fr: {
      home: "Apprenez à parcourir, rechercher et copier des emoji en 3 étapes simples. Trouvez l'expression parfaite pour chaque moment.",
      category:
        "Apprenez à trouver et utiliser des emoji de catégories spécifiques. Parcourez les collections d'emoji organisées et copiez vos favoris.",
      topic:
        "Découvrez comment utiliser des combinaisons de sujets emoji uniques. Apprenez des moyens créatifs de vous exprimer avec des variations d'emoji.",
    },
    es: {
      home: "Aprende a navegar, buscar y copiar emoji en 3 simples pasos. Encuentra la expresión perfecta para cada momento.",
      category:
        "Aprende a encontrar y usar emoji de categorías específicas. Navega por colecciones de emoji organizadas y copia tus favoritos.",
      topic:
        "Descubre cómo usar combinaciones de temas emoji únicos. Aprende formas creativas de expresarte con variaciones de emoji.",
    },
    de: {
      home: "Erfahren Sie, wie Sie in 3 einfachen Schritten Emoji durchsuchen, suchen und kopieren. Finden Sie den perfekten Ausdruck für jeden Moment.",
      category:
        "Erfahren Sie, wie Sie Emoji aus bestimmten Kategorien finden und verwenden. Durchsuchen Sie organisierte Emoji-Sammlungen und kopieren Sie Ihre Favoriten.",
      topic:
        "Entdecken Sie, wie Sie einzigartige Emoji-Themenkombinationen verwenden. Lernen Sie kreative Möglichkeiten, sich mit Emoji-Variationen auszudrücken.",
    },
    ja: {
      home: "3 つの簡単なステップで Emoji の閲覧、検索、コピーの方法を学びましょう。瞬間瞬間に最適な表現を見つけましょう。",
      category:
        "特定のカテゴリーから Emoji を見つけて使用する方法を学びましょう。整理された Emoji コレクションを閲覧してお気に入りの Emoji をコピーしましょう。",
      topic:
        "ユニークな Emoji テーマ組み合わせの使用方法を発見しましょう。Emoji 変体を使用して創造的に表現する方法を学びましょう。",
    },
    ko: {
      home: "3 가지 간단한 단계로 이모지 검색, 탐색, 복사하는 방법을 배우세요. 순간에 맞는 완벽한 표현을 찾으세요.",
      category:
        "특정 카테고리에서 이모지를 찾아 사용하는 방법을 배우세요. 정리된 이모지 컬렉션을 탐색하고 즐겨찾기를 복사하세요.",
      topic:
        "고유한 이모지 토픽 조합을 사용하는 방법을 발견하세요. 이모지 변형을 사용하여 창의적으로 표현하는 방법을 배우세요.",
    },
    pt: {
      home: "Aprenda a navegar, pesquisar e copiar emoji em 3 passos simples. Encontre a expressão perfeita para cada momento.",
      category:
        "Aprenda a encontrar e usar emoji de categorias específicas. Navegue por coleções de emoji organizadas e copie seus favoritos.",
      topic:
        "Descubra como usar combinações de tópicos emoji únicas. Aprenda formas criativas de se expressar com variações de emoji.",
    },
    ru: {
      home: "Научитесь просматривать, искать и копировать эмодзи за 3 простых шага. Найдите идеальное выражение для любого момента.",
      category:
        "Научитесь находить и использовать эмодзи из определенных категорий. Просматривайте организованные коллекции эмодзи и копируйте свои любимые.",
      topic:
        "Узнайте, как использовать уникальные комбинации тем эмодзи. Научитесь творческим способам самовыражения с помощью вариаций эмодзи.",
    },
    ar: {
      home: "تعلم كيفية تصفح، بحث، وانسخ الإيموجي في 3 خطوات بسيطة. ابحث عن التعبير المثالي لكل لحظة.",
      category:
        "تعلم كيفية العثور على الإيموجي من فئات محددة واستخدامها. تصفح مجموعات الإيموجي المنظمة وانسخ مفضلاتك.",
      topic:
        "اكتشف كيفية استخدام مجموعات موضوعات الإيموجي الفريدة. تعلم طرقا إبداعية للتعبير عن نفسك مع تغييرات الإيموجي.",
    },
  };
  return descriptions[lang]?.[pageType] || descriptions.en[pageType];
}

function getStep1Name(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Browse or Search",
    zh: "浏览或搜索",
    fr: "Parcourir ou Rechercher",
    es: "Navegar o Buscar",
    de: "Durchsuchen oder Suchen",
    ja: "閲覧または検索",
    ko: "탐색 또는 검색",
    pt: "Navegar ou Pesquisar",
    ru: "Просмотр или Поиск",
    ar: "تصفح أو ابحث",
  };
  return names[lang] || names.en;
}

function getStep1Text(lang: LanguageType): string {
  const texts: Record<LanguageType, string> = {
    en: "Use our smart search to find specific emojis by keyword, name, or description. Alternatively, browse by category to discover new favorites and explore thousands of emojis organized by theme.",
    zh: "使用我们的智能搜索通过关键字、名称或描述来查找特定的 Emoji。或者，按类别浏览以发现新的收藏并探索按主题组织的数千个 Emoji。",
    fr: "Utilisez notre recherche intelligente pour trouver des emoji spécifiques par mot-clé, nom ou description. Sinon, parcourez par catégorie pour découvrir de nouveaux favoris et explorer des milliers d'emoji organisés par thème.",
    es: "Usa nuestra búsqueda inteligente para encontrar emoji específicos por palabra clave, nombre o descripción. Alternativamente, navega por categoría para descubrir nuevos favoritos y explorar miles de emoji organizados por tema.",
    de: "Verwenden Sie unsere intelligente Suche, um bestimmte Emoji nach Schlüsselwort, Name oder Beschreibung zu finden. Alternativ können Sie nach Kategorie durchsuchen, um neue Favoriten zu entdecken und Tausende von Emoji zu erkunden, die nach Themen organisiert sind.",
    ja: "スマート検索を使用して、キーワード、名前、または説明によって特定の Emoji を見つけましょう。あるいは、カテゴリー別に閲覧して、新しいお気に入りを発見し、テーマごとに整理された数千の Emoji を探索しましょう。",
    ko: "스마트 검색을 사용하여 키워드, 이름 또는 설명으로 특정 이모지를 찾으세요. 또는 카테고리별로 탐색하여 새로운 즐겨찾기를 발견하고 주제별로 구성된 수천 개의 이모지를 탐색하세요.",
    pt: "Use nossa pesquisa inteligente para encontrar emoji específicos por palavra-chave, nome ou descrição. Alternativamente, navegue por categoria para descobrir novos favoritos e explore milhares de emoji organizados por tema.",
    ru: "Используйте наш интеллектуальный поиск для поиска конкретных эмодзи по ключевому слову, названию или описанию. Или просматривайте по категориям, чтобы открыть новые любимые и изучить тысячи эмодзи, организованных по темам.",
    ar: "استخدم البحث الذكي الخاص بنا للعثور على الإيموجي المحدد بالكلمة المفتاحية، الاسم، أو الوصف. بدلا من ذلك، تصفح حسب الفئة لاكتشاف مفضلات جديدة واستكشاف آلاف الإيموجي المنظمين حسب الموضوع.",
  };
  return texts[lang] || texts.en;
}

function getStep2Name(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Preview & Select",
    zh: "预览和选择",
    fr: "Aperçu et Sélection",
    es: "Vista Previa y Selección",
    de: "Vorschau und Auswahl",
    ja: "プレビューと選択",
    ko: "미리보기 및 선택",
    pt: "Pré-visualização e Seleção",
    ru: "Предпросмотр и Выбор",
    ar: "معاينة واختيار",
  };
  return names[lang] || names.en;
}

function getStep2Text(lang: LanguageType): string {
  const texts: Record<LanguageType, string> = {
    en: "Click on any emoji to see it in larger size and full detail. Preview how it looks before copying. Add emojis to your favorites collection for quick access on future visits.",
    zh: "点击任何 Emoji 以查看更大的尺寸和完整细节。复制前预览其外观。将 Emoji 添加到您的收藏夹，以便在以后访问时快速访问。",
    fr: "Cliquez sur n'importe quel emoji pour le voir en taille plus grande et en détail complet. Affichez un aperçu de son apparence avant de copier. Ajoutez des emoji à votre collection de favoris pour un accès rapide lors de vos prochaines visites.",
    es: "Haz clic en cualquier emoji para verlo en tamaño más grande y con todos los detalles. Previsualiza cómo se ve antes de copiar. Agrega emoji a tu colección de favoritos para acceso rápido en visitas futuras.",
    de: "Klicken Sie auf ein beliebiges Emoji, um es in größerer Größe und mit vollem Detail zu sehen. Vorschau, wie es aussieht, bevor Sie es kopieren. Fügen Sie Emoji zu Ihrer Favoritensammlung hinzu für schnellen Zugriff bei zukünftigen Besuchen.",
    ja: "任意の Emoji をクリックして、より大きなサイズと完全な詳細を確認しましょう。コピーする前に外観をプレビューします。後で快速にアクセスするためにお気に入りのコレクションに Emoji を追加しましょう。",
    ko: "모든 이모지를 클릭하여 더 큰 크기와 전체 세부 정보를 확인하세요. 복사하기 전에 어떻게 보이는지 미리보기를 즐겨찾기 컬렉션에 이모지를 추가하여 향후 방문 시 빠르게 액세스하세요.",
    pt: "Clique em qualquer emoji para vê-lo em tamanho maior e com todos os detalhes. Pré-visualize como ele fica antes de copiar. Adicione emoji à sua coleção de favoritos para acesso rápido em visitas futuras.",
    ru: "Нажмите на любой эмодзи, чтобы увидеть его в увеличенном размере и со всеми деталями. Предпросмотр того, как он выглядит, перед копированием. Добавьте эмодзи в свою коллекцию избранного для быстрого доступа при будущих посещениях.",
    ar: "انقر على أي إيموجي لرؤيته بحجم أكبر وتفاصيل كاملة. معاينة الشكل قبل النسخ. أضف الإيموجي إلى مجموعة المفضلات لديك للوصول السريع في الزيارات المستقبلية.",
  };
  return texts[lang] || texts.en;
}

function getStep3Name(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Copy & Use",
    zh: "复制和使用",
    fr: "Copier et Utiliser",
    es: "Copiar y Usar",
    de: "Kopieren und Verwenden",
    ja: "コピーして使用",
    ko: "복사 및 사용",
    pt: "Copiar e Usar",
    ru: "Копирование и Использование",
    ar: "انسخ واستخدم",
  };
  return names[lang] || names.en;
}

function getStep3Text(lang: LanguageType): string {
  const texts: Record<LanguageType, string> = {
    en: "Click the copy button to instantly copy the emoji to your clipboard. Paste it anywhere you need - social media posts, chats, emails, documents, websites, and more. No login required, works instantly.",
    zh: "点击复制按钮立即将 Emoji 复制到剪贴板。将其粘贴到任何需要的地方 - 社交媒体帖子、聊天、电子邮件、文档、网站等。无需登录，立即生效。",
    fr: "Cliquez sur le bouton copier pour copier instantanément l'emoji dans votre presse-papiers. Collez-le partout où vous en avez besoin - publications sur les réseaux sociaux, chats, e-mails, documents, sites Web et plus. Aucune connexion requise, fonctionne instantanément.",
    es: "Haz clic en el botón de copiar para copiar instantáneamente el emoji en tu portapapeles. Pégalo donde lo necesites: publicaciones en redes sociales, chats, correos electrónicos, documentos, sitios web y más. No requiere inicio de sesión, funciona instantáneamente.",
    de: "Klicken Sie auf die Schaltfläche Kopieren, um das Emoji sofort in Ihre Zwischenablage zu kopieren. Fügen Sie es überall ein, wo Sie es brauchen - Social-Media-Beiträge, Chats, E-Mails, Dokumente, Websites und mehr. Keine Anmeldung erforderlich, funktioniert sofort.",
    ja: "コピーボタンをクリックして、Emoji を即座にクリップボードにコピーしましょう。必要なところに貼り付けてください - ソーシャルメディアの投稿、チャット、メール、ドキュメント、网站など。ログイン不要、即座に動作します。",
    ko: "복사 버튼을 클릭하여 이모지를 즉시 클립보드에 복사하세요. 필요한 곳에 붙여넣으세요 - 소셜 미디어 게시물, 채팅, 이메일, 문서, 웹사이트 등. 로그인 불필요, 즉시 작동합니다.",
    pt: "Clique no botão copiar para copiar instantaneamente o emoji para sua área de trabalho. Cole-o em qualquer lugar que você precise - postagens em redes sociais, chats, e-mails, documentos, sites e mais. Nenhum login necessário, funciona instantaneamente.",
    ru: "Нажмите кнопку копирования, чтобы мгновенно скопировать эмодзи в буфер обмена. Вставьте его куда угодно - посты в социальных сетях, чаты, электронные письма, документы, веб-сайты и многое другое. Вход не требуется, работает мгновенно.",
    ar: "انقر فوق زر النسخ لنسخ الإيموجي إلى الحافظة الخاصة بك على الفور. الصقه في أي مكان تحتاجه - منشورات وسائل التواصل الاجتماعي، الدردشات، البريد الإلكتروني، المستندات، المواقع الإلكترونية، والمزيد. لا يلزم تسجيل الدخول، يعمل على الفور.",
  };
  return texts[lang] || texts.en;
}

// Category page HowTo functions
function getCategoryStep1Name(
  lang: LanguageType,
  categorySlug: EmojiCategorySlug,
): string {
  const categoryNames: Record<
    EmojiCategorySlug,
    Record<LanguageType, string>
  > = {
    all: {
      en: "Browse Categories",
      zh: "浏览类别",
      fr: "Parcourir les Catégories",
      es: "Explorar Categorías",
      de: "Kategorien Durchsuchen",
      ja: "カテゴリーを閲覧",
      ko: "카테고리 탐색",
      pt: "Navegar nas Categorias",
      ru: "Просмотр Категорий",
      ar: "تصفح الفئات",
    },
    "smileys-emotion": {
      en: "Explore Emotions",
      zh: "探索表情",
      fr: "Explorer les Émotions",
      es: "Explorar Emociones",
      de: "Emotionen Erkunden",
      ja: "感情を探索",
      ko: "감정 탐색",
      pt: "Explorar Emoções",
      ru: "Изучение Эмоций",
      ar: "استكشف المشاعر",
    },
    "people-body": {
      en: "Find People & Gestures",
      zh: "找到人物和手势",
      fr: "Trouver des Personnes et Gestes",
      es: "Encontrar Personas y Gestos",
      de: "Personen und Gesten Finden",
      ja: "人とジェスチャーを探す",
      ko: "사람과 제스처 찾기",
      pt: "Encontrar Pessoas e Gestos",
      ru: "Поиск Людей и Жестов",
      ar: "ابحث عن الأشخاص والإيماءات",
    },
    "animals-nature": {
      en: "Discover Nature Emojis",
      zh: "发现自然 Emoji",
      fr: "Découvrir les Emoji de la Nature",
      es: "Descubrir Emoji de la Naturaleza",
      de: "Natur-Emoji Entdecken",
      ja: "自然の Emoji を発見",
      ko: "자연 이모지 발견",
      pt: "Descobrir Emoji da Natureza",
      ru: "Открытие Природных Эмодзи",
      ar: "اكتشف إيموجي الطبيعة",
    },
    "food-drink": {
      en: "Browse Food & Drinks",
      zh: "浏览食物和饮料",
      fr: "Parcourir la Nourriture et les Boissons",
      es: "Explorar Comida y Bebidas",
      de: "Essen und Trinken Durchsuchen",
      ja: "食事と飲み物を閲覧",
      ko: "음식 및 음료 탐색",
      pt: "Explorar Comidas e Bebidas",
      ru: "Просмотр Еды и Напитков",
      ar: "تصفح الطعام والمشروبات",
    },
    "travel-places": {
      en: "Explore Travel Places",
      zh: "探索旅行地点",
      fr: "Explorer les Lieux de Voyage",
      es: "Explorar Lugares de Viaje",
      de: "Reiseorte Erkunden",
      ja: "旅行先を探索",
      ko: "여행 장소 탐색",
      pt: "Explorar Lugares de Viagem",
      ru: "Изучение Мест Путешествий",
      ar: "استكشف أماكن السفر",
    },
    activities: {
      en: "Find Activities",
      zh: "找到活动",
      fr: "Trouver des Activités",
      es: "Encontrar Actividades",
      de: "Aktivitäten Finden",
      ja: "アクティビティを探す",
      ko: "활동 찾기",
      pt: "Encontrar Atividades",
      ru: "Поиск Занятий",
      ar: "ابحث عن الأنشطة",
    },
    objects: {
      en: "Browse Objects",
      zh: "浏览物品",
      fr: "Parcourir les Objets",
      es: "Explorar Objetos",
      de: "Objekte Durchsuchen",
      ja: "オブジェクトを閲覧",
      ko: "개체 탐색",
      pt: "Explorar Objetos",
      ru: "Просмотр Объектов",
      ar: "تصفح الكائنات",
    },
    symbols: {
      en: "Explore Symbols",
      zh: "探索符号",
      fr: "Explorer les Symboles",
      es: "Explorar Símbolos",
      de: "Symbole Erkunden",
      ja: "シンボルを探索",
      ko: "기호 탐색",
      pt: "Explorar Símbolos",
      ru: "Изучение Символов",
      ar: "استكشف الرموز",
    },
    flags: {
      en: "Browse Flags",
      zh: "浏览旗帜",
      fr: "Parcourir les Drapeaux",
      es: "Explorar Banderas",
      de: "Flaggen Durchsuchen",
      ja: "国旗を閲覧",
      ko: "깃발 탐색",
      pt: "Explorar Bandeiras",
      ru: "Просмотр Флагов",
      ar: "تصفح الأعلام",
    },
  };
  return categoryNames[categorySlug]?.[lang] || categoryNames.all[lang];
}

function getCategoryStep1Text(
  lang: LanguageType,
  categorySlug: EmojiCategorySlug,
): string {
  const categoryTexts: Record<
    EmojiCategorySlug,
    Record<LanguageType, string>
  > = {
    all: {
      en: "Browse our organized emoji categories to find the perfect emoji for your needs. Categories include smileys, animals, food, activities, and more.",
      zh: "浏览我们整理的 Emoji 类别，找到适合您需求的完美 Emoji。类别包括表情、动物、食物、活动等。",
      fr: "Parcourez nos catégories d'emoji organisées pour trouver l'emoji parfait pour vos besoins. Les catégories incluent les smileys, les animaux, la nourriture, les activités et plus encore.",
      es: "Explora nuestras categorías de emoji organizadas para encontrar el emoji perfecto para tus necesidades. Las categorías incluyen smileys, animales, comida, actividades y más.",
      de: "Durchsuchen Sie unsere organisierten Emoji-Kategorien, um das perfekte Emoji für Ihre Bedürfnisse zu finden. Kategorien umfassen Smilies, Tiere, Essen, Aktivitäten und mehr.",
      ja: "必要に最適な Emoji を見つけるために、整理された Emoji カテゴリーを閲覧しましょう。カテゴリーには、スマイル、動物、食べ物、アクティビティなどが含まれます。",
      ko: "필요에 맞는 완벽한 이모지를 찾기 위해 정리된 이모지 카테고리를 탐색하세요. 카테고리에는 스마일, 동물, 음식, 활동 등이 포함됩니다.",
      pt: "Navegue pelas nossas categorias de emoji organizadas para encontrar o emoji perfeito para suas necessidades. As categorias incluem smileys, animais, comida, atividades e muito mais.",
      ru: "Просмотрите наши организованные категории эмодзи, чтобы найти идеальный эмодзи для ваших нужд. Категории включают смайлики, животных, еду, занятия и многое другое.",
      ar: "تصفح فئات الإيموجي المنظمة الخاصة بنا للعثور على الإيموجي المثالي لاحتياجاتك. تشمل الفئات الوجوه الضاحكة، الحيوانات، الطعام، الأنشطة، والمزيد.",
    },
    "smileys-emotion": {
      en: "Express your feelings with our collection of smiley and emotion emojis. Find the perfect face for every mood, from happy 😊 to sad 😢 and everything in between.",
      zh: "使用我们的表情符号和情感 Emoji 集合表达您的感受。找到适合每种心情的完美表情，从开心 😊 到悲伤 😢 以及介于两者之间的一切。",
      fr: "Exprimez vos sentiments avec notre collection d'emoji de smileys et d'émotions. Trouvez le visage parfait pour chaque humeur, du heureux 😊 au triste 😢 et tout ce qui se trouve entre les deux.",
      es: "Expresa tus sentimientos con nuestra colección de emoji de smileys y emociones. Encuentra la cara perfecta para cada estado de ánimo, desde feliz 😊 hasta triste 😢 y todo lo demás.",
      de: "Drücken Sie Ihre Gefühle mit unserer Sammlung von Smiley- und Emotions-Emoji aus. Finden Sie das perfekte Gesicht für jede Stimmung, von glücklich 😊 bis traurig 😢 und alles dazwischen.",
      ja: "笑顔と感情の Emoji コレクションで感情を表現しましょう。幸せ 😊 から悲しい 😢、そしてその間のすべてに最適な顔を見つけます。",
      ko: "스마일리와 감정 이모지 컬렉션으로 감정을 표현하세요. 행복 😊 から 슬픔 😢까지 모든 기분에 맞는 완벽한 표정을 찾으세요.",
      pt: "Expresse seus sentimentos com nossa coleção de emoji de sorrisos e emoções. Encontre o rosto perfeito para cada humor, de feliz 😊 a triste 😢 e tudo mais.",
      ru: "Выразите свои чувства с помощью нашей коллекции смайликов и эмодзи эмоций. Найдите идеальное лицо для каждого настроения, от счастливого 😊 до грустного 😢 и всего, что между ними.",
      ar: "عبر عن مشاعرك باستخدام مجموعتنا من الإيموجي الوجوه التعبيرية والمشاعر. ابحث عن الوجه المثالي لكل مزاج، من السعيد 😊 إلى الحزين 😢 وكل ما بينهما.",
    },
    "people-body": {
      en: "Find the perfect people and body emojis to represent yourself and others. Includes gestures, professions, family members, and skin tone variations.",
      zh: "找到完美的人物和身体 Emoji 来代表您自己和他人。包括手势、职业、家庭成员和肤色变化。",
      fr: "Trouvez les emoji de personnes et de corps parfaits pour vous représenter et représenter les autres. Inclut les gestes, les professions, les membres de la famille et les variations de teinte de peau.",
      es: "Encuentra los emoji perfectos de personas y cuerpo para representarte a ti mismo y a otros. Incluye gestos, profesiones, miembros de la familia y variaciones de tono de piel.",
      de: "Finden Sie die perfekten Personen- und Körper-Emoji, um sich selbst und andere zu repräsentieren. Enthält Gesten, Berufe, Familienmitglieder und Hauttonvariationen.",
      ja: "自分自身や他人を表すために、最適な人と身体の Emoji を見つけます。ジェスチャー、職業、家族メンバー、肌色の変化が含まれています。",
      ko: "자신과 다른 사람을 나타내는 완벽한 사람과 신체 이모지를 찾으세요. 제스처, 직업, 가족 구성원, 피부 톤 변형이 포함됩니다.",
      pt: "Encontre os emoji perfeitos de pessoas e corpo para representar você e os outros. Inclui gestos, profissões, membros da família e variações de tom de pele.",
      ru: "Найдите идеальные эмодзи людей и тела, чтобы представлять себя и других. Включает жесты, профессии, членов семьи и вариации оттенка кожи.",
      ar: "ابحث عن إيموجي الأشخاص والجسم المثالي لتمثيل نفسك والآخرين. تشمل الإيماءات، المهن، أفراد الأسرة، وتنوعات لون البشرة.",
    },
    "animals-nature": {
      en: "Explore our collection of animal and nature emojis. Find cute animals 🐱, plants 🌸, weather ☀, and more to bring your messages to life.",
      zh: "探索我们的动物和自然 Emoji 集合。找到可爱的动物 🐱、植物 🌸、天气 ☀ 等等，让您的信息更加生动。",
      fr: "Explorez notre collection d'emoji d'animaux et de nature. Trouvez des animaux mignons 🐱, des plantes 🌸, la météo ☀ et plus encore pour donner vie à vos messages.",
      es: "Explora nuestra colección de emoji de animales y naturaleza. Encuentra animales lindos 🐱, plantas 🌸, clima ☀ y más para dar vida a tus mensajes.",
      de: "Entdecken Sie unsere Sammlung von Tier- und Natur-Emoji. Finden Sie niedliche Tiere 🐱, Pflanzen 🌸, Wetter ☀ und mehr, um Ihre Nachrichten zum Leben zu erwecken.",
      ja: "動物と自然の Emoji コレクションを探索しましょう。かわいい動物 🐱、植物 🌸、天気 ☀ などを見つけて、メッセージを生き生きさせましょう。",
      ko: "동물 및 자연 이모지 컬렉션을 탐색하세요. 귀여운 동물 🐱, 식물 🌸, 날씨 ☀ 등을 찾아 메시지에 생명을 불어넣으세요.",
      pt: "Explore nossa coleção de emoji de animais e natureza. Encontre animais fofos 🐱, plantas 🌸, clima ☀ e muito mais para dar vida às suas mensagens.",
      ru: "Изучите нашу коллекцию эмодзи животных и природы. Найдите милых животных 🐱, растения 🌸, погоду ☀ и многое другое, чтобы оживить ваши сообщения.",
      ar: "استكشف مجموعتنا من إيموجي الحيوانات والطبيعة. ابحث عن الحيوانات اللطيفة 🐱، النباتات 🌸، الطقس ☀، والمزيد لإحياء رسائلك.",
    },
    "food-drink": {
      en: "Browse delicious food and drink emojis for your culinary expressions. From fruits 🍎 to drinks ☕ and desserts 🍰, find the perfect taste for your message.",
      zh: "浏览美味的食物和饮料 Emoji，用于您的美食表达。从水果 🍎 到饮料 ☕ 和甜点 🍰，为您的信息找到完美的味道。",
      fr: "Parcourez des emoji de nourriture et de boissons délicieux pour vos expressions culinaires. Des fruits 🍎 aux boissons ☕ et aux desserts 🍰, trouvez le goût parfait pour votre message.",
      es: "Explora deliciosos emoji de comida y bebida para tus expresiones culinarias. Desde frutas 🍎 hasta bebidas ☕ y postres 🍰, encuentra el sabor perfecto para tu mensaje.",
      de: "Durchsuchen Sie köstliche Essen- und Getränke-Emoji für Ihre kulinarischen Ausdrücke. Von Obst 🍎 über Getränke ☕ bis zu Desserts 🍰 finden Sie den perfekten Geschmack für Ihre Nachricht.",
      ja: "料理の表現のための美味しい食べ物と飲み物の Emoji を閲覧しましょう。果物 🍎 から飲み物 ☕、デザート 🍰 まで、メッセージに最適な味を見つけます。",
      ko: "요리 표현을 위한 맛있는 음식 및 음료 이모지를 탐색하세요. 과일 🍎 부터 음료 ☕, 디저트 🍰 까지 메시지에 완벽한 맛을 찾으세요.",
      pt: "Navegue por deliciosos emoji de comida e bebida para suas expressões culinárias. De frutas 🍎 a bebidas ☕ e sobremesas 🍰, encontre o sabor perfeito para sua mensagem.",
      ru: "Просмотрите восхитительные эмодзи еды и напитков для ваших кулинарных выражений. От фруктов 🍎 до напитков ☕ и десертов 🍰 найдите идеальный вкус для вашего сообщения.",
      ar: "تصفح إيموجي الطعام والمشروبات اللذيذة لتعبيراتك culinaria. من الفواكه 🍎 إلى المشروبات ☕ والحلويات 🍰، ابحث عن الطعم المثالي لرسالتك.",
    },
    "travel-places": {
      en: "Travel the world with our place and travel emojis. Explore destinations 🌍, vehicles ✈, and landmarks 🗽 to set the scene for your adventures.",
      zh: "使用我们的地点和旅行 Emoji 环游世界。探索目的地 🌍、交通工具 ✈ 和地标 🗽，为您的冒险设定场景。",
      fr: "Voyagez dans le monde avec nos emoji de lieux et de voyage. Explorez les destinations 🌍, les véhicules ✈ et les monuments 🗽 pour donner le ton à vos aventures.",
      es: "Viaja por el mundo con nuestros emoji de lugares y viajes. Explora destinos 🌍, vehículos ✈ y monumentos 🗽 para establecer la escena de tus aventuras.",
      de: "Reisen Sie mit unseren Ort- und Reise-Emoji um die Welt. Erkunden Sie Reiseziele 🌍, Fahrzeuge ✈ und Wahrzeichen 🗽, um die Bühne für Ihre Abenteuer zu setzen.",
      ja: "場所と旅行の Emoji で世界を旅行しましょう。目的地 🌍、交通工具 ✈、ランドマーク 🗽 を探索して、アドベンチャーの舞台を設定します。",
      ko: "장소 및 여행 이모지로 세계를 여행하세요. 목적지 🌍, 차량 ✈, 랜드마크 🗽를 탐색하여 모험의 무대를 설정하세요.",
      pt: "Viaje pelo mundo com nossos emoji de lugares e viagens. Explore destinos 🌍, veículos ✈ e pontos turísticos 🗽 para definir o cenário de suas aventuras.",
      ru: "Путешествуйте по миру с нашими эмодзи мест и путешествий. Исследуйте направления 🌍, транспортные средства ✈ и достопримечательности 🗽, чтобы задать тон вашим приключениям.",
      ar: "سافر حول العالم مع إيموجي الأماكن والسفر. استكشف الوجهات 🌍، المركبات ✈، والمعالم 🗽 لتحديد مشهد مغامراتك.",
    },
    activities: {
      en: "Find activity emojis for sports, games, and events. From sports ⚽ to celebrations 🎉 and arts 🎨, express what you love to do.",
      zh: "找到用于体育、游戏和活动的活动 Emoji。从体育 ⚽ 到庆祝活动 🎉 和艺术 🎨，表达您喜欢做什么。",
      fr: "Trouvez des emoji d'activités pour les sports, les jeux et les événements. Des sports ⚽ aux célébrations 🎉 et aux arts 🎨, exprimez ce que vous aimez faire.",
      es: "Encuentra emoji de actividades para deportes, juegos y eventos. Desde deportes ⚽ hasta celebraciones 🎉 y artes 🎨, expresa lo que te gusta hacer.",
      de: "Finden Sie Aktivitäts-Emoji für Sport, Spiele und Veranstaltungen. Von Sport ⚽ über Feiern 🎉 bis zu Kunst 🎨 drücken Sie aus, was Sie gerne tun.",
      ja: "スポーツ、ゲーム、イベント用のアクティビティ Emoji を見つけます。スポーツ ⚽ から祝賀会 🎉、アート 🎨 まで、自分が好きなことを表現しましょう。",
      ko: "스포츠, 게임, 이벤트에 대한 활동 이모지를 찾으세요. 스포츠 ⚽ 부터 축하 🎉, 예술 🎨 까지 좋아하는 것을 표현하세요.",
      pt: "Encontre emoji de atividades para esportes, jogos e eventos. De esportes ⚽ a celebrações 🎉 e artes 🎨, expresse o que você ama fazer.",
      ru: "Найдите эмодзи активности для спорта, игр и мероприятий. От спорта ⚽ до праздников 🎉 и искусства 🎨 выразите то, что вам нравится делать.",
      ar: "ابحث عن إيموجي الأنشطة للرياضة والألعاب والأحداث. من الرياضة ⚽ إلى الاحتفالات 🎉 والفنون 🎨، عبر عما تحب فعله.",
    },
    objects: {
      en: "Browse objects emojis for everyday items and tools. Find technology 💻, objects 💡, and symbols 🔔 to enhance your communications.",
      zh: "浏览日常用品和工具的物品 Emoji。找到技术 💡、物品 💡 和符号 🔔 来增强您的交流。",
      fr: "Parcourez des emoji d'objets pour les articles et outils quotidiens. Trouvez la technologie 💻, les objets 💡 et les symboles 🔔 pour améliorer vos communications.",
      es: "Explora emoji de objetos para artículos y herramientas cotidianos. Encuentra tecnología 💻, objetos 💡 y símbolos 🔔 para mejorar tus comunicaciones.",
      de: "Durchsuchen Sie Objekte-Emoji für Alltagsgegenstände und Werkzeuge. Finden Sie Technologie 💻, Objekte 💡 und Symbole 🔔, um Ihre Kommunikation zu verbessern.",
      ja: "日常品とツールのオブジェクト Emoji を閲覧しましょう。テクノロジー 💻、オブジェクト 💡、シンボル 🔔 を見つけて、コミュニケーションを強化します。",
      ko: "일상용품 및 도구의 개체 이모지를 탐색하세요. 기술 💻, 개체 💡, 기호 🔔를 찾아 커뮤니케이션을 향상시키세요.",
      pt: "Navegue por emoji de objetos para itens e ferramentas do cotidiano. Encontre tecnologia 💻, objetos 💡 e símbolos 🔔 para melhorar suas comunicações.",
      ru: "Просмотрите эмодзи объектов для повседневных предметов и инструментов. Найдите технологии 💻, объекты 💡 и символы 🔔, чтобы улучшить вашу коммуникацию.",
      ar: "تصفح إيموجي الكائنات للعناصر والأدوات اليومية. ابحث عن التكنولوجيا 💻، الكائنات 💡، والرموز 🔔 لتعزيز اتصالاتك.",
    },
    symbols: {
      en: "Express concepts with symbol emojis. Find zodiac signs ♈, arrows ➡, and abstract symbols 🌀 to convey meaning beyond words.",
      zh: "使用符号 Emoji 表达概念。找到十二星座 ♈、箭头 ➡ 和抽象符号 🌀，传达文字之外的含义。",
      fr: "Exprimez des concepts avec des emoji de symboles. Trouvez les signes du zodiaque ♈, les flèches ➡ et les symboles abstraits 🌀 pour transmettre des significations au-delà des mots.",
      es: "Expresa conceptos con emoji de símbolos. Encuentra signos zodiacales ♈, flechas ➡ y símbolos abstractos 🌀 para transmitir significado más allá de las palabras.",
      de: "Drücken Sie Konzepte mit Symbol-Emoji aus. Finden Sie Sternzeichen ♈, Pfeile ➡ und abstrakte Symbole 🌀 aus, um Bedeutungen über Worte hinaus zu vermitteln.",
      ja: "コンセプトをシンボル Emoji で表現しましょう。 zodiac sign ♈、矢印 ➡、抽象シンボル 🌀 を見つけて、言葉を超えた意味を伝えます。",
      ko: "기호 이모지로 개념을 표현하세요. zodiac sign ♈, 화살표 ➡, 추상 기호 🌀를 찾아 단어 이상의 의미를 전달하세요.",
      pt: "Expresse conceitos com emoji de símbolos. Encontre signos do zodíaco ♈, setas ➡ e símbolos abstratos 🌀 para transmitir significado além das palavras.",
      ru: "Выражайте концепции с помощью символьных эмодзи. Найдите знаки зодиака ♈, стрелки ➡ и абстрактные символы 🌀, чтобы передать значение за пределами слов.",
      ar: "عبر عن المفاهيم باستخدام إيموجي الرموز. ابحث عن علامات الأبراج ♈، السهام ➡، والرموز المجردة 🌀 لنقل المعنى بما يتجاوز الكلمات.",
    },
    flags: {
      en: "Use flag emojis to represent countries, regions, and pride. Find national flags 🏳, regional flags 🏴, and pride flags 🏳 for identity expression.",
      zh: "使用旗帜 Emoji 代表国家、地区和骄傲。找到国旗 🏳、地区旗帜 🏴 和骄傲旗帜 🏳 来表达身份。",
      fr: "Utilisez des emoji de drapeaux pour représenter les pays, les régions et la fierté. Trouvez les drapeaux nationaux 🏳, les drapeaux régionaux 🏴 et les drapeaux de fierté 🏳 pour l'expression de l'identité.",
      es: "Usa emoji de banderas para representar países, regiones y orgullo. Encuentra banderas nacionales 🏳, banderas regionales 🏴 y banderas de orgullo 🏳 para la expresión de identidad.",
      de: "Verwenden Sie Flaggen-Emoji, um Länder, Regionen und Stolz zu repräsentieren. Finden Sie Nationalflaggen 🏳, Regionalflaggen 🏴 und Stolzflaggen 🏳 für Identitätsausdrücke.",
      ja: "国、地区、誇りを表すために旗の Emoji を使用しましょう。国道旗 🏳、地域旗 🏴、誇りの旗 🏳 を見つけてアイデンティティを表現します。",
      ko: "국가, 지역, 자부심을 나타내는 데 깃발 이모지를 사용하세요. 국가 깃발 🏳, 지역 깃발 🏴, 자부심 깃발 🏳를 찾아 정체성을 표현하세요.",
      pt: "Use emoji de bandeiras para representar países, regiões e orgulho. Encontre bandeiras nacionais 🏳, bandeiras regionais 🏴 e bandeiras de orgulho 🏳 para expressão de identidade.",
      ru: "Используйте эмодзи флагов для представления стран, регионов и гордости. Найдите национальные флаги 🏳, региональные флаги 🏴 и флаги гордости 🏳 для выражения идентичности.",
      ar: "استخدم إيموجي الأعلام لتمثيل البلدان والمناطق والفخر. ابحث عن الأعلام الوطنية 🏳، أعلام المناطق 🏴، وأعلام الفخر 🏳 لتعبير الهوية.",
    },
  };
  return categoryTexts[categorySlug]?.[lang] || categoryTexts.all[lang];
}

// Category page HowTo functions
function getCategoryStep2Name(
  lang: LanguageType,
  _categorySlug: EmojiCategorySlug,
): string {
  const names: Record<LanguageType, string> = {
    en: "Browse & Search Emojis",
    zh: "浏览和搜索 Emoji",
    fr: "Parcourir et Rechercher des Emoji",
    es: "Navegar y Buscar Emoji",
    de: "Emoji Durchsuchen und Suchen",
    ja: "Emoji を閲覧および検索",
    ko: "이모지 탐색 및 검색",
    pt: "Navegar e Pesquisar Emoji",
    ru: "Просмотр и Поиск Эмодзи",
    ar: "تصفح وابحث عن الإيموجي",
  };
  return names[lang] || names.en;
}

// Category page HowTo functions
function getCategoryStep2Text(
  lang: LanguageType,
  _categorySlug: EmojiCategorySlug,
): string {
  const defaultText: Record<LanguageType, string> = {
    en: "Once you've selected a category, browse through the emoji collection or use the search bar to find specific emojis by keyword, name, or description.",
    zh: "选择类别后，浏览 Emoji 集合或使用搜索栏通过关键字、名称或描述查找特定的 Emoji。",
    fr: "Une fois que vous avez sélectionné une catégorie, parcourez la collection d'emoji ou utilisez la barre de recherche pour trouver des emoji spécifiques par mot-clé, nom ou description.",
    es: "Una vez que hayas seleccionado una categoría, navega por la colección de emoji o usa la barra de búsqueda para encontrar emoji específicos por palabra clave, nombre o descripción.",
    de: "Nachdem Sie eine Kategorie ausgewählt haben, durchsuchen Sie die Emoji-Sammlung oder verwenden Sie die Suchleiste, um bestimmte Emoji nach Schlüsselwort, Name oder Beschreibung zu finden.",
    ja: "カテゴリーを選択したら、Emoji コレクションを閲覧するか、キーワード、名前、または説明によって特定の Emoji を見つけるために検索バーを使用しましょう。",
    ko: "카테고리를 선택하면 이모지 컬렉션을 탐색하거나 키워드, 이름 또는 설명으로 특정 이모지를 찾기 위해 검색창을 사용하세요.",
    pt: "Depois de selecionar uma categoria, navegue pela coleção de emoji ou use a barra de pesquisa para encontrar emoji específicos por palavra-chave, nome ou descrição.",
    ru: "После выбора категории просмотрите коллекцию эмодзи или используйте строку поиска для поиска конкретных эмодзи по ключевому слову, названию или описанию.",
    ar: "بمجرد اختيارك للفئة، تصفح مجموعة الإيموجي أو استخدم شريط البحث للعثور على الإيموجي المحدد بالكلمة المفتاحية، الاسم، أو الوصف.",
  };
  return defaultText[lang] || defaultText.en;
}

// Category page HowTo functions
function getCategoryStep3Name(
  lang: LanguageType,
  _categorySlug: EmojiCategorySlug,
): string {
  const names: Record<LanguageType, string> = {
    en: "Copy Your Emoji",
    zh: "复制您的 Emoji",
    fr: "Copier Votre Emoji",
    es: "Copia Tu Emoji",
    de: "Kopieren Sie Ihr Emoji",
    ja: "Emoji をコピー",
    ko: "이모지 복사",
    pt: "Copie Seu Emoji",
    ru: "Копирование Эмодзи",
    ar: "انسخ إيموجيك",
  };
  return names[lang] || names.en;
}

// Category page HowTo functions
function getCategoryStep3Text(
  lang: LanguageType,
  _categorySlug: EmojiCategorySlug,
): string {
  const texts: Record<LanguageType, string> = {
    en: "Click on any emoji to copy it to your clipboard instantly. Paste it into social media posts, chats, emails, documents, or anywhere else you need to express yourself.",
    zh: "点击任何 Emoji 即可立即将其复制到剪贴板。将其粘贴到社交媒体帖子、聊天、电子邮件、文档或任何需要表达自己的地方。",
    fr: "Cliquez sur n'importe quel emoji pour le copier instantanément dans votre presse-papiers. Collez-le dans des publications sur les réseaux sociaux, des chats, des e-mails, des documents ou partout ailleurs où vous devez vous exprimer.",
    es: "Haz clic en cualquier emoji para copiarlo instantáneamente en tu portapapeles. Pégalo en publicaciones de redes sociales, chats, correos electrónicos, documentos o en cualquier otro lugar donde necesites expresarte.",
    de: "Klicken Sie auf ein beliebiges Emoji, um es sofort in Ihre Zwischenablage zu kopieren. Fügen Sie es in Social-Media-Beiträge, Chats, E-Mails, Dokumente oder überall ein, wo Sie sich ausdrücken möchten.",
    ja: "任意の Emoji をクリックして、即座にクリップボードにコピーしましょう。ソーシャルメディアの投稿、チャット、メール、ドキュメント、または表現が必要な他の場所に貼り付けてください。",
    ko: "모든 이모지를 클릭하여 즉시 클립보드에 복사하세요. 소셜 미디어 게시물, 채팅, 이메일, 문서 또는 자신을 표현해야 하는 다른 모든 곳에 붙여넣으세요.",
    pt: "Clique em qualquer emoji para copiá-lo instantaneamente para sua área de trabalho. Cole-o em postagens de redes sociais, chats, e-mails, documentos ou em qualquer outro lugar onde você precise se expressar.",
    ru: "Нажмите на любой эмодзи, чтобы мгновенно скопировать его в буфер обмена. Вставьте его в посты в социальных сетях, чаты, электронные письма, документы или куда угодно, где вам нужно выразить себя.",
    ar: "انقر على أي إيموجي لنسخه إلى الحافظة الخاصة بك على الفور. الصقه في منشورات وسائل التواصل الاجتماعي، الدردشات، البريد الإلكتروني، المستندات، أو أي مكان آخر تحتاج فيه للتعبير عن نفسك.",
  };
  return texts[lang] || texts.en;
}

// Topic page HowTo functions
function getTopicStep1Name(lang: LanguageType, _topicSlug: string): string {
  const names: Record<LanguageType, string> = {
    en: "Explore Topic Combinations",
    zh: "探索主题组合",
    fr: "Explorer les Combinaisons de Sujets",
    es: "Explorar Combinaciones de Temas",
    de: "Themenkombinationen Erkunden",
    ja: "テーマの組み合わせを探索",
    ko: "토픽 조합 탐색",
    pt: "Explorar Combinações de Tópicos",
    ru: "Изучение Комбинаций Тем",
    ar: "استكشف مجموعات الموضوعات",
  };
  return names[lang] || names.en;
}

// Topic page HowTo functions
function getTopicStep1Text(lang: LanguageType, _topicSlug: string): string {
  const texts: Record<LanguageType, string> = {
    en: "Discover unique emoji combinations and variations for each topic. Each topic page shows different ways to express ideas using emojis.",
    zh: "发现每个主题的独特 Emoji 组合和变体。每个主题页面都显示了使用 Emoji 表达想法的不同方式。",
    fr: "Découvrez des combinaisons et des variations d'emoji uniques pour chaque sujet. Chaque page de sujet montre différentes manières d'exprimer des idées utilisant des emoji.",
    es: "Descubre combinaciones y variaciones de emoji únicas para cada tema. Cada página de tema muestra diferentes formas de expresar ideas usando emoji.",
    de: "Entdecken Sie einzigartige Emoji-Kombinationen und -Variation für jedes Thema. Jede Themenseite zeigt verschiedene Möglichkeiten, Ideen mit Emoji auszudrücken.",
    ja: "各テーマのユニークな Emoji 組み合わせとバリエーションを発見しましょう。各テーマページは、Emoji を使用してアイデアを表現する異なる方法を示しています。",
    ko: "각 토픽에 대한 고유한 이모지 조합과 변형을 발견하세요. 각 토픽 페이지는 이모지를 사용하여 아이디어를 표현하는 다양한 방법을 보여줍니다.",
    pt: "Descubra combinações e variações de emoji únicas para cada tópico. Cada página de tópico mostra diferentes maneiras de expressar ideias usando emoji.",
    ru: "Откройте для себя уникальные комбинации и вариации эмодзи для каждой темы. Каждая страница темы показывает различные способы выражения идей с помощью эмодзи.",
    ar: "اكتشف مجموعات الإيموجي الفريدة والتغييرات لكل موضوع. تظهر كل صفحة موضوع طرقا مختلفة للتعبير عن الأفكار باستخدام الإيموجي.",
  };
  return texts[lang] || texts.en;
}

// Topic page HowTo functions
function getTopicStep2Name(lang: LanguageType, _topicSlug: string): string {
  const names: Record<LanguageType, string> = {
    en: "Preview & Select",
    zh: "预览和选择",
    fr: "Aperçu et Sélection",
    es: "Vista Previa y Selección",
    de: "Vorschau und Auswahl",
    ja: "プレビューと選択",
    ko: "미리보기 및 선택",
    pt: "Pré-visualização e Seleção",
    ru: "Предпросмотр и Выбор",
    ar: "معاينة واختيار",
  };
  return names[lang] || names.en;
}

// Topic page HowTo functions
function getTopicStep2Text(lang: LanguageType, _topicSlug: string): string {
  const texts: Record<LanguageType, string> = {
    en: "Click on any emoji combination to preview how it looks. See real-world usage examples and scenarios for each combination.",
    zh: "点击任何 Emoji 组合以预览其外观。查看每种组合的真实使用示例和场景。",
    fr: "Cliquez sur n'importe quelle combinaison d'emoji pour prévisualiser son apparence. Voyez des exemples d'utilisation réelle et des scénarios pour chaque combinaison.",
    es: "Haz clic en cualquier combinación de emoji para previsualizar cómo se ve. Ve ejemplos de uso real y escenarios para cada combinación.",
    de: "Klicken Sie auf eine beliebige Emoji-Kombination, um eine Vorschau zu sehen. Sehen Sie sich Beispiele für die tatsächliche Verwendung und Szenarien für jede Kombination an.",
    ja: "任意の Emoji 組み合わせをクリックして、外観をプレビューしましょう。各組み合わせの実際の使用例とシナリオを確認します。",
    ko: "모든 이모지 조합을 클릭하여 모양을 미리보세요. 각 조합에 대한 실제 사용 예제와 시나리오를 확인하세요.",
    pt: "Clique em qualquer combinação de emoji para pré-visualizar como ela fica. Veja exemplos de uso real e cenários para cada combinação.",
    ru: "Нажмите на любую комбинацию эмодзи, чтобы увидеть, как она выглядит. Посмотрите примеры использования в реальном мире и сценарии для каждой комбинации.",
    ar: "انقر على أي مجموعة إيموجي لمعاينة شكلها. راجع أمثلة الاستخدام الحقيقي والسيناريوهات لكل مجموعة.",
  };
  return texts[lang] || texts.en;
}

// Topic page HowTo functions
function getTopicStep3Name(lang: LanguageType, _topicSlug: string): string {
  const names: Record<LanguageType, string> = {
    en: "Copy & Express",
    zh: "复制和表达",
    fr: "Copier et Exprimer",
    es: "Copiar y Expresar",
    de: "Kopieren und Ausdrücken",
    ja: "コピーして表現",
    ko: "복사 및 표현",
    pt: "Copiar e Expressar",
    ru: "Копирование и Выражение",
    ar: "انسخ والتعبير",
  };
  return names[lang] || names.en;
}

function getTopicStep3Text(lang: LanguageType, topicSlug: string): string {
  // Get topic display name from slug
  const topicNames: Record<string, Record<LanguageType, string>> = {
    music: {
      en: "Music",
      zh: "音乐",
      fr: "Musique",
      es: "Música",
      de: "Musik",
      ja: "音楽",
      ko: "음악",
      pt: "Música",
      ru: "Музыка",
      ar: "الموسيقى",
    },
    celebration: {
      en: "Celebration",
      zh: "庆祝",
      fr: "Célébration",
      es: "Celebración",
      de: "Feier",
      ja: "祝賀",
      ko: "축하",
      pt: "Celebração",
      ru: "Празднование",
      ar: "الاحتفال",
    },
    love: {
      en: "Love",
      zh: "爱情",
      fr: "Amour",
      es: "Amor",
      de: "Liebe",
      ja: "愛",
      ko: "사랑",
      pt: "Amor",
      ru: "Любовь",
      ar: "الحب",
    },
    summer: {
      en: "Summer",
      zh: "夏天",
      fr: "Été",
      es: "Verano",
      de: "Sommer",
      ja: "夏",
      ko: "여름",
      pt: "Verão",
      ru: "Лето",
      ar: "الصيف",
    },
    travel: {
      en: "Travel",
      zh: "旅行",
      fr: "Voyage",
      es: "Viaje",
      de: "Reise",
      ja: "旅行",
      ko: "여행",
      pt: "Viagem",
      ru: "Путешествие",
      ar: "السفر",
    },
    nature: {
      en: "Nature",
      zh: "自然",
      fr: "Nature",
      es: "Naturaleza",
      de: "Natur",
      ja: "自然",
      ko: "자연",
      pt: "Natureza",
      ru: "Природа",
      ar: "الطبيعة",
    },
    food: {
      en: "Food",
      zh: "食物",
      fr: "Nourriture",
      es: "Comida",
      de: "Essen",
      ja: "食べ物",
      ko: "음식",
      pt: "Comida",
      ru: "Еда",
      ar: "الطعام",
    },
    sports: {
      en: "Sports",
      zh: "运动",
      fr: "Sports",
      es: "Deportes",
      de: "Sport",
      ja: "スポーツ",
      ko: "스포츠",
      pt: "Esportes",
      ru: "Спорт",
      ar: "الرياضة",
    },
    work: {
      en: "Work",
      zh: "工作",
      fr: "Travail",
      es: "Trabajo",
      de: "Arbeit",
      ja: "仕事",
      ko: "업무",
      pt: "Trabalho",
      ru: "Работа",
      ar: "العمل",
    },
    animals: {
      en: "Animals",
      zh: "动物",
      fr: "Animaux",
      es: "Animales",
      de: "Tiere",
      ja: "動物",
      ko: "동물",
      pt: "Animais",
      ru: "Животные",
      ar: "الحيوانات",
    },
  };
  const topicName = topicNames[topicSlug]?.[lang] || topicSlug;

  const texts: Record<LanguageType, string> = {
    en: `Copy your selected ${topicName} emoji combination and use it in your messages, social media posts, bios, and more. Express yourself creatively with unique emoji combinations。`,
    zh: `复制您选择的 ${topicName} Emoji 组合并在消息、社交媒体帖子、个人简介等中使用它。使用独特的 Emoji 组合创造性地表达自己。`,
    fr: `Copiez votre combinaison d'emoji ${topicName} sélectionnée et utilisez-la dans vos messages, publications sur les réseaux sociaux, bios et plus. Exprimez-vous de manière créative avec des combinaisons d'emoji uniques。`,
    es: `Copia la combinación de emoji ${topicName} seleccionada y úsala en tus mensajes, publicaciones de redes sociales, biografías y más. Exprésate de forma creativa con combinaciones de emoji únicas。`,
    de: `Kopieren Sie Ihre ausgewählte ${topicName} Emoji-Kombination und verwenden Sie sie in Ihren Nachrichten, Social-Media-Posts, Biografien und mehr. Drücken Sie sich mit einzigartigen Emoji-Kombinationen kreativ aus。`,
    ja: `選択した ${topicName} Emoji 組み合わせてコピーして、メッセージ、ソーシャルメディアの投稿、プロフィールなどで使用しましょう。ユニークな Emoji 組み合わせて創造的に自分を表現してください。`,
    ko: `선택한 ${topicName} 이모지 조합을 복사하여 메시지, 소셜 미디어 게시물, 프로필 등에서 사용하세요. 고유한 이모지 조합으로 창의적으로 자신을 표현하세요。`,
    pt: `Copie sua combinação de emoji ${topicName} selecionada e use-a em suas mensagens, postagens de redes sociais, bios e muito mais. Expresse-se de forma criativa com combinações de emoji únicas。`,
    ru: `Скопируйте выбранную комбинацию эмодзи ${topicName} и используйте ее в своих сообщениях, постах в социальных сетях, биографиях и многом другом. Выражайте себя творчески с уникальными комбинациями эмодзи。`,
    ar: `انسخ مجموعة الإيموجي ${topicName} 氏定型استخدمها في رسائلك، منشورات وسائل التواصل الاجتماعي، السير الذاتية، والمزيد. عبر عن نفسك بإبداع باستخدام مجموعات الإيموجي الفريدة。`,
  };
  return texts[lang] || texts.en;
}
