"use client";

import * as React from "react";
import { Download, Printer, Star } from "lucide-react";
import { ChartCard, PageHeader } from "@/components/admin/widgets";
import { BarChart, DonutChart, LineChart } from "@/components/charts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  campaigns, funnel30d, revenueByMonth, treatmentRevenueSplit, visitorsSeries,
} from "@/lib/data/marketing";
import { doctors } from "@/lib/data/people";
import { inr } from "@/lib/utils";

type Period = "daily" | "weekly" | "monthly";

/* ---------------- Static, deterministic report series ---------------- */

const DOW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
/** Monthly appointment volume by day of week (Sat busiest, Sun half-day). */
const APPTS_MONTHLY = [96, 88, 92, 84, 102, 138, 42];

const MONTH_LABELS = revenueByMonth.map((m) => m.month);

/** New vs returning patients per month (sums to revenueByMonth patients, sensible split). */
const NEW_PATIENTS = revenueByMonth.map((m) => Math.round(m.patients * 0.38));
const RETURNING_PATIENTS = revenueByMonth.map((m, i) => m.patients - NEW_PATIENTS[i]);

/** Course fees collected by month (₹) — static series. */

/** Doctor comparison — static sensible values for the current period scale. */
const doctorRows = [
  { doctor: doctors[0], appointments: 118, revenue: 585000, rating: doctors[0].rating },
  { doctor: doctors[1], appointments: 104, revenue: 305000, rating: doctors[1].rating },
];

const periodMeta: Record<Period, { label: string; divisor: number; sub: string }> = {
  daily: { label: "Daily", divisor: 26, sub: "avg per working day" },
  weekly: { label: "Weekly", divisor: 4.3, sub: "avg per week" },
  monthly: { label: "Monthly", divisor: 1, sub: "per month" },
};

/** Derive an 8-week revenue series deterministically from the last 2 months. */
const WEEKLY_REVENUE = (() => {
  const jun = revenueByMonth[10].revenue;
  const may = revenueByMonth[9].revenue;
  const weights = [0.23, 0.24, 0.26, 0.27];
  return [
    ...weights.map((w) => Math.round((may * w) / 1000) * 1000),
    ...weights.map((w) => Math.round((jun * w) / 1000) * 1000),
  ];
})();
const WEEKLY_LABELS = ["W1 May", "W2 May", "W3 May", "W4 May", "W1 Jun", "W2 Jun", "W3 Jun", "W4 Jun"];

/** Daily revenue: last 14 days derived from visitor pattern × avg ticket. */
const last14 = visitorsSeries.slice(-14);
const DAILY_REVENUE = last14.map((d) => Math.round((d.visitors * 112) / 500) * 500);
const DAILY_LABELS = last14.map((d) => `${Number(d.date.slice(8))} ${d.date.slice(5, 7) === "07" ? "Jul" : "Jun"}`);

function csvEscape(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function ReportsPage() {
  const [period, setPeriod] = React.useState<Period>("monthly");
  const meta = periodMeta[period];
  const scale = (n: number) => Math.round(n / meta.divisor);

  const apptSeries = APPTS_MONTHLY.map(scale);

  const exportCsv = () => {
    const lines: string[] = [];
    lines.push(`CareWell Dental Clinic — ${meta.label} Report`);
    lines.push(`Generated,2026-07-19`);
    lines.push("");
    lines.push("Revenue by month (Aug 2025 - Jul 2026)");
    lines.push("Month,Revenue (INR),Target (INR),Patients");
    revenueByMonth.forEach((m) => lines.push([m.month, m.revenue, m.target, m.patients].map(csvEscape).join(",")));
    lines.push("");
    lines.push("Appointments by day of week");
    lines.push(`Day,Appointments (${meta.sub})`);
    DOW_LABELS.forEach((d, i) => lines.push(`${d},${apptSeries[i]}`));
    lines.push("");
    lines.push("Doctor comparison");
    lines.push("Doctor,Appointments,Revenue (INR),Rating");
    doctorRows.forEach((r) =>
      lines.push([r.doctor.name, scale(r.appointments), scale(r.revenue), r.rating].map(csvEscape).join(","))
    );
    lines.push("");
    lines.push("Lead conversion funnel (30 days)");
    lines.push("Stage,Count");
    funnel30d.forEach((f) => lines.push(`${csvEscape(f.stage)},${f.n}`));
    lines.push("");
    lines.push("Campaign performance");
    lines.push("Campaign,Platform,Status,Spend (INR),Leads,Appointments,Revenue (INR),ROAS");
    campaigns.forEach((c) =>
      lines.push(
        [c.name, c.platform, c.status, c.spend, c.leads, c.appointments, c.revenue, (c.revenue / c.spend).toFixed(1)]
          .map(csvEscape)
          .join(",")
      )
    );
    lines.push("");
    lines.push("Treatment revenue mix (%)");
    lines.push("Treatment,Share");
    treatmentRevenueSplit.forEach((t) => lines.push(`${csvEscape(t.name)},${t.value}`));

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Hide app chrome when printing this report */}
      <style>{`@media print {
        aside, header { display: none !important; }
        main { padding: 0 !important; }
        [class*="pl-60"] { padding-left: 0 !important; }
      }`}</style>

      {/* Print-only report header */}
      <div className="mb-6 hidden border-b-2 border-ink-900 pb-3 print:block">
        <p className="text-lg font-bold">CareWell Dental Clinic — {meta.label} Report</p>
        <p className="text-xs text-ink-500">Generated 19 Jul 2026 · CareWell Dental Clinic</p>
      </div>

      <div className="no-print">
        <PageHeader
          title="Reports"
          description="Clinic performance across appointments, revenue and marketing."
          actions={
            <>
              <Button variant="secondary" onClick={exportCsv}>
                <Download /> Export Excel (CSV)
              </Button>
              <Button onClick={() => window.print()}>
                <Printer /> Print / Save as PDF
              </Button>
            </>
          }
        />
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)} className="mb-6">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Appointments */}
        <ChartCard title="Appointments" subtitle={`By day of week · ${meta.sub}`}>
          <BarChart labels={DOW_LABELS} series={[{ label: "Appointments", data: apptSeries }]} height={240} />
        </ChartCard>

        {/* Revenue */}
        <ChartCard
          title="Revenue"
          subtitle={
            period === "daily"
              ? "Last 14 days · derived from visit volume × avg ticket"
              : period === "weekly"
                ? "Last 8 weeks"
                : "Aug 2025 – Jul 2026 vs target"
          }
        >
          {period === "daily" ? (
            <LineChart
              labels={DAILY_LABELS}
              series={[{ label: "Revenue", data: DAILY_REVENUE }]}
              valueFormat={(v) => inr(v, true)}
              height={240}
            />
          ) : period === "weekly" ? (
            <LineChart
              labels={WEEKLY_LABELS}
              series={[{ label: "Revenue", data: WEEKLY_REVENUE }]}
              valueFormat={(v) => inr(v, true)}
              height={240}
            />
          ) : (
            <LineChart
              labels={MONTH_LABELS}
              series={[
                { label: "Revenue", data: revenueByMonth.map((m) => m.revenue) },
                { label: "Target", data: revenueByMonth.map((m) => m.target) },
              ]}
              valueFormat={(v) => inr(v, true)}
              height={240}
            />
          )}
        </ChartCard>

        {/* Treatment mix */}
        <ChartCard title="Treatments mix" subtitle="Share of revenue by treatment">
          <DonutChart
            labels={treatmentRevenueSplit.map((t) => t.name)}
            values={treatmentRevenueSplit.map((t) => t.value)}
            valueFormat={(v) => `${v}%`}
            centerValue="6"
            centerLabel="categories"
            height={240}
          />
        </ChartCard>

        {/* Doctors */}
        <Card className="p-5">
          <h3 className="text-[14.5px] font-semibold text-ink-900">Doctors</h3>
          <p className="mt-0.5 text-xs text-ink-400">Performance comparison · {meta.sub}</p>
          <Table className="mt-3">
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead className="text-right">Appointments</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorRows.map((r) => (
                <TableRow key={r.doctor.id}>
                  <TableCell>
                    <p className="font-medium text-ink-900">{r.doctor.name}</p>
                    <p className="text-xs text-ink-400">{r.doctor.role}</p>
                  </TableCell>
                  <TableCell className="text-right font-medium tnum">{scale(r.appointments)}</TableCell>
                  <TableCell className="text-right font-medium tnum">{inr(scale(r.revenue), true)}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1 font-medium tnum">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      {r.rating.toFixed(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Patients */}
        <ChartCard title="Patients" subtitle="New vs returning per month">
          <BarChart
            labels={MONTH_LABELS}
            series={[
              { label: "New", data: NEW_PATIENTS },
              { label: "Returning", data: RETURNING_PATIENTS },
            ]}
            stacked
            height={240}
          />
        </ChartCard>

        {/* Lead conversion */}
        <ChartCard title="Lead conversion" subtitle="Funnel · last 30 days">
          <BarChart
            labels={funnel30d.map((f) => f.stage)}
            series={[{ label: "Count", data: funnel30d.map((f) => f.n) }]}
            horizontal
            height={240}
          />
        </ChartCard>

        {/* Marketing */}
        <ChartCard title="Marketing" subtitle="Campaign spend vs attributed revenue">
          <BarChart
            labels={campaigns.map((c) => c.name)}
            series={[
              { label: "Spend", data: campaigns.map((c) => c.spend) },
              { label: "Revenue", data: campaigns.map((c) => c.revenue) },
            ]}
            valueFormat={(v) => inr(v, true)}
            height={240}
          />
        </ChartCard>

      </div>
    </div>
  );
}
