import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, FileCheck, Percent, Stethoscope } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Section, Eyebrow } from "@/components/site/section";
import { CtaStrip } from "@/components/site/cta-strip";
import { TreatmentIcon } from "@/components/site/services/treatment-icon";
import { ClinicImage, treatmentPhoto } from "@/components/site/clinic-image";
import { treatments } from "@/lib/data/treatments";
import type { Treatment } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "Dental Treatments & Services in Dwarka, New Delhi",
  description:
    "12 dental specialities under one roof in Dwarka, New Delhi: implants, root canals, braces, clear aligners, smile design, veneers, whitening, kids dentistry and more — with written estimates and 0% EMI.",
};

const categoryOrder: Treatment["category"][] = [
  "Surgical",
  "Orthodontic",
  "Cosmetic",
  "Restorative",
  "Preventive",
  "Pediatric",
];

const categoryCopy: Record<Treatment["category"], string> = {
  Surgical: "Implants, tooth removal and wisdom teeth — planned on a 3D scan and done by an experienced surgeon.",
  Orthodontic: "Teeth straightening with braces or clear aligners — we honestly tell you which one suits your case.",
  Cosmetic: "See a preview of your new smile before any work starts.",
  Restorative: "Saving and rebuilding your natural teeth — always better than replacing them.",
  Preventive: "Simple regular care — cleanings and check-ups that save you from bigger treatments later.",
  Pediatric: "Gentle, fear-free visits for children, starting from their very first check-up.",
};

const heroStats = [
  { icon: Stethoscope, value: "12 specialities", note: "under one roof" },
  { icon: FileCheck, value: "Written estimates", note: "before every treatment" },
  { icon: Percent, value: "0% EMI", note: "on major treatments" },
];

export default function ServicesPage() {
  const grouped = categoryOrder
    .map((cat) => ({ cat, items: treatments.filter((t) => t.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden border-b border-ink-100 px-5 pb-12 pt-12 sm:px-8 md:pb-16 md:pt-20">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 400px at 50% -20%, rgba(13,148,136,0.1), transparent 60%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Treatments &amp; services</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl">
                Dental treatments in Dwarka, New Delhi, <span className="text-gradient">explained simply</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
                Browse all 12 treatments below. Every page explains what happens, how many visits it takes,
                and answers the questions patients actually ask.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((s) => (
                <div key={s.value} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 ring-hairline shadow-soft backdrop-blur">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <s.icon className="size-5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-ink-900">{s.value}</p>
                    <p className="text-xs text-ink-400">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================= CATEGORY SECTIONS ======================== */}
      {grouped.map(({ cat, items }, gi) => (
        <Section key={cat} className={gi % 2 === 1 ? "bg-ink-50/60" : undefined}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3 md:mb-10">
            <Reveal>
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                  {String(gi + 1).padStart(2, "0")} · {items.length} treatment{items.length > 1 ? "s" : ""}
                </p>
                <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
                  {cat}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 md:text-[15px]">
                  {categoryCopy[cat]}
                </p>
              </div>
            </Reveal>
          </div>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <StaggerItem key={t.slug} className="h-full">
                <Link
                  href={`/services/${t.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="relative -mx-2 -mt-2 h-36 overflow-hidden rounded-xl">
                    <ClinicImage
                      id={treatmentPhoto[t.slug] ?? "clinic"}
                      alt={t.name}
                      className="absolute inset-0"
                      imgClassName="transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-soft transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-4 flex items-center gap-2 text-[17px] font-semibold tracking-tight text-ink-900">
                    <TreatmentIcon name={t.icon} className="size-4 text-brand-600" />
                    {t.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{t.short}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-4 text-xs text-ink-400">
                    <span className="text-[12.5px] font-medium text-ink-700">{t.sittings}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {t.duration}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ))}

      {/* ========================= REASSURANCE ============================ */}
      <Section className="pt-0 md:pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-blue-50 p-7 ring-hairline md:p-10">
            <div className="absolute inset-0 bg-dots opacity-50" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">
                  Not sure which treatment you need?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500 md:text-[15px]">
                  Book a consultation and let the doctors decide with you — on your X-rays, at your
                  pace. If the honest answer is &ldquo;you need nothing yet&rdquo;, that&rsquo;s exactly what you&rsquo;ll hear.
                </p>
              </div>
              <Link
                href="/book-appointment"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-700 px-7 text-[15px] font-medium text-white shadow-soft transition-all hover:bg-brand-800 hover:shadow-lift"
              >
                Book a consultation <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaStrip
        title="Twelve specialities. One written estimate."
        text="Whatever brings you in — pain, prevention or a smile you've been postponing — it starts with one honest consultation."
      />
    </>
  );
}
