import { Globe, Search, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Search",
    description: "Find emojis by keyword, mood, or category instantly.",
  },
  {
    icon: Globe,
    title: "Browse",
    description: "Explore organized categories to discover new emojis.",
  },
  {
    icon: Zap,
    title: "Copy",
    description: "One-click copy to clipboard, ready to paste anywhere.",
  },
  {
    icon: Star,
    title: "Topics",
    description: "Discover curated emoji combinations by theme.",
  },
];

export function WhatIsSection() {
  return (
    <section id="what-is" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="badge-cyber mb-6">What is Cybermoji</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">
                Your Ultimate Emoji Destination
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Cybermoji is your go-to platform for discovering, exploring, and
              copying emojis. We organize thousands of emojis by categories,
              topics, and trends to help you find the perfect expression for any
              moment.
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

export function HowToUseSection() {
  const steps = [
    {
      number: "01",
      title: "Browse or Search",
      description:
        "Explore emojis by category, search by keyword, or discover trending combinations.",
    },
    {
      number: "02",
      title: "Click to Copy",
      description:
        "Simply click on any emoji or emoji combination to copy it to your clipboard instantly.",
    },
    {
      number: "03",
      title: "Use Anywhere",
      description:
        "Paste the emoji in your social media posts, messages, documents, or anywhere else.",
    },
  ];

  return (
    <section id="how-to-use" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="badge-cyber mb-6">How to Use</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">
                Start Using Emojis in 3 Steps
              </span>
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
