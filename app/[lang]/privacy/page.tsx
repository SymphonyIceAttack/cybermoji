import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PrivacyPageStructuredData } from "@/components/structured-data/privacy-page";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales } from "@/lib/translations";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Privacy Policy | Cybermoji",
    description:
      "Learn how Cybermoji handles your privacy. We are committed to protecting your personal information and being transparent about our practices.",
    keywords:
      "Cybermoji privacy policy, instagram viewer privacy, data protection, privacy practices",
    ogTitle: "Privacy Policy | Cybermoji",
    ogDescription:
      "Learn how Cybermoji handles your privacy. We are committed to protecting your personal information and being transparent about our practices.",
  },
  zh: {
    title: "隐私政策 | Cybermoji",
    description:
      "了解 Cybermoji 如何处理您的隐私。我们致力于保护您的个人信息并对我们的做法保持透明。",
    keywords: "Cybermoji 隐私政策, Instagram 查看器隐私, 数据保护, 隐私实践",
    ogTitle: "隐私政策 | Cybermoji",
    ogDescription:
      "了解 Cybermoji 如何处理您的隐私。我们致力于保护您的个人信息并对我们的做法保持透明。",
  },
  fr: {
    title: "Politique de Confidentialité | Cybermoji",
    description:
      "Découvrez comment Cybermoji gère votre vie privée. Nous nous engageons à protéger vos informations personnelles et à être transparents sur nos pratiques.",
    keywords:
      "politique de confidentialité Cybermoji, confidentialité visualiseur instagram, protection des données, pratiques de confidentialité",
    ogTitle: "Politique de Confidentialité | Cybermoji",
    ogDescription:
      "Découvrez comment Cybermoji gère votre vie privée. Nous nous engageons à protéger vos informations personnelles et à être transparents sur nos pratiques.",
  },
  es: {
    title: "Política de Privacidad | Cybermoji",
    description:
      "Aprende cómo Cybermoji maneja tu privacidad. Nos comprometemos a proteger tu información personal y ser transparentes sobre nuestras prácticas.",
    keywords:
      "política de privacidad Cybermoji, privacidad del visor de instagram, protección de datos, prácticas de privacidad",
    ogTitle: "Política de Privacidad | Cybermoji",
    ogDescription:
      "Aprende cómo Cybermoji maneja tu privacidad. Nos comprometemos a proteger tu información personal y ser transparentes sobre nuestras prácticas.",
  },
  de: {
    title: "Datenschutzrichtlinie | Cybermoji",
    description:
      "Erfahren Sie, wie Cybermoji mit Ihrem Datenschutz umgeht. Wir verpflichten uns, Ihre persönlichen Daten zu schützen und unsere Praktiken transparent zu gestalten.",
    keywords:
      "Datenschutzrichtlinie Cybermoji, Datenschutz Instagram-Betrachter, Datenschutz, Datenschutzpraktiken",
    ogTitle: "Datenschutzrichtlinie | Cybermoji",
    ogDescription:
      "Erfahren Sie, wie Cybermoji mit Ihrem Datenschutz umgeht. Wir verpflichten uns, Ihre persönlichen Daten zu schützen und unsere Praktiken transparent zu gestalten.",
  },
  ja: {
    title: "プライバシーポリシー | Cybermoji",
    description:
      "Cybermoji がプライバシーをどのように処理するか学びます。私たちは個人情報の保護とプラクティスの透明性に取り組むことをお約束します。",
    keywords:
      "Cybermoji プライバシーポリシー, Instagram ビューアプライバシー, データ保護, プライバシー慣行",
    ogTitle: "プライバシーポリシー | Cybermoji",
    ogDescription:
      "Cybermoji がプライバシーをどのように処理するか学びます。私たちは個人情報の保護とプラクティスの透明性に取り組むことをお約束します。",
  },
  ko: {
    title: "개인정보 처리방침 | Cybermoji",
    description:
      "Cybermoji가 귀하의 프라이버시를 어떻게 처리하는지 알아보세요. 우리는 귀하의 개인정보 보호와 관행의 투명성 유지에 최선을 다하고 있습니다.",
    keywords:
      "Cybermoji 개인정보 처리방침, Instagram 뷰어 프라이버시, 데이터 보호, 프라이버시 관행",
    ogTitle: "개인정보 처리방침 | Cybermoji",
    ogDescription:
      "Cybermoji가 귀하의 프라이버시를 어떻게 처리하는지 알아보세요. 우리는 귀하의 개인정보 보호와 관행의 투명성 유지에 최선을 다하고 있습니다.",
  },
  pt: {
    title: "Política de Privacidade | Cybermoji",
    description:
      "Saiba como o Cybermoji trata sua privacidade. Comprometemo-nos a proteger suas informações pessoais e ser transparentes sobre nossas práticas.",
    keywords:
      "política de privacidade Cybermoji, privacidade do visualizador do instagram, proteção de dados, práticas de privacidade",
    ogTitle: "Política de Privacidade | Cybermoji",
    ogDescription:
      "Saiba como o Cybermoji trata sua privacidade. Comprometemo-nos a proteger suas informações pessoais e ser transparentes sobre nossas práticas.",
  },
  ru: {
    title: "Политика конфиденциальности | Cybermoji",
    description:
      "Узнайте, как Cybermoji обрабатывает вашу конфиденциальность. Мы стремимся защищать вашу личную информацию и быть прозрачными в наших практиках.",
    keywords:
      "политика конфиденциальности Cybermoji, конфиденциальность просмотрщика instagram, защита данных, практики конфиденциальности",
    ogTitle: "Политика конфиденциальности | Cybermoji",
    ogDescription:
      "Узнайте, как Cybermoji обрабатывает вашу конфиденциальность. Мы стремимся защищать вашу личную информацию и быть прозрачными в наших практиках.",
  },
  ar: {
    title: "سياسة الخصوصية | Cybermoji",
    description:
      "تعرف على كيفية تعامل Cybermoji مع خصوصيتك. نحن ملتزمون بحماية معلوماتك الشخصية والشفافية حول ممارساتنا.",
    keywords:
      "سياسة الخصوصية Cybermoji, خصوصية عارض instagram, حماية البيانات, ممارسات الخصوصية",
    ogTitle: "سياسة الخصوصية | Cybermoji",
    ogDescription:
      "تعرف على كيفية تعامل Cybermoji مع خصوصيتك. نحن ملتزمون بحماية معلوماتك الشخصية والشفافية حول ممارساتنا.",
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
      url: `${siteConfig.siteUrl}/${lang}/privacy`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/privacy`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <PrivacyPageStructuredData lang={lang} />
      <div className="min-h-screen flex flex-col">
        <Header lang={lang} />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="border-b-2 border-border">
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-3xl">
                <Badge variant="secondary" className="mb-4">
                  Legal
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  Privacy Policy
                </h1>
                <p className="text-muted-foreground">
                  Last updated: January 2, 2026
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <article className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
              <Card className="border-2 mb-8">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed m-0">
                    At Cybermoji, we take your privacy seriously. This Privacy
                    Policy explains how we collect, use, and protect information
                    when you use our service. By using Cybermoji, you agree to
                    the practices described in this policy.
                  </p>
                </CardContent>
              </Card>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  1. Information We Collect
                </h2>

                <h3 className="text-lg font-semibold mb-2">
                  Information You Provide
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  When you use Cybermoji, we collect minimal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>
                    <strong>Search queries:</strong> The Instagram usernames you
                    search for (not permanently stored)
                  </li>
                  <li>
                    <strong>Usage data:</strong> Basic analytics about how you
                    use our service (anonymized)
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">
                  Information We Do NOT Collect
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Instagram login credentials or passwords</li>
                  <li>
                    Personal identification information (name, email, phone)
                  </li>
                  <li>Payment information (our service is free)</li>
                  <li>Location data beyond general country/region</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  2. How We Use Information
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The limited information we collect is used solely for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Providing and improving our service</li>
                  <li>
                    Analyzing usage patterns to enhance user experience
                    (anonymized)
                  </li>
                  <li>Preventing abuse and maintaining service quality</li>
                  <li>Technical troubleshooting and security</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We implement industry-standard security measures to protect
                  any data processed through our service:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>All connections are encrypted using SSL/TLS (HTTPS)</li>
                  <li>We do not store search history or browsing data</li>
                  <li>Regular security audits and updates</li>
                  <li>No persistent storage of user sessions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  4. Third-Party Services
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We may use limited third-party services for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>
                    <strong>CDN (Content Delivery Network):</strong> To deliver
                    our website quickly and reliably
                  </li>
                  <li>
                    <strong>Analytics:</strong> Anonymous usage statistics to
                    improve our service
                  </li>
                  <li>
                    <strong>Hosting:</strong> Secure cloud infrastructure
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  These services have their own privacy policies, and we choose
                  partners who respect user privacy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Cybermoji uses minimal cookies for essential functionality:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>
                    <strong>Essential cookies:</strong> Required for basic site
                    functionality
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Anonymous usage tracking
                    (can be disabled)
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We do not use cookies for advertising or cross-site tracking.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Know what data we collect (this policy explains it all)
                  </li>
                  <li>Request deletion of any data we may have about you</li>
                  <li>Opt out of analytics tracking</li>
                  <li>
                    Use our service without providing personal information
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  7. Children&apos;s Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cybermoji is not intended for use by children under 13 years
                  of age. We do not knowingly collect information from children.
                  If you believe a child has used our service, please contact
                  us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  8. Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes
                  will be posted on this page with an updated revision date. We
                  encourage you to review this policy periodically.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy or our
                  practices, please contact us through our website.
                </p>
              </section>

              <Card className="border-2 mt-8">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground m-0">
                    Related documents:{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </article>
        </main>

        <Footer lang={lang} />
      </div>
    </>
  );
}
