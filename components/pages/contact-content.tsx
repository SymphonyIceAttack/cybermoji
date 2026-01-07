import { Globe, Heart, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface ContactContentProps {
  lang: LanguageType;
  translations?: Record<string, string>;
}

export function ContactContent({
  lang,
  translations = {},
}: ContactContentProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="border-b-2 border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {t("contact.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {t("contact.title")}
            </h1>
            <p className="text-muted-foreground">{t("contact.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed m-0">
                {t("contact.intro")}
              </p>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-6">
              {t("contact.waysTitle")}
            </h2>
            <div className="grid gap-4">
              <Card className="p-4 hover:border-primary/50 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">
                      {t("contact.emailTitle")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("contact.emailDesc")}
                    </p>
                    <a
                      href="mailto:support@cybermoji.com"
                      className="text-sm text-primary hover:underline"
                    >
                      {t("contact.emailAddress")}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:border-primary/50 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{t("contact.faqTitle")}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("contact.faqDesc")}
                    </p>
                    <Link
                      href={`/${lang}/#faq`}
                      className="text-sm text-primary hover:underline"
                    >
                      {t("contact.faqLink")}
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:border-primary/50 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">
                      {t("contact.githubTitle")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("contact.githubDesc")}
                    </p>
                    <a
                      href="https://github.com/cybermoji"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {t("contact.githubLink")}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:border-primary/50 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">
                      {t("contact.socialTitle")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("contact.socialDesc")}
                    </p>
                    <a
                      href="https://twitter.com/cybermoji"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {t("contact.socialLink")}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("contact.helpTitle")}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("contact.helpQuestions")}</li>
              <li>{t("contact.helpBugs")}</li>
              <li>{t("contact.helpFeatures")}</li>
              <li>{t("contact.helpFeedback")}</li>
              <li>{t("contact.helpPartnership")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("contact.responseTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("contact.responseDesc")}
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                {t("contact.policies")}{" "}
                <Link
                  href={`/${lang}/privacy`}
                  className="text-primary hover:underline"
                >
                  {t("contact.policiesPrivacy")}
                </Link>{" "}
                |{" "}
                <Link
                  href={`/${lang}/terms`}
                  className="text-primary hover:underline"
                >
                  {t("contact.policiesTerms")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
