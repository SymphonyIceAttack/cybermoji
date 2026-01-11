import type { WebPage, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface TermsPageStructuredDataProps {
  lang: LanguageType;
}

export function TermsPageStructuredData({
  lang,
}: TermsPageStructuredDataProps) {
  const termsSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: getPageName(lang),
    description: getPageDescription(lang),
    url: `${siteConfig.siteUrl}/${lang}/terms`,
    inLanguage: getLanguageCode(lang),
    datePublished: "2026-01-02",
    dateModified: "2026-01-02",
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    about: {
      "@type": "Thing",
      name: getAboutName(lang),
      description: getAboutDescription(lang),
    },
    mainEntity: {
      "@type": "Article",
      headline: getHeadline(lang),
      description: getHeadlineDescription(lang),
      datePublished: "2026-01-02",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(termsSchema),
      }}
    />
  );
}

function getPageName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Terms of Service | Cybermoji",
    zh: "服务条款 | Cybermoji",
    fr: "Conditions d'Utilisation | Cybermoji",
    es: "Términos de Servicio | Cybermoji",
    de: "Nutzungsbedingungen | Cybermoji",
    ja: "利用規約 | Cybermoji",
    ko: "서비스 약관 | Cybermoji",
    pt: "Termos de Serviço | Cybermoji",
    ru: "Условия использования | Cybermoji",
    ar: "شروط الخدمة | Cybermoji",
  };
  return names[lang] || names.en;
}

function getPageDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Read the terms of service for Cybermoji. Understand the rules and guidelines for using our anonymous Instagram viewer service.",
    zh: "阅读 Cybermoji 的服务条款。了解使用我们的匿名 Instagram 查看器服务的规则和指南。",
    fr: "Lisez les conditions d'utilisation de Cybermoji. Comprenez les règles et directives pour utiliser notre service de visualisation Instagram anonyme.",
    es: "Lee los términos de servicio de Cybermoji. Comprende las reglas y pautas para usar nuestro servicio de visor de Instagram anónimo.",
    de: "Lesen Sie die Nutzungsbedingungen von Cybermoji. Verstehen Sie die Regeln und Richtlinien für die Nutzung unseres anonymen Instagram-Dienstes.",
    ja: "Cybermoji の利用規約を読みます。匿名 Instagram ビューアサービスの使用に関するルールとガイドラインを理解しましょう。",
    ko: "Cybermoji의 서비스 약관을 읽으세요. 익명 Instagram 뷰어 서비스 사용에 대한 규칙과 가이드라인을 이해하세요.",
    pt: "Leia os termos de serviço do Cybermoji. Entenda as regras e diretrizes para usar nosso serviço de visualizador anônimo do Instagram.",
    ru: "Прочитайте условия использования Cybermoji. Поймите правила и рекомендации по использованию нашего сервиса анонимного просмотра Instagram.",
    ar: "اقرأ شروط خدمة Cybermoji. افهم القواعد والإرشادات لاستخدام خدمة عارض إنستغرام المجهولة الهوية.",
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

function getAboutName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Terms of Service and User Agreement",
    zh: "服务条款和用户协议",
    fr: "Conditions d'Utilisation et Accord Utilisateur",
    es: "Términos de Servicio y Acuerdo de Usuario",
    de: "Nutzungsbedingungen und Benutzervereinbarung",
    ja: "利用規約とユーザー同意書",
    ko: "서비스 약관 및 사용자 동의서",
    pt: "Termos de Serviço e Acordo do Usuário",
    ru: "Условия использования и пользовательское соглашение",
    ar: "شروط الخدمة واتفاقية المستخدم",
  };
  return names[lang] || names.en;
}

function getAboutDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "The rules and guidelines that govern the use of our anonymous Instagram viewing service.",
    zh: "管理我们的匿名 Instagram 查看服务使用的规则和指南。",
    fr: "Les règles et directives qui régissent l'utilisation de notre service de visualisation Instagram anonyme.",
    es: "Las reglas y pautas que rigen el uso de nuestro servicio de visualización anónima de Instagram.",
    de: "Die Regeln und Richtlinien, die die Nutzung unseres anonymen Instagram-Dienstes regeln.",
    ja: "匿名 Instagram 閲覧サービスの使用を管理するルールとガイドライン。",
    ko: "익명 Instagram 시청 서비스 사용을 관리하는 규칙과 가이드라인.",
    pt: "As regras e diretrizes que regem o uso de nosso serviço de visualização anônima do Instagram.",
    ru: "Правила и рекомендации, регулирующие использование нашего сервиса анонимного просмотра Instagram.",
    ar: "القواعد والإرشادات التي تحكم استخدام خدمة مشاهدة إنستغرام المجهولة الهوية.",
  };
  return descriptions[lang] || descriptions.en;
}

function getHeadline(lang: LanguageType): string {
  const headlines: Record<LanguageType, string> = {
    en: "Terms of Service",
    zh: "服务条款",
    fr: "Conditions d'Utilisation",
    es: "Términos de Servicio",
    de: "Nutzungsbedingungen",
    ja: "利用規約",
    ko: "서비스 약관",
    pt: "Termos de Serviço",
    ru: "Условия использования",
    ar: "شروط الخدمة",
  };
  return headlines[lang] || headlines.en;
}

function getHeadlineDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Welcome to Cybermoji. By accessing or using our service, you agree to be bound by these Terms of Service.",
    zh: "欢迎使用 Cybermoji。访问或使用我们的服务，即表示您同意受这些服务条款的约束。",
    fr: "Bienvenue sur Cybermoji. En accédant ou en utilisant notre service, vous acceptez d'être lié par ces conditions d'utilisation.",
    es: "Bienvenido a Cybermoji. Al acceder o utilizar nuestro servicio, aceptas estar obligado por estos Términos de Servicio.",
    de: "Willkommen bei Cybermoji. Durch den Zugriff auf oder die Nutzung unseres Dienstes erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.",
    ja: "Cybermoji へようこそ。サービスにアクセスまたは使用することで、これらの利用規約に拘束されることに同意したことになります。",
    ko: "Cybermoji에 오신 것을 환영합니다. 서비스에 접근하거나 사용함으로써 귀하는 이러한 서비스 약관에 구속되는 것에 동의합니다.",
    pt: "Bem-vindo ao Cybermoji. Ao acessar ou usar nosso serviço, você concorda em estar vinculado a estes Termos de Serviço.",
    ru: "Добро пожаловать в Cybermoji. Получая доступ или используя наш сервис, вы соглашаетесь соблюдать эти Условия использования.",
    ar: "مرحبا بكم في Cybermoji. بالوصول إلى خدمتنا أو استخدامها، فإنك توافق على الالتزام بشروط الخدمة هذه.",
  };
  return descriptions[lang] || descriptions.en;
}
