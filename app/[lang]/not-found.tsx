"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const params = useParams();
  const lang = (params.lang as string) || "en";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Display */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl animate-pulse" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-8">
              <div className="font-mono text-6xl md:text-8xl font-bold tracking-wider text-primary">
                404
              </div>
              <div className="font-mono text-lg text-muted-foreground mt-2">
                SYSTEM ERROR {/* PAGE NOT FOUND */}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="card-cyber p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Navigation <span className="text-primary">Failed</span>
            </h1>
            <p className="text-muted-foreground mb-6 font-mono text-sm">
              The requested page has been lost in the digital void. This could
              indicate an invalid URL or a temporary system malfunction.
            </p>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <Link href={`/${lang}`}>
                <Button className="btn-cyber w-full" variant="default">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
              </Link>
              <Link href={`/${lang}`}>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Content
                </Button>
              </Link>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
              <Link
                href={`/${lang}/privacy`}
                className="text-primary/80 hover:text-primary transition-colors"
              >
                [ Privacy ]
              </Link>
              <Link
                href={`/${lang}/terms`}
                className="text-primary/80 hover:text-primary transition-colors"
              >
                [ Terms ]
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <Link href={`/${lang}`}>
            <Button
              variant="ghost"
              className="font-mono text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Initiate New Search
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
