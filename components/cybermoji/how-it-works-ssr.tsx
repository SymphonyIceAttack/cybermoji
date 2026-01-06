import { Badge } from "@/components/ui/badge";

interface HowItWorksSectionProps {
  translations?: Record<string, string>;
}

export function HowItWorksSection({
  translations = {},
}: HowItWorksSectionProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };
  const homeT = (key: string) => t(`home.${key}`);

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <Badge className="badge-cyber mb-6">
            {homeT("howItWorks.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">
              {homeT("howItWorks.titleLarge")}
            </span>
            <br />
            <span className="text-foreground/80">
              {homeT("howItWorks.titleLarge2")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {homeT("howItWorks.subtitleLarge")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            {
              step: homeT("howItWorks.step1"),
              emoji: "🔍",
              title: homeT("howItWorks.step1Title"),
              desc: homeT("howItWorks.step1Desc"),
            },
            {
              step: homeT("howItWorks.step2"),
              emoji: "👀",
              title: homeT("howItWorks.step2Title"),
              desc: homeT("howItWorks.step2Desc"),
            },
            {
              step: homeT("howItWorks.step3"),
              emoji: "📋",
              title: homeT("howItWorks.step3Title"),
              desc: homeT("howItWorks.step3Desc"),
            },
          ].map((item) => (
            <div key={item.step} className="relative text-center group">
              {/* Step number background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-display font-bold text-primary/5 select-none group-hover:text-primary/10 transition-colors">
                {item.step}
              </div>

              <div className="relative z-10">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/50 border-2 border-primary/30 mx-auto mb-6 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                  <span className="text-4xl">{item.emoji}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Connector line */}
              {item.step !== homeT("howItWorks.step3") && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
