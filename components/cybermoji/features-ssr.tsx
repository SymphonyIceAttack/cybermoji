import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Copy,
  Globe,
  Search,
  Shield,
  Smartphone,
  Star,
  Zap,
} from "lucide-react";

const mainFeatures = [
  {
    id: "browse",
    icon: Globe,
    title: "Browse All Categories",
    subtitle: "Explore every emoji type",
    description:
      "Browse emojis organized by categories: Smileys, Hearts, Gestures, Nature, Food, Activities, Travel, Objects, and Symbols.",
    benefits: [
      "9 main categories",
      "Hundreds of subcategories",
      "Easy navigation",
      "Quick access to favorites",
    ],
    emoji: "🌈",
  },
  {
    id: "search",
    icon: Search,
    title: "Smart Search",
    subtitle: "Find emojis instantly",
    description:
      "Search emojis by name, keyword, or description. Our intelligent search finds the perfect emoji for any situation.",
    benefits: [
      "Keyword search",
      "Synonym matching",
      "Instant results",
      "Search history",
    ],
    emoji: "🔍",
  },
  {
    id: "copy",
    icon: Copy,
    title: "One-Click Copy",
    subtitle: "Copy with a single tap",
    description:
      "Click any emoji to copy it to your clipboard instantly. Paste it anywhere - chats, social media, documents, and more.",
    benefits: [
      "Instant copy",
      "Copied notification",
      "Batch copy mode",
      "Keyboard shortcuts",
    ],
    emoji: "📋",
  },
  {
    id: "favorites",
    icon: Star,
    title: "Favorites Collection",
    subtitle: "Save your go-to emojis",
    description:
      "Build your personal collection of favorite emojis. Access them instantly from the favorites section.",
    benefits: [
      "Unlimited favorites",
      "Quick access",
      "Cross-device sync",
      "Export options",
    ],
    emoji: "⭐",
  },
  {
    id: "trending",
    icon: Zap,
    title: "Trending Emojis",
    subtitle: "Stay current with trends",
    description:
      "Discover what's popular right now. See trending emojis used across social media and stay in the loop.",
    benefits: [
      "Real-time trends",
      "Weekly rankings",
      "Category highlights",
      "New release alerts",
    ],
    emoji: "🔥",
  },
];

const additionalFeatures = [
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "No tracking, no data collection. Your browsing stays completely private.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed. Find and copy emojis in milliseconds.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on all devices - phone, tablet, or desktop.",
  },
  {
    icon: Clock,
    title: "Always Updated",
    description: "New emojis added regularly as they're released by Unicode.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description:
      "Support for multiple languages and regional emoji variations.",
  },
  {
    icon: Copy,
    title: "No Account Needed",
    description: "Use immediately without sign-up. No login, no passwords.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge className="badge-cyber mb-6">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">Everything You Need</span>
            <br />
            <span className="text-foreground/80">For Emoji Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Powerful tools for discovering, organizing, and using emojis
            efficiently.
          </p>
        </div>

        <div className="space-y-32">
          {mainFeatures.map((feature, idx) => (
            <div
              key={feature.id}
              id={feature.id}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${idx % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
            >
              {/* Emoji showcase card */}
              <div className="flex-1 w-full">
                <div className="tech-border p-2 rounded-xl">
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50" />
                    <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <span className="text-9xl filter drop-shadow-xl animate-float">
                        {feature.emoji}
                      </span>
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <Badge
                      variant="secondary"
                      className="text-xs mb-1 bg-primary/10 text-primary border-primary/20"
                    >
                      {feature.subtitle}
                    </Badge>
                    <h3 className="text-3xl font-display font-bold">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm font-mono">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="badge-cyber mb-6">Advantages</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">Why Cybermoji</span>
            <br />
            <span className="text-foreground/80">Is Different</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Built with care, designed for emoji lovers everywhere.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {additionalFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="card-cyber p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
