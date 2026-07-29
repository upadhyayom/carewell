import type { Metadata } from "next";
import {
  Building2,
  Car,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  TrainFront,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Eyebrow, Section, SectionHeading } from "@/components/site/section";
import { CtaStrip } from "@/components/site/cta-strip";
import { EnquiryForm } from "@/components/site/contact/enquiry-form";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Contact & Directions | CareWell Dental Clinic, Sector 47 Dwarka",
  description:
    "Find CareWell Dental Clinic on Dwarka Mor, Sector 47 Dwarka. Phone, WhatsApp, emergency line, opening hours, parking and how to reach us by metro or road.",
};

const reachItems = [
  {
    icon: TrainFront,
    title: "By metro",
    text: "Nearest station: HUDA City Centre (Yellow Line), ~15 minutes by cab or shared auto down Dwarka Mor. Rapid Metro Sector 55–56 is a 12-minute drive via Golf Course Extension.",
  },
  {
    icon: Car,
    title: "By road",
    text: "We're on the main Dwarka Mor stretch in Sector 47, 5 minutes from Subhash Chowk and 10 from Rajiv Chowk on NH-48. Exit at the Plaza One complex — the clinic is on the 2nd floor.",
  },
  {
    icon: Building2,
    title: "Landmarks",
    text: "Look for the Plaza One tower opposite the Omaxe Celebration Mall side lane. We're two buildings after the big fuel station, with clinic signage visible from the service road.",
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-6 pt-14 sm:px-8 md:pt-20">
          <Reveal className="max-w-2xl">
            <Eyebrow>Contact us</Eyebrow>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
              Say hello — <span className="text-gradient">we actually pick up</span>
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
              Call, WhatsApp, email or walk in. Our front desk answers within three rings during
              clinic hours, and emergencies always jump the queue.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* ---------------------------------------------------------- */}
            {/* Left — contact details                                      */}
            {/* ---------------------------------------------------------- */}
            <div className="space-y-5">
              {/* Address */}
              <Reveal>
                <div className="flex gap-4 rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{clinic.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{clinic.address}</p>
                  </div>
                </div>
              </Reveal>

              {/* Phone + email row */}
              <Stagger className="grid gap-5 sm:grid-cols-2">
                <StaggerItem>
                  <a
                    href={`tel:${clinic.phone}`}
                    className="group flex h-full gap-4 rounded-2xl bg-white p-5 ring-hairline shadow-soft transition-shadow hover:shadow-lift"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                        Reception
                      </p>
                      <p className="tnum mt-1 text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                        {clinic.phone}
                      </p>
                    </div>
                  </a>
                </StaggerItem>
                <StaggerItem>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="group flex h-full gap-4 rounded-2xl bg-white p-5 ring-hairline shadow-soft transition-shadow hover:shadow-lift"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Mail className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                        Email
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                        {clinic.email}
                      </p>
                    </div>
                  </a>
                </StaggerItem>
              </Stagger>

              {/* Emergency card */}
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl bg-ink-900 p-6 text-white">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                      background:
                        "radial-gradient(320px 180px at 90% 0%, rgba(208,59,59,0.35), transparent 65%), radial-gradient(260px 160px at 0% 100%, rgba(13,148,136,0.35), transparent 60%)",
                    }}
                  />
                  <div className="relative flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-red-400" />
                        </span>
                        24×7 dental emergency
                      </p>
                      <a
                        href={`tel:${clinic.emergencyPhone}`}
                        className="tnum mt-2 block text-2xl font-semibold tracking-tight transition-colors hover:text-brand-300"
                      >
                        {clinic.emergencyPhone}
                      </a>
                    </div>
                    <Button variant="whatsapp" asChild>
                      <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle /> WhatsApp us
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>

              {/* Hours */}
              <Reveal>
                <div className="rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                    <Clock className="size-4 text-brand-600" /> Opening hours
                  </p>
                  <table className="mt-3 w-full text-[13px]">
                    <tbody>
                      {clinic.hours.map((h) => (
                        <tr key={h.days} className="border-t border-ink-50 first:border-0">
                          <td className="py-2.5 text-ink-500">{h.days}</td>
                          <td className="tnum py-2.5 text-right font-medium text-ink-900">
                            {h.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-1 border-t border-ink-50 pt-3 text-xs text-ink-400">
                    Last appointment 30 minutes before closing · emergencies any time.
                  </p>
                </div>
              </Reveal>

              {/* Parking */}
              <Reveal>
                <div className="flex gap-4 rounded-2xl bg-brand-50/70 p-5 ring-1 ring-inset ring-brand-600/10">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-soft">
                    <Car className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">Parking & access</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{clinic.parking}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* Right — map placeholder + enquiry form                      */}
            {/* ---------------------------------------------------------- */}
            <div className="space-y-5">
              <Reveal delay={0.08}>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-blue-50 ring-hairline shadow-soft">
                  <div className="absolute inset-0 bg-grid" />
                  {/* Faux roads */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[18%] top-0 h-full w-3 -rotate-6 rounded-full bg-white/80 shadow-[0_0_0_1px_rgba(10,15,14,0.04)]" />
                    <div className="absolute left-0 top-[34%] h-3 w-full rotate-2 rounded-full bg-white/80 shadow-[0_0_0_1px_rgba(10,15,14,0.04)]" />
                    <div className="absolute right-[12%] top-0 h-full w-2 rotate-12 rounded-full bg-white/60" />
                    <div className="absolute left-[42%] top-[15%] size-16 rounded-xl bg-brand-100/60" />
                    <div className="absolute right-[22%] bottom-[18%] size-20 rounded-xl bg-blue-100/50" />
                    <div className="absolute left-[10%] bottom-[10%] size-12 rounded-full bg-emerald-100/60" />
                  </div>

                  <div className="relative flex h-72 flex-col items-center justify-center sm:h-80">
                    {/* Map pin */}
                    <div className="relative">
                      <span className="absolute -inset-4 animate-ping rounded-full bg-brand-500/20 [animation-duration:2.2s]" />
                      <svg viewBox="0 0 48 48" className="relative size-14 drop-shadow-lg" aria-hidden>
                        <path
                          d="M24 3C15.7 3 9 9.7 9 18c0 10.5 15 27 15 27s15-16.5 15-27c0-8.3-6.7-15-15-15Z"
                          className="fill-brand-600"
                        />
                        <circle cx="24" cy="18" r="6" className="fill-white" />
                      </svg>
                    </div>
                    <p className="mt-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900 shadow-soft backdrop-blur">
                      {clinic.shortAddress}
                    </p>
                    <Button className="mt-5" asChild>
                      <a href={clinic.mapsLink} target="_blank" rel="noopener noreferrer">
                        Open in Google Maps <ExternalLink />
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>

              {/* Quick enquiry */}
              <Reveal delay={0.12}>
                <div className="rounded-3xl bg-white p-6 ring-hairline shadow-soft sm:p-7">
                  <h2 className="text-lg font-semibold tracking-tight text-ink-900">
                    Quick enquiry
                  </h2>
                  <p className="mt-1 text-sm text-ink-500">
                    Not ready to book? Ask us anything — costs, insurance, second opinions.
                  </p>
                  <div className="mt-5">
                    <EnquiryForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* How to reach                                                   */}
      {/* ------------------------------------------------------------ */}
      <Section>
        <SectionHeading
          eyebrow="How to reach us"
          title="Finding us is the easy part"
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {reachItems.map((r) => (
            <StaggerItem key={r.title} className="h-full">
              <div className="h-full rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-shadow hover:shadow-lift">
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/10">
                  <r.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-ink-900">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaStrip
        title="Prefer to just come in?"
        text="Walk-ins are welcome six days a week — or book a slot and skip the wait entirely."
      />
    </>
  );
}
