import { CheckCircle2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryPainPointsProps {
  translations: Record<string, string>;
}

export function CategoryPainPoints({ translations }: CategoryPainPointsProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          {t("category.painPoints.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">
              {t("category.painPoints.findFast.title")}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("category.painPoints.findFast.desc")}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">
              {t("category.painPoints.crossPlatform.title")}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("category.painPoints.crossPlatform.desc")}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">
              {t("category.painPoints.privacy.title")}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("category.painPoints.privacy.desc")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
