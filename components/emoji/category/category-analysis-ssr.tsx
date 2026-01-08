import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmojibaseEmoji } from "@/hooks/use-emojibase";

interface CategoryAnalysisProps {
  translations: Record<string, string>;
  filteredEmojis: EmojibaseEmoji[];
  subgroups: Array<{ id: number; name: string; count: number }>;
}

export function CategoryAnalysis({
  translations,
  filteredEmojis,
  subgroups,
}: CategoryAnalysisProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          {t("category.analysis.title")}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            {t("category.analysis.subtitle")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {filteredEmojis.length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {t("category.analysis.totalEmojis")}
            </div>
          </div>
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {subgroups.length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {t("category.analysis.subgroups")}
            </div>
          </div>
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary">92%</div>
            <div className="text-xs text-muted-foreground mt-1">
              {t("category.analysis.popularityScore")}
            </div>
          </div>
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary">1.2K</div>
            <div className="text-xs text-muted-foreground mt-1">
              {t("category.analysis.dailyViews")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
