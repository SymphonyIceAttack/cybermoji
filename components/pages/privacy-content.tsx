import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface PrivacyContentProps {
  lang: LanguageType;
  translations?: Record<string, string>;
}

export function PrivacyContent({
  lang,
  translations = {},
}: PrivacyContentProps) {
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
              {t("privacy.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {t("privacy.title")}
            </h1>
            <p className="text-muted-foreground">{t("privacy.lastUpdated")}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <Card className="border-2 mb-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-pink-700 dark:text-pink-300">
                {t("privacy.weCollectNothing")}
              </h2>
              <p className="text-muted-foreground leading-relaxed m-0">
                {t("privacy.weCollectNothingDesc")}
              </p>
            </CardContent>
          </Card>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("privacy.section1Title")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.section1Desc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("privacy.section1List1")}</li>
              <li>{t("privacy.section1List2")}</li>
              <li>{t("privacy.section1List3")}</li>
              <li>{t("privacy.section1List4")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("privacy.section2Title")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.section2Desc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>
                <strong>CDN (Content Delivery Network):</strong>{" "}
                {t("privacy.section2List1")}
              </li>
              <li>
                <strong>Analytics:</strong> {t("privacy.section2List2")}
              </li>
              <li>
                <strong>Hosting:</strong> {t("privacy.section2List3")}
              </li>
              <li>
                <strong>{t("privacy.section2List4")}</strong>
              </li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.section2SubDesc")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("privacy.googleAdsLink")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("privacy.section3Title")}
            </h2>

            <h3 className="text-lg font-semibold mb-2">
              {t("privacy.essentialCookiesTitle")}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.essentialCookiesDesc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>{t("privacy.essentialCookiesList1")}</li>
              <li>{t("privacy.essentialCookiesList2")}</li>
              <li>{t("privacy.essentialCookiesList3")}</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">
              {t("privacy.thirdPartyCookiesTitle")}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.thirdPartyCookiesDesc")}
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.optOutLink")}
            </p>

            <h3 className="text-lg font-semibold mb-2">
              {t("privacy.analyticsCookiesTitle")}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.analyticsCookiesDesc")}
            </p>

            <h3 className="text-lg font-semibold mb-2">
              {t("privacy.consentManagementTitle")}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.consentManagementDesc")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("privacy.consentWithdrawDesc")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("privacy.section4Title")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.section4Desc")}
            </p>

            <h3 className="text-lg font-semibold mb-2">
              {t("privacy.generalRightsTitle")}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>{t("privacy.generalRightsList1")}</li>
              <li>{t("privacy.generalRightsList2")}</li>
              <li>{t("privacy.generalRightsList3")}</li>
              <li>{t("privacy.generalRightsList4")}</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">
              {t("privacy.gdprRightsTitle")}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("privacy.gdprRightsDesc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>{t("privacy.gdprRightsList1")}</li>
              <li>{t("privacy.gdprRightsList2")}</li>
              <li>{t("privacy.gdprRightsList3")}</li>
              <li>{t("privacy.gdprRightsList4")}</li>
              <li>{t("privacy.gdprRightsList5")}</li>
              <li>{t("privacy.gdprRightsList6")}</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              {t("privacy.contactLink")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("privacy.section5Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("privacy.section5Desc")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("privacy.section6Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("privacy.section6Desc")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("privacy.section7Title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("privacy.section7Desc")}
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                {t("privacy.relatedDocs")}{" "}
                <Link
                  href={`/${lang}/terms`}
                  className="text-primary hover:underline"
                >
                  {t("privacy.termsLink")}
                </Link>
                |{" "}
                <Link
                  href={`/${lang}/disclaimer`}
                  className="text-primary hover:underline"
                >
                  {t("privacy.disclaimerLink")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
