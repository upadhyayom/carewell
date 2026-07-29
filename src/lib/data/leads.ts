import { seeded } from "@/lib/utils";
import type { Lead, LeadEvent, LeadStage } from "./types";

/* ------------------------------------------------------------------ */
/* CareWell Dental Clinic — lead pipeline mock data (fully deterministic)  */
/* "Today" is 2026-07-19                                               */
/* ------------------------------------------------------------------ */

export const pipelineStages: LeadStage[] = [
  "New",
  "Contacted",
  "Qualified",
  "Appointment",
  "Visited",
  "Treatment Started",
  "Treatment Completed",
  "Lost",
];

const rnd = seeded(97);
const ri = (min: number, max: number) => min + Math.floor(rnd() * (max - min + 1));
const pick = <T,>(arr: readonly T[]): T => arr[Math.min(arr.length - 1, Math.floor(rnd() * arr.length))];

function pickWeighted<T>(items: readonly { item: T; w: number }[]): T {
  const total = items.reduce((s, x) => s + x.w, 0);
  let r = rnd() * total;
  for (const x of items) {
    r -= x.w;
    if (r <= 0) return x.item;
  }
  return items[items.length - 1].item;
}

const TODAY_MS = new Date("2026-07-19T00:00:00Z").getTime();
const DAY_MS = 86400000;
/** ISO date `daysAgo` days before 2026-07-19 (negative = future). */
const dayISO = (daysAgo: number) => new Date(TODAY_MS - daysAgo * DAY_MS).toISOString().slice(0, 10);
const pad = (n: number) => String(n).padStart(2, "0");
const atISO = (daysAgo: number, hour: number, minute: number) => `${dayISO(daysAgo)}T${pad(hour)}:${pad(minute)}:00`;

/* ---------------------------- name pools --------------------------- */

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Arjun", "Kabir", "Rohan", "Karan", "Nikhil",
  "Rahul", "Siddharth", "Varun", "Manish", "Deepak", "Harsh", "Gaurav", "Sameer",
  "Smriti", "Ishita", "Priya", "Neha", "Ritika", "Shreya", "Divya", "Meera",
  "Kavya", "Pallavi", "Swati", "Tanvi", "Nandini", "Aisha", "Simran", "Ridhima",
];

const lastNames = [
  "Sharma", "Verma", "Gupta", "Malhotra", "Kapoor", "Chopra", "Bansal", "Agarwal",
  "Singh", "Yadav", "Mehta", "Jain", "Khanna", "Bhatia", "Saxena", "Tiwari",
  "Reddy", "Nair", "Iyer", "Rao", "Chauhan", "Rathore", "Sethi", "Arora",
  "Grover", "Tandon",
];

const cities: { item: string; w: number }[] = [
  { item: "Dwarka", w: 46 },
  { item: "Delhi", w: 22 },
  { item: "Faridabad", w: 12 },
  { item: "Noida", w: 12 },
  { item: "Manesar", w: 8 },
];

type Source = Lead["source"];
const sources: { item: Source; w: number }[] = [
  { item: "Meta Ads", w: 40 },
  { item: "Google Ads", w: 18 },
  { item: "Website", w: 14 },
  { item: "WhatsApp", w: 10 },
  { item: "Instagram", w: 8 },
  { item: "Referral", w: 6 },
  { item: "Walk-in", w: 4 },
];

const treatments = [
  { name: "Dental Implants", w: 25, min: 35000, max: 150000 },
  { name: "Braces", w: 15, min: 30000, max: 55000 },
  { name: "Clear Aligners", w: 15, min: 60000, max: 120000 },
  { name: "Root Canal", w: 12, min: 6000, max: 15000 },
  { name: "Smile Design", w: 8, min: 50000, max: 180000 },
  { name: "Veneers", w: 6, min: 12000, max: 90000 },
  { name: "Teeth Whitening", w: 6, min: 8000, max: 15000 },
  { name: "Wisdom Tooth Extraction", w: 5, min: 8000, max: 15000 },
  { name: "Full Mouth Rehabilitation", w: 4, min: 180000, max: 350000 },
  { name: "Kids Dentistry", w: 4, min: 1500, max: 8000 },
] as const;

const metaCampaigns = ["Implants-Lead-Jul26", "Aligners-Video-Jun26", "SmileDesign-Retarget", "Braces-Offer-May26"];

function campaignFor(source: Source, treatment: string): string | undefined {
  if (source === "Meta Ads") {
    if (treatment === "Dental Implants" || treatment === "Full Mouth Rehabilitation") return "Implants-Lead-Jul26";
    if (treatment === "Clear Aligners") return "Aligners-Video-Jun26";
    if (treatment === "Smile Design" || treatment === "Veneers" || treatment === "Teeth Whitening") return "SmileDesign-Retarget";
    if (treatment === "Braces") return "Braces-Offer-May26";
    return pick(metaCampaigns);
  }
  if (source === "Google Ads") {
    return treatment === "Root Canal" ? "Search-RootCanal" : "Search-DentistNearMe";
  }
  return undefined;
}

const owners = ["Priya Sharma", "Kavita Yadav", "Amit Verma"];

/* stage, count, createdAt range in days-ago (newer for earlier stages) */
const stagePlan: { stage: LeadStage; count: number; minAgo: number; maxAgo: number }[] = [
  { stage: "New", count: 38, minAgo: 0, maxAgo: 9 },
  { stage: "Contacted", count: 52, minAgo: 1, maxAgo: 21 },
  { stage: "Qualified", count: 45, minAgo: 5, maxAgo: 35 },
  { stage: "Appointment", count: 34, minAgo: 7, maxAgo: 45 },
  { stage: "Visited", count: 28, minAgo: 14, maxAgo: 60 },
  { stage: "Treatment Started", count: 24, minAgo: 21, maxAgo: 80 },
  { stage: "Treatment Completed", count: 31, minAgo: 45, maxAgo: 109 },
  { stage: "Lost", count: 48, minAgo: 10, maxAgo: 109 },
];

const activeStages: LeadStage[] = ["New", "Contacted", "Qualified", "Appointment", "Visited"];

function scoreFor(stage: LeadStage): Lead["score"] {
  const r = rnd();
  switch (stage) {
    case "New":
      return r < 0.3 ? "Hot" : r < 0.8 ? "Warm" : "Cold";
    case "Contacted":
      return r < 0.25 ? "Hot" : r < 0.75 ? "Warm" : "Cold";
    case "Qualified":
      return r < 0.45 ? "Hot" : r < 0.9 ? "Warm" : "Cold";
    case "Appointment":
      return r < 0.6 ? "Hot" : r < 0.95 ? "Warm" : "Cold";
    case "Visited":
      return r < 0.55 ? "Hot" : "Warm";
    case "Treatment Started":
      return "Hot";
    case "Treatment Completed":
      return r < 0.7 ? "Warm" : "Hot";
    case "Lost":
      return r < 0.85 ? "Cold" : "Warm";
  }
}

/* --------------------------- event texts --------------------------- */

const callTexts = [
  "Asked about EMI options for aligners",
  "Discussed implant procedure, healing time and warranty",
  "Requested a detailed price breakdown before deciding",
  "Wants a weekend slot — Saturday preferred",
  "Answered — will discuss with family and revert",
  "Asked if treatment is covered under insurance",
  "Enquired about single-sitting root canal",
];

const whatsappTexts = [
  "Shared implant cost PDF on WhatsApp",
  "Sent clinic location pin and doctor profiles",
  "Shared before/after smile design photos",
  "Sent aligner EMI plan details (₹9,000 × months)",
  "Shared pre-visit instructions and parking info",
  "Sent Google reviews link and patient testimonials",
];

const visitTexts = [
  "Visited clinic — consult with Dr. Smriti Sharma",
  "Visited clinic — consult with Dr. Anuj",
  "Came in for OPG and treatment planning",
  "First visit done — scan and photos taken",
];

const bookTexts = [
  "Booked consult with Dr. Smriti",
  "Booked consult with Dr. Anuj",
  "Appointment confirmed on WhatsApp",
];

const lostTexts = [
  "Marked Lost — went with a cheaper local clinic",
  "Marked Lost — not reachable after 4 attempts",
  "Marked Lost — postponed treatment to next year",
  "Marked Lost — budget mismatch, will nurture via WhatsApp",
];

const notePool = [
  "Prefers evening calls after 6 PM",
  "Price sensitive — mention monsoon offer",
  "Referred by an existing patient",
  "Wants lady doctor for consult",
  "Travels abroad in August — wants to start before that",
  "Asked for Hindi-speaking coordinator",
];

function buildTimeline(stage: LeadStage, createdAgo: number, source: Source, treatment: string): LeadEvent[] {
  const events: LeadEvent[] = [];
  let ago = createdAgo;
  const push = (type: LeadEvent["type"], text: string) => {
    events.push({ at: atISO(Math.max(0, ago), 9 + ri(0, 9), ri(0, 59)), type, text });
    ago = Math.max(0, ago - ri(1, 3));
  };

  const stageIdx = pipelineStages.indexOf(stage);
  push("created", source === "Walk-in" ? `Walked in asking about ${treatment}` : `Lead created from ${source} — interested in ${treatment}`);

  if (stage === "Lost") {
    push("call", pick(callTexts));
    if (rnd() < 0.6) push("whatsapp", pick(whatsappTexts));
    push("stage", pick(lostTexts));
    return events;
  }

  if (stageIdx === 0) {
    // New leads: auto-responder + optional first touch
    push("whatsapp", "Auto WhatsApp sent — clinic intro, timings and doctor profiles");
    if (rnd() < 0.4) push("note", pick(notePool));
  }
  if (stageIdx >= 1) push("call", pick(callTexts));
  if (stageIdx >= 2) {
    push("whatsapp", pick(whatsappTexts));
    if (rnd() < 0.5) push("stage", "Moved to Qualified — budget and timeline confirmed");
  }
  if (stageIdx >= 3) push("stage", pick(bookTexts));
  if (stageIdx >= 4) push("visit", pick(visitTexts));
  if (stageIdx >= 5) push("stage", `Treatment started — ${treatment} plan accepted`);
  if (stageIdx >= 6) push("stage", `Treatment completed — review request sent`);
  return events.slice(0, 6);
}

/* ----------------------------- generate ----------------------------- */

const generated: Lead[] = [];
let serial = 3001;
const usedNames = new Set<string>();

for (const plan of stagePlan) {
  for (let i = 0; i < plan.count; i++) {
    let name = `${pick(firstNames)} ${pick(lastNames)}`;
    // avoid heavy repetition without breaking determinism
    let guard = 0;
    while (usedNames.has(name) && guard < 4) {
      name = `${pick(firstNames)} ${pick(lastNames)}`;
      guard++;
    }
    usedNames.add(name);

    const t = pickWeighted(treatments.map((x) => ({ item: x, w: x.w })));
    const source = pickWeighted(sources);
    const createdAgo = ri(plan.minAgo, plan.maxAgo);
    const value = Math.round((t.min + rnd() * (t.max - t.min)) / 500) * 500;
    const isActive = activeStages.includes(plan.stage);

    const noteCount = ri(0, 2);
    const notes: string[] = [];
    for (let n = 0; n < noteCount; n++) {
      const note = pick(notePool);
      if (!notes.includes(note)) notes.push(note);
    }

    generated.push({
      id: `LD-${serial++}`,
      name,
      phone: `+91 9${String(ri(100000000, 999999999))}`,
      city: pickWeighted(cities),
      treatment: t.name,
      source,
      campaign: campaignFor(source, t.name),
      stage: plan.stage,
      value,
      score: scoreFor(plan.stage),
      owner: pick(owners),
      createdAt: atISO(createdAgo, 8 + ri(0, 11), ri(0, 59)),
      nextFollowUp: isActive ? dayISO(-ri(1, 7)) : undefined,
      timeline: buildTimeline(plan.stage, createdAgo, source, t.name),
      notes,
    });
  }
}

/** All 300 leads, newest first. */
import { DEMO_DATA } from "@/lib/demo";
export const leads: Lead[] = (DEMO_DATA ? [...generated] : []).sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : a.id < b.id ? -1 : 1));

export const leadsByStage: Record<LeadStage, Lead[]> = pipelineStages.reduce(
  (acc, stage) => {
    acc[stage] = leads.filter((l) => l.stage === stage);
    return acc;
  },
  {} as Record<LeadStage, Lead[]>
);

export const pipelineSummary: { stage: LeadStage; count: number; value: number }[] = pipelineStages.map((stage) => ({
  stage,
  count: leadsByStage[stage].length,
  value: leadsByStage[stage].reduce((s, l) => s + l.value, 0),
}));
