"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Photo registry — real photography via Unsplash CDN, with a graceful
 *  tinted fallback if a network/image ever fails. */
const photos: Record<string, string> = {
  hero: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  chair: "/assets/dental-chair.webp", // real clinic photo
  treatment: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
  clinic: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80",
  drf: "/assets/dr-smriti-sharma.webp", // real photo of Dr. Smriti Sharma
  drm: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80",
  surgery: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=900&q=80",
  smile: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=900&q=80",
  kid: "https://images.unsplash.com/photo-1588771930296-88c2cb03f386?auto=format&fit=crop&w=900&q=80",
  reception: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&w=900&q=80",
  xray: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80",
  tools: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?auto=format&fit=crop&w=900&q=80",
  braces: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=900&q=80",
  whitening: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&w=900&q=80",
  drf2: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",
};

/** One photo per treatment — used on service cards and pages. */
export const treatmentPhoto: Record<string, string> = {
  "dental-implants": "surgery",
  "root-canal": "treatment",
  braces: "braces",
  aligners: "smile",
  "smile-design": "chair",
  veneers: "hero",
  "teeth-whitening": "whitening",
  "kids-dentistry": "kid",
  scaling: "tools",
  extraction: "xray",
  "wisdom-tooth": "clinic",
  dentures: "reception",
};

export function ClinicImage({
  id,
  alt,
  className,
  imgClassName,
}: {
  id: keyof typeof photos | string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  const src = photos[id] ?? photos.clinic;
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-brand-100 via-ink-50 to-brand-50",
        className
      )}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}
      {failed && (
        <div className="flex h-full w-full items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="size-10 text-brand-300">
            <path d="M12 3c-2.2 0-2.9 1.2-4.6 1.2C5.2 4.2 3.5 6 3.5 8.6c0 4.6 2.3 9.3 4 11.2.5.6 1.5.4 1.8-.4l1.3-4.1c.4-1.2 2.4-1.2 2.8 0l1.3 4.1c.3.8 1.3 1 1.8.4 1.7-1.9 4-6.6 4-11.2 0-2.6-1.7-4.4-3.9-4.4-1.7 0-2.4-1.2-4.6-1.2Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
}
