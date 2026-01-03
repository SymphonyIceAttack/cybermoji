import { CheckCircle, Lock, Shield, Users } from "lucide-react";

const badges = [
  {
    icon: Shield,
    label: "100% Anonymous",
  },
  {
    icon: Lock,
    label: "Secure & Encrypted",
  },
  {
    icon: CheckCircle,
    label: "No Login Required",
  },
  {
    icon: Users,
    label: "1M+ Users Trust Us",
  },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-8">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <badge.icon className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
