import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone, MessageCircle, CalendarCheck, MapPin, Clock, BadgeCheck, Star,
  ShieldCheck, Stethoscope, Baby, Sparkles, Syringe, Smile, CircleDot,
  Scan, Accessibility, Car, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section, SectionHeading, Eyebrow } from "@/components/site/section";
import { ClinicImage, treatmentPhoto } from "@/components/site/clinic-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Parallax } from "@/components/site/scroll-fx";
import { clinic } from "@/lib/data/clinic";
import { doctors } from "@/lib/data/people";
import { treatments } from "@/lib/data/treatments";
import { inr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CareWell Dental Clinic, Dwarka — CGHS Empanelled | Implants, Braces, Kids Dentistry",
  description:
    "CGHS empanelled dental clinic near Dwarka Mor metro, New Delhi. Implants, root canal, braces, aligners & kids dentistry. Open Mon–Sat 9:30 AM–2:00 PM. Book on WhatsApp.",
};

const serviceIcons: Record<string, React.ElementType> = {
  "dental-implants": Syringe,
  "root-canal": CircleDot,
  braces: Smile,
  aligners: Smile,
  "smile-design": Sparkles,
  veneers: Sparkles,
  "teeth-whitening": Sparkles,
  "kids-dentistry": Baby,
  scaling: ShieldCheck,
  extraction: Stethoscope,
  "wisdom-tooth": Stethoscope,
  dentures: Smile,
};

export default function HomePage() {
  return (
    <>
      {/* ------------------------------ HERO ------------------------------ */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-50/70 via-transparent to-transparent" />
        <Section className="relative pb-10 pt-10 md:pb-16 md:pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="gap-1.5 py-1"><BadgeCheck className="size-3.5" /> CGHS Empanelled</Badge>
                  <Badge variant="secondary" className="py-1">2 min from Dwarka Mor Metro</Badge>
                </div>
                <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-ink-900 md:text-5xl">
                  Trusted dental clinic in Dwarka, New Delhi for your whole family
                </h1>
                <p className="mt-4 max-w-lg text-pretty text-[16px] leading-relaxed text-ink-500">
                  Implants, braces, root canals and kids&apos; dentistry — with written
                  estimates before treatment and cashless facility for CGHS card holders.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button size="lg" asChild>
                    <Link href="/book-appointment"><CalendarCheck /> Book Appointment</Link>
                  </Button>
                  <Button size="lg" variant="whatsapp" asChild>
                    <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle /> WhatsApp
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={`tel:${clinic.emergencyPhone}`}><Phone /> {clinic.emergencyPhone}</a>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-4 fill-[#fbbc05] text-[#fbbc05]" />
                    <a href={clinic.mapsLink} target="_blank" rel="noopener noreferrer" className="font-medium text-ink-900 hover:text-brand-700">Rated on Google — read our reviews</a>
                  </span>
                  <span><b className="text-ink-900">CGHS</b> cashless available</span>
                  <span><b className="text-ink-900">EMI</b> on major treatments</span>
                </div>
              </Reveal>
            </div>

            {/* Photo collage */}
            <Reveal delay={0.15} className="relative">
              <div className="grid grid-cols-5 grid-rows-6 gap-3" style={{ height: 440 }}>
                <ClinicImage id="hero" alt="CareWell Dental Clinic operatory" className="col-span-3 row-span-6 rounded-3xl shadow-soft" />
                <ClinicImage id="chair" alt="Dentist treating a patient" className="col-span-2 row-span-3 rounded-3xl shadow-soft" />
                <ClinicImage id="kid" alt="Child at the dentist" className="col-span-2 row-span-3 rounded-3xl shadow-soft" />
              </div>
              <Parallax speed={26} className="absolute -left-3 bottom-8 hidden sm:block">
                <div className="glass flex items-center gap-3 rounded-2xl p-3.5 shadow-lift ring-hairline">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-700 text-white"><BadgeCheck className="size-5" /></span>
                  <span>
                    <span className="block text-[13px] font-semibold text-ink-900">CGHS · DGEHS · ECHS</span>
                    <span className="block text-[11.5px] text-ink-500">Cashless & reimbursement assistance</span>
                  </span>
                </div>
              </Parallax>
              <Parallax speed={-20} className="absolute -right-2 top-6 hidden sm:block">
                <div className="glass rounded-2xl p-3.5 shadow-lift ring-hairline">
                  <span className="flex items-center gap-1 text-[13px] font-semibold text-ink-900">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="size-3.5 fill-[#fbbc05] text-[#fbbc05]" />)}
                  </span>
                  <span className="mt-1 block text-[11.5px] text-ink-500">&ldquo;Painless RCT, done in one visit&rdquo;</span>
                </div>
              </Parallax>
            </Reveal>
          </div>
        </Section>
      </div>

      {/* --------------------------- QUICK INFO --------------------------- */}
      <Section className="py-0">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-ink-100 ring-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, t: "Open Mon–Sat · 9:30 AM – 2:00 PM", s: "Sunday closed" },
            { icon: MapPin, t: "Vipin Garden, Dwarka Mor", s: "2 min from Dwarka Mor metro" },
            { icon: BadgeCheck, t: "CGHS cashless facility", s: "Bring your card + referral slip" },
            { icon: Phone, t: "Dental emergency?", s: "Same-day slots · call us" },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-3.5 bg-white p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><x.icon className="size-5" /></span>
              <span>
                <span className="block text-[13.5px] font-semibold text-ink-900">{x.t}</span>
                <span className="block text-[12.5px] text-ink-400">{x.s}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------- SERVICES ---------------------------- */}
      <Section>
        <SectionHeading
          eyebrow="Our Services"
          title="Dental treatments we offer"
          lead="From a simple cleaning to full implants — every treatment starts with a check-up and a written estimate."
        />
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {treatments.map((t) => {
            const Icon = serviceIcons[t.slug] ?? Stethoscope;
            return (
              <StaggerItem key={t.slug}>
                <Link
                  href={`/services/${t.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-3 ring-hairline shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="relative block h-24 overflow-hidden rounded-xl sm:h-28">
                    <ClinicImage
                      id={treatmentPhoto[t.slug] ?? "clinic"}
                      alt={t.name}
                      className="absolute inset-0"
                      imgClassName="transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-lg bg-white/90 text-brand-700 shadow-soft">
                      <Icon className="size-4" />
                    </span>
                  </span>
                  <span className="mt-3 px-1 text-[14.5px] font-semibold text-ink-900">{t.name}</span>
                  <span className="mt-1 px-1 text-[12.5px] text-ink-400">{t.short}</span>
                  <span className="mt-auto px-1 pb-1 pt-3 text-[12.5px] font-medium text-brand-700 opacity-0 transition-opacity group-hover:opacity-100">
                    Know more <ArrowRight className="ml-0.5 inline size-3" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* ------------------------------ CGHS ------------------------------ */}
      <Section className="pt-0">
        <div className="overflow-hidden rounded-3xl bg-ink-900">
          <div className="grid lg:grid-cols-2">
            <div className="p-7 md:p-12">
              <Eyebrow className="bg-white/10 text-brand-300 ring-white/10">Government Panel</Eyebrow>
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
                CGHS empanelled dental centre
              </h2>
              {clinic.cghs.empanelmentNo && (
                <p className="mt-2 text-[13.5px] text-white/60">
                  Empanelment No. {clinic.cghs.empanelmentNo}
                </p>
              )}
              <ul className="mt-6 space-y-3">
                {clinic.cghs.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/85">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand-400" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {clinic.cghs.schemes.map((s) => (
                  <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/15">{s}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/cghs">How it works <ArrowRight /></Link>
                </Button>
                <Button variant="whatsapp" asChild>
                  <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> Check eligibility
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative hidden min-h-[380px] lg:block">
              <ClinicImage id="reception" alt="CareWell reception desk" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/30 to-transparent" />
              <div className="glass absolute bottom-8 right-8 max-w-[260px] rounded-2xl p-4 ring-hairline">
                <p className="text-[13px] font-semibold text-ink-900">Pensioners welcome</p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
                  Our front desk prepares all CGHS claim paperwork for you — bills, forms and prescriptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ----------------------------- DOCTORS ---------------------------- */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Our Doctors" title="Meet our dentists" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.1}>
              <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-hairline shadow-soft">
                <ClinicImage
                  id={["drf", "drm", "drf2"][i] ?? "drf"}
                  alt={d.name}
                  className="h-52 w-full shrink-0"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[17px] font-semibold text-ink-900">{d.name}</h3>
                  <p className="mt-0.5 text-[13px] text-brand-700">{d.role}</p>
                  <p className="mt-1 text-[12.5px] text-ink-400">{d.qualifications}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {d.specialities.slice(0, 3).map((s) => (
                      <Badge key={s} variant="secondary" className="text-[11px]">{s}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-[13px] text-ink-500">
                    <span><b className="text-ink-900 tnum">{d.experienceYears}+</b> yrs</span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5 fill-[#fbbc05] text-[#fbbc05]" />
                      <b className="text-ink-900">{d.rating}</b>
                    </span>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button size="sm" variant="soft" asChild>
                      <Link href="/book-appointment">Book Appointment</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------- FACILITIES --------------------------- */}
      <Section className="bg-white pt-16">
        <SectionHeading eyebrow="Our Facilities" title="A clean, modern and comfortable clinic" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            { icon: Scan, img: "xray", name: clinic.facilities[0].name, note: clinic.facilities[0].note },
            { icon: ShieldCheck, img: "tools", name: clinic.facilities[1].name, note: clinic.facilities[1].note },
            { icon: Syringe, img: "surgery", name: clinic.facilities[2].name, note: clinic.facilities[2].note },
            { icon: Baby, img: "kid", name: clinic.facilities[3].name, note: clinic.facilities[3].note },
            { icon: Accessibility, img: "reception", name: clinic.facilities[4].name, note: clinic.facilities[4].note },
            { icon: Car, img: "clinic", name: clinic.facilities[5].name, note: clinic.facilities[5].note },
          ].map((f, i) => (
            <Reveal key={f.name} delay={i * 0.05}>
              <div className="group relative h-44 overflow-hidden rounded-2xl md:h-52">
                <ClinicImage id={f.img} alt={f.name} className="absolute inset-0" imgClassName="transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <f.icon className="size-4.5 text-brand-300" />
                  <p className="mt-1.5 text-[14px] font-semibold text-white">{f.name}</p>
                  <p className="text-[12px] text-white/65">{f.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl bg-ink-50 px-6 py-5 text-center">
          {[
            { v: "Same-day", l: "emergency slots" },
            { v: "Strict", l: "sterilization every time" },
            { v: "EMI", l: "available on treatments" },
            { v: "2 min", l: "from Dwarka Mor metro" },
          ].map((s) => (
            <span key={s.l} className="text-[13.5px] text-ink-500">
              <b className="text-ink-900">{s.v}</b> {s.l}
            </span>
          ))}
        </div>
      </Section>

      {/* ------------------- REAL GOOGLE REVIEWS ------------------- */}
      <Section>
        <SectionHeading
          eyebrow="Google Reviews"
          title={`Rated ${clinic.stats.googleRating} ★ by ${clinic.stats.googleReviews} patients on Google`}
          lead="Real reviews from our Google profile — patients most often mention painless treatment, clear explanations and caring doctors."
        />
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            "Painless treatment · 18 reviews",
            "Root canal treatment · 16 reviews",
            "Clear explanations · 12 reviews",
            "Caring dentist · 10 reviews",
          ].map((c) => (
            <span key={c} className="rounded-full bg-brand-50 px-3.5 py-1.5 text-[12.5px] font-medium text-brand-800 ring-1 ring-inset ring-brand-600/10">
              {c}
            </span>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Tony JT",
              when: "6 months ago",
              text: "My father is currently undergoing dental treatment here, and we are extremely satisfied with the care.",
            },
            {
              name: "Tamanna Pandey",
              when: "4 months ago",
              text: "Shruti Mam is not only highly skilled but also very caring and patient with her clients. The treatment was painless and handled with great care. I truly appreciate the attention and dedication given to patients here.",
            },
            {
              name: "Sanjay Kumar",
              when: "5 months ago",
              text: "I have known Dr. Smriti from a very long time and have my full faith in her and her entire team. Recently, met Dr. Shruti whose work was highly satisfying, very professional.",
            },
          ].map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
                    {r.name[0]}
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-ink-900">{r.name}</p>
                    <p className="text-xs text-ink-400">{r.when} · on Google</p>
                  </div>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-700">&ldquo;{r.text}&rdquo;</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <a href={clinic.mapsLink} target="_blank" rel="noopener noreferrer">
              Read all {clinic.stats.googleReviews} reviews on Google
            </a>
          </Button>
        </div>
      </Section>

      {/* ------------------- REAL PATIENT VIDEOS ------------------- */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Patient Stories"
          title="Hear it from our patients"
          lead="Real patients sharing their experience at the clinic, in their own words."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {["/assets/testimonial-1.mp4", "/assets/testimonial-2.mp4", "/assets/testimonial-3.mp4"].map((src, i) => (
            <Reveal key={src} delay={i * 0.08}>
              <video
                src={src}
                controls
                playsInline
                preload="metadata"
                className="aspect-[9/16] w-full rounded-2xl bg-ink-900 object-cover shadow-soft ring-hairline sm:aspect-auto"
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-4">
          <div className="overflow-hidden rounded-2xl bg-white p-2 ring-hairline shadow-soft">
            <video
              src="/assets/clinic-tour.mp4"
              controls
              playsInline
              preload="metadata"
              className="max-h-[420px] w-full rounded-xl bg-ink-900 object-cover"
            />
            <p className="px-3 py-2.5 text-center text-[13px] font-medium text-ink-700">
              Take a quick tour of our clinic at Vipin Garden, Dwarka Mor
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------ FAQ ------------------------------- */}
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="FAQs" title="Questions patients ask us every day" className="mb-6" />
            <Accordion type="single" collapsible className="rounded-2xl bg-white px-5 ring-hairline shadow-soft">
              {[
                { q: "Do you accept CGHS cards?", a: "Yes. We are CGHS empanelled and also serve DGEHS, ECHS and CAPF beneficiaries. Bring your card and referral slip; our desk handles the paperwork." },
                { q: "How much will my treatment cost?", a: "It depends on your check-up, so we don't list prices online. After the doctor examines you, you get a written estimate before any treatment starts — and it doesn't change midway. EMI options are available." },
                { q: "Is root canal treatment painful?", a: "No. RCTs are done under local anaesthesia and most patients report little to no pain. Single-visit RCT is available for suitable cases." },
                { q: "Do you see children?", a: "Yes — we have a dedicated kids' corner and both doctors are experienced with young patients. First dental visits are recommended by age 3." },
                { q: "Can I pay in instalments?", a: "EMI options are available for braces, aligners, implants and full-mouth treatments. Ask the front desk for current plans." },
              ].map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="flex flex-col">
            <SectionHeading eyebrow="Visit Us" title="How to reach our clinic" className="mb-6" />
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white ring-hairline shadow-soft">
              <div className="relative min-h-[220px] flex-1">
                <ClinicImage id="clinic" alt="CareWell Dental Clinic building" className="absolute inset-0" />
                <a
                  href={clinic.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-ink-900 shadow-lift"
                >
                  <MapPin className="size-4 text-brand-700" /> Open in Google Maps
                </a>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div className="text-[13.5px] leading-relaxed text-ink-500">
                  <p className="font-semibold text-ink-900">{clinic.name}</p>
                  <p className="mt-1">{clinic.address}</p>
                </div>
                <div className="text-[13.5px] leading-relaxed text-ink-500">
                  <p><b className="text-ink-900">Mon–Sat:</b> 9:30 AM – 2:00 PM</p>
                  <p><b className="text-ink-900">Sun:</b> Closed</p>
                  <p className="mt-1"><b className="text-ink-900">Call:</b> {clinic.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------- FINAL CTA ---------------------------- */}
      <Section className="pt-0 pb-20">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-brand-700 px-7 py-9 text-center sm:flex-row sm:text-left md:px-12">
            <div>
              <h2 className="text-xl font-semibold text-white md:text-2xl">Tooth troubling you? Don&apos;t wait.</h2>
              <p className="mt-1 text-[14px] text-white/75">Same-day appointments for pain and emergencies.</p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/book-appointment"><CalendarCheck /> Book now</Link>
              </Button>
              <Button size="lg" variant="whatsapp" asChild>
                <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
