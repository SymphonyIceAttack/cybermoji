import { CheckCircle, Lock, Shield, Users } from "lucide-react";

interface TrustBadgesProps {
  translations?: Record<string, string>;
}

export function TrustBadges({ translations = {} }: TrustBadgesProps) {
  const t = (key: string): string => {
    return translations[key] || key;
  };
  const commonT = (key: string) => t(`common.${key}`);

  const badges = [
    {
      icon: Shield,
      label: commonT("trust.anonymous"),
    },
    {
      icon: Lock,
      label: commonT("trust.secure"),
    },
    {
      icon: CheckCircle,
      label: commonT("trust.noLogin"),
    },
    {
      icon: Users,
      label: commonT("trust.usersTrust"),
    },
  ];

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
