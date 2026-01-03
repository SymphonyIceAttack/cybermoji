"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import type { LanguageType } from "@/lib/translations";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header({}: { lang: LanguageType }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
            <span className="text-lg font-display font-bold text-primary">
              D
            </span>
            <div className="absolute inset-0 rounded-lg bg-primary/5 animate-pulse" />
          </div>
          <span className="text-lg font-display font-bold tracking-wider group-hover:text-primary transition-colors">
            duckins<span className="text-primary">view</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              INTELLIGENCE
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="card-cyber rounded-lg p-2 space-y-1">
                <Link
                  href="/guides/anonymous-stories"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                >
                  Anonymous Story Viewing
                </Link>
                <Link
                  href="/guides/competitor-analysis"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                >
                  Competitor Analysis
                </Link>
                <Link
                  href="/guides/no-account-needed"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                >
                  No Account Needed
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              DATABASE
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="card-cyber rounded-lg p-2 space-y-1">
                <Link
                  href="/blog/instagram-tools-2026"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                >
                  Instagram Tools Guide 2026
                </Link>
                <Link
                  href="/blog/instagram-privacy-guide"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                >
                  Privacy Best Practices
                </Link>
                <Link
                  href="/blog/content-creators-guide"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                >
                  Content Creator Guide
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Theme Toggle & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/#search">
            <Button className="btn-cyber text-sm px-6 py-2">Initialize</Button>
          </Link>
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
                Intelligence
              </p>
              <Link
                href="/guides/anonymous-stories"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Anonymous Story Viewing
                </Button>
              </Link>
              <Link
                href="/guides/competitor-analysis"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Competitor Analysis
                </Button>
              </Link>
              <Link
                href="/guides/no-account-needed"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  No Account Needed
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-mono text-primary py-2 uppercase tracking-wider">
                Database
              </p>
              <Link
                href="/blog/instagram-tools-2026"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Instagram Tools 2026
                </Button>
              </Link>
              <Link
                href="/blog/instagram-privacy-guide"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Privacy Guide
                </Button>
              </Link>
              <Link
                href="/blog/content-creators-guide"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  Creator Guide
                </Button>
              </Link>
            </div>
            <Link href="/#search" onClick={() => setMobileMenuOpen(false)}>
              <Button className="btn-cyber w-full mt-2">
                Initialize Protocol
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
