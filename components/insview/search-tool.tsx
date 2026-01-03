"use client";

import {
  Clock,
  Download,
  Eye,
  Heart,
  ImageIcon,
  Loader2,
  MessageCircle,
  Play,
  Search,
  Shield,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getMockHighlights,
  getMockPosts,
  getMockStories,
  searchProfile,
  type InstagramHighlight,
  type InstagramPost,
  type InstagramProfile,
  type InstagramStory,
} from "@/lib/mock-data";

interface InstagramApiResponse {
  user: {
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
  };
  posts: {
    id: string;
    caption: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    permalink: string;
    timestamp: string;
    like_count: number;
    comments_count: number;
    thumbnail_url?: string;
  }[];
  stories: InstagramStory[];
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function useInstagramData(username: string | null) {
  return useQuery({
    queryKey: ["instagram", username],
    queryFn: async (): Promise<{
      data: InstagramApiResponse;
      source: "api" | "mock";
    } | null> => {
      if (!username) return null;

      const normalizedUsername = username.toLowerCase().replace(/^@/, "").trim();

      try {
        // Try to fetch from real API
        const response = await fetch(`/api/instagram/${normalizedUsername}`);

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        return { data, source: "api" };
      } catch {
        // Fallback to mock data
        console.log("Real API failed, using mock data");
        const mockProfile = await searchProfile(normalizedUsername);

        if (!mockProfile) {
          throw new Error("User not found");
        }

        // Convert mock data to API format
        const mockData: InstagramApiResponse = {
          user: {
            id: "mock-id",
            username: mockProfile.username,
            full_name: mockProfile.fullName,
            profile_pic_url: mockProfile.profilePic,
            biography: mockProfile.bio,
            followers: mockProfile.followers,
            follows: mockProfile.following,
            media_count: parseInt(mockProfile.posts.replace(/,/g, "")) || 0,
            is_verified: mockProfile.isVerified,
            is_private: mockProfile.isPrivate,
          },
          posts: getMockPosts(normalizedUsername).map((post) => ({
            id: post.id,
            caption: post.caption,
            media_type: post.type === "video" ? "VIDEO" : post.type === "reel" ? "CAROUSEL_ALBUM" : "IMAGE",
            media_url: post.thumbnail,
            permalink: post.permalink || "",
            timestamp: Date.now().toString(),
            like_count: parseInt(post.likes.replace(/K|M/g, "")) * 1000 || 0,
            comments_count: parseInt(post.comments) || 0,
            thumbnail_url: post.thumbnail,
          })),
          stories: getMockStories(normalizedUsername),
        };

        return { data: mockData, source: "mock" };
      }
    },
    enabled: !!username && username.length >= 1,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function SearchTool() {
  const [username, setUsername] = useState("");

  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useInstagramData(username);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      refetch();
    }
  };

  const handleDownload = (item: InstagramPost | InstagramStory) => {
    alert(
      `Downloading ${item.type}... (This would download the actual file)`,
    );
  };

  // Transform API response to our format
  const profile: InstagramProfile | null = queryData
    ? {
        username: queryData.data.user.username,
        fullName: queryData.data.user.full_name,
        bio: queryData.data.user.biography,
        profilePic: queryData.data.user.profile_pic_url,
        followers: queryData.data.user.followers,
        following: queryData.data.user.follows,
        posts: queryData.data.user.media_count.toString(),
        isVerified: queryData.data.user.is_verified,
        isPrivate: queryData.data.user.is_private,
      }
    : null;

  const posts: InstagramPost[] = queryData?.data.posts.map((post) => ({
    id: post.id,
    type: post.media_type === "VIDEO" ? "video" : post.media_type === "CAROUSEL_ALBUM" ? "reel" : "image",
    thumbnail: post.thumbnail_url || post.media_url,
    likes: formatNumber(post.like_count),
    comments: formatNumber(post.comments_count),
    caption: post.caption,
    date: formatDate(parseInt(post.timestamp)),
    permalink: post.permalink,
  })) || [];

  const stories: InstagramStory[] = queryData?.data.stories || [];

  // Generate highlights from posts
  const highlights: InstagramHighlight[] = queryData?.source === "api"
    ? posts.slice(0, 5).map((post, index) => ({
        id: `highlight-${index}`,
        title: `Highlight ${index + 1}`,
        cover: post.thumbnail,
        itemCount: Math.floor(Math.random() * 10 + 1),
      }))
    : getMockHighlights(queryData?.data.user.username || "travel_adventures");

  return (
    <div id="search" className="w-full space-y-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            placeholder="Enter target username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-cyber pl-12 h-12 text-base"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="btn-cyber h-12 px-8"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Eye className="mr-2 h-5 w-5" />
              Access
            </>
          )}
        </Button>
      </form>

      {error && username.length >= 1 && (
        <p className="text-sm text-destructive font-mono">
          {error instanceof Error ? error.message : "An error occurred"}
        </p>
      )}

      {/* Quick access tags */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Quick Access:
        </span>
        {[
          "travel_adventures",
          "foodie_paradise",
          "fitness_journey",
          "tech_reviews",
        ].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setUsername(suggestion)}
            className="text-xs font-mono px-3 py-1 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all rounded-full"
          >
            @{suggestion}
          </button>
        ))}
      </div>

      {/* Results */}
      {profile && (
        <div className="space-y-8 animate-fade-in-up">
          {/* Profile Header */}
          <Card className="card-cyber overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                {/* Profile pic with tech border */}
                <div className="relative">
                  <div className="tech-border p-1 rounded-full">
                    <div className="relative">
                      <img
                        src={profile.profilePic || "/placeholder.svg"}
                        alt={profile.fullName}
                        className="h-28 w-28 rounded-full border-2 border-primary/30 object-cover"
                      />
                      <div className="absolute inset-0 rounded-full border border-primary/20" />
                    </div>
                  </div>
                  {stories.length > 0 && (
                    <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                      <Play className="h-4 w-4 text-primary-foreground fill-current" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                    <h2 className="text-2xl font-display font-bold">
                      @{profile.username}
                    </h2>
                    {profile.isVerified && (
                      <Badge className="badge-cyber text-xs">Verified</Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground mb-3">
                    {profile.fullName}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md mb-4">
                    {profile.bio}
                  </p>

                  <div className="flex justify-center sm:justify-start gap-8">
                    <div className="text-center">
                      <p className="font-display font-bold text-xl">
                        {profile.posts}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        Posts
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-display font-bold text-xl">
                        {profile.followers}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        Followers
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-display font-bold text-xl">
                        {profile.following}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        Following
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="gap-2 border-primary/30 text-primary"
                  >
                    <Shield className="h-3 w-3" />
                    Stealth Mode
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-12 bg-card/50 border border-primary/20">
              <TabsTrigger
                value="posts"
                className="gap-2 font-mono text-xs uppercase tracking-wider"
              >
                <ImageIcon className="h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="stories"
                className="gap-2 font-mono text-xs uppercase tracking-wider"
              >
                <Play className="h-4 w-4" />
                Stories
              </TabsTrigger>
              <TabsTrigger
                value="reels"
                className="gap-2 font-mono text-xs uppercase tracking-wider"
              >
                <Play className="h-4 w-4" />
                Reels
              </TabsTrigger>
              <TabsTrigger
                value="highlights"
                className="gap-2 font-mono text-xs uppercase tracking-wider"
              >
                <Clock className="h-4 w-4" />
                Archive
              </TabsTrigger>
            </TabsList>

            {/* Posts Tab */}
            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {posts
                  .filter((p) => p.type !== "reel")
                  .map((post) => (
                    <Card
                      key={post.id}
                      className="card-cyber group overflow-hidden"
                    >
                      <div className="relative aspect-square">
                        <img
                          src={post.thumbnail || "/placeholder.svg"}
                          alt="Post"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-4 p-4">
                          <div className="flex items-center gap-1 text-foreground">
                            <Heart className="h-5 w-5 fill-current" />
                            <span className="text-sm font-mono font-medium">
                              {post.likes}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-foreground">
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-sm font-mono font-medium">
                              {post.comments}
                            </span>
                          </div>
                        </div>
                        {post.type === "video" && (
                          <div className="absolute top-3 right-3">
                            <Play className="h-6 w-6 text-foreground drop-shadow-lg" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-mono px-2 py-1 bg-background/50 backdrop-blur-sm rounded text-foreground">
                            {post.date}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-xs font-mono text-muted-foreground">
                          {post.type}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 hover:bg-primary/10"
                          onClick={() => handleDownload(post)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Stories Tab */}
            <TabsContent value="stories" className="mt-6">
              {stories.length > 0 ? (
                <div className="flex gap-6 overflow-x-auto pb-4">
                  {stories.map((story) => (
                    <Card
                      key={story.id}
                      className="flex-shrink-0 card-cyber overflow-hidden"
                    >
                      <div className="relative w-36">
                        <div className="aspect-[9/16]">
                          <img
                            src={story.thumbnail || "/placeholder.svg"}
                            alt="Story"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/70" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-xs font-mono text-foreground">
                            {story.timestamp}
                          </span>
                          {story.type === "video" && (
                            <Play className="h-5 w-5 text-foreground" />
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-3 right-3 h-8 w-8 p-0 bg-primary/20 border border-primary/30 hover:bg-primary/30"
                          onClick={() => handleDownload(story)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <div className="absolute top-3 left-3">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="card-cyber">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground font-mono">
                      No active stories detected
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Reels Tab */}
            <TabsContent value="reels" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {posts
                  .filter((p) => p.type === "reel")
                  .map((reel) => (
                    <Card
                      key={reel.id}
                      className="card-cyber group overflow-hidden"
                    >
                      <div className="relative aspect-[9/16]">
                        <img
                          src={reel.thumbnail || "/placeholder.svg"}
                          alt="Reel"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/60" />
                        <div className="absolute top-4 right-4">
                          <Play className="h-8 w-8 text-foreground drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-foreground">
                            <Play className="h-4 w-4 fill-current" />
                            <span className="text-sm font-mono">
                              {reel.likes}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 px-3 bg-primary/20 border border-primary/30 hover:bg-primary/30"
                            onClick={() => handleDownload(reel)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            <span className="text-xs font-mono">Save</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Highlights Tab */}
            <TabsContent value="highlights" className="mt-6">
              <div className="flex gap-8 overflow-x-auto pb-4">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="flex flex-col items-center gap-3 flex-shrink-0 group"
                  >
                    <div className="h-24 w-24 rounded-full p-1 bg-primary/10 border border-primary/30 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-300">
                      <img
                        src={highlight.cover || "/placeholder.svg"}
                        alt={highlight.title}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-mono font-medium max-w-[96px] truncate text-center">
                      {highlight.title}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {highlight.itemCount} items
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
