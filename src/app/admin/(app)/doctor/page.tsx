"use client";

import * as React from "react";
import { CalendarCheck, IndianRupee, Award, Star, Armchair, Quote } from "lucide-react";
import { StatCard, PageHeader, ChartCard } from "@/components/admin/widgets";
import { DonutChart } from "@/components/charts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, inr, initials } from "@/lib/utils";
import { doctors } from "@/lib/data/people";
import { todayAppointments, weekAppointments } from "@/lib/data/appointments";
import { reviews } from "@/lib/data/reviews";
import { AppointmentBadge } from "@/components/admin/status-badges";

const drSmriti = doctors[0];

const weekDays = [
  { date: "2026-07-20", label: "Mon", day: 20 },
  { date: "2026-07-21", label: "Tue", day: 21 },
  { date: "2026-07-22", label: "Wed", day: 22 },
  { date: "2026-07-23", label: "Thu", day: 23 },
  { date: "2026-07-24", label: "Fri", day: 24 },
  { date: "2026-07-25", label: "Sat", day: 25 },
];

export default function DoctorDashboardPage() {
  const myToday = todayAppointments.filter((a) => a.doctorId === drSmriti.id);
  const myWeek = weekAppointments.filter((a) => a.doctorId === drSmriti.id);

  const myReviews = React.useMemo(() => {
    const mentions = reviews.filter(
      (r) => r.text.includes("Smriti") || r.text.includes("Dr. Mehta")
    );
    const pool = mentions.length >= 2 ? mentions : reviews.filter((r) => r.rating === 5);
    return pool.slice(0, 3);
  }, []);

  const [availability, setAvailability] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(drSmriti.availability.map((a) => [a.day, true]))
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Your day, Dr. Smriti"
        description="Sunday, 19 July 2026 · Sunday clinic 10 AM – 2 PM"
        actions={
          <Badge variant="good" className="h-7 px-3">
            <Star className="size-3 fill-current" /> {drSmriti.rating} · {drSmriti.reviewCount} reviews
          </Badge>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today's Appointments"
          value={String(myToday.length)}
          deltaLabel="1 completed, 1 in chair"
          icon={CalendarCheck}
        />
        <StatCard
          label="Revenue Generated"
          value={inr(516000, true)}
          delta={14.8}
          deltaLabel="this month"
          icon={IndianRupee}
        />
        <StatCard
          label="Cases Completed"
          value={drSmriti.casesCompleted.toLocaleString("en-IN")}
          deltaLabel="career total"
          icon={Award}
        />
        <StatCard label="Average Rating" value={String(drSmriti.rating)} deltaLabel={`${drSmriti.reviewCount} reviews`} icon={Star} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* Today's schedule */}
        <Card className="p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[14.5px] font-semibold text-ink-900">Today&apos;s schedule</h3>
              <p className="mt-0.5 text-xs text-ink-400">{myToday.length} appointments assigned to you</p>
            </div>
          </div>
          <ol className="relative space-y-0">
            {myToday.map((apt, i) => (
              <li key={apt.id} className="flex gap-4">
                <div className="flex w-[68px] shrink-0 flex-col items-end pt-0.5">
                  <span className="text-[13px] font-semibold text-ink-900 tnum">{apt.time}</span>
                  <span className="text-[10.5px] text-ink-400 tnum">{apt.durationMin} min</span>
                </div>
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "mt-1 size-2.5 shrink-0 rounded-full ring-4",
                      apt.status === "Completed"
                        ? "bg-emerald-500 ring-emerald-100"
                        : apt.status === "In Chair"
                        ? "bg-brand-600 ring-brand-100"
                        : "bg-ink-200 ring-ink-50"
                    )}
                  />
                  {i < myToday.length - 1 && <span className="w-px flex-1 bg-ink-100" />}
                </div>
                <div className="flex-1 pb-5">
                  <div className="rounded-xl bg-ink-50/60 p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[13.5px] font-semibold text-ink-900">{apt.patientName}</span>
                      <AppointmentBadge status={apt.status} className="px-2 py-0 text-[10.5px]" />
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-ink-500">
                      <span>{apt.treatment}</span>
                      <span className="inline-flex items-center gap-1 text-ink-400">
                        <Armchair className="size-3" /> Chair {(i % 2) + 1}
                      </span>
                    </div>
                    {apt.notes && <p className="mt-1.5 text-[11.5px] leading-4 text-ink-400">{apt.notes}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <div className="flex flex-col gap-4">
          {/* Week strip */}
          <Card className="p-5">
            <h3 className="text-[14.5px] font-semibold text-ink-900">Treatment schedule this week</h3>
            <p className="mt-0.5 text-xs text-ink-400">Mon 20 – Sat 25 July</p>
            <div className="mt-4 grid grid-cols-6 gap-1.5">
              {weekDays.map((d) => {
                const count = myWeek.filter((a) => a.date === d.date).length;
                const isSurgery = d.label === "Wed";
                return (
                  <div
                    key={d.date}
                    className={cn(
                      "rounded-xl px-1 py-2.5 text-center",
                      isSurgery ? "bg-brand-50 ring-1 ring-inset ring-brand-600/15" : "bg-ink-50/70"
                    )}
                  >
                    <div className="text-[10.5px] font-medium text-ink-400">{d.label}</div>
                    <div className="text-[13px] font-semibold text-ink-900 tnum">{d.day}</div>
                    <div
                      className={cn(
                        "mx-auto mt-1.5 w-fit rounded-full px-1.5 py-0.5 text-[10px] font-semibold tnum",
                        count > 0 ? "bg-white text-brand-700 ring-hairline" : "text-ink-300"
                      )}
                    >
                      {count > 0 ? `${count} apt${count > 1 ? "s" : ""}` : "—"}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-ink-400">Wednesday is your surgery day — fully blocked for implants.</p>
          </Card>

          {/* Revenue split */}
          <ChartCard title="Your revenue split" subtitle="July 2026 · by treatment">
            <DonutChart
              height={190}
              labels={["Implants", "Full Mouth Rehab", "Root Canals", "Surgery"]}
              values={[240000, 145000, 76000, 55000]}
              valueFormat={(v) => inr(v, true)}
              centerValue={inr(516000, true)}
              centerLabel="this month"
            />
          </ChartCard>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* Feedback */}
        <Card className="p-5 xl:col-span-2">
          <h3 className="text-[14.5px] font-semibold text-ink-900">Patient feedback</h3>
          <p className="mt-0.5 text-xs text-ink-400">Recent reviews mentioning you</p>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {myReviews.map((r) => (
              <div key={r.id} className="flex flex-col rounded-xl bg-ink-50/60 p-4">
                <Quote className="size-4 text-brand-600/60" />
                <p className="mt-2 line-clamp-5 flex-1 text-[12.5px] leading-5 text-ink-700">{r.text}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Avatar className="size-7">
                    <AvatarFallback className="text-[9px]">{initials(r.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="truncate text-[12px] font-semibold text-ink-900">{r.name}</div>
                    <div className="flex items-center gap-1 text-[10.5px] text-ink-400">
                      <span className="flex text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="size-2.5 fill-current" />
                        ))}
                      </span>
                      {r.treatment} · {r.source}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Availability */}
        <Card className="p-5">
          <h3 className="text-[14.5px] font-semibold text-ink-900">Availability</h3>
          <p className="mt-0.5 text-xs text-ink-400">Toggle days off — reception sees this live</p>
          <ul className="mt-4 divide-y divide-ink-100">
            {drSmriti.availability.map((slot) => (
              <li key={slot.day} className="flex items-center justify-between py-2.5">
                <div>
                  <span className="text-[13px] font-semibold text-ink-900">{slot.day}</span>
                  <span
                    className={cn(
                      "ml-2 text-[12px]",
                      availability[slot.day] ? "text-ink-500" : "text-ink-300 line-through"
                    )}
                  >
                    {slot.slots}
                  </span>
                </div>
                <Switch
                  checked={availability[slot.day]}
                  onCheckedChange={(v) => setAvailability((prev) => ({ ...prev, [slot.day]: v }))}
                  aria-label={`Available on ${slot.day}`}
                />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
