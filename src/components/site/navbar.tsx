"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { clinic } from "@/lib/data/clinic";
import { treatments } from "@/lib/data/treatments";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const nav = [
  { label: "Services", href: "/services", mega: true },
  { label: "CGHS Panel", href: "/cghs" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top strip */}
      <div className="hidden items-center justify-center gap-6 bg-ink-900 px-4 py-1.5 text-[12px] text-white/85 md:flex">
        <span>Mon–Sat 9:30 AM – 2:00 PM · Near Dwarka Mor Metro</span>
        <span className="h-3 w-px bg-white/20" />
        <a href={`tel:${clinic.emergencyPhone}`} className="inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-brand-300">
          <Phone className="size-3" /> Emergency: {clinic.emergencyPhone}
        </a>
        <span className="h-3 w-px bg-white/20" />
        <span>{clinic.shortAddress}</span>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled ? "glass shadow-soft" : "bg-transparent"
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.mega ? (
                <button
                  key={item.href}
                  onMouseEnter={() => setMegaOpen(true)}
                  onClick={() => setMegaOpen((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors",
                    pathname.startsWith("/services")
                      ? "text-brand-700"
                      : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("size-3.5 transition-transform", megaOpen && "rotate-180")} />
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors",
                    pathname.startsWith(item.href)
                      ? "text-brand-700"
                      : "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Button variant="whatsapp" size="sm" asChild>
              <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/book-appointment">Book Appointment</Link>
            </Button>
          </div>

          <button
            className="rounded-lg p-2 text-ink-700 hover:bg-ink-50 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Services mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full hidden justify-center px-8 lg:flex"
            >
              <div className="mt-2 w-full max-w-5xl rounded-2xl bg-white p-5 shadow-lift ring-hairline">
                <div className="grid grid-cols-3 gap-1">
                  {treatments.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/services/${t.slug}`}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                    >
                      <span className="mt-0.5 text-lg">{t.emoji}</span>
                      <span>
                        <span className="block text-[13.5px] font-medium text-ink-900 group-hover:text-brand-800">
                          {t.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-400">{t.short}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-ink-50 px-4 py-3">
                  <span className="text-[13px] text-ink-500">Not sure what you need?</span>
                  <Link href="/book-appointment" className="text-[13px] font-semibold text-brand-700 hover:underline">
                    Book a consultation →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-ink-100 bg-white lg:hidden"
            >
              <div className="space-y-1 px-5 py-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-ink-50"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex gap-2 pt-3">
                  <Button variant="whatsapp" className="flex-1" asChild>
                    <a href={clinic.whatsappLink}>
                      <MessageCircle /> WhatsApp
                    </a>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/book-appointment">Book Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
