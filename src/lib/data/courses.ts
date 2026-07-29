/* ------------------------------------------------------------------ */
/* CareWell Academy — courses & student pipeline mock data             */
/* ------------------------------------------------------------------ */

import type { Course, StudentLead } from "@/lib/data/types";
import { seeded } from "@/lib/utils";

export const academyStats = {
  graduates: 480,
  placementRate: 92,
  batchesCompleted: 38,
  avgRating: 4.8,
};

/* ------------------------------------------------------------------ */
/* 5 featured, fully written courses                                   */
/* ------------------------------------------------------------------ */

const featured: Course[] = [
  {
    slug: "dental-assistant-training",
    name: "Dental Assistant Training Program",
    tagline: "From zero medical background to chairside-ready in 90 days",
    level: "Beginner",
    mode: "On-campus",
    duration: "3 months",
    fee: 45000,
    seats: 20,
    enrolled: 16,
    nextBatch: "4 Aug 2026",
    certification: "Certificate of Completion, CareWell Academy — with 200 verified chairside-assist hours logged",
    featured: true,
    overview: [
      "India's dental clinics are opening faster than trained assistants are being produced — walk down any market in Dwarka, New Delhi and count the new dental signboards. Yet most clinics still train assistants informally, on the job, over years. This program compresses that learning into three structured months: mornings in the classroom, afternoons assisting real procedures at CareWell's working clinic under supervision.",
      "You need no science background — our batches include 12th-pass students, career-changers from retail and hospitality, and homemakers re-entering work. What you do need is reliability and comfortable hands; everything else, from instrument names to suction technique, is taught from first principles.",
      "By graduation you will have assisted at a minimum of 200 documented procedures, from simple fillings to implant surgeries, and our placement cell connects graduates with our network of 40+ partner clinics across NCR at starting salaries of ₹15,000–₹22,000 per month.",
    ],
    curriculum: [
      {
        module: "Module 1 — Dental Foundations",
        topics: [
          "Tooth anatomy, numbering systems (FDI & Universal) and charting",
          "Common diseases: caries, pulpitis, periodontitis explained simply",
          "The dental operatory: chair, delivery unit, light, suction lines",
          "Instrument identification: diagnostic, restorative, surgical trays",
          "Dental materials overview: composites, cements, impression materials",
        ],
      },
      {
        module: "Module 2 — Chairside Assisting Skills",
        topics: [
          "Four-handed dentistry: positions, zones and instrument transfer",
          "High-volume suction and retraction technique",
          "Mixing cements and impression materials to correct consistency",
          "Assisting in restorative, endodontic and extraction procedures",
          "Handling anxious patients and pediatric behaviour support",
        ],
      },
      {
        module: "Module 3 — Sterilisation & Clinic Safety",
        topics: [
          "The four-step sterilisation cycle: scrub, ultrasonic, pouch, autoclave",
          "Autoclave operation, indicators and log-keeping",
          "Personal protection: gloves, masks, eyewear, needle-stick protocol",
          "Biomedical waste segregation as per Indian BMW Rules",
          "Operatory disinfection between patients — the 7-minute turnaround",
        ],
      },
      {
        module: "Module 4 — Radiology & Records",
        topics: [
          "Positioning for IOPA and OPG radiographs",
          "Radiation safety for staff and patients",
          "Digital sensor handling and image storage",
          "Patient records, consent forms and confidentiality basics",
        ],
      },
      {
        module: "Module 5 — Professional Readiness",
        topics: [
          "Clinic software: appointments, billing entries, inventory logs",
          "Professional communication in English and Hindi",
          "Mock interviews with partner clinic owners",
          "Final practical examination and viva",
        ],
      },
    ],
    faculty: ["Dr. Smriti Sharma", "Dr. Anuj", "Priya Sharma"],
    faqs: [
      {
        q: "What is the minimum eligibility?",
        a: "12th pass in any stream. No biology or prior medical exposure required — the course starts from absolute basics. Minimum age 17.",
      },
      {
        q: "Is the certificate recognised?",
        a: "You receive a Certificate of Completion from CareWell Academy along with a signed log of 200+ supervised chairside hours — which is what hiring clinics actually verify. Dental assisting in India is not a licensed role, so documented hands-on hours matter more than any board stamp.",
      },
      {
        q: "Do you provide placement?",
        a: "Yes. Our placement cell works with 40+ partner clinics across Dwarka, Delhi and Noida. 92% of the last four batches were placed within six weeks of completion; top performers are frequently absorbed at CareWell itself.",
      },
      {
        q: "Can I pay the fee in instalments?",
        a: "Yes — ₹15,000 at admission and two monthly instalments of ₹15,000. No-cost EMI via Razorpay is also available for 3 or 6 months.",
      },
      {
        q: "What are the class timings?",
        a: "Monday to Saturday, 9:30 am–1:00 pm theory and demonstration, 2:00 pm–5:00 pm clinical posting. One Sunday workshop per month.",
      },
    ],
    outcomes: [
      "Assist confidently in restorative, endodontic, surgical and pediatric procedures",
      "Run a complete sterilisation cycle and maintain autoclave logs independently",
      "Take and process IOPA/OPG radiographs with correct positioning",
      "Manage appointment scheduling, billing entries and inventory in clinic software",
      "Interview-ready with a 200-hour verified clinical logbook",
    ],
  },
  {
    slug: "reception-practice-management",
    name: "Dental Reception & Practice Management",
    tagline: "The front desk decides whether a clinic grows — learn to run one",
    level: "Beginner",
    mode: "Hybrid",
    duration: "6 weeks",
    fee: 25000,
    seats: 15,
    enrolled: 11,
    nextBatch: "18 Aug 2026",
    certification: "Certificate of Completion, CareWell Academy — Practice Management Track",
    featured: true,
    overview: [
      "A dental clinic's revenue is won or lost at the front desk: the missed call that became a lost implant case, the follow-up that never happened, the estimate explained so badly the patient 'thought about it' forever. This six-week course trains receptionists and practice coordinators the way we train our own — as the growth engine of the clinic, not just the person who picks up the phone.",
      "The format is hybrid: three evenings a week online (recorded if you miss one), plus Saturday practicals at the CareWell front desk where you handle real calls, real billing and real patient flow under supervision. The course is equally popular with clinic owners' family members who manage their practices and with candidates seeking front-office jobs in healthcare.",
    ],
    curriculum: [
      {
        module: "Module 1 — The Patient Journey",
        topics: [
          "Anatomy of a dental visit: enquiry → appointment → treatment → recall",
          "First-call excellence: scripts for the 12 most common enquiries",
          "Appointment scheduling logic: chair time, doctor time, buffer gaps",
          "No-show prevention: reminders, confirmations and the 48-hour rule",
        ],
      },
      {
        module: "Module 2 — Treatment Coordination & Billing",
        topics: [
          "Presenting treatment estimates without scaring patients away",
          "EMI, insurance claims and corporate tie-up paperwork",
          "Billing entries, receipts, refunds and daily cash reconciliation",
          "Following up pending treatments — the recall list that pays your salary",
        ],
      },
      {
        module: "Module 3 — Communication That Converts",
        topics: [
          "Phone and WhatsApp etiquette: tone, response time, templates",
          "Handling angry patients and negative review recovery",
          "Basic dental vocabulary — sounding credible without overstepping",
          "Privacy: what a receptionist may and may never disclose",
        ],
      },
      {
        module: "Module 4 — Running the Practice",
        topics: [
          "Clinic software end-to-end: appointments, EMR flags, reports",
          "Inventory tracking and reorder points for consumables",
          "Daily, weekly and monthly reports every owner wants to see",
          "Google reviews, listings and the front desk's role in marketing",
        ],
      },
    ],
    faculty: ["Priya Sharma", "Dr. Anuj"],
    faqs: [
      {
        q: "Who is this course for?",
        a: "Anyone 12th-pass and comfortable with basic computer use: aspiring healthcare receptionists, existing front-desk staff wanting structured training, and clinic owners or their family members who manage operations.",
      },
      {
        q: "Is it fully online?",
        a: "Theory sessions are live online on Tuesday, Thursday and Friday evenings (7–8:30 pm) and recorded. Saturday practicals at our Dwarka clinic are strongly recommended but an online-only track is available for outstation students.",
      },
      {
        q: "What certification do I get?",
        a: "Certificate of Completion, CareWell Academy — Practice Management Track, issued after the final assessment (a live mock front-desk simulation).",
      },
      {
        q: "Is there placement support?",
        a: "Yes — front-desk roles are the most requested position from our partner clinics. Recent graduates have joined at ₹14,000–₹25,000 per month depending on experience and English fluency.",
      },
      {
        q: "Can I pay in two parts?",
        a: "Yes: ₹12,500 at admission and ₹12,500 at the start of week 4. UPI, card and no-cost EMI accepted.",
      },
    ],
    outcomes: [
      "Convert enquiry calls into booked appointments using tested scripts",
      "Present estimates and EMI options confidently and compliantly",
      "Run daily billing, reconciliation and recall lists independently",
      "Handle escalations and negative reviews with a documented process",
      "Operate clinic management software across the full patient journey",
    ],
  },
  {
    slug: "advanced-implant-course",
    name: "Advanced Dental Implant Course (for BDS/MDS)",
    tagline: "Place your first 5 implants on patients — not on models — in 6 days",
    level: "Advanced",
    mode: "On-campus",
    duration: "6 days hands-on",
    fee: 85000,
    seats: 8,
    enrolled: 7,
    nextBatch: "7 Sep 2026",
    certification: "Advanced Certificate in Oral Implantology, CareWell Academy — includes mentored live surgeries and case documentation",
    featured: true,
    overview: [
      "Most implant courses in India end at the pig-jaw stage — you drill into a model, collect a certificate, and return to your clinic still afraid to pick up a physiodispenser. This course is built around one promise: every participant places implants on live patients under Dr. Smriti Sharma's direct mentorship, with cases pre-screened and consented from CareWell's own patient pool.",
      "Six intensive days: two days of compressed theory, treatment planning on real CBCTs and hands-on model work; four days of live surgery in rotating surgeon/assistant pairs. Batch size is capped at eight so every participant operates, not observes. You will plan, place and document 4–6 implants yourself and assist on a dozen more, including exposure to grafting and immediate placement.",
      "Participants receive a full digital protocol pack — our consent formats, surgical checklists, prosthetic workflows and pricing templates — so the course transplants a working implant practice, not just a technique.",
    ],
    curriculum: [
      {
        module: "Day 1 — Diagnosis & Treatment Planning",
        topics: [
          "Implant macro/micro design, surface science and brand landscape in India",
          "CBCT reading: bone density classification, nerve mapping, sinus anatomy",
          "Prosthetically driven planning — beginning with the end crown",
          "Case selection: which cases a beginner must refuse",
          "Live planning workshop on participants' own submitted CBCTs",
        ],
      },
      {
        module: "Day 2 — Surgical Protocols & Model Practice",
        topics: [
          "Flap design, incisions and suturing techniques on models",
          "Drilling sequence, torque values and primary stability",
          "Physiodispenser setup and complete armamentarium walkthrough",
          "Managing the anxious patient: sedation options and consent",
          "Sterile field discipline for the single-operatory clinic",
        ],
      },
      {
        module: "Days 3–5 — Live Patient Surgeries (Mentored)",
        topics: [
          "Each participant places 4–6 implants under direct supervision",
          "Flapless vs open placement decisions chairside",
          "Bone grafting and membrane handling in real defects",
          "Immediate implant placement in extraction sockets (demonstration + assist)",
          "Complication drills: bleeding, wrong angulation, low primary stability",
        ],
      },
      {
        module: "Day 6 — Prosthetics, Documentation & Practice Building",
        topics: [
          "Impression techniques and digital scanning over implants",
          "Loading protocols: immediate, early, conventional",
          "Documentation, warranties and medico-legal safeguards",
          "Pricing implants profitably and ethically in the Indian market",
          "Case presentations by participants and certification viva",
        ],
      },
    ],
    faculty: ["Dr. Smriti Sharma", "Dr. Anuj"],
    faqs: [
      {
        q: "Who is eligible?",
        a: "Registered dental practitioners only — BDS with a valid DCI registration; MDS welcome. Fresh graduates can attend, though 1+ year of clinical extraction experience is recommended before operating.",
      },
      {
        q: "Will I definitely place implants on patients?",
        a: "Yes — that is the core of the course. Cases are pre-screened from our patient pool and each participant is guaranteed a minimum of 4 mentored placements. This is why the batch is capped at 8.",
      },
      {
        q: "Which implant system is taught?",
        a: "Hands-on work uses Osstem and Straumann kits, but the protocols are system-agnostic — drilling sequences, torque and prosthetic logic transfer to any major brand you stock later.",
      },
      {
        q: "Is there post-course support?",
        a: "Six months of case-support: submit your CBCTs and photos to our mentorship group and Dr. Mehta's team reviews your planning before you operate. Your first solo cases are the whole point of the course.",
      },
      {
        q: "Can the fee be paid in instalments?",
        a: "₹25,000 books your seat (seats are strictly 8 per batch); the balance ₹60,000 is due 15 days before the batch. GST invoice provided — most participants claim it as professional education expense.",
      },
    ],
    outcomes: [
      "Independently plan implant cases on CBCT with prosthetic-first logic",
      "Place straightforward implants (D2/D3 bone, adequate width) unassisted",
      "Manage flap design, suturing and basic grafting confidently",
      "Run the complete prosthetic workflow from impression to crown seating",
      "Set up implant pricing, consent and documentation for your own practice",
    ],
  },
  {
    slug: "dental-photography-masterclass",
    name: "Dental Photography Masterclass",
    tagline: "Your cases are good. Your photos say otherwise. Fix that in 2 days.",
    level: "Intermediate",
    mode: "On-campus",
    duration: "2 days",
    fee: 15000,
    seats: 12,
    enrolled: 9,
    nextBatch: "22 Aug 2026",
    certification: "Certificate of Completion, CareWell Academy — Clinical Photography",
    featured: true,
    overview: [
      "The dentist with average cases and great photos gets more referrals than the dentist with great cases and phone snapshots — unfair, but true, and doubly true on Instagram. This weekend masterclass, taught by Dr. Anuj (whose before-afters you have probably seen on the clinic's feed), covers clinical photography end to end: camera settings, mirrors and retractors, lighting, and the editing workflow that stays on the honest side of enhancement.",
      "Bring any DSLR or mirrorless camera — or just your phone; a full session covers getting 80% of the result from a flagship phone with ₹2,000 of accessories. Every participant leaves with their own standardised shot protocol card: the exact 12 views, settings and angles to reproduce for every case, so your documentation finally looks like a portfolio.",
    ],
    curriculum: [
      {
        module: "Module 1 — Equipment & Exposure",
        topics: [
          "Camera bodies, macro lenses and ring vs twin flash on an Indian budget",
          "The only three settings that matter: aperture, shutter, ISO for intraoral work",
          "Phone dental photography: lenses, diffusers and limitations",
          "Retractors, occlusal mirrors and anti-fog technique",
        ],
      },
      {
        module: "Module 2 — The Standard Series (Hands-on)",
        topics: [
          "The 12-view documentation protocol: full face to quadrant close-ups",
          "Live practice on patient models in pairs with instructor correction",
          "Shade photography for lab communication — killing the grey crown problem",
          "Before/after consistency: matching angle, zoom and lighting months apart",
        ],
      },
      {
        module: "Module 3 — Workflow, Editing & Ethics",
        topics: [
          "Lightroom mobile workflow: 4 edits allowed, 40 not allowed",
          "Consent, anonymisation and what Indian regulations permit you to post",
          "Building case galleries that convert consultations",
          "Instagram-ready exports without misleading enhancement",
        ],
      },
    ],
    faculty: ["Dr. Anuj", "Priya Sharma"],
    faqs: [
      {
        q: "Do I need to own a DSLR?",
        a: "No. Loaner setups are available during the class, and one full session is dedicated to phone-based clinical photography. Most participants buy equipment after the course, with clearer priorities and a budget sheet we provide.",
      },
      {
        q: "Who should attend?",
        a: "Dentists, final-year BDS students and clinic social-media managers. The editing and consent module is equally relevant to whoever runs your Instagram.",
      },
      {
        q: "Is certification included?",
        a: "Yes — Certificate of Completion, CareWell Academy, issued on submission of your own standard 12-view series shot during the course.",
      },
      {
        q: "What are the timings?",
        a: "Saturday and Sunday, 9:30 am–5:30 pm, lunch included. One batch runs monthly; the next is 22–23 Aug 2026.",
      },
    ],
    outcomes: [
      "Shoot the standard 12-view clinical series consistently in under 8 minutes",
      "Produce lab-ready shade photographs that reduce crown remakes",
      "Run an ethical, fast editing workflow on desktop or phone",
      "Publish compliant, consented before-after content that converts",
    ],
  },
  {
    slug: "clinical-internship-program",
    name: "Clinical Internship Program",
    tagline: "The bridge between your BDS degree and your first confident patient",
    level: "Intermediate",
    mode: "On-campus",
    duration: "3 months",
    fee: 30000,
    seats: 6,
    enrolled: 5,
    nextBatch: "1 Oct 2026",
    certification: "Internship Completion Certificate, CareWell Academy — with quantified procedure log signed by supervising clinicians",
    featured: true,
    overview: [
      "Every young dentist knows the gap: college taught you on a quota of patients, and suddenly you hold a degree but hesitate over a simple extraction when no professor is standing behind you. This three-month internship embeds you in CareWell's daily clinical flow — observing, assisting, and progressively operating under supervision — until independent chairside decisions feel normal.",
      "Interns rotate through general dentistry, endodontics, minor oral surgery, pediatric sessions and the implant OT, with a weekly case-review evening where you present your patients to Dr. Mehta and Dr. Kapoor and defend your treatment plans. By month three, suitable interns handle their own patient slots with a supervisor available, not hovering.",
      "The quantified logbook — every scaling, restoration, RCT stage and extraction counted and countersigned — has helped previous interns into associate positions, MDS interviews and their own practice launches. Two of our current associates started as interns here.",
    ],
    curriculum: [
      {
        module: "Month 1 — Observation to Assistance",
        topics: [
          "Clinical protocols, sterilisation and records at a private-practice standard",
          "Chairside assisting across all departments with structured debriefs",
          "History-taking, diagnosis and treatment-planning drills on live cases",
          "Local anaesthesia technique refinement under supervision",
        ],
      },
      {
        module: "Month 2 — Supervised Operating",
        topics: [
          "Restorations and scaling on own patients, supervisor at chairside",
          "Single-rooted RCTs start to finish with rotary systems",
          "Simple extractions and suturing; assisting surgical extractions",
          "Pediatric management: fluoride, sealants, behaviour techniques",
        ],
      },
      {
        module: "Month 3 — Independent Slots & Practice Skills",
        topics: [
          "Own appointment slots with on-call supervision",
          "Multi-rooted endodontics and crown preparations",
          "Implant OT postings: assisting and prosthetic stages",
          "Case presentations, estimate discussions and patient communication",
          "Career lab: associateships, MDS prep or starting up — with the numbers",
        ],
      },
    ],
    faculty: ["Dr. Smriti Sharma", "Dr. Anuj", "Priya Sharma"],
    faqs: [
      {
        q: "Who can apply?",
        a: "BDS graduates (including those awaiting final results) and interns in their compulsory rotatory year looking for private-practice exposure. DCI registration required before you operate on patients.",
      },
      {
        q: "Why is there a fee — shouldn't internships pay?",
        a: "Fair question. The fee covers dedicated supervision time, your consumables, and a guaranteed procedure quota — this is structured training with a syllabus, not free labour. Interns who stay on as associates have the fee adjusted against their first-quarter stipend.",
      },
      {
        q: "How many procedures will I actually do?",
        a: "Minimums we commit to in writing: 30 restorations, 10 RCTs, 15 extractions, 20 scalings, plus assists across surgery and implants. Most interns exceed these comfortably.",
      },
      {
        q: "Is there a stipend or job at the end?",
        a: "The internship itself is unpaid, but top performers are offered associate positions at CareWell or referred to partner clinics — 7 of our last 12 interns were placed within a month of finishing.",
      },
      {
        q: "Can I pay in instalments?",
        a: "Yes — ₹10,000 per month for the three months. No-cost EMI is also available at admission.",
      },
    ],
    outcomes: [
      "Operate independently on bread-and-butter dentistry: restorations, RCTs, extractions",
      "Present diagnoses, plans and estimates to real patients convincingly",
      "A countersigned, quantified logbook of 75+ completed procedures",
      "Working knowledge of private-practice operations, pricing and records",
      "A professional referee relationship with two senior clinicians",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 25 generated courses — CE workshops & batch variants                */
/* ------------------------------------------------------------------ */

interface WorkshopSeed {
  name: string;
  tagline: string;
  level: Course["level"];
  duration: string;
  feeMin: number;
  feeMax: number;
  modules: [string, string, string];
}

const workshopSeeds: WorkshopSeed[] = [
  {
    name: "Suture & Flap Design Workshop",
    tagline: "A full Sunday of knots, flaps and pig-jaw practice",
    level: "Intermediate",
    duration: "1 day",
    feeMin: 8000,
    feeMax: 12000,
    modules: ["Suture materials & needle selection", "Flap designs for extraction & implant surgery", "Hands-on: 6 suturing techniques on models"],
  },
  {
    name: "Rotary Endodontics Weekend",
    tagline: "Move from hand files to confident rotary in two days",
    level: "Intermediate",
    duration: "2 days",
    feeMin: 18000,
    feeMax: 24000,
    modules: ["Rotary file systems, tapers & torque settings", "Working length: apex locators & digital radiographs", "Hands-on: molar shaping and obturation on extracted teeth"],
  },
  {
    name: "Clear Aligner Certification Workshop",
    tagline: "Case selection, ClinCheck-style planning and attachment protocols",
    level: "Advanced",
    duration: "2 days",
    feeMin: 30000,
    feeMax: 40000,
    modules: ["Aligner biomechanics & case selection", "Digital planning: staging, attachments, IPR", "Delivery, tracking and refinement protocols"],
  },
  {
    name: "Front Desk Bootcamp",
    tagline: "One intensive week for working receptionists",
    level: "Beginner",
    duration: "1 week",
    feeMin: 9000,
    feeMax: 12000,
    modules: ["Call scripts & appointment conversion", "Billing, estimates and EMI paperwork", "Recall lists & review management"],
  },
  {
    name: "Sterilisation Protocols Certification",
    tagline: "Audit-ready infection control for the whole clinic team",
    level: "Beginner",
    duration: "1 day",
    feeMin: 8000,
    feeMax: 10000,
    modules: ["The four-step cycle & autoclave validation", "BMW Rules: segregation, storage, disposal records", "Operatory turnaround drills & audit checklists"],
  },
  {
    name: "Pediatric Behaviour Management Workshop",
    tagline: "Tell-show-do and beyond, for tears-free kids' appointments",
    level: "Intermediate",
    duration: "1 day",
    feeMin: 10000,
    feeMax: 14000,
    modules: ["Behaviour techniques by age group", "Parent communication & the anxious family", "Live observation: pediatric session at CareWell"],
  },
  {
    name: "Digital Smile Design Workshop",
    tagline: "Plan, mock up and sell a smile makeover in software",
    level: "Advanced",
    duration: "2 days",
    feeMin: 25000,
    feeMax: 35000,
    modules: ["Photography & facial analysis for DSD", "Software smile design and 3D-printed mock-ups", "Case presentation that converts consultations"],
  },
  {
    name: "Dental Practice Growth Marketing Workshop",
    tagline: "Google, Instagram and WhatsApp for ethical patient growth",
    level: "Beginner",
    duration: "1 day",
    feeMin: 12000,
    feeMax: 16000,
    modules: ["Google Business Profile & review engines", "Content pillars & a 30-day Instagram calendar", "WhatsApp funnels & recall automation"],
  },
  {
    name: "Basic Life Support (BLS) for Dental Teams",
    tagline: "Medical emergencies in the dental chair — certified response",
    level: "Beginner",
    duration: "1 day",
    feeMin: 8000,
    feeMax: 9500,
    modules: ["CPR & AED hands-on certification", "Syncope, hypoglycaemia & anaphylaxis in the clinic", "Emergency drug kit & team drills"],
  },
  {
    name: "Laser Dentistry Introduction",
    tagline: "Soft-tissue diode laser skills in one hands-on day",
    level: "Advanced",
    duration: "1 day",
    feeMin: 20000,
    feeMax: 28000,
    modules: ["Laser physics, safety & settings", "Gingivectomy, frenectomy & depigmentation techniques", "Hands-on practice and case documentation"],
  },
  {
    name: "Full Mouth Rehabilitation Planning Masterclass",
    tagline: "Sequencing complex multi-specialty cases with confidence",
    level: "Advanced",
    duration: "2 days",
    feeMin: 40000,
    feeMax: 60000,
    modules: ["Occlusion & vertical dimension fundamentals", "Sequencing surgery, endo and prosthetics", "Live treatment-planning on participants' cases"],
  },
  {
    name: "Dental Assistant Refresher — Weekend Batch",
    tagline: "Working assistants: formalise your skills, get certified",
    level: "Beginner",
    duration: "4 weekends",
    feeMin: 15000,
    feeMax: 20000,
    modules: ["Chairside skills audit & correction", "Sterilisation and radiology updates", "Certification assessment & logbook"],
  },
  {
    name: "Impression & Digital Scanning Workshop",
    tagline: "From alginate to intraoral scanners without the retakes",
    level: "Beginner",
    duration: "1 day",
    feeMin: 8500,
    feeMax: 11000,
    modules: ["Conventional impression materials done right", "Intraoral scanning technique & common errors", "Lab communication that prevents remakes"],
  },
];

function buildGeneratedCourses(): Course[] {
  const gen = seeded(23);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(gen() * arr.length)];
  const months = ["Aug 2026", "Sep 2026", "Oct 2026"];
  const modes: Course["mode"][] = ["On-campus", "On-campus", "Hybrid"];
  const out: Course[] = [];

  for (let i = 0; i < 25; i++) {
    const seed = workshopSeeds[i % workshopSeeds.length];
    const edition = Math.floor(i / workshopSeeds.length); // 0 or 1
    const fee = Math.round((seed.feeMin + gen() * (seed.feeMax - seed.feeMin)) / 500) * 500;
    const seats = 8 + Math.floor(gen() * 13); // 8–20
    const enrolled = Math.floor(seats * (0.3 + gen() * 0.6));
    const batchMonth = pick(months);
    const day = 2 + Math.floor(gen() * 24);
    const name = edition === 0 ? seed.name : `${seed.name} — ${batchMonth.split(" ")[0]} Batch`;
    const slug =
      seed.name
        .toLowerCase()
        .replace(/[()&—]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") + (edition > 0 ? `-${i}` : "");

    out.push({
      slug,
      name,
      tagline: seed.tagline,
      level: seed.level,
      mode: seed.level === "Beginner" ? pick(modes) : "On-campus",
      duration: seed.duration,
      fee,
      seats,
      enrolled,
      nextBatch: `${day} ${batchMonth}`,
      certification: "Certificate of Completion, CareWell Academy",
      overview: [
        `${seed.tagline}. Conducted at CareWell's Dwarka training centre with small batches (max ${seats}), all materials included, and lunch on training days. Led by our clinical faculty with live demonstrations and hands-on practice built into every session, so participants leave with skills they can use in their own clinic on Monday morning.`,
      ],
      curriculum: seed.modules.map((m, mi) => ({
        module: `Module ${mi + 1} — ${m.split(":")[0].split("&")[0].trim()}`,
        topics: [m, "Instructor demonstration and guided practice", "Q&A and troubleshooting of participants' own cases"],
      })),
      faculty: seed.level === "Advanced" ? ["Dr. Smriti Sharma", "Dr. Anuj"] : ["Dr. Anuj", "Priya Sharma"],
      faqs: [
        { q: "Who can attend?", a: seed.level === "Beginner" ? "Open to clinic staff and aspiring dental professionals; no prior qualification required unless noted." : "Registered dental practitioners (BDS/MDS with valid DCI registration)." },
        { q: "Is certification provided?", a: "Yes — Certificate of Completion, CareWell Academy, issued after attendance and the end-of-course assessment." },
        { q: "Can I pay via EMI?", a: "Fees under ₹20,000 are payable via UPI or card; larger fees also support 3-month no-cost EMI." },
      ],
      outcomes: seed.modules.map((m) => `Competence in: ${m.toLowerCase()}`),
    });
  }
  return out;
}

/** 30 courses; first five are the flagship featured programs. */
export const courses: Course[] = [...featured, ...buildGeneratedCourses()];

export const featuredCourses: Course[] = courses.slice(0, 5);

export const findCourse = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug);

/* ------------------------------------------------------------------ */
/* 60 student leads                                                    */
/* ------------------------------------------------------------------ */

const leadNames = [
  "Ritika Yadav", "Aman Saini", "Shabnam Khatoon", "Karthik Rajan", "Moumita Das",
  "Gaurav Hooda", "Jasleen Kaur Anand", "Nusrat Jahan", "Vignesh Murugan", "Payal Chauhan",
  "Sandeep Beniwal", "Anjali Rathi", "Mohd Arif Khan", "Sruthi Pillai", "Arpita Mukherjee",
  "Rohit Dagar", "Simranjeet Singh", "Fathima Rasheed", "Balaji Srinivasan", "Neelam Saroha",
  "Yashpal Rana", "Kirti Malik", "Tabassum Bano", "Deepika Nair", "Sayantan Bose",
  "Manoj Kataria", "Prabhjot Kaur", "Rehan Ansari", "Aishwarya Iyer", "Tanushree Ghosh",
  "Vikas Phogat", "Sonali Dahiya", "Zeeshan Ahmed", "Revathi Krishnan", "Anwesha Sarkar",
  "Himanshu Tanwar", "Navdeep Gill", "Sana Parveen", "Hari Prasad", "Madhumita Sen",
  "Ajay Sangwan", "Muskan Bajaj", "Imtiaz Alam", "Keerthana Reddy", "Dipanjan Roy",
  "Suresh Lamba", "Harnoor Kaur", "Shaheen Fatma", "Gokul Nathan", "Priyanka Biswas",
  "Nitin Chhikara", "Ekta Sindhu", "Salman Raza", "Janani Venkat", "Rimpa Halder",
  "Parveen Kumar", "Amritpal Singh", "Rubina Khatun", "Nandini Menon", "Subhojit Dey",
];

const leadCities = [
  "Dwarka", "Delhi", "Faridabad", "Noida", "Rewari", "Rohtak", "Sonipat",
  "Jhajjar", "Manesar", "Bhiwadi", "Palwal", "New Delhi", "Ghaziabad", "Hisar",
];

const stageCounts: [StudentLead["stage"], number][] = [
  ["Enquiry", 20],
  ["Application", 12],
  ["Interview", 6],
  ["Admitted", 10],
  ["Payment Done", 8],
  ["Completed", 3],
  ["Dropped", 1],
];

function buildStudentLeads(): StudentLead[] {
  const gen = seeded(23);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(gen() * arr.length)];
  const leadCourses = featured; // leads enquire about the 5 flagship programs
  const batches = ["Aug 2026", "Sep 2026", "Oct 2026"];
  const stages: StudentLead["stage"][] = stageCounts.flatMap(([s, n]) => Array(n).fill(s) as StudentLead["stage"][]);

  const base = Date.UTC(2026, 6, 17); // 2026-07-17
  const leads: StudentLead[] = [];

  for (let i = 0; i < 60; i++) {
    const stage = stages[i];
    const course = leadCourses[i % leadCourses.length];
    const feeTotal = course.fee;

    let feePaid = 0;
    if (stage === "Admitted") feePaid = Math.round((feeTotal * (0.2 + gen() * 0.2)) / 500) * 500;
    if (stage === "Payment Done" || stage === "Completed") feePaid = feeTotal;

    // Completed leads come from earlier batches; others from upcoming ones
    const batch = stage === "Completed" ? pick(["Jan 2026", "Mar 2026", "Apr 2026"]) : pick(batches);

    // Enquiries are recent; deeper stages are older leads
    const stageAgeBoost: Record<StudentLead["stage"], number> = {
      Enquiry: 0, Application: 20, Interview: 35, Admitted: 50, "Payment Done": 65, Completed: 150, Dropped: 60,
    };
    const daysAgo = stageAgeBoost[stage] + Math.floor(gen() * 25);
    const createdAt = new Date(base - daysAgo * 86400000).toISOString().slice(0, 10);

    const phone = `+91 ${7 + Math.floor(gen() * 3)}${String(Math.floor(gen() * 900000000) + 100000000)}`;

    const lead: StudentLead = {
      id: `SL-${String(2001 + i)}`,
      name: leadNames[i],
      phone,
      city: pick(leadCities),
      courseSlug: course.slug,
      course: course.name,
      stage,
      createdAt,
      feePaid,
      feeTotal,
      batch,
    };
    if (stage === "Admitted" || stage === "Payment Done" || stage === "Completed") {
      lead.attendancePct = stage === "Completed" ? 82 + Math.floor(gen() * 17) : 68 + Math.floor(gen() * 30);
    }
    leads.push(lead);
  }
  return leads;
}

/** 60 academy leads across the admissions funnel. */
export const studentLeads: StudentLead[] = buildStudentLeads();
