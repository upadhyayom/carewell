import { DEMO_DATA } from "@/lib/demo";
import type { ActivityItem, Insight, Notification } from "./types";

/* ------------------------------------------------------------------ */
/* CareWell Dental Clinic — notifications, activity feed & AI insights     */
/* "Today" is Sunday 2026-07-19. All money values in INR.              */
/* ------------------------------------------------------------------ */

const sampleNotifications: Notification[] = [
  {
    id: "ntf-001",
    type: "appointment",
    title: "Lakshmi Iyer confirmed FMR trial",
    text: "FMR prosthetic trial fitting confirmed for 12:30 PM today with Dr. Smriti.",
    at: "2026-07-19T09:42:00",
    read: false,
  },
  {
    id: "ntf-002",
    type: "payment",
    title: "Payment received — Suresh Nair",
    text: "₹5,000 collected for RCT 25 sitting 1 (INV-2707). Sitting 2 in progress today.",
    at: "2026-07-19T09:15:00",
    read: false,
  },
  {
    id: "ntf-003",
    type: "review",
    title: "New 5-star Google review",
    text: "\"Dr. Smriti explained everything about my implant so patiently.\" — Rajesh K.",
    at: "2026-07-19T08:50:00",
    read: false,
  },
  {
    id: "ntf-004",
    type: "missed",
    title: "Missed call — new implant lead",
    text: "+91 9811042267 called twice from the Implants-Lead-Jul26 campaign. Callback pending.",
    at: "2026-07-19T08:20:00",
    read: false,
  },
  {
    id: "ntf-005",
    type: "birthday",
    title: "Birthday today — Pooja Bansal",
    text: "Pooja turns 28 today. Send the birthday WhatsApp template with a whitening voucher.",
    at: "2026-07-19T07:00:00",
    read: true,
  },
  {
    id: "ntf-006",
    type: "appointment",
    title: "Farhan Siddiqui yet to confirm",
    text: "1:30 PM decay-watch review still Pending. WhatsApp reminder sent at 8 AM.",
    at: "2026-07-19T08:05:00",
    read: true,
  },
  {
    id: "ntf-007",
    type: "course",
    title: "New academy enquiry",
    text: "Dr. Shruti Bhagat (Jaipur) enquired about the Implant Fellowship — August batch.",
    at: "2026-07-18T18:24:00",
    read: true,
  },
  {
    id: "ntf-008",
    type: "payment",
    title: "Invoice overdue — Rajesh Khanna",
    text: "INV-2698 (₹12,000, implant healing check) is 7 days past due. Follow up after today's visit.",
    at: "2026-07-18T16:10:00",
    read: true,
  },
  {
    id: "ntf-009",
    type: "review",
    title: "Practo review needs a reply",
    text: "4-star review from an aligner patient mentions weekend wait times. Draft reply ready.",
    at: "2026-07-18T13:45:00",
    read: true,
  },
  {
    id: "ntf-010",
    type: "missed",
    title: "No-show follow-up pending",
    text: "Saturday 7 PM whitening patient didn't arrive. Reschedule call assigned to Amit.",
    at: "2026-07-18T10:30:00",
    read: true,
  },
];

const sampleActivity: ActivityItem[] = [
  { id: "act-001", at: "2026-07-19T11:32:00", actor: "Dr. Smriti Sharma", action: "started", target: "RCT sitting 2 — Suresh Nair (25)", type: "appointment" },
  { id: "act-002", at: "2026-07-19T11:20:00", actor: "Kavita Yadav", action: "checked in", target: "Pooja Bansal — braces adjustment", type: "appointment" },
  { id: "act-003", at: "2026-07-19T11:05:00", actor: "Amit Verma", action: "moved lead to Qualified", target: "Ridhima Sethi — Clear Aligners (Meta Ads)", type: "lead" },
  { id: "act-004", at: "2026-07-19T10:58:00", actor: "Priya Sharma", action: "recorded payment ₹800 from", target: "Aarav Gupta (habit counselling)", type: "payment" },
  { id: "act-005", at: "2026-07-19T10:45:00", actor: "Kavita Yadav", action: "checked in", target: "Sneha Reddy — aligner tray 16 fitting", type: "appointment" },
  { id: "act-006", at: "2026-07-19T10:40:00", actor: "Amit Verma", action: "sent WhatsApp reminder to", target: "Farhan Siddiqui — 1:30 PM review", type: "appointment" },
  { id: "act-007", at: "2026-07-19T10:31:00", actor: "Priya Sharma", action: "generated consent form for", target: "Lakshmi Iyer — FMR prosthetic trial", type: "consent" },
  { id: "act-008", at: "2026-07-19T10:22:00", actor: "Dr. Anuj", action: "completed", target: "Anita Desai — post-scaling gum check", type: "appointment" },
  { id: "act-009", at: "2026-07-19T10:12:00", actor: "Amit Verma", action: "logged call with", target: "Devansh Mittal — asked about EMI options for aligners", type: "lead" },
  { id: "act-010", at: "2026-07-19T10:05:00", actor: "Priya Sharma", action: "recorded payment ₹500 from", target: "Anita Desai (INV pregnancy-safe review)", type: "payment" },
  { id: "act-011", at: "2026-07-19T09:48:00", actor: "Amit Verma", action: "created lead", target: "Sunita Rawat — Dental Implants (Implants-Lead-Jul26)", type: "lead" },
  { id: "act-012", at: "2026-07-19T09:35:00", actor: "Dr. Smriti Sharma", action: "updated treatment notes for", target: "Rajesh Khanna — implant 36 healing review", type: "patient" },
  { id: "act-013", at: "2026-07-19T09:20:00", actor: "Priya Sharma", action: "scheduled Instagram reel", target: "\"Aligner journey — Sneha's tray 14 update\"", type: "social" },
  { id: "act-014", at: "2026-07-19T09:05:00", actor: "Amit Verma", action: "shared course brochure with", target: "Dr. Shruti Bhagat — Implant Fellowship (Aug batch)", type: "course" },
];

export const insights: Insight[] = [
  {
    id: "ins-001",
    kind: "trend",
    title: "Implants are your top earner this month",
    text: "Dental implants brought in ₹4.2L so far in July — 38% of treatment revenue and growing faster than any other service.",
    metric: "₹4.2L",
    delta: "+18% vs June",
  },
  {
    id: "ins-002",
    kind: "trend",
    title: "Revenue is compounding month on month",
    text: "June closed at ₹14.5L, the best month ever. July is at ₹8.9L with 12 days to go — on pace to beat target if the FMR and veneer cases convert.",
    metric: "₹14.5L (Jun)",
    delta: "+16.5% MoM",
  },
  {
    id: "ins-003",
    kind: "trend",
    title: "Implants-Lead-Jul26 is your most efficient campaign",
    text: "CPL of ₹312 with 44% qualification — well ahead of the ₹345 blended CPL. It has driven 32 appointments in 3 weeks.",
    metric: "₹312 CPL",
    delta: "-10% vs blended",
  },
  {
    id: "ins-004",
    kind: "alert",
    title: "Dr. Smriti carries most bookings",
    text: "58% of this month's appointments are with Dr. Smriti. Wednesdays (surgery day) are fully booked 2 weeks out — consider a second surgical slot.",
    metric: "58% share",
    delta: "+6 pts vs Q1",
  },
  {
    id: "ins-005",
    kind: "opportunity",
    title: "Your patients skew 25–34",
    text: "The 25–34 band is 31% of new patients — they book aligners, whitening and smile design, mostly via Instagram and Meta Ads.",
    metric: "31% of new patients",
    delta: "+4 pts YoY",
  },
  {
    id: "ins-006",
    kind: "opportunity",
    title: "Aligners dominate under-30 enquiries",
    text: "Among leads under 30, clear aligners are the most requested treatment — 2 of every 5 enquiries. EMI messaging is the biggest conversion lever.",
    metric: "40% of <30 enquiries",
    delta: "+9 pts vs Q1",
  },
  {
    id: "ins-007",
    kind: "suggestion",
    title: "Raise aligner budget before wedding season",
    text: "Wedding-season smile enquiries start climbing from August. Shifting ₹15–20k/month from Braces-Offer to Aligners-Video now would ride the ₹407→₹350 CPL trend.",
    metric: "Suggested +₹18k/mo",
    delta: "Est. +12 leads/mo",
  },
  {
    id: "ins-008",
    kind: "suggestion",
    title: "Plan a Diwali smile-makeover campaign",
    text: "Diwali falls on 8 Nov 2026. Last year's festive push lifted November revenue 23%. Book creatives by mid-September for a smile-makeover + whitening bundle.",
    metric: "Nov target ₹15L",
    delta: "+23% last Diwali",
  },
];

export const quickStats = {
  todayRevenue: 68500,
  todayPatients: 10,
  pendingAppointments: 4,
  websiteVisitors: 291,
  qualifiedLeads: 156,
  conversionRate: 28.1,
  monthRevenue: 890000,
  monthGrowth: 12.4,
  marketingRoi: 4.4,
  topTreatment: "Dental Implants",
  topDoctor: "Dr. Smriti Sharma",
};

export const notifications: Notification[] = DEMO_DATA ? sampleNotifications : [];
export const activity: ActivityItem[] = DEMO_DATA ? sampleActivity : [];
