import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    title: "Features & Functionality",
    faqs: [
      {
        question: "How many emojis are available?",
        answer:
          "Cybermoji features thousands of emojis across all categories. We regularly update our collection to include new emoji releases from Unicode as soon as they become available.",
      },
      {
        question: "Can I copy multiple emojis at once?",
        answer:
          "Yes! You can click on multiple emojis to add them to your clipboard. Simply click each emoji you want, then paste them all at once wherever you need them.",
      },
      {
        question: "Do the emojis work on all devices?",
        answer:
          "Yes! Our emojis are standard Unicode characters that work on all modern devices - iPhone, Android, Windows, Mac, and Linux. However, older devices may not display the newest emojis.",
      },
      {
        question: "Can I search for emojis by keyword?",
        answer:
          "Absolutely! Use the search bar to find emojis by keyword, name, or description. Try searching for concepts like 'happy', 'fire', 'love', or 'party' to find relevant emojis.",
      },
    ],
  },
  {
    title: "Usage & Compatibility",
    faqs: [
      {
        question: "Where can I use these emojis?",
        answer:
          "You can use our emojis anywhere that supports Unicode characters: social media (Twitter, Facebook, Instagram, TikTok), messaging apps (WhatsApp, Telegram, Discord), emails, documents, and websites.",
      },
      {
        question: "Why don't some emojis show up correctly?",
        answer:
          "Emoji display depends on your device's operating system and browser. Newer emojis may not appear on older devices. Try updating your OS or using a different device/browser if an emoji looks like a question mark or box.",
      },
      {
        question: "Are these emojis free to use?",
        answer:
          "Yes! All emojis in our collection are standard Unicode characters, which are free to use. There are no copyright restrictions on using emojis in your communications.",
      },
      {
        question: "Can I use these emojis in my app or website?",
        answer:
          "Yes! Since these are standard Unicode characters, you can use them freely in your applications and websites without any licensing requirements.",
      },
    ],
  },
  {
    title: "Technical Support",
    faqs: [
      {
        question: "Is Cybermoji free to use?",
        answer:
          "Yes! Cybermoji is completely free. All features including search, browsing, favorites, and copying emojis are available at no cost.",
      },
      {
        question: "Do I need to create an account?",
        answer:
          "No account is required! You can browse, search, and copy emojis immediately without any registration or login.",
      },
      {
        question: "How do I save my favorite emojis?",
        answer:
          "Click the star icon on any emoji to add it to your favorites collection. Your favorites are saved in your browser for quick access on future visits.",
      },
      {
        question: "Does Cybermoji work on mobile?",
        answer:
          "Yes! Cybermoji is fully responsive and works perfectly on all devices including smartphones and tablets.",
      },
    ],
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="badge-cyber mb-6">FAQ</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">Frequently Asked</span>
            <br />
            <span className="text-foreground/80">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Everything you need to know about using Cybermoji.
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
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <Badge className="badge-cyber mb-6">Get Started</Badge>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Ready to Find</span>
            <br />
            <span className="gradient-text-cyan">Your Perfect Emoji?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Start browsing our huge collection of emojis. Search, copy, and
            express yourself with thousands of emojis.
          </p>
          <Link href="#browse">
            <Button size="lg" className="btn-cyber text-lg px-12 py-4">
              Browse Emojis
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm font-mono text-muted-foreground">
            No registration required - start using emojis instantly
          </p>
        </div>
      </div>
    </section>
  );
}
