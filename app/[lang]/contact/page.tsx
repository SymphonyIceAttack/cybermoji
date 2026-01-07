import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/contact-content";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales, translations } from "@/lib/translations";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Contact Us | Cybermoji",
    description:
      "Get in touch with the Cybermoji team. We're here to help with any questions, feedback, or suggestions about our emoji platform.",
    keywords:
      "contact Cybermoji, get in touch, feedback, support, questions about emoji",
    ogTitle: "Contact Us | Cybermoji",
    ogDescription: "Get in touch with the Cybermoji team. We're here to help!",
  },
  zh: {
    title: "联系我们 | Cybermoji",
    description:
      "联系 Cybermoji 团队。我们随时帮助您解决关于表情符号平台的任何问题、反馈或建议。",
    keywords: "联系 Cybermoji, 联系方式, 反馈, 支持, 关于表情符号的问题",
    ogTitle: "联系我们 | Cybermoji",
    ogDescription: "联系 Cybermoji 团队。我们随时为您提供帮助！",
  },
  fr: {
    title: "Nous Contacter | Cybermoji",
    description:
      "Contactez l&apos;équipe Cybermoji. Nous sommes là pour vous aider avec toutes les questions, commentaires ou suggestions concernant notre plateforme emoji.",
    keywords:
      "contact Cybermoji, nous contacter, commentaires, support, questions sur les emoji",
    ogTitle: "Nous Contacter | Cybermoji",
    ogDescription:
      "Contactez l&apos;équipe Cybermoji. Nous sommes là pour vous aider !",
  },
  es: {
    title: "Contáctenos | Cybermoji",
    description:
      "Póngase en contacto con el equipo de Cybermoji. Estamos aquí para ayudarlo con cualquier pregunta, comentario o sugerencia sobre nuestra plataforma de emoji.",
    keywords:
      "contactar Cybermoji, contactenos, comentarios, soporte, preguntas sobre emoji",
    ogTitle: "Contáctenos | Cybermoji",
    ogDescription:
      "Póngase en contacto con el equipo de Cybermoji. ¡Estamos aquí para ayudarlo!",
  },
  de: {
    title: "Kontakt | Cybermoji",
    description:
      "Kontaktieren Sie das Cybermoji-Team. Wir helfen Ihnen gerne bei Fragen, Feedback oder Vorschlägen zu unserer Emoji-Plattform.",
    keywords:
      "Kontakt Cybermoji, kontaktieren, Feedback, Support, Fragen zu Emoji",
    ogTitle: "Kontakt | Cybermoji",
    ogDescription:
      "Kontaktieren Sie das Cybermoji-Team. Wir sind hier, um zu helfen!",
  },
  ja: {
    title: "お問い合わせ | Cybermoji",
    description:
      "Cybermoji チーム联系我们。絵文字プラットフォームに関する質問、フィードバック、またはご提案がございましたら、お手伝いいたします。",
    keywords:
      "お問い合わせ Cybermoji, 連絡先, フィードバック, サポート, 絵文字について",
    ogTitle: "お問い合わせ | Cybermoji",
    ogDescription: "Cybermoji チーム联系我们。お手伝いいたします！",
  },
  ko: {
    title: "문의하기 | Cybermoji",
    description:
      "Cybermoji 팀에 문의하세요. 이모지 플랫폼에 관한 질문, 피드백 또는 제안이 있다면 도와드리겠습니다.",
    keywords: "문의 Cybermoji, 연락하기, 피드백, 지원, 이모지 질문",
    ogTitle: "문의하기 | Cybermoji",
    ogDescription: "Cybermoji 팀에 문의하세요. 도와드리겠습니다!",
  },
  pt: {
    title: "Contato | Cybermoji",
    description:
      "Entre em contato com a equipe do Cybermoji. Estamos aqui para ajudar com qualquer dúvida, feedback ou sugestão sobre nossa plataforma de emoji.",
    keywords:
      "contato Cybermoji, entre em contato, feedback, suporte, dúvidas sobre emoji",
    ogTitle: "Contato | Cybermoji",
    ogDescription:
      "Entre em contato com a equipe do Cybermoji. Estamos aqui para ajudar!",
  },
  ru: {
    title: "Свяжитесь с Нами | Cybermoji",
    description:
      "Свяжитесь с командой Cybermoji. Мы здесь, чтобы помочь с любыми вопросами, отзывами или предложениями о нашей платформе эмодзи.",
    keywords:
      "связаться с Cybermoji, контакт, обратная связь, поддержка, вопросы об эмодзи",
    ogTitle: "Свяжитесь с Нами | Cybermoji",
    ogDescription: "Свяжитесь с командой Cybermoji. Мы здесь, чтобы помочь!",
  },
  ar: {
    title: "اتصل بنا | Cybermoji",
    description:
      "تواصل مع فريق Cybermoji. نحن هنا للمساعدة في أي أسئلة أو ملاحظات أو اقتراحات حول منصة الإيموجي الخاصة بنا.",
    keywords: "اتصل بـ Cybermoji, تواصل معنا, ملاحظات, دعم, أسئلة حول الإيموجي",
    ogTitle: "اتصل بنا | Cybermoji",
    ogDescription: "تواصل مع فريق Cybermoji. نحن هنا للمساعدة!",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: {
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
      title: langData.ogTitle,
      description: langData.ogDescription,
      siteName: siteConfig.siteName,
      url: `${siteConfig.siteUrl}/${lang}/contact`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/contact`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  const translationsForLang =
    translations[lang as keyof typeof translations] || translations.en;

  return (
    <ContactContent
      lang={lang}
      translations={translationsForLang as unknown as Record<string, string>}
    />
  );
}
