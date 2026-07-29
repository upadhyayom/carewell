import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-600/15",
        secondary: "bg-ink-50 text-ink-700 ring-1 ring-inset ring-ink-900/8",
        outline: "text-ink-700 ring-1 ring-inset ring-ink-200",
        good: "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/15",
        warning: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20",
        serious: "bg-orange-50 text-orange-800 ring-1 ring-inset ring-orange-600/20",
        critical: "bg-red-50 text-red-800 ring-1 ring-inset ring-red-600/15",
        blue: "bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-600/15",
        violet: "bg-violet-50 text-violet-800 ring-1 ring-inset ring-violet-600/15",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
