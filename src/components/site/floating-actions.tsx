"use client";

import { MessageCircle, Phone } from "lucide-react";
import { clinic } from "@/lib/data/clinic";
import { motion } from "framer-motion";

/** Floating WhatsApp + emergency call buttons (mobile-first). */
export function FloatingActions() {
  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-3 no-print">
      <motion.a
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        href={`tel:${clinic.emergencyPhone}`}
        aria-label="Emergency call"
        className="flex size-12 items-center justify-center rounded-full bg-ink-900 text-white shadow-lift transition-transform hover:scale-105 lg:hidden"
      >
        <Phone className="size-5" />
      </motion.a>
      <motion.a
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
        href={clinic.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="size-5" />
        <span className="absolute left-full ml-3 hidden whitespace-nowrap rounded-full bg-ink-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 lg:block">
          Chat with us — replies in minutes
        </span>
        <span className="absolute -right-0.5 -top-0.5 size-3 animate-ping rounded-full bg-[#25D366] opacity-60" />
      </motion.a>
    </div>
  );
}
