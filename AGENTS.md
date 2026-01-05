# AGENTS.md - Cybermoji Development Guide

## Project Overview

Cybermoji is a Next.js 16 web application for browsing, searching, and copying emojis. The project uses modern web technologies including TypeScript, Tailwind CSS v4, shadcn/ui components, and Biome for linting. Follows the nextjs-i18n-starter pattern with full i18n support.

## Essential Commands

```bash
# Development
pnpm dev                    # Start development server on port 3000

# Build & Production
pnpm build                  # Build for production (Next.js build)
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # Run Biome linter (biome check)
pnpm format                 # Format code with Biome (biome format --write)
```

## Project Structure

```
Cybermoji/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Empty wrapper (only returns children)
│   ├── page.tsx            # Home page (redirects to /[lang])
│   ├── sitemap.ts          # SEO sitemap generation
│   ├── robots.ts           # SEO robots.txt
│   ├── globals.css         # Tailwind v4 CSS-first config
│   ├── not-found.tsx
│   └── [lang]/             # TRUE root layout (i18n dynamic route)
│       ├── layout.tsx      # Real root layout (fonts, providers, meta)
│       ├── page.tsx        # Language home page
│       ├── blog/           # Blog pages
│       ├── privacy/
│       └── terms/
├── components/
│   ├── ui/                 # shadcn/ui base components
│   │   ├── accordion.tsx   # FAQ accordion
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx # Navigation dropdowns
│   │   ├── input.tsx
│   │   └── tabs.tsx
│   ├── footer.tsx          # Site footer with links
│   ├── header.tsx          # Site header with navigation
│   ├── search-tool.tsx     # Instagram search and results
│   └── trust-badges.tsx    # Trust badges display
├── context/
│   └── language-context.tsx # i18n language provider
├── hooks/
│   └── use-translation.ts  # Translation hook
├── lib/
│   ├── config.ts            # Site configuration (siteUrl, siteName, siteDescription)
│   ├── utils.ts             # cn() utility
│   ├── mock-data.ts         # Mock Instagram data for demo
│   └── translations/        # i18n translations
│       ├── index.ts        # Central entry point, t() function
│       ├── en/             # English translations
│       ├── zh/             # Chinese translations
│       ├── fr/             # French translations
│       └── es/             # Spanish translations
├── public/                 # Static assets
├── biome.json              # Biome configuration
├── components.json         # shadcn/ui configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
└── package.json
```

## Internationalization (i18n)

### Language Setup

Supported languages defined in `lib/translations/index.ts`:

```typescript
export type LanguageType = "en" | "zh" | "fr" | "es";
export const supportedLocales: LanguageType[] = ["en", "zh", "fr", "es"];
export const languageNames: Record<LanguageType, string> = {
  en: "English",
  zh: "中文",
  fr: "Français",
  es: "Español",
};
```

### Translation File Structure

Each language has its own folder under `lib/translations/{lang}/`:

```
lib/translations/
├── index.ts                    # Central entry point, t() function
├── en/                         # English (source of truth)
│   ├── index.ts                # Merges all modules via spread
│   ├── common.ts               # Shared strings (nav, buttons, badges)
│   ├── home.ts                 # Homepage content
│   ├── privacy.ts              # Privacy page strings
│   ├── terms.ts                # Terms page strings
│   ├── blog.ts                 # Blog page strings
│   └── guides.ts               # Guides page strings
├── zh/                         # Chinese (same structure)
├── fr/                         # French (same structure)
└── es/                         # Spanish (same structure)
```

### Translation Key Pattern

Use dot notation for namespaces:

```typescript
// lib/translations/en/common.ts
export const common = {
  "nav.home": "Home",
  "nav.guides": "Guides",
  "nav.blog": "Blog",
  "trust.anonymous": "100% Anonymous",
  "search.placeholder": "Enter Instagram username",
};
```

### Using Translations

Client components use the hook:

```typescript
// hooks/use-translation.ts
import { useTranslation } from "@/hooks/use-translation";

function MyComponent({ lang }: { lang: LanguageType }) {
  const { t } = useTranslation(lang);
  return <h1>{t("nav.home")}</h1>;
}
```

Server components can use `t()` directly from `lib/translations/index.ts`.

### Route Structure

**Important**: `app/layout.tsx` is empty (only returns children). The real root layout is `app/[lang]/layout.tsx`.

This file handles:
- Font configuration (Geist, Geist Mono)
- Metadata and viewport
- All context providers (ThemeProvider, LanguageProvider)
- Layout components (Navbar, Footer)
- Dark mode support

```typescript
// app/[lang]/layout.tsx (TRUE root layout)
export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!supportedLocales.includes(lang as LanguageType)) {
    redirect("/");
  }
  // Returns: html with providers, Navbar, children, Footer
}
```

## Code Conventions

### File Naming
- **Pages/Features**: lowercase with dashes (e.g., `search-tool.tsx`, `trust-badges.tsx`)
- **UI Components**: lowercase (e.g., `button.tsx`, `card.tsx`, `tabs.tsx`, `accordion.tsx`, `dropdown-menu.tsx`)
- **Utilities**: lowercase (e.g., `utils.ts`, `mock-data.ts`)
- **Contexts**: lowercase (e.g., `language-context.tsx`)
- **Hooks**: lowercase (e.g., `use-translation.ts`)

### Component Patterns

**Client Components**: Use `"use client"` directive at the top
```tsx
"use client";

import { useState } from "react";
// ... component code
```

**Class Name Merging**: Use `cn()` utility from `@/lib/utils`
```tsx
import { cn } from "@/lib/utils";

function Component({ className }) {
  return <div className={cn("base-classes", className)} />;
}
```

**Variant Components**: Use class-variance-authority (cva)
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});
```

### Import Patterns

**Path Aliases**:
- `@/components/*` → `/components/*`
- `@/components/ui/*` → `/components/ui/*`
- `@/lib/*` → `/lib/*`
- `@/context/*` → `/context/*`
- `@/hooks/*` → `/hooks/*`

**Example imports**:
```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { LanguageProvider } from "@/context/language-context";
import { siteConfig } from "@/lib/config";
```

### Site Configuration

Centralized site configuration in `lib/config.ts`:

```typescript
// lib/config.ts
export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  siteName: "Cybermoji",
};
```

Use `siteConfig.siteUrl` instead of hardcoded URLs or `process.env` directly. Each page should define its own metadata/description.

### Tailwind CSS v4

The project uses Tailwind CSS v4 with CSS-first configuration in `app/globals.css`:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@theme inline {
  --color-primary: oklch(...);
  --font-sans: 'Geist', 'Geist Fallback';
  /* ... theme variables */
}
```

Custom shadows defined using CSS custom properties:
```css
:root {
  --shadow-x: 3px;
  --shadow-y: 3px;
  --shadow-color: #D0509A;
}

@theme inline {
  --shadow-md: calc(var(--shadow-x) * 2) ... color-mix(in srgb, var(--shadow-color) ...);
}
```

### shadcn/ui Components

The project follows shadcn/ui patterns:
- Uses Radix UI primitives (@radix-ui/react-slot, @radix-ui/react-tabs, @radix-ui/react-accordion, @radix-ui/react-dropdown-menu)
- Components stored in `components/ui/`
- Configured in `components.json`
- Icon library: lucide-react

### Context Providers

Three context providers wrap the app in `app/[lang]/layout.tsx`:

```typescript
// app/[lang]/layout.tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  <LanguageProvider lang={lang as LanguageType}>
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  </LanguageProvider>
</ThemeProvider>
```

### Language Context (`context/language-context.tsx`)

```typescript
"use client";
import { createContext, useContext } from "react";
import type { LanguageType } from "@/lib/translations";

interface LanguageContextType { lang: LanguageType; }

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, lang }: { children: ReactNode; lang: LanguageType }) {
  return <LanguageContext.Provider value={{ lang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
```

## Testing Approach

No test framework currently configured. When adding tests:
- Use Vitest for unit tests
- Use React Testing Library for component tests
- Place test files alongside components (e.g., `button.test.tsx`)

## Build System

- **Package Manager**: pnpm
- **Linter/Formatter**: Biome (biome.json configured)
- **TypeScript**: Strict mode enabled
- **Next.js**: Version 16.0.10 with App Router

## Environment Variables

- `.env` - Local environment variables
- `NEXT_PUBLIC_SITE_URL` - Site URL (read through `lib/config.ts`)
- Type validation enabled via `experimental.typedEnv` in next.config.ts

## Development Workflow

1. **Run development server**: `pnpm dev`
2. **Format code**: `pnpm format`
3. **Check for issues**: `pnpm lint`
4. **Build for production**: `pnpm build`

## SEO Features

- **Sitemap**: `app/sitemap.ts` - Generates sitemap.xml with all locale pages
- **Robots**: `app/robots.ts` - Generates robots.txt

## Notes

- The app uses mock data for Instagram profiles and content (demo mode)
- Internationalization route structure supports multiple languages via `[lang]` parameter
- Site redirects root (`/`) to default language (`/en`)
- Uses next-themes for dark mode support (configured via CSS custom properties)
- All biome lint issues have been fixed - `pnpm lint` passes cleanly
