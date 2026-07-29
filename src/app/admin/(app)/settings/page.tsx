"use client";

import * as React from "react";
import {
  Building2, Stethoscope, IndianRupee, Clock, Plug, Share2, Palette, Bell,
  Check, Loader2, Pencil, type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/admin/widgets";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { clinic } from "@/lib/data/clinic";
import { doctors } from "@/lib/data/people";
import { treatments } from "@/lib/data/treatments";
import type { Doctor } from "@/lib/data/types";
import { cn, initials } from "@/lib/utils";

/* ------------------------------------------------------------------ */

type SectionId =
  | "clinic" | "doctors" | "pricing" | "hours" | "integrations"
  | "social" | "branding" | "notifications";

const sections: { id: SectionId; label: string; icon: LucideIcon }[] = [
  { id: "clinic", label: "Clinic Information", icon: Building2 },
  { id: "doctors", label: "Doctors", icon: Stethoscope },
  { id: "pricing", label: "Treatments & Pricing", icon: IndianRupee },
  { id: "hours", label: "Opening Hours", icon: Clock },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "social", label: "Social Links", icon: Share2 },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function SaveButton() {
  const [state, setState] = React.useState<"idle" | "saving" | "saved">("idle");
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const save = () => {
    setState("saving");
    timers.current.push(setTimeout(() => setState("saved"), 700));
    timers.current.push(setTimeout(() => setState("idle"), 2600));
  };
  return (
    <Button onClick={save} disabled={state === "saving"} variant={state === "saved" ? "soft" : "default"}>
      {state === "saving" && <Loader2 className="animate-spin" />}
      {state === "saved" && <Check />}
      {state === "idle" ? "Save changes" : state === "saving" ? "Saving…" : "Saved"}
    </Button>
  );
}

function SectionCard({
  title, description, children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-[15.5px] font-semibold tracking-tight text-ink-900">{title}</h2>
        <p className="mt-0.5 text-[13px] text-ink-500">{description}</p>
      </div>
      {children}
      <div className="mt-6 flex justify-end border-t border-ink-100 pt-4">
        <SaveButton />
      </div>
    </Card>
  );
}

function Field({
  label, id, defaultValue, type = "text", className,
}: {
  label: string;
  id: string;
  defaultValue: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} defaultValue={defaultValue} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

const weekDays = [
  { day: "Monday", open: "10:00", close: "20:30", closed: false },
  { day: "Tuesday", open: "10:00", close: "20:30", closed: false },
  { day: "Wednesday", open: "10:00", close: "20:30", closed: false },
  { day: "Thursday", open: "10:00", close: "20:30", closed: false },
  { day: "Friday", open: "10:00", close: "20:30", closed: false },
  { day: "Saturday", open: "10:00", close: "20:30", closed: false },
  { day: "Sunday", open: "10:00", close: "14:00", closed: false },
];

const swatches = [
  { name: "Teal", className: "bg-teal-600" },
  { name: "Blue", className: "bg-blue-600" },
  { name: "Violet", className: "bg-violet-600" },
  { name: "Rose", className: "bg-rose-600" },
  { name: "Amber", className: "bg-amber-500" },
];

export default function SettingsPage() {
  const [active, setActive] = React.useState<SectionId>("clinic");
  const [editDoctor, setEditDoctor] = React.useState<Doctor | null>(null);
  const [hours, setHours] = React.useState(weekDays);
  const [swatch, setSwatch] = React.useState("Teal");
  const [smtpTest, setSmtpTest] = React.useState<"idle" | "testing" | "ok">("idle");
  const smtpTimers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  React.useEffect(() => () => smtpTimers.current.forEach(clearTimeout), []);

  const [notifs, setNotifs] = React.useState({
    appointment: true,
    birthday: true,
    review: true,
    payment: false,
  });

  const pricingRows = treatments.slice(0, 12);

  const testSmtp = () => {
    setSmtpTest("testing");
    smtpTimers.current.push(setTimeout(() => setSmtpTest("ok"), 1100));
    smtpTimers.current.push(setTimeout(() => setSmtpTest("idle"), 4000));
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Clinic profile, pricing, hours and integrations. All changes are stored locally in this demo."
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Left rail */}
        <nav className="lg:sticky lg:top-24 flex h-fit flex-row flex-wrap gap-1 lg:flex-col">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13.5px] font-medium transition-all",
                active === s.id
                  ? "bg-white text-brand-800 shadow-soft ring-hairline"
                  : "text-ink-500 hover:bg-white/70 hover:text-ink-900"
              )}
            >
              <s.icon className={cn("size-4", active === s.id ? "text-brand-600" : "text-ink-400")} />
              {s.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="min-w-0">
          {active === "clinic" && (
            <SectionCard title="Clinic Information" description="Public contact details shown on the website, invoices and consent forms.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Clinic name" id="set-name" defaultValue={clinic.name} className="sm:col-span-2" />
                <Field label="Address" id="set-address" defaultValue={clinic.address} className="sm:col-span-2" />
                <Field label="Phone" id="set-phone" defaultValue={clinic.phone} />
                <Field label="Emergency phone" id="set-emergency" defaultValue={clinic.emergencyPhone} />
                <Field label="Email" id="set-email" type="email" defaultValue={clinic.email} />
                <Field label="Registration no." id="set-reg" defaultValue={clinic.regNo} />
              </div>
            </SectionCard>
          )}

          {active === "doctors" && (
            <SectionCard title="Doctors" description="Practitioner profiles shown across booking, consent forms and the website.">
              <div className="grid gap-4 md:grid-cols-2">
                {doctors.map((d) => (
                  <div key={d.id} className="rounded-2xl border border-ink-100 p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="size-11">
                        <AvatarFallback>{initials(d.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14.5px] font-semibold text-ink-900">{d.name}</p>
                        <p className="text-xs text-ink-500">{d.qualifications}</p>
                      </div>
                      <Button variant="ghost" size="icon-sm" aria-label={`Edit ${d.name}`} onClick={() => setEditDoctor(d)}>
                        <Pencil className="size-3.5" />
                      </Button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {d.specialities.map((s) => (
                        <Badge key={s} variant="secondary">{s}</Badge>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-ink-400">Availability</p>
                    <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-ink-600">
                      {d.availability.map((a) => (
                        <span key={a.day} className="flex justify-between gap-2">
                          <span className="text-ink-400">{a.day}</span>
                          <span className="font-medium tnum">{a.slots}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {active === "pricing" && (
            <SectionCard title="Treatments & Pricing" description="Displayed price ranges — edits here update estimates and the public price list.">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Price from (₹)</TableHead>
                    <TableHead>Price to (₹)</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingRows.map((t) => (
                    <TableRow key={t.slug}>
                      <TableCell className="whitespace-nowrap font-medium text-ink-900">{t.name}</TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={t.priceMin} className="h-9 w-28 tnum" aria-label={`${t.name} minimum price`} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={t.priceMax} className="h-9 w-28 tnum" aria-label={`${t.name} maximum price`} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-ink-500">{t.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>
          )}

          {active === "hours" && (
            <SectionCard title="Opening Hours" description="Weekly schedule shown on the website and Google Business Profile.">
              <div className="space-y-2">
                {hours.map((h, i) => (
                  <div key={h.day} className="flex flex-wrap items-center gap-3 rounded-xl border border-ink-100 px-3.5 py-2.5">
                    <span className="w-24 text-[13.5px] font-medium text-ink-900">{h.day}</span>
                    <Input
                      type="time"
                      value={h.open}
                      disabled={h.closed}
                      onChange={(e) =>
                        setHours((prev) => prev.map((r, j) => (j === i ? { ...r, open: e.target.value } : r)))
                      }
                      className="h-9 w-28 tnum"
                      aria-label={`${h.day} opening time`}
                    />
                    <span className="text-xs text-ink-400">to</span>
                    <Input
                      type="time"
                      value={h.close}
                      disabled={h.closed}
                      onChange={(e) =>
                        setHours((prev) => prev.map((r, j) => (j === i ? { ...r, close: e.target.value } : r)))
                      }
                      className="h-9 w-28 tnum"
                      aria-label={`${h.day} closing time`}
                    />
                    <span className="ml-auto flex items-center gap-2 text-xs text-ink-500">
                      Closed
                      <Switch
                        checked={h.closed}
                        onCheckedChange={(checked) =>
                          setHours((prev) => prev.map((r, j) => (j === i ? { ...r, closed: checked } : r)))
                        }
                        aria-label={`${h.day} closed`}
                      />
                    </span>
                    {h.day === "Sunday" && !h.closed && (
                      <span className="w-full text-[11.5px] text-amber-700">
                        Sunday runs a half day — the clinic closes at 2:00 PM.
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {active === "integrations" && (
            <SectionCard title="Integrations" description="External services connected to the Dental Clinic.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Google Maps link" id="int-maps" defaultValue={clinic.mapsLink} className="sm:col-span-2" />
                <Field label="WhatsApp number" id="int-wa" defaultValue={clinic.whatsapp} />
                <Field label="Google Analytics ID" id="int-ga" defaultValue="G-CW48D2K1" />
                <Field label="Meta Pixel ID" id="int-pixel" defaultValue="728-441-0031" />
                <div />
                <Field label="SMTP host" id="int-smtp-host" defaultValue="smtp.zoho.in" />
                <Field label="SMTP port" id="int-smtp-port" defaultValue="465" />
                <Field label="SMTP user" id="int-smtp-user" defaultValue="notifications@carewell.clinic" />
                <div className="flex items-end">
                  <Button variant="secondary" onClick={testSmtp} disabled={smtpTest === "testing"}>
                    {smtpTest === "testing" && <Loader2 className="animate-spin" />}
                    {smtpTest === "ok" && <Check className="text-emerald-600" />}
                    {smtpTest === "idle" ? "Test connection" : smtpTest === "testing" ? "Testing…" : "Connection OK"}
                  </Button>
                </div>
              </div>
              {smtpTest === "ok" && (
                <p className="mt-3 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-[13px] font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/15">
                  SMTP handshake succeeded — test email delivered to notifications@carewell.clinic.
                </p>
              )}
            </SectionCard>
          )}

          {active === "social" && (
            <SectionCard title="Social Links" description="Profiles linked from the website footer and review widgets.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Instagram" id="soc-ig" defaultValue={clinic.social.instagram} />
                <Field label="Facebook" id="soc-fb" defaultValue={clinic.social.facebook} />
                <Field label="YouTube" id="soc-yt" defaultValue={clinic.social.youtube} />
                <Field label="Google Business" id="soc-gb" defaultValue={clinic.social.google} />
              </div>
            </SectionCard>
          )}

          {active === "branding" && (
            <SectionCard title="Branding" description="Logo mark and accent colour used across the dashboard and print material.">
              <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-100 p-6">
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lift">
                    <svg viewBox="0 0 24 24" fill="none" className="size-8" aria-hidden>
                      <path
                        d="M12 3c-2.2 0-2.9 1.2-4.6 1.2C5.2 4.2 3.5 6 3.5 8.6c0 4.6 2.3 9.3 4 11.2.5.6 1.5.4 1.8-.4l1.3-4.1c.4-1.2 2.4-1.2 2.8 0l1.3 4.1c.3.8 1.3 1 1.8.4 1.7-1.9 4-6.6 4-11.2 0-2.6-1.7-4.4-3.9-4.4-1.7 0-2.4-1.2-4.6-1.2Z"
                        fill="currentColor"
                        fillOpacity="0.95"
                      />
                    </svg>
                  </span>
                  <p className="text-[13.5px] font-semibold text-ink-900">Logo mark</p>
                  <p className="text-center text-[11.5px] text-ink-400">Used in the sidebar, letterheads and certificates</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-ink-700">Theme colour</p>
                  <div className="mt-2.5 flex gap-3">
                    {swatches.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => setSwatch(s.name)}
                        aria-label={`Theme colour ${s.name}`}
                        className={cn(
                          "flex size-9 items-center justify-center rounded-full transition-all",
                          s.className,
                          swatch === s.name && "ring-2 ring-ink-900 ring-offset-2"
                        )}
                      >
                        {swatch === s.name && <Check className="size-4 text-white" />}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-[12.5px] text-ink-500">
                    The dashboard ships in <span className="font-medium text-ink-700">light mode</span> — crisp on
                    clinic monitors and print-friendly for consent forms and reports.
                  </p>
                </div>
              </div>
            </SectionCard>
          )}

          {active === "notifications" && (
            <SectionCard title="Notifications" description="Automated reminders sent to staff and patients.">
              <div className="space-y-2">
                {(
                  [
                    { key: "appointment", label: "Appointment reminders", sub: "WhatsApp + SMS, 24h and 2h before the visit" },
                    { key: "birthday", label: "Birthday wishes", sub: "Personalised greeting with a check-up nudge" },
                    { key: "review", label: "Review requests", sub: "Google review link after completed treatments" },
                    { key: "payment", label: "Payment reminders", sub: "Gentle follow-up on pending invoices after 7 days" },
                  ] as const
                ).map((n) => (
                  <div key={n.key} className="flex items-center justify-between gap-4 rounded-xl border border-ink-100 px-4 py-3">
                    <div>
                      <p className="text-[13.5px] font-medium text-ink-900">{n.label}</p>
                      <p className="text-[12px] text-ink-400">{n.sub}</p>
                    </div>
                    <Switch
                      checked={notifs[n.key]}
                      onCheckedChange={(checked) => setNotifs((prev) => ({ ...prev, [n.key]: checked }))}
                      aria-label={n.label}
                    />
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>
      </div>

      {/* Doctor edit dialog (non-persisting) */}
      <Dialog open={editDoctor !== null} onOpenChange={(o) => !o && setEditDoctor(null)}>
        <DialogContent>
          {editDoctor && (
            <>
              <DialogHeader>
                <DialogTitle>Edit {editDoctor.name}</DialogTitle>
                <DialogDescription>Profile changes are local to this demo and won&apos;t persist.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <Field label="Name" id="doc-name" defaultValue={editDoctor.name} />
                <Field label="Role" id="doc-role" defaultValue={editDoctor.role} />
                <Field label="Qualifications" id="doc-quals" defaultValue={editDoctor.qualifications} />
                <Field label="Years of experience" id="doc-exp" type="number" defaultValue={String(editDoctor.experienceYears)} />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setEditDoctor(null)}>Cancel</Button>
                <Button onClick={() => setEditDoctor(null)}>
                  <Check /> Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
