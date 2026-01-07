import { CheckCircle, Copy, Globe, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturesSectionProps {
  translations?: Record<string, string>;
}

export function FeaturesSection({ translations = {} }: FeaturesSectionProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };
  const homeT = (key: string) => t(`home.${key}`);

  const mainFeatures = [
    {
      id: "browse",
      icon: Globe,
      title: homeT("features.browseTitle"),
      subtitle: homeT("features.browseSubtitle"),
      description: homeT("features.browseDesc"),
      benefits: [
        homeT("features.browseBenefits1"),
        homeT("features.browseBenefits2"),
        homeT("features.browseBenefits3"),
        homeT("features.browseBenefits4"),
      ],
    },
    {
      id: "search",
      icon: Search,
      title: homeT("features.searchTitle"),
      subtitle: homeT("features.searchSubtitle"),
      description: homeT("features.searchDesc"),
      benefits: [
        homeT("features.searchBenefits1"),
        homeT("features.searchBenefits2"),
        homeT("features.searchBenefits3"),
        homeT("features.searchBenefits4"),
      ],
    },
    {
      id: "copy",
      icon: Copy,
      title: homeT("features.copyTitle"),
      subtitle: homeT("features.copySubtitle"),
      description: homeT("features.copyDesc"),
      benefits: [
        homeT("features.copyBenefits1"),
        homeT("features.copyBenefits2"),
        homeT("features.copyBenefits3"),
        homeT("features.copyBenefits4"),
      ],
    },
    {
      id: "favorites",
      icon: Star,
      title: homeT("features.favoritesTitle"),
      subtitle: homeT("features.favoritesSubtitle"),
      description: homeT("features.favoritesDesc"),
      benefits: [
        homeT("features.favoritesBenefits1"),
        homeT("features.favoritesBenefits2"),
        homeT("features.favoritesBenefits3"),
        homeT("features.favoritesBenefits4"),
      ],
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="badge-cyber mb-6">
            {homeT("features.mainTitle")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">
              {homeT("features.mainTitle2")}
            </span>
            <br />
            <span className="text-foreground/80">
              {homeT("features.mainTitle3")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {homeT("features.mainDesc")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
          {mainFeatures.map((feature) => (
            <Card
              key={feature.id}
              id={feature.id}
              className="card-cyber p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 mb-4 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 shrink-0">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Badge
                      variant="secondary"
                      className="text-xs mb-2 bg-primary/10 text-primary border-primary/20"
                    >
                      {feature.subtitle}
                    </Badge>
                    <h3 className="text-xl font-display font-bold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 border border-primary/30 shrink-0">
                            <CheckCircle className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-xs font-mono">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return null;
}
