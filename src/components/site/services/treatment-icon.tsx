import {
  Activity,
  Anchor,
  Baby,
  CircleDot,
  Crown,
  Droplets,
  Layers,
  Scissors,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
  type LucideIcon,
} from "lucide-react";

/** Maps the `icon` string stored on each treatment to its lucide component. */
export const treatmentIcons: Record<string, LucideIcon> = {
  Anchor,
  Activity,
  CircleDot,
  Smile,
  Sparkles,
  Layers,
  Sun,
  Baby,
  Droplets,
  Scissors,
  ShieldCheck,
  Crown,
};

export function TreatmentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = treatmentIcons[name] ?? Stethoscope;
  return <Icon className={className} aria-hidden />;
}
