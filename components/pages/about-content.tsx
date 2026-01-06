import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface AboutContentProps {
  lang: LanguageType;
}

export function AboutContent({ lang }: AboutContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b-2 border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              About
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              About Cybermoji
            </h1>
            <p className="text-muted-foreground">
              Your ultimate destination for emoji discovery and expression
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
                Cybermoji was born from a simple idea: everyone deserves easy
                access to the perfect emoji for any moment. We&apos;re a team of
                emoji enthusiasts who believe that a single emoji can convey
                emotions, ideas, and connections that words sometimes cannot.
              </p>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We&apos;re on a mission to make emoji discovery and usage
              effortless for everyone. Whether you&apos;re looking for the
              perfect reaction, trying to add flair to your social media posts,
              or simply want to express yourself more creatively, Cybermoji is
              here to help.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong>3,000+ curated emojis</strong> - A vast collection
                organized by categories, topics, and trends
              </li>
              <li>
                <strong>Instant one-click copying</strong> - Get your emoji
                ready to paste in milliseconds
              </li>
              <li>
                <strong>Smart search</strong> - Find the right emoji by keyword,
                mood, or context
              </li>
              <li>
                <strong>Topic collections</strong> - Curated emoji combinations
                for specific themes and expressions
              </li>
              <li>
                <strong>Multi-language support</strong> - Available in 10+
                languages
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-bold mb-2">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Emoji should be available to everyone, everywhere, without
                    barriers.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-bold mb-2">Simplicity</h3>
                  <p className="text-sm text-muted-foreground">
                    Finding and using emojis should be intuitive and
                    frustration-free.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-bold mb-2">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    We curate and organize emojis thoughtfully for the best user
                    experience.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-bold mb-2">Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is yours. We collect nothing and track nothing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cybermoji is used by millions of people around the world. Whether
              you&apos;re a casual user or an emoji power user, we&apos;re glad
              you&apos;re here. Thank you for making Cybermoji part of your
              digital expression journey.
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                Have questions?{" "}
                <Link
                  href={`/${lang}/contact`}
                  className="text-primary hover:underline"
                >
                  Get in touch with us
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
