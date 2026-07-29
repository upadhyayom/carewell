import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** A stylized split "smile" — warm/dull for before, bright for after. */
function SmileGraphic({ variant }: { variant: "before" | "after" }) {
  const dull = variant === "before";
  return (
    <svg viewBox="0 0 120 72" fill="none" className="absolute inset-x-0 bottom-0 mx-auto h-16 w-auto" aria-hidden>
      {/* smile arc */}
      <path
        d="M14 18c10 26 26 40 46 40s36-14 46-40"
        stroke={dull ? "#a8a29e" : "#0d9488"}
        strokeWidth={dull ? 4 : 5}
        strokeLinecap="round"
        strokeDasharray={dull ? "7 6" : undefined}
        opacity={dull ? 0.7 : 0.9}
      />
      {/* teeth ticks */}
      {[32, 46, 60, 74, 88].map((x, i) => (
        <rect
          key={x}
          x={x - 3}
          y={dull ? 40 - Math.abs(i - 2) * 5 + (i % 2) * 3 : 42 - Math.abs(i - 2) * 5}
          width={6}
          height={dull ? 8 : 10}
          rx={2.5}
          fill={dull ? "#d6d3d1" : "#ffffff"}
          stroke={dull ? "#a8a29e" : "#99f6e4"}
          strokeWidth={1}
        />
      ))}
      {!dull && (
        <path
          d="M100 10l2.2 5 5 2.2-5 2.2-2.2 5-2.2-5-5-2.2 5-2.2 2.2-5Z"
          fill="#2dd4bf"
          opacity={0.9}
        />
      )}
    </svg>
  );
}

export function BeforeAfterCard({
  label,
  note,
  treatment,
  className,
}: {
  label: string;
  note: string;
  treatment?: string;
  className?: string;
}) {
  return (
    <article className={cn("group overflow-hidden rounded-2xl bg-white ring-hairline shadow-soft transition-shadow hover:shadow-lift", className)}>
      <div className="relative flex h-36">
        {/* Before half — warm, dull */}
        <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-stone-200 via-amber-100/80 to-stone-300">
          <div className="absolute inset-0 bg-dots opacity-40" />
          <span className="absolute left-3 top-3 rounded-full bg-white/75 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            Before
          </span>
          <SmileGraphic variant="before" />
        </div>
        {/* After half — bright */}
        <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-brand-100 via-white to-sky-100">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <span className="absolute right-3 top-3 rounded-full bg-brand-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            After
          </span>
          <SmileGraphic variant="after" />
        </div>
        {/* Center divider chip */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="flex size-8 items-center justify-center rounded-full bg-white text-brand-700 shadow-soft ring-hairline transition-transform duration-300 group-hover:scale-110">
            <ArrowRight className="size-3.5" />
          </span>
        </div>
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90" />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-ink-900">{label}</p>
          {treatment && <Badge variant="secondary" className="shrink-0">{treatment}</Badge>}
        </div>
        <p className="text-[13px] leading-relaxed text-ink-500">{note}</p>
      </div>
    </article>
  );
}
