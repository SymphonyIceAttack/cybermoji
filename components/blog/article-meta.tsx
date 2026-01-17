import { Calendar, Clock } from "lucide-react";

interface ArticleMetaProps {
  publishedAt: string;
  readTime?: string;
}

export function ArticleMeta({ publishedAt, readTime }: ArticleMetaProps) {
  const date = new Date(publishedAt);

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4" />
        <time dateTime={publishedAt}>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      {readTime && (
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{readTime}</span>
        </div>
      )}
    </div>
  );
}
