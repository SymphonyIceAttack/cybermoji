import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KeyInsightsProps {
  points: string[];
}

export function KeyInsights({ points }: KeyInsightsProps) {
  if (!points || points.length === 0) return null;

  return (
    <Card className="my-8 bg-gradient-to-br from-amber-50 via-amber-50/50 to-background dark:from-amber-950/20 dark:via-amber-950/10 dark:to-background border-2 border-amber-200/50 dark:border-amber-800/30 shadow-lg shadow-amber-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-display">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-foreground/90 leading-relaxed pt-0.5">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
