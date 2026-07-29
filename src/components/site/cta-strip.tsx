import Link from "next/link";
import { MessageCircle, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinic } from "@/lib/data/clinic";
import { Reveal } from "@/components/motion";

export function CtaStrip({
  title = "Ready for a healthier smile?",
  text = "Book a consultation — get a written treatment plan and estimate before anything begins.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-5 pb-16 sm:px-8 md:pb-24">
      <Reveal className="mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-12 text-center md:px-16 md:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(600px 300px at 20% 0%, rgba(13,148,136,0.5), transparent 60%), radial-gradient(500px 260px at 85% 100%, rgba(42,120,214,0.35), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-white/70">
              {text}
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/book-appointment">
                  <CalendarCheck /> Book Appointment
                </Link>
              </Button>
              <Button size="lg" variant="whatsapp" asChild>
                <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp Us
                </a>
              </Button>
            </div>
            <p className="mt-5 text-xs text-white/50">
              Same-day emergency slots available · Call {clinic.emergencyPhone}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
