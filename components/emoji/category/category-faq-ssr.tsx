import { Lightbulb } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryFAQProps {
  translations: Record<string, string>;
}

export function CategoryFAQ({ translations }: CategoryFAQProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          {t("category.faq.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          defaultValue={["item-1", "item-2", "item-3", "item-4"]}
        >
          <AccordionItem value="item-1" className="border-primary/20">
            <AccordionTrigger className="text-sm py-3">
              {t("category.faq.q1")}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {t("category.faq.a1")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-primary/20">
            <AccordionTrigger className="text-sm py-3">
              {t("category.faq.q3")}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {t("category.faq.a3")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-primary/20">
            <AccordionTrigger className="text-sm py-3">
              {t("category.faq.q5")}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {t("category.faq.a5")}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-primary/20">
            <AccordionTrigger className="text-sm py-3">
              {t("category.faq.q7")}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {t("category.faq.a7")}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
