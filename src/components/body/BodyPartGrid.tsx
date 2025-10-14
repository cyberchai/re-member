"use client";

import { useState } from "react";
import { bodyParts, type BodyPart } from "@/lib/body-parts";
import { BodyPartCard } from "./BodyPartCard";
import { BodyReflectionDialog } from "./BodyReflectionDialog";

export default function BodyPartGrid() {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePartClick = (part: BodyPart) => {
    setSelectedPart(part);
    setIsDialogOpen(true);
  };

  const externalParts = bodyParts.filter(p => p.category === "External");
  const internalParts = bodyParts.filter(p => p.category === "Internal/Organs");

  return (
    <>
      <div className="space-y-12">
        <div>
          <h3 className="font-headline text-2xl mb-4 pl-2">External</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {externalParts.map((part) => (
              <BodyPartCard key={part.name} part={part} onClick={() => handlePartClick(part)} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-headline text-2xl mb-4 pl-2">Internal & Organs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {internalParts.map((part) => (
              <BodyPartCard key={part.name} part={part} onClick={() => handlePartClick(part)} />
            ))}
          </div>
        </div>
      </div>
      <BodyReflectionDialog
        part={selectedPart}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
