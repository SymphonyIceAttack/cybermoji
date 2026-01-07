import { Globe, Search, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface WhatIsSectionProps {
  translations?: Record<string, string>;
}

export function WhatIsSection({ translations = {} }: WhatIsSectionProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const features = [
    {
      icon: Search,
      title: t("whatIs.featuresSearchTitle"),
      description: t("whatIs.featuresSearchDesc"),
    },
    {
      icon: Globe,
      title: t("whatIs.featuresBrowseTitle"),
      description: t("whatIs.featuresBrowseDesc"),
    },
    {
      icon: Zap,
      title: t("whatIs.featuresCopyTitle"),
      description: t("whatIs.featuresCopyDesc"),
    },
    {
      icon: Star,
      title: t("whatIs.featuresTopicsTitle"),
      description: t("whatIs.featuresTopicsDesc"),
    },
  ];

  return (
    <section id="what-is" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="badge-cyber mb-6">{t("whatIs.title")}</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">{t("whatIs.subtitle")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("whatIs.description")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="card-cyber p-6">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowToUseSection({ translations = {} }: WhatIsSectionProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const steps = [
    {
      number: "01",
      title: t("howToUse.step1Title"),
      description: t("howToUse.step1Desc"),
    },
    {
      number: "02",
      title: t("howToUse.step2Title"),
      description: t("howToUse.step2Desc"),
    },
    {
      number: "03",
      title: t("howToUse.step3Title"),
      description: t("howToUse.step3Desc"),
    },
  ];

  return (
    <section id="how-to-use" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="badge-cyber mb-6">{t("howToUse.title")}</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">{t("howToUse.mainTitle")}</span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative p-6 rounded-xl bg-background/50 border border-border/50"
              >
                <span className="absolute -top-3 -right-3 text-5xl font-display font-bold text-primary/20">
                  {step.number}
                </span>
                <h3 className="text-xl font-display font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
