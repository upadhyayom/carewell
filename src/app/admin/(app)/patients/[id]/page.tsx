"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  FileText,
  Download,
  Printer,
  CalendarCheck,
  Pill,
  UserX,
  Droplet,
} from "lucide-react";
import { PageHeader, EmptyState } from "@/components/admin/widgets";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { inr, initials, formatDate } from "@/lib/utils";
import { findPatient, findDoctor } from "@/lib/data/people";
import { todayAppointments } from "@/lib/data/appointments";
import { consentForms } from "@/lib/data/consents";
import { AppointmentBadge } from "@/components/admin/status-badges";

function treatmentStatusVariant(status: "Completed" | "Ongoing" | "Planned") {
  return status === "Completed" ? "good" : status === "Ongoing" ? "blue" : "secondary";
}

function invoiceStatusVariant(status: "Paid" | "Partial" | "Pending") {
  return status === "Paid" ? "good" : status === "Partial" ? "warning" : "critical";
}

function consentStatusVariant(status: "Printed" | "Signed & Filed" | "Generated") {
  return status === "Signed & Filed" ? "good" : status === "Printed" ? "blue" : "secondary";
}

export default function PatientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const patient = findPatient(decodeURIComponent(id));

  if (!patient) {
    return (
      <div className="mx-auto max-w-lg pt-10">
        <EmptyState
          icon={UserX}
          title="Patient not found"
          text={`No patient record matches "${decodeURIComponent(id)}". It may have been archived or the link is incorrect.`}
          action={
            <Button asChild variant="secondary">
              <Link href="/admin/patients">
                <ArrowLeft className="size-4" /> Back to patients
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  const patientConsents = consentForms.filter((f) => f.patientId === patient.id);
  const patientToday = todayAppointments.filter((a) => a.patientId === patient.id);
  const nextAppointment = patientToday.find(
    (a) => a.status === "Confirmed" || a.status === "Pending" || a.status === "Checked In" || a.status === "In Chair"
  );
  const ongoing = patient.treatments.filter((t) => t.status === "Ongoing").length;
  const invoiceTotal = patient.invoices.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-5">
      <PageHeader
        title={patient.name}
        description={`Patient record · registered ${formatDate(patient.registeredOn)}`}
        actions={
          <Button asChild variant="ghost" size="sm" className="h-9">
            <Link href="/admin/patients">
              <ArrowLeft className="size-3.5" /> All patients
            </Link>
          </Button>
        }
      />

      {/* Header card */}
      <Card className="p-5">
        <div className="flex flex-wrap items-start gap-5">
          <Avatar className="size-14">
            <AvatarFallback className="text-base">{initials(patient.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-ink-900">{patient.name}</h2>
              <Badge variant="secondary" className="tnum">{patient.id}</Badge>
              {patient.outstanding > 0 && (
                <Badge variant="critical" className="tnum">Outstanding {inr(patient.outstanding)}</Badge>
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink-500">
              <span className="tnum">
                {patient.age} yrs · {patient.gender}
              </span>
              <span className="inline-flex items-center gap-1">
                <Droplet className="size-3.5 text-red-500" /> {patient.bloodGroup}
              </span>
              <span className="inline-flex items-center gap-1 tnum">
                <Phone className="size-3.5 text-ink-400" /> {patient.phone}
              </span>
              <span className="inline-flex items-center gap-1">
                <Mail className="size-3.5 text-ink-400" /> {patient.email}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5 text-ink-400" /> {patient.city}
              </span>
            </div>
            {(patient.allergies.length > 0 || patient.conditions.length > 0) && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {patient.allergies.map((a) => (
                  <Badge key={a} variant="critical">
                    <AlertTriangle className="size-3" /> {a}
                  </Badge>
                ))}
                {patient.conditions.map((c) => (
                  <Badge key={c} variant="warning">
                    {c}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <div className="text-lg font-semibold text-ink-900 tnum">{inr(patient.totalSpent, true)}</div>
              <div className="text-[11px] text-ink-400">lifetime value</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-ink-900 tnum">{formatDate(patient.lastVisit)}</div>
              <div className="text-[11px] text-ink-400">last visit</div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="treatments">Treatments</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="consents">Consent Forms</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <div className="grid gap-4 xl:grid-cols-3">
            <Card className="p-5 xl:col-span-2">
              <h3 className="text-[14.5px] font-semibold text-ink-900">Medical history</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">Conditions</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {patient.conditions.length === 0 ? (
                      <span className="text-[13px] text-ink-400">No known conditions</span>
                    ) : (
                      patient.conditions.map((c) => (
                        <Badge key={c} variant="warning">
                          {c}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">Allergies</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {patient.allergies.length === 0 ? (
                      <span className="text-[13px] text-ink-400">No known allergies</span>
                    ) : (
                      patient.allergies.map((a) => (
                        <Badge key={a} variant="critical">
                          <AlertTriangle className="size-3" /> {a}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">Clinical notes</div>
              <p className="mt-1.5 text-[13.5px] leading-6 text-ink-700">{patient.notes}</p>
            </Card>

            <div className="flex flex-col gap-4">
              <Card className="p-5">
                <h3 className="text-[14.5px] font-semibold text-ink-900">Quick stats</h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    { label: "Treatments", value: String(patient.treatments.length) },
                    { label: "Ongoing", value: String(ongoing) },
                    { label: "Invoices", value: String(patient.invoices.length) },
                    { label: "Reports", value: String(patient.reports.length) },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-ink-50/70 px-3.5 py-2.5">
                      <div className="text-lg font-semibold text-ink-900 tnum">{s.value}</div>
                      <div className="text-[11px] text-ink-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="text-[14.5px] font-semibold text-ink-900">Next appointment</h3>
                {nextAppointment ? (
                  <div className="mt-3 rounded-xl bg-brand-50/60 p-3.5 ring-1 ring-inset ring-brand-600/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-ink-900 tnum">
                        Today · {nextAppointment.time}
                      </span>
                      <AppointmentBadge status={nextAppointment.status} className="px-2 py-0 text-[10.5px]" />
                    </div>
                    <div className="mt-1 text-[13px] text-ink-700">{nextAppointment.treatment}</div>
                    <div className="mt-0.5 text-xs text-ink-500">
                      with {findDoctor(nextAppointment.doctorId)?.name}
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-[13px] text-ink-400">
                    No upcoming appointment. Last visit was {formatDate(patient.lastVisit)}.
                  </p>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Treatments */}
        <TabsContent value="treatments">
          <Card className="overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5">Date</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Tooth</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-5 text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient.treatments.map((t, i) => (
                  <TableRow key={i}>
                    <TableCell className="whitespace-nowrap pl-5 text-[12.5px] text-ink-500 tnum">
                      {formatDate(t.date)}
                    </TableCell>
                    <TableCell className="text-[13px] font-medium text-ink-900">{t.treatment}</TableCell>
                    <TableCell className="text-[12.5px] text-ink-500 tnum">{t.tooth ?? "—"}</TableCell>
                    <TableCell className="whitespace-nowrap text-[13px] text-ink-500">
                      {findDoctor(t.doctorId)?.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant={treatmentStatusVariant(t.status)} className="px-2 py-0 text-[10.5px]">
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5 text-right font-medium tnum">
                      {t.cost > 0 ? inr(t.cost) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Prescriptions */}
        <TabsContent value="prescriptions">
          {patient.prescriptions.length === 0 ? (
            <EmptyState icon={Pill} title="No prescriptions" text="No prescriptions have been issued for this patient." />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {patient.prescriptions.map((rx, i) => (
                <Card key={i} className="overflow-hidden p-0">
                  <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <Pill className="size-4" />
                      </span>
                      <div>
                        <div className="text-[13px] font-semibold text-ink-900 tnum">{formatDate(rx.date)}</div>
                        <div className="text-[11px] text-ink-400">by {findDoctor(rx.doctorId)?.name}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Printer className="size-3.5" /> Print
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-5">Medicine</TableHead>
                        <TableHead>Dose</TableHead>
                        <TableHead className="pr-5">Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rx.medicines.map((med, j) => (
                        <TableRow key={j}>
                          <TableCell className="pl-5 text-[13px] font-medium text-ink-900">{med.name}</TableCell>
                          <TableCell className="text-[13px] text-ink-500 tnum">{med.dose}</TableCell>
                          <TableCell className="pr-5 text-[13px] text-ink-500">{med.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Invoices */}
        <TabsContent value="invoices">
          <Card className="overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5">Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="pr-5">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient.invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="pl-5 text-[12.5px] font-semibold text-ink-900 tnum">{inv.id}</TableCell>
                    <TableCell className="whitespace-nowrap text-[12.5px] text-ink-500 tnum">
                      {formatDate(inv.date)}
                    </TableCell>
                    <TableCell className="text-[13px] text-ink-700">{inv.items}</TableCell>
                    <TableCell className="text-right font-medium tnum">{inr(inv.amount)}</TableCell>
                    <TableCell className="pr-5">
                      <Badge variant={invoiceStatusVariant(inv.status)} className="px-2 py-0 text-[10.5px]">
                        {inv.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-ink-50/50 hover:bg-ink-50/50">
                  <TableCell className="pl-5 text-[13px] font-semibold text-ink-900" colSpan={3}>
                    Total billed
                  </TableCell>
                  <TableCell className="text-right text-[13px] font-bold text-ink-900 tnum">
                    {inr(invoiceTotal)}
                  </TableCell>
                  <TableCell className="pr-5">
                    {patient.outstanding > 0 ? (
                      <span className="text-xs font-semibold text-red-700 tnum">
                        {inr(patient.outstanding)} due
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-emerald-700">Cleared</span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports">
          {patient.reports.length === 0 ? (
            <EmptyState icon={FileText} title="No reports" text="No diagnostic reports uploaded for this patient." />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {patient.reports.map((r, i) => (
                <Card key={i} className="flex items-center gap-3 p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <FileText className="size-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-ink-900">{r.name}</div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <Badge variant="blue" className="px-2 py-0 text-[10px]">
                        {r.type}
                      </Badge>
                      <span className="text-[11px] text-ink-400 tnum">{formatDate(r.date)}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon-sm" aria-label={`Download ${r.name}`}>
                    <Download className="size-4" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Consent forms */}
        <TabsContent value="consents">
          {patientConsents.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No consent forms"
              text="No consent forms have been generated for this patient yet."
            />
          ) : (
            <Card className="overflow-hidden p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5">Form ID</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-5 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientConsents.slice(0, 12).map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="whitespace-nowrap pl-5 text-[12px] font-medium text-ink-500 tnum">
                        {f.id}
                      </TableCell>
                      <TableCell className="text-[13px] font-medium text-ink-900">{f.treatment}</TableCell>
                      <TableCell className="whitespace-nowrap text-[12.5px] text-ink-500 tnum">
                        {formatDate(f.generatedAt)}
                      </TableCell>
                      <TableCell className="text-[12.5px] text-ink-500">{f.language}</TableCell>
                      <TableCell>
                        <Badge variant={consentStatusVariant(f.status)} className="px-2 py-0 text-[10.5px]">
                          {f.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-5 text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href="/admin/consent-forms">
                            <Printer className="size-3.5" /> Reprint
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>

        {/* Appointments */}
        <TabsContent value="appointments">
          <div className="space-y-4">
            {patientToday.length > 0 && (
              <Card className="overflow-hidden p-0">
                <div className="border-b border-ink-100 px-5 py-3.5">
                  <h3 className="text-[13.5px] font-semibold text-ink-900">Today</h3>
                </div>
                <ul className="divide-y divide-ink-100">
                  {patientToday.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 px-5 py-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <CalendarCheck className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-semibold text-ink-900">{a.treatment}</div>
                        <div className="text-[11.5px] text-ink-400 tnum">
                          {a.time} · {a.durationMin} min · {findDoctor(a.doctorId)?.name}
                        </div>
                      </div>
                      <AppointmentBadge status={a.status} className="px-2 py-0 text-[10.5px]" />
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            <Card className="overflow-hidden p-0">
              <div className="border-b border-ink-100 px-5 py-3.5">
                <h3 className="text-[13.5px] font-semibold text-ink-900">Visit history</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5">Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead className="pr-5">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...patient.treatments]
                    .sort((a, b) => (a.date < b.date ? 1 : -1))
                    .map((t, i) => (
                      <TableRow key={i}>
                        <TableCell className="whitespace-nowrap pl-5 text-[12.5px] text-ink-500 tnum">
                          {formatDate(t.date)}
                        </TableCell>
                        <TableCell className="text-[13px] font-medium text-ink-900">
                          {t.treatment}
                          {t.tooth ? ` — ${t.tooth}` : ""}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-[13px] text-ink-500">
                          {findDoctor(t.doctorId)?.name}
                        </TableCell>
                        <TableCell className="pr-5">
                          <Badge variant={treatmentStatusVariant(t.status)} className="px-2 py-0 text-[10.5px]">
                            {t.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
