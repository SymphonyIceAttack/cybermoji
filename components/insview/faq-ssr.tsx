import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    title: "Features & Functionality",
    faqs: [
      {
        question: "What content can I view with duckinsview?",
        answer:
          "You can view public Instagram profiles, posts (photos and videos), stories, Reels, and highlights. This includes profile pictures, bios, follower counts, and all public content the user has shared. Private accounts are not accessible.",
      },
      {
        question: "Can I download Instagram content?",
        answer:
          "Yes! You can download photos, videos, stories, and Reels in their original quality. Just click the download button on any piece of content you want to save. Downloads are free and unlimited.",
      },
      {
        question: "Can I view Instagram stories anonymously?",
        answer:
          "Yes, this is one of our core features. When you view stories through duckinsview, your view is not recorded. The story owner will not see your name in their viewer list.",
      },
      {
        question: "Do you support viewing private accounts?",
        answer:
          "No. duckinsview only works with public Instagram accounts. We respect user privacy settings, and private accounts remain private.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    faqs: [
      {
        question: "Is duckinsview completely anonymous?",
        answer:
          "Yes. When you use duckinsview, the account owner has no way of knowing you viewed their profile or content. We don't require any login, and your activity is not tracked by Instagram.",
      },
      {
        question: "Do you require my Instagram login?",
        answer:
          "Absolutely not. We never ask for your Instagram credentials. duckinsview works without any login - just enter a username and start browsing.",
      },
      {
        question: "Is my data safe?",
        answer:
          "We take privacy seriously. All connections are encrypted with SSL/TLS. We don't store your search queries or browsing history. We don't use tracking cookies.",
      },
      {
        question: "Is it legal to view Instagram anonymously?",
        answer:
          "Yes. Viewing publicly available content is legal. We only access public information that anyone can see on Instagram.",
      },
    ],
  },
  {
    title: "Technical Support",
    faqs: [
      {
        question: "Why can't I find a certain account?",
        answer:
          "There are a few reasons: 1) The account may be private, 2) The username may be misspelled, 3) The account may have been deleted or suspended by Instagram.",
      },
      {
        question: "Does duckinsview work on mobile devices?",
        answer:
          "Yes! duckinsview is fully responsive and works on all devices - desktop, tablet, and mobile phones. No app download is required.",
      },
      {
        question: "Is duckinsview free to use?",
        answer:
          "Yes! duckinsview is completely free. All features including profile viewing, story viewing, and downloads are available at no cost.",
      },
      {
        question: "Do I need to create an account?",
        answer:
          "No. duckinsview works without any account or registration. Just visit the site, enter a username, and start viewing.",
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
          <Badge className="badge-cyber mb-6">Knowledge Base</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">Frequently Asked</span>
            <br />
            <span className="text-foreground/80">Intelligence Queries</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Comprehensive intelligence on our operational protocols and
            capabilities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category) => (
            <div key={category.title} className="card-cyber p-8 rounded-xl">
              <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-primary animate-pulse" />
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
          <Badge className="badge-cyber mb-6">Deploy Now</Badge>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Ready to Go</span>
            <br />
            <span className="gradient-text-cyan">Dark Web?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join over 1 million users who trust duckinsview for secure,
            anonymous Instagram access. No registration. No tracking. Complete
            anonymity guaranteed.
          </p>
          <Link href="#search">
            <Button size="lg" className="btn-cyber text-lg px-12 py-4">
              Initialize Protocol
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm font-mono text-muted-foreground">
            No credentials required - access immediately
          </p>
        </div>
      </div>
    </section>
  );
}
