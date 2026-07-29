import { seeded } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "./types";

/* ------------------------------------------------------------------ */
/* CareWell Dental Clinic — appointments mock data (deterministic)         */
/* "Today" is Sunday 2026-07-19 — Sunday clinic runs 10 AM – 2 PM      */
/* ------------------------------------------------------------------ */

import { DEMO_DATA } from "@/lib/demo";
const sampleToday: Appointment[] = [
  {
    id: "APT-2401",
    patientId: "CW-P-1001",
    patientName: "Rajesh Khanna",
    phone: "+91 98104 55210",
    doctorId: "dr-ananya",
    treatment: "Implant Healing Review — 36",
    date: "2026-07-19",
    time: "10:00 AM",
    durationMin: 30,
    status: "Completed",
    source: "Phone",
    billing: { amount: 12000, status: "Pending" },
    notes: "Sugar levels checked — 128 fasting. Stage 2 cleared for early Aug.",
  },
  {
    id: "APT-2402",
    patientId: "CW-P-1009",
    patientName: "Anita Desai",
    phone: "+91 98118 09454",
    doctorId: "dr-rohan",
    treatment: "Post-Scaling Gum Check",
    date: "2026-07-19",
    time: "10:30 AM",
    durationMin: 20,
    status: "Completed",
    source: "WhatsApp",
    billing: { amount: 500, status: "Paid" },
    notes: "Pregnancy-safe review. Gums healthy; 37 asymptomatic.",
  },
  {
    id: "APT-2403",
    patientId: "CW-P-1003",
    patientName: "Aarav Gupta",
    phone: "+91 98111 87209",
    doctorId: "dr-rohan",
    treatment: "Habit Counselling Review",
    date: "2026-07-19",
    time: "11:00 AM",
    durationMin: 20,
    status: "Completed",
    source: "Phone",
    billing: { amount: 800, status: "Paid" },
    notes: "Thumb-sucking reduced. Mother counselled on reminder therapy.",
  },
  {
    id: "APT-2404",
    patientId: "CW-P-1008",
    patientName: "Suresh Nair",
    phone: "+91 98217 84930",
    doctorId: "dr-ananya",
    treatment: "Root Canal — 25 (Sitting 2)",
    date: "2026-07-19",
    time: "11:30 AM",
    durationMin: 45,
    status: "In Chair",
    source: "Website",
    billing: { amount: 0, status: "—" },
    notes: "Preponed from 22 Jul on patient request. Obturation planned today.",
  },
  {
    id: "APT-2405",
    patientId: "CW-P-1002",
    patientName: "Sneha Reddy",
    phone: "+91 99589 33417",
    doctorId: "dr-rohan",
    treatment: "Aligner Tray 16 Fitting",
    date: "2026-07-19",
    time: "12:00 PM",
    durationMin: 30,
    status: "Checked In",
    source: "WhatsApp",
    billing: { amount: 0, status: "—" },
    notes: "Tray 14 compliance excellent — IPR check before tray 16.",
  },
  {
    id: "APT-2406",
    patientId: "CW-P-1007",
    patientName: "Pooja Bansal",
    phone: "+91 99997 30265",
    doctorId: "dr-rohan",
    treatment: "Braces Monthly Adjustment (15th)",
    date: "2026-07-19",
    time: "12:15 PM",
    durationMin: 30,
    status: "Checked In",
    source: "Phone",
    billing: { amount: 0, status: "—" },
    notes: "Latex allergy — nitrile gloves. Collect pending ₹6,500 from 14th adjustment.",
  },
  {
    id: "APT-2407",
    patientId: "CW-P-1005",
    patientName: "Lakshmi Iyer",
    phone: "+91 99100 42873",
    doctorId: "dr-ananya",
    treatment: "FMR Prosthetic Trial Fitting",
    date: "2026-07-19",
    time: "12:30 PM",
    durationMin: 60,
    status: "Confirmed",
    source: "Phone",
    billing: { amount: 0, status: "—" },
    notes: "Trial preponed from 28 Jul. Son will accompany; discuss balance ₹35,000.",
  },
  {
    id: "APT-2408",
    patientId: "CW-P-1006",
    patientName: "Vikram Malhotra",
    phone: "+91 98990 71548",
    doctorId: "dr-rohan",
    treatment: "Porcelain Veneer Consult",
    date: "2026-07-19",
    time: "1:00 PM",
    durationMin: 30,
    status: "Confirmed",
    source: "Website",
    billing: { amount: 0, status: "—" },
    notes: "Reviewing ₹90,000 upper-6 quote. Show digital smile preview.",
  },
  {
    id: "APT-2409",
    patientId: "CW-P-1010",
    patientName: "Manpreet Singh",
    phone: "+91 98763 21178",
    doctorId: "dr-rohan",
    treatment: "Aligner Attachment Prep",
    date: "2026-07-19",
    time: "1:15 PM",
    durationMin: 30,
    status: "Confirmed",
    source: "Meta Ads",
    billing: { amount: 0, status: "—" },
    notes: "First tray delivery on 30 Jul — attachments and IPR mapping today.",
  },
  {
    id: "APT-2410",
    patientId: "CW-P-1004",
    patientName: "Farhan Siddiqui",
    phone: "+91 98735 60112",
    doctorId: "dr-ananya",
    treatment: "Decay Watch Review — 46",
    date: "2026-07-19",
    time: "1:30 PM",
    durationMin: 20,
    status: "Pending",
    source: "WhatsApp",
    billing: { amount: 0, status: "—" },
    notes: "Recall for 46 early decay. Awaiting confirmation on WhatsApp.",
  },
];

/* -------------------- upcoming week (generated) -------------------- */

const rnd = seeded(55);
const ri = (min: number, max: number) => min + Math.floor(rnd() * (max - min + 1));
const pick = <T,>(arr: readonly T[]): T => arr[Math.min(arr.length - 1, Math.floor(rnd() * arr.length))];

const fmtTime = (mins: number): string => {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
};

interface PoolPatient {
  id: string;
  name: string;
  phone: string;
}

const weekPool: PoolPatient[] = [
  { id: "CW-P-1001", name: "Rajesh Khanna", phone: "+91 98104 55210" },
  { id: "CW-P-1002", name: "Sneha Reddy", phone: "+91 99589 33417" },
  { id: "CW-P-1005", name: "Lakshmi Iyer", phone: "+91 99100 42873" },
  { id: "CW-P-1007", name: "Pooja Bansal", phone: "+91 99997 30265" },
  { id: "CW-P-1010", name: "Manpreet Singh", phone: "+91 98763 21178" },
  { id: "CW-P-NEW", name: "Ritika Chawla", phone: "+91 98220 14375" },
  { id: "CW-P-NEW", name: "Mohit Aggarwal", phone: "+91 99530 66218" },
  { id: "CW-P-NEW", name: "Sunita Rawat", phone: "+91 98107 39482" },
  { id: "CW-P-NEW", name: "Imran Qureshi", phone: "+91 98916 70253" },
  { id: "CW-P-NEW", name: "Tanvi Bhalla", phone: "+91 99711 25904" },
  { id: "CW-P-NEW", name: "Devansh Mittal", phone: "+91 98186 42031" },
  { id: "CW-P-NEW", name: "Kirti Saluja", phone: "+91 99998 81746" },
  { id: "CW-P-NEW", name: "Arvind Menon", phone: "+91 98738 55069" },
  { id: "CW-P-NEW", name: "Gurpreet Kaur", phone: "+91 98551 20837" },
  { id: "CW-P-NEW", name: "Naveen Pillai", phone: "+91 99109 63472" },
];

const weekTreatments: { name: string; doctorId: string }[] = [
  { name: "Implant Consultation", doctorId: "dr-ananya" },
  { name: "Implant Stage 2 — 36", doctorId: "dr-ananya" },
  { name: "Root Canal — Sitting 1", doctorId: "dr-ananya" },
  { name: "Wisdom Tooth Evaluation", doctorId: "dr-ananya" },
  { name: "FMR Prosthetic Delivery", doctorId: "dr-ananya" },
  { name: "Scaling & Polishing", doctorId: "dr-ananya" },
  { name: "Aligner Review", doctorId: "dr-rohan" },
  { name: "Braces Adjustment", doctorId: "dr-rohan" },
  { name: "Smile Design Consult", doctorId: "dr-rohan" },
  { name: "Teeth Whitening Session", doctorId: "dr-rohan" },
  { name: "Veneer Shade Trial", doctorId: "dr-rohan" },
  { name: "Kids Check-up & Fluoride", doctorId: "dr-rohan" },
];

const weekSources: Appointment["source"][] = ["Website", "WhatsApp", "Phone", "Walk-in", "Meta Ads", "Google"];
const weekDates = ["2026-07-20", "2026-07-21", "2026-07-22", "2026-07-23", "2026-07-24", "2026-07-25"];

const weekGenerated: (Appointment & { mins: number })[] = [];
for (let i = 0; i < 25; i++) {
  const patient = pick(weekPool);
  const t = pick(weekTreatments);
  const status: AppointmentStatus = rnd() < 0.68 ? "Confirmed" : "Pending";
  const mins = 600 + 30 * ri(0, 20); // 10:00 AM – 8:00 PM
  weekGenerated.push({
    id: `APT-${2411 + i}`,
    patientId: patient.id,
    patientName: patient.name,
    phone: patient.phone,
    doctorId: t.doctorId,
    treatment: t.name,
    date: weekDates[i % weekDates.length],
    time: fmtTime(mins),
    mins,
    durationMin: pick([20, 30, 30, 45, 60] as const),
    status,
    source: pick(weekSources),
    billing: { amount: 0, status: "—" },
    notes: patient.id === "CW-P-NEW" ? "New patient — collect medical history at front desk." : undefined,
  });
}

const sampleWeek: Appointment[] = weekGenerated
  .sort((a, b) => (a.date === b.date ? a.mins - b.mins : a.date.localeCompare(b.date)))
  .map(({ mins: _mins, ...apt }) => apt);

export const appointmentStats = DEMO_DATA
  ? { today: 10, completed: 3, upcomingWeek: 25, cancellationsThisMonth: 6, noShowRate: 4.2 }
  : { today: 0, completed: 0, upcomingWeek: 0, cancellationsThisMonth: 0, noShowRate: 0 };

export const todayAppointments: Appointment[] = DEMO_DATA ? sampleToday : [];
export const weekAppointments: Appointment[] = DEMO_DATA ? sampleWeek : [];
