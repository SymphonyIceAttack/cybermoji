import { type NextRequest, NextResponse } from "next/server";

interface InstagramUser {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
  biography: string;
  followers: string;
  follows: string;
  media_count: number;
  is_verified: boolean;
  is_private: boolean;
}

interface InstagramPost {
  id: string;
  caption: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  thumbnail_url?: string;
}

interface InstagramApiResponse {
  user: InstagramUser;
  posts: InstagramPost[];
  stories: InstagramPost[];
}

const INSTAGRAM_API_URL = "https://www.instagram.com";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { username } = await params;
    const normalizedUsername = username.toLowerCase().replace(/^@/, "").trim();

    if (normalizedUsername.length < 1) {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }

    // Fetch user data from Instagram's public endpoint
    const userResponse = await fetch(
      `${INSTAGRAM_API_URL}/${normalizedUsername}/?__a=1&__d=dis`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!userResponse.ok) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await userResponse.json();

    if (!data.graphql || !data.graphql.user) {
      return NextResponse.json(
        { error: "Invalid response from Instagram" },
        { status: 500 },
      );
    }

    const user = data.graphql.user;

    // Transform to our format
    const instagramUser: InstagramUser = {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      profile_pic_url: user.profile_pic_url_hd || user.profile_pic_url,
      biography: user.biography,
      followers: formatNumber(user.edge_followed_by.count),
      follows: formatNumber(user.edge_follow.count),
      media_count: user.edge_owner_media_timeline.count,
      is_verified: user.is_verified,
      is_private: user.is_private,
    };

    // Fetch posts
    const posts: InstagramPost[] = [];
    const timeline = user.edge_owner_media_timeline?.edges || [];

    for (const edge of timeline.slice(0, 12)) {
      const node = edge.node;
      posts.push({
        id: node.id,
        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || "",
        media_type: node.__typename,
        media_url: node.display_url,
        permalink: `https://instagram.com/p/${node.shortcode}`,
        timestamp: node.taken_at_timestamp,
        like_count: node.edge_liked_by?.count || 0,
        comments_count: node.edge_media_to_comment?.count || 0,
        thumbnail_url:
          node.__typename === "GraphVideo" ? node.thumbnail_src : undefined,
      });
    }

    const response: InstagramApiResponse = {
      user: instagramUser,
      posts,
      stories: [],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Instagram API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Instagram data" },
      { status: 500 },
    );
  }
}

function formatNumber(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
