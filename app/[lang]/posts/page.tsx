import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogSlugs, getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Cybermoji",
  description: "Explore our latest articles and updates about Unicode emojis",
};
export const revalidate = 84600;
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map(() => ({ lang: "en" }));
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our latest articles and updates about Unicode emojis
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/en/posts/${post.slug}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 overflow-hidden">
                {post.imageUrl && (
                  <div className="relative w-full h-48">
                    <Image
                      fill
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 text-sm">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center text-primary text-sm font-medium mt-3 group-hover:underline">
                    Read More
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
