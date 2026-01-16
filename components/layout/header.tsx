"use client";

import { ChevronDown, Globe, Grid3X3, Menu, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useTranslation } from "@/hooks/use-translation";
import { emojiCategories } from "@/lib/categories";
import {
  type LanguageType,
  localeNames,
  supportedLocales,
} from "@/lib/translations";

interface HeaderProps {
  lang?: LanguageType;
}

export function Header({ lang = "en" }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang: contextLang } = useLanguage();
  const effectiveLang = lang || contextLang;
  const { t } = useTranslation(effectiveLang);

  const getLocalePath = useCallback(
    (newLocale: string) => {
      // Replace the language segment in the pathname
      const segments = pathname.split("/");
      if (
        segments[1] &&
        supportedLocales.includes(segments[1] as LanguageType)
      ) {
        segments[1] = newLocale;
      } else {
        // If current path doesn't have a valid language, prepend it
        return `/${newLocale}${pathname}`;
      }
      return segments.join("/");
    },
    [pathname],
  );

  const headerT = useCallback((key: string) => t(`common.nav.${key}`), [t]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
            <Image
              src="/base-logo.webp"
              alt="Cybermoji logo"
              width={48}
              height={48}
              sizes="(max-width: 640px) 40px, 48px"
              className="object-contain rounded-lg sm:rounded-xl"
              priority={true}
              fetchPriority="high"
            />
          </div>
          <span className="text-lg sm:text-xl font-display font-bold tracking-wider group-hover:text-primary transition-colors">
            Cyber<span className="text-primary">moji</span>
          </span>
        </Link>

        {/* Categories Dropdown */}
        <div className="hidden md:flex items-center gap-1">
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-primary/10"
            >
              <Grid3X3 className="h-4 w-4" />
              {headerT("categories")}
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
              <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg p-2 shadow-xl">
                <div className="grid grid-cols-2 gap-1">
                  {emojiCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/${lang}/category/${category.id}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:bg-primary/10"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-muted-foreground hover:text-foreground truncate">
                        {category.id === "all"
                          ? headerT("allEmojis")
                          : t(`common.category.${category.id}`)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Topics Link */}
          <Link
            href={`/${lang}/topic`}
            className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-primary/10"
          >
            <Sparkles className="h-4 w-4" />
            {headerT("topics")}
          </Link>
        </div>

        {/* Theme Toggle & Language */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-primary/10"
              aria-label={headerT("language")}
            >
              <Globe className="h-4 w-4" />
              {localeNames[lang] || "English"}
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
              <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg p-2 space-y-1 shadow-xl">
                {supportedLocales.map((locale) => (
                  <Link
                    key={locale}
                    href={getLocalePath(locale)}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                      lang === locale
                        ? "bg-primary/20 text-primary font-medium"
                        : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {localeNames[locale]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={
            mobileMenuOpen ? headerT("closeMenu") : headerT("openMenu")
          }
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/20 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto flex flex-col gap-2 p-4">
            {/* Categories */}
            <div className="flex flex-col gap-1">
              <p className="text-xs font-mono text-primary py-2 uppercase tracking-wider">
                {headerT("categories")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {emojiCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${lang}/category/${category.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-1 px-2 py-2 text-sm rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-full">
                      {category.id === "all"
                        ? headerT("all")
                        : t(`common.category.${category.id}`).split(" &")[0]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="flex flex-col gap-1 mt-4">
              <p className="text-xs font-mono text-primary py-2 uppercase tracking-wider">
                {headerT("topics")}
              </p>
              <Link
                href={`/${lang}/topic`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-muted-foreground hover:text-foreground">
                  {headerT("emojiTopics")}
                </span>
              </Link>
            </div>

            {/* Language */}
            <div className="flex flex-col gap-1 mt-4">
              <p className="text-xs font-mono text-primary py-2 uppercase tracking-wider">
                {headerT("language")}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {supportedLocales.slice(0, 6).map((locale) => (
                  <Link
                    key={locale}
                    href={getLocalePath(locale)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm rounded-md text-center transition-colors ${
                      lang === locale
                        ? "bg-primary/20 text-primary font-medium"
                        : "bg-primary/5 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {localeNames[locale]}
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {supportedLocales.slice(6).map((locale) => (
                  <Link
                    key={locale}
                    href={getLocalePath(locale)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm rounded-md text-center transition-colors ${
                      lang === locale
                        ? "bg-primary/20 text-primary font-medium"
                        : "bg-primary/5 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {localeNames[locale]}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
