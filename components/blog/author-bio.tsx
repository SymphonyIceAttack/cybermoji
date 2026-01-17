import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface AuthorBioProps {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
}

export function AuthorBio({ name, role, bio, avatar }: AuthorBioProps) {
  return (
    <Card className="mt-8 bg-gradient-to-br from-primary/5 via-primary/5 to-background border-2 border-primary/10">
      <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
        <div className="relative w-20 h-20 shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover rounded-full ring-4 ring-primary/20"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl text-primary-foreground font-bold shadow-lg">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-xl font-bold font-display text-foreground mb-1">
            {name}
          </h4>
          <p className="text-sm font-medium text-primary mb-2">{role}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
        </div>
      </CardContent>
    </Card>
  );
}
