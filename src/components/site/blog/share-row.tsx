"use client";

import * as React from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

function pageUrl(slug: string): string {
  if (typeof window !== "undefined") return `${window.location.origin}/blog/${slug}`;
  return `https://carewell.clinic/blog/${slug}`;
}

const btnClass =
  "inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-medium text-ink-700 ring-hairline shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:text-ink-900 hover:shadow-lift active:scale-[0.97]";

export function ShareRow({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = React.useState(false);

  const share = (network: "whatsapp" | "x") => {
    const url = pageUrl(slug);
    const text = encodeURIComponent(`${title} — ${url}`);
    const target =
      network === "whatsapp"
        ? `https://wa.me/?text=${text}`
        : `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl(slug));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silently ignore
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-ink-400">
        Share
      </span>

      <button type="button" onClick={() => share("whatsapp")} className={btnClass} aria-label="Share on WhatsApp">
        <svg viewBox="0 0 24 24" className="size-4 text-[#25D366]" fill="currentColor" aria-hidden>
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
        </svg>
        WhatsApp
      </button>

      <button type="button" onClick={copy} className={cn(btnClass, copied && "text-brand-700")} aria-label="Copy link">
        {copied ? <Check className="size-4 text-brand-600" /> : <Link2 className="size-4" />}
        {copied ? "Copied!" : "Copy link"}
      </button>

      <button type="button" onClick={() => share("x")} className={btnClass} aria-label="Share on X">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
        </svg>
        Post
      </button>
    </div>
  );
}
