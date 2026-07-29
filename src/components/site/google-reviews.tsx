"use client";

import * as React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews, ratingSummary } from "@/lib/data/reviews";
import { clinic } from "@/lib/data/clinic";
import { cn } from "@/lib/utils";

function GLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.27-2.09 3.58-5.17 3.58-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.28a12 12 0 0 0 0 10.76l3.99-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.28 6.62l3.99 3.1C6.22 6.88 8.87 4.77 12 4.77Z" />
    </svg>
  );
}

function Stars({ n, size = "size-3.5" }: { n: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn(size, i <= n ? "fill-[#fbbc05] text-[#fbbc05]" : "fill-ink-100 text-ink-100")} />
      ))}
    </span>
  );
}

const avatarColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#A142F4", "#F4511E", "#00897B"];

function timeAgo(iso: string): string {
  const days = Math.max(1, Math.round((new Date("2026-07-19").getTime() - new Date(iso).getTime()) / 86400000));
  if (days < 7) return days === 1 ? "a day ago" : `${days} days ago`;
  if (days < 30) return `${Math.round(days / 7)} week${days >= 14 ? "s" : ""} ago`;
  if (days < 365) return `${Math.round(days / 30)} month${days >= 60 ? "s" : ""} ago`;
  return "a year ago";
}

export function GoogleReviews() {
  const scroller = React.useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <div>
      {/* Summary header — styled like the Google Business panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-hairline shadow-soft sm:p-6">
        <div className="flex items-center gap-4">
          <GLogo className="size-9" />
          <div>
            <p className="text-[15px] font-semibold text-ink-900">Google rating</p>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-2xl font-semibold text-ink-900 tnum">{ratingSummary.average}</span>
              <Stars n={5} size="size-4" />
              <span className="text-sm text-ink-400">({ratingSummary.total.toLocaleString("en-IN")})</span>
            </div>
          </div>
        </div>
        <div className="hidden min-w-[220px] flex-col gap-1 sm:flex">
          {ratingSummary.distribution.slice(0, 3).map((d) => (
            <div key={d.stars} className="flex items-center gap-2 text-xs text-ink-400">
              <span className="w-2 tnum">{d.stars}</span>
              <div className="h-1.5 flex-1 rounded-full bg-ink-100">
                <div className="h-full rounded-full bg-[#fbbc05]" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="w-8 text-right tnum">{d.pct}%</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={clinic.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink-200 px-4 py-2 text-[13px] font-medium text-[#1a73e8] transition-colors hover:bg-blue-50"
          >
            Write a review
          </a>
          <div className="hidden gap-1 md:flex">
            <button onClick={() => scroll(-1)} aria-label="Previous reviews" className="flex size-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 hover:bg-ink-50">
              <ChevronLeft className="size-4" />
            </button>
            <button onClick={() => scroll(1)} aria-label="More reviews" className="flex size-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 hover:bg-ink-50">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Review cards */}
      <div
        ref={scroller}
        className="scroll-thin -mx-5 mt-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8"
      >
        {reviews.slice(0, 12).map((r, i) => (
          <article
            key={r.id}
            className="w-[300px] shrink-0 snap-start rounded-2xl bg-white p-5 ring-hairline shadow-soft sm:w-[320px]"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex size-10 items-center justify-center rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
              >
                {r.name[0]}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-ink-900">{r.name}</p>
                <p className="text-xs text-ink-400">{timeAgo(r.date)}</p>
              </div>
              <GLogo className="ml-auto size-4 shrink-0" />
            </div>
            <div className="mt-3">
              <Stars n={r.rating} />
            </div>
            <p className="mt-2 line-clamp-5 text-[13.5px] leading-relaxed text-ink-700">{r.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
