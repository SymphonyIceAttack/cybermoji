import type { LanguageType } from "@/lib/translations";
import { SearchTool } from "./search-tool";
import { TrustBadges } from "./trust-badges";

interface HeroSectionProps {
  lang: LanguageType;
}

export function HeroSection({ lang }: HeroSectionProps) {
  return (
    <section className="relative py-32 lg:py-48 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status indicator */}
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 glass rounded-full border border-primary/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span className="text-sm font-mono tracking-wider text-primary">
              ALL EMOJIS AVAILABLE
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tight">
            <span className="gradient-text">The Ultimate</span>
            <br />
            <span className="gradient-text-cyan">Emoji Collection</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Browse, search, and copy your favorite emojis instantly.
            <br />
            <span className="text-foreground font-medium">
              Thousands of emojis across all categories, 100% free.
            </span>
          </p>

          {/* Trust badges */}
          <TrustBadges />
        </div>

        {/* Search/Browse section */}
        <div id="browse" className="max-w-4xl mx-auto mt-16">
          <div className="card-cyber p-8 rounded-xl">
            <SearchTool lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
