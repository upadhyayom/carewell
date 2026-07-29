import { Skeleton } from "@/components/ui/skeleton";

export default function LeadsLoading() {
  return (
    <div className="space-y-5">
      <div className="mb-6 flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[118px] rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-9 w-48 rounded-full" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-[248px] shrink-0 space-y-2">
            <Skeleton className="h-8 rounded-xl" />
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-[104px] rounded-xl" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
