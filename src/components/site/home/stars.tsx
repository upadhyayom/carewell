import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating = 5,
  className,
  starClassName,
}: {
  rating?: number;
  className?: string;
  starClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-ink-200 text-ink-200",
            starClassName
          )}
        />
      ))}
    </div>
  );
}
