import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Compass,
  HeartPulse,
  ReceiptText,
  Scale,
  ShieldCheck,
  Star,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Section, SectionHeading, Eyebrow } from "@/components/site/section";
import { CtaStrip } from "@/components/site/cta-strip";
import { clinic } from "@/lib/data/clinic";
import { doctors, staff } from "@/lib/data/people";
import { cn, initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us — Our Story, Doctors & Values",
  description:
    "From a single chair in 2012 to a NABH-accredited clinic on Dwarka Mor — meet the doctors, team and values behind 21,400+ transformed smiles at CareWell Dental Clinic, Dwarka.",
};

const valueIcons = [Scale, HeartPulse, ReceiptText, ShieldCheck];

export default function AboutPage() {
  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 md:pb-20 md:pt-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 420px at 85% -10%, rgba(13,148,136,0.08), transparent 60%), radial-gradient(600px 360px at 5% 20%, rgba(42,120,214,0.06), transparent 55%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Our story · Since {clinic.established}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl">
                Fourteen years of one simple promise:{" "}
                <span className="text-gradient">treat only what&rsquo;s needed</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
                <p>
                  CareWell began in {clinic.established} as a single dental chair on Dwarka Mor, opened
                  by Dr. Smriti Sharma with a promise that still hangs — literally — on our reception
                  wall: no patient will ever be prescribed a treatment they don&rsquo;t need. That promise
                  outlasted every expansion since: the in-house implant centre in 2015, the 3,000 sq ft
                  four-chair clinic with CBCT imaging in 2018, and the digital smile design studio in 2021.
                </p>
                <p>
                  Today CareWell is one of Dwarka&rsquo;s first standalone dental clinics with NABH
                  entry-level accreditation — {clinic.stats.smilesTransformed.toLocaleString("en-IN")}+
                  smiles, {clinic.stats.implantsPlaced.toLocaleString("en-IN")}+ implants and a{" "}
                  {clinic.stats.googleRating}★ Google rating later. What hasn&rsquo;t changed is how it
                  feels to sit in our chairs: written estimates before treatment, sealed instruments
                  opened in front of you, and doctors who explain the X-ray before they pick up a mirror.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Mission / Vision */}
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal delay={0.15}>
              <div className="relative h-full overflow-hidden rounded-3xl bg-ink-900 p-7 md:p-9">
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(420px 240px at 90% 0%, rgba(13,148,136,0.5), transparent 60%)",
                  }}
                />
                <div className="relative">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-inset ring-white/15">
                    <Target className="size-5" />
                  </span>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">
                    Our mission
                  </p>
                  <p className="mt-2 text-xl font-medium leading-relaxed tracking-tight text-white md:text-2xl">
                    {clinic.mission}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="relative h-full overflow-hidden rounded-3xl bg-white p-7 ring-hairline shadow-soft md:p-9">
                <div className="absolute inset-0 bg-grid opacity-60" />
                <div className="relative">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/10">
                    <Compass className="size-5" />
                  </span>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                    Our vision
                  </p>
                  <p className="mt-2 text-xl font-medium leading-relaxed tracking-tight text-ink-900 md:text-2xl">
                    {clinic.vision}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ VALUES ============================== */}
      <Section className="bg-ink-50/60">
        <SectionHeading
          eyebrow="What we stand for"
          title="Values we audit, not just advertise"
          lead="Each of these shows up in a checklist somewhere — in hiring interviews, morning huddles and our annual NABH audit."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {clinic.values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <StaggerItem key={v.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-shadow hover:shadow-lift">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/10">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold text-ink-900">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{v.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* ============================ DOCTORS ============================= */}
      <Section>
        <SectionHeading
          eyebrow="The doctors"
          title="Two specialists, one philosophy"
          lead="Every case at CareWell is seen — and often co-planned — by an MDS specialist. Here is who you will actually meet in the chair."
        />
        <div className="space-y-8">
          {doctors.map((doc, i) => (
            <Reveal key={doc.id}>
              <div className="grid overflow-hidden rounded-3xl bg-white ring-hairline shadow-soft lg:grid-cols-[0.85fr_1.15fr]">
                {/* Left — identity panel */}
                <div
                  className={cn(
                    "relative flex flex-col justify-between gap-8 p-7 md:p-9",
                    i === 0
                      ? "bg-gradient-to-br from-brand-50 via-white to-brand-100/70"
                      : "bg-gradient-to-br from-blue-50 via-white to-brand-50"
                  )}
                >
                  <div className="absolute inset-0 bg-grid opacity-50" />
                  <div className="relative flex items-start gap-5">
                    <div
                      className={cn(
                        "shrink-0 rounded-2xl bg-gradient-to-br p-[3px]",
                        i === 0 ? "from-brand-400 via-brand-600 to-blue-500" : "from-blue-400 via-blue-600 to-brand-500"
                      )}
                    >
                      <div className="flex size-20 items-center justify-center rounded-[13px] bg-white text-2xl font-semibold tracking-tight text-ink-900">
                        {initials(doc.name)}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold tracking-tight text-ink-900">{doc.name}</h3>
                      <p className="mt-0.5 text-sm font-medium text-brand-700">{doc.role}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{doc.qualifications}</p>
                    </div>
                  </div>
                  <div className="relative grid grid-cols-3 gap-3">
                    {[
                      { v: `${doc.experienceYears}`, l: "Years" },
                      { v: doc.casesCompleted.toLocaleString("en-IN"), l: "Cases" },
                      { v: `${doc.rating}★`, l: `${doc.reviewCount} reviews` },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl bg-white/80 p-3 text-center ring-hairline">
                        <p className="text-lg font-semibold tracking-tight text-ink-900 tnum">{s.v}</p>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-ink-400">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — bio + availability */}
                <div className="flex flex-col p-7 md:p-9">
                  <p className="text-sm leading-relaxed text-ink-500 md:text-[15px]">{doc.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {doc.specialities.map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl bg-ink-50/70 p-5 ring-hairline">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                      <CalendarDays className="size-3.5" /> Weekly availability
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
                      {doc.availability.map((a) => (
                        <div key={a.day} className="flex items-baseline justify-between gap-2 border-b border-ink-100 py-1.5 text-sm last:border-0 sm:[&:nth-last-child(2)]:border-0 sm:[&:nth-last-child(3)]:border-0">
                          <span className="font-medium text-ink-900">{a.day}</span>
                          <span className="text-right text-xs text-ink-500 tnum">{a.slots}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/book-appointment"
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    Book with {doc.name.split(" ").slice(0, 2).join(" ")}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================= STAFF ============================== */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="The team around the chair"
          title="The people who remember your name"
          lead="Great dentistry is a team sport — scheduling, sterilization, insurance paperwork and the follow-up call the next morning."
        />
        <Stagger className="grid gap-5 sm:grid-cols-3">
          {staff.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-hairline shadow-soft">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-ink-100 to-ink-50 text-sm font-semibold text-ink-700 ring-hairline">
                    {initials(s.name)}
                  </span>
                  <div className="leading-tight">
                    <p className="text-[15px] font-semibold text-ink-900">{s.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-brand-700">{s.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-500">{s.bio}</p>
                <p className="mt-auto pt-4 text-xs text-ink-400">With CareWell since {s.since}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =========================== CLINIC TOUR ========================== */}
      <Section className="bg-ink-50/60">
        <SectionHeading
          eyebrow="Walk through"
          title="A tour of the clinic"
          lead="3,000 sq ft designed to feel less like a hospital and more like a place you don't mind returning to every six months."
        />
        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clinic.tour.map((t) => (
            <StaggerItem key={t.area} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-shadow hover:shadow-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50/0 via-transparent to-brand-50/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl ring-1 ring-inset ring-brand-600/10 transition-transform duration-300 group-hover:scale-110">
                    {t.emoji}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink-900">{t.area}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{t.note}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ===================== AWARDS + CERTIFICATES ====================== */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Recognition"
              title="Awards along the way"
              className="mb-6 md:mb-8"
            />
            <Stagger className="space-y-3">
              {clinic.awards.map((a) => (
                <StaggerItem key={a.title}>
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-600/15">
                      <Award className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-ink-900">{a.title}</p>
                      <p className="text-xs text-ink-400">{a.by}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-ink-50 px-2.5 py-1 text-xs font-semibold text-ink-700 tnum">
                      {a.year}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <SectionHeading
              eyebrow="Accreditation"
              title="Certifications that keep us honest"
              className="mb-6 md:mb-8"
            />
            <Stagger className="space-y-3">
              {clinic.certificates.map((c) => (
                <StaggerItem key={c.title}>
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/15">
                      <BadgeCheck className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-ink-900">{c.title}</p>
                      <p className="text-xs text-ink-400">{c.by}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-ink-50 px-2.5 py-1 text-xs font-semibold text-ink-700 tnum">
                      {c.year}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.15}>
              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-brand-50 p-5 ring-1 ring-inset ring-brand-600/10">
                <Star className="mt-0.5 size-4 shrink-0 fill-amber-400 text-amber-400" />
                <p className="text-sm leading-relaxed text-brand-900">
                  Reg. No. {clinic.regNo} · One of the first standalone dental clinics in Dwarka, New Delhi to
                  earn NABH entry-level accreditation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================ TIMELINE ============================ */}
      <Section className="bg-ink-50/60">
        <SectionHeading
          eyebrow="Milestones"
          title={`${clinic.established} to today`}
          lead="Every expansion was funded by patient trust, not investor targets — which is exactly why the promise on the wall never changed."
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-brand-300 via-ink-200 to-transparent md:left-1/2" />
          <div className="space-y-10">
            {clinic.timeline.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.04}>
                <div
                  className={cn(
                    "relative flex gap-6 pl-12 md:w-1/2 md:pl-0",
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12"
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-[7px] top-1 flex size-[18px] items-center justify-center rounded-full bg-white ring-2 ring-brand-500",
                      i % 2 === 0 ? "md:left-auto md:-right-[9px]" : "md:-left-[9px]"
                    )}
                  >
                    <span className="size-2 rounded-full bg-brand-500" />
                  </span>
                  <div className={cn("rounded-2xl bg-white p-5 ring-hairline shadow-soft", i % 2 === 0 && "md:ml-auto")}>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700 tnum">
                      {m.year}
                    </p>
                    <h3 className="mt-1 text-[15px] font-semibold text-ink-900">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaStrip
        title="Come see the clinic for yourself"
        text="A first consultation is unhurried by design — meet the doctors, tour the sterilization bay, and leave with a written plan (or an honest 'you need nothing')."
      />
    </>
  );
}
