import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function Youtube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
import { Logo } from "./logo";
import { clinic } from "@/lib/data/clinic";
import { treatments } from "@/lib/data/treatments";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
            {clinic.tagline} Serving Dwarka families since {clinic.established} with
            evidence-based, anxiety-free dentistry.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { icon: Instagram, href: clinic.social.instagram, label: "Instagram" },
              { icon: Facebook, href: clinic.social.facebook, label: "Facebook" },
              { icon: Youtube, href: clinic.social.youtube, label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full bg-ink-50 text-ink-500 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-brand-50 px-3.5 py-2.5 text-[13px] text-brand-800 ring-1 ring-inset ring-brand-600/10">
            <span className="font-semibold">★ {clinic.stats.googleRating}</span>
            <span className="text-brand-700/70">· {clinic.stats.googleReviews.toLocaleString("en-IN")} Google reviews</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[13px] font-semibold uppercase tracking-wider text-ink-400">Treatments</h4>
          <ul className="mt-4 grid gap-2.5">
            {treatments.slice(0, 7).map((t) => (
              <li key={t.slug}>
                <Link href={`/services/${t.slug}`} className="text-sm text-ink-500 transition-colors hover:text-brand-700">
                  {t.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="text-sm font-medium text-brand-700 hover:underline">
                All services →
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[13px] font-semibold uppercase tracking-wider text-ink-400">Clinic</h4>
          <ul className="mt-4 grid gap-2.5">
            {[
              { label: "About Us", href: "/about" },
              { label: "CGHS Panel", href: "/cghs" },
              { label: "CareWell Academy", href: "/academy" },
              { label: "Blog", href: "/blog" },
              { label: "Smile Stories", href: "/social-proof" },
              { label: "Contact", href: "/contact" },
              { label: "Book Appointment", href: "/book-appointment" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-500 transition-colors hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[13px] font-semibold uppercase tracking-wider text-ink-400">Visit Us</h4>
          <ul className="mt-4 grid gap-3 text-sm text-ink-500">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" />
              {clinic.address}
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <a href={`tel:${clinic.phone}`} className="hover:text-brand-700">{clinic.phone}</a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <a href={`mailto:${clinic.email}`} className="hover:text-brand-700">{clinic.email}</a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>
                {clinic.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-[12.5px] text-ink-400 sm:flex-row sm:px-8">
          <span>© 2026 {clinic.name} · Reg. {clinic.regNo} · CGHS Empanelment {clinic.cghs.empanelmentNo}</span>
          <span className="inline-flex items-center gap-3">
            <Link href="/admin/login" className="transition-colors hover:text-brand-700">Staff Login</Link>
            <span className="h-3 w-px bg-ink-200" />
            <span>Powered by CareWell Dental Clinic</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
