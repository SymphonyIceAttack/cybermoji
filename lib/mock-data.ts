// Mock Instagram data for demo functionality
export interface InstagramProfile {
  username: string;
  fullName: string;
  bio: string;
  profilePic: string;
  followers: string;
  following: string;
  posts: string;
  isVerified: boolean;
  isPrivate: boolean;
}

export interface InstagramPost {
  id: string;
  type: "image" | "video" | "reel";
  thumbnail: string;
  likes: string;
  comments: string;
  caption: string;
  date: string;
}

export interface InstagramStory {
  id: string;
  type: "image" | "video";
  thumbnail: string;
  timestamp: string;
}

export interface InstagramHighlight {
  id: string;
  title: string;
  cover: string;
  itemCount: number;
}

export const mockProfiles: Record<string, InstagramProfile> = {
  travel_adventures: {
    username: "travel_adventures",
    fullName: "Travel Adventures",
    bio: "Exploring the world one destination at a time. Photography & Travel Tips. Book your next adventure with us!",
    profilePic: "/travel-blogger-avatar-portrait.jpg",
    followers: "125K",
    following: "892",
    posts: "1,247",
    isVerified: true,
    isPrivate: false,
  },
  foodie_paradise: {
    username: "foodie_paradise",
    fullName: "Foodie Paradise",
    bio: "Food blogger | Recipe developer | Restaurant reviews. Making your taste buds happy since 2018!",
    profilePic: "/food-blogger-chef-avatar.jpg",
    followers: "89.5K",
    following: "456",
    posts: "2,103",
    isVerified: false,
    isPrivate: false,
  },
  fitness_journey: {
    username: "fitness_journey",
    fullName: "Fitness Journey",
    bio: "Personal Trainer | Nutrition Coach. Transform your body, transform your life. DM for coaching!",
    profilePic: "/fitness-trainer-avatar-portrait.jpg",
    followers: "234K",
    following: "1,203",
    posts: "567",
    isVerified: true,
    isPrivate: false,
  },
  tech_reviews: {
    username: "tech_reviews",
    fullName: "Tech Reviews Daily",
    bio: "Latest gadgets & honest reviews. Helping you make smart tech decisions. New video every Tuesday!",
    profilePic: "/tech-reviewer-avatar-portrait.jpg",
    followers: "567K",
    following: "234",
    posts: "890",
    isVerified: true,
    isPrivate: false,
  },
};

export function getMockPosts(username: string): InstagramPost[] {
  const postTypes: Array<"image" | "video" | "reel"> = [
    "image",
    "image",
    "video",
    "reel",
    "image",
    "reel",
    "image",
    "reel",
    "video",
  ];
  const queries: Record<string, string[]> = {
    travel_adventures: [
      "beach sunset tropical vacation",
      "mountain hiking adventure landscape",
      "city skyline night lights",
      "tropical resort pool paradise",
      "ancient temple travel asia",
      "safari wildlife africa",
      "european street cafe",
      "underwater diving coral reef",
      "northern lights aurora",
    ],
    foodie_paradise: [
      "gourmet pasta italian dish",
      "sushi platter japanese food",
      "chocolate dessert cake bakery",
      "breakfast avocado toast eggs",
      "pizza restaurant wood fired",
      "coffee latte art barista",
      "fresh salad healthy meal",
      "burger gourmet restaurant",
      "wine cheese platter",
    ],
    fitness_journey: [
      "gym workout weights lifting",
      "yoga pose fitness studio",
      "running outdoor exercise trail",
      "healthy meal prep containers",
      "stretching exercise flexibility",
      "protein shake gym smoothie",
      "crossfit training workout",
      "swimming pool exercise",
      "boxing fitness training",
    ],
    tech_reviews: [
      "smartphone technology review",
      "laptop computer workspace",
      "gaming setup desk rgb",
      "wireless earbuds headphones",
      "smartwatch wearable tech",
      "drone aerial photography",
      "camera photography equipment",
      "keyboard mechanical gaming",
      "monitor ultrawide setup",
    ],
  };

  const profileQueries = queries[username] || queries.travel_adventures;

  return postTypes.map((type, index) => ({
    id: `post-${index + 1}`,
    type,
    thumbnail: `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(profileQueries[index % profileQueries.length])}`,
    likes: `${Math.floor(Math.random() * 50 + 5)}K`,
    comments: `${Math.floor(Math.random() * 500 + 50)}`,
    caption: `Amazing content from ${username}! #instagram #content`,
    date: `${Math.floor(Math.random() * 7 + 1)}d ago`,
  }));
}

export function getMockStories(username: string): InstagramStory[] {
  const queries: Record<string, string[]> = {
    travel_adventures: [
      "airplane window view clouds",
      "hotel room luxury interior",
      "street food market asia",
      "beach waves sunset",
      "hiking trail mountain",
    ],
    foodie_paradise: [
      "cooking kitchen chef",
      "restaurant interior dining",
      "grocery shopping fresh",
      "baking cookies dessert",
      "coffee morning cafe",
    ],
    fitness_journey: [
      "morning workout sunrise",
      "gym mirror selfie",
      "healthy smoothie green",
      "yoga mat meditation",
      "running shoes trail",
    ],
    tech_reviews: [
      "unboxing tech gadget",
      "desk setup workspace",
      "coding screen laptop",
      "gaming night rgb",
      "camera equipment studio",
    ],
  };

  const profileQueries = queries[username] || queries.travel_adventures;

  return profileQueries.map((query, index) => ({
    id: `story-${index + 1}`,
    type: index === 1 || index === 3 ? "video" : "image",
    thumbnail: `/placeholder.svg?height=400&width=225&query=${encodeURIComponent(query)}`,
    timestamp: `${Math.floor(Math.random() * 12 + 1)}h ago`,
  }));
}

export function getMockHighlights(username: string): InstagramHighlight[] {
  const highlights: Record<string, string[]> = {
    travel_adventures: [
      "Europe 2024",
      "Asia Trip",
      "Beach Days",
      "Mountains",
      "City Life",
    ],
    foodie_paradise: [
      "Recipes",
      "Reviews",
      "Tutorials",
      "Best Eats",
      "Desserts",
    ],
    fitness_journey: [
      "Workouts",
      "Nutrition",
      "Progress",
      "Tips",
      "Motivation",
    ],
    tech_reviews: ["Reviews", "Unboxing", "Tutorials", "Gaming", "Setup"],
  };

  const highlightQueries: Record<string, string[]> = {
    travel_adventures: [
      "europe travel landmark",
      "asia temple travel",
      "beach ocean waves",
      "mountain peak snow",
      "city buildings urban",
    ],
    foodie_paradise: [
      "recipe cooking book",
      "restaurant review food",
      "cooking tutorial chef",
      "food plate gourmet",
      "dessert sweet cake",
    ],
    fitness_journey: [
      "workout exercise gym",
      "healthy food nutrition",
      "fitness progress body",
      "fitness tips training",
      "motivation fitness",
    ],
    tech_reviews: [
      "tech review gadget",
      "unboxing box package",
      "tutorial screen",
      "gaming controller",
      "desk setup minimal",
    ],
  };

  const profileHighlights =
    highlights[username] || highlights.travel_adventures;
  const profileHighlightQueries =
    highlightQueries[username] || highlightQueries.travel_adventures;

  return profileHighlights.map((title, index) => ({
    id: `highlight-${index + 1}`,
    title,
    cover: `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(profileHighlightQueries[index])}`,
    itemCount: Math.floor(Math.random() * 20 + 5),
  }));
}

// Search function that simulates API delay
export async function searchProfile(
  username: string,
): Promise<InstagramProfile | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Normalize username
  const normalizedUsername = username.toLowerCase().replace(/^@/, "").trim();

  // Check if we have a mock profile
  if (mockProfiles[normalizedUsername]) {
    return mockProfiles[normalizedUsername];
  }

  // For any other username, generate a random profile
  if (normalizedUsername.length >= 3) {
    return {
      username: normalizedUsername,
      fullName: normalizedUsername
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      bio: "Welcome to my Instagram! Follow for amazing content and updates.",
      profilePic: `/placeholder.svg?height=150&width=150&query=${encodeURIComponent(`${normalizedUsername} profile avatar`)}`,
      followers: `${Math.floor(Math.random() * 100 + 10)}K`,
      following: `${Math.floor(Math.random() * 1000 + 100)}`,
      posts: `${Math.floor(Math.random() * 500 + 50)}`,
      isVerified: Math.random() > 0.7,
      isPrivate: false,
    };
  }

  return null;
}
