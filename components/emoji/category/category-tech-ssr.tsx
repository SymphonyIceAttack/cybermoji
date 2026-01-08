import { Cpu, Globe, Lock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryTechProps {
  translations: Record<string, string>;
}

export function CategoryTech({ translations }: CategoryTechProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <Card className="bg-blue-500/5 border-blue-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-blue-500">
          <Cpu className="h-5 w-5" />
          {t("category.tech.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">
              {t("category.tech.performance.title")}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("category.tech.performance.desc")}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">{t("category.tech.typing.title")}</div>
            <div className="text-sm text-muted-foreground">
              {t("category.tech.typing.desc")}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Globe className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium">{t("category.tech.i18n.title")}</div>
            <div className="text-sm text-muted-foreground">
              {t("category.tech.i18n.desc")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
