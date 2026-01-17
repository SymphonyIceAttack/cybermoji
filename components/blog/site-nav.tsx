import Link from "next/link";
import { BlogThemeToggle } from "./blog-theme-toggle";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-gray-500 dark:border-gray-400 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          Fancy Text Generator
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all font-bold"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="px-4 py-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-all font-bold"
          >
            Blog
          </Link>
          <BlogThemeToggle />
        </div>
      </div>
    </nav>
  );
}
