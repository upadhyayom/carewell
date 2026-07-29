import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Clock,
  CreditCard,
  FileCheck,
  IndianRupee,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Section, SectionHeading } from "@/components/site/section";
import { CtaStrip } from "@/components/site/cta-strip";
import { TreatmentIcon } from "@/components/site/services/treatment-icon";
import { ClinicImage, treatmentPhoto } from "@/components/site/clinic-image";
import { BeforeAfterCard } from "@/components/site/home/before-after-card";
import { clinic } from "@/lib/data/clinic";
import { treatments, findTreatment } from "@/lib/data/treatments";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = findTreatment(slug);
  if (!t) return { title: "Treatment not found" };
  return {
    title: `${t.name} in Dwarka, New Delhi — CareWell Dental Clinic`,
    description: t.short,
  };
}

const includedTicks = [
  "Specialist consultation & diagnosis",
  "All sittings listed in your plan",
  "Digital records & X-ray review",
  "Post-treatment review visit",
];

export default async function TreatmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = findTreatment(slug);
  if (!t) notFound();

  const sameCategory = treatments.filter((x) => x.category === t.category && x.slug !== t.slug);
  const others = treatments.filter((x) => x.category !== t.category && x.slug !== t.slug);
  const related = [...sameCategory, ...others].slice(0, 3);
  const quickBenefits = t.benefits.slice(0, 3);

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden px-5 pb-14 pt-8 sm:px-8 md:pb-20 md:pt-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(760px 400px at 10% -10%, rgba(13,148,136,0.08), transparent 60%), radial-gradient(560px 340px at 95% 20%, rgba(42,120,214,0.06), transparent 55%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl">
          {/* Breadcrumb */}
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-400">
              <Link href="/" className="transition-colors hover:text-brand-700">Home</Link>
              <ChevronRight className="size-3" />
              <Link href="/services" className="transition-colors hover:text-brand-700">Services</Link>
              <ChevronRight className="size-3" />
              <span className="font-medium text-ink-700">{t.name}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left */}
            <div>
              <Reveal>
                <div className="flex items-center gap-2">
                  <Badge>{t.category}</Badge>
                  <Badge variant="secondary" className="gap-1.5">
                    <TreatmentIcon name={t.icon} className="size-3" /> {t.sittings}
                  </Badge>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
                  {t.name}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
                  {t.hero}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-y border-ink-100 py-4 text-sm">
                  <span className="flex items-center gap-1.5 text-ink-500">
                    <Clock className="size-4 text-brand-600" />
                    <span className="font-medium text-ink-900">{t.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-ink-500">
                    <CalendarDays className="size-4 text-brand-600" />
                    <span className="font-medium text-ink-900">{t.sittings}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-ink-500">
                    <IndianRupee className="size-4 text-brand-600" />
                    <span className="font-medium text-ink-900">Written estimate after check-up</span>
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button size="lg" asChild>
                    <Link href="/book-appointment">
                      <CalendarCheck /> Book Appointment
                    </Link>
                  </Button>
                  <Button size="lg" variant="whatsapp" asChild>
                    <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle /> Ask on WhatsApp
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right — gradient visual card */}
            <Reveal delay={0.12} y={26}>
              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 via-brand-50 to-white p-7 ring-hairline md:p-8">
                <div className="absolute inset-0 bg-grid" />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(300px 200px at 85% 10%, rgba(45,212,191,0.28), transparent 65%)",
                  }}
                />
                <div className="relative">
                  <div className="relative h-44 overflow-hidden rounded-2xl shadow-soft ring-hairline">
                    <ClinicImage id={treatmentPhoto[t.slug] ?? "clinic"} alt={t.name} className="absolute inset-0" />
                    <span className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-xl bg-white/85 text-brand-700 ring-hairline backdrop-blur">
                      <TreatmentIcon name={t.icon} className="size-5" />
                    </span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {quickBenefits.map((b) => (
                      <li key={b.title} className="glass flex items-center gap-3 rounded-xl p-3.5 ring-hairline">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                          <Check className="size-3.5" />
                        </span>
                        <span className="text-sm font-medium text-ink-900">{b.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ OVERVIEW ============================ */}
      <Section className="border-t border-ink-100 bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
          <SectionHeading
            eyebrow="Overview"
            title={`Understanding ${t.name.toLowerCase()}`}
            className="mb-0 md:mb-0 lg:sticky lg:top-24 lg:self-start"
          />
          <Reveal delay={0.05}>
            <div className="space-y-5 text-pretty text-[15px] leading-relaxed text-ink-700 md:text-base [&>p:first-child]:text-ink-900 [&>p:first-child]:font-medium">
              {t.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============================ BENEFITS ============================ */}
      <Section className="bg-ink-50/60">
        <SectionHeading
          eyebrow="Why patients choose it"
          title={`The case for ${t.name.toLowerCase()}`}
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.benefits.map((b) => (
            <StaggerItem key={b.title} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-shadow hover:shadow-lift">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <CircleCheck className="size-5" />
                </span>
                <h3 className="mt-3.5 text-[15px] font-semibold text-ink-900">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{b.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =========================== PROCEDURE ============================ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
          <SectionHeading
            eyebrow="What happens, step by step"
            title="Your treatment journey"
            lead="No mystery, no mid-treatment surprises — this is the exact sequence we will walk you through at your consultation."
            className="mb-0 md:mb-0 lg:sticky lg:top-24 lg:self-start"
          />
          <div className="relative">
            <div className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-brand-300 via-ink-200 to-transparent" />
            <div className="space-y-6">
              {t.procedure.map((step, i) => (
                <Reveal key={step.step} delay={i * 0.04}>
                  <div className="relative flex gap-5 pl-0">
                    <span className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-700 ring-2 ring-brand-500 tnum">
                      {step.step}
                    </span>
                    <div className="flex-1 rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                      <h3 className="text-[15px] font-semibold text-ink-900">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ============================ PRICING ============================= */}
      <Section className="bg-ink-50/60">
        <Reveal>
          <div className="mx-auto grid max-w-4xl overflow-hidden rounded-3xl bg-white ring-hairline shadow-lift md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden bg-ink-900 p-7 md:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(420px 260px at 10% 0%, rgba(13,148,136,0.55), transparent 60%)",
                }}
              />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">
                  Honest, written estimates
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Know your full cost before we start
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  The exact cost depends on your check-up. After the doctor examines you, you get the complete estimate in writing — and it does not change midway.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-inset ring-white/15">
                    <CreditCard className="size-3.5 text-brand-300" /> 0% EMI available
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-inset ring-white/15">
                    <FileCheck className="size-3.5 text-brand-300" /> Written estimate first
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-7 md:p-10">
              <p className="text-sm font-semibold text-ink-900">Every plan includes</p>
              <ul className="mt-4 space-y-3">
                {includedTicks.map((tick) => (
                  <li key={tick} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <Check className="size-3" />
                    </span>
                    {tick}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-ink-100 pt-4 text-xs leading-relaxed text-ink-400">
                The itemised estimate you approve before treatment is the price you pay — audited
                against your final bill, every time.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ========================= BEFORE / AFTER ========================= */}
      <Section>
        <SectionHeading
          eyebrow="Documented results"
          title={`Real ${t.name.toLowerCase()} cases`}
          lead="Ages and case details exactly as documented in our records — no stock smiles, no borrowed photos."
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {t.beforeAfter.map((c) => (
            <StaggerItem key={c.label} className="h-full">
              <BeforeAfterCard label={c.label} note={c.note} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================== FAQS ============================== */}
      <Section className="bg-ink-50/60">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Straight answers"
            title={`${t.name} — your questions, answered honestly`}
            center
            className="mx-auto"
          />
          <Reveal>
            <Accordion type="single" collapsible className="rounded-2xl bg-white px-6 ring-hairline shadow-soft">
              {t.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* ============================ RELATED ============================= */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Related treatments"
            className="mb-0 md:mb-0"
          />
          <Reveal delay={0.1}>
            <Button variant="ghost" asChild className="mb-1">
              <Link href="/services">
                All services <ArrowUpRight />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-8 grid gap-5 sm:grid-cols-3">
          {related.map((r) => (
            <StaggerItem key={r.slug} className="h-full">
              <Link
                href={`/services/${r.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                    {r.emoji}
                  </span>
                  <Badge variant="secondary">{r.category}</Badge>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink-900">{r.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">{r.short}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-700">
                  Know more
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaStrip
        title={`Ready to talk about ${t.name.toLowerCase()}?`}
        text={`Book a consultation with our specialists — leave with a written, itemised estimate for your ${t.name.toLowerCase()} plan before anything begins.`}
      />
    </>
  );
}
