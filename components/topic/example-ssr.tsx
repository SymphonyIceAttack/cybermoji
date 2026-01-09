"use client";

import { Check, Copy, Heart, Sparkles, Zap } from "lucide-react";
import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EmojiVariant {
  emoji: string;
  label?: string;
}

interface UsageScenario {
  id: string;
  template: string;
  placeholder: string;
  context: string;
}

interface TopicExampleProps {
  translations?: Record<string, string>;
  topicName: string;
  icon: string;
  emojiVariants: EmojiVariant[][];
  usageScenarios: UsageScenario[];
  proTip: string;
}

export function TopicExample({
  translations = {},
  topicName,
  icon,
  emojiVariants = [],
  usageScenarios = [],
  proTip,
}: TopicExampleProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const [activeVariant, setActiveVariant] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeScenario, setActiveScenario] = useState(0);
  const [filledEmoji, setFilledEmoji] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentEmojis = emojiVariants[activeVariant] || [];
  const currentScenario = usageScenarios[activeScenario] || usageScenarios[0];

  const copyEmoji = useCallback(async (emoji: string, index: number) => {
    await navigator.clipboard.writeText(emoji);
    setCopiedIndex(index);
    setIsAnimating(true);
    setTimeout(() => {
      setCopiedIndex(null);
      setIsAnimating(false);
    }, 1500);
  }, []);

  const copyCombination = useCallback(async () => {
    const combo = currentEmojis.map((v) => v.emoji).join("");
    await navigator.clipboard.writeText(combo);
    setCopiedIndex(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setCopiedIndex(null);
      setIsAnimating(false);
    }, 1500);
  }, [currentEmojis]);

  const fillScenario = useCallback(
    (emoji: string) => {
      setFilledEmoji(emoji);
      navigator.clipboard.writeText(
        currentScenario.template.replace(currentScenario.placeholder, emoji),
      );
    },
    [currentScenario],
  );

  return (
    <section id="example" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/3 to-transparent pointer-events-none" />

      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="h-8 w-8 text-primary animate-ping" />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="badge-cyber mb-4 animate-pulse-glow">
              <Zap className="h-3 w-3 mr-1" />
              {t("topic.example.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="gradient-text">{t("topic.example.title")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("topic.example.subtitle")}
            </p>
          </div>

          <div className="card-cyber p-8 rounded-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {emojiVariants.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {emojiVariants.map((variants, idx) => (
                  <Button
                    key={idx}
                    variant={activeVariant === idx ? "default" : "outline"}
                    size="sm"
                    type="button"
                    onClick={() => setActiveVariant(idx)}
                    className={`transition-all duration-300 ${
                      activeVariant === idx
                        ? "scale-105 shadow-lg shadow-primary/25"
                        : "hover:scale-105"
                    }`}
                  >
                    {variants[0]?.emoji}
                    {variants[0]?.label && (
                      <span className="ml-2 text-xs opacity-70 hidden sm:inline">
                        {variants[0].label}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            )}

            <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 items-start mt-2 lg:mt-0">
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                    <div className="flex flex-wrap justify-center gap-2 gap-y-3">
                      {currentEmojis.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => copyEmoji(item.emoji, index)}
                          className="relative group/emoji"
                        >
                          <span className="text-5xl sm:text-6xl cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-2 block">
                            {item.emoji}
                          </span>
                          {item.label && (
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover/emoji:opacity-100 transition-opacity whitespace-nowrap">
                              {item.label}
                            </span>
                          )}
                          {copiedIndex === index && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1 animate-bounce">
                              <Check className="h-3 w-3" />
                              {t("topic.example.copied")}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={copyCombination}
                  className="w-full gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-[1.02]"
                >
                  {copiedIndex === -1 ? (
                    <>
                      <Check className="h-4 w-4" />
                      {t("topic.example.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      {t("topic.example.copyAll")}
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <h4 className="font-display font-semibold text-lg">
                      {topicName}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {t("topic.example.variantDescription")}
                    </p>
                  </div>
                </div>

                {usageScenarios.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {usageScenarios.map((scenario, idx) => (
                        <button
                          key={scenario.id}
                          type="button"
                          onClick={() => {
                            setActiveScenario(idx);
                            setFilledEmoji("");
                          }}
                          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                            activeScenario === idx
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {scenario.context}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                      <p className="text-sm text-muted-foreground mb-3">
                        {t("topic.example.tryIt")}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentEmojis.slice(0, 5).map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => fillScenario(item.emoji)}
                            className="text-2xl px-3 py-2 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/50 transition-all duration-200 hover:scale-110"
                          >
                            {item.emoji}
                          </button>
                        ))}
                      </div>
                      <div className="p-3 rounded-lg bg-background border border-border">
                        <p className="text-sm">
                          {filledEmoji
                            ? currentScenario.template.replace(
                                currentScenario.placeholder,
                                filledEmoji,
                              )
                            : currentScenario.template}
                        </p>
                      </div>
                      {filledEmoji && (
                        <p className="text-xs text-primary mt-2 flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          {t("topic.example.copiedToClipboard")}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 animate-pulse" />
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">
                        {t("topic.example.proTip")}
                      </p>
                      <p className="text-sm text-muted-foreground">{proTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              {t("topic.example.encouragement")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
