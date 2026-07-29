import type { Metadata } from "next";
import {
  CalendarCheck,
  Clock,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import { BookingForm } from "@/components/site/booking-form";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Eyebrow } from "@/components/site/section";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Book an Appointment | CareWell Dental Clinic, Dwarka",
  description:
    "Book your dental appointment at Carewell Dental Clinic, Dwarka Mor, New Delhi in under a minute. Choose your treatment and slot — WhatsApp confirmation and same-day emergency slots.",
};

const steps = [
  {
    icon: CalendarCheck,
    title: "Choose your slot",
    text: "Pick a treatment and a time that suits you — takes under a minute.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp confirmation",
    text: "You get an instant confirmation, and reception calls to lock the slot.",
  },
  {
    icon: Stethoscope,
    title: "Visit the clinic",
    text: "Walk in, no queues — your chair is reserved and your doctor is briefed.",
  },
];

const expectations = [
  "A written, itemised estimate before any treatment begins",
  "Sealed, autoclaved instrument pouches opened in front of you",
  "Average chairside wait under 10 minutes",
  "Honest advice — including when you don't need treatment",
];

export default function BookAppointmentPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.18), transparent 65%)" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20">
        {/* Heading */}
        <Reveal className="max-w-2xl">
          <Eyebrow>Book appointment</Eyebrow>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
            Reserve your chair, <span className="text-gradient">skip the waiting room</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
            Tell us what you need and when — we confirm on WhatsApp, and our reception calls to
            lock your slot. No payment required to book.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
          {/* ------------------------------------------------------------ */}
          {/* Left — reassurance panel (sticky on desktop)                  */}
          {/* ------------------------------------------------------------ */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Rating chip */}
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900 ring-hairline shadow-soft">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="tnum font-semibold">{clinic.stats.googleRating}</span>
                  <span className="text-ink-300">·</span>
                  <span className="tnum text-ink-500">
                    {clinic.stats.googleReviews.toLocaleString("en-IN")} Google reviews
                  </span>
                </div>
              </Reveal>

              {/* Steps */}
              <Stagger className="space-y-0">
                {steps.map((step, i) => (
                  <StaggerItem key={step.title}>
                    <div className="relative flex gap-4 pb-6 last:pb-0">
                      {i < steps.length - 1 && (
                        <span className="absolute left-[19px] top-11 h-[calc(100%-2.5rem)] w-px bg-ink-100" />
                      )}
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/10">
                        <step.icon className="size-4.5" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-ink-900">
                          <span className="tnum mr-1.5 text-xs font-medium text-brand-600">
                            0{i + 1}
                          </span>
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.text}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              {/* What to expect */}
              <Reveal>
                <div className="rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                    <ShieldCheck className="size-4 text-brand-600" /> What to expect at your visit
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {expectations.map((e) => (
                      <li key={e} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-500">
                        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Emergency card */}
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl bg-ink-900 p-6 text-white">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                      background:
                        "radial-gradient(320px 180px at 90% 0%, rgba(208,59,59,0.35), transparent 65%), radial-gradient(280px 160px at 0% 100%, rgba(13,148,136,0.35), transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-red-400" />
                      </span>
                      Dental emergency?
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Severe pain, swelling or a knocked-out tooth — skip the form and call us now.
                      We keep same-day emergency slots open every day.
                    </p>
                    <a
                      href={`tel:${clinic.emergencyPhone}`}
                      className="tnum mt-4 flex items-center gap-3 text-2xl font-semibold tracking-tight transition-colors hover:text-brand-300 md:text-3xl"
                    >
                      <PhoneCall className="size-6 text-brand-400" />
                      {clinic.emergencyPhone}
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Hours */}
              <Reveal>
                <div className="rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                    <Clock className="size-4 text-brand-600" /> Clinic hours
                  </p>
                  <dl className="mt-3 space-y-2">
                    {clinic.hours.map((h) => (
                      <div key={h.days} className="flex items-baseline justify-between gap-4 text-[13px]">
                        <dt className="text-ink-500">{h.days}</dt>
                        <dd className="tnum font-medium text-ink-900">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 border-t border-ink-100 pt-3 text-xs text-ink-400">
                    {clinic.shortAddress}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Right — the form                                              */}
          {/* ------------------------------------------------------------ */}
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-3xl bg-white ring-hairline shadow-lift">
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 via-brand-600 to-blue-500" />
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
