"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, initials, inr } from "@/lib/utils";
import { pipelineStages, leadsByStage } from "@/lib/data/leads";
import type { Lead, LeadStage } from "@/lib/data/types";
import { ScoreDot, SourceBadge, timeAgo } from "./status-badges";

const stageAccents: Record<LeadStage, string> = {
  New: "bg-blue-500",
  Contacted: "bg-slate-400",
  Qualified: "bg-violet-500",
  Appointment: "bg-amber-500",
  Visited: "bg-brand-600",
  "Treatment Started": "bg-emerald-500",
  "Treatment Completed": "bg-emerald-700",
  Lost: "bg-red-400",
};

function LeadCard({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-white p-3 text-left ring-hairline shadow-[0_1px_2px_rgba(10,15,14,0.04)] transition-all hover:shadow-soft hover:ring-brand-500/30"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="truncate text-[13px] font-semibold text-ink-900">{lead.name}</span>
        <ScoreDot score={lead.score} />
      </div>
      <div className="mt-0.5 truncate text-xs text-ink-500">{lead.treatment}</div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <SourceBadge source={lead.source} className="px-2 py-0 text-[10.5px]" />
        <span className="text-xs font-semibold text-ink-900 tnum">{inr(lead.value, true)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Avatar className="size-5">
            <AvatarFallback className="text-[8.5px]">{initials(lead.owner)}</AvatarFallback>
          </Avatar>
          <span className="text-[10.5px] text-ink-400">{lead.owner.split(" ")[0]}</span>
        </span>
        <span className="text-[10.5px] text-ink-400 tnum">{timeAgo(lead.createdAt)}</span>
      </div>
    </button>
  );
}

const CARD_CAP = 8;

export function LeadBoard({
  onSelect,
  extraLeads = [],
}: {
  onSelect: (lead: Lead) => void;
  extraLeads?: Lead[];
}) {
  return (
    <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-3 scroll-thin">
      {pipelineStages.map((stage) => {
        const stageLeads = [...extraLeads.filter((l) => l.stage === stage), ...leadsByStage[stage]];
        const total = stageLeads.reduce((s, l) => s + l.value, 0);
        const overflow = stageLeads.length - CARD_CAP;
        return (
          <div key={stage} className="w-[248px] shrink-0 rounded-2xl bg-ink-50/70 p-2.5">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <span className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", stageAccents[stage])} />
                <span className="text-[12.5px] font-semibold text-ink-900">{stage}</span>
                <span className="rounded-full bg-white px-1.5 py-0.5 text-[10.5px] font-semibold text-ink-500 ring-hairline tnum">
                  {stageLeads.length}
                </span>
              </span>
              <span className="text-[11px] font-medium text-ink-400 tnum">{inr(total, true)}</span>
            </div>
            <div className="space-y-2">
              {stageLeads.slice(0, CARD_CAP).map((lead) => (
                <LeadCard key={lead.id} lead={lead} onClick={() => onSelect(lead)} />
              ))}
              {overflow > 0 && (
                <div className="rounded-xl border border-dashed border-ink-200 py-2 text-center text-[11.5px] font-medium text-ink-400">
                  +{overflow} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
