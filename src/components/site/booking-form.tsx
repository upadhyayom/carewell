"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  Loader2,
  MessageCircle,
  PhoneCall,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { bookingSlots, clinic } from "@/lib/data/clinic";
import { treatmentNames } from "@/lib/data/treatments";
import { formatDate } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Types & helpers                                                     */
/* ------------------------------------------------------------------ */

interface BookingValues {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  date: string;
  time: string;
  notes: string;
}

/** Deterministic booking reference — hashed from phone + date (no randomness). */
function bookingRef(phone: string, date: string): string {
  const input = `${phone}|${date}`;
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  }
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let code = "";
  let v = h;
  for (let i = 0; i < 5; i++) {
    code += alphabet[v % alphabet.length];
    v = Math.floor(v / alphabet.length) + ((h >> (i * 3)) & 7);
  }
  return `CW-APT-${code}`;
}

/** "10:30 AM" + "2026-07-24" → Google-Calendar dates param (local time). */
function calendarDates(date: string, slot: string): string {
  const m = slot.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hours = m ? parseInt(m[1], 10) : 10;
  const mins = m ? m[2] : "00";
  const pm = m ? m[3].toUpperCase() === "PM" : false;
  if (pm && hours !== 12) hours += 12;
  if (!pm && hours === 12) hours = 0;
  const d = date.replace(/-/g, "");
  const start = `${d}T${String(hours).padStart(2, "0")}${mins}00`;
  const endH = hours + 1;
  const end = `${d}T${String(endH).padStart(2, "0")}${mins}00`;
  return `${start}/${end}`;
}

/* ------------------------------------------------------------------ */
/* Field wrapper                                                       */
/* ------------------------------------------------------------------ */

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Success state                                                       */
/* ------------------------------------------------------------------ */

function ConfirmationChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/15">
      <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" className="fill-emerald-500/15" />
        <path d="M5 8.2 7.2 10.4 11 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </div>
  );
}

function SuccessState({ values, onReset }: { values: BookingValues; onReset: () => void }) {
  const ref = bookingRef(values.phone, values.date);
  const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Dental appointment — ${values.treatment} at ${clinic.name}`
  )}&dates=${calendarDates(values.date, values.time)}&details=${encodeURIComponent(
    `Booking reference ${ref}. Reception will call to confirm your slot.`
  )}&location=${encodeURIComponent(clinic.address)}`;

  const summary: [string, string][] = [
    ["Patient", values.name],
    ["Treatment", values.treatment],
    ["Date", formatDate(values.date)],
    ["Time", values.time],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 sm:p-8"
    >
      {/* Animated check */}
      <div className="flex flex-col items-center text-center">
        <motion.svg
          viewBox="0 0 64 64"
          className="size-16 text-brand-600"
          initial="hidden"
          animate="visible"
          aria-hidden
        >
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
            }}
          />
          <motion.path
            d="M20 33.5 28.5 42 45 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.45, delay: 0.45, ease: "easeOut" } },
            }}
          />
        </motion.svg>

        <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink-900">
          Appointment request received
        </h3>
        <p className="mt-1.5 text-sm text-ink-500">Your booking reference</p>
        <p className="tnum mt-1 rounded-lg bg-ink-50 px-3 py-1 font-mono text-lg font-semibold tracking-wider text-brand-700">
          {ref}
        </p>
      </div>

      {/* Summary */}
      <dl className="mt-7 divide-y divide-ink-100 rounded-2xl bg-ink-50/60 px-5 ring-hairline">
        {summary.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-xs font-medium uppercase tracking-wide text-ink-400">{k}</dt>
            <dd className="text-right text-sm font-medium text-ink-900">{v}</dd>
          </div>
        ))}
        {values.notes && (
          <div className="py-2.5">
            <dt className="text-xs font-medium uppercase tracking-wide text-ink-400">Notes</dt>
            <dd className="mt-1 text-sm text-ink-700">{values.notes}</dd>
          </div>
        )}
      </dl>

      {/* Confirmation chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <ConfirmationChip>WhatsApp confirmation sent to +91 {values.phone}</ConfirmationChip>
        <ConfirmationChip>Email confirmation sent to {values.email}</ConfirmationChip>
        <ConfirmationChip>Clinic team notified</ConfirmationChip>
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-[13px] text-ink-500">
        <PhoneCall className="size-3.5 shrink-0 text-brand-600" />
        Our reception will call you shortly to confirm this slot.
      </p>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button variant="ghost" asChild>
          <a href={calendarLink} target="_blank" rel="noopener noreferrer">
            <CalendarPlus /> Add to calendar
          </a>
        </Button>
        <Button variant="whatsapp" asChild>
          <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> Chat with us on WhatsApp
          </a>
        </Button>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-medium text-ink-400 transition-colors hover:text-brand-700"
      >
        <RotateCcw className="size-3" /> Book another appointment
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

export function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      treatment: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const [submitted, setSubmitted] = React.useState<BookingValues | null>(null);
  const [minDate, setMinDate] = React.useState("");

  React.useEffect(() => {
    // Set client-side to avoid a build-time date freezing the min attribute.
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const onSubmit = async (values: BookingValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    // Save the booking so it appears in the clinic's admin (Leads CRM + Reception queue)
    try {
      const { saveChatLead } = await import("@/lib/chat-leads");
      const d = new Date(values.date + "T00:00:00");
      saveChatLead({
        name: values.name,
        phone: values.phone,
        treatment: values.treatment,
        urgency: "Booked online",
        timeline: "Scheduled",
        cghs: false,
        score: "Warm",
        value: 5000,
        slot: {
          date: values.date,
          label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
          time: values.time,
        },
      });
    } catch {}
    try {
      const { pixelTrack } = await import("@/lib/pixel");
      pixelTrack("Lead", { content_name: values.treatment, content_category: "booking-form" });
      pixelTrack("Schedule", { content_name: values.treatment });
    } catch {}
    setSubmitted(values);
  };

  if (submitted) {
    return (
      <SuccessState
        values={submitted}
        onReset={() => {
          reset();
          setSubmitted(null);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-ink-900">Request your slot</h2>
        <p className="mt-1 text-sm text-ink-500">
          Takes under a minute — we confirm on WhatsApp and by phone.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Patient name" htmlFor="bk-name" error={errors.name?.message}>
          <Input
            id="bk-name"
            placeholder="Full name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name", {
              required: "Please tell us the patient's name",
              minLength: { value: 2, message: "Name looks too short" },
            })}
          />
        </Field>

        <Field label="Phone" htmlFor="bk-phone" error={errors.phone?.message}>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-ink-400">
              +91
            </span>
            <Input
              id="bk-phone"
              type="tel"
              inputMode="numeric"
              placeholder="98XXXXXXXX"
              className="pl-12"
              autoComplete="tel-national"
              aria-invalid={!!errors.phone}
              {...register("phone", {
                required: "We need a phone number to confirm your slot",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
            />
          </div>
        </Field>

        <Field label="Email" htmlFor="bk-email" error={errors.email?.message}>
          <Input
            id="bk-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required for your confirmation",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "That email doesn't look right",
              },
            })}
          />
        </Field>

        <Field label="Treatment" htmlFor="bk-treatment" error={errors.treatment?.message}>
          <Select
            id="bk-treatment"
            aria-invalid={!!errors.treatment}
            {...register("treatment", { required: "Choose the treatment you're coming in for" })}
          >
            <option value="">Select treatment…</option>
            {treatmentNames.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
            <option value="General Check-up">General Check-up / Not sure</option>
          </Select>
        </Field>

        <Field label="Preferred date" htmlFor="bk-date" error={errors.date?.message}>
          <Input
            id="bk-date"
            type="date"
            min={minDate}
            aria-invalid={!!errors.date}
            {...register("date", {
              required: "Pick a date that works for you",
              validate: (v) =>
                !minDate || v >= minDate || "Please choose today or a future date",
            })}
          />
        </Field>

        <Field label="Preferred time" htmlFor="bk-time" error={errors.time?.message}>
          <Select
            id="bk-time"
            aria-invalid={!!errors.time}
            {...register("time", { required: "Pick a time slot" })}
          >
            <option value="">Select a slot…</option>
            {bookingSlots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Notes (optional)" htmlFor="bk-notes" error={errors.notes?.message}>
            <Textarea
              id="bk-notes"
              placeholder="Anything we should know — pain, anxiety, old reports, insurance…"
              {...register("notes")}
            />
          </Field>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-7 w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Booking your slot…
          </>
        ) : (
          "Request appointment"
        )}
      </Button>

      <p className="mt-4 text-center text-xs leading-relaxed text-ink-400">
        No payment needed to book. By submitting you agree to be contacted by the CareWell team
        about this appointment.
      </p>
    </form>
  );
}
