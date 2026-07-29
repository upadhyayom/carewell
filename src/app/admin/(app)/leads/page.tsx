"use client";

import * as React from "react";
import { Search, Flame, IndianRupee, Users, Percent, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { StatCard, PageHeader, EmptyState } from "@/components/admin/widgets";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { inr, pct, formatDate } from "@/lib/utils";
import { leads as staticLeads, pipelineStages, pipelineSummary } from "@/lib/data/leads";
import { readChatLeads } from "@/lib/chat-leads";
import type { Lead, LeadStage } from "@/lib/data/types";
import { LeadBoard } from "@/components/admin/lead-board";
import { LeadDrawer } from "@/components/admin/lead-drawer";
import { ScoreDot, SourceBadge, StageBadge, daysUntil } from "@/components/admin/status-badges";

const PAGE_SIZE = 25;
const activeStages: LeadStage[] = ["New", "Contacted", "Qualified", "Appointment", "Visited"];

const allSources = ["Meta Ads", "Google Ads", "Website", "WhatsApp", "Instagram", "Referral", "Walk-in"];

export default function LeadsPage() {
  const [selected, setSelected] = React.useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Leads captured by the website chatbot (stored locally in this demo)
  const [chatLeads, setChatLeads] = React.useState<Lead[]>([]);
  React.useEffect(() => setChatLeads(readChatLeads()), []);
  const leads = React.useMemo(() => [...chatLeads, ...staticLeads], [chatLeads]);

  const [query, setQuery] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState("all");
  const [sourceFilter, setSourceFilter] = React.useState("all");
  const [page, setPage] = React.useState(0);

  const openLead = (lead: Lead) => {
    setSelected(lead);
    setDrawerOpen(true);
  };

  const hotCount = leads.filter((l) => l.score === "Hot").length;
  const pipelineValue = pipelineSummary
    .filter((s) => activeStages.includes(s.stage))
    .reduce((sum, s) => sum + s.value, 0);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (stageFilter !== "all" && l.stage !== stageFilter) return false;
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (
        q &&
        !l.name.toLowerCase().includes(q) &&
        !l.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) &&
        !l.treatment.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [query, stageFilter, sourceFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const rows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Leads CRM"
        description={`${leads.length} leads across the pipeline · includes website chatbot leads`}
        actions={
          <Button size="sm" className="h-9">
            <Plus className="size-4" /> New lead
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Leads" value={String(leads.length)} delta={11.4} icon={Users} />
        <StatCard label="Hot Leads" value={String(hotCount)} delta={6.7} icon={Flame} />
        <StatCard
          label="Pipeline Value"
          value={inr(pipelineValue, true)}
          deltaLabel="across active stages"
          icon={IndianRupee}
        />
        <StatCard label="Conversion Rate" value={pct(28.1)} delta={2.3} icon={Percent} />
      </div>

      <Tabs defaultValue="pipeline">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline">
          <LeadBoard onSelect={openLead} extraLeads={chatLeads} />
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
                placeholder="Search name, phone or treatment…"
                className="h-9 pl-9 text-[13px]"
              />
            </div>
            <Select
              value={stageFilter}
              onChange={(e) => {
                setStageFilter(e.target.value);
                setPage(0);
              }}
              className="h-9 w-[170px] text-[13px]"
            >
              <option value="all">All stages</option>
              {pipelineStages.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <Select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setPage(0);
              }}
              className="h-9 w-[150px] text-[13px]"
            >
              <option value="all">All sources</option>
              {allSources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <span className="ml-auto text-xs text-ink-400 tnum">
              {filtered.length} lead{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          <Card className="overflow-hidden p-0">
            {rows.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon={Search}
                  title="No leads match"
                  text="Try a different search term or clear the stage and source filters."
                />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5">Lead</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="pr-5">Next follow-up</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((lead) => (
                    <TableRow key={lead.id} className="cursor-pointer" onClick={() => openLead(lead)}>
                      <TableCell className="pl-5">
                        <div className="text-[13px] font-semibold text-ink-900">{lead.name}</div>
                        <div className="text-[11px] text-ink-400 tnum">{lead.phone}</div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-[13px] text-ink-700">
                        {lead.treatment}
                      </TableCell>
                      <TableCell>
                        <StageBadge stage={lead.stage} className="px-2 py-0 text-[10.5px]" />
                      </TableCell>
                      <TableCell>
                        <SourceBadge source={lead.source} className="px-2 py-0 text-[10.5px]" />
                      </TableCell>
                      <TableCell className="text-right font-medium tnum">
                        {inr(lead.value, true)}
                      </TableCell>
                      <TableCell>
                        <ScoreDot score={lead.score} withLabel />
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-[13px] text-ink-500">
                        {lead.owner.split(" ")[0]}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-[12.5px] text-ink-500 tnum">
                        {formatDate(lead.createdAt)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap pr-5 text-[12.5px] text-ink-500">
                        {lead.nextFollowUp ? (
                          <span className="font-medium text-amber-700">{daysUntil(lead.nextFollowUp)}</span>
                        ) : (
                          <span className="text-ink-300">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {filtered.length > PAGE_SIZE && (
              <div className="flex items-center justify-between border-t border-ink-100 px-5 py-3">
                <span className="text-xs text-ink-400 tnum">
                  Showing {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    disabled={safePage === 0}
                    onClick={() => setPage(safePage - 1)}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <span className="px-2 text-xs font-medium text-ink-700 tnum">
                    {safePage + 1} / {pageCount}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    disabled={safePage >= pageCount - 1}
                    onClick={() => setPage(safePage + 1)}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <LeadDrawer lead={selected} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}
