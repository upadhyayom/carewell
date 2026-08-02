import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, FileText, MessageCircle, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section, SectionHeading, Eyebrow } from "@/components/site/section";
import { ClinicImage } from "@/components/site/clinic-image";
import { Reveal } from "@/components/motion";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "CGHS Empanelled Dental Clinic in Dwarka, New Delhi — Cashless & Reimbursement",
  description:
    "CareWell Dental Clinic is CGHS empanelled (also serving DGEHS, ECHS & CAPF beneficiaries). Cashless dental treatment at approved rates in Dwarka, New Delhi. Documents, process & covered treatments.",
};

export default function CghsPage() {
  const c = clinic.cghs;
  return (
    <>
      <Section className="pb-10 pt-10 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Government Health Schemes</Eyebrow>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
              CGHS empanelled dental care
            </h1>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-500">
              Serving Central Government employees, pensioners and their families.
              Treatment at approved CGHS rates, with cashless facility on referral
              and full reimbursement paperwork support.
            </p>
            {c.empanelmentNo && <p className="mt-3 text-[13px] text-ink-400">Empanelment No. {c.empanelmentNo}</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              {c.schemes.map((s) => <Badge key={s}>{s}</Badge>)}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" variant="whatsapp" asChild>
                <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Check your eligibility
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${clinic.phone}`}><Phone /> {clinic.phone}</a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ClinicImage id="reception" alt="CareWell front desk assisting a CGHS patient" className="h-72 rounded-3xl shadow-soft md:h-96" />
          </Reveal>
        </div>
      </Section>

      <Section className="pt-6">
        <SectionHeading eyebrow="Process" title="How your CGHS visit works" />
        <div className="grid gap-4 md:grid-cols-3">
          {c.process.map((p) => (
            <Reveal key={p.step}>
              <div className="h-full rounded-2xl bg-white p-6 ring-hairline shadow-soft">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">{p.step}</span>
                <h3 className="mt-4 text-[15.5px] font-semibold text-ink-900">{p.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl bg-white p-6 ring-hairline shadow-soft">
              <h3 className="flex items-center gap-2 text-[15.5px] font-semibold text-ink-900">
                <FileText className="size-4.5 text-brand-700" /> Documents to carry
              </h3>
              <ul className="mt-4 space-y-2.5">
                {c.documents.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[14px] text-ink-700">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand-600" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl bg-amber-50 p-6 ring-1 ring-inset ring-amber-600/15">
              <h3 className="flex items-center gap-2 text-[15.5px] font-semibold text-ink-900">
                <AlertCircle className="size-4.5 text-amber-600" /> What&apos;s covered
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{c.coveredNote}</p>
              <p className="mt-3 text-[12.5px] text-ink-500">
                Coverage follows the current CGHS rate list and your scheme&apos;s rules —
                message us your card details on WhatsApp and we&apos;ll confirm before your visit.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-4 pb-20">
        <SectionHeading eyebrow="FAQs" title="CGHS questions, answered" />
        <Accordion type="single" collapsible className="rounded-2xl bg-white px-5 ring-hairline shadow-soft">
          {[
            { q: "Is treatment fully cashless?", a: "For CGHS card holders with a valid referral, listed procedures are cashless at approved rates. Where a procedure needs prior permission, we help you apply before starting treatment." },
            { q: "Do pensioners need a referral?", a: "Pensioner card holders can consult directly for many services; certain procedures still need a permission letter. Call us with your card category and we'll guide you." },
            { q: "My scheme is DGEHS / ECHS — am I covered?", a: "Yes, we serve DGEHS, ECHS and CAPF beneficiaries. The process is similar; documents differ slightly by scheme." },
            { q: "Are implants covered under CGHS?", a: "Implants and cosmetic procedures are generally not covered and are payable privately. We offer EMI options for these treatments." },
            { q: "How long does reimbursement take?", a: "We hand over a complete claim file (bills, prescriptions, reports) on the day of treatment. Processing time then depends on your department, typically 3–6 weeks." },
          ].map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Reveal className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-ink-900 px-7 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-lg font-semibold text-white">Bring your CGHS card — we&apos;ll handle the rest.</h3>
              <p className="mt-1 text-[13.5px] text-white/65">Mon–Sat 9:30 AM–2:00 PM · {clinic.shortAddress}</p>
            </div>
            <Button size="lg" asChild>
              <Link href="/book-appointment">Book a visit</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
