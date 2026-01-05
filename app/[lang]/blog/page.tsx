import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { BlogPageStructuredData } from "@/components/structured-data/blog-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales } from "@/lib/translations";

export async function generateStaticParams() {
  return supportedLocales.map((lang) => ({
    lang,
  }));
}

const metadataConfig = {
  en: {
    title: "Blog - Cybermoji | Instagram Tips, Guides & Privacy News",
    description:
      "Latest articles on Instagram viewing, privacy tips, content creation strategies, and social media insights. Stay informed with Cybermoji.",
    keywords:
      "instagram blog, instagram tips, social media privacy, content creation, instagram strategy",
    ogTitle: "Blog - Cybermoji",
    ogDescription:
      "Latest articles on Instagram viewing, privacy tips, content creation strategies, and social media insights.",
  },
  zh: {
    title: "博客 - Cybermoji | Instagram 技巧、指南和隐私资讯",
    description:
      "关于 Instagram 查看、隐私提示、内容创作策略和社交媒体洞察的最新文章。了解 Cybermoji 的最新动态。",
    keywords:
      "Instagram 博客, Instagram 技巧, 社交媒体隐私, 内容创作, Instagram 策略",
    ogTitle: "博客 - Cybermoji",
    ogDescription:
      "关于 Instagram 查看、隐私提示、内容创作策略和社交媒体洞察的最新文章。",
  },
  fr: {
    title:
      "Blog Cybermoji | Conseils Instagram, guides et actualité confidentialité",
    description:
      "Derniers articles sur la visualisation Instagram, conseils de confidentialité, stratégies de création de contenu et aperçus des médias sociaux. Restez informé avec Cybermoji.",
    keywords:
      "blog instagram, conseils instagram, confidentialité médias sociaux, création de contenu, stratégie instagram",
    ogTitle: "Blog Cybermoji",
    ogDescription:
      "Derniers articles sur la visualisation Instagram, conseils de confidentialité, stratégies de création de contenu et aperçus des médias sociaux.",
  },
  es: {
    title:
      "Blog de Cybermoji | Consejos de Instagram, guías y noticias de privacidad",
    description:
      "Últimos artículos sobre visualización de Instagram, consejos de privacidad, estrategias de creación de contenido y conocimientos de redes sociales. Mantente informado con Cybermoji.",
    keywords:
      "blog de instagram, consejos de instagram, privacidad de redes sociales, creación de contenido, estrategia de instagram",
    ogTitle: "Blog de Cybermoji",
    ogDescription:
      "Últimos artículos sobre visualización de Instagram, consejos de privacidad, estrategias de creación de contenido y conocimientos de redes sociales.",
  },
  de: {
    title: "Cybermoji Blog | Instagram-Tipps, Anleitungen und Datenschutz-News",
    description:
      "Neueste Artikel über Instagram-Ansicht, Datenschutz-Tipps, Content-Strategien und Social-Media-Einblicks. Bleiben Sie mit Cybermoji informiert.",
    keywords:
      "Instagram Blog, Instagram Tipps, Social Media Datenschutz, Content-Erstellung, Instagram Strategie",
    ogTitle: "Cybermoji Blog",
    ogDescription:
      "Neueste Artikel über Instagram-Ansicht, Datenschutz-Tipps, Content-Strategien und Social-Media-Einblicks.",
  },
  ja: {
    title: "Cybermoji ブログ | Instagram チップス、ガイド、プライバシー news",
    description:
      "Instagram 閲覧、プライバシーチップス、コンテンツ作成戦略、ソーシャルメディアのインサイトに関する最新記事。Cybermoji で最新情報を入手しましょう。",
    keywords:
      "Instagram ブログ, Instagram チップス, ソーシャルメディアプライバシー, コンテンツ作成, Instagram 戦略",
    ogTitle: "Cybermoji ブログ",
    ogDescription:
      "Instagram 閲覧、プライバシーチップス、コンテンツ作成戦略、ソーシャルメディアのインサイトに関する最新記事。",
  },
  ko: {
    title: "Cybermoji 블로그 | Instagram 팁, 가이드 및 프라이버시 뉴스",
    description:
      "Instagram 시청, 프라이버시 팁, 콘텐츠 제작 전략, 소셜 미디어 인사이트에 관한 최신 기사. Cybermoji와 함께 최신 정보를 확인하세요.",
    keywords:
      "Instagram 블로그, Instagram 팁, 소셜 미디어 프라이버시, 콘텐츠 제작, Instagram 전략",
    ogTitle: "Cybermoji 블로그",
    ogDescription:
      "Instagram 시청, 프라이버시 팁, 콘텐츠 제작 전략, 소셜 미디어 인사이트에 관한 최신 기사.",
  },
  pt: {
    title:
      "Blog Cybermoji | Dicas do Instagram, guias e notícias de privacidade",
    description:
      "Últimos artigos sobre visualização do Instagram, dicas de privacidade, estratégias de criação de conteúdo e insights de mídia social. Fique informado com o Cybermoji.",
    keywords:
      "blog instagram, dicas instagram, privacidade mídia social, criação de conteúdo, estratégia instagram",
    ogTitle: "Blog Cybermoji",
    ogDescription:
      "Últimos artigos sobre visualização do Instagram, dicas de privacidade, estratégias de criação de conteúdo e insights de mídia social.",
  },
  ru: {
    title:
      "Блог Cybermoji | Советы по Instagram, руководства и новости о конфиденциальности",
    description:
      "Последние статьи о просмотре Instagram, советах по конфиденциальности, стратегиях создания контента и аналитике социальных сетей. Следите за новостями на Cybermoji.",
    keywords:
      "блог instagram, советы instagram, конфиденциальность социальных сетей, создание контента, стратегия instagram",
    ogTitle: "Блог Cybermoji",
    ogDescription:
      "Последние статьи о просмотре Instagram, советах по конфиденциальности, стратегиях создания контента и аналитике социальных сетей.",
  },
  ar: {
    title: "مدونة Cybermoji | نصائح إنستغرام وأدلة وأخبار الخصوصية",
    description:
      "أحدث المقالات حول مشاهدة إنستغرام ونصائح الخصوصية واستراتيجيات إنشاء المحتوى ورؤى وسائل التواصل الاجتماعي. ابقَ على اطلاع مع Cybermoji.",
    keywords:
      "مدونة إنستغرام, نصائح إنستغرام, خصوصية وسائل التواصل الاجتماعي, إنشاء المحتوى, استراتيجية إنستغرام",
    ogTitle: "مدونة Cybermoji",
    ogDescription:
      "أحدث المقالات حول مشاهدة إنستغرام ونصائح الخصوصية واستراتيجيات إنشاء المحتوى ورؤى وسائل التواصل الاجتماعي.",
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
      url: `${siteConfig.siteUrl}/${lang}/blog`,
    },
    twitter: {
      card: "summary_large_image",
      title: langData.ogTitle,
      description: langData.ogDescription,
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/${lang}/blog`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const blogPosts = [
  {
    slug: "instagram-tools-2026",
    title: "Complete Guide to Instagram Tools in 2026",
    description:
      "A comprehensive overview of the best Instagram tools available in 2026. From analytics to content creation, discover what tools you need for success.",
    category: "Tools & Resources",
    readTime: "10 min read",
    date: "January 2, 2026",
    featured: true,
    image: "/instagram-tools-dashboard-2026.jpg",
  },
  {
    slug: "instagram-privacy-guide",
    title: "Instagram Privacy: Best Practices for Safe Browsing",
    description:
      "Protect your privacy while using Instagram. Learn essential privacy settings, anonymous browsing techniques, and how to control your digital footprint.",
    category: "Privacy & Security",
    readTime: "8 min read",
    date: "December 28, 2025",
    featured: true,
    image: "/instagram-privacy-security-settings.jpg",
  },
  {
    slug: "content-creators-guide",
    title: "Instagram Content Creator's Complete Guide",
    description:
      "Everything content creators need to know about growing on Instagram. Strategy, analytics, content planning, and monetization insights.",
    category: "Content Strategy",
    readTime: "15 min read",
    date: "December 20, 2025",
    featured: true,
    image: "/content-creator-instagram-strategy.jpg",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <>
      <BlogPageStructuredData lang={lang} />
      <div className="min-h-screen flex flex-col">
        <Header lang={lang} />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden border-b-2 border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="container mx-auto px-4 py-16 relative">
              <div className="max-w-3xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4">
                  Cybermoji Blog
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                  Insights, Tips &{" "}
                  <span className="text-primary">Instagram News</span>
                </h1>
                <p className="text-lg text-muted-foreground text-pretty">
                  Stay up-to-date with the latest Instagram trends, privacy best
                  practices, and expert tips for content creators and marketers.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Post */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
              Featured Article
            </h2>

            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="border-2 hover:shadow-md transition-all overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-video md:aspect-auto">
                    <img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline">{featuredPost.category}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {featuredPost.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {featuredPost.date}
                      </span>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-semibold text-primary group-hover:gap-3 transition-all"
                      >
                        Read Article <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </section>

          {/* Other Posts */}
          <section className="container mx-auto px-4 pb-16">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
              More Articles
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {otherPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full border-2 hover:shadow-md transition-all group overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-semibold text-primary group-hover:gap-3 transition-all"
                        >
                          Read <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t-2 border-border bg-primary/5">
            <div className="container mx-auto px-4 py-16 text-center">
              <h2 className="text-3xl font-bold mb-4 text-balance">
                Ready to Start Browsing?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-pretty">
                Put what you&apos;ve learned into practice. Start viewing
                Instagram profiles anonymously right now.
              </p>
              <Link href="/#search">
                <Button size="lg" className="font-semibold shadow-sm">
                  Try Cybermoji Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer lang={lang} />
      </div>
    </>
  );
}
