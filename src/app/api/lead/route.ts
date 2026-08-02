import { NextResponse } from "next/server";

/**
 * Automation hub — every website lead/booking is POSTed here.
 *
 * Two integrations, both optional and controlled by environment variables
 * (set them in Vercel → Project → Settings → Environment Variables):
 *
 * 1. WEB3FORMS_ACCESS_KEY  → instant email to the clinic inbox for every
 *    lead/booking (free key from https://web3forms.com — 2 minutes).
 * 2. SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY → every lead is stored
 *    centrally in Supabase (run supabase-setup.sql there first).
 *
 * With neither set, this endpoint safely does nothing — the site still works.
 */

interface LeadPayload {
  kind: "chatbot" | "booking-form";
  name: string;
  phone: string;
  treatment: string;
  urgency?: string;
  timeline?: string;
  cghs?: boolean;
  score?: string;
  slotDate?: string;
  slotTime?: string;
  notes?: string;
}

export async function POST(req: Request) {
  let p: LeadPayload;
  try {
    p = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!p?.name || !p?.phone) return NextResponse.json({ ok: false }, { status: 400 });

  const results: Record<string, boolean> = {};

  /* ---- 1. Instant email notification (Web3Forms) ---- */
  const w3key = process.env.WEB3FORMS_ACCESS_KEY;
  if (w3key) {
    const booked = p.slotDate && p.slotTime;
    const lines = [
      `Name: ${p.name}`,
      `Phone: ${p.phone}`,
      `Treatment: ${p.treatment}`,
      p.urgency ? `Urgency: ${p.urgency}` : "",
      p.timeline ? `Wants to visit: ${p.timeline}` : "",
      p.cghs ? "CGHS/DGEHS/ECHS card holder: YES" : "",
      p.score ? `Lead score: ${p.score}` : "",
      booked ? `REQUESTED SLOT: ${p.slotDate} at ${p.slotTime}` : "No slot picked — CALL BACK ASAP",
      p.notes ? `Notes: ${p.notes}` : "",
      `Source: ${p.kind === "chatbot" ? "Asha chatbot" : "Booking form"}`,
    ].filter(Boolean);

    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: w3key,
          subject: booked
            ? `🦷 NEW BOOKING — ${p.name} · ${p.treatment} · ${p.slotDate} ${p.slotTime}`
            : `🦷 NEW LEAD (${p.score ?? "call back"}) — ${p.name} · ${p.treatment}`,
          from_name: "Carewell Website",
          message: lines.join("\n"),
        }),
      });
      results.email = r.ok;
    } catch {
      results.email = false;
    }
  }

  /* ---- 2. Central storage (Supabase) ---- */
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (sbUrl && sbKey) {
    try {
      const r = await fetch(`${sbUrl}/rest/v1/website_leads`, {
        method: "POST",
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: p.name,
          phone: p.phone,
          treatment: p.treatment,
          urgency: p.urgency ?? null,
          timeline: p.timeline ?? null,
          cghs: !!p.cghs,
          score: p.score ?? null,
          slot_date: p.slotDate || null,
          slot_time: p.slotTime || null,
          source: p.kind,
          status: "New",
        }),
      });
      results.supabase = r.ok;
    } catch {
      results.supabase = false;
    }
  }

  return NextResponse.json({ ok: true, ...results });
}
