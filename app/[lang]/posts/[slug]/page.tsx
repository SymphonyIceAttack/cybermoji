import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleMeta } from "@/components/blog/article-meta";
import { ArticleTags } from "@/components/blog/article-tags";
import { AuthorBio } from "@/components/blog/author-bio";
import { KeyInsights } from "@/components/blog/key-insights";
import { MarkdownWithIds } from "@/components/blog/markdown-with-ids";
import { PostCTA } from "@/components/blog/post-cta";
import { RecentPosts } from "@/components/blog/recent-posts";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { BlogPostStructuredData } from "@/components/structured-data/blog-post";
import {
  BreadcrumbStructuredData,
  getBlogPostBreadcrumb,
} from "@/components/structured-data/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogSlugs, getBlogPost, getRecentPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = await getRecentPosts(slug);

  const {
    title,
    content,
    description,
    publishedAt,
    imageUrl,
    slug: postSlug,
    readTime,
    tags,
    keyPoints,
    author,
  } = post;

  return (
    <>
      <BreadcrumbStructuredData
        items={getBlogPostBreadcrumb("en", postSlug, title)}
      />
      <BlogPostStructuredData
        title={title}
        description={description || ""}
        slug={postSlug}
        publishedAt={publishedAt}
        imageUrl={imageUrl}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8 flex-col lg:flex-row">
            <article className="flex-1 min-w-0">
              {author && (
                <AuthorBio
                  name={author.name}
                  role={author.role || "Developer"}
                  bio={author.bio || ""}
                  avatar={author.avatar}
                />
              )}

              <Card className="overflow-hidden">
                {imageUrl && (
                  <div className="relative w-full h-[300px] lg:h-[400px]">
                    <Image
                      fill
                      src={imageUrl}
                      alt={title}
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                    {title}
                  </CardTitle>
                  <ArticleMeta publishedAt={publishedAt} readTime={readTime} />
                  {description && (
                    <p className="text-muted-foreground text-lg mt-3 border-l-4 border-primary/30 pl-4 italic">
                      {description}
                    </p>
                  )}
                  {tags && tags.length > 0 && <ArticleTags tags={tags} />}
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <MarkdownWithIds content={content} />
                </CardContent>
              </Card>

              {keyPoints && keyPoints.length > 0 && (
                <KeyInsights points={keyPoints} />
              )}

              <PostCTA />

              <RecentPosts posts={recentPosts} />
            </article>

            <aside className="w-full lg:w-64 shrink-0">
              <TableOfContents content={content} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      siteName: "Cybermoji",
      url: `${siteConfig.siteUrl}/en/posts/${slug}`,
      images: post.imageUrl
        ? [
            {
              url: post.imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
