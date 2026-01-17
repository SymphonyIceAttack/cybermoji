import { Tag } from "lucide-react";

interface ArticleTagsProps {
  tags: string[];
}

export function ArticleTags({ tags }: ArticleTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-6">
      <Tag className="w-4 h-4 text-muted-foreground" />
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
