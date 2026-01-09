import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TopicFAQProps {
  translations?: Record<string, string>;
  topicName: string;
}

export function TopicFAQ({ translations = {}, topicName }: TopicFAQProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };
  const topicT = (key: string) => t(`topic.${key}`);

  const subtitleLarge = topicT("faq.subtitleLarge").replace(
    "{topicName}",
    topicName,
  );

  const faqCategories = [
    {
      title: topicT("faq.usingTitle"),
      faqs: [
        {
          question: topicT("faq.q1"),
          answer: topicT("faq.a1"),
        },
        {
          question: topicT("faq.q2"),
          answer: topicT("faq.a2"),
        },
        {
          question: topicT("faq.q3"),
          answer: topicT("faq.a3"),
        },
      ],
    },
    {
      title: topicT("faq.tipsTitle"),
      faqs: [
        {
          question: topicT("faq.q4"),
          answer: topicT("faq.a4"),
        },
        {
          question: topicT("faq.q5"),
          answer: topicT("faq.a5"),
        },
        {
          question: topicT("faq.q6"),
          answer: topicT("faq.a6"),
        },
      ],
    },
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="badge-cyber mb-6">{topicT("faq.badge")}</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">{topicT("faq.titleLarge")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitleLarge}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category) => (
            <div key={category.title} className="card-cyber p-6 rounded-xl">
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {category.title}
              </h3>
              <div className="space-y-3">
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
