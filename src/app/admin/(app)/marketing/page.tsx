"use client";

import * as React from "react";
import {
  IndianRupee,
  Users,
  TrendingUp,
  Sparkles,
  Download,
  MousePointerClick,
  CalendarCheck,
} from "lucide-react";
import { StatCard, PageHeader, ChartCard } from "@/components/admin/widgets";
import { LineChart, BarChart, DonutChart } from "@/components/charts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn, inr, pct, formatDate } from "@/lib/utils";
import {
  campaigns,
  marketingKpis,
  gaSummary,
  visitorsSeries,
  trafficSources,
  topLandingPages,
  topServices,
} from "@/lib/data/marketing";
import type { Campaign } from "@/lib/data/types";

function campaignMetrics(c: Campaign) {
  return {
    ctr: (c.clicks / c.impressions) * 100,
    cpc: c.spend / c.clicks,
    cpm: (c.spend / c.impressions) * 1000,
    cpl: c.spend / c.leads,
    roas: c.revenue / c.spend,
  };
}

function statusVariant(status: Campaign["status"]) {
  return status === "Active" ? "good" : status === "Paused" ? "warning" : "secondary";
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="flex items-center justify-between px-4 py-3">
      <span className="text-[12.5px] font-medium text-ink-400">{label}</span>
      <span className="text-[15px] font-semibold text-ink-900 tnum">{value}</span>
    </Card>
  );
}

function CampaignDialog({
  campaign,
  onClose,
}: {
  campaign: Campaign | null;
  onClose: () => void;
}) {
  if (!campaign) return null;
  const m = campaignMetrics(campaign);
  const cells: { label: string; value: string }[] = [
    { label: "Spend", value: inr(campaign.spend) },
    { label: "Revenue", value: inr(campaign.revenue) },
    { label: "ROAS", value: `${m.roas.toFixed(1)}×` },
    { label: "Reach", value: campaign.reach.toLocaleString("en-IN") },
    { label: "Impressions", value: campaign.impressions.toLocaleString("en-IN") },
    { label: "Clicks", value: campaign.clicks.toLocaleString("en-IN") },
    { label: "CTR", value: pct(m.ctr, 2) },
    { label: "CPC", value: inr(Math.round(m.cpc)) },
    { label: "CPM", value: inr(Math.round(m.cpm)) },
    { label: "Cost / Lead", value: inr(Math.round(m.cpl)) },
  ];
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{campaign.name}</DialogTitle>
            <Badge variant={statusVariant(campaign.status)}>{campaign.status}</Badge>
          </div>
          <DialogDescription>
            {campaign.platform} · {campaign.objective} · started {formatDate(campaign.startDate)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {cells.map((c) => (
            <div key={c.label} className="rounded-xl bg-ink-50/70 px-3.5 py-2.5">
              <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
                {c.label}
              </div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900 tnum">{c.value}</div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="mb-2 text-[13px] font-semibold text-ink-900">Campaign funnel</h4>
          <BarChart
            height={150}
            horizontal
            labels={["Leads", "Qualified", "Appointments"]}
            series={[
              {
                label: "Count",
                data: [campaign.leads, campaign.qualifiedLeads, campaign.appointments],
              },
            ]}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MarketingPage() {
  const [selected, setSelected] = React.useState<Campaign | null>(null);
  const maxRate = Math.max(...topLandingPages.map((p) => p.rate));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Marketing"
        description="Campaign performance and website analytics · last 30 days"
        actions={
          <Button variant="ghost" size="sm" className="h-9">
            <Download className="size-3.5" /> Export report
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Ad Spend (30d)"
          value={inr(marketingKpis.spend30d, true)}
          delta={6.2}
          icon={IndianRupee}
          deltaPositiveIsGood={false}
        />
        <StatCard label="Leads (30d)" value={String(marketingKpis.leads30d)} delta={11.4} icon={Users} />
        <StatCard
          label="Revenue Attributed"
          value={inr(marketingKpis.revenue30d, true)}
          delta={14.2}
          icon={TrendingUp}
        />
        <StatCard label="ROAS" value={`${marketingKpis.roas.toFixed(1)}×`} delta={4.8} icon={Sparkles} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <MiniStat label="Cost / Lead" value={inr(marketingKpis.cpl)} />
        <MiniStat label="Qualified Leads" value={String(marketingKpis.qualified30d)} />
        <MiniStat label="Appointments Booked" value={String(marketingKpis.appointments30d)} />
      </div>

      {/* Campaign table */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <div>
            <h3 className="text-[14.5px] font-semibold text-ink-900">Campaign performance</h3>
            <p className="mt-0.5 text-xs text-ink-400">
              {campaigns.length} campaigns · click a row for full details
            </p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Spend</TableHead>
              <TableHead className="text-right">Reach</TableHead>
              <TableHead className="text-right">Impr.</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right">CPC</TableHead>
              <TableHead className="text-right">CPM</TableHead>
              <TableHead className="text-right">Leads</TableHead>
              <TableHead className="text-right">Qual.</TableHead>
              <TableHead className="text-right">Appts</TableHead>
              <TableHead className="text-right">CPL</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="pr-5 text-right">ROAS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((c) => {
              const m = campaignMetrics(c);
              return (
                <TableRow
                  key={c.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(c)}
                >
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-2">
                      <span className="whitespace-nowrap text-[13px] font-semibold text-ink-900">
                        {c.name}
                      </span>
                      <Badge variant={c.platform === "Meta" ? "blue" : "warning"} className="px-2 py-0 text-[10.5px]">
                        {c.platform}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(c.status)} className="px-2 py-0 text-[10.5px]">
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tnum">{inr(c.spend, true)}</TableCell>
                  <TableCell className="text-right text-ink-500 tnum">
                    {c.reach.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right text-ink-500 tnum">
                    {c.impressions.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right text-ink-500 tnum">
                    {c.clicks.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right tnum">{pct(m.ctr, 2)}</TableCell>
                  <TableCell className="text-right tnum">{inr(Math.round(m.cpc))}</TableCell>
                  <TableCell className="text-right tnum">{inr(Math.round(m.cpm))}</TableCell>
                  <TableCell className="text-right font-medium tnum">{c.leads}</TableCell>
                  <TableCell className="text-right text-ink-500 tnum">{c.qualifiedLeads}</TableCell>
                  <TableCell className="text-right text-ink-500 tnum">{c.appointments}</TableCell>
                  <TableCell className="text-right tnum">{inr(Math.round(m.cpl))}</TableCell>
                  <TableCell className="text-right font-medium tnum">{inr(c.revenue, true)}</TableCell>
                  <TableCell
                    className={cn(
                      "pr-5 text-right font-bold tnum",
                      m.roas >= 4 ? "text-emerald-700" : m.roas >= 3 ? "text-amber-700" : "text-red-700"
                    )}
                  >
                    {m.roas.toFixed(1)}×
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Google Analytics */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-[15px] font-semibold text-ink-900">Website analytics</h2>
          <Badge variant="secondary" className="text-[10.5px]">Google Analytics · 30 days</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MiniStat label="Visitors" value={gaSummary.visitors30d.toLocaleString("en-IN")} />
          <MiniStat label="Pageviews" value={gaSummary.pageviews30d.toLocaleString("en-IN")} />
          <MiniStat label="Avg session" value={gaSummary.avgSession} />
          <MiniStat label="Bounce rate" value={pct(gaSummary.bounceRate)} />
          <MiniStat label="New users" value={gaSummary.newUsers.toLocaleString("en-IN")} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <ChartCard
          title="Visitors & leads"
          subtitle="Daily · 20 Jun – 19 Jul"
          className="xl:col-span-2"
        >
          <LineChart
            height={260}
            labels={visitorsSeries.map((d) =>
              new Date(`${d.date}T12:00:00`).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })
            )}
            series={[
              { label: "Visitors", data: visitorsSeries.map((d) => d.visitors) },
              { label: "Leads", data: visitorsSeries.map((d) => d.leads) },
            ]}
          />
        </ChartCard>
        <ChartCard title="Traffic sources" subtitle="Share of sessions">
          <DonutChart
            height={260}
            labels={trafficSources.map((t) => t.source)}
            values={trafficSources.map((t) => t.pct)}
            valueFormat={(v) => `${v}%`}
            centerValue="8,420"
            centerLabel="visitors"
          />
        </ChartCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="overflow-hidden p-0 xl:col-span-2">
          <div className="px-5 pb-3 pt-5">
            <h3 className="text-[14.5px] font-semibold text-ink-900">Top landing pages</h3>
            <p className="mt-0.5 text-xs text-ink-400">By visits · conversion = enquiry or booking</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Page</TableHead>
                <TableHead className="text-right">Visits</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="w-[180px] pr-5">Conv. rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topLandingPages.map((p) => (
                <TableRow key={p.path}>
                  <TableCell className="pl-5">
                    <div className="text-[13px] font-medium text-ink-900">{p.title}</div>
                    <div className="text-[11px] text-ink-400">{p.path}</div>
                  </TableCell>
                  <TableCell className="text-right tnum">{p.visits.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right tnum">{p.conversions}</TableCell>
                  <TableCell className="pr-5">
                    <div className="flex items-center gap-2">
                      <Progress value={(p.rate / maxRate) * 100} className="flex-1" />
                      <span className="w-11 text-right text-xs font-semibold text-ink-900 tnum">
                        {pct(p.rate)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <ChartCard title="Top service pages" subtitle="Views · last 30 days">
          <BarChart
            height={280}
            horizontal
            labels={topServices.map((s) => s.name)}
            series={[{ label: "Views", data: topServices.map((s) => s.views) }]}
          />
          <div className="mt-3 flex items-center gap-4 text-[11px] text-ink-400">
            <span className="inline-flex items-center gap-1">
              <MousePointerClick className="size-3" />
              211 bookings from service pages
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarCheck className="size-3" />
              Implants convert best at 1.8%
            </span>
          </div>
        </ChartCard>
      </div>

      <CampaignDialog campaign={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
