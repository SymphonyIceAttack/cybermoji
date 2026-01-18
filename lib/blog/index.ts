import { readItems } from "@directus/sdk";
import directus, { type Post } from "@/lib/directus";

const IMAGE_CDN = "https://image.cybermoji.org";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  content: string;
  imageUrl?: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
    role?: string;
  };
  readTime?: string;
  tags?: string[];
  keyPoints?: string[];
  category?: string;
}

function transformPost(post: Post): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.published_at,
    content: post.content,
    imageUrl: post.imageurl ? `${IMAGE_CDN}/${post.imageurl}` : undefined,
    author: post.author
      ? {
          name: post.author,
        }
      : undefined,
    readTime: post.read_time ? `${post.read_time} min read` : undefined,
    tags:
      typeof post.tags === "string" && post.tags.trim()
        ? post.tags.split(",").map((tag) => tag.trim())
        : undefined,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await directus.request(
    readItems("posts", {
      filter: {
        status: { _eq: "published" },
      },
      sort: ["-published_at"],
    }),
  );
  return posts.map(transformPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await directus.request(
    readItems("posts", {
      filter: {
        _and: [{ status: { _eq: "published" } }, { slug: { _eq: slug } }],
      },
      limit: 1,
    }),
  );

  if (posts.length === 0) {
    return null;
  }

  return transformPost(posts[0]);
}

export async function getRecentPosts(
  currentSlug: string,
  limit: number = 6,
): Promise<BlogPost[]> {
  const posts = await directus.request(
    readItems("posts", {
      filter: {
        _and: [
          { status: { _eq: "published" } },
          { slug: { _neq: currentSlug } },
        ],
      },
      sort: ["-published_at"],
      limit,
    }),
  );

  return posts.map(transformPost);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await directus.request(
    readItems("posts", {
      filter: {
        status: { _eq: "published" },
      },
      fields: ["slug"],
    }),
  );

  return posts.map((post) => post.slug);
}

export interface BlogPostForSitemap {
  slug: string;
  publishedAt: string;
}

export async function getBlogPostsForSitemap(): Promise<BlogPostForSitemap[]> {
  const posts = await directus.request(
    readItems("posts", {
      filter: {
        status: { _eq: "published" },
      },
      fields: ["slug", "published_at"],
      sort: ["-published_at"],
    }),
  );

  return posts.map((post) => ({
    slug: post.slug,
    publishedAt: post.published_at,
  }));
}
