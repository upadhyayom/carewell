"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { cn, formatDate, initials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryGradients } from "@/components/site/blog/category-style";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogCardData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readMins: number;
  emoji: string;
}

const PAGE_SIZE = 12;

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function PostCard({ post }: { post: BlogCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-hairline shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      {/* Emoji tile header */}
      <div
        className={cn(
          "relative flex h-32 items-center justify-center bg-gradient-to-br",
          categoryGradients[post.category] ?? "from-brand-400 to-brand-600"
        )}
      >
        <span className="text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
          {post.emoji}
        </span>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="tnum text-xs text-ink-400">{post.readMins} min read</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-[15px] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-500">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2.5 pt-4">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-semibold text-brand-700">
            {initials(post.author)}
          </span>
          <p className="text-xs text-ink-500">
            <span className="font-medium text-ink-700">{post.author}</span>
            <span className="mx-1.5 text-ink-300">·</span>
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Explorer                                                            */
/* ------------------------------------------------------------------ */

export function BlogExplorer({
  posts,
  categories,
}: {
  posts: BlogCardData[];
  categories: string[];
}) {
  const [active, setActive] = React.useState<string>("All");
  const [visible, setVisible] = React.useState(PAGE_SIZE);

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);
  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  const selectCategory = (cat: string) => {
    setActive(cat);
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((cat) => {
          const isActive = cat === active;
          const count = cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => selectCategory(cat)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200",
                isActive
                  ? "bg-ink-900 text-white shadow-soft"
                  : "bg-white text-ink-500 ring-hairline hover:bg-ink-50 hover:text-ink-900"
              )}
            >
              {cat}
              <span className={cn("tnum text-[11px]", isActive ? "text-white/60" : "text-ink-300")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load more */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="tnum text-xs text-ink-400">
          Showing {shown.length} of {filtered.length} articles
        </p>
        {hasMore && (
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            <Plus /> Load more articles
          </Button>
        )}
        {!hasMore && filtered.length > PAGE_SIZE && (
          <p className="inline-flex items-center gap-1.5 text-[13px] text-ink-400">
            You have reached the end <ArrowRight className="size-3.5" />
          </p>
        )}
      </div>
    </div>
  );
}
