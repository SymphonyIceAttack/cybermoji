# Cybermoji


<div align="center">
  <img src="public/base-logo.png" alt="Cybermoji Logo" width="120" height="120" />
  <br /><br />
  A modern, multilingual emoji browser and search tool built with Next.js 16 · TypeScript
  <br />
  <a href="https://cybermoji.org">Website</a> · <a href="https://github.com/SymphonyIceAttack/cybermoji">GitHub</a> · <a href="https://github.com/SymphonyIceAttack/cybermoji/issues">Report an issue</a>
</div>

---

Table of Contents
- About
- Features
- Tech stack
- Quick start
- Scripts & commands
- Environment & configuration
- Deploying (Cloudflare / OpenNext)
- Project structure
- Internationalization
- Data source & privacy
- Extending & customizing
- Troubleshooting
- Contributing
- License & acknowledgments

## About
Cybermoji is an emoji browser and search tool focused on speed, simplicity, and multilingual support. Browse curated categories, search across emoji names and tags, copy emoji with one click, and use the site in a number of languages. It is built with Next.js 16 (App Router), React 19 and TypeScript.

Why this project?
- Fast, client-first browsing with server-friendly Next.js conventions.
- Multilingual experience with language-scoped routes and hreflang generation.
- Privacy-forward: no login required and minimal tracking.

## Features
- Lightning fast emoji browsing and search
- Multilingual UI and emoji label support (10+ languages)
- One-click copy and favorites
- Dark / light theme with next-themes
- Responsive, accessible UI built with Tailwind CSS + shadcn/ui (Radix-based)
- Uses emojibase for authoritative emoji data
- Ready-to-deploy to Cloudflare via OpenNext (scripts provided)
- Biome for linting + formatting

## Tech stack
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19, Tailwind CSS v4, shadcn/ui, Radix UI
- Data: emojibase (via fetchEmojis)
- State & data fetching: @tanstack/react-query
- Theming: next-themes
- Lint & format: Biome
- Deployment: @opennextjs/cloudflare + wrangler

## Quick start (local development)
Requirements:
- Node.js 18+
- pnpm (recommended) — you can also use npm or yarn, but scripts below use pnpm

1. Clone
```bash
git clone https://github.com/SymphonyIceAttack/cybermoji.git
cd cybermoji
```

2. Install
```bash
pnpm install
```

3. Run dev server
```bash
pnpm dev
```
Open http://localhost:3000 — the app redirects to the default language (e.g. /en).

Build for production
```bash
pnpm build
pnpm start
```

Preview / Cloudflare local preview
```bash
pnpm preview
# (uses opennext + cloudflare preview tooling)
```

## Scripts & commands
These are pulled from package.json:
- pnpm dev — start Next.js dev server
- pnpm build — build for production
- pnpm start — run production build
- pnpm preview — opennext cloudflare build & preview locally
- pnpm deploy — opennext cloudflare build & deploy (preconfigured)
- pnpm upload — opennext cloudflare build & upload
- pnpm lint — run Biome linting (biome check)
- pnpm format — format with Biome (biome format --write)
- pnpm cf-typegen — generate wrangler types (wrangler types ...)

## Environment & configuration
- NEXT_PUBLIC_SITE_URL — used by the app as the canonical site URL (lib/config.ts). Example:
```env
NEXT_PUBLIC_SITE_URL=https://cybermoji.org
```

Next.js configuration highlights (next.config.ts):
- typedEnv experimental flag is enabled
- performance-focused caching headers for static assets
- image optimization supports AVIF and WebP and several device sizes

## Deploying (Cloudflare / OpenNext)
This project contains convenience scripts to build and deploy with OpenNext (Cloudflare Functions / Pages environment). The repo already includes:
- @opennextjs/cloudflare integration in package.json
- opennext.config / wrangler support files

A typical deploy flow (requires Cloudflare account + wrangler config):
1. Ensure Cloudflare credentials and wrangler config are set up.
2. Build & deploy:
```bash
pnpm deploy
```
This runs the OpenNext build and calls the cloudflare deploy command configured by @opennextjs/cloudflare.

If you want to preview locally (OpenNext preview):
```bash
pnpm preview
```

See wrangler docs and your Cloudflare project settings for environment variables and secrets setup.

## Project structure (high-level)
- app/ — Next.js App Router routes, includes language-scoped pages: /[lang]/
  - app/[lang]/layout.tsx — language-aware layout (lazy translations, theme provider)
  - app/[lang]/page.tsx — localized home page composition (structured data + CybermojiIndex)
- components/ — UI components (layout/header, layout/footer, cybermoji sections, emoji browser)
- hooks/ — client hooks (use-emojibase)
- lib/ — utilities, site config, translations, emoji-data adapters
- public/ — static assets (logo, manifest)
- next.config.ts — Next.js configuration
- package.json — scripts and dependencies

If you're exploring the codebase, useful starting points:
- components/layout/header.tsx — language switcher, categories, theme toggle
- components/layout/footer.tsx — footer resources, legal links
- hooks/use-emojibase.ts — emoji fetching, merging local labels, search helper
- lib/emoji-data.ts — server-side helpers to fetch and cache emojibase data
- app/[lang]/layout.tsx — global providers (React Query, next-themes, translation provider)

## Internationalization
- Routes are language-scoped: /en, /zh, /fr, etc.
- Hreflang links are generated via lib/translations/hreflang.ts using the site config and supported locales.
- The repository includes translations under lib/translations for supported languages. To add or update translations, edit the corresponding file(s) (e.g. lib/translations/en, lib/translations/zh, ...).

Supported languages (examples available in repo):
- English (en), 中文 (zh), Français (fr), Español (es), Deutsch (de), 日本語 (ja), 한국어 (ko), Português (pt), Русский (ru), العربية (ar)

## Data source & privacy
- Emoji data is provided by emojibase (fetchEmojis), which the app fetches and (on the client) caches using @tanstack/react-query.
- For non-English languages the app merges localized labels with English labels to keep consistent tags/search behavior.
- Privacy: Cybermoji is designed to be privacy-friendly — no login required and minimal tracking (see app pages for privacy policy and disclaimer components).

## Extending & customizing
- Change site-wide config: lib/config.ts (siteUrl, contactEmail, siteName).
- Add translations: lib/translations/* — update keys used across components (components call t('common.*')).
- Modify emoji data behavior:
  - hooks/use-emojibase.ts — controls client-side fetching/merging/search behavior.
  - lib/emoji-data.ts — server-side helpers (caching, search helpers).
- Theming: components/theme-toggle.tsx and next-themes setup in app/[lang]/layout.tsx.

## Troubleshooting & tips
- If emojis don't show localized labels properly, check network requests triggering fetchEmojis and ensure the requested locale is supported by emojibase.
- If pages are not served as expected in production, verify NEXT_PUBLIC_SITE_URL is correctly configured for canonical/alts (lib/config.ts).
- Long cache headers are set for images and static assets. During development make sure to clear caches if you replace static assets.
- Use `pnpm lint` and `pnpm format` to keep code consistent (Biome).

## Contributing
Contributions welcome! Basic workflow:
1. Fork the repo
2. Create a branch: git checkout -b feature/your-feature
3. Commit and push
4. Open a Pull Request

Please run lint/format before opening PRs:
```bash
pnpm format
pnpm lint
```

If you're adding a new language or editing translations:
- Add translation files under lib/translations/<lang> and ensure supportedLocales (lib/translations/index.ts) lists it.

Bug reports and feature requests:
- Open an issue on GitHub: https://github.com/SymphonyIceAttack/cybermoji/issues

## License & acknowledgments
- MIT License — see LICENSE file.
- Thanks and attribution:
  - Next.js — the React framework
  - Tailwind CSS
  - shadcn/ui + Radix UI
  - Emojibase — emoji data

<footer>
Built with ❤️ by <a href="https://github.com/SymphonyIceAttack">SymphonyIceAttack</a> — <a href="https://cybermoji.org">Visit cybermoji.org</a>
</footer>
