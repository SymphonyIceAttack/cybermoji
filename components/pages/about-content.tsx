import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface AboutContentProps {
  lang: LanguageType;
  translations?: Record<string, string>;
}

export function AboutContent({ lang, translations = {} }: AboutContentProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const offerCuratedParts = t("about.offerCurated").split(" - ");
  const offerInstantParts = t("about.offerInstant").split(" - ");
  const offerSearchParts = t("about.offerSearch").split(" - ");
  const offerTopicParts = t("about.offerTopic").split(" - ");
  const offerMultiParts = t("about.offerMulti").split(" - ");

  return (
    <>
      {/* Hero Section */}
      <section className="border-b-2 border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {t("about.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {t("about.title")}
            </h1>
            <p className="text-muted-foreground">{t("about.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed m-0">
                {t("about.intro")}
              </p>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("about.missionTitle")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("about.missionDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t("about.offerTitle")}</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong>{offerCuratedParts[0]}</strong> - {offerCuratedParts[1]}
              </li>
              <li>
                <strong>{offerInstantParts[0]}</strong> - {offerInstantParts[1]}
              </li>
              <li>
                <strong>{offerSearchParts[0]}</strong> - {offerSearchParts[1]}
              </li>
              <li>
                <strong>{offerTopicParts[0]}</strong> - {offerTopicParts[1]}
              </li>
              <li>
                <strong>{offerMultiParts[0]}</strong> - {offerMultiParts[1]}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("about.valuesTitle")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-bold mb-2">
                    {t("about.valuesAccessibility")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("about.valuesAccessibilityDesc")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-bold mb-2">
                    {t("about.valuesSimplicity")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("about.valuesSimplicityDesc")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-bold mb-2">{t("about.valuesQuality")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("about.valuesQualityDesc")}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-bold mb-2">{t("about.valuesPrivacy")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("about.valuesPrivacyDesc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("about.communityTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.communityDesc")}
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                {t("about.questions")}{" "}
                <Link
                  href={`/${lang}/contact`}
                  className="text-primary hover:underline"
                >
                  {t("about.questionsLink")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
