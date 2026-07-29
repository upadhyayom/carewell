import { seeded } from "@/lib/utils";
import type { Campaign } from "./types";

/* ------------------------------------------------------------------ */
/* CareWell Dental Clinic — marketing & analytics mock data                */
/* "Today" is 2026-07-19. All money values in INR.                     */
/* ------------------------------------------------------------------ */

export const campaigns: Campaign[] = [
  {
    id: "cmp-implants-jul26",
    name: "Implants-Lead-Jul26",
    platform: "Meta",
    objective: "Lead generation — implant consults",
    status: "Active",
    startDate: "2026-06-28",
    spend: 62000, // CPC ₹30.2 · CTR 1.68% · CPL ₹312 · ROAS 4.6x
    reach: 78400,
    impressions: 122000,
    clicks: 2050,
    leads: 199,
    qualifiedLeads: 88,
    appointments: 32,
    revenue: 288000,
  },
  {
    id: "cmp-aligners-jun26",
    name: "Aligners-Video-Jun26",
    platform: "Meta",
    objective: "Video views → aligner leads",
    status: "Active",
    startDate: "2026-06-05",
    spend: 48000, // CPC ₹30 · CTR 1.68% · CPL ₹407 · ROAS 4.3x
    reach: 61200,
    impressions: 95000,
    clicks: 1600,
    leads: 118,
    qualifiedLeads: 52,
    appointments: 19,
    revenue: 205000,
  },
  {
    id: "cmp-smiledesign-rt",
    name: "SmileDesign-Retarget",
    platform: "Meta",
    objective: "Retargeting — smile design page visitors",
    status: "Active",
    startDate: "2026-06-15",
    spend: 28000, // CPC ₹28.6 · CTR 2.11% · CPL ₹538 · ROAS 4.5x
    reach: 21800,
    impressions: 46500,
    clicks: 980,
    leads: 52,
    qualifiedLeads: 26,
    appointments: 11,
    revenue: 126000,
  },
  {
    id: "cmp-braces-may26",
    name: "Braces-Offer-May26",
    platform: "Meta",
    objective: "Summer braces offer — lead forms",
    status: "Ended",
    startDate: "2026-05-01",
    spend: 55000, // CPC ₹22.9 · CTR 1.74% · CPL ₹362 · ROAS 3.2x
    reach: 90500,
    impressions: 138000,
    clicks: 2400,
    leads: 152,
    qualifiedLeads: 61,
    appointments: 22,
    revenue: 176000,
  },
  {
    id: "cmp-search-dentist",
    name: "Search-DentistNearMe",
    platform: "Google",
    objective: "Search — high-intent 'dentist near me'",
    status: "Active",
    startDate: "2026-04-10",
    spend: 95000, // CPC ₹50 · CTR 2.68% · CPL ₹565 · ROAS 4.8x
    reach: 54200,
    impressions: 71000,
    clicks: 1900,
    leads: 168,
    qualifiedLeads: 84,
    appointments: 41,
    revenue: 452000,
  },
  {
    id: "cmp-search-rct",
    name: "Search-RootCanal",
    platform: "Google",
    objective: "Search — root canal treatment",
    status: "Paused",
    startDate: "2026-05-20",
    spend: 32000, // CPC ₹44.4 · CTR 2.62% · CPL ₹552 · ROAS 4.6x
    reach: 21000,
    impressions: 27500,
    clicks: 720,
    leads: 58,
    qualifiedLeads: 30,
    appointments: 17,
    revenue: 148000,
  },
];

/* -------------------- revenue: Aug 2025 – Jul 2026 ------------------ */

export const revenueByMonth: { month: string; revenue: number; target: number; patients: number }[] = [
  { month: "Aug", revenue: 780000, target: 800000, patients: 152 },
  { month: "Sep", revenue: 825000, target: 820000, patients: 161 },
  { month: "Oct", revenue: 910000, target: 880000, patients: 178 },
  { month: "Nov", revenue: 1120000, target: 950000, patients: 214 }, // Diwali + wedding season
  { month: "Dec", revenue: 975000, target: 1000000, patients: 189 },
  { month: "Jan", revenue: 894000, target: 950000, patients: 172 }, // new-year dip
  { month: "Feb", revenue: 1010000, target: 1000000, patients: 196 },
  { month: "Mar", revenue: 1085000, target: 1050000, patients: 208 },
  { month: "Apr", revenue: 1150000, target: 1100000, patients: 218 },
  { month: "May", revenue: 1245000, target: 1200000, patients: 232 },
  { month: "Jun", revenue: 1450000, target: 1300000, patients: 251 },
  { month: "Jul", revenue: 890000, target: 1400000, patients: 164 }, // partial — month in progress
];

/* -------------------- website visitors, last 30 days ---------------- */

const vrnd = seeded(31);
const START_MS = new Date("2026-06-20T00:00:00Z").getTime();
const DAY_MS = 86400000;

export const visitorsSeries: { date: string; visitors: number; leads: number }[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(START_MS + i * DAY_MS);
  const dow = d.getUTCDay(); // 0 Sun … 6 Sat
  const weekend = dow === 0 || dow === 6;
  const base = weekend ? 210 : 300;
  const swing = weekend ? 60 : 115;
  const visitors = Math.round(base + (vrnd() - 0.4) * swing + i * 1.4); // mild upward drift
  const leads = Math.max(6, Math.min(22, Math.round(visitors / 24 + (vrnd() - 0.5) * 5)));
  return { date: d.toISOString().slice(0, 10), visitors: Math.max(180, Math.min(420, visitors)), leads };
});

export const trafficSources: { source: string; pct: number }[] = [
  { source: "Organic Search", pct: 34 },
  { source: "Meta Ads", pct: 26 },
  { source: "Direct", pct: 16 },
  { source: "Google Ads", pct: 12 },
  { source: "Instagram", pct: 8 },
  { source: "Referral", pct: 4 },
];

export const topLandingPages: { path: string; title: string; visits: number; conversions: number; rate: number }[] = [
  { path: "/", title: "Home — CareWell Dental", visits: 6240, conversions: 148, rate: 2.4 },
  { path: "/services/dental-implants", title: "Dental Implants in Dwarka, New Delhi", visits: 3480, conversions: 156, rate: 4.5 },
  { path: "/services/aligners", title: "Invisible Aligners — Cost & EMI", visits: 2660, conversions: 118, rate: 4.4 },
  { path: "/book-appointment", title: "Book an Appointment", visits: 2140, conversions: 231, rate: 10.8 },
  { path: "/blog/dental-implant-cost-india-2026", title: "Dental Implant Cost in India (2026 Guide)", visits: 1890, conversions: 52, rate: 2.8 },
  { path: "/academy", title: "CareWell Dental Academy", visits: 960, conversions: 34, rate: 3.5 },
];

export const topServices: { name: string; views: number; bookings: number }[] = [
  { name: "Dental Implants", views: 3480, bookings: 64 },
  { name: "Clear Aligners", views: 2660, bookings: 48 },
  { name: "Braces", views: 1720, bookings: 36 },
  { name: "Smile Design", views: 1350, bookings: 22 },
  { name: "Root Canal", views: 1180, bookings: 41 },
];

export const gaSummary = {
  visitors30d: 8420,
  pageviews30d: 24160,
  avgSession: "2m 41s",
  bounceRate: 42.3,
  newUsers: 6180,
};

export const marketingKpis = {
  spend30d: 118000,
  leads30d: 342,
  qualified30d: 156,
  cpl: 345,
  appointments30d: 96,
  revenue30d: 1240000,
  roas: 4.4,
};

export const treatmentRevenueSplit: { name: string; value: number }[] = [
  { name: "Implants", value: 38 },
  { name: "Aligners", value: 22 },
  { name: "Braces", value: 14 },
  { name: "Smile Design", value: 10 },
  { name: "Root Canal", value: 9 },
  { name: "Others", value: 7 },
];

export const funnel30d: { stage: string; n: number }[] = [
  { stage: "Visitors", n: 8420 },
  { stage: "Leads", n: 342 },
  { stage: "Qualified", n: 156 },
  { stage: "Appointments", n: 96 },
  { stage: "Visited", n: 74 },
  { stage: "Treatment", n: 52 },
];
