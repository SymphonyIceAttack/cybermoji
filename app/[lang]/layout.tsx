import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import type React from "react";

import "../globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ReactQueryProvider } from "@/components/providers/query-provider";
import { LanguageProvider } from "@/context/language-context";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales } from "@/lib/translations";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "optional",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  icons: {
    icon: [
      { url: "/base-logo.webp", type: "image/webp", sizes: "1024x1024" },
      { url: "/base-logo.png", type: "image/png", sizes: "1024x1024" },
    ],
    apple: [{ url: "/base-logo.png", type: "image/png", sizes: "1024x1024" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!supportedLocales.includes(lang as LanguageType)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      className={`${jetbrainsMono.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <body className="font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <LanguageProvider lang={lang as LanguageType}>
              <div className="min-h-screen flex flex-col cyber-grid">
                <Header lang={lang as LanguageType} />
                <main className="flex-1 relative">{children}</main>
                <Footer lang={lang as LanguageType} />
              </div>
            </LanguageProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
