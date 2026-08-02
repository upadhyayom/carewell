"use client";

/** Fetch + map central website_leads (Supabase) into the admin's Lead /
 *  Appointment shapes. Returns [] until the Supabase env vars are set. */

import type { Lead, Appointment } from "@/lib/data/types";

export interface CentralRow {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  treatment: string | null;
  urgency: string | null;
  timeline: string | null;
  cghs: boolean;
  score: string | null;
  slot_date: string | null;
  slot_time: string | null;
  source: string | null;
  status: string;
}

export async function fetchCentralRows(): Promise<CentralRow[]> {
  try {
    const r = await fetch("/api/admin/leads", { cache: "no-store" });
    const j = await r.json();
    return Array.isArray(j.rows) ? (j.rows as CentralRow[]) : [];
  } catch {
    return [];
  }
}

export function rowToLead(row: CentralRow): Lead {
  const booked = !!(row.slot_date && row.slot_time);
  return {
    id: `WL-${row.id.slice(0, 6).toUpperCase()}`,
    name: row.name,
    phone: row.phone,
    city: "—",
    treatment: row.treatment ?? "General",
    source: "Website",
    campaign: row.source === "booking-form" ? "Booking form" : "Asha chatbot",
    stage: booked ? "Appointment" : "New",
    value: 5000,
    score: (row.score as Lead["score"]) ?? "Warm",
    owner: "Website",
    createdAt: row.created_at,
    nextFollowUp: row.created_at.slice(0, 10),
    timeline: [
      { at: row.created_at, type: "created", text: "Captured on the website" },
      ...(row.urgency || row.timeline
        ? [{ at: row.created_at, type: "note" as const, text: `Urgency: ${row.urgency ?? "—"} · Visit: ${row.timeline ?? "—"}${row.cghs ? " · CGHS card holder" : ""}` }]
        : []),
      ...(booked
        ? [{ at: row.created_at, type: "stage" as const, text: `Requested slot — ${row.slot_date} at ${row.slot_time}` }]
        : []),
    ],
    notes: [],
  };
}

export function rowToAppointment(row: CentralRow): Appointment | null {
  if (!row.slot_date || !row.slot_time) return null;
  return {
    id: `APT-W${row.id.slice(0, 4).toUpperCase()}`,
    patientId: "—",
    patientName: row.name,
    phone: row.phone,
    doctorId: "dr-ananya",
    treatment: row.treatment ?? "General",
    date: row.slot_date,
    time: row.slot_time,
    durationMin: 30,
    status: "Pending",
    source: "Website",
    billing: { amount: 0, status: "—" },
    notes: `Website booking${row.cghs ? " · CGHS" : ""}`,
  };
}
