import Link from "next/link";

import type { LanguageType } from "@/lib/translations";

export function Footer({ lang }: { lang: LanguageType }) {
  return (
    <footer className="border-t border-primary/20 bg-card/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <span className="text-lg font-display font-bold text-primary">
                  D
                </span>
              </div>
              <span className="text-xl font-display font-bold tracking-wider">
                duckins<span className="text-primary">view</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced anonymous Instagram intelligence platform. Access
              profiles, stories, and reels without detection. Zero trace.
              Complete anonymity.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              System Operational
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              Capabilities
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#profiles"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Profile Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/#stories"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Story Access
                </Link>
              </li>
              <li>
                <Link
                  href="/#reels"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Reels Download
                </Link>
              </li>
              <li>
                <Link
                  href="/#highlights"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Highlights Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              Intelligence
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/guides/anonymous-stories"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Anonymous Stories Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/competitor-analysis"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Competitor Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Intelligence Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  FAQ Database
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              Compliance
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Privacy Protocol
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-primary/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-xs font-mono text-muted-foreground">
                &copy; {new Date().getFullYear()} duckinsview. All rights
                reserved.
              </p>
              <div className="hidden md:block w-px h-4 bg-primary/20" />
              <p className="text-xs font-mono text-muted-foreground">
                No Instagram/Meta affiliation
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>Secure</span>
              <span className="w-1 h-1 rounded-full bg-green-500" />
              <span>Encrypted</span>
              <span className="w-1 h-1 rounded-full bg-cyan-500" />
              <span>Anonymous</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
