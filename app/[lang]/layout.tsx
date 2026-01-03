import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import type React from "react";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";

import "../globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";
import { supportedLocales } from "@/lib/translations";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/apple-icon.png" }],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0f" },
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
    redirect("/");
  }

  return (
    <html
      lang={lang}
      className={jetbrainsMono.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/base-logo.png" as="image" />
      </head>
      <body className="font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col cyber-grid">
            <Header lang={lang as LanguageType} />
            <main className="flex-1 relative">{children}</main>
            <Footer lang={lang as LanguageType} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
