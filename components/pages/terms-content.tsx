import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface TermsContentProps {
  lang: LanguageType;
}

export function TermsContent({ lang }: TermsContentProps) {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 mb-8">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed m-0">
                Welcome to Cybermoji. By accessing or using our service, you
                agree to be bound by these Terms of Service. Please read them
                carefully before using our service.
              </p>
            </CardContent>
          </Card>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Service Description</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Cybermoji is a free online tool that allows users to view publicly
              available Instagram content without requiring an Instagram
              account. Our service provides:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Viewing of public Instagram profiles and posts</li>
              <li>Viewing of public stories and highlights</li>
              <li>Viewing and downloading of public Reels</li>
              <li>Downloading of publicly available content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              When using Cybermoji, you agree to use the service responsibly and
              legally. You may use our service for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>
                Personal, non-commercial browsing of public Instagram content
              </li>
              <li>Research and competitive analysis</li>
              <li>Saving content for personal reference</li>
              <li>
                Any other lawful purpose that respects others&apos; rights
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              3. Prohibited Activities
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              You agree NOT to use Cybermoji for any of the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Harassing, stalking, or intimidating any person</li>
              <li>Any illegal activities or purposes</li>
              <li>Violating others&apos; intellectual property rights</li>
              <li>Commercial scraping or data harvesting at scale</li>
              <li>
                Attempting to access private accounts or restricted content
              </li>
              <li>Circumventing any security measures or access controls</li>
              <li>Impersonating others or misrepresenting your identity</li>
              <li>Redistributing downloaded content as your own</li>
              <li>Automated access or bot usage without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Our Service:</strong> The Cybermoji website, design, code,
              and branding are owned by us and protected by intellectual
              property laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Third-Party Content:</strong> Content viewed through
              Cybermoji belongs to its original creators. Downloading content
              does not transfer ownership or grant you rights to redistribute
              it. Always respect copyright and the rights of content creators.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              5. Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Cybermoji is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind. We do not
              guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy or completeness of content displayed</li>
              <li>That the service will meet your specific requirements</li>
              <li>Availability of any particular content or account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Cybermoji and its
              operators shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly, or
              any loss of data, use, goodwill, or other intangible losses
              resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              7. Relationship with Instagram
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cybermoji is an independent service and is not affiliated with,
              endorsed by, or sponsored by Instagram or Meta Platforms, Inc.
              Instagram is a trademark of Meta Platforms, Inc. We access only
              publicly available information and do not use Instagram&apos;s
              official API for this purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              8. Service Modifications
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part
              of our service at any time without notice. We may also update
              these Terms of Service periodically. Continued use of the service
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your access to Cybermoji immediately,
              without prior notice, for any reason including breach of these
              Terms. Upon termination, your right to use the service ceases
              immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              applicable laws, without regard to conflict of law principles. Any
              disputes arising from these terms or your use of the service shall
              be resolved through appropriate legal channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms of Service, please contact
              us through our website.
            </p>
          </section>

          <Card className="border-2 mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground m-0">
                Related documents:{" "}
                <Link
                  href={`/${lang}/privacy`}
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
