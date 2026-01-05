"use client";

import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  supportedLocales,
  localeNames,
  type LanguageType,
} from "@/lib/translations";

interface HeaderProps {
  lang?: LanguageType;
}

export function Header({ lang = "en" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12">
            <Image
              src="/base-logo.png"
              alt="Cybermoji"
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <span className="text-xl font-display font-bold tracking-wider group-hover:text-primary transition-colors">
            Cyber<span className="text-primary">moji</span>
          </span>
        </Link>

        {/* Theme Toggle & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-primary/10"
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
                    href={`/${locale}`}
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
            <div className="flex flex-col gap-1">
              <p className="text-xs font-mono text-primary py-2 uppercase tracking-wider">
                Language
              </p>
              <div className="grid grid-cols-2 gap-2">
                {supportedLocales.slice(0, 6).map((locale) => (
                  <Link
                    key={locale}
                    href={`/${locale}`}
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
                    href={`/${locale}`}
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
