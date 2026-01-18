"use client";

import { StreamdownRenderer } from "@/components/blog/streamdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * 通用 Markdown 渲染器组件
 * 使用自定义 StreamdownRenderer，提供统一的 Markdown 渲染配置
 */
export function MarkdownRenderer({
  content,
  className = "prose prose-lg max-w-none dark:prose-invert",
}: MarkdownRendererProps) {
  return (
    <div className={className}>
      <StreamdownRenderer content={content} />
    </div>
  );
}
