"use client";

import { useEffect } from "react";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

export function MarkdownWithIds({ content }: { content: string }) {
  useEffect(() => {
    const headings = document.querySelectorAll(
      "article h1, article h2, article h3, article h4, article h5, article h6",
    );
    headings.forEach((heading) => {
      const text = heading.textContent || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      heading.id = id;
    });
  }, [content]);

  return <MarkdownRenderer content={content} />;
}
