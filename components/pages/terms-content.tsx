import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface TermsContentProps {
  lang: LanguageType;
  translations?: Record<string, string>;
}

export function TermsContent({ lang, translations = {} }: TermsContentProps) {
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
              {t("terms.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {t("terms.title")}
            </h1>
            <p className="text-muted-foreground">{t("terms.lastUpdated")}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 mb-8">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed m-0">
                {t("terms.intro")}
              </p>
            </CardContent>
          </Card>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section1Title")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("terms.section1Desc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("terms.section1List1")}</li>
              <li>{t("terms.section1List2")}</li>
              <li>{t("terms.section1List3")}</li>
              <li>{t("terms.section1List4")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section2Title")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("terms.section2Desc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>{t("terms.section2List1")}</li>
              <li>{t("terms.section2List2")}</li>
              <li>{t("terms.section2List3")}</li>
              <li>{t("terms.section2List4")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section3Title")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("terms.section3Desc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("terms.section3List1")}</li>
              <li>{t("terms.section3List2")}</li>
              <li>{t("terms.section3List3")}</li>
              <li>{t("terms.section3List4")}</li>
              <li>{t("terms.section3List5")}</li>
              <li>{t("terms.section3List6")}</li>
              <li>{t("terms.section3List7")}</li>
              <li>{t("terms.section3List8")}</li>
              <li>{t("terms.section3List9")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section4Title")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("terms.section4Desc")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.section4Desc2")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section5Title")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("terms.section5Desc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("terms.section5List1")}</li>
              <li>{t("terms.section5List2")}</li>
              <li>{t("terms.section5List3")}</li>
              <li>{t("terms.section5List4")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section6Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.section6Desc")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section7Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.section7Desc")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section8Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.section8Desc")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section9Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.section9Desc")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section10Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.section10Desc")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("terms.section11Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.section11Desc")}
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                {t("terms.relatedDocs")}{" "}
                <Link
                  href={`/${lang}/privacy`}
                  className="text-primary hover:underline"
                >
                  {t("terms.privacyLink")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
