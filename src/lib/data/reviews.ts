/* ------------------------------------------------------------------ */
/* CareWell Dental Clinic — patient reviews mock data (deterministic)      */
/* ------------------------------------------------------------------ */

import type { Review } from "@/lib/data/types";
import { seeded } from "@/lib/utils";

export const ratingSummary = {
  average: 4.3,
  total: 120,
  distribution: [
    { stars: 5, pct: 91 },
    { stars: 4, pct: 6 },
    { stars: 3, pct: 2 },
    { stars: 2, pct: 0.6 },
    { stars: 1, pct: 0.4 },
  ],
};

type Draft = Omit<Review, "id" | "date">;

/* ~18 hand-written, specific reviews */
const handWritten: Draft[] = [
  {
    name: "Harpreet Singh Bedi",
    rating: 5,
    treatment: "Dental Implants",
    source: "Google",
    text: "Got two implants done by Dr. Smriti Sharma after losing teeth in a bike accident. She showed me the CBCT scan on screen, explained why I needed a small bone graft, and gave the full cost in writing before starting — not a rupee extra at billing. Surgery was done in under an hour and I was back at my showroom the next day. Six months on, I chew sugarcane again.",
  },
  {
    name: "Sneha Ramakrishnan",
    rating: 5,
    treatment: "Clear Aligners",
    source: "Google",
    text: "I was quoted 2.2 lakh for aligners at a chain clinic. Dr. Anuj scanned my teeth, told me honestly my case was mild, and recommended a plan at almost half that. Fourteen months later my teeth are perfectly straight and nobody at office ever noticed the trays. The monthly EMI made it painless on the wallet too.",
  },
  {
    name: "Mohammed Faizan Qureshi",
    rating: 5,
    treatment: "Root Canal",
    source: "Google",
    text: "Came in at 9 pm with unbearable pain — they kept the clinic open for me. Root canal started the same night and honestly the injection was the only thing I felt. Dr. Kapoor kept checking 'aaram hai?' throughout. Finished with a crown in two visits. After 20 years of fearing dentists, this place fixed that too.",
  },
  {
    name: "Debashree Chatterjee",
    rating: 5,
    treatment: "Kids Dentistry",
    source: "Google",
    text: "My 5-year-old used to scream at the mention of doctors. The team did two 'happy visits' where she just sat in the chair and played with the water spray. By the third visit she got her filling done watching Doraemon on the ceiling TV and asked when we're coming back! Truly kid-friendly, not just a poster claiming it.",
  },
  {
    name: "Vikram Yadav",
    rating: 5,
    treatment: "All-on-4 Implants",
    source: "Google",
    text: "My 68-year-old father had been struggling with loose dentures for years. Dr. Smriti Sharma did full mouth All-on-4 — fixed teeth in three days. The hygiene protocols impressed me most: sealed instrument pouches opened in front of us, everything autoclave-tagged. Papa ate makki di roti at my sister's wedding two months later. Worth every rupee of the EMI.",
  },
  {
    name: "Lakshmi Venkatesan",
    rating: 5,
    treatment: "Smile Makeover",
    source: "Google",
    text: "Before my wedding I wanted to fix my gap and uneven front teeth. Dr. Anuj designed the smile digitally and let me 'wear' a trial version for a day before committing — that mock-up sold me. Six e.max veneers later, my wedding photographer kept asking me to smile more. My mother cried when she saw the photos.",
  },
  {
    name: "Arjun Malhotra",
    rating: 4,
    treatment: "Teeth Whitening",
    source: "Google",
    text: "Whitening result was genuinely good — about 4 shades in one sitting, and they gave me a proper shade photo before and after as proof. Only reason for 4 stars is the 20-minute wait past my appointment time on a Saturday. Sensitivity lasted a day like they warned. Would still recommend over the salon offers I almost fell for.",
  },
  {
    name: "Gurpreet Kaur",
    rating: 5,
    treatment: "Gum Treatment",
    source: "Google",
    text: "I'm diabetic and my gums bled every morning for a year. Dr. Mehta did a full periodontal charting — no one had ever measured my gums before — and after deep cleaning plus 3-monthly recalls, my HbA1c actually dropped from 8.1 to 7.4. My physician asked what changed. I told him: my dentist.",
  },
  {
    name: "Rohini Deshpande",
    rating: 5,
    treatment: "Wisdom Tooth Extraction",
    source: "Practo",
    text: "Impacted wisdom tooth removed surgically by Dr. Smriti Sharma. I had read horror stories online but the actual thing took 30 minutes, I felt only pressure, and the swelling was gone by day three exactly as she predicted on the printed aftercare sheet. They called twice to check on me. That follow-up call is rare these days.",
  },
  {
    name: "Syed Imran Ali",
    rating: 5,
    treatment: "Dental Implants",
    source: "Google",
    text: "Compared three clinics in Dwarka, New Delhi before choosing CareWell. Only Dr. Mehta showed me the actual implant brand sticker and registered my warranty with the company. Transparent pricing — the quote listed fixture, abutment and crown separately. Implant placed in 40 minutes, crown after 3 months, total exactly what was quoted in January.",
  },
  {
    name: "Kavitha Nair",
    rating: 5,
    treatment: "Kids Dentistry",
    source: "Google",
    text: "Both my kids (4 and 9) get their fluoride and sealants here. The doctors talk TO the children, not over their heads — my son proudly explains 'sugar bugs' to his grandmother now. Appointments run on time, which any parent of two will tell you is priceless.",
  },
  {
    name: "Manpreet Singh Sethi",
    rating: 5,
    treatment: "Ceramic Braces",
    source: "Google",
    text: "22 months of ceramic braces with Dr. Anuj, finished last month. Every adjustment visit was on schedule, WhatsApp reminders the day before, and he photographed my teeth at every stage so I could see progress. The before-after collage he gave me at debonding is now my phone wallpaper. Paid month by month, no lump sum stress.",
  },
  {
    name: "Smriti Bhattacharya",
    rating: 5,
    treatment: "Root Canal",
    source: "Google",
    text: "Painless is an overused word but I fell asleep during my root canal. Actually asleep. Dr. Kapoor's team uses a numbing gel before the injection so you don't even feel that. The itemised bill matched the estimate to the rupee. My mother is booked here next week.",
  },
  {
    name: "Rajesh Iyer",
    rating: 3,
    treatment: "Denture",
    source: "Google",
    text: "The denture quality is good and the doctors are knowledgeable and courteous. My rating is only because I needed three adjustment visits before it sat comfortably, which meant three trips from Faridabad. To be fair, they saw me the same day each time without charging for adjustments, and the front desk was always apologetic and helpful. Decent experience overall.",
  },
  {
    name: "Zoya Khan",
    rating: 5,
    treatment: "Composite Bonding",
    source: "Google",
    text: "Chipped my front tooth two days before a job interview. They gave me an emergency slot within the hour and Dr. Kapoor rebuilt the tooth in one sitting — I genuinely cannot tell which tooth it was. Cost was reasonable and quoted upfront. Got the job, too.",
  },
  {
    name: "Venkatesh Subramanian",
    rating: 4,
    treatment: "Scaling & Polishing",
    source: "JustDial",
    text: "Regular cleaning patient for a year now. Thorough work, hygienic setup — new gloves and sealed instruments every time, which I specifically watch for. Four stars only because parking near the clinic is a struggle on weekends. The dentistry itself deserves five.",
  },
  {
    name: "Simran Chadha",
    rating: 5,
    treatment: "Clear Aligners",
    source: "Google",
    text: "Working at a client-facing job, braces weren't an option for me. Dr. Kapoor's aligner plan showed my end result on screen before I paid a rupee. 11 months, 22 trays, zero drama. The clinic even courier-ed my next set of trays when I was posted in Bangalore for two months. That's service.",
  },
  {
    name: "Abhijit Sen",
    rating: 5,
    treatment: "Full Mouth Rehabilitation",
    source: "Google",
    text: "Years of neglect meant I needed a bit of everything — extractions, implants, crowns. Dr. Mehta and Dr. Kapoor planned it jointly and sequenced it over five months so I was never without teeth. The written master plan with per-stage costs let me budget properly, and the EMI covered the implants. I smile in photos again at 54.",
  },
];

/* generated reviews from pools */
const genNames = [
  "Priyanka Sharma",
  "Amandeep Singh",
  "Farhan Sheikh",
  "Meenakshi Sundaram",
  "Ritwik Ghosh",
  "Neha Gupta",
  "Jaspreet Walia",
  "Divya Krishnan",
  "Sourav Banerjee",
  "Pooja Ahuja",
  "Irfan Baig",
  "Anitha Reddy",
  "Karan Chopra",
  "Shalini Menon",
  "Tanmay Dutta",
  "Rukhsar Fatima",
  "Nikhil Saxena",
  "Harleen Gill",
  "Prakash Pillai",
  "Sunita Bhosale",
  "Deepak Rawat",
  "Ayesha Siddiqui",
  "Mahesh Kulkarni",
  "Tanya Kohli",
  "Ravinder Ahluwalia",
  "Swati Mishra",
  "Joseph Varghese",
  "Bhavna Arora",
  "Sandeep Tomar",
  "Ishita Roy",
  "Naveen Chandran",
  "Rashmi Pandey",
];

const genTreatments = [
  "Root Canal",
  "Dental Implants",
  "Scaling & Polishing",
  "Teeth Whitening",
  "Metal Braces",
  "Clear Aligners",
  "Tooth Extraction",
  "Kids Dentistry",
  "Crown & Bridge",
  "Smile Makeover",
];

const genOpeners = [
  "Excellent experience from consultation to final visit.",
  "Very professional setup and genuinely caring doctors.",
  "Best dental clinic I have visited in Dwarka, New Delhi, and I have tried a few.",
  "Was nervous walking in, completely at ease within ten minutes.",
  "Clean, modern clinic with doctors who actually listen.",
  "Referred by a colleague and now I understand why she insisted.",
];

const genBodies = [
  "Dr. Smriti Sharma explained everything on the X-ray before starting and the procedure was completely painless.",
  "Dr. Anuj gave me a written estimate first and the final bill matched it exactly — transparent pricing for real.",
  "The sterilisation is visibly serious: sealed pouches opened in front of you, fresh gloves every time.",
  "They offered a no-cost EMI option without me even asking, which made the decision easy.",
  "My appointment started on time and the doctor never rushed me despite a full waiting room.",
  "The team was wonderful with my child — patient, playful and never forceful.",
  "Follow-up call the next day to check on me. Small thing, big difference.",
];

const genClosers = [
  "Highly recommended to anyone in Dwarka, New Delhi.",
  "My whole family comes here now.",
  "Worth the drive from Delhi honestly.",
  "Already recommended them to two colleagues.",
  "Finally a dental clinic I can trust.",
  "Five stars well earned.",
];

function buildReviews(): Review[] {
  const gen = seeded(11);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(gen() * arr.length)];

  const drafts: Draft[] = [];
  let hand = 0;
  let nameIdx = 0;
  for (let i = 0; i < 50; i++) {
    if (hand < handWritten.length && i % 3 !== 2) {
      drafts.push(handWritten[hand++]);
    } else {
      // mostly 5-star, occasional 4
      const rating = gen() < 0.85 ? 5 : 4;
      const src = gen();
      drafts.push({
        name: genNames[nameIdx++ % genNames.length],
        rating,
        treatment: pick(genTreatments),
        source: src < 0.8 ? "Google" : src < 0.92 ? "Practo" : "JustDial",
        text: `${pick(genOpeners)} ${pick(genBodies)} ${pick(genClosers)}`,
      });
    }
  }

  // dates newest first, spread 2026-07 back to 2025-08 (~1 week apart)
  const base = Date.UTC(2026, 6, 16); // 2026-07-16
  return drafts.map((d, i) => ({
    id: `RV-${String(i + 1).padStart(2, "0")}`,
    date: new Date(base - (i * 7 + Math.floor(gen() * 3)) * 86400000).toISOString().slice(0, 10),
    ...d,
  }));
}

/** 50 reviews, newest first. */
export const reviews: Review[] = buildReviews();
