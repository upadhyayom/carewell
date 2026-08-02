"use client";

/** Shared storage for website-chatbot leads & bookings.
 *  Client-only (localStorage) — read inside useEffect to stay SSR-safe. */

import type { Lead, Appointment } from "@/lib/data/types";

const LEADS_KEY = "cw-chat-leads";
const APPTS_KEY = "cw-chat-appointments";

export interface ChatLeadInput {
  name: string;
  phone: string;
  treatment: string;
  urgency: string;
  timeline: string;
  cghs: boolean;
  score: "Hot" | "Warm" | "Cold";
  value: number;
  slot?: { date: string; label: string; time: string };
  source?: "chatbot" | "booking-form";
}

function read<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, items: T[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {}
}

export function saveChatLead(input: ChatLeadInput): { lead: Lead; appointment?: Appointment } {
  const now = new Date();
  const iso = now.toISOString();
  const existing = read<Lead>(LEADS_KEY);
  const n = 9001 + existing.length;

  const lead: Lead = {
    id: `LD-${n}`,
    name: input.name,
    phone: input.phone,
    city: "—",
    treatment: input.treatment,
    source: "Website",
    campaign: "Website Chatbot",
    stage: input.slot ? "Appointment" : "New",
    value: input.value,
    score: input.score,
    owner: "Asha (Chatbot)",
    createdAt: iso,
    nextFollowUp: iso.slice(0, 10),
    timeline: [
      { at: iso, type: "created", text: "Lead captured by website chatbot" },
      { at: iso, type: "note", text: `Concern: ${input.treatment} · Urgency: ${input.urgency} · Visit: ${input.timeline}${input.cghs ? " · CGHS card holder" : ""}` },
      ...(input.slot
        ? [{ at: iso, type: "stage" as const, text: `Appointment requested — ${input.slot.label} at ${input.slot.time}` }]
        : []),
    ],
    notes: [
      `Chatbot score: ${input.score}${input.cghs ? " · CGHS/DGEHS/ECHS beneficiary" : ""}`,
    ],
  };
  write(LEADS_KEY, [lead, ...existing]);

  let appointment: Appointment | undefined;
  if (input.slot) {
    const appts = read<Appointment>(APPTS_KEY);
    appointment = {
      id: `APT-9${(101 + appts.length).toString().padStart(3, "0")}`,
      patientId: "—",
      patientName: input.name,
      phone: input.phone,
      doctorId: "dr-ananya",
      treatment: input.treatment,
      date: input.slot.date,
      time: input.slot.time,
      durationMin: 30,
      status: "Pending",
      source: "Website",
      billing: { amount: 0, status: "—" },
      notes: `Booked via website chatbot · ${input.score} lead${input.cghs ? " · CGHS" : ""}`,
    };
    write(APPTS_KEY, [appointment, ...appts]);
  }

  // Notify the clinic + central database (works once env keys are set — see AUTOMATION.md)
  try {
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: input.source ?? "chatbot",
        name: input.name,
        phone: input.phone,
        treatment: input.treatment,
        urgency: input.urgency,
        timeline: input.timeline,
        cghs: input.cghs,
        score: input.score,
        slotDate: input.slot?.date,
        slotTime: input.slot?.time,
      }),
      keepalive: true,
    });
  } catch {}

  return { lead, appointment };
}

export const readChatLeads = () => read<Lead>(LEADS_KEY);
export const readChatAppointments = () => read<Appointment>(APPTS_KEY);
