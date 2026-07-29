"use client";

import * as React from "react";
import {
  GraduationCap, Users, IndianRupee, BookOpen, Search, Star, Award, AlertTriangle,
  Phone, MapPin,
} from "lucide-react";
import { ChartCard, PageHeader, StatCard } from "@/components/admin/widgets";
import { BarChart } from "@/components/charts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { courses, studentLeads } from "@/lib/data/courses";
import { doctors, staff } from "@/lib/data/people";
import type { StudentLead } from "@/lib/data/types";
import { cn, formatDate, initials, inr } from "@/lib/utils";

const stageVariant: Record<StudentLead["stage"], "secondary" | "blue" | "violet" | "default" | "good" | "warning" | "critical"> = {
  Enquiry: "secondary",
  Application: "blue",
  Interview: "violet",
  Admitted: "default",
  "Payment Done": "good",
  Completed: "good",
  Dropped: "critical",
};

/** Static fees-collected-by-month series (₹), Feb–Jul 2026. */
const feesByMonth = {
  labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  data: [185000, 240000, 310000, 365000, 425000, 512000],
};

export default function CoursesAdminPage() {
  const [stageFilter, setStageFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");

  const admissions = studentLeads.filter((l) =>
    l.stage === "Admitted" || l.stage === "Payment Done" || l.stage === "Completed"
  );
  const feesCollected = studentLeads.reduce((sum, l) => sum + l.feePaid, 0);

  const filteredLeads = studentLeads.filter((l) => {
    if (stageFilter !== "all" && l.stage !== stageFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!l.name.toLowerCase().includes(q) && !l.course.toLowerCase().includes(q) && !l.city.toLowerCase().includes(q))
        return false;
    }
    return true;
  });

  const kanbanColumns: { title: string; sub: string; leads: StudentLead[] }[] = [
    {
      title: "Enquiry",
      sub: "New interest",
      leads: studentLeads.filter((l) => l.stage === "Enquiry"),
    },
    {
      title: "Application / Interview",
      sub: "In process",
      leads: studentLeads.filter((l) => l.stage === "Application" || l.stage === "Interview"),
    },
    {
      title: "Admitted",
      sub: "Confirmed seats",
      leads: studentLeads.filter((l) => l.stage === "Admitted" || l.stage === "Payment Done"),
    },
  ];

  const payments = studentLeads.filter((l) => l.feePaid > 0);
  const totalPaid = payments.reduce((s, l) => s + l.feePaid, 0);
  const totalBalance = payments.reduce((s, l) => s + (l.feeTotal - l.feePaid), 0);

  const completed = studentLeads.filter((l) => l.stage === "Completed");
  const attendanceList = admissions
    .filter((l) => l.attendancePct !== undefined)
    .sort((a, b) => (a.attendancePct ?? 0) - (b.attendancePct ?? 0));

  const faculty = [
    { name: doctors[0].name, role: doctors[0].role, courses: ["Dental Assistant Training", "Advanced Implant Course", "Clinical Internship"] },
    { name: doctors[1].name, role: doctors[1].role, courses: ["Dental Photography", "Clear Aligner Workshop", "Smile Design Workshop"] },
    { name: staff[0].name, role: staff[0].role, courses: ["Reception & Practice Management", "Front Desk Bootcamp"] },
  ];

  return (
    <div>
      <PageHeader
        title="CareWell Academy"
        description="Courses, admissions, payments and batches — the training wing at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Student leads" value={String(studentLeads.length)} icon={Users} delta={8.2} />
        <StatCard label="Admissions" value={String(admissions.length)} icon={GraduationCap} delta={5.1} />
        <StatCard label="Fees collected" value={inr(feesCollected, true)} icon={IndianRupee} delta={11.4} />
        <StatCard label="Active courses" value={String(courses.length)} icon={BookOpen} />
      </div>

      <Tabs defaultValue="leads" className="mt-6">
        <TabsList className="max-w-full flex-wrap sm:h-9 h-auto py-1">
          <TabsTrigger value="leads">Student Leads</TabsTrigger>
          <TabsTrigger value="admissions">Applications &amp; Admissions</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
        </TabsList>

        {/* ------------- Student leads ------------- */}
        <TabsContent value="leads">
          <Card className="p-5">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative min-w-52 flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
                <Input
                  placeholder="Search by name, course or city…"
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Select
                className="w-full sm:w-48"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                aria-label="Filter by stage"
              >
                <option value="all">All stages</option>
                {(["Enquiry", "Application", "Interview", "Admitted", "Payment Done", "Completed", "Dropped"] as const).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
            <p className="mb-2 text-xs text-ink-400 tnum">{filteredLeads.length} of {studentLeads.length} leads</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Fees</TableHead>
                  <TableHead>Batch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="whitespace-nowrap font-medium text-ink-900">{l.name}</TableCell>
                    <TableCell className="whitespace-nowrap text-ink-500 tnum">{l.phone}</TableCell>
                    <TableCell className="whitespace-nowrap text-ink-500">{l.city}</TableCell>
                    <TableCell className="max-w-56 truncate" title={l.course}>{l.course}</TableCell>
                    <TableCell>
                      <Badge variant={stageVariant[l.stage]}>{l.stage}</Badge>
                    </TableCell>
                    <TableCell className="min-w-36">
                      <div className="flex items-center gap-2">
                        <Progress value={l.feeTotal ? (l.feePaid / l.feeTotal) * 100 : 0} className="w-16" />
                        <span className="whitespace-nowrap text-xs text-ink-500 tnum">
                          {inr(l.feePaid, true)} / {inr(l.feeTotal, true)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-ink-500">{l.batch}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ------------- Admissions kanban ------------- */}
        <TabsContent value="admissions">
          <div className="grid gap-4 lg:grid-cols-3">
            {kanbanColumns.map((col) => (
              <div key={col.title} className="rounded-2xl bg-ink-50/70 p-3 ring-hairline">
                <div className="mb-3 flex items-center justify-between px-1.5">
                  <div>
                    <p className="text-[13.5px] font-semibold text-ink-900">{col.title}</p>
                    <p className="text-[11px] text-ink-400">{col.sub}</p>
                  </div>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-ink-700 ring-hairline tnum">
                    {col.leads.length}
                  </span>
                </div>
                <div className="max-h-[520px] space-y-2 overflow-y-auto scroll-thin pr-0.5">
                  {col.leads.map((l) => (
                    <Card key={l.id} className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13px] font-semibold text-ink-900">{l.name}</p>
                        <Badge variant={stageVariant[l.stage]} className="shrink-0">{l.stage}</Badge>
                      </div>
                      <p className="mt-1 line-clamp-1 text-xs text-ink-500" title={l.course}>{l.course}</p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-400">
                        <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{l.city}</span>
                        <span className="inline-flex items-center gap-1 tnum"><Phone className="size-3" />{l.phone.slice(0, 10)}…</span>
                        <span className="ml-auto tnum">{formatDate(l.createdAt)}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ------------- Courses ------------- */}
        <TabsContent value="courses">
          <Card className="p-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Enrolment</TableHead>
                  <TableHead>Next batch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((c) => (
                  <TableRow key={c.slug}>
                    <TableCell className="max-w-72">
                      <span className="flex items-center gap-1.5 font-medium text-ink-900">
                        {c.featured && <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />}
                        <span className="truncate" title={c.name}>{c.name}</span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={c.level === "Advanced" ? "violet" : c.level === "Intermediate" ? "blue" : "secondary"}>
                        {c.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-ink-500">{c.mode}</TableCell>
                    <TableCell className="whitespace-nowrap text-ink-500">{c.duration}</TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-ink-900 tnum">{inr(c.fee)}</TableCell>
                    <TableCell className="min-w-36">
                      <div className="flex items-center gap-2">
                        <Progress value={(c.enrolled / c.seats) * 100} className="w-16" />
                        <span className="text-xs text-ink-500 tnum">{c.enrolled}/{c.seats}</span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-ink-500 tnum">{c.nextBatch}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ------------- Payments ------------- */}
        <TabsContent value="payments">
          <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
            <Card className="p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((l) => {
                    const balance = l.feeTotal - l.feePaid;
                    return (
                      <TableRow key={l.id}>
                        <TableCell className="whitespace-nowrap font-medium text-ink-900">{l.name}</TableCell>
                        <TableCell className="max-w-56 truncate text-ink-500" title={l.course}>{l.course}</TableCell>
                        <TableCell className="whitespace-nowrap text-right tnum">{inr(l.feePaid)}</TableCell>
                        <TableCell className={cn("whitespace-nowrap text-right tnum", balance > 0 ? "text-amber-700" : "text-ink-400")}>
                          {balance > 0 ? inr(balance) : "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={balance === 0 ? "good" : "warning"}>
                            {balance === 0 ? "Fully paid" : "Partial"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className="bg-ink-50/60 font-semibold hover:bg-ink-50/60">
                    <TableCell colSpan={2} className="text-ink-900">Totals · {payments.length} paying students</TableCell>
                    <TableCell className="whitespace-nowrap text-right text-ink-900 tnum">{inr(totalPaid)}</TableCell>
                    <TableCell className="whitespace-nowrap text-right text-amber-700 tnum">{inr(totalBalance)}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <ChartCard title="Fees collected by month" subtitle="Feb – Jul 2026 · all courses">
              <BarChart
                labels={feesByMonth.labels}
                series={[{ label: "Fees collected", data: feesByMonth.data }]}
                valueFormat={(v) => inr(v, true)}
                height={260}
              />
            </ChartCard>
          </div>
        </TabsContent>

        {/* ------------- Certificates ------------- */}
        <TabsContent value="certificates">
          <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
            <Card className="p-5">
              <h3 className="text-[14.5px] font-semibold text-ink-900">Completed students</h3>
              <p className="mt-0.5 text-xs text-ink-400">Eligible for certificate issue</p>
              <div className="mt-4 space-y-3">
                {completed.map((l) => (
                  <div key={l.id} className="flex items-center gap-3 rounded-xl border border-ink-100 p-3">
                    <Avatar className="size-9">
                      <AvatarFallback>{initials(l.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-semibold text-ink-900">{l.name}</p>
                      <p className="truncate text-xs text-ink-500">{l.course} · Batch {l.batch}</p>
                    </div>
                    <Badge variant="good"><Award /> Certified</Badge>
                  </div>
                ))}
                {completed.length === 0 && <p className="text-sm text-ink-400">No completed students yet.</p>}
              </div>
            </Card>

            {/* Certificate preview */}
            <Card className="p-5">
              <h3 className="mb-4 text-[14.5px] font-semibold text-ink-900">Certificate preview</h3>
              <div className="rounded-lg border-4 border-double border-amber-500/60 bg-gradient-to-b from-amber-50/40 to-white p-6 text-center">
                <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-brand-700 text-white">
                  <GraduationCap className="size-5" />
                </span>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700">CareWell Academy</p>
                <p className="mt-2 text-lg font-bold tracking-tight text-ink-900">Certificate of Completion</p>
                <p className="mt-3 text-xs text-ink-500">This is to certify that</p>
                <p className="mt-1 border-b border-ink-200 pb-1 text-[15px] font-semibold italic text-ink-900">
                  {completed[0]?.name ?? "Student Name"}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  has successfully completed the<br />
                  <span className="font-medium text-ink-700">{completed[0]?.course ?? "Course Name"}</span>
                </p>
                <div className="mt-5 flex items-end justify-between text-[10px] text-ink-400">
                  <span className="border-t border-ink-300 px-2 pt-1">Dr. Smriti Sharma<br />Director</span>
                  <Award className="size-6 text-amber-500" />
                  <span className="border-t border-ink-300 px-2 pt-1">Priya Sharma<br />Registrar</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ------------- Attendance ------------- */}
        <TabsContent value="attendance">
          <Card className="p-5">
            <h3 className="text-[14.5px] font-semibold text-ink-900">Attendance — admitted &amp; enrolled students</h3>
            <p className="mt-0.5 text-xs text-ink-400">Students below 75% are flagged for follow-up</p>
            <div className="mt-4 space-y-2.5">
              {attendanceList.map((l) => {
                const pct = l.attendancePct ?? 0;
                const low = pct < 75;
                return (
                  <div key={l.id} className="flex items-center gap-3 rounded-xl border border-ink-100 px-3 py-2.5">
                    <div className="w-48 min-w-0">
                      <p className="truncate text-[13px] font-medium text-ink-900">{l.name}</p>
                      <p className="truncate text-[11px] text-ink-400">{l.batch} · {l.course}</p>
                    </div>
                    <Progress
                      value={pct}
                      className="flex-1"
                      indicatorClassName={low ? "bg-amber-500" : undefined}
                    />
                    <span className={cn("w-11 text-right text-[13px] font-semibold tnum", low ? "text-amber-700" : "text-ink-700")}>
                      {pct}%
                    </span>
                    {low ? (
                      <Badge variant="warning" className="shrink-0"><AlertTriangle /> Low</Badge>
                    ) : (
                      <span className="w-[52px] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* ------------- Faculty ------------- */}
        <TabsContent value="faculty">
          <div className="grid gap-4 md:grid-cols-3">
            {faculty.map((f) => (
              <Card key={f.name} className="p-5">
                <div className="flex items-center gap-3">
                  <Avatar className="size-11">
                    <AvatarFallback>{initials(f.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[14.5px] font-semibold text-ink-900">{f.name}</p>
                    <p className="text-xs text-ink-500">{f.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-ink-400">Courses taught</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {f.courses.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
