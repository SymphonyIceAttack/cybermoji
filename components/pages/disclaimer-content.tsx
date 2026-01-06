import { AlertTriangle, Info, Shield } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface DisclaimerContentProps {
  lang: LanguageType;
}

export function DisclaimerContent({ lang }: DisclaimerContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b-2 border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Disclaimer
            </h1>
            <p className="text-muted-foreground">
              Important information about our services
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="border-2 border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium mb-2">
                    Please Read Carefully
                  </p>
                  <p className="text-muted-foreground leading-relaxed m-0">
                    This disclaimer contains important information about the use
                    of Cybermoji. By accessing and using our services, you
                    acknowledge and agree to the terms outlined below.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              General Information
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Cybermoji provides an online platform for browsing, searching, and
              copying emojis. The information provided on this website is for
              general informational purposes only. By using our service, you
              agree to use it at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">No Professional Advice</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The content on Cybermoji, including but not limited to emoji
              meanings, interpretations, and usage suggestions, is provided for
              general entertainment and communication purposes only. This
              content should not be construed as professional advice of any
              kind, including but not limited to cultural, linguistic, or social
              advice.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Emoji meanings may vary across cultures, contexts, and platforms
              </li>
              <li>
                We do not guarantee the accuracy or appropriateness of any emoji
                interpretation
              </li>
              <li>
                Users should exercise their own judgment when using emojis in
                communication
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Content Accuracy</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              While we strive to provide accurate and up-to-date information,
              Cybermoji makes no representations or warranties of any kind,
              express or implied, about the completeness, accuracy, reliability,
              suitability, or availability of the emojis, their meanings, or
              related information on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Content</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Our website may contain links to third-party websites, services,
              or content that are not owned or controlled by Cybermoji. We have
              no control over and assume no responsibility for, the content,
              privacy policies, or practices of any third-party websites or
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Emoji Usage</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Emojis are Unicode characters that are subject to various
              copyright and trademark protections. While the emojis themselves
              are standardized Unicode characters, their display and
              representation may vary across different devices, operating
              systems, and applications.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                We do not claim ownership of any emojis or emoji-related content
              </li>
              <li>
                Users are responsible for ensuring their use of emojis complies
                with applicable laws and platform policies
              </li>
              <li>Some platforms may not support the latest emoji standards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              To the maximum extent permitted by applicable law, Cybermoji shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly, or any loss of
              data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your use of or inability to use our services</li>
              <li>
                Any unauthorized access to or use of our servers and/or any
                personal information stored therein
              </li>
              <li>
                Any interruption or cessation of transmission to or from our
                services
              </li>
              <li>
                Any bugs, viruses, or other harmful material that may be
                transmitted to or through our services
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">User Conduct</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Users agree to use Cybermoji only for lawful purposes and in a way
              that does not infringe the rights of, restrict, or inhibit anyone
              else&apos;s use and enjoyment of the website. Prohibited behavior
              includes harassing or causing distress or inconvenience to any
              other user.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Changes to This Disclaimer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify, amend, or change this disclaimer
              at any time without prior notice. Your continued use of Cybermoji
              after any such changes constitutes acceptance of the new
              disclaimer. We encourage users to review this page periodically
              for any updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this disclaimer, please{" "}
              <Link
                href={`/${lang}/contact`}
                className="text-primary hover:underline"
              >
                contact us
              </Link>
              .
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                Last updated: January 6, 2026
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                Related documents:{" "}
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
