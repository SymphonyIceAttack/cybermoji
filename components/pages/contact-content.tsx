import { Globe, Heart, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface ContactContentProps {
  lang: LanguageType;
}

export function ContactContent({ lang }: ContactContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b-2 border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Contact
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Get in Touch
            </h1>
            <p className="text-muted-foreground">
              We&apos;d love to hear from you
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed m-0">
                Have a question, suggestion, or just want to say hello?
                We&apos;re always happy to hear from our users. While we
                don&apos;t offer direct email support, there are several ways to
                reach us and get help.
              </p>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-6">Ways to Connect</h2>
            <div className="grid gap-4">
              <Card className="p-4 hover:border-primary/50 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      For general inquiries and feedback, reach out via email.
                      We try to respond within 24-48 hours.
                    </p>
                    <a
                      href="mailto:support@cybermoji.com"
                      className="text-sm text-primary hover:underline"
                    >
                      support@cybermoji.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:border-primary/50 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">FAQ</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Before reaching out, check our frequently asked questions
                      for quick answers to common questions.
                    </p>
                    <Link
                      href={`/${lang}/#faq`}
                      className="text-sm text-primary hover:underline"
                    >
                      View FAQ
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:border-primary/50 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">GitHub</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Report bugs, suggest features, or contribute to our open
                      source project on GitHub.
                    </p>
                    <a
                      href="https://github.com/cybermoji"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      github.com/cybermoji
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 hover:border-primary/50 transition-colors">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Social Media</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Follow us on social media for updates, news, and fun
                      emoji-related content.
                    </p>
                    <a
                      href="https://twitter.com/cybermoji"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      @cybermoji
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What We Can Help With</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Questions about using Cybermoji features</li>
              <li>Bug reports or technical issues</li>
              <li>Feature requests and suggestions</li>
              <li>General feedback about your experience</li>
              <li>Partnership or collaboration inquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Response Time</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to respond to all inquiries as quickly as possible. For
              email support, please allow 24-48 hours for a response. For urgent
              matters, please indicate this in your message. Note that we
              don&apos;t provide support for third-party services or platforms.
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                Looking for our policies?{" "}
                <Link
                  href={`/${lang}/privacy`}
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                |{" "}
                <Link
                  href={`/${lang}/terms`}
                  className="text-primary hover:underline"
                >
                  Terms of Service
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
