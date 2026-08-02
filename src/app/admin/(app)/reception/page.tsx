"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserCheck,
  CheckCircle2,
  IndianRupee,
  LogIn,
  LogOut,
  BellRing,
  Clock,
} from "lucide-react";
import { StatCard, PageHeader } from "@/components/admin/widgets";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn, inr, initials } from "@/lib/utils";
import { todayAppointments, weekAppointments } from "@/lib/data/appointments";
import { patients, findDoctor } from "@/lib/data/people";
import type { Appointment, AppointmentStatus } from "@/lib/data/types";
import { AppointmentBadge, BillingBadge, SourceBadge } from "@/components/admin/status-badges";

type QueueColumn = "waiting" | "treatment" | "done";

function columnFor(status: AppointmentStatus): QueueColumn | null {
  if (status === "Confirmed" || status === "Pending") return "waiting";
  if (status === "Checked In" || status === "In Chair") return "treatment";
  if (status === "Completed") return "done";
  return null;
}

const calendarDays = [
  { date: "2026-07-19", label: "Sun", day: 19 },
  { date: "2026-07-20", label: "Mon", day: 20 },
  { date: "2026-07-21", label: "Tue", day: 21 },
  { date: "2026-07-22", label: "Wed", day: 22 },
  { date: "2026-07-23", label: "Thu", day: 23 },
  { date: "2026-07-24", label: "Fri", day: 24 },
  { date: "2026-07-25", label: "Sat", day: 25 },
];

function QueueCard({
  apt,
  column,
  onCheckIn,
  onCheckOut,
}: {
  apt: Appointment;
  column: QueueColumn;
  onCheckIn: () => void;
  onCheckOut: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl bg-white p-3.5 ring-hairline shadow-[0_1px_2px_rgba(10,15,14,0.04)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="text-[10px]">{initials(apt.patientName)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-[13px] font-semibold text-ink-900">{apt.patientName}</div>
            <div className="text-[11px] text-ink-400 tnum">
              {apt.time} · {findDoctor(apt.doctorId)?.name.replace("Dr. ", "Dr ")}
            </div>
          </div>
        </div>
        <AppointmentBadge status={apt.status} className="px-2 py-0 text-[10px]" />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="truncate text-[12px] text-ink-500">{apt.treatment}</span>
        <BillingBadge status={apt.billing.status} />
      </div>
      {column !== "done" && (
        <div className="mt-2.5 flex justify-end">
          {column === "waiting" ? (
            <Button size="sm" variant="secondary" className="h-7 text-[11.5px]" onClick={onCheckIn}>
              <LogIn className="size-3" /> Check in
            </Button>
          ) : (
            <Button size="sm" variant="secondary" className="h-7 text-[11.5px]" onClick={onCheckOut}>
              <LogOut className="size-3" /> Check out
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function ReceptionPage() {
  const [statuses, setStatuses] = React.useState<Record<string, AppointmentStatus>>(() =>
    Object.fromEntries(todayAppointments.map((a) => [a.id, a.status]))
  );
  const [selectedDay, setSelectedDay] = React.useState("2026-07-19");

  // Website bookings — local (this browser) + central (Supabase)
  const [chatAppts, setChatAppts] = React.useState<Appointment[]>([]);
  React.useEffect(() => {
    Promise.all([
      import("@/lib/chat-leads").then((m) => m.readChatAppointments()),
      import("@/lib/central-leads").then(async (m) => {
        const rows = await m.fetchCentralRows();
        return rows.map(m.rowToAppointment).filter((a): a is Appointment => a !== null);
      }),
    ]).then(([local, central]) => {
      const localPhones = new Set(local.map((a) => a.phone.replace(/\D/g, "")));
      setChatAppts([...central.filter((a) => !localPhones.has(a.phone.replace(/\D/g, ""))), ...local]);
    });
  }, []);

  const allToday = [...chatAppts.filter((a) => a.date === "2026-07-19"), ...todayAppointments];
  const queue = allToday.map((a) => ({ ...a, status: statuses[a.id] ?? a.status }));
  const columns: { key: QueueColumn; title: string; hint: string; accent: string; items: Appointment[] }[] = [
    {
      key: "waiting",
      title: "Waiting",
      hint: "Confirmed & pending",
      accent: "bg-amber-500",
      items: queue.filter((a) => columnFor(a.status) === "waiting"),
    },
    {
      key: "treatment",
      title: "In Treatment",
      hint: "Checked in & in chair",
      accent: "bg-brand-600",
      items: queue.filter((a) => columnFor(a.status) === "treatment"),
    },
    {
      key: "done",
      title: "Done",
      hint: "Completed today",
      accent: "bg-emerald-500",
      items: queue.filter((a) => columnFor(a.status) === "done"),
    },
  ];

  const checkedIn = columns[1].items.length;
  const completed = columns[2].items.length;
  const dueList = patients.filter((p) => p.outstanding > 0).sort((a, b) => b.outstanding - a.outstanding);
  const pendingSum = dueList.reduce((s, p) => s + p.outstanding, 0);

  const dayAppointments = (selectedDay === "2026-07-19" ? queue : [...chatAppts, ...weekAppointments]).filter(
    (a) => a.date === selectedDay
  );
  const countFor = (date: string) =>
    (date === "2026-07-19" ? allToday.length : weekAppointments.filter((a) => a.date === date).length) +
    (date === "2026-07-19" ? 0 : chatAppts.filter((a) => a.date === date).length);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Reception"
        description="Front-desk live queue, this week's bookings and pending payments"
        actions={
          <Badge variant="secondary" className="h-7 px-3">
            <Clock className="size-3" /> Sunday hours · 10 AM – 2 PM
          </Badge>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Queue" value={String(queue.length)} deltaLabel="appointments booked" icon={Users} />
        <StatCard label="Checked In" value={String(checkedIn)} deltaLabel="currently in clinic" icon={UserCheck} />
        <StatCard label="Completed" value={String(completed)} deltaLabel="visits done today" icon={CheckCircle2} />
        <StatCard
          label="Pending Payments"
          value={inr(pendingSum)}
          deltaLabel={`${dueList.length} patients`}
          icon={IndianRupee}
        />
      </div>

      {/* Live queue board */}
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => (
          <div key={col.key} className="rounded-2xl bg-ink-50/70 p-3">
            <div className="mb-2.5 flex items-center justify-between px-1.5">
              <span className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", col.accent)} />
                <span className="text-[13px] font-semibold text-ink-900">{col.title}</span>
                <span className="rounded-full bg-white px-1.5 py-0.5 text-[10.5px] font-semibold text-ink-500 ring-hairline tnum">
                  {col.items.length}
                </span>
              </span>
              <span className="text-[11px] text-ink-400">{col.hint}</span>
            </div>
            <div className="min-h-[80px] space-y-2">
              <AnimatePresence mode="popLayout">
                {col.items.map((apt) => (
                  <QueueCard
                    key={apt.id}
                    apt={apt}
                    column={col.key}
                    onCheckIn={() => setStatuses((s) => ({ ...s, [apt.id]: "Checked In" }))}
                    onCheckOut={() => setStatuses((s) => ({ ...s, [apt.id]: "Completed" }))}
                  />
                ))}
              </AnimatePresence>
              {col.items.length === 0 && (
                <div className="rounded-xl border border-dashed border-ink-200 py-6 text-center text-[11.5px] text-ink-400">
                  Nobody here right now
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* Week table + calendar strip */}
        <Card className="overflow-hidden p-0 xl:col-span-2">
          <div className="px-5 pb-4 pt-5">
            <h3 className="text-[14.5px] font-semibold text-ink-900">Appointments · 19 – 25 July</h3>
            <p className="mt-0.5 text-xs text-ink-400">Pick a day to filter the schedule</p>
            <div className="mt-3 grid grid-cols-7 gap-1.5">
              {calendarDays.map((d) => {
                const active = selectedDay === d.date;
                const count = countFor(d.date);
                return (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDay(d.date)}
                    className={cn(
                      "rounded-xl px-1 py-2 text-center transition-colors",
                      active
                        ? "bg-brand-700 text-white shadow-soft"
                        : "bg-ink-50/70 text-ink-900 hover:bg-ink-100"
                    )}
                  >
                    <div className={cn("text-[10px] font-medium", active ? "text-brand-100" : "text-ink-400")}>
                      {d.label}
                    </div>
                    <div className="text-[14px] font-semibold tnum">{d.day}</div>
                    <div className={cn("text-[10px] font-medium tnum", active ? "text-brand-100" : "text-ink-400")}>
                      {count} apts
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="pr-5">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dayAppointments.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="py-8 text-center text-[13px] text-ink-400">
                    No appointments on this day.
                  </TableCell>
                </TableRow>
              ) : (
                dayAppointments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="whitespace-nowrap pl-5 text-[12.5px] font-semibold text-ink-900 tnum">
                      {a.time}
                    </TableCell>
                    <TableCell>
                      <div className="whitespace-nowrap text-[13px] font-medium text-ink-900">{a.patientName}</div>
                      <div className="text-[11px] text-ink-400 tnum">{a.phone}</div>
                    </TableCell>
                    <TableCell className="text-[13px] text-ink-700">{a.treatment}</TableCell>
                    <TableCell className="whitespace-nowrap text-[12.5px] text-ink-500">
                      {findDoctor(a.doctorId)?.name}
                    </TableCell>
                    <TableCell>
                      <SourceBadge source={a.source} className="px-2 py-0 text-[10.5px]" />
                    </TableCell>
                    <TableCell className="pr-5">
                      <AppointmentBadge status={a.status} className="px-2 py-0 text-[10.5px]" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pending payments */}
        <Card className="p-0">
          <div className="px-5 pb-3 pt-5">
            <h3 className="text-[14.5px] font-semibold text-ink-900">Pending payments</h3>
            <p className="mt-0.5 text-xs text-ink-400">
              {dueList.length} patients · {inr(pendingSum)} outstanding
            </p>
          </div>
          <ul className="divide-y divide-ink-100 border-t border-ink-100">
            {dueList.map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar className="size-8">
                  <AvatarFallback className="text-[10px]">{initials(p.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-ink-900">{p.name}</div>
                  <div className="text-[11px] text-ink-400 tnum">{p.id}</div>
                </div>
                <span className="text-[13px] font-bold text-red-700 tnum">{inr(p.outstanding)}</span>
                <Button variant="ghost" size="sm" className="h-7 shrink-0 text-[11.5px]">
                  <BellRing className="size-3" /> Remind
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
