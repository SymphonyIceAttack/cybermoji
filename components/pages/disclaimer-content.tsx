import { AlertTriangle, Info, Shield } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface DisclaimerContentProps {
  lang: LanguageType;
  translations?: Record<string, string>;
}

export function DisclaimerContent({
  lang,
  translations = {},
}: DisclaimerContentProps) {
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
              {t("disclaimer.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {t("disclaimer.title")}
            </h1>
            <p className="text-muted-foreground">{t("disclaimer.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="border-2 border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium mb-2">
                    {t("disclaimer.readCarefully")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed m-0">
                    {t("disclaimer.readDesc")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              {t("disclaimer.generalTitle")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("disclaimer.generalDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("disclaimer.adviceTitle")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("disclaimer.adviceDesc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("disclaimer.adviceList1")}</li>
              <li>{t("disclaimer.adviceList2")}</li>
              <li>{t("disclaimer.adviceList3")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("disclaimer.accuracyTitle")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("disclaimer.accuracyDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("disclaimer.thirdPartyTitle")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("disclaimer.thirdPartyDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("disclaimer.emojiTitle")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("disclaimer.emojiDesc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("disclaimer.emojiList1")}</li>
              <li>{t("disclaimer.emojiList2")}</li>
              <li>{t("disclaimer.emojiList3")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {t("disclaimer.liabilityTitle")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("disclaimer.liabilityDesc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{t("disclaimer.liabilityList1")}</li>
              <li>{t("disclaimer.liabilityList2")}</li>
              <li>{t("disclaimer.liabilityList3")}</li>
              <li>{t("disclaimer.liabilityList4")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("disclaimer.conductTitle")}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t("disclaimer.conductDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("disclaimer.changesTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("disclaimer.changesDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t("disclaimer.contactTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("disclaimer.contactDesc")}{" "}
              <Link
                href={`/${lang}/contact`}
                className="text-primary hover:underline"
              >
                {t("disclaimer.contactLink")}
              </Link>
              .
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                {t("disclaimer.lastUpdated")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                {t("disclaimer.related")}{" "}
                <Link
                  href={`/${lang}/privacy`}
                  className="text-primary hover:underline"
                >
                  {t("disclaimer.relatedPrivacy")}
                </Link>{" "}
                |{" "}
                <Link
                  href={`/${lang}/terms`}
                  className="text-primary hover:underline"
                >
                  {t("disclaimer.relatedTerms")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
