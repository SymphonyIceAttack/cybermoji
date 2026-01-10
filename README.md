# Cybermoji

<div align="center">
  <img src="public/base-logo.png" alt="Cybermoji Logo" width="120" height="120" />
  <br /><br />
  
  [![GitHub Stars](https://img.shields.io/github/stars/SymphonyIceAttack/cybermoji)](https://github.com/SymphonyIceAttack/cybermoji)
  [![GitHub Issues](https://img.shields.io/github/issues/SymphonyIceAttack/cybermoji)](https://github.com/SymphonyIceAttack/cybermoji/issues)
  [![MIT License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
  <br />
  A modern, multilingual emoji browser and search tool built with Next.js 16
  
  [Visit Website](https://cybermoji.org) · [GitHub](https://github.com/SymphonyIceAttack/cybermoji) · [Report Bug](https://github.com/SymphonyIceAttack/cybermoji/issues)
</div>

## Features

- 🚀 **Lightning Fast** - Built with Next.js 16 and React 19 for optimal performance
- 🌍 **Multilingual Support** - Full i18n with 10+ languages including English, Chinese, French, Spanish, and more
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS v4 and shadcn/ui components
- 🔍 **Smart Search** - Instantly find the perfect emoji
- 📋 **One-Click Copy** - Copy emojis with a single click
- 💾 **Favorites** - Save your favorite emojis for quick access
- 🌙 **Dark Mode** - Full dark mode support
- 🔒 **Privacy First** - No login required, no tracking

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Linting**: Biome
- **Internationalization**: Custom i18n solution
- **Font**: Geist Sans/Mono

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn/bun

### Installation

```bash
# Clone the repository
git clone https://github.com/SymphonyIceAttack/cybermoji.git
cd cybermoji

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
cybermoji/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Empty wrapper layout
│   ├── page.tsx            # Home page (redirects to /[lang])
│   ├── sitemap.ts          # SEO sitemap generation
│   ├── robots.ts           # SEO robots.txt
│   ├── globals.css         # Tailwind CSS v4 configuration
│   ├── not-found.tsx
│   └── [lang]/             # Internationalized routes
│       ├── layout.tsx      # Root layout with providers
│       ├── page.tsx        # Language home page
│       ├── blog/           # Blog pages
│       ├── privacy/
│       ├── terms/
│       └── disclaimer/
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── layout/             # Layout components
│   │   ├── header.tsx      # Site header
│   │   └── footer.tsx      # Site footer
│   └── ...
├── context/                # React context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
│   ├── config.ts           # Site configuration
│   ├── utils.ts            # Utility functions
│   └── translations/       # Internationalization files
├── public/                 # Static assets
├── biome.json              # Biome linter configuration
├── components.json         # shadcn/ui configuration
├── next.config.ts          # Next.js configuration
├── package.json
└── tsconfig.json
```

## Available Languages

Cybermoji supports the following languages:

- English (en)
- 中文 (zh)
- Français (fr)
- Español (es)
- Deutsch (de)
- 日本語 (ja)
- 한국어 (ko)
- Português (pt)
- Русский (ru)
- العربية (ar)

## Commands

```bash
# Development
pnpm dev                    # Start development server on port 3000

# Build & Production
pnpm build                  # Build for production
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # Run Biome linter (biome check)
pnpm format                 # Format code with Biome (biome format --write)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Emojibase](https://github.com/milesj/emojibase) - Emoji data library

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/SymphonyIceAttack">SymphonyIceAttack</a>
  <br /><br />
  <a href="https://cybermoji.org">Visit cybermoji.org</a>
</div>
