"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  Target,
  AlertTriangle,
  Lightbulb,
  Check,
  PartyPopper,
  CalendarPlus,
  RefreshCw,
} from "lucide-react";
import { PageHeader } from "@/components/admin/widgets";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { insights } from "@/lib/data/ops";
import { festivals } from "@/lib/data/social";
import type { Insight } from "@/lib/data/types";

const kindStyles: Record<
  Insight["kind"],
  { icon: React.ComponentType<{ className?: string }>; chip: string; iconBox: string; label: string }
> = {
  trend: {
    icon: TrendingUp,
    chip: "bg-blue-50 text-blue-700 ring-blue-600/15",
    iconBox: "bg-blue-50 text-blue-600",
    label: "Trend",
  },
  opportunity: {
    icon: Target,
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    iconBox: "bg-emerald-50 text-emerald-600",
    label: "Opportunity",
  },
  alert: {
    icon: AlertTriangle,
    chip: "bg-amber-50 text-amber-800 ring-amber-600/20",
    iconBox: "bg-amber-50 text-amber-600",
    label: "Alert",
  },
  suggestion: {
    icon: Lightbulb,
    chip: "bg-violet-50 text-violet-700 ring-violet-600/15",
    iconBox: "bg-violet-50 text-violet-600",
    label: "Suggestion",
  },
};

const suggestedActions = [
  "Shift ₹18k/month from Braces-Offer to Aligners-Video before wedding season",
  "Open a second Wednesday surgical slot to ease Dr. Smriti's booking pressure",
  "Brief Diwali smile-makeover creatives to the agency by 15 September",
  "Launch EMI-first aligner messaging for under-30 leads on Meta",
];

export default function InsightsPage() {
  const [done, setDone] = React.useState<boolean[]>([false, false, false, false]);
  const doneCount = done.filter(Boolean).length;
  const upcomingFestivals = festivals.slice(0, 4);

  return (
    <div className="space-y-5">
      <PageHeader
        title="AI Insights"
        description="Automatic analysis of revenue, marketing and clinic operations"
        actions={
          <Button variant="ghost" size="sm" className="h-9">
            <RefreshCw className="size-3.5" /> Regenerate
          </Button>
        }
      />

      {/* Hero */}
      <Card className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-50" />
        <div className="pointer-events-none absolute -bottom-20 right-24 size-40 rounded-full bg-violet-50" />
        <div className="relative flex flex-wrap items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-blue-600 text-white shadow-lift">
            <Sparkles className="size-5" />
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-ink-900">AI Business Insights</h2>
            <p className="mt-0.5 text-sm text-ink-500">
              Generated 19 Jul, 9:00 AM · from 30 days of leads, revenue and campaign data
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="blue">3 trends</Badge>
            <Badge variant="good">2 opportunities</Badge>
            <Badge variant="warning">1 alert</Badge>
            <Badge variant="violet">2 suggestions</Badge>
          </div>
        </div>
      </Card>

      {/* Insight grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {insights.map((ins) => {
          const style = kindStyles[ins.kind];
          const Icon = style.icon;
          return (
            <Card key={ins.id} className="flex flex-col p-5">
              <div className="flex items-center justify-between">
                <span className={cn("flex size-9 items-center justify-center rounded-xl", style.iconBox)}>
                  <Icon className="size-4" />
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ring-1 ring-inset",
                    style.chip
                  )}
                >
                  {style.label}
                </span>
              </div>
              {ins.metric && (
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-semibold tracking-tight text-ink-900 tnum">{ins.metric}</span>
                  {ins.delta && (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700 tnum">
                      {ins.delta}
                    </span>
                  )}
                </div>
              )}
              <h3 className="mt-2 text-[14px] font-semibold leading-5 text-ink-900">{ins.title}</h3>
              <p className="mt-1.5 flex-1 text-[12.5px] leading-5 text-ink-500">{ins.text}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {/* Suggested actions */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14.5px] font-semibold text-ink-900">Suggested actions</h3>
              <p className="mt-0.5 text-xs text-ink-400">Ranked by estimated revenue impact</p>
            </div>
            <Badge variant={doneCount === suggestedActions.length ? "good" : "secondary"} className="tnum">
              {doneCount}/{suggestedActions.length} done
            </Badge>
          </div>
          <ul className="mt-4 space-y-2">
            {suggestedActions.map((action, i) => (
              <li key={i}>
                <button
                  onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors",
                    done[i] ? "bg-emerald-50/60" : "bg-ink-50/70 hover:bg-ink-100/70"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                      done[i]
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-ink-300 bg-white text-transparent"
                    )}
                  >
                    <Check className="size-3.5" />
                  </span>
                  <span
                    className={cn(
                      "text-[13px] leading-5",
                      done[i] ? "text-ink-400 line-through" : "text-ink-700"
                    )}
                  >
                    {action}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Festival campaigns */}
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <PartyPopper className="size-4" />
            </span>
            <div>
              <h3 className="text-[14.5px] font-semibold text-ink-900">Upcoming festival campaigns</h3>
              <p className="text-xs text-ink-400">Plan content 4–6 weeks ahead for best CPL</p>
            </div>
          </div>
          <ul className="mt-4 space-y-3">
            {upcomingFestivals.map((f) => (
              <li key={f.date} className="rounded-xl bg-ink-50/70 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-semibold text-ink-900">{f.name}</span>
                    <Badge variant="outline" className="px-2 py-0 text-[10.5px] tnum">
                      {new Date(`${f.date}T12:00:00`).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Badge>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="h-7 shrink-0 text-[11.5px]">
                    <Link href="/admin/social">
                      <CalendarPlus className="size-3" /> Plan post
                    </Link>
                  </Button>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[12px] leading-5 text-ink-500">{f.idea}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
