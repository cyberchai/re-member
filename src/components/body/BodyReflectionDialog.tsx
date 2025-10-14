"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Loader2, Quote } from "lucide-react";
import { generateReflectionPrompts } from "@/ai/flows/personalized-reflection-prompts";
import { useToast } from "@/hooks/use-toast";
import type { BodyPart } from "@/lib/body-parts";
import { Separator } from "@/components/ui/separator";

type BodyReflectionDialogProps = {
  part: BodyPart | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BodyReflectionDialog({
  part,
  isOpen,
  onOpenChange,
}: BodyReflectionDialogProps) {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reflection, setReflection] = useState("");
  const { toast } = useToast();

  const handleGeneratePrompts = async () => {
    if (!part) return;
    setIsGenerating(true);
    setPrompts([]);
    try {
      const result = await generateReflectionPrompts({ bodyPart: part.name });
      setPrompts(result.prompts);
    } catch (error) {
      console.error("Error generating prompts:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate reflection prompts. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    // In a real application, you would save the reflection to a database (e.g., Firestore)
    console.log(`Saving reflection for ${part?.name}:`, reflection);
    toast({
      title: "Memory Saved",
      description: `Your reflection on your ${part?.name.toLowerCase()} has been noted.`,
    });
    onOpenChange(false);
  };
  
  const handleClose = (open: boolean) => {
    if (!open) {
      setPrompts([]);
      setReflection("");
    }
    onOpenChange(open);
  }

  if (!part) return null;

  const Icon = part.icon;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <Icon className="h-10 w-10 text-accent" />
            <DialogTitle className="text-2xl font-headline">
              Reflecting on your {part.name}
            </DialogTitle>
          </div>
          <DialogDescription>
            Use the space below to write down memories, feelings, or stories associated with this part of your body.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          placeholder={`What stories does your ${part.name.toLowerCase()} hold?`}
          className="min-h-[150px] text-base"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        
        <div className="space-y-4">
          <Button
            onClick={handleGeneratePrompts}
            disabled={isGenerating}
            className="w-full"
            variant="outline"
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Need some inspiration?
          </Button>

          {prompts.length > 0 && (
            <div className="space-y-3 rounded-md border bg-secondary/50 p-4">
              <h4 className="font-semibold text-sm">Reflection Prompts</h4>
              {prompts.map((prompt, index) => (
                <div key={index} className="text-sm text-muted-foreground flex gap-2 items-start">
                    <Quote className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{prompt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Separator />

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>Save Reflection</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
