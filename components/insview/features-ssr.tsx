import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Eye,
  Globe,
  ImageIcon,
  Lock,
  Play,
  Shield,
  Smartphone,
  Star,
  User,
  Zap,
} from "lucide-react";

const mainFeatures = [
  {
    id: "profiles",
    icon: User,
    title: "Profile Viewing",
    subtitle: "Browse any public profile anonymously",
    description:
      "View complete Instagram profiles including bio, profile picture, post count, followers, and following.",
    benefits: [
      "View full profile information",
      "See post, follower, and following counts",
      "Download profile pictures in HD",
      "100% anonymous browsing",
    ],
    image: "/images/instagram-profile-viewer-interface.jpg",
  },
  {
    id: "stories",
    icon: Play,
    title: "Story Viewing",
    subtitle: "Watch stories without being seen",
    description:
      "Watch Instagram stories anonymously - no login required, no views counted.",
    benefits: [
      "Watch stories anonymously",
      "No view count added",
      "Download before expiry",
      "Support for photo & video stories",
    ],
    image: "/images/instagram-story-viewer-dark-interface.jpg",
  },
  {
    id: "reels",
    icon: Star,
    title: "Reels Download",
    subtitle: "Save reels in high quality",
    description:
      "Download Instagram Reels in original quality. Save entertaining videos for offline viewing.",
    benefits: [
      "Download in original quality",
      "Fast download speeds",
      "No watermarks added",
      "Save for offline viewing",
    ],
    image: "/images/instagram-reels-download-interface.jpg",
  },
  {
    id: "highlights",
    icon: Eye,
    title: "Highlights Browser",
    subtitle: "Explore saved story collections",
    description:
      "Browse Instagram Highlights - the curated story collections that users save to their profiles.",
    benefits: [
      "Browse all highlight albums",
      "View individual highlight stories",
      "Download highlight content",
      "Access archived stories",
    ],
    image: "/images/instagram-highlights-collection-view.jpg",
  },
  {
    id: "posts",
    icon: ImageIcon,
    title: "Post Viewer & Downloader",
    subtitle: "View and save photos & videos",
    description:
      "Browse all posts from any public Instagram account. View photos, videos, and carousels in full resolution.",
    benefits: [
      "View all public posts",
      "Download photos in HD",
      "Save videos in original quality",
      "Support for carousel posts",
    ],
    image: "/images/instagram-post-gallery-grid-view.jpg",
  },
];

const additionalFeatures = [
  {
    icon: Shield,
    title: "Complete Privacy",
    description:
      "Your identity is never revealed. No login, no cookies tracking your activity.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized servers deliver content in seconds. No waiting, instant results.",
  },
  {
    icon: Globe,
    title: "Works Worldwide",
    description: "Access from any country. No geo-restrictions or VPN needed.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "24/7 uptime. Our service is always ready when you need it.",
  },
  {
    icon: Lock,
    title: "Secure Connection",
    description: "All data transmitted over encrypted HTTPS connections.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Fully responsive design works perfectly on all devices.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge className="badge-cyber mb-6">Capabilities</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">Complete Control</span>
            <br />
            <span className="text-foreground/80">Over Your Visibility</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Every tool you need for private Instagram browsing, engineered for
            maximum stealth and performance.
          </p>
        </div>

        <div className="space-y-32">
          {mainFeatures.map((feature, idx) => (
            <div
              key={feature.id}
              id={feature.id}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${idx % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
            >
              {/* Image card with tech border */}
              <div className="flex-1 w-full">
                <div className="tech-border p-2 rounded-xl">
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50" />
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="w-full h-auto relative z-10"
                    />
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <Badge
                      variant="secondary"
                      className="text-xs mb-1 bg-primary/10 text-primary border-primary/20"
                    >
                      {feature.subtitle}
                    </Badge>
                    <h3 className="text-3xl font-display font-bold">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm font-mono">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="badge-cyber mb-6">Advantages</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">Beyond Ordinary</span>
            <br />
            <span className="text-foreground/80">
              Surveillance-Proof Design
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Engineered for those who demand absolute privacy without
            compromising on speed or functionality.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {additionalFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="card-cyber p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
