import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageType } from "@/lib/translations";

interface PrivacyContentProps {
  lang: LanguageType;
}

export function PrivacyContent({ lang }: PrivacyContentProps) {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 6, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <Card className="border-2 mb-8">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed m-0">
                At Cybermoji, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, and protect information
                when you use our service. By using Cybermoji, you agree to the
                practices described in this policy.
              </p>
            </CardContent>
          </Card>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold mb-2">
              Information You Provide
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              When you use Cybermoji, we collect minimal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>
                <strong>Search queries:</strong> The Instagram usernames you
                search for (not permanently stored)
              </li>
              <li>
                <strong>Usage data:</strong> Basic analytics about how you use
                our service (anonymized)
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">
              Information We Do NOT Collect
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Instagram login credentials or passwords</li>
              <li>Personal identification information (name, email, phone)</li>
              <li>Payment information (our service is free)</li>
              <li>Location data beyond general country/region</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              2. How We Use Information
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The limited information we collect is used solely for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Providing and improving our service</li>
              <li>
                Analyzing usage patterns to enhance user experience (anonymized)
              </li>
              <li>Preventing abuse and maintaining service quality</li>
              <li>Technical troubleshooting and security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We implement industry-standard security measures to protect any
              data processed through our service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All connections are encrypted using SSL/TLS (HTTPS)</li>
              <li>We do not store search history or browsing data</li>
              <li>Regular security audits and updates</li>
              <li>No persistent storage of user sessions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We may use third-party services to operate our website and serve
              advertisements:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>
                <strong>CDN (Content Delivery Network):</strong> To deliver our
                website quickly and reliably
              </li>
              <li>
                <strong>Analytics:</strong> Anonymous usage statistics to
                improve our service
              </li>
              <li>
                <strong>Hosting:</strong> Secure cloud infrastructure
              </li>
              <li>
                <strong>
                  Advertising Partners (including Google AdSense):
                </strong>{" "}
                To display advertisements and measure their effectiveness. These
                partners may use cookies and similar technologies to provide
                personalized ads based on your interests.
              </li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These services have their own privacy policies, and we choose
              partners who respect user privacy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For information about how Google uses data when you use our site,
              please visit{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                How Google uses data from sites or apps that use our services
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              5. Cookies and Advertising
            </h2>

            <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Cybermoji uses essential cookies required for basic site
              functionality, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Remembering your language preference</li>
              <li>Maintaining session security</li>
              <li>Enabling core site features and navigation</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">
              Third-Party Advertising Cookies
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Google AdSense and Third-Party Vendors:</strong>{" "}
              Third-party vendors, including Google, use cookies to serve ads
              based on users&apos; prior visits to our website or other
              websites. Google&apos;s use of advertising cookies enables it and
              its partners to serve ads to our users based on their visit to our
              sites and/or other sites on the internet.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Users may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/choices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.aboutads.info/choices
              </a>{" "}
              or by configuring their browser to reject all cookies or notify
              them when a cookie is set.
            </p>

            <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We may use analytics tools to understand how users interact with
              our website. These tools collect information anonymously and help
              us improve our service. You can disable analytics tracking through
              your browser settings.
            </p>

            <h3 className="text-lg font-semibold mb-2">Consent Management</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              For users in the European Economic Area (EEA) and United Kingdom,
              we comply with Google&apos;s Consent Mode requirements. When you
              visit our site, we may display a consent banner that allows you to
              choose which types of cookies you accept. By clicking
              &quot;Accept&quot; or continuing to use our site without
              customizing settings, you consent to the use of cookies as
              described in this policy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You can withdraw your consent at any time by clearing your browser
              cookies or using our cookie settings (if available).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Depending on your location, you may have certain rights regarding
              your personal data:
            </p>

            <h3 className="text-lg font-semibold mb-2">General Rights</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>
                <strong>Right to Access:</strong> Know what data we collect
                (this policy explains it all)
              </li>
              <li>
                <strong>Right to Deletion:</strong> Request deletion of any data
                we may have about you
              </li>
              <li>
                <strong>Right to Opt-Out:</strong> Disable analytics tracking
                through browser settings
              </li>
              <li>
                <strong>Right to Restrict:</strong> Limit how we process your
                data
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">
              GDPR Rights (EEA and UK Users)
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If you are located in the European Economic Area or United
              Kingdom, you have additional rights under the General Data
              Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
              <li>Right to restrict data processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise any of these rights, please{" "}
              <Link
                href={`/${lang}/contact`}
                className="text-primary hover:underline"
              >
                contact us
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cybermoji is not intended for use by children under 13 years of
              age. We do not knowingly collect information from children. If you
              believe a child has used our service, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated revision date. We encourage
              you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our practices,
              please{" "}
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
                Related documents:{" "}
                <Link
                  href={`/${lang}/terms`}
                  className="text-primary hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                |{" "}
                <Link
                  href={`/${lang}/disclaimer`}
                  className="text-primary hover:underline"
                >
                  Disclaimer
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
