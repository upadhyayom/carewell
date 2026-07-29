"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AppointmentStatus, LeadStage, Lead } from "@/lib/data/types";

/* ------------------------------------------------------------------ */
/* Shared badge / dot mappings for the admin app                       */
/* ------------------------------------------------------------------ */

type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "good"
  | "warning"
  | "serious"
  | "critical"
  | "blue"
  | "violet";

const stageVariants: Record<LeadStage, BadgeVariant> = {
  New: "blue",
  Contacted: "secondary",
  Qualified: "violet",
  Appointment: "warning",
  Visited: "default",
  "Treatment Started": "good",
  "Treatment Completed": "good",
  Lost: "critical",
};

export function StageBadge({ stage, className }: { stage: LeadStage; className?: string }) {
  return (
    <Badge variant={stageVariants[stage]} className={cn("whitespace-nowrap", className)}>
      {stage}
    </Badge>
  );
}

const aptVariants: Record<AppointmentStatus, BadgeVariant> = {
  Confirmed: "blue",
  Pending: "warning",
  "Checked In": "violet",
  "In Chair": "default",
  Completed: "good",
  Cancelled: "critical",
  "No Show": "serious",
};

export function AppointmentBadge({
  status,
  className,
}: {
  status: AppointmentStatus;
  className?: string;
}) {
  return (
    <Badge variant={aptVariants[status]} className={cn("whitespace-nowrap", className)}>
      {status}
    </Badge>
  );
}

export function BillingBadge({ status }: { status: "Paid" | "Partial" | "Pending" | "—" }) {
  if (status === "—") return <span className="text-xs text-ink-300">—</span>;
  const v: BadgeVariant = status === "Paid" ? "good" : status === "Partial" ? "warning" : "critical";
  return <Badge variant={v}>{status}</Badge>;
}

export function SourceBadge({ source, className }: { source: string; className?: string }) {
  const v: BadgeVariant =
    source === "Meta Ads" || source === "Instagram"
      ? "blue"
      : source === "Google Ads" || source === "Google"
      ? "warning"
      : source === "WhatsApp"
      ? "good"
      : source === "Website"
      ? "violet"
      : "secondary";
  return (
    <Badge variant={v} className={cn("whitespace-nowrap", className)}>
      {source}
    </Badge>
  );
}

const scoreColors: Record<Lead["score"], string> = {
  Hot: "bg-red-500",
  Warm: "bg-amber-500",
  Cold: "bg-slate-400",
};

export function ScoreDot({ score, withLabel = false }: { score: Lead["score"]; withLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5" title={score}>
      <span className={cn("size-2 rounded-full", scoreColors[score])} />
      {withLabel && <span className="text-xs text-ink-500">{score}</span>}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Deterministic relative-time helpers — "today" is 2026-07-19         */
/* ------------------------------------------------------------------ */

const TODAY_MS = new Date("2026-07-19T12:00:00").getTime();

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = TODAY_MS - then;
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return months <= 1 ? "1mo ago" : `${months}mo ago`;
}

export function daysUntil(isoDate: string): string {
  const then = new Date(`${isoDate}T12:00:00`).getTime();
  const days = Math.round((then - TODAY_MS) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}
