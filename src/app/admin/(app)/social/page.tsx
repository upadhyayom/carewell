"use client";

import * as React from "react";
import Link from "next/link";
import {
  CalendarHeart, CalendarClock, ShieldCheck, TrendingUp, Check, X, Sparkles,
  Heart, MessageCircle, Eye,
} from "lucide-react";
import { ChartCard, PageHeader, StatCard } from "@/components/admin/widgets";
import { DonutChart } from "@/components/charts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { contentPillars, festivals, socialPosts } from "@/lib/data/social";
import type { SocialPlatform, SocialPost } from "@/lib/data/types";
import { cn, formatDate } from "@/lib/utils";

type PostStatus = SocialPost["status"];

const TODAY = "2026-07-19";

const platformDot: Record<SocialPlatform, string> = {
  Instagram: "bg-rose-500",
  Facebook: "bg-blue-500",
  YouTube: "bg-red-500",
  "Google Business": "bg-emerald-500",
};

const platformPill: Record<SocialPlatform, string> = {
  Instagram: "bg-rose-50 text-rose-700 ring-rose-600/15",
  Facebook: "bg-blue-50 text-blue-700 ring-blue-600/15",
  YouTube: "bg-red-50 text-red-700 ring-red-600/15",
  "Google Business": "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
};

const formatGlyph: Record<SocialPost["format"], string> = {
  Reel: "▶", Carousel: "⧉", Story: "◐", Post: "▣", Video: "▶", Short: "▶",
};

const statusVariant: Record<PostStatus, "secondary" | "outline" | "warning" | "blue" | "violet" | "good"> = {
  Idea: "outline",
  Drafted: "secondary",
  "In Review": "warning",
  Approved: "blue",
  Scheduled: "violet",
  Published: "good",
};

const pillarVariant: Record<SocialPost["pillar"], "blue" | "good" | "violet" | "warning" | "secondary" | "critical"> = {
  Educational: "blue",
  Testimonial: "good",
  Awareness: "violet",
  Offer: "warning",
  "Behind the Scenes": "secondary",
  Festival: "critical",
};

const ALL_STATUSES: PostStatus[] = ["Idea", "Drafted", "In Review", "Approved", "Scheduled", "Published"];

function PostRow({
  post, status, onStatusChange,
}: {
  post: SocialPost;
  status: PostStatus;
  onStatusChange?: (s: PostStatus) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink-100 py-3 last:border-0">
      <span className={cn("inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-[13px] ring-1 ring-inset", platformPill[post.platform])}>
        {formatGlyph[post.format]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-medium text-ink-900">{post.title}</p>
        <p className="mt-0.5 text-[11.5px] text-ink-400">
          {post.platform} · {post.format} · <span className="tnum">{formatDate(post.date)}</span>
        </p>
      </div>
      <Badge variant={pillarVariant[post.pillar]}>{post.pillar}</Badge>
      {onStatusChange ? (
        <Select
          className="h-8 w-32 rounded-lg py-1 text-xs"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as PostStatus)}
          aria-label={`Status of ${post.title}`}
        >
          {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      ) : (
        <Badge variant={statusVariant[status]}>{status}</Badge>
      )}
      {status === "Published" && post.reach !== undefined && (
        <span className="flex items-center gap-3 text-[11.5px] text-ink-400 tnum">
          <span className="inline-flex items-center gap-1"><Eye className="size-3.5" />{post.reach.toLocaleString("en-IN")}</span>
          <span className="inline-flex items-center gap-1"><Heart className="size-3.5" />{post.likes?.toLocaleString("en-IN")}</span>
          <span className="inline-flex items-center gap-1"><MessageCircle className="size-3.5" />{post.comments?.toLocaleString("en-IN")}</span>
        </span>
      )}
    </div>
  );
}

export default function SocialPage() {
  // Local status overrides (approvals, day-dialog edits)
  const [overrides, setOverrides] = React.useState<Record<string, PostStatus>>({});
  const [openDay, setOpenDay] = React.useState<string | null>(null);

  const statusOf = React.useCallback(
    (p: SocialPost): PostStatus => overrides[p.id] ?? p.status,
    [overrides]
  );
  const setStatus = (id: string, s: PostStatus) => setOverrides((prev) => ({ ...prev, [id]: s }));

  const julyPosts = socialPosts.filter((p) => p.date.startsWith("2026-07"));
  const scheduled = socialPosts.filter((p) => statusOf(p) === "Scheduled");
  const inReview = socialPosts.filter((p) => statusOf(p) === "In Review");
  const published = socialPosts.filter((p) => p.status === "Published" && p.reach !== undefined);
  const avgReach = published.length
    ? Math.round(published.reduce((s, p) => s + (p.reach ?? 0), 0) / published.length)
    : 0;

  /* July 2026 calendar: 1 Jul is a Wednesday (offset 3), 31 days, 5 rows */
  const cells: (string | null)[] = [
    ...Array.from({ length: 3 }, () => null),
    ...Array.from({ length: 31 }, (_, i) => `2026-07-${String(i + 1).padStart(2, "0")}`),
    null,
  ];
  const postsByDate = React.useMemo(() => {
    const map = new Map<string, SocialPost[]>();
    for (const p of socialPosts) {
      const arr = map.get(p.date) ?? [];
      arr.push(p);
      map.set(p.date, arr);
    }
    return map;
  }, []);

  const dayPosts = openDay ? postsByDate.get(openDay) ?? [] : [];

  return (
    <div>
      <PageHeader
        title="Social Media Center"
        description="Plan, approve and track content across Instagram, Facebook, YouTube and Google Business."
        actions={
          <Button asChild variant="secondary">
            <Link href="/admin/ai-assistant"><Sparkles /> Draft with AI</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Posts this month" value={String(julyPosts.length)} icon={CalendarHeart} />
        <StatCard label="Scheduled" value={String(scheduled.length)} icon={CalendarClock} />
        <StatCard label="Awaiting approval" value={String(inReview.length)} icon={ShieldCheck} />
        <StatCard label="Avg reach (published)" value={avgReach.toLocaleString("en-IN")} icon={TrendingUp} delta={6.8} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_340px]">
        {/* -------- Month calendar -------- */}
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[14.5px] font-semibold text-ink-900">July 2026</h3>
              <p className="mt-0.5 text-xs text-ink-400">Click a day to review its posts</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 text-[10.5px] text-ink-500">
              {(Object.keys(platformDot) as SocialPlatform[]).map((pl) => (
                <span key={pl} className="inline-flex items-center gap-1">
                  <span className={cn("size-2 rounded-full", platformDot[pl])} /> {pl}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl bg-ink-100 ring-1 ring-ink-100">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="bg-ink-50 py-1.5 text-center text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">
                {d}
              </div>
            ))}
            {cells.map((date, i) => {
              if (!date) return <div key={`blank-${i}`} className="min-h-[86px] bg-white/60" />;
              const day = Number(date.slice(8));
              const posts = postsByDate.get(date) ?? [];
              const isToday = date === TODAY;
              return (
                <button
                  key={date}
                  onClick={() => posts.length > 0 && setOpenDay(date)}
                  className={cn(
                    "min-h-[86px] bg-white p-1.5 text-left align-top transition-colors",
                    posts.length > 0 ? "cursor-pointer hover:bg-brand-50/50" : "cursor-default",
                    isToday && "bg-brand-50/60"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-5 items-center justify-center rounded-full text-[11px] font-medium tnum",
                      isToday ? "bg-brand-700 text-white" : "text-ink-500"
                    )}
                  >
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {posts.slice(0, 3).map((p) => (
                      <span
                        key={p.id}
                        className={cn(
                          "flex items-center gap-1 truncate rounded px-1 py-px text-[9.5px] font-medium ring-1 ring-inset",
                          platformPill[p.platform]
                        )}
                        title={`${p.title} (${p.platform} ${p.format})`}
                      >
                        <span className="shrink-0">{formatGlyph[p.format]}</span>
                        <span className="truncate">{p.title}</span>
                      </span>
                    ))}
                    {posts.length > 3 && (
                      <span className="block px-1 text-[9.5px] text-ink-400 tnum">+{posts.length - 3} more</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* -------- Approval queue -------- */}
        <Card className="p-5">
          <h3 className="text-[14.5px] font-semibold text-ink-900">Approval queue</h3>
          <p className="mt-0.5 text-xs text-ink-400 tnum">{inReview.length} posts awaiting review</p>
          <div className="mt-3 max-h-[560px] space-y-2.5 overflow-y-auto scroll-thin pr-1">
            {inReview.length === 0 && (
              <p className="rounded-xl bg-emerald-50 px-3 py-2.5 text-[13px] text-emerald-800">
                All caught up — nothing awaiting approval.
              </p>
            )}
            {inReview.map((p) => (
              <div key={p.id} className="rounded-xl border border-ink-100 p-3">
                <div className="flex items-start gap-2">
                  <span className={cn("mt-0.5 size-2 shrink-0 rounded-full", platformDot[p.platform])} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium leading-snug text-ink-900">{p.title}</p>
                    <p className="mt-0.5 text-[11px] text-ink-400">
                      {p.platform} · {p.format} · <span className="tnum">{formatDate(p.date)}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 flex gap-2">
                  <Button size="sm" className="h-7 flex-1 text-xs" onClick={() => setStatus(p.id, "Approved")}>
                    <Check className="size-3.5" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 flex-1 text-xs" onClick={() => setStatus(p.id, "Drafted")}>
                    <X className="size-3.5" /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* -------- Platform planner -------- */}
      <Tabs defaultValue="Instagram" className="mt-6">
        <TabsList>
          <TabsTrigger value="Instagram">Instagram</TabsTrigger>
          <TabsTrigger value="Facebook">Facebook</TabsTrigger>
          <TabsTrigger value="YouTube">YouTube</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        {(["Instagram", "Facebook", "YouTube"] as SocialPlatform[]).map((platform) => {
          const list = socialPosts.filter((p) => p.platform === platform);
          return (
            <TabsContent key={platform} value={platform}>
              <Card className="p-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className={cn("size-2.5 rounded-full", platformDot[platform])} />
                  <h3 className="text-[14.5px] font-semibold text-ink-900">{platform} pipeline</h3>
                  <span className="ml-auto text-xs text-ink-400 tnum">{list.length} posts · Jun – Aug 2026</span>
                </div>
                <div>
                  {list.map((p) => (
                    <PostRow key={p.id} post={p} status={statusOf(p)} />
                  ))}
                </div>
              </Card>
            </TabsContent>
          );
        })}

        <TabsContent value="campaigns">
          <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
            <ChartCard title="Content pillar mix" subtitle="Target share of monthly content">
              <DonutChart
                labels={contentPillars.map((p) => p.name)}
                values={contentPillars.map((p) => p.share)}
                valueFormat={(v) => `${v}%`}
                centerValue="6"
                centerLabel="pillars"
                height={240}
              />
            </ChartCard>
            <Card className="p-5">
              <h3 className="text-[14.5px] font-semibold text-ink-900">Festival campaign calendar</h3>
              <p className="mt-0.5 text-xs text-ink-400">Upcoming occasions with ready campaign angles</p>
              <div className="mt-4 space-y-3">
                {festivals.map((f) => (
                  <div key={f.date} className="flex items-start gap-3 rounded-xl border border-ink-100 p-3.5">
                    <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-brand-50 py-1.5 text-brand-800">
                      <span className="text-[15px] font-bold leading-none tnum">{Number(f.date.slice(8))}</span>
                      <span className="mt-0.5 text-[9.5px] font-semibold uppercase">
                        {formatDate(f.date).split(" ")[1]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-semibold text-ink-900">{f.name}</p>
                      <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-ink-500">{f.idea}</p>
                    </div>
                    <Button asChild variant="soft" size="sm" className="shrink-0">
                      <Link href="/admin/ai-assistant"><Sparkles className="size-3.5" /> Draft with AI</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* -------- Day dialog -------- */}
      <Dialog open={openDay !== null} onOpenChange={(o) => !o && setOpenDay(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto scroll-thin sm:max-w-xl">
          {openDay && (
            <>
              <DialogHeader>
                <DialogTitle>{formatDate(openDay)}</DialogTitle>
                <DialogDescription className="tnum">
                  {dayPosts.length} post{dayPosts.length === 1 ? "" : "s"} planned for this day
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                {dayPosts.map((p) => (
                  <div key={p.id} className="rounded-xl border border-ink-100 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", platformPill[p.platform])}>
                        <span className={cn("size-1.5 rounded-full", platformDot[p.platform])} />
                        {p.platform} · {p.format}
                      </span>
                      <Badge variant={pillarVariant[p.pillar]}>{p.pillar}</Badge>
                      <span className="ml-auto text-[11px] text-ink-400 tnum">{p.id}</span>
                    </div>
                    <p className="mt-2.5 text-[14px] font-semibold text-ink-900">{p.title}</p>
                    {p.caption && (
                      <p className="mt-1.5 rounded-lg bg-ink-50 px-3 py-2 text-[12.5px] leading-relaxed text-ink-600">
                        {p.caption}
                      </p>
                    )}
                    {p.reach !== undefined && (
                      <div className="mt-2.5 flex items-center gap-4 text-[12px] text-ink-500 tnum">
                        <span className="inline-flex items-center gap-1"><Eye className="size-3.5" /> {p.reach.toLocaleString("en-IN")} reach</span>
                        <span className="inline-flex items-center gap-1"><Heart className="size-3.5" /> {p.likes?.toLocaleString("en-IN")}</span>
                        <span className="inline-flex items-center gap-1"><MessageCircle className="size-3.5" /> {p.comments?.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-ink-400">Status</span>
                      <Select
                        className="h-8 w-36 rounded-lg py-1 text-xs"
                        value={statusOf(p)}
                        onChange={(e) => setStatus(p.id, e.target.value as PostStatus)}
                        aria-label={`Change status of ${p.title}`}
                      >
                        {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
