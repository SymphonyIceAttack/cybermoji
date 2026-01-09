import type { Blog, CollectionPage, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface BlogPageStructuredDataProps {
  lang: LanguageType;
}

export function BlogPageStructuredData({ lang }: BlogPageStructuredDataProps) {
  const blogSchema: WithContext<Blog> = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: getBlogName(lang),
    description: getBlogDescription(lang),
    url: `${siteConfig.siteUrl}/${lang}/blog`,
    inLanguage: getLanguageCode(lang),
    blogPost: getBlogPosts(lang),
  };

  const collectionSchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: getCollectionName(lang),
    description: getCollectionDescription(lang),
    url: `${siteConfig.siteUrl}/${lang}/blog`,
    mainEntity: blogSchema,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
    </>
  );
}

function getBlogName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Cybermoji Blog - Instagram Tips, Guides & Privacy News",
    zh: "Cybermoji 博客 - Instagram 技巧、指南和隐私资讯",
    fr: "Blog Cybermoji - Conseils Instagram, guides et actualité confidentialité",
    es: "Blog de Cybermoji - Consejos de Instagram, guías y noticias de privacidad",
    de: "Cybermoji Blog - Instagram-Tipps, Anleitungen und Datenschutz-News",
    ja: "Cybermoji ブログ - Instagram チップス、ガイド、プライバシー news",
    ko: "Cybermoji 블로그 - Instagram 팁, 가이드 및 프라이버시 뉴스",
    pt: "Blog Cybermoji - Dicas do Instagram, guias e notícias de privacidade",
    ru: "Блог Cybermoji - Советы по Instagram, руководства и новости о конфиденциальности",
    ar: "مدونة Cybermoji - نصائح إنستغرام وأدلة وأخبار الخصوصية",
  };
  return names[lang] || names.en;
}

function getBlogDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Latest articles on Instagram viewing, privacy tips, content creation strategies, and social media insights.",
    zh: "关于 Instagram 查看、隐私提示、内容创作策略和社交媒体洞察的最新文章。",
    fr: "Derniers articles sur la visualisation Instagram, conseils de confidentialité, stratégies de création de contenu et aperçus des médias sociaux.",
    es: "Últimos artículos sobre visualización de Instagram, consejos de privacidad, estrategias de creación de contenido y conocimientos de redes sociales.",
    de: "Neueste Artikel über Instagram-Ansicht, Datenschutz-Tipps, Content-Strategien und Social-Media-Einblicke.",
    ja: "Instagram閲覧、プライバシーチップス、コンテンツ作成戦略、ソーシャルメディアのインサイトに関する最新記事。",
    ko: "Instagram 시청, 프라이버시 팁, 콘텐츠 제작 전략, 소셜 미디어 인사이트에 관한 최신 기사.",
    pt: "Últimos artigos sobre visualização do Instagram, dicas de privacidade, estratégias de criação de conteúdo e insights de mídia social.",
    ru: "Последние статьи о просмотре Instagram, советах по конфиденциальности, стратегиях создания контента и аналитике социальных сетей.",
    ar: "أحدث المقالات حول مشاهدة إنستغرام ونصائح الخصوصية واستراتيجيات إنشاء المحتوى ورؤى وسائل التواصل الاجتماعي.",
  };
  return descriptions[lang] || descriptions.en;
}

function getCollectionName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Blog - Cybermoji",
    zh: "博客 - Cybermoji",
    fr: "Blog - Cybermoji",
    es: "Blog - Cybermoji",
    de: "Blog - Cybermoji",
    ja: "ブログ - Cybermoji",
    ko: "블로그 - Cybermoji",
    pt: "Blog - Cybermoji",
    ru: "Блог - Cybermoji",
    ar: "مدونة - Cybermoji",
  };
  return names[lang] || names.en;
}

function getCollectionDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Browse all articles from Cybermoji. Learn about Instagram privacy, anonymous viewing, and content creation.",
    zh: "浏览 Cybermoji 的所有文章。了解 Instagram 隐私、匿名浏览和内容创作。",
    fr: "Parcourez tous les articles de Cybermoji. Apprenez la confidentialité Instagram, la visualisation anonyme et la création de contenu.",
    es: "Explora todos los artículos de Cybermoji. Aprende sobre privacidad de Instagram, visualización anónima y creación de contenido.",
    de: "Durchsuchen Sie alle Artikel von Cybermoji. Erfahren Sie mehr über Instagram-Datenschutz, anonymes Ansehen und Content-Erstellung.",
    ja: "Cybermoji のすべての記事を閲覧。Instagram のプライバシー、匿名閲覧、コンテンツ作成について学びます。",
    ko: "Cybermoji의 모든 기사를 탐색합니다. Instagram 프라이버시, 익명 시청, 콘텐츠 제작에 대해 알아보세요.",
    pt: "Navegue por todos os artigos do Cybermoji. Aprenda sobre privacidade do Instagram, visualização anônima e criação de conteúdo.",
    ru: "Просмотрите все статьи Cybermoji. Узнайте о конфиденциальности Instagram, анонимном просмотре и создании контента.",
    ar: "تصفح جميع مقالات Cybermoji. تعرف على خصوصية إنستغرام والمشاهدة المجهولة الهوية وإنشاء المحتوى.",
  };
  return descriptions[lang] || descriptions.en;
}

function getLanguageCode(lang: LanguageType): string {
  const codes: Record<LanguageType, string> = {
    en: "en",
    zh: "zh",
    fr: "fr",
    es: "es",
    de: "de",
    ja: "ja",
    ko: "ko",
    pt: "pt",
    ru: "ru",
    ar: "ar",
  };
  return codes[lang] || "en";
}

interface BlogPost {
  "@type": "BlogPosting";
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
}

function getBlogPosts(lang: LanguageType): BlogPost[] {
  const baseUrl = siteConfig.siteUrl;

  const posts: Record<LanguageType, BlogPost[]> = {
    en: [
      {
        "@type": "BlogPosting",
        headline: "Complete Guide to Instagram Tools in 2026",
        description:
          "A comprehensive overview of the best Instagram tools available in 2026. From analytics to content creation, discover what tools you need for success.",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram Privacy: Best Practices for Safe Browsing",
        description:
          "Protect your privacy while using Instagram. Learn essential privacy settings, anonymous browsing techniques, and how to control your digital footprint.",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram Content Creator's Complete Guide",
        description:
          "Everything content creators need to know about growing on Instagram. Strategy, analytics, content planning, and monetization insights.",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    zh: [
      {
        "@type": "BlogPosting",
        headline: "2026 年 Instagram 工具完整指南",
        description:
          "全面概述 2026 年可用的最佳 Instagram 工具。从分析到内容创作，发现成功所需的工具。",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram 隐私：安全浏览最佳实践",
        description:
          "在使用 Instagram 时保护您的隐私。了解基本的隐私设置、匿名浏览技术以及如何控制您的数字足迹。",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram 内容创作者完整指南",
        description:
          "内容创客在 Instagram 上成长所需了解的一切。策略、分析、内容规划和盈利洞察。",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    fr: [
      {
        "@type": "BlogPosting",
        headline: "Guide Complet des Outils Instagram en 2026",
        description:
          "Un aperçu complet des meilleurs outils Instagram disponibles en 2026. De l'analyse à la création de contenu, découvrez les outils dont vous avez besoin pour réussir.",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline:
          "Confidentialité Instagram : Meilleures Pratiques pour une Navigation Sécurisée",
        description:
          "Protégez votre vie privée lors de l'utilisation d'Instagram. Apprenez les paramètres de confidentialité essentiels, les techniques de navigation anonyme et comment contrôler votre empreinte numérique.",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Guide Complet du Créateur de Contenu Instagram",
        description:
          "Tout ce que les créateurs de contenu doivent savoir pour réussir sur Instagram. Stratégie, analytique, planification de contenu et perspectives de monétisation.",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    es: [
      {
        "@type": "BlogPosting",
        headline: "Guía Completa de Herramientas de Instagram en 2026",
        description:
          "Una descripción general completa de las mejores herramientas de Instagram disponibles en 2026. Desde análisis hasta creación de contenido, descubre las herramientas que necesitas para tener éxito.",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline:
          "Privacidad de Instagram: Mejores Prácticas para Navegación Segura",
        description:
          "Protege tu privacidad mientras usas Instagram. Aprende configuraciones de privacidad esenciales, técnicas de navegación anónima y cómo controlar tu huella digital.",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Guía Completa del Creador de Contenido de Instagram",
        description:
          "Todo lo que los creadores de contenido necesitan saber para crecer en Instagram. Estrategia, análisis, planificación de contenido y perspectivas de monetización.",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    de: [
      {
        "@type": "BlogPosting",
        headline: "Vollständiger Leitfaden zu Instagram-Tools 2026",
        description:
          "Ein umfassender Überblick über die besten Instagram-Tools, die 2026 verfügbar sind. Von Analysen bis Content-Erstellung entdecken Sie die Tools, die Sie für den Erfolg brauchen.",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram-Datenschutz: Best Practices für sicheres Surfen",
        description:
          "Schützen Sie Ihre Privatsphäre bei der Nutzung von Instagram. Lernen Sie wichtige Datenschutzeinstellungen, anonyme Surf-Techniken und wie Sie Ihre digitale Fußabdruck kontrollieren.",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Vollständiger Leitfaden für Instagram-Content-Ersteller",
        description:
          "Alles, was Content-Ersteller wissen müssen, um auf Instagram zu wachsen. Strategie, Analytik, Content-Planung und Monetarisierungs-Einblicke.",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    ja: [
      {
        "@type": "BlogPosting",
        headline: "2026 年 Instagram ツール完全ガイド",
        description:
          "2026 年に利用できる最高の Instagram ツールの包括的な概要。分析からコンテンツ作成まで、成功に必要なツールを発見してください。",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram プライバシー：安全な閲覧のベストプラクティス",
        description:
          "Instagram 使用中にプライバシーを保護します。必須のプライバシー設定、匿名閲覧テクニック、デジタルフットプリントの制御方法を学びましょう。",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram コンテンツ制作者の完全ガイド",
        description:
          "Instagram で成長するためにコンテンツ制作者が知るべきすべて。戦略、分析、コンテンツ計画、収益化洞察。",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    ko: [
      {
        "@type": "BlogPosting",
        headline: "2026년 Instagram 도구 완전 가이드",
        description:
          "2026년에 이용 가능한 최고의 Instagram 도구에 대한 포괄적인 개요. 분석부터 콘텐츠 제작까지, 성공에 필요한 도구를 발견하세요.",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram 프라이버시: 안전한 브라우징을 위한 모범 사례",
        description:
          "Instagram을 사용하는 동안 프라이버시를 보호하세요. 필수 프라이버시 설정, 익명 브라우징 기술, 디지털 발자국을 제어하는 방법을 알아보세요.",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Instagram 콘텐츠 제작자의 완전 가이드",
        description:
          "Instagram에서 성장하기 위해 콘텐츠 제작자가 알아야 할 모든 것. 전략, 분석, 콘텐츠 계획 및 수익화 인사이트.",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    pt: [
      {
        "@type": "BlogPosting",
        headline: "Guia Completo de Ferramentas do Instagram em 2026",
        description:
          "Uma visão geral completa das melhores ferramentas do Instagram disponíveis em 2026. De análises à criação de conteúdo, descubra as ferramentas de que você precisa para ter sucesso.",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline:
          "Privacidade do Instagram: Melhores Práticas para Navegação Segura",
        description:
          "Proteja sua privacidade ao usar o Instagram. Aprenda configurações de privacidade essenciais, técnicas de navegação anônima e como controlar sua pegada digital.",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Guia Completo do Criador de Conteúdo do Instagram",
        description:
          "Tudo que criadores de conteúdo precisam saber para crescer no Instagram. Estratégia, análises, planejamento de conteúdo e insights de monetização.",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    ru: [
      {
        "@type": "BlogPosting",
        headline: "Полное руководство по инструментам Instagram в 2026 году",
        description:
          "Полный обзор лучших инструментов Instagram, доступных в 2026 году. От аналитики до создания контента, узнайте, какие инструменты вам нужны для успеха.",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline:
          "Конфиденциальность Instagram: лучшие практики для безопасного просмотра",
        description:
          "Защитите свою конфиденциальность при использовании Instagram. Узнайте об основных настройках конфиденциальности, методах анонимного просмотра и о том, как контролировать свой цифровой след.",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Полное руководство создателя контента Instagram",
        description:
          "Все, что создателям контента нужно знать для роста в Instagram. Стратегия, аналитика, планирование контента и инсайты по монетизации.",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
    ar: [
      {
        "@type": "BlogPosting",
        headline: "الدليل الكامل لأدوات إنستغرام في 2026",
        description:
          "نظرة شاملة على أفضل أدوات إنستغرام المتاحة في 2026. من التحليلات إلى إنشاء المحتوى، اكتشف الأدوات التي تحتاجها للنجاح.",
        url: `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        datePublished: "2026-01-02",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-tools-2026`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "خصوصية إنستغرام: أفضل الممارسات للتصفح الآمن",
        description:
          "حمي خصوصيتك أثناء استخدام إنستغرام. تعلم إعدادات الخصوصية الأساسية، تقنيات التصفح المجهول الهوية، وكيفية التحكم في بصمتك الرقمية.",
        url: `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        datePublished: "2025-12-28",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/instagram-privacy-guide`,
        },
      },
      {
        "@type": "BlogPosting",
        headline: "الدليل الكامل لصانع محتوى إنستغرام",
        description:
          "كل ما يحتاج صانعو المحتوى لمعرفته للنمو على إنستغرام. الاستراتيجية والتحليلات وتخطيط المحتوى ورؤى تحقيق الدخل.",
        url: `${baseUrl}/${lang}/blog/content-creators-guide`,
        datePublished: "2025-12-20",
        author: { "@type": "Organization", name: "Cybermoji" },
        publisher: { "@type": "Organization", name: "Cybermoji" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/blog/content-creators-guide`,
        },
      },
    ],
  };

  return posts[lang] || posts.en;
}
