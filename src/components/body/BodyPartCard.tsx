import { Card, CardContent } from "@/components/ui/card";
import type { BodyPart } from "@/lib/body-parts";

type BodyPartCardProps = {
  part: BodyPart;
  onClick: () => void;
};

export function BodyPartCard({ part, onClick }: BodyPartCardProps) {
  const Icon = part.icon;
  return (
    <Card
      className="group transform-gpu cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <Icon className="h-12 w-12 mb-4 text-muted-foreground transition-colors group-hover:text-accent" />
        <h3 className="font-headline text-lg font-semibold">{part.name}</h3>
      </CardContent>
    </Card>
  );
}
