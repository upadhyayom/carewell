import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="size-5">
          <path
            d="M12 3c-2.2 0-2.9 1.2-4.6 1.2C5.2 4.2 3.5 6 3.5 8.6c0 4.6 2.3 9.3 4 11.2.5.6 1.5.4 1.8-.4l1.3-4.1c.4-1.2 2.4-1.2 2.8 0l1.3 4.1c.3.8 1.3 1 1.8.4 1.7-1.9 4-6.6 4-11.2 0-2.6-1.7-4.4-3.9-4.4-1.7 0-2.4-1.2-4.6-1.2Z"
            fill="currentColor"
            fillOpacity="0.92"
          />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-brand-300 ring-2 ring-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-semibold tracking-tight text-ink-900">
          CareWell<span className="text-brand-600">.</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-400">
          Dental Clinic
        </span>
      </span>
    </Link>
  );
}
