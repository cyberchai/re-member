import type { ComponentType } from "react";
import {
  Brain,
  Circle,
  Ear,
  Eye,
  Hand,
  Heart,
  HelpCircle,
  Footprints,
  Lungs,
  Speech,
  Sparkles,
  Wind,
} from "lucide-react";

export type BodyPart = {
  name: string;
  category: "External" | "Internal/Organs";
  icon: ComponentType<{ className?: string }>;
};

// A placeholder for body parts without a direct icon
const BodyPlaceholderIcon = Circle;

export const bodyParts: BodyPart[] = [
  // External
  { name: "Head", category: "External", icon: HelpCircle },
  { name: "Face", category: "External", icon: Sparkles },
  { name: "Eyes", category: "External", icon: Eye },
  { name: "Nose", category: "External", icon: BodyPlaceholderIcon },
  { name: "Ears", category: "External", icon: Ear },
  { name: "Mouth", category: "External", icon: Speech },
  { name: "Neck", category: "External", icon: BodyPlaceholderIcon },
  { name: "Chest", category: "External", icon: BodyPlaceholderIcon },
  { name: "Arms", category: "External", icon: BodyPlaceholderIcon },
  { name: "Hands", category: "External", icon: Hand },
  { name: "Legs", category: "External", icon: BodyPlaceholderIcon },
  { name: "Feet", category: "External", icon: Footprints },
  { name: "Skin", category: "External", icon: BodyPlaceholderIcon },

  // Internal/Organs
  { name: "Heart", category: "Internal/Organs", icon: Heart },
  { name: "Brain", category: "Internal/Organs", icon: Brain },
  { name: "Lungs", category: "Internal/Organs", icon: Wind },
  { name: "Liver", category: "Internal/Organs", icon: BodyPlaceholderIcon },
  { name: "Kidneys", category: "Internal/Organs", icon: BodyPlaceholderIcon }, // lucide-react doesn't have a kidney icon
  { name: "Stomach", category: "Internal/Organs", icon: BodyPlaceholderIcon },
  { name: "Uterus", category: "Internal/Organs", icon: BodyPlaceholderIcon },
  { name: "Ovaries", category: "Internal/Organs", icon: BodyPlaceholderIcon },
  { name: "Testes", category: "Internal/Organs", icon: BodyPlaceholderIcon },
];
