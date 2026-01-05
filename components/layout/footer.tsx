import Image from "next/image";
import Link from "next/link";
import type { LanguageType } from "@/lib/translations";

interface FooterProps {
  lang?: LanguageType;
}

export function Footer({ lang }: FooterProps) {
  const madeWithLove =
    lang === "zh"
      ? "为 emoji 爱好者制作"
      : lang === "fr"
        ? "Fait avec amour pour les amateurs d'emoji"
        : lang === "es"
          ? "Hecho con amor para los amantes de los emoji"
          : "Made with ❤️ for emoji lovers";

  return (
    <footer className="border-t border-primary/20 bg-card/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <Image
                  src="/base-logo.png"
                  alt="Cybermoji"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
              <span className="text-xl font-display font-bold tracking-wider">
                Cyber<span className="text-primary">moji</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The ultimate emoji collection. Browse, search, and copy thousands
              of emojis instantly. 100% free, no login required.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              All Emojis Available
            </div>
          </div>

          {/* Browse */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              Browse
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#browse"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  All Emojis
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/#trending"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href="/#favorites"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#faq"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Privacy Policy
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

          {/* Features */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              Features
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Smart Search
                </span>
              </li>
              <li>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  One-Click Copy
                </span>
              </li>
              <li>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Favorites
                </span>
              </li>
              <li>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  Multi-Language
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-primary/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-xs font-mono text-muted-foreground">
                &copy; {new Date().getFullYear()} Cybermoji. All rights
                reserved.
              </p>
              <div className="hidden md:block w-px h-4 bg-primary/20" />
              <p className="text-xs font-mono text-muted-foreground">
                {madeWithLove}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>100% Free</span>
              <span className="w-1 h-1 rounded-full bg-green-500" />
              <span>No Login</span>
              <span className="w-1 h-1 rounded-full bg-cyan-500" />
              <span>Instant Copy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
