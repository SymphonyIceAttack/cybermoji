import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { LanguageType } from "@/lib/translations";

interface PageLayoutProps {
  children: ReactNode;
  lang: LanguageType;
}

export function PageLayout({ children, lang }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
