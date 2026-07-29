"use client";

import * as React from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  StickyNote,
  Sparkles,
  Check,
  Flag,
  CalendarClock,
  UserPlus,
  IndianRupee,
  Megaphone,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn, initials, inr, formatDateTime } from "@/lib/utils";
import { pipelineStages } from "@/lib/data/leads";
import type { Lead, LeadEvent, LeadStage } from "@/lib/data/types";
import { ScoreDot, SourceBadge, StageBadge, daysUntil } from "./status-badges";

const eventIcons: Record<LeadEvent["type"], React.ComponentType<{ className?: string }>> = {
  created: UserPlus,
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  stage: Flag,
  note: StickyNote,
  visit: MapPin,
};

function StageStepper({ current }: { current: LeadStage }) {
  const currentIdx = pipelineStages.indexOf(current);
  return (
    <ol className="space-y-0">
      {pipelineStages.map((stage, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <li key={stage} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                  active
                    ? "bg-brand-600 text-white ring-4 ring-brand-100"
                    : done
                    ? "bg-brand-100 text-brand-700"
                    : "bg-ink-50 text-ink-300"
                )}
              >
                {done ? <Check className="size-3" /> : i + 1}
              </span>
              {i < pipelineStages.length - 1 && (
                <span className={cn("w-px flex-1 min-h-3", done ? "bg-brand-200" : "bg-ink-100")} />
              )}
            </div>
            <span
              className={cn(
                "pb-3 text-[13px] leading-5",
                active ? "font-semibold text-ink-900" : done ? "text-ink-700" : "text-ink-400"
              )}
            >
              {stage}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">{label}</div>
      <div className="mt-0.5 text-[13.5px] text-ink-900">{value}</div>
    </div>
  );
}

export function LeadDrawer({
  lead,
  open,
  onOpenChange,
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {lead && <LeadDrawerBody key={lead.id} lead={lead} />}
    </Dialog>
  );
}

function LeadDrawerBody({ lead }: { lead: Lead }) {
  const [stage, setStage] = React.useState<LeadStage>(lead.stage);
  const [notes, setNotes] = React.useState<string[]>(lead.notes);
  const [noteDraft, setNoteDraft] = React.useState("");

  const addNote = () => {
    const text = noteDraft.trim();
    if (!text) return;
    setNotes((n) => [...n, text]);
    setNoteDraft("");
  };

  const stageIdx = pipelineStages.indexOf(stage);
  const qualifiedIdx = pipelineStages.indexOf("Qualified");

  return (
    <DialogContent className="bottom-0 left-auto right-0 top-0 flex h-full max-h-none w-full max-w-md translate-x-0 translate-y-0 flex-col gap-0 overflow-y-auto rounded-none p-0 scroll-thin data-[state=open]:slide-in-from-right-8 sm:rounded-l-2xl">
      {/* Header */}
      <div className="border-b border-ink-100 bg-ink-50/50 px-6 py-5">
        <div className="flex items-start gap-3">
          <Avatar className="size-11">
            <AvatarFallback>{initials(lead.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-base">{lead.name}</DialogTitle>
            <div className="mt-0.5 text-xs text-ink-500">
              {lead.phone} · {lead.city}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <StageBadge stage={stage} />
              <SourceBadge source={lead.source} />
              <ScoreDot score={lead.score} withLabel />
            </div>
          </div>
        </div>
        {/* Quick actions */}
        <div className="mt-4 flex items-center gap-2">
          <Button size="sm" variant="secondary">
            <Phone className="size-3.5" /> Call
          </Button>
          <Button size="sm" variant="secondary">
            <MessageCircle className="size-3.5" /> WhatsApp
          </Button>
          {stageIdx < qualifiedIdx && (
            <Button size="sm" onClick={() => setStage("Qualified")}>
              <Sparkles className="size-3.5" /> Mark Qualified
            </Button>
          )}
          {stageIdx >= qualifiedIdx && stageIdx < pipelineStages.length - 2 && (
            <Button size="sm" onClick={() => setStage(pipelineStages[stageIdx + 1])}>
              <Check className="size-3.5" /> Advance stage
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-6 px-6 py-5">
        {/* Details */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Field label="Treatment" value={lead.treatment} />
          <Field
            label="Est. value"
            value={
              <span className="inline-flex items-center gap-1 font-semibold tnum">
                <IndianRupee className="size-3.5 text-ink-400" />
                {inr(lead.value).slice(1)}
              </span>
            }
          />
          <Field label="Owner" value={lead.owner} />
          <Field
            label="Campaign"
            value={
              lead.campaign ? (
                <span className="inline-flex items-center gap-1.5">
                  <Megaphone className="size-3.5 text-ink-400" />
                  {lead.campaign}
                </span>
              ) : (
                <span className="text-ink-400">Organic</span>
              )
            }
          />
        </div>

        {lead.nextFollowUp && (
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
            <CalendarClock className="size-3.5" />
            Follow-up: {daysUntil(lead.nextFollowUp)} ·{" "}
            {new Date(`${lead.nextFollowUp}T12:00:00`).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </div>
        )}

        <Separator />

        {/* Stage stepper */}
        <div>
          <h4 className="mb-3 text-[13px] font-semibold text-ink-900">Pipeline stage</h4>
          <StageStepper current={stage} />
        </div>

        <Separator />

        {/* Timeline */}
        <div>
          <h4 className="mb-3 text-[13px] font-semibold text-ink-900">Timeline</h4>
          <ol className="space-y-4">
            {[...lead.timeline]
              .sort((a, b) => (a.at < b.at ? 1 : -1))
              .map((ev, i) => {
                const Icon = eventIcons[ev.type];
                return (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500">
                      <Icon className="size-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] leading-5 text-ink-700">{ev.text}</p>
                      <p className="mt-0.5 text-[11px] text-ink-400 tnum">{formatDateTime(ev.at)}</p>
                    </div>
                  </li>
                );
              })}
          </ol>
        </div>

        <Separator />

        {/* Notes */}
        <div>
          <h4 className="mb-3 text-[13px] font-semibold text-ink-900">Notes</h4>
          {notes.length === 0 && <p className="text-xs text-ink-400">No notes yet.</p>}
          <ul className="space-y-2">
            {notes.map((n, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-xl bg-ink-50/70 px-3 py-2 text-[13px] text-ink-700"
              >
                <StickyNote className="mt-0.5 size-3.5 shrink-0 text-ink-400" />
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <Input
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              placeholder="Add a note…"
              className="h-9 text-[13px]"
            />
            <Button size="sm" variant="secondary" className="h-9" onClick={addNote}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
