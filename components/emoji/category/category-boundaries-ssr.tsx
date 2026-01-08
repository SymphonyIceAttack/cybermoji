import { Shield, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryBoundariesProps {
  translations: Record<string, string>;
}

export function CategoryBoundaries({ translations }: CategoryBoundariesProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <Card className="bg-red-500/5 border-red-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-red-500">
          <Shield className="h-5 w-5" />
          {t("category.usage.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">
              {t("category.usage.platform.title")}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("category.usage.platform.desc")}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">{t("category.usage.zwj.title")}</div>
            <div className="text-sm text-muted-foreground">
              {t("category.usage.zwj.desc")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
