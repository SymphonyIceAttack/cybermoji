import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TermsPageStructuredData } from "@/components/structured-data/terms-page";
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
    title: "Terms of Service | duckinsview",
    description:
      "Read the terms of service for duckinsview. Understand the rules and guidelines for using our anonymous Instagram viewer service.",
    keywords:
      "duckinsview terms of service, terms and conditions, user agreement, service terms",
    ogTitle: "Terms of Service | duckinsview",
    ogDescription:
      "Read the terms of service for duckinsview. Understand the rules and guidelines for using our anonymous Instagram viewer service.",
  },
  zh: {
    title: "服务条款 | duckinsview",
    description:
      "阅读 duckinsview 的服务条款。了解使用我们的匿名 Instagram 查看器服务的规则和指南。",
    keywords:
      "duckinsview 服务条款, 服务条款和条件, 用户协议, 服务条款",
    ogTitle: "服务条款 | duckinsview",
    ogDescription:
      "阅读 duckinsview 的服务条款。了解使用我们的匿名 Instagram 查看器服务的规则和指南。",
  },
  fr: {
    title: "Conditions d'Utilisation | duckinsview",
    description:
      "Lisez les conditions d'utilisation de duckinsview. Comprenez les règles et directives pour utiliser notre service de visualisation Instagram anonyme.",
    keywords:
      "conditions d'utilisation duckinsview, conditions générales, accord utilisateur, conditions de service",
    ogTitle: "Conditions d'Utilisation | duckinsview",
    ogDescription:
      "Lisez les conditions d'utilisation de duckinsview. Comprenez les règles et directives pour utiliser notre service de visualisation Instagram anonyme.",
  },
  es: {
    title: "Términos de Servicio | duckinsview",
    description:
      "Lee los términos de servicio de duckinsview. Comprende las reglas y pautas para usar nuestro servicio de visor de Instagram anónimo.",
    keywords:
      "términos de servicio duckinsview, términos y condiciones, acuerdo de usuario, términos del servicio",
    ogTitle: "Términos de Servicio | duckinsview",
    ogDescription:
      "Lee los términos de servicio de duckinsview. Comprende las reglas y pautas para usar nuestro servicio de visor de Instagram anónimo.",
  },
  de: {
    title: "Nutzungsbedingungen | duckinsview",
    description:
      "Lesen Sie die Nutzungsbedingungen von duckinsview. Verstehen Sie die Regeln und Richtlinien für die Nutzung unseres anonymen Instagram-Dienstes.",
    keywords:
      "Nutzungsbedingungen duckinsview, Allgemeine Geschäftsbedingungen, Benutzervereinbarung, Dienstbedingungen",
    ogTitle: "Nutzungsbedingungen | duckinsview",
    ogDescription:
      "Lesen Sie die Nutzungsbedingungen von duckinsview. Verstehen Sie die Regeln und Richtlinien für die Nutzung unseres anonymen Instagram-Dienstes.",
  },
  ja: {
    title: "利用規約 | duckinsview",
    description:
      "duckinsview の利用規約を読みます。匿名 Instagram ビューアサービスの使用に関するルールとガイドラインを理解しましょう。",
    keywords:
      "duckinsview 利用規約, 利用規約と条件, ユーザー契約, サービス利用規約",
    ogTitle: "利用規約 | duckinsview",
    ogDescription:
      "duckinsview の利用規約を読みます。匿名 Instagram ビューアサービスの使用に関するルールとガイドラインを理解しましょう。",
  },
  ko: {
    title: "서비스 약관 | duckinsview",
    description:
      "duckinsview의 서비스 약관을 읽으세요. 익명 Instagram 뷰어 서비스 사용에 대한 규칙과 가이드라인을 이해하세요.",
    keywords:
      "duckinsview 서비스 약관, 약관 및 조건, 사용자 동의, 서비스 약관",
    ogTitle: "서비스 약관 | duckinsview",
    ogDescription:
      "duckinsview의 서비스 약관을 읽으세요. 익명 Instagram 뷰어 서비스 사용에 대한 규칙과 가이드라인을 이해하세요.",
  },
  pt: {
    title: "Termos de Serviço | duckinsview",
    description:
      "Leia os termos de serviço do duckinsview. Entenda as regras e diretrizes para usar nosso serviço de visualizador anônimo do Instagram.",
    keywords:
      "termos de serviço duckinsview, termos e condições, acordo do usuário, termos de serviço",
    ogTitle: "Termos de Serviço | duckinsview",
    ogDescription:
      "Leia os termos de serviço do duckinsview. Entenda as regras e diretrizes para usar nosso serviço de visualizador anônimo do Instagram.",
  },
  ru: {
    title: "Условия использования | duckinsview",
    description:
      "Прочитайте условия использования duckinsview. Поймите правила и рекомендации по использованию нашего сервиса анонимного просмотра Instagram.",
    keywords:
      "условия использования duckinsview, условия и положения, пользовательское соглашение, условия обслуживания",
    ogTitle: "Условия использования | duckinsview",
    ogDescription:
      "Прочитайте условия использования duckinsview. Поймите правила и рекомендации по использованию нашего сервиса анонимного просмотра Instagram.",
  },
  ar: {
    title: "شروط الخدمة | duckinsview",
    description:
      "اقرأ شروط خدمة duckinsview. افهم القواعد والإرشادات لاستخدام خدمة عارض إنستغرام المجهولة الهوية.",
    keywords:
      "شروط خدمة duckinsview, الشروط والأحكام, اتفاقية المستخدم, شروط الخدمة",
    ogTitle: "شروط الخدمة | duckinsview",
    ogDescription:
      "اقرأ شروط خدمة duckinsview. افهم القواعد والإرشادات لاستخدام خدمة عارض إنستغرام المجهولة الهوية.",
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
      url: `${siteConfig.siteUrl}/${lang}/terms`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/terms`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <TermsPageStructuredData lang={lang} />
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
                  Terms of Service
                </h1>
                <p className="text-muted-foreground">
                  Last updated: January 2, 2026
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <article className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 mb-8">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed m-0">
                    Welcome to duckinsview. By accessing or using our service,
                    you agree to be bound by these Terms of Service. Please read
                    them carefully before using our service.
                  </p>
                </CardContent>
              </Card>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  1. Service Description
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  duckinsview is a free online tool that allows users to view
                  publicly available Instagram content without requiring an
                  Instagram account. Our service provides:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Viewing of public Instagram profiles and posts</li>
                  <li>Viewing of public stories and highlights</li>
                  <li>Viewing and downloading of public Reels</li>
                  <li>Downloading of publicly available content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Acceptable Use</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  When using duckinsview, you agree to use the service
                  responsibly and legally. You may use our service for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>
                    Personal, non-commercial browsing of public Instagram
                    content
                  </li>
                  <li>Research and competitive analysis</li>
                  <li>Saving content for personal reference</li>
                  <li>
                    Any other lawful purpose that respects others&apos; rights
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  3. Prohibited Activities
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  You agree NOT to use duckinsview for any of the following:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Harassing, stalking, or intimidating any person</li>
                  <li>Any illegal activities or purposes</li>
                  <li>Violating others&apos; intellectual property rights</li>
                  <li>Commercial scraping or data harvesting at scale</li>
                  <li>
                    Attempting to access private accounts or restricted content
                  </li>
                  <li>
                    Circumventing any security measures or access controls
                  </li>
                  <li>Impersonating others or misrepresenting your identity</li>
                  <li>Redistributing downloaded content as your own</li>
                  <li>Automated access or bot usage without permission</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  4. Intellectual Property
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>Our Service:</strong> The duckinsview website, design,
                  code, and branding are owned by us and protected by
                  intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Third-Party Content:</strong> Content viewed through
                  duckinsview belongs to its original creators. Downloading
                  content does not transfer ownership or grant you rights to
                  redistribute it. Always respect copyright and the rights of
                  content creators.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  5. Disclaimer of Warranties
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  duckinsview is provided &quot;as is&quot; and &quot;as
                  available&quot; without warranties of any kind. We do not
                  guarantee:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Uninterrupted or error-free service</li>
                  <li>Accuracy or completeness of content displayed</li>
                  <li>That the service will meet your specific requirements</li>
                  <li>Availability of any particular content or account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  6. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, duckinsview and its
                  operators shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, or any loss of
                  profits or revenues, whether incurred directly or indirectly,
                  or any loss of data, use, goodwill, or other intangible losses
                  resulting from your use of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  7. Relationship with Instagram
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  duckinsview is an independent service and is not affiliated
                  with, endorsed by, or sponsored by Instagram or Meta
                  Platforms, Inc. Instagram is a trademark of Meta Platforms,
                  Inc. We access only publicly available information and do not
                  use Instagram&apos;s official API for this purpose.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  8. Service Modifications
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any
                  part of our service at any time without notice. We may also
                  update these Terms of Service periodically. Continued use of
                  the service after changes constitutes acceptance of the
                  modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your access to duckinsview
                  immediately, without prior notice, for any reason including
                  breach of these Terms. Upon termination, your right to use the
                  service ceases immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance
                  with applicable laws, without regard to conflict of law
                  principles. Any disputes arising from these terms or your use
                  of the service shall be resolved through appropriate legal
                  channels.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about these Terms of Service, please
                  contact us through our website.
                </p>
              </section>

              <Card className="border-2 mt-8">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground m-0">
                    Related documents:{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
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
