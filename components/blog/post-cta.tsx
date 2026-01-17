import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function PostCTA() {
  return (
    <Card className="mt-12 border-2 border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl shadow-sm">
      <CardContent className="py-12 px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
          ✨ Explore Our Emoji Collection
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Discover and copy thousands of emojis for social media, messaging, and
          creative projects. 100% free, instant copy, no login required.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
        >
          Browse Emojis Now →
        </Link>
      </CardContent>
    </Card>
  );
}
