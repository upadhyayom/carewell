"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Check, Phone } from "lucide-react";
import { clinic } from "@/lib/data/clinic";
import { saveChatLead, type ChatLeadInput } from "@/lib/chat-leads";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Scripted lead-qualifying assistant — no backend needed.             */
/* ------------------------------------------------------------------ */

type Msg = { from: "bot" | "user"; text: string };

type Step =
  | "concern" | "urgency" | "visit" | "cghs"
  | "name" | "phone" | "slotAsk" | "slotDay" | "slotTime" | "done";

const CONCERNS = [
  { label: "Tooth pain", value: 9500, treatment: "Tooth Pain / Root Canal" },
  { label: "Braces / Aligners", value: 60000, treatment: "Braces / Aligners" },
  { label: "Dental implants", value: 45000, treatment: "Dental Implants" },
  { label: "Whitening / Smile", value: 20000, treatment: "Smile Makeover" },
  { label: "Kids dentistry", value: 3000, treatment: "Kids Dentistry" },
  { label: "Check-up & cleaning", value: 1500, treatment: "Check-up & Cleaning" },
];

const DAYS = [
  { date: "2026-07-19", label: "Today, 19 Jul" },
  { date: "2026-07-20", label: "Tomorrow, 20 Jul" },
  { date: "2026-07-21", label: "Tue, 21 Jul" },
];

const TIMES = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"];

function scoreLead(d: Partial<ChatLeadInput>): "Hot" | "Warm" | "Cold" {
  const urgent = d.urgency?.includes("today") || d.urgency?.includes("soon as possible");
  const fast = d.timeline === "Today / tomorrow" || d.timeline === "This week";
  if ((urgent && fast) || ((d.value ?? 0) >= 45000 && fast)) return "Hot";
  if (urgent || fast || (d.value ?? 0) >= 45000) return "Warm";
  return "Cold";
}

export function Chatbot() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState<Msg[]>([]);
  const [step, setStep] = React.useState<Step>("concern");
  const [typing, setTyping] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [inputError, setInputError] = React.useState<string | null>(null);
  const data = React.useRef<Partial<ChatLeadInput>>({});
  const started = React.useRef(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollDown = React.useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const botSay = React.useCallback(
    (text: string, delay = 700) =>
      new Promise<void>((resolve) => {
        setTyping(true);
        scrollDown();
        setTimeout(() => {
          setTyping(false);
          setMsgs((m) => [...m, { from: "bot", text }]);
          scrollDown();
          resolve();
        }, delay);
      }),
    [scrollDown]
  );

  // Auto-open once per browser session, shortly after landing
  React.useEffect(() => {
    try {
      if (window.sessionStorage.getItem("cw-chat-auto")) return;
      const t = setTimeout(() => {
        window.sessionStorage.setItem("cw-chat-auto", "1");
        setOpen(true);
      }, 2200);
      return () => clearTimeout(t);
    } catch {}
  }, []);

  React.useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      (async () => {
        await botSay("Namaste! I'm Asha from CareWell Dental Clinic 🙏", 500);
        await botSay("I can help you find the right treatment and book a visit in under a minute. What brings you here today?");
      })();
    }
  }, [open, botSay]);

  const userSay = (text: string) => {
    setMsgs((m) => [...m, { from: "user", text }]);
    scrollDown();
  };

  /* ---------------- step handlers ---------------- */

  const pickConcern = async (c: (typeof CONCERNS)[number]) => {
    userSay(c.label);
    data.current.treatment = c.treatment;
    data.current.value = c.value;
    setStep("urgency");
    if (c.label === "Tooth pain") {
      await botSay("Sorry to hear that! How bad is the pain right now?");
    } else {
      await botSay(`Great choice — our doctors handle ${c.label.toLowerCase()} every day. How soon are you looking to start?`);
    }
  };

  const pickUrgency = async (u: string) => {
    userSay(u);
    data.current.urgency = u;
    setStep("visit");
    await botSay("When would you like to visit us?");
  };

  const pickVisit = async (v: string) => {
    userSay(v);
    data.current.timeline = v;
    setStep("cghs");
    await botSay("One quick thing — do you have a CGHS, DGEHS or ECHS card? (We're empanelled, so your treatment may be cashless.)");
  };

  const pickCghs = async (yes: boolean) => {
    userSay(yes ? "Yes, I have a card" : "No");
    data.current.cghs = yes;
    setStep("name");
    if (yes) await botSay("Wonderful — bring your card and referral slip; our desk handles all the paperwork. May I know your name?");
    else await botSay("No problem at all. May I know your name?");
  };

  const submitName = async () => {
    const name = input.trim();
    if (name.length < 2) {
      setInputError("Please enter your name");
      return;
    }
    setInput("");
    setInputError(null);
    userSay(name);
    data.current.name = name;
    setStep("phone");
    await botSay(`Nice to meet you, ${name.split(" ")[0]}! And your mobile number, so our team can reach you?`);
  };

  const submitPhone = async () => {
    const digits = input.replace(/\D/g, "").replace(/^91/, "");
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setInputError("Please enter a valid 10-digit mobile number");
      return;
    }
    setInput("");
    setInputError(null);
    userSay(`+91 ${digits.slice(0, 5)} ${digits.slice(5)}`);
    data.current.phone = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    setStep("slotAsk");
    await botSay("Perfect. Would you like to lock an appointment slot right now, or should our team call you first?");
  };

  const pickSlotAsk = async (book: boolean) => {
    if (book) {
      userSay("Pick a slot now");
      setStep("slotDay");
      await botSay("Which day works for you?");
    } else {
      userSay("Ask the team to call me");
      finish(undefined);
    }
  };

  const pickDay = async (d: (typeof DAYS)[number]) => {
    userSay(d.label);
    data.current.slot = { date: d.date, label: d.label, time: "" };
    setStep("slotTime");
    await botSay("And what time suits you best?");
  };

  const pickTime = async (t: string) => {
    userSay(t);
    finish({ ...data.current.slot!, time: t });
  };

  const finish = async (slot?: { date: string; label: string; time: string }) => {
    const score = scoreLead(data.current);
    const payload: ChatLeadInput = {
      name: data.current.name!,
      phone: data.current.phone!,
      treatment: data.current.treatment!,
      urgency: data.current.urgency!,
      timeline: data.current.timeline!,
      cghs: !!data.current.cghs,
      score,
      value: data.current.value ?? 5000,
      slot,
    };
    data.current.score = score;
    data.current.slot = slot;
    saveChatLead(payload);
    setStep("done");
    if (slot) {
      await botSay(`Done, ${payload.name.split(" ")[0]}! 🎉 Your visit for ${payload.treatment} is requested for ${slot.label} at ${slot.time}.`);
      await botSay("Our front desk will confirm on a quick call shortly. You'll also get a WhatsApp reminder before your visit.");
    } else {
      const when = score === "Hot" ? "within 15 minutes" : score === "Warm" ? "within 2 hours" : "later today";
      await botSay(`All set, ${payload.name.split(" ")[0]}! Our team will call you ${when} on ${payload.phone}.`);
    }
    await botSay("Anything urgent in the meantime? You can reach us instantly on WhatsApp 👇");
  };

  /* ---------------- chips per step ---------------- */

  const chips: { label: string; onClick: () => void }[] =
    step === "concern"
      ? CONCERNS.map((c) => ({ label: c.label, onClick: () => pickConcern(c) }))
      : step === "urgency"
      ? (data.current.treatment === "Tooth Pain / Root Canal"
          ? ["Severe — need help today", "On & off for a few days", "Mild sensitivity"]
          : ["As soon as possible", "In the next few weeks", "Just exploring"]
        ).map((u) => ({ label: u, onClick: () => pickUrgency(u) }))
      : step === "visit"
      ? ["Today / tomorrow", "This week", "Next week or later"].map((v) => ({ label: v, onClick: () => pickVisit(v) }))
      : step === "cghs"
      ? [
          { label: "Yes, CGHS / DGEHS / ECHS", onClick: () => pickCghs(true) },
          { label: "No", onClick: () => pickCghs(false) },
        ]
      : step === "slotAsk"
      ? [
          { label: "📅 Pick a slot now", onClick: () => pickSlotAsk(true) },
          { label: "📞 Ask the team to call me", onClick: () => pickSlotAsk(false) },
        ]
      : step === "slotDay"
      ? DAYS.map((d) => ({ label: d.label, onClick: () => pickDay(d) }))
      : step === "slotTime"
      ? TIMES.map((t) => ({ label: t, onClick: () => pickTime(t) }))
      : [];

  const showInput = step === "name" || step === "phone";

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with us"
        className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2.5 rounded-full bg-ink-900 pl-4 pr-5 text-white shadow-lift transition-transform hover:scale-105 no-print"
      >
        <span className="relative flex size-8 items-center justify-center rounded-full bg-brand-500">
          <MessageCircle className="size-4.5" />
          <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-[#25D366] ring-2 ring-ink-900" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[13px] font-semibold">{open ? "Close chat" : "Chat with Asha"}</span>
          {!open && <span className="block text-[10.5px] text-white/60">Replies instantly</span>}
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 flex w-[calc(100vw-40px)] max-w-[380px] flex-col overflow-hidden rounded-3xl bg-white shadow-lift ring-hairline no-print"
            style={{ height: "min(560px, calc(100dvh - 130px))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-ink-900 px-4 py-3.5">
              <span className="relative flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[15px] font-bold text-white">
                A
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[#25D366] ring-2 ring-ink-900" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-white">Asha</p>
                <p className="text-[11.5px] text-white/60">CareWell Dental Clinic · online</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white">
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="scroll-thin flex-1 space-y-2.5 overflow-y-auto bg-[#f4f7f6] px-3.5 py-4">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                      m.from === "user"
                        ? "rounded-br-md bg-brand-700 text-white"
                        : "rounded-bl-md bg-white text-ink-900 shadow-soft ring-hairline"
                    )}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-soft ring-hairline">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-ink-300"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {step === "done" && !typing && (
                <div className="flex justify-start pt-1">
                  <a
                    href={clinic.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[13px] font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="size-4" /> WhatsApp us now
                  </a>
                </div>
              )}
            </div>

            {/* Chips / input */}
            <div className="border-t border-ink-100 bg-white p-3">
              {chips.length > 0 && !typing && (
                <div className="flex flex-wrap gap-1.5">
                  {chips.map((c) => (
                    <button
                      key={c.label}
                      onClick={c.onClick}
                      className="rounded-full border border-brand-600/30 bg-brand-50 px-3.5 py-2 text-[12.5px] font-medium text-brand-800 transition-colors hover:bg-brand-100"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
              {showInput && (
                <div>
                  <div className="flex items-center gap-2">
                    {step === "phone" && (
                      <span className="flex h-10 items-center gap-1 rounded-xl bg-ink-50 px-2.5 text-[13px] font-medium text-ink-500">
                        <Phone className="size-3.5" /> +91
                      </span>
                    )}
                    <input
                      autoFocus
                      value={input}
                      inputMode={step === "phone" ? "numeric" : "text"}
                      onChange={(e) => {
                        setInput(e.target.value);
                        setInputError(null);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && (step === "name" ? submitName() : submitPhone())}
                      placeholder={step === "name" ? "Your name…" : "10-digit mobile number"}
                      className="h-10 flex-1 rounded-xl border border-ink-200 bg-white px-3.5 text-[13.5px] outline-none placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
                    />
                    <button
                      onClick={() => (step === "name" ? submitName() : submitPhone())}
                      aria-label="Send"
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white transition-colors hover:bg-brand-800"
                    >
                      <Send className="size-4" />
                    </button>
                  </div>
                  {inputError && <p className="mt-1.5 px-1 text-[11.5px] text-critical">{inputError}</p>}
                </div>
              )}
              {step === "done" && (
                <p className="flex items-center justify-center gap-1.5 py-1 text-[11.5px] text-ink-400">
                  <Check className="size-3.5 text-brand-600" /> Your details are with our front desk
                </p>
              )}
              <p className="mt-2 text-center text-[10px] text-ink-300">
                No spam — we only call about your appointment.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
