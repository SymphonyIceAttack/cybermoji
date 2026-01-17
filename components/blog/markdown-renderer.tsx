"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * 通用 Markdown 渲染器组件
 * 使用 react-markdown，兼容 Edge/Cloudflare 环境
 */
export function MarkdownRenderer({
  content,
  className = "prose prose-lg max-w-none dark:prose-invert",
}: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
}
