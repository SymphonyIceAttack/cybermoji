import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FAQSectionProps {
  translations?: Record<string, string>;
}

export function FAQSection({ translations = {} }: FAQSectionProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };
  const homeT = (key: string) => t(`home.${key}`);

  const faqCategories = [
    {
      title: homeT("faq.featuresTitle"),
      faqs: [
        {
          question: homeT("faq.q1"),
          answer: homeT("faq.a1"),
        },
        {
          question: homeT("faq.q2"),
          answer: homeT("faq.a2"),
        },
        {
          question: homeT("faq.q3"),
          answer: homeT("faq.a3"),
        },
        {
          question: homeT("faq.q4"),
          answer: homeT("faq.a4"),
        },
      ],
    },
    {
      title: homeT("faq.usageTitle"),
      faqs: [
        {
          question: homeT("faq.q5"),
          answer: homeT("faq.a5"),
        },
        {
          question: homeT("faq.q6"),
          answer: homeT("faq.a6"),
        },
        {
          question: homeT("faq.q7"),
          answer: homeT("faq.a7"),
        },
        {
          question: homeT("faq.q8"),
          answer: homeT("faq.a8"),
        },
      ],
    },
    {
      title: homeT("faq.techTitle"),
      faqs: [
        {
          question: homeT("faq.q9"),
          answer: homeT("faq.a9"),
        },
        {
          question: homeT("faq.q10"),
          answer: homeT("faq.a10"),
        },
        {
          question: homeT("faq.q11"),
          answer: homeT("faq.a11"),
        },
        {
          question: homeT("faq.q12"),
          answer: homeT("faq.a12"),
        },
      ],
    },
  ];

  return (
    <section id="faq" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="badge-cyber mb-6">{homeT("faq.badge")}</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">{homeT("faq.titleLarge")}</span>
            <br />
            <span className="text-foreground/80">
              {homeT("faq.titleLarge2")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {homeT("faq.subtitleLarge")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category) => (
            <div key={category.title} className="card-cyber p-8 rounded-xl">
              <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-primary" />
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <details
                    key={index}
                    open
                    className="group border border-border/50 rounded-lg bg-background/50 overflow-hidden"
                  >
                    <summary className="cursor-pointer p-4 font-medium hover:text-primary transition-colors flex items-center justify-between">
                      {faq.question}
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-4 pt-0 text-muted-foreground text-sm">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return null;
}
