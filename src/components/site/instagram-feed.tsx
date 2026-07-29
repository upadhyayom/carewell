"use client";

import * as React from "react";
import { Heart, MessageCircle, Play } from "lucide-react";
import { clinic } from "@/lib/data/clinic";
import { ClinicImage } from "./clinic-image";

function InstaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const posts: { img: string; likes: string; comments: number; reel?: boolean }[] = [
  { img: "smile", likes: "1,204", comments: 48, reel: true },
  { img: "chair", likes: "652", comments: 21 },
  { img: "kid", likes: "938", comments: 35 },
  { img: "treatment", likes: "540", comments: 17, reel: true },
  { img: "clinic", likes: "421", comments: 9 },
  { img: "xray", likes: "701", comments: 26 },
  { img: "surgery", likes: "584", comments: 19, reel: true },
  { img: "reception", likes: "365", comments: 11 },
  { img: "tools", likes: "812", comments: 30 },
];

export function InstagramFeed() {
  const ig = clinic.instagram;
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-hairline shadow-soft">
      {/* Profile header */}
      <div className="flex flex-wrap items-center gap-4 border-b border-ink-100 p-5 sm:gap-6 sm:p-6">
        <span className="rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2.5px]">
          <span className="flex size-16 items-center justify-center rounded-full bg-white p-[2.5px]">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white">
              <svg viewBox="0 0 24 24" fill="none" className="size-7">
                <path d="M12 3c-2.2 0-2.9 1.2-4.6 1.2C5.2 4.2 3.5 6 3.5 8.6c0 4.6 2.3 9.3 4 11.2.5.6 1.5.4 1.8-.4l1.3-4.1c.4-1.2 2.4-1.2 2.8 0l1.3 4.1c.3.8 1.3 1 1.8.4 1.7-1.9 4-6.6 4-11.2 0-2.6-1.7-4.4-3.9-4.4-1.7 0-2.4-1.2-4.6-1.2Z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[16px] font-semibold text-ink-900">{ig.handle}</p>
            <a
              href={clinic.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#0095f6] px-4 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Follow
            </a>
          </div>
          <div className="mt-2 flex gap-5 text-[13.5px] text-ink-700">
            <span><b className="font-semibold text-ink-900 tnum">{ig.posts}</b> posts</span>
            <span><b className="font-semibold text-ink-900 tnum">{ig.followers}</b> followers</span>
            <span><b className="font-semibold text-ink-900 tnum">{ig.following}</b> following</span>
          </div>
          <p className="mt-1.5 hidden whitespace-pre-line text-[12.5px] leading-snug text-ink-500 sm:block">
            {ig.bio}
          </p>
        </div>
        <InstaGlyph className="hidden size-6 text-ink-300 sm:block" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-[3px] bg-ink-100 p-[3px]">
        {posts.map((p, i) => (
          <a
            key={i}
            href={clinic.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <ClinicImage id={p.img} alt="CareWell Instagram post" className="h-full w-full" imgClassName="transition-transform duration-500 group-hover:scale-105" />
            {p.reel && <Play className="absolute right-2 top-2 size-4 fill-white text-white drop-shadow" />}
            <span className="absolute inset-0 flex items-center justify-center gap-4 bg-black/0 text-white opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
              <span className="flex items-center gap-1.5 text-[13px] font-semibold">
                <Heart className="size-4 fill-white" /> {p.likes}
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold">
                <MessageCircle className="size-4 fill-white" /> {p.comments}
              </span>
            </span>
          </a>
        ))}
      </div>

      <a
        href={clinic.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="block border-t border-ink-100 p-3.5 text-center text-[13px] font-medium text-[#0095f6] transition-colors hover:bg-ink-50"
      >
        View full profile on Instagram →
      </a>
    </div>
  );
}
