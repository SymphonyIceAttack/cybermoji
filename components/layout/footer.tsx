import { Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LanguageType } from "@/lib/translations";
import { useTranslation } from "@/hooks/use-translation";

interface FooterProps {
  lang?: LanguageType;
}

export function Footer({ lang = "en" }: FooterProps) {
  const { t } = useTranslation(lang);

  const madeWithLove = t("common.footer.madeWith");

  return (
    <footer className="border-t border-primary/20 bg-card/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src="/base-logo.webp"
                  alt="Cybermoji logo"
                  width={64}
                  height={64}
                  sizes="64px"
                  className="object-contain rounded-xl"
                  decoding="async"
                />
              </div>
              <span className="text-xl font-display font-bold tracking-wider">
                Cyber<span className="text-primary">moji</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("common.footer.description")}
            </p>
            <a
              href={`mailto:${t("common.footer.contactEmail")}`}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t("common.footer.contactEmail")}
            </a>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              All {t("common.footer.allEmojisAvailable")}
            </div>
          </div>

          {/* Browse */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              {t("common.footer.browse")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#browse"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.allEmojis")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.categories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#trending"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.trending")}
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
              {t("common.footer.resources")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.faq")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/disclaimer`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.disclaimer")}
                </Link>
              </li>
            </ul>

            {/* Social & Platform Badges */}
            <div className="flex flex-col items-start gap-4 pt-2">
              <a
                href="https://github.com/SymphonyIceAttack/cybermoji"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-7 h-7" />
              </a>
              <a
                href="https://www.producthunt.com/products/cybermoji?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-cybermoji"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  alt="cybermoji - Find and copy emojis instantly. Free, no login | Product Hunt"
                  width="250"
                  height="54"
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1060824&theme=light"
                  className="block dark:hidden"
                />
                <img
                  alt="cybermoji - Find and copy emojis instantly. Free, no login | Product Hunt"
                  width="250"
                  height="54"
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1060824&theme=dark"
                  className="hidden dark:block"
                />
              </a>
              <a
                href="https://www.nxgntools.com/tools/cybermoji?utm_source=cybermoji"
                target="_blank"
                rel="noopener"
                style={{ display: "inline-block", width: "auto" }}
              >
                <img
                  src="https://www.nxgntools.com/api/embed/cybermoji?type=FIND_US_ON"
                  alt="NextGen Tools Badge - The #1 AI Tools Directory & Launch Platform"
                  style={{ height: "48px", width: "auto" }}
                />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              {t("common.footer.legal")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={`/${lang}/privacy`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/terms`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary">
              {t("common.footer.features")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.smartSearch")}
                </span>
              </li>
              <li>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {t("common.footer.oneClickCopy")}
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
                  {t("common.footer.multiLanguage")}
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
                &copy; {new Date().getFullYear()} Cybermoji.{" "}
                {t("common.footer.copyrightText")}
              </p>
              <div className="hidden md:block w-px h-4 bg-primary/20" />
              <p className="text-xs font-mono text-muted-foreground">
                {madeWithLove}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span>{t("common.footer.free")}</span>
              <span className="w-1 h-1 rounded-full bg-green-500" />
              <span>{t("common.footer.noLogin")}</span>
              <span className="w-1 h-1 rounded-full bg-cyan-500" />
              <span>{t("common.footer.instantCopy")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
